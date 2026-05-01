# AI-OS
**AI-OS** is a next-generation, intelligence-first operating environment designed to seamlessly integrate artificial intelligence into daily computing. By replacing traditional rigid operating system paradigms with dynamic, agent-driven architecture, AI-OS adapts to your workflows, manages tasks autonomously, and provides a deeply contextual user experience.
---

# Key Features

### Intelligent Kernel & Orchestrator
The core Python-based engine that manages background processes, agent life-cycles, and systemic security.

### Focus Agent
A context-aware productivity guardian that actively restricts digital distractions based on your real-time, user-defined goals.

### Dynamic Memory & Brain
Long-term and short-term contextual memory systems that learn from your interactions, ensuring the OS understands your habits and preferences over time.

### NLP Shell
Interact with your system using natural language instead of rigid command-line syntax.

### Developer Architect Agent
An embedded AI assistant dedicated to writing, reviewing, and scaffolding code natively within the OS environment.

### Cross-Platform Desktop Client
A sleek, high-performance desktop interface built with Electron and React.

### Web Marketplace
An integrated ecosystem to discover, download, and manage third-party AI agents and extensions. Includes stunning 3D interactive UI elements powered by Spline.

---

# System Architecture

AI-OS is built on a modern, **decoupled microservices architecture**:

### Core Service (`/core_service`)
The central nervous system written in **Python**.  
It handles:

- NLP processing  
- Agent orchestration  
- Memory management  
- System security  

### Desktop Environment (`/desktop_app`)
The presentation layer built with:

- **Electron**
- **React**
- **Vite**

Provides a native application wrapper for the AI interface.

### Agent Marketplace (`/web_marketplace`)

#### Backend
- Node.js  
- Express API  
- Passport.js authentication  
- Rate limiting  
- Swagger documentation  

#### Frontend
- React  
- Tailwind CSS  
- Agent installation portal  

---

# Technology Stack

| Component | Technologies Used |
|----------|------------------|
| Core Kernel | Python, Natural Language Processing, Custom Memory Architectures |
| Desktop Client | Electron, React, Vite, CSS Modules |
| Marketplace API | Node.js, Express, Passport.js, Swagger, Rate Limiter |
| Marketplace Web | React, Vite, Tailwind CSS, Spline3D, PostCSS |

---

# Getting Started

## Prerequisites

- Python **3.9+**
- Node.js **v18+**
- npm or yarn

---

# Initialize the Core Service

The Python core is the **engine of AI-OS**. It must be running for the client applications to function.

```bash
cd core_service

# Create and activate a virtual environment
python -m venv venv
source venv/bin/activate   # On Windows: venv\Scripts\activate

# Install dependencies
pip install -r ../requirements.txt

# Set up environment variables
cp .env.example .env

# Start the kernel
python src/main.py
```
# Launch the Desktop Client
```bash
cd desktop_app/frontend

npm install

# Start the Electron app in development mode
npm run dev
```
# Run the Web Marketplace
```bash
cd web_marketplace/backend

npm install
cp .env.example .env

npm run dev
```

# API Documentation
The Web Marketplace backend includes fully integrated Swagger documentation.
Once the marketplace backend is running, navigate to:
```bash
http://localhost:<PORT>/api-docs
```
This allows you to view and test the available REST endpoints for:
Authentication
User management
Agent retrieval