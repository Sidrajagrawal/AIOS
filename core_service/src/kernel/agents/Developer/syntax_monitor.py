import time
import threading
import os
import re
import sys
import pyttsx3
import pygetwindow as gw
import ctypes

if __name__ == "__main__":
    current_dir = os.path.dirname(os.path.abspath(__file__))
    src_dir = os.path.abspath(os.path.join(current_dir, "../../../"))
    if src_dir not in sys.path:
        sys.path.insert(0, src_dir)

from kernel.brain import ask_llama3

class AppDebuggerAgent(threading.Thread):
    def __init__(self, target_windows=None, wait_time=30):
        super().__init__(daemon=True)
        self.target_windows = target_windows if target_windows else []
        self.check_interval = 2
        self.wait_time = wait_time
        
        self.running = False
        self.last_mtime = 0
        self.error_detected_time = None
        self.has_spoken = False
        self.current_error_message = ""
        
        self.engine = pyttsx3.init()
        self.engine.setProperty('rate', 160)


    def execute(self, payload: dict):
        """Called by the AI-OS Orchestrator"""
        app_names = payload.get("target_apps", ["Visual Studio Code"]) 
        found_windows = []
        for name in app_names:
            found_windows.extend([w for w in gw.getAllWindows() if name.lower() in w.title.lower()])
            
        if not found_windows:
            return f"[Debugger] Could not find any open windows matching: {', '.join(app_names)}"

        self.target_windows = found_windows
        
        if not self.is_alive():
            self.start()
            return f"[Debugger] Started Brain-powered monitoring on {len(found_windows)} windows."
        else:
            return "[Debugger] Debugger is already running."

    def extract_file_path_from_title(self, title):
        match = re.search(r'([a-zA-Z0-9_\-\.\/\\]+\.(py|js|jsx|ts|tsx|java|cpp|c|cs|html|css|json))', title)
        if match:
            file_name = match.group(1)
            if not os.path.isabs(file_name):
                file_name = os.path.abspath(file_name) 
            return file_name
        return None

    def check_syntax_with_brain(self, file_path):
        try:
            with open(file_path, 'r', encoding='utf-8') as f:
                source_code = f.read()[-3000:] 
                
            system_role = "You are an expert, lightning-fast code compiler and linter."
            prompt = f"""
Analyze the following code snippet for glaring syntax errors.
Ignore logical errors or missing imports. ONLY look for broken syntax (missing brackets, bad indentation, invalid keywords, missing semicolons, etc.).

If the code is structurally valid or just looks incomplete, output EXACTLY ONE WORD: ALLOW.
If there is a definite syntax error, output a short, 1-sentence warning meant to be spoken out loud. (e.g. "Syntax error on line 12, missing a closing parenthesis.")

Code:
"""
            response = ask_llama3(prompt=prompt, system_role=system_role).strip()
            
            if "ALLOW" in response.upper() and len(response) < 10:
                return True, None
            else:
                return False, response

        except Exception as e:
            print(f"[Debugger Brain Error] {e}")
            return True, None

    def speak(self, text):
        self.engine.say(text)
        self.engine.runAndWait()

    def run(self):
        self.running = True
        print(f"\n[Brain Debugger] Active. Monitoring selected windows using AI-OS Brain...")

        while self.running:
            try:
                active_window = gw.getActiveWindow()
                if active_window:
                    is_targeted = any(target.title in active_window.title or active_window.title in target.title for target in self.target_windows if target.title)
                    
                    if is_targeted:
                        file_path = self.extract_file_path_from_title(active_window.title)
                        
                        if file_path and os.path.exists(file_path):
                            current_mtime = os.path.getmtime(file_path)

                            if current_mtime != self.last_mtime or self.error_detected_time is not None:
                                
                                if current_mtime != self.last_mtime:
                                    self.last_mtime = current_mtime
                                    print(f"[Brain Debugger] File change detected in {os.path.basename(file_path)}. Analyzing...")
                                    is_valid, error_msg = self.check_syntax_with_brain(file_path)
                                else:
                                    is_valid = False
                                    error_msg = self.current_error_message

                                if not is_valid:
                                    if self.error_detected_time is None:
                                        self.error_detected_time = time.time()
                                        self.has_spoken = False
                                        self.current_error_message = error_msg
                                        print(f"[Brain Debugger] Error found: {error_msg}")
                                        print(f"[Brain Debugger] Waiting {self.wait_time}s for user to fix it...")
                                    
                                    elif not self.has_spoken and (time.time() - self.error_detected_time >= self.wait_time):
                                        print("[Brain Debugger] Time's up. Speaking error...")
                                        self.speak(self.current_error_message)
                                        self.has_spoken = True 

                                else:
                                    if self.error_detected_time is not None:
                                        print("[Brain Debugger] Error resolved by user!")
                                        self.error_detected_time = None
                                        self.has_spoken = False
                                        self.current_error_message = ""

            except Exception as e:
                pass 
            time.sleep(self.check_interval)

def setup_monitoring():
    print("Fetching open taskbar applications...\n")
    all_windows = gw.getAllWindows()
    valid_windows = []
    
    for w in all_windows:
        title = w.title.strip()
        if title and title != "Program Manager":
            # Ask Windows if this app is actually visible on the screen/taskbar
            if ctypes.windll.user32.IsWindowVisible(w._hWnd):
                valid_windows.append(w)
    
    for i, w in enumerate(valid_windows):
        print(f"[{i}] {w.title}")
        
    print("-" * 40)
    selection = input("Enter the numbers of the apps you want to monitor (comma separated): ")
    
    try:
        selected_indices = [int(x.strip()) for x in selection.split(",")]
        selected_windows = [valid_windows[i] for i in selected_indices]
        
        print("\nSelected Applications:")
        for w in selected_windows:
            print(f"- {w.title}")
            
        return selected_windows
    except (ValueError, IndexError):
        print("Invalid selection. Exiting.")
        return []

if __name__ == "__main__":
    print("Initializing Brain-Powered Debugger Test...")
    selected_apps = setup_monitoring()
    
    if selected_apps:
        agent = AppDebuggerAgent(target_windows=selected_apps, wait_time=30)
        agent.start()

        try:
            while True:
                time.sleep(1)
        except KeyboardInterrupt:
            print("\nStopped by user.")
            agent.running = False
