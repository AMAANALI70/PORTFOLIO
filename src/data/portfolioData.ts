export interface Project {
  id: string;
  number: string;
  title: string;
  area: string;
  year: string;
  description: string;
  approach: string;
  outcome: string;
  stack: string[];
  metric?: { value: string; label: string };
}

export interface ResearchRecord {
  id: string;
  number: string;
  title: string;
  context: string;
  method: string;
  result: string;
  distinction?: string;
}

export interface ArchiveRecord {
  id: string;
  label: string;
  detail: string;
}

export interface BuildNote {
  id: string;
  index: string;
  title: string;
  context: string;
  detail: string;
  stack: string;
}

export const PROJECTS_DATA: Project[] = [
  {
    id: 'slice-orchestrator', number: '01', title: '5G Slice Orchestrator', area: 'NETWORK SYSTEMS', year: '2025—26',
    description: 'An autonomous, QoS-aware orchestration system for eMBB, URLLC and mMTC network slices, built and tested across a physical multi-VM testbed.',
    approach: 'A LangGraph Observe–Think–Act–Reflect loop coordinates monitoring, resource planning, validation and recovery. Temporal Convolutional Network models predict slice telemetry to inform resource allocation.',
    outcome: 'Connects Kubernetes, Open5GS, UERANSIM, MEC workloads, traffic control, and Prometheus/Grafana monitoring in one operational system.',
    stack: ['Python', 'LangGraph', 'Kubernetes', 'Open5GS', 'UERANSIM', 'Prometheus', 'Grafana'],
  },
  {
    id: 'synapse-tutor', number: '02', title: 'Synapse AI Tutor', area: 'LEARNING SYSTEMS', year: '2026',
    description: 'An adaptive learning platform combining PDF ingestion, retrieval, assessment, learner memory, visual explanations, and streaming LLM interactions.',
    approach: 'A GraphRAG pipeline combines FAISS, BM25, sentence-transformer embeddings, and NetworkX knowledge graphs. Persistent learner profiles support adaptive assessment.',
    outcome: 'React 19 frontend and FastAPI backend, with JWT authentication, server-sent events, and multi-provider LLM integration.',
    stack: ['React', 'TypeScript', 'FastAPI', 'FAISS', 'BM25', 'NetworkX', 'LLMs'],
  },
  {
    id: 'assetsense', number: '03', title: 'AssetSense', area: 'INDUSTRIAL IOT', year: '2026',
    description: 'An end-to-end predictive maintenance platform carrying sensor readings from ESP32 nodes into a live monitoring and alerting system.',
    approach: 'MQTT feeds a Node.js service; WebSockets stream telemetry to dashboards while MongoDB stores readings. Online anomaly detection estimates health, drift, faults, and remaining useful life.',
    outcome: 'An Auto-Protect failover switches a degraded asset to a redundant standby when its health threshold is crossed.',
    stack: ['ESP32', 'MQTT', 'WebSockets', 'Node.js', 'MongoDB', 'React', 'Brain.js'],
  },
  {
    id: 'egonav', number: '04', title: 'EgoNav', area: 'EMBODIED AI', year: '2026',
    description: 'A zero-shot vision-language navigation system for open-vocabulary indoor environments, running on Raspberry Pi.',
    approach: 'Three-camera panoramic perception, Qwen2.5-VL reasoning, YOLOv8 obstacle detection, stateful ego-context memory, and deterministic motor control form a closed loop.',
    outcome: 'A reported 12.5 Hz control loop with 45 ms mean action latency, plus action validation and person-safety detection.',
    stack: ['Qwen2.5-VL', 'YOLOv8', 'FastAPI', 'Flask', 'Ollama', 'Raspberry Pi'],
    metric: { value: '45 ms', label: 'reported mean action latency' },
  },
  {
    id: 'slm-embedded', number: '05', title: 'Small Language Model on ESP32', area: 'EDGE INFERENCE', year: '2026',
    description: 'An autoregressive language-model inference pipeline running on a physical ESP32, without PSRAM or cloud inference.',
    approach: 'The implementation covers BPE tokenization, a five-layer Transformer, token generation, and detokenization. Language interpretation stays separate from deterministic hardware control.',
    outcome: 'TinyStories-260K generation at approximately 3.8 tokens per second on device; structured commands and validation support the safety-oriented architecture.',
    stack: ['C++', 'C', 'Python', 'ESP32', 'Transformer inference'],
    metric: { value: '~3.8', label: 'tokens / second on device' },
  },
  {
    id: 'adapti-llm', number: '06', title: 'AdaptiLLM', area: 'ON-DEVICE AI', year: '2026',
    description: 'An adaptive on-device LLM inference pipeline for Android that responds to changing battery, memory, latency, and quality constraints.',
    approach: 'A softmax-weighted multi-objective policy selects HIGH, BALANCED, or EFFICIENT modes. Native llama.cpp inference connects through JNI, with TFLite query classification and KV-cache reuse.',
    outcome: 'Per-inference logging tracks latency, throughput, and energy proxies; output passes through an eight-stage sanitization pipeline.',
    stack: ['Kotlin', 'C++', 'JNI', 'llama.cpp', 'TensorFlow Lite', 'Android'],
  },
  {
    id: 'research-agent', number: '07', title: 'RESEARGENT', area: 'RESEARCH AUTOMATION', year: '2026',
    description: 'An autonomous research pipeline that moves from paper discovery to experiments and IEEE-format reports.',
    approach: 'It ingests arXiv papers, local PDFs, and Google Scholar results, identifies research gaps, generates experiments, and executes code in a restricted sandbox.',
    outcome: 'Phase-specific model routing includes provider fallback, persistent experiment and error memory, bounded self-correction, result interpretation, and execution safeguards.',
    stack: ['Python', 'LangChain', 'Groq', 'Gemini', 'scikit-learn', 'SciPy'],
  },
  {
    id: 'prashnopatra', number: '08', title: 'Prashnopatra', area: 'AGENTIC SYSTEMS', year: '2026',
    description: 'An agentic examination-paper system that turns lesson plans, question banks, and university templates into validated papers.',
    approach: 'Modular agents handle course intake, question selection, generation, duplicate detection, composition, valuation, validation, and DOCX export.',
    outcome: 'Bloom taxonomy, source-ratio, duplication, and approval constraints are backed by SQLite, SQLAlchemy, Pydantic models, audit trails, and faculty approval gates.',
    stack: ['Python', 'LangChain', 'Streamlit', 'SQLAlchemy', 'SQLite', 'Pydantic'],
  },
];

