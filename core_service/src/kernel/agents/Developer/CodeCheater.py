import os
import re
import time
import keyboard
import threading
from dotenv import load_dotenv

from ...brain import ask_groq, ask_gemini_vision
import core_service.src.kernel.tools.Developer.CodeCheater_tool as cc_tool

load_dotenv()

class CodeCheaterAgent:
    def __init__(self):
        self.listener_active = False
        self.base_system_role = """You are an elite competitive programming AI solver.
        
        CRITICAL RULE: You MUST output ONLY valid, executable code. 
        Do not include any conversational text, explanations, comments, or markdown blocks (like ```cpp)."""

    def get_cleaned_ocr(self, img) -> str:
        prompt = """
        Analyze this full screenshot of a competitive programming platform.
        Extract the core problem details AND any starter/boilerplate code visible in the code editor.
        
        Return STRICT format:
        
        PROBLEM:
        [Extract the core problem statement]
        
        INPUT/OUTPUT:
        [Extract examples, if any]
        
        CONSTRAINTS:
        [Extract constraints, if any]
        
        STARTER CODE:
        [Extract the EXACT class and method signature visible in the code editor. If the editor is blank or just has standard imports, write "None".]
        
        Do NOT solve anything.
        """
        return ask_gemini_vision(prompt, img)

    def build_solver_prompt(self, problem_text: str, language: str) -> str:
        return f"""Solve this competitive programming problem in {language}.
        
        RULES:
        - Output ONLY valid, executable code.
        - If STARTER CODE is provided below, you MUST use that exact class and method signature. Do not write a main() function if a specific method is requested.
        - If STARTER CODE is "None", write a full runnable program with standard I/O (e.g., #include <bits/stdc++.h> and int main() for C++, or class Main for Java).
        
        EXTRACTED DATA:
        {problem_text}
        """

    def clean_code_output(self, raw: str) -> str:
        if not raw:
            return ""

        raw = re.sub(r"```.*?```", "", raw, flags=re.DOTALL)
        raw = raw.strip()

        lines = raw.split("\n")
        cleaned = []
        started = False

        for line in lines:
            s = line.strip()
            if started:
                cleaned.append(line)
                continue

            if re.match(r"(#include|import|public|class|using|int main)", s):
                started = True
                cleaned.append(line)

        raw = "\n".join(cleaned)

        if "}" in raw:
            raw = raw[:raw.rfind("}") + 1]

        return raw.strip()

    def _trigger_hotkey(self, lang: str):
        payload = {
            "action": "solve_and_type",
            "language": lang
        }
        threading.Thread(target=self.execute, args=(payload,)).start()

    def _trigger_stop(self):
        cc_tool.typing_interrupt = True

    def execute(self, payload: dict) -> str:
        action = payload.get("action", "solve_and_type")
        language = payload.get("language", "C++")
        history = payload.get("history", [])

        if action == "init":
            if not self.listener_active:
                keyboard.add_hotkey("shift+3", lambda: self._trigger_hotkey("C++"))
                keyboard.add_hotkey("shift+4", lambda: self._trigger_hotkey("Java"))
                keyboard.add_hotkey("shift+esc", self._trigger_stop)
                self.listener_active = True
                return "Daemon running. Universal Screen Parsing Active."
            else:
                return "Daemon is already running."

        elif action == "stop_typing":
            self._trigger_stop()
            return "Sent interrupt signal to typing tool."

        elif action == "solve_and_type":
            try:

                img = cc_tool.capture_screen()
                if not img:
                    return "Error: No active window detected to capture."
                
                problem_text = self.get_cleaned_ocr(img)
                
                if "Brain" in problem_text and "Error" in problem_text:
                    return problem_text 

                prompt = self.build_solver_prompt(problem_text, language)
                
                raw_code = ask_groq(
                    prompt, 
                    system_role=self.base_system_role, 
                    model="openai/gpt-oss-120b",  
                    history=history
                )
                
                cleaned_code = self.clean_code_output(raw_code)
                if not cleaned_code:
                    return "Error: Central brain failed to generate code."

                time.sleep(0.5) 
                cc_tool.type_code_at_cursor(cleaned_code)

                return f"Success: Solved and typed {language} solution."

            except Exception as e:
                return f"CodeCheater Error: {str(e)}"
        else:
            return f"Error: Unknown action '{action}' for CodeCheaterAgent."