# System Architecture
<p className="font-hand text-xl text-gray-400 mb-8">How the layers communicate.</p>

---

The AI-OS architecture is divided into three primary layers, ensuring a strict separation of concerns between the user interface, the intelligence routing, and the execution environments.

### 1. The Presentation Layer (Desktop App)
Built using Electron, React, and Vite. This layer provides the glassmorphic GUI where users input natural language prompts, view agent execution streams, and manage installed packages.

### 2. The Intelligence Layer (Core Service)
The Python-based backend that acts as the "Brain." It houses the Multi-Agent Orchestrator, which is responsible for parsing prompts, retrieving contextual memory, and routing tasks to the appropriate agent from the registry.

### 3. The Execution Layer (Agents & Tools)
The specific Python scripts (e.g., `architect.py`, `CodeCheater.py`) that actually perform the work. Agents utilize "Tools" (like `cli_tool.py` and `window_tools.py`) to interface directly with the host Linux operating system.