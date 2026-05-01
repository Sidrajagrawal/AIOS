import pyautogui
import pygetwindow as gw
import pyperclip

typing_interrupt = False

def capture_screen():
    """Captures the full active window without cropping."""
    window = gw.getActiveWindow()
    if not window:
        return None
        
    img = pyautogui.screenshot(region=(
        window.left, window.top, window.width, window.height
    ))
    return img

def type_code_at_cursor(code: str):
    global typing_interrupt
    typing_interrupt = False
    
    pyperclip.copy(code)
    
    for char in code:
        if typing_interrupt:
            print("[!] Typing interrupted by user.")
            break
            
        if char == "\n":
            pyautogui.press("enter")
        else:
            try:
                pyautogui.typewrite(char, interval=0.0) 
            except Exception:
                pyperclip.copy(char)
                pyautogui.hotkey("ctrl", "v")
                
    typing_interrupt = False