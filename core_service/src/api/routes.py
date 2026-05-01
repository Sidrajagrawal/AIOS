import uuid
import asyncio
import threading
import os
import sys
import random
import httpx
from datetime import datetime, timedelta
from fastapi import APIRouter, HTTPException
from dotenv import load_dotenv
from pydantic import BaseModel
from core_service.src.kernel.orchestrator import Orchestrator, TaskPriority
from core_service.src.kernel.tools.Developer.cli_tool import execute_cli_command

def get_env_path():
    if getattr(sys, 'frozen', False):
        return os.path.join(os.path.dirname(sys.executable), '.env')
    else:
        return os.path.join(os.path.dirname(__file__), '../../../../.env')

load_dotenv(get_env_path())

WEB_BACKEND_API = os.getenv('WEB_BACKEND_API')

router = APIRouter()
os_kernel = Orchestrator()
os_kernel.start()
OTP_STORE = {}

class OTPRequest(BaseModel):
    email: str

class VerifyRequest(BaseModel):
    email: str
    otp: str


class PromptRequest(BaseModel):
    agentId: str
    agentName: str
    prompt: str
    mode: str = "industry"
    sessionId: str = "default_api_session"

class ExecutionRequest(BaseModel):
    command : str
    target_directory: str


@router.post("/callAgent")
async def process_agent_prompt(request: PromptRequest):
    try:
        task_id = f"API_TASK_{uuid.uuid4().hex[:8]}"
        completion_event = threading.Event()
        
        if request.agentName.lower() == 'architectagent':
            payload = {
                "session_id": request.sessionId,
                "action": "init",
                "prompt": request.prompt,
                "mode": request.mode,
                "completion_event": completion_event
            }
        else:
            payload = {
                "session_id": request.sessionId,
                "action": "init",
                "prompt": request.prompt,
                "completion_event": completion_event
            }
        
        os_kernel.submit_task(
            task_id=task_id,
            agent_type=request.agentName,
            payload=payload,
            priority=TaskPriority.CRITICAL
        )
        
        await asyncio.to_thread(completion_event.wait, timeout=120.0)
        
        execution_result = payload.get("result", "Error: Task timed out or failed to execute.")
        return {
            "status": "success",
            "agent": request.agentName,
            "received_prompt": request.prompt,
            "execution_result": execution_result
        }

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    
@router.post('/execute-cmd')
async def executeCmd(request: ExecutionRequest):
    try:
        print(request)
        result = await execute_cli_command(request.command, request.target_directory)
        if result["status"] == "error":
            return {"status":"error","output":result["output"]}
        return {"status":"success","output":result["output"]}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    


@router.post("/send-otp")
async def send_auth_code(request: OTPRequest):
    email = request.email
    otp_code = str(random.randint(100000, 999999))
    
    OTP_STORE[email] = {
        "otp": otp_code,
        "expires": datetime.now() + timedelta(minutes=5)
    }

    brevo_api_key = os.getenv("BREVO_API_KEY")
    sender_email = os.getenv("EMAIL_HOST_USER")
    
    url = "https://api.brevo.com/v3/smtp/email"
    headers = {
        "accept": "application/json",
        "api-key": brevo_api_key,
        "content-type": "application/json"
    }
    payload = {
        "sender": {"name": "AI.OS System", "email": sender_email}, 
        "to": [{"email": email}],
        "subject": "AI OS - Operator Authorization Code",
        "htmlContent": f"""
        <div style="font-family: monospace; background-color: #070b14; color: #00f0ff; padding: 20px; text-align: center;">
            <h2>SYSTEM AUTHORIZATION</h2>
            <p>Your access code is:</p>
            <h1 style="letter-spacing: 5px;">{otp_code}</h1>
            <p style="font-size: 12px; color: #555;">This code expires in 5 minutes.</p>
        </div>
        """
    }

    async with httpx.AsyncClient() as client:
        response = await client.post(url, headers=headers, json=payload)

    if response.status_code not in (200, 201, 202):
        print(f"Brevo Error: {response.text}")
        raise HTTPException(status_code=500, detail="Failed to dispatch email via Brevo")
        
    return {"status": "success", "message": "Authorization code dispatched"}


@router.post("/verify-otp")
async def verify_auth_code(request: VerifyRequest):
    email = request.email
    record = OTP_STORE.get(email)
    
    if not record:
        raise HTTPException(status_code=400, detail="No authorization request found for this operator")
        
    if datetime.now() > record["expires"]:
        del OTP_STORE[email]
        raise HTTPException(status_code=400, detail="Authorization code expired")
        
    if record["otp"] != request.otp:
        raise HTTPException(status_code=400, detail="Invalid authorization code")
        
    del OTP_STORE[email]

    assigned_agents = None
    if WEB_BACKEND_API:
        try:
            async with httpx.AsyncClient() as client:
                response = await client.post(
                    f"{WEB_BACKEND_API}/agent/getAssignAgents",
                    json={"email": email} 
                )
                if response.status_code in (200, 201):
                    full_json = response.json()
                    assigned_agents = full_json.get("data", [])

        except Exception as e:
            print(f"Failed to connect to WEB_BACKEND_API: {e}")
    return {
        "status": "success", 
        "message": "Operator verified",
        "agents": assigned_agents,
    }



@router.get("/health")
async def health_check():
    return {"status": "online", "service": "AI OS Core"}