import asyncio
import subprocess
from pathlib import Path

async def execute_cli_command(command: str, target_directory: str):
    try:
        work_dir = Path(target_directory).expanduser().resolve()

        if not work_dir.exists():
            return {
                "status": "error", 
                "output": f"Directory not found: {work_dir}"
            }

        print(f"DEBUG: Executing in: {work_dir}", flush=True)
        print(f"DEBUG: Command: {command}", flush=True)

        def run_command_sync():
            return subprocess.run(
                command,
                cwd=str(work_dir),
                shell=True,
                capture_output=True,
                text=True 
            )


        result = await asyncio.to_thread(run_command_sync)
        
        if result.returncode != 0:
            return {"status": "error", "output": result.stderr.strip()}
            
        return {"status": "success", "output": result.stdout.strip()}

    except Exception as e:
        error_msg = str(e) or repr(e) 
        print(f"DEBUG: Exception: {error_msg}", flush=True)
        return {"status": "error", "output": error_msg}