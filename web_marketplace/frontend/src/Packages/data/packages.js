export const packagesData = [
  {
    categoryId: crypto.randomUUID(),
    categoryTitle: 'Developer Agents',
    agents: [
      {
        id: 'dev-1', title: 'Code Architect', subtitle: 'Design & Structure',
        description: 'Plans out repository architecture, generates boilerplate, and sets up scalable design patterns.',
        features: ['System Design', 'Folder Structure Generation', 'Tech Stack Suggestions'],
        iconUrl: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=500'
      },
      {
        id: 'dev-2', title: 'Code Debugger', subtitle: 'Find & Fix',
        description: 'Scans your codebase for logical errors, memory leaks, and syntax mistakes, offering instant fixes.',
        features: ['Real-time Error Tracking', 'Automated Patching', 'Stack Trace Analysis'],
        iconUrl: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=500'
      },
      {
        id: 'dev-3', title: 'DevOps Automator', subtitle: 'Deploy & Monitor',
        description: 'Handles CI/CD pipelines, Docker containerization, and AWS/GCP deployments.',
        features: ['Pipeline Creation', 'Server Health Checks', 'Auto-scaling Logic'],
        iconUrl: 'https://images.unsplash.com/photo-1618401471353-b98afee0b2eb?q=80&w=500'
      },
      {
        id: 'dev-4', title: 'Security Scanner', subtitle: 'Protect & Patch',
        description: 'Identifies vulnerabilities (OWASP top 10), misconfigurations, and outdated dependencies.',
        features: ['Pen-testing Bot', 'Dependency Audits', 'Secret Detection'],
        iconUrl: 'https://images.unsplash.com/photo-1555949963-aa79dcee981c?q=80&w=500'
      },
      {
        id: 'dev-5', title: 'DB Optimizer', subtitle: 'Query & Scale',
        description: 'Analyzes database queries and suggests indexing strategies to reduce latency.',
        features: ['Slow Query Logs', 'Schema Recommendations', 'Migration Scripts'],
        iconUrl: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=500'
      }
    ]
  },
  {
    categoryId: crypto.randomUUID(),
    categoryTitle: 'Creator Agents',
    agents: [
      {
        id: 'cre-1', title: 'UI/UX Generator', subtitle: 'Wireframes to UI',
        description: 'Generates high-fidelity Figma-style layouts based on simple text prompts.',
        features: ['Color Theory Matching', 'Component Sourcing', 'Responsive Layouts'],
        iconUrl: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?q=80&w=500'
      },
      {
        id: 'cre-2', title: 'Video Editor AI', subtitle: 'Cut & Splice',
        description: 'Automatically detects highlights, removes silences, and syncs cuts to background music.',
        features: ['Auto-Captioning', 'Highlight Extraction', 'Beat Syncing'],
        iconUrl: 'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?q=80&w=500'
      },
      {
        id: 'cre-4', title: '3D Asset Creator', subtitle: 'Model & Texture',
        description: 'Converts 2D images into fully textured 3D models ready for Unity or Unreal Engine.',
        features: ['Poly-count Reduction', 'UV Mapping', 'Rigging Assistant'],
        iconUrl: 'https://images.unsplash.com/photo-1615859131861-052f0641a60e?q=80&w=500'
      },
      {
        id: 'cre-5', title: 'Music Producer', subtitle: 'Compose & Mix',
        description: 'Generates royalty-free background tracks matching specific moods and tempos.',
        features: ['Stem Separation', 'Melody Generation', 'Auto-Mastering'],
        iconUrl: 'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?q=80&w=500'
      }
    ]
  },
  {
    categoryId: crypto.randomUUID(),
    categoryTitle: 'Gamer Agents',
    agents: [
      {
        id: 'gam-1', title: 'Game Telemetry', subtitle: 'Real-time Stats',
        description: 'Overlays live match data, enemy cooldowns, and positional heatmaps.',
        features: ['Live HUD Integration', 'Post-match Breakdown', 'Economy Tracking'],
        iconUrl: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=500'
      },
      {
        id: 'gam-2', title: 'Aim & Reflex Coach', subtitle: 'Train & Improve',
        description: 'Analyzes mouse movement and crosshair placement to build custom training routines.',
        features: ['Flick Accuracy Stats', 'Micro-adjustment Tracking', 'Custom Scenarios'],
        iconUrl: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=500'
      },
      {
        id: 'gam-3', title: 'Strategy Analyzer', subtitle: 'Drafts & Macros',
        description: 'Suggests team compositions, counter-picks, and macro-rotations based on the meta.',
        features: ['VOD Reviewer', 'Meta Tier Lists', 'Draft Simulation'],
        iconUrl: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?q=80&w=500'
      },
      {
        id: 'gam-4', title: 'Lobby Matchmaker', subtitle: 'Find the Squad',
        description: 'Scans discord servers and friend lists to build the optimal team for your rank.',
        features: ['Synergy Scoring', 'Toxicity Filtering', 'Schedule Sync'],
        iconUrl: 'https://images.unsplash.com/photo-1511882150382-421056c89033?q=80&w=500'
      }
    ]
  },
  {
    categoryId: crypto.randomUUID(),
    categoryTitle: 'Student Agents',
    agents: [
      {
        id: 'stu-1', title: 'Study Buddy', subtitle: 'Summarize & Learn',
        description: 'Condenses 50-page PDFs into readable summaries and key takeaways.',
        features: ['Document Parsing', 'Citation Extraction', 'Concept Mapping'],
        iconUrl: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=500'
      },
      {
        id: 'stu-2', title: 'Thesis Writer', subtitle: 'Structure & Cite',
        description: 'Assists in outlining essays, formatting bibliographies, and finding academic sources.',
        features: ['APA/MLA Formatting', 'Plagiarism Checks', 'Source Verification'],
        iconUrl: 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?q=80&w=500'
      },
      {
        id: 'stu-3', title: 'Math Solver', subtitle: 'Formulas & Graphs',
        description: 'Solves complex calculus and algebra problems with step-by-step reasoning.',
        features: ['Equation Rendering', 'Graph Visualization', 'Logic Breakdown'],
        iconUrl: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?q=80&w=500'
      },
      {
        id: 'stu-4', title: 'Flashcard Generator', subtitle: 'Spaced Repetition',
        description: 'Automatically creates Anki-style flashcards from your lecture notes.',
        features: ['Auto-Question Generation', 'Retention Tracking', 'Audio Pronunciation'],
        iconUrl: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?q=80&w=500'
      },
    ]
  }
];