export const RESEARCH_PAPERS: ResearchRecord[] = [
  {
    id: 'pricing-rl', number: '01 / AWARD-WINNING TEAM RESEARCH',
    title: 'Reinforcement Learning for Profit-Optimized Pricing',
    context: 'A team study of dynamic pricing under stochastic demand, competitive pricing, and inventory constraints, presented at Springer ComSIA 2026.',
    method: 'A custom simulation environment and evaluation pipeline compared PPO, SAC, DDPG, LinUCB, and Thompson Sampling across 50,000 interaction steps per algorithm and multiple random seeds.',
    result: 'SAC recorded the highest reported mean profit: 30,820.74. The team received the Best Paper Award at Springer ComSIA 2026.',
    distinction: 'BEST PAPER AWARD · SPRINGER ComSIA 2026',
  },
  {
    id: 'wids', number: '02 / DATATHON',
    title: 'ADHD Unraveled: Gender Trends and Data Insights',
    context: 'A multimodal prediction project using clinical metadata and functional connectome features from 19,930 attributes.',
    method: 'The pipeline combined KNN imputation, encoding, PCA, feature selection, scaling, SMOTE, and tuned neural-network, XGBoost, and LightGBM models with probability ensembling.',
    result: 'Global Rank 15 in the WiDS Datathon 2025, with an F1-score of approximately 0.80.',
    distinction: 'GLOBAL RANK 15 · WiDS DATATHON 2025',
  },
  {
    id: 'nc-medai', number: '03 / RESEARCH FRAMEWORK',
    title: 'Neural-Collapse-Aware Medical Image Classification',
    context: 'An investigation of how severe class imbalance affects feature geometry in HAM10000 using ResNet-18.',
    method: 'Experiments compare oversampling, weighted cross-entropy, focal loss, class-balanced sampling, and ETF-based training with geometric regularization.',
    result: 'Evaluation tracks NC1–NC4 geometry, macro F1, ROC-AUC, and per-class clinical recall.',
  },
];

export const ARCHIVE_ITEMS: ArchiveRecord[] = [
  { id: 'ai-systems', label: 'AI & retrieval', detail: 'LangGraph · LangChain · FAISS · BM25 · NetworkX · sentence-transformers · PyTorch · TensorFlow · scikit-learn' },
  { id: 'platforms', label: 'Platforms & runtime', detail: 'FastAPI · REST APIs · React · TypeScript · Docker · Kubernetes · Linux · Git' },
  { id: 'data', label: 'Data & storage', detail: 'Python · SQL · PostgreSQL · MongoDB · SQLite · NumPy · Pandas' },
  { id: 'devices', label: 'Edge & hardware', detail: 'ESP32 · Raspberry Pi · Android · MQTT · WebSockets · C · C++ · Kotlin · JNI' },
  { id: 'foundations', label: 'Computer science', detail: 'Data structures & algorithms · OOP · operating systems · databases · computer networks' },
];

export const JOURNAL_ENTRIES: BuildNote[] = [
  {
    id: 'retrieval', index: '01', title: 'Search is a system, not a single score.', context: 'KNIT SPACE · SOFTWARE ENGINEERING INTERN',
    detail: 'Built a modular product search engine indexing more than 21,000 products. Retrieval combined TF-IDF, semantic search, BM25, and category-aware ranking; inverted indexes, LRU caching, and sharded retrieval reduced repeated work and supported parallel indexing.',
    stack: 'PYTHON / INFORMATION RETRIEVAL',
  },
  {
    id: 'closed-loop', index: '02', title: 'Prediction only matters when it changes the next action.', context: '5G NETWORK SLICE ORCHESTRATOR',
    detail: 'The orchestration loop links telemetry observation, resource planning, validation, and recovery. Slice-specific TCN predictions feed adaptive allocation across eMBB, URLLC, and mMTC workloads.',
    stack: 'LANGGRAPH / TCN / KUBERNETES',
  },
  {
    id: 'local-inference', index: '03', title: 'Put the model where the constraint is.', context: 'SMALL LANGUAGE MODEL · ESP32',
    detail: 'A five-layer autoregressive Transformer performs tokenization, generation, and detokenization on a physical ESP32 without PSRAM or cloud inference. Reported TinyStories-260K generation is approximately 3.8 tokens per second.',
    stack: 'C++ / ESP32 / EDGE INFERENCE',
  },
];

export const PROFILE = {
  email: 'amaanalidoddamani20@gmail.com',
  role: 'Computer Science Engineering (Artificial Intelligence)',
  university: 'KLE Technological University',
  education: '2023—present',
  cgpa: '9.36',
  internship: 'Software Engineering Intern · Knit Space',
  internshipDates: 'JUL—AUG 2025',
  leadership: 'Lead Organizer & Technical Coordinator · IGNITRIX 2025',
  clubs: 'Data Science Club · Core Member (2025—present)',
};