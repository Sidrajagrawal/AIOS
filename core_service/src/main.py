import os
import sys
import time

# Core OS Imports
from kernel.orchestrator import Orchestrator, TaskPriority

# Agent Imports
from kernel.agents.Common.Focus_agent import FocusGuardianAgent
from kernel.agents.Developer.architect import ArchitectAgent 

def show_main_menu():
    """Displays a terminal menu to select the AI-OS mode."""
    print("\n" + "="*45)
    print(" 🤖 AI-OS Startup Menu ")
    print("="*45)
    print("Select which agent you want to run:")
    print("  1. Focus Guardian Agent")
    print("  2. Developer (Architect) Agent")
    print("  3. NLP Shell Agent")
    print("  4. Start Core OS Only (Background)")
    print("  0. Exit")
    print("-" * 45)
    
    choice = input("Enter number (0-4): ").strip()
    try:
        return int(choice)
    except ValueError:
        return -1

def ask_focus_goal():
    """Terminal prompts for the Focus Agent setup."""
    print("\n--- 🎯 Focus Guardian Setup ---")
    goal = input("What is your focus goal? (e.g., Study GenAI): ").strip()
    
    if not goal:
        return None, None, None
        
    duration_input = input("For how many hours? (default 3.0): ").strip()
    duration = float(duration_input) if duration_input else 3.0
    
    apps_input = input("Allowed apps (comma separated, e.g., vscode, chrome): ").strip()
    allowed_apps = [app.strip() for app in apps_input.split(',')] if apps_input else []
    
    return goal, duration, allowed_apps

def ask_developer_prompt():
    """Terminal prompts for the Developer Agent setup."""
    print("\n--- 💻 Developer Agent Setup ---")
    prompt = input("What project do you want to build? (e.g., A real-time chat app): ").strip()
    return prompt


if __name__ == "__main__":
    os.system('cls' if os.name == 'nt' else 'clear') # Clears the terminal for a clean UI
    print("Initializing AI-OS...")

    # 1. Ask User which mode they want to run
    choice = show_main_menu()

    if choice == 0:
        print("[System] Startup cancelled by user. Exiting.")
        sys.exit(0)
    elif choice not in [1, 2, 3, 4]:
        print("[System] Invalid choice. Exiting.")
        sys.exit(0)

    # 2. Always start the Orchestrator (Kernel) first for background task processing
    print("\n[System] Starting Core OS Orchestrator...")
    os_kernel = Orchestrator()
    os_kernel.start()

    # 3. Route to the selected Agent
    if choice == 1:
        # --- FOCUS AGENT ---
        user_goal, duration_hours, allowed_apps = ask_focus_goal()
        
        if user_goal:
            focus_agent = FocusGuardianAgent(
                task_description=user_goal, 
                allowed_apps=allowed_apps, 
                duration_hours=duration_hours
            )
            focus_agent.start()
        else:
            print("[System] Focus Agent setup cancelled.")

    elif choice == 2:
        # --- DEVELOPER AGENT ---
        dev_prompt = ask_developer_prompt()
        
        if dev_prompt:
            # Submit task to the background Orchestrator
            os_kernel.submit_task(
                task_id="DEV_001",
                agent_type="ArchitectAgent",
                payload={
                    "session_id": "dev_project_session",
                    "action": "init",
                    "prompt": dev_prompt
                },
                priority=TaskPriority.CRITICAL
            )
        else:
            print("[System] Developer Agent setup cancelled.")

    elif choice == 3:
        # --- NLP SHELL AGENT ---
        print("\n[System] Mode Selected: NLP Shell")
        print("[System] Loading NLP Shell interface...")
        # Note: Add your specific execution script/import here 
        # Example: os.system("python src/kernel/agents/Common/NLP_Shell/train_model.py")

    elif choice == 4:
        # --- CORE OS ONLY ---
        print("\n[System] Mode Selected: Core OS Only")
        print("[System] Running background services with no active foreground agents.")


    # Keep OS alive
    try:
        print("\n[AI-OS] System is running successfully. Press Ctrl+C to terminate.")
        while True:
            time.sleep(1)
    except KeyboardInterrupt:
        print("\nShutting down AI-OS...")
        sys.exit(0)