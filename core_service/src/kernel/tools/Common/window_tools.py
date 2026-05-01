import pygetwindow as gw
import pyautogui
import time

class WindowManager:
    @staticmethod
    def get_active_window():
        return gw.getActiveWindow()

    @staticmethod
    def close_distraction(window, safe_title):
        try:
            title_lower = safe_title.lower()
            browsers = ['chrome', 'edge', 'firefox', 'brave', 'opera', 'safari']
            is_browser = any(b in title_lower for b in browsers)

            if is_browser:
                print(f"  -> [Action: Sending Ctrl+W to close browser tab]")
                window.activate()
                time.sleep(0.2) 
                pyautogui.hotkey('ctrl', 'w')
            else:
                print(f"  -> [Action: Closing entire application]")
                window.close() 
        except Exception as e:
            print(f"  -> [Error closing distraction: {e}]")

    @staticmethod
    def activate_previous(previous_window):
        try:
            if previous_window:
                previous_window.activate()
        except Exception:
            pass