import customtkinter as ctk
from core_service.src.kernel.tools.Common.window_tools import WindowManager

ctk.set_appearance_mode("Dark")
ctk.set_default_color_theme("blue")

class FocusAlertUI:
    @staticmethod
    def show_warning(task_description, blocked_window, previous_window, snooze_callback, snooze_used):
        root = ctk.CTk()
        root.title("AI-OS Focus Alert")
        root.attributes("-topmost", True)
        
        window_width = 450
        window_height = 220
        
        root.update_idletasks()
        screen_width = root.winfo_screenwidth()
        x = screen_width - window_width - 20
        y = 30 
        root.geometry(f"{window_width}x{window_height}+{x}+{y}")

        ctk.CTkLabel(root, text="Distraction Detected!", text_color="#ff4444", font=("Arial", 20, "bold")).pack(pady=(15, 5))
        ctk.CTkLabel(root, text=f"Goal: {task_description}", text_color="white", font=("Arial", 14)).pack()
        
        safe_title = blocked_window.title.encode('ascii', 'ignore').decode('ascii')
        ctk.CTkLabel(root, text=f"Window: {safe_title[:40]}...", text_color="gray", font=("Arial", 12)).pack(pady=(5, 10))

        time_left = 5
        timer_label = ctk.CTkLabel(root, text=f"Auto-closing in {time_left}s...", text_color="#ff4444", font=("Arial", 12, "bold"))
        timer_label.pack()

        timer_id = None

        def clean_shutdown():
            try:
                if timer_id:
                    root.after_cancel(timer_id)
                root.destroy()
            except Exception:
                pass

        def action_close():
            WindowManager.close_distraction(blocked_window, safe_title)
            clean_shutdown()

        def action_go_back():
            WindowManager.activate_previous(previous_window)
            clean_shutdown()

        def action_snooze():
            snooze_callback()
            clean_shutdown()

        def update_timer():
            nonlocal time_left, timer_id
            if not root.winfo_exists():
                return
            if time_left > 0:
                time_left -= 1
                timer_label.configure(text=f"Auto-closing in {time_left}s...")
                timer_id = root.after(1000, update_timer)
            else:
                action_close()

        btn_frame = ctk.CTkFrame(root, fg_color="transparent")
        btn_frame.pack(pady=10)

        ctk.CTkButton(btn_frame, text="Close Now", width=100, fg_color="#ff4444", hover_color="#cc0000", command=action_close).pack(side=ctk.LEFT, padx=5)
        ctk.CTkButton(btn_frame, text="Go Back", width=100, fg_color="#4CAF50", hover_color="#388E3C", command=action_go_back).pack(side=ctk.LEFT, padx=5)

        if not snooze_used:
            ctk.CTkButton(btn_frame, text="Snooze (5m)", width=100, fg_color="#ff9800", text_color="black", hover_color="#e68a00", command=action_snooze).pack(side=ctk.LEFT, padx=5)

        timer_id = root.after(1000, update_timer)
        root.mainloop()