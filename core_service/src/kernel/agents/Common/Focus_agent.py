import time
import threading
from ...brain import ask_groq
from core_service.src.kernel.tools.Common.window_tools import WindowManager
from ...ui.focus_alert import FocusAlertUI

class FocusGuardianWorker(threading.Thread):
    def __init__(self, task_description, allowed_apps=None, duration_hours=3.0, check_interval=3):
        super().__init__(daemon=True)
        self.task_description = task_description
        self.allowed_apps = allowed_apps if allowed_apps else []
        self.end_time = time.time() + (float(duration_hours) * 3600)
        self.check_interval = check_interval
        
        self.snooze_used = False
        self.snooze_until = 0
        self.running = False
        self.last_allowed_window = None

    def evaluate_window(self, window_title):
        lower_title = window_title.lower()
        
        if lower_title in ["new tab - google chrome", "google", "search", "new tab","AI OS"]:
            return "ALLOW"
            
        for app in self.allowed_apps:
            if app and app.lower() in lower_title:
                return "ALLOW"

        system_role = "You are a strict productivity enforcer. Output EXACTLY ONE WORD: ALLOW or BLOCK. Do not output any other text."
        prompt = f"""
User's Goal: "{self.task_description}"
Current Opened Application/Site: "{window_title}"

Is this application relevant and helpful for the user's goal? 
Reply with ONLY the word ALLOW or BLOCK.
"""
        try:
            response = ask_groq(prompt=prompt, system_role=system_role, model="llama-3.1-8b-instant")
            return "BLOCK" if "BLOCK" in response.upper() else "ALLOW"
        except Exception as e:
            return "ALLOW"

    def trigger_snooze(self):
        """Callback function to pass to the UI"""
        self.snooze_used = True
        self.snooze_until = time.time() + 300

    def run(self):
        self.running = True
        last_checked_title = ""

        while self.running and time.time() < self.end_time:
            if time.time() < self.snooze_until:
                time.sleep(self.check_interval)
                continue

            try:
                current_window = WindowManager.get_active_window()
                if not current_window or not current_window.title.strip():
                    time.sleep(self.check_interval)
                    continue

                current_title = current_window.title.strip()

                if current_title != last_checked_title:
                    verdict = self.evaluate_window(current_title)
                    
                    if verdict == "BLOCK":
                        FocusAlertUI.show_warning(
                            task_description=self.task_description,
                            blocked_window=current_window,
                            previous_window=self.last_allowed_window,
                            snooze_callback=self.trigger_snooze,
                            snooze_used=self.snooze_used
                        )
                        last_checked_title = "" 
                    else:
                        self.last_allowed_window = current_window
                        last_checked_title = current_title

            except Exception:
                pass 
            
            time.sleep(self.check_interval)


class FocusGuardianAgent:
    def __init__(self):
        pass

    def execute(self, payload):
        prompt = payload.get("prompt", "")
        
        task_description = prompt
        duration_hours = 3.0
        allowed_apps = []

        try:
            parts = prompt.split('|')
            for part in parts:
                if 'Goal:' in part:
                    task_description = part.replace('Goal:', '').strip()
                elif 'Duration:' in part:
                    duration_str = part.replace('Duration:', '').replace('h', '').strip()
                    duration_hours = float(duration_str)
                elif 'Allowed:' in part:
                    apps_str = part.replace('Allowed:', '').strip()
                    allowed_apps = [app.strip() for app in apps_str.split(',') if app.strip()]
        except Exception as e:
            print(f"Failed to parse focus prompt, using defaults: {e}")

        worker = FocusGuardianWorker(
            task_description=task_description,
            allowed_apps=allowed_apps,
            duration_hours=duration_hours
        )
        worker.start()

        return f"Focus Protocol Active: Tracking '{task_description}' for {duration_hours} hours."