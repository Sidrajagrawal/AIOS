from .Developer.architect import ArchitectAgent
AGENT_REGISTRY = {
    "ArchitectAgent": ArchitectAgent(),
}

def get_agent(agent_type: str):
    return AGENT_REGISTRY.get(agent_type)