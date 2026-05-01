import { Info, Download, Cpu, Code, Shield, Terminal } from 'lucide-react';

export const docCategories = [
  {
    id: 'intro',
    title: 'Introduction',
    description: "What is AI-OS & its core features",
    icon: Info,
    articles: [
      { id: 'what-is-aios', title: 'What is AI-OS?' },
      { id: 'architecture', title: 'System Architecture' },
      { id: 'requirements', title: 'System Requirements' }
    ]
  },
  {
    id: 'core',
    title: 'Core Services',
    description: "The kernel, orchestrator, and memory",
    icon: Cpu,
    articles: [
      { id: 'orchestrator', title: 'Multi-Agent Orchestrator' },
      { id: 'memory', title: 'Memory Management' },
      { id: 'brain', title: 'LLM Brain Integration' }
    ]
  },
  {
    id: 'dev',
    title: 'Developer Agents',
    description: "Architect, CodeCheater, and Syntax tools",
    icon: Code,
    articles: [
      { id: 'codecheater', title: 'Using CodeCheater' },
      { id: 'architect', title: 'Code Architect Setup' },
      { id: 'syntax', title: 'Syntax Monitor Directives' }
    ]
  },
  {
    id: 'security',
    title: 'Security',
    description: "Permissions and secure execution",
    icon: Shield,
    articles: [
      { id: 'protocols', title: 'Execution Protocols' },
      { id: 'sandboxing', title: 'Agent Sandboxing' }
    ]
  },
  {
    id: 'packages',
    title: 'Packages',
    description: "Installing and managing Agent Packages",
    icon: Download,
    articles: [
      { id: 'installation', title: 'Package Installation' },
      { id: 'marketplace', title: 'Web Marketplace Usage' }
    ]
  },
  {
    id: 'tools',
    title: 'Kernel Tools',
    description: "CLI and Window management utilities",
    icon: Terminal,
    articles: [
      { id: 'cli', title: 'CLI Tool' },
      { id: 'window', title: 'Window Tracking Tools' }
    ]
  }
];