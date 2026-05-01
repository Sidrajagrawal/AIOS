from kernel.orchestrator import Orchestrator, TaskPriority
import time

os_kernel = Orchestrator()
os_kernel.start()

os_kernel.submit_task(
    task_id="CHAT_001",
    agent_type="architectagent",
    payload={
        "session_id": "chat_app_project_123",
        "action": "init",
        "prompt": "I want to build a real-time chat app with 10k users."
    },
    priority=TaskPriority.CRITICAL
)

time.sleep(10)

os_kernel.submit_task(
    task_id="CHAT_002",
    agent_type="ArchitectAgent",
    payload={
        "session_id": "chat_app_project_123",
        "action": "init",
        "prompt": "Actually, change the database to PostgreSQL instead."
    },
    priority=TaskPriority.CRITICAL
)

try:
    while True:
        time.sleep(1)
except KeyboardInterrupt:
    print("\nShutting down AI-OS...")