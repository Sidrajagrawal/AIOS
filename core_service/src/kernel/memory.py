import sqlite3
import json
from datetime import datetime
from typing import Optional, Dict, Any

DB_PATH = "ai_os_core.db"

class MemoryManager:
    def __init__(self):
        self.conn = sqlite3.connect(DB_PATH, check_same_thread=False)
        self.create_tables()

    def create_tables(self):
        cursor = self.conn.cursor()
        
        cursor.execute('''
            CREATE TABLE IF NOT EXISTS file_locks (
                file_path TEXT PRIMARY KEY,
                agent_id TEXT,
                timestamp DATETIME
            )
        ''')
        
        cursor.execute('''
            CREATE TABLE IF NOT EXISTS shared_context (
                key TEXT PRIMARY KEY,
                value TEXT,
                updated_at DATETIME
            )
        ''')
        
        cursor.execute('''
            CREATE TABLE IF NOT EXISTS agent_memory (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                session_id TEXT,
                agent_name TEXT,
                role TEXT,
                content TEXT,
                timestamp DATETIME
            )
        ''')
        
        self.conn.commit()

    def append_chat_message(self, session_id: str, agent_name: str, role: str, content: str):
        """Saves a single message (from user or AI) into the session history."""
        cursor = self.conn.cursor()
        cursor.execute(
            "INSERT INTO agent_memory (session_id, agent_name, role, content, timestamp) VALUES (?, ?, ?, ?, ?)",
            (session_id, agent_name, role, content, datetime.now())
        )
        self.conn.commit()

    def get_chat_history(self, session_id: str, limit: int = 20) -> list:
        """
        Fetches the conversation history for a specific session to feed into Llama 3.
        We limit to the last 20 messages so we don't blow up the AI's context window.
        """
        cursor = self.conn.cursor()
        cursor.execute('''
            SELECT role, content FROM (
                SELECT role, content, timestamp 
                FROM agent_memory 
                WHERE session_id=? 
                ORDER BY timestamp DESC 
                LIMIT ?
            ) ORDER BY timestamp ASC
        ''', (session_id, limit))
        
        rows = cursor.fetchall()
        return [{"role": row[0], "content": row[1]} for row in rows]

    def get_sidebar_sessions(self) -> list:
        """
        A helper for your UI: Returns a list of all unique session IDs 
        so you can display them as buttons in a sidebar!
        """
        cursor = self.conn.cursor()
        cursor.execute("SELECT DISTINCT session_id FROM agent_memory ORDER BY timestamp DESC")
        rows = cursor.fetchall()
        return [row[0] for row in rows]


    def acquire_lock(self, file_path: str, agent_id: str) -> bool:
        cursor = self.conn.cursor()
        try:
            cursor.execute(
                "INSERT INTO file_locks (file_path, agent_id, timestamp) VALUES (?, ?, ?)",
                (file_path, agent_id, datetime.now())
            )
            self.conn.commit()
            return True
        except sqlite3.IntegrityError:
            cursor.execute("SELECT agent_id FROM file_locks WHERE file_path=?", (file_path,))
            owner = cursor.fetchone()[0]
            if owner == agent_id:
                return True
            return False

    def release_lock(self, file_path: str, agent_id: str):
        cursor = self.conn.cursor()
        cursor.execute("DELETE FROM file_locks WHERE file_path=? AND agent_id=?", (file_path, agent_id))
        self.conn.commit()

    def update_context(self, key: str, data: Dict[str, Any]):
        json_data = json.dumps(data)
        cursor = self.conn.cursor()
        cursor.execute(
            "INSERT OR REPLACE INTO shared_context (key, value, updated_at) VALUES (?, ?, ?)",
            (key, json_data, datetime.now())
        )
        self.conn.commit()

    def get_context(self, key: str) -> Optional[Dict[str, Any]]:
        cursor = self.conn.cursor()
        cursor.execute("SELECT value FROM shared_context WHERE key=?", (key,))
        row = cursor.fetchone()
        return json.loads(row[0]) if row else None