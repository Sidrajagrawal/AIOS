# Multi-Agent Orchestrator
<p className="font-hand text-xl text-gray-400 mb-8">The central nervous system of AI-OS.</p>

---

The Orchestrator (`core_service/src/kernel/orchestrator.py`) acts as the master dispatcher. When a user submits a prompt, the orchestrator evaluates the request against the capabilities of all currently active agents.

## Routing Logic
The orchestrator follows a strict execution pipeline:
1. **Intent Parsing:** Determines the primary goal of the user's prompt.
2. **Capability Matching:** Queries the `agent_registry` to find agents with matching skill sets.
3. **Context Injection:** Pulls relevant recent history from `memory.py`.
4. **Execution:** Hands off the compiled payload to the selected agent.

## Example Flow
If a user types *"Create a React component for a glassmorphic button"*, the Orchestrator bypasses the General NLP Shell and routes the task directly to the **Code Architect** agent, appending local workspace context before execution.