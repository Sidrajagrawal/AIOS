import os
import shutil

class SecurityManager:
    def __init__(self):
        pass

    def safe_write_file(self, file_path: str, content: str):
        """
        SAFE: Uses Python's internal write, not 'echo > file'.
        """
        try:
            temp_path = f"{file_path}.tmp"
            with open(temp_path, "w", encoding="utf-8") as f:
                f.write(content)
                f.flush()
                os.fsync(f.fileno())
            
            os.replace(temp_path, file_path)
            return f"Successfully wrote to {file_path}"
        except Exception as e:
            return f"Error writing file: {str(e)}"

    def safe_delete_file(self, file_path: str):
        """
        SAFE: Uses Python's os.remove.
        You can add logic here: "Don't delete anything in System32"
        """
        if "System32" in file_path or "/etc/" in file_path:
             return "SECURITY: You cannot delete system files."
        
        try:
            if os.path.exists(file_path):
                os.remove(file_path)
                return f"Deleted {file_path}"
            return "File not found."
        except Exception as e:
            return f"Error deleting: {str(e)}"

    def safe_list_files(self, dir_path: str = "."):
        """
        SAFE: Uses os.listdir, not 'ls' or 'dir'.
        """
        try:
            files = os.listdir(dir_path)
            return files
        except Exception as e:
            return f"Error reading folder: {str(e)}"
    def execute_shell_command_with_permission(self, command: str):
        """
        Only runs if the HUMAN says 'y'.
        """
        print(f"\nAGENT WANTS TO RUN: {command}")
        user_input = input("Allow this? (y/n): ")
        
        if user_input.lower() == 'y':
            os.system(command) 
            return "Command executed."
        else:
            return "User denied permission."