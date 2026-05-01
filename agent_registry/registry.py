
from core_service.src.kernel.agents.Developer.architect import ArchitectAgent
from core_service.src.kernel.agents.Common.Focus_agent import FocusGuardianAgent
from core_service.src.kernel.agents.Developer.CodeCheater import CodeCheaterAgent

AGENT_REGISTRY = {
    "codearchitect": ArchitectAgent(),
    "focus":FocusGuardianAgent(),
    "code helper":CodeCheaterAgent(),
}

def get_agents(agent_type: str):
    return AGENT_REGISTRY.get(agent_type.lower())