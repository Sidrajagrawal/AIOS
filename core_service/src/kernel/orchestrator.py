import queue
import time
import threading
from enum import Enum
from dataclasses import dataclass, field
from typing import Dict, Any

from agent_registry.registry import get_agents
from .memory import MemoryManager
from .security import SecurityManager

class TaskPriority(Enum):
    CRITICAL = 0
    HIGH = 1
    BACKGROUND = 2

@dataclass(order=True)
class Task:
    priority: int
    task_id: str = field(compare=False)
    agent_type: str = field(compare=False)
    payload: Dict[str, Any] = field(compare=False)
    retry_count: int = field(compare=False, default=0)

class Orchestrator:
    def __init__(self):
        self.task_queue = queue.PriorityQueue()
        self.memory = MemoryManager()
        self.security = SecurityManager()
        self.is_running = True
        self.MAX_RETRIES = 3

    def submit_task(self, task_id: str, agent_type: str, payload: dict, priority: TaskPriority = TaskPriority.HIGH):
        if "session_id" not in payload:
            payload["session_id"] = "default_session"

        task = Task(priority=priority.value, task_id=task_id, agent_type=agent_type, payload=payload)
        self.task_queue.put(task)
        
    def start(self):
        thread = threading.Thread(target=self._run_loop, daemon=True)
        thread.start()

    def _run_loop(self):
        while self.is_running:
            try:
                task = self.task_queue.get(timeout=1)
                self._execute_agent(task)
                self.task_queue.task_done()
                time.sleep(1) 
            except queue.Empty:
                continue
        # 
    def _execute_agent(self, task: Task):
        target_file = task.payload.get('file_path')
        if target_file:
            if not self.memory.acquire_lock(target_file, task.agent_type):
                time.sleep(1) 
                self.task_queue.put(task)
                return

        try:
            agent_instance = get_agents(task.agent_type)
            if not agent_instance:
                raise ValueError(f"Unknown agent type requested: {task.agent_type}")

            session_id = task.payload["session_id"]
            task.payload["history"] = self.memory.get_chat_history(session_id)
        
            prompt_preview = task.payload.get('prompt', '')[:50]
          
            response = agent_instance.execute(task.payload)
            
            task.payload['result'] = response

            user_prompt = task.payload.get("prompt", "")
            if user_prompt: 
                self.memory.append_chat_message(session_id, task.agent_type, "user", user_prompt)
            
            self.memory.append_chat_message(session_id, task.agent_type, "assistant", response)
        


        except Exception as e:
            if task.retry_count < self.MAX_RETRIES:
                task.retry_count += 1
                self.task_queue.put(task)

        finally:
            if target_file:
                self.memory.release_lock(target_file, task.agent_type)    
            if "completion_event" in task.payload:
                task.payload["completion_event"].set()