export interface Project {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  category: string;
  year: string;
  summary: string;
  problem: string;
  system: string;
  result: string;
  architecture: string[];
  metrics: { label: string; value: string }[];
  tags: string[];
  codeSnippet?: string;
  diagramSvg?: string;
  demoUrl?: string;
  githubUrl?: string;
}

export interface ResearchPaper {
  id: string;
  number: string;
  title: string;
  authors: string[];
  date: string;
  journal: string;
  abstract: string;
  question: string;
  methodology: string;
  findings: string;
  equations: { label: string; latex: string; description: string }[];
  pdfSize: string;
  tags: string[];
}

export interface ArchiveItem {
  id: string;
  title: string;
  type: 'prototype' | 'shader' | 'sketch' | 'experiment' | 'note';
  date: string;
  description: string;
  snippet?: string;
  details: string;
  aspectRatio: string;
  colorHex: string;
}

export interface JournalEntry {
  id: string;
  pageNumber: number;
  date: string;
  title: string;
  content: string[];
  equation?: string;
  quote?: string;
  tags: string[];
}

export const PROJECTS_DATA: Project[] = [
  {
    id: 'hyperion',
    number: '01',
    title: 'HYPERION ARCHITECTURE',
    subtitle: 'Autonomous Neural Knowledge Graph Engine',
    category: 'System Architecture & AI',
    year: '2026',
    summary: 'A high-throughput distributed graph indexing system capable of synthesizing unstructured scientific literature into real-time topological knowledge networks.',
    problem: 'Traditional vector databases lack structural awareness of inter-domain dependencies, causing contextual loss during multi-step reasoning.',
    system: 'Designed a dual-layer neural index combining sparse topological hypergraphs with dense latent embeddings. Built custom Rust bindings for WebAssembly real-time client inference.',
    result: 'Achieved 4.2x reduction in query latency and 98.4% precision in dependency resolution across 500,000 research papers.',
    architecture: ['Rust Core', 'TypeScript/Next.js', 'WebAssembly', 'HNSW Vector Graph', 'Custom Shader Visualization'],
    metrics: [
      { label: 'Latency', value: '< 1.8ms' },
      { label: 'Graph Nodes', value: '2.4M' },
      { label: 'Precision', value: '98.4%' }
    ],
    tags: ['Rust', 'WebAssembly', 'Neural Graphs', 'TypeScript'],
    codeSnippet: `// Hyperion Topological Edge Evaluator
export class TopologicalMatrix {
  private weights: Float32Array;
  constructor(public readonly dimensions: number) {
    this.weights = new Float32Array(dimensions * dimensions);
  }

  public computeResonance(vectorA: Float32Array, vectorB: Float32Array): number {
    let score = 0.0;
    for (let i = 0; i < vectorA.length; i++) {
      score += vectorA[i] * vectorB[i] * Math.exp(-i / 128);
    }
    return Math.tanh(score);
  }
}`,
    githubUrl: 'https://github.com/eric-archivist/hyperion',
    demoUrl: 'https://hyperion-system.demo'
  },
  {
    id: 'chronos',
    number: '02',
    title: 'CHRONOS QUANTUM STATE',
    subtitle: 'Real-time High-Dimensional Lattice Visualizer',
    category: 'Graphics & Simulation',
    year: '2025',
    summary: 'A browser-native GPU simulation environment for rendering multi-body quantum wavepacket collapse using WebGL compute shaders.',
    problem: 'Simulating quantum decoherence in web environments usually requires pre-computed offline renders, eliminating real-time user interactivity.',
    system: 'Constructed custom WebGL 2.0 compute-like transform feedback pipelines running 60fps particle integrations for 1,000,000 quantum state vectors.',
    result: 'Enabled interactive manipulation of complex phase boundaries in real-time within a standard browser window.',
    architecture: ['WebGL 2.0', 'GLSL Shaders', 'Three-tier Framebuffer', 'TypeScript', 'Web Workers'],
    metrics: [
      { label: 'Particle Count', value: '1,000,000' },
      { label: 'Frame Rate', value: '60 FPS' },
      { label: 'Memory Footprint', value: '34MB' }
    ],
    tags: ['WebGL', 'GLSL', 'Physics Simulation', 'GPU'],
    codeSnippet: `// Chronos Wavepacket Collapse GLSL Fragment
precision highp float;
uniform vec2 u_resolution;
uniform float u_time;
varying vec2 v_uv;

float wavePacket(vec2 p, vec2 origin, float freq) {
    float d = length(p - origin);
    return sin(d * freq - u_time * 4.0) * exp(-d * 3.5);
}

void main() {
    vec2 st = (gl_FragCoord.xy * 2.0 - u_resolution) / min(u_resolution.x, u_resolution.y);
    float psi = wavePacket(st, vec2(0.0), 20.0);
    vec3 col = mix(vec3(0.02, 0.02, 0.03), vec3(0.83, 0.68, 0.21), abs(psi));
    gl_FragColor = vec4(col, 1.0);
}`,
    githubUrl: 'https://github.com/eric-archivist/chronos',
    demoUrl: 'https://chronos-quantum.demo'
  },
  {
    id: 'kinetic-os',
    number: '03',
    title: 'KINETIC SPATIAL OS',
    subtitle: 'Haptic Spatial Interface for Complex Systems',
    category: 'Interaction Design & Hardware',
    year: '2025',
    summary: 'An experimental spatial desktop shell using ultra-low latency gesture parsing and predictive micro-animations.',
    problem: 'Spatial interfaces often feel sluggish or floaty due to poor input sampling and mismatched spring physics.',
    system: 'Implemented custom RK4 (Runge-Kutta 4th order) spring integrators driven by 240Hz input polling and gesture trajectory extrapolation.',
    result: 'Reduced perceived UI touch-to-render lag to sub-8 milliseconds, receiving widespread acclaim in interactive design circles.',
    architecture: ['Canvas API', 'TypeScript', 'RK4 Physics Engine', 'WebHID Integration'],
    metrics: [
      { label: 'Input Latency', value: '7.8ms' },
      { label: 'Spring Rate', value: '240Hz' },
      { label: 'Jitter Margin', value: '< 0.01px' }
    ],
    tags: ['Physics Engine', 'Spatial UI', 'TypeScript', 'Canvas'],
    codeSnippet: `// RK4 Spring Integrator for Haptic Motion
export function solveRK4(x: number, v: number, target: number, k: number, c: number, dt: number) {
  const f = (pos: number, vel: number) => -k * (pos - target) - c * vel;
  const k1v = f(x, v);
  const k1x = v;
  const k2v = f(x + 0.5 * dt * k1x, v + 0.5 * dt * k1v);
  const k2x = v + 0.5 * dt * k1v;
  const k3v = f(x + 0.5 * dt * k2x, v + 0.5 * dt * k2v);
  const k3x = v + 0.5 * dt * k2v;
  const k4v = f(x + dt * k3x, v + dt * k3v);
  const k4x = v + dt * k3v;

  const nextPos = x + (dt / 6) * (k1x + 2 * k2x + 2 * k3x + k4x);
  const nextVel = v + (dt / 6) * (k1v + 2 * k2v + 2 * k3v + k4v);
  return [nextPos, nextVel];
}`,
    githubUrl: 'https://github.com/eric-archivist/kinetic-os'
  },
  {
    id: 'spectra',
    number: '04',
    title: 'SPECTRA SHADER ENGINE',
    subtitle: 'Physically-Based Ink & Light Shader Framework',
    category: 'Shader Architecture',
    year: '2024',
    summary: 'A procedural shader system simulating the fluid dispersion of black sumi ink absorbing into handmade fiber paper.',
    problem: 'Raster graphics cannot capture the micro-capillary bleeding dynamics of wet ink on fibrous media.',
    system: 'Constructed a multi-pass Navier-Stokes fluid grid solver in GLSL with custom fiber density maps and light scattering models.',
    result: 'Published open-source library used by over 14,000 creative developers worldwide for digital artwork rendering.',
    architecture: ['GLSL', 'WebGL 2.0', 'TypeScript', 'Custom Noise Algorithms'],
    metrics: [
      { label: 'Grid Resolution', value: '1024x1024' },
      { label: 'GitHub Stars', value: '4.8k' },
      { label: 'Pass Count', value: '6 Shader Passes' }
    ],
    tags: ['Shader', 'Fluid Dynamics', 'Open Source', 'WebGL'],
    codeSnippet: `// Spectra Ink Capillary Dispersion Pass
vec2 computeFluidDiffusion(vec2 uv, sampler2D noiseTex, float time) {
    vec4 n = texture2D(noiseTex, uv * 4.0 + vec2(time * 0.05));
    float alpha = n.r * 6.28318;
    vec2 dir = vec2(cos(alpha), sin(alpha));
    return dir * 0.0025 * smoothstep(0.1, 0.9, n.g);
}`,
    githubUrl: 'https://github.com/eric-archivist/spectra'
  }
];

export const RESEARCH_PAPERS: ResearchPaper[] = [
  {
    id: 'paper-01',
    number: 'DOC-2026-01',
    title: 'On the Geometry of Latent Neural Spaces & Manifold Dynamics',
    authors: ['Eric (The Archivist)', 'Dr. K. Takahashi'],
    date: 'February 2026',
    journal: 'Journal of Computational Topology & Neural Systems',
    abstract: 'We explore how high-dimensional latent vectors undergo topological simplification when constrained by physical resonance metrics. By framing neural layer transitions as geodesic flows on Riemannian manifolds, we derive exact bounds for loss-less dimensionality reduction.',
    question: 'Can neural representation spaces be compressed along intrinsic manifold geodesics without sacrificing cross-domain inference accuracy?',
    methodology: 'We projected 1024-dimensional embeddings onto 3D Riemannian manifolds using persistent homology and measure Ricci curvature along high-density trajectories.',
    findings: 'Manifold curvature correlates inversely with model hallucination. Restricting vector drift along minimal surface geodesics improves contextual retention by 41.2%.',
    equations: [
      {
        label: 'Geodesic Vector Flow',
        latex: '\\frac{d^2 x^k}{dt^2} + \\Gamma^k_{ij} \\frac{dx^i}{dt} \\frac{dx^j}{dt} = 0',
        description: 'Equation governing minimal energy trajectories of latent knowledge particles across the manifold.'
      },
      {
        label: 'Resonance Entropy Measure',
        latex: 'S(\\rho) = -\\text{Tr}(\\rho \\log_2 \\rho) + \\oint_{\\partial \\Omega} \\nabla \\Phi \\cdot d\\mathbf{A}',
        description: 'Quantifies information density preserved during spatial state transitions.'
      }
    ],
    pdfSize: '2.4 MB',
    tags: ['Computational Topology', 'Neural Networks', 'Differential Geometry']
  },
  {
    id: 'paper-02',
    number: 'DOC-2025-08',
    title: 'Sub-Millisecond Haptic Feedback in Distributed WebGL Render Loops',
    authors: ['Eric (The Archivist)'],
    date: 'November 2025',
    journal: 'Archive of Interactive Digital Systems',
    abstract: 'Perceived interface latency is the primary barrier to immersive web scrollytelling. We present an asynchronous frame prediction pipeline using dual Web Workers and shared ArrayBuffers to decoupled input sampling from display refresh cycles.',
    question: 'How can complex client-side Canvas animation loops maintain 120Hz responsiveness under heavy CPU background tasks?',
    methodology: 'We decoupled event listener queues from the main UI thread using SharedArrayBuffer atomics, allowing high-frequency mouse/touch sampling at 1000Hz.',
    findings: 'Frame stutter drops to zero, and input latency decreases to 0.8 milliseconds even when heavy shader computations run concurrently.',
    equations: [
      {
        label: 'Predictive Input Trajectory',
        latex: '\\mathbf{p}(t + \\Delta t) = \\mathbf{p}(t) + \\mathbf{v}(t)\\Delta t + \\frac{1}{2}\\mathbf{a}(t)\\Delta t^2',
        description: 'Taylor expansion predictor for instantaneous cursor position forecasting.'
      }
    ],
    pdfSize: '1.8 MB',
    tags: ['Web Performance', 'Graphics Engine', 'Input Latency']
  },
  {
    id: 'paper-03',
    number: 'DOC-2025-03',
    title: 'Entropy & Information Density in Reactive User Interfaces',
    authors: ['Eric (The Archivist)'],
    date: 'March 2025',
    journal: 'International Design & Systems Review',
    abstract: 'An investigation into visual cognitive load in modern web applications. We prove mathematically that excessive visual clutter increases user decision paralysis logarithmically, whereas structured negative space amplifies focus retention.',
    question: 'What is the optimal spatial ratio between active visual content and negative space in editorial scrollytelling?',
    methodology: 'Eye-tracking analysis across 250 test subjects navigating different portfolio layouts ranging from dense dashboard cards to minimalist editorial grids.',
    findings: 'Layouts with >65% negative space yielded 3.2x higher information comprehension and 89% greater emotional resonance.',
    equations: [
      {
        label: 'Visual Information Capacity',
        latex: 'C = B \\log_2 \\left(1 + \\frac{S}{N}\\right)',
        description: 'Shannon Hartley theorem applied to visual UI signal-to-noise ratio.'
      }
    ],
    pdfSize: '3.1 MB',
    tags: ['Cognitive Design', 'Editorial Systems', 'Information Theory']
  }
];

export const ARCHIVE_ITEMS: ArchiveItem[] = [
  {
    id: 'arch-01',
    title: 'Ink Bleed Fluid Simulation Pass',
    type: 'shader',
    date: '2026.01',
    description: 'Custom Navier-Stokes fluid solver fragment shader executing 400 iterations per frame on GPU canvas.',
    snippet: 'gl_FragColor = mix(inkColor, paperColor, smoothstep(0.0, 1.0, dispersion));',
    details: 'Created during research into Japanese sumi-e digital painting tools. Uses custom noise maps to simulate fiber absorption.',
    aspectRatio: 'aspect-video',
    colorHex: '#0D0D0E'
  },
  {
    id: 'arch-02',
    title: 'Modern Samurai Silhouette Blueprint',
    type: 'sketch',
    date: '2025.11',
    description: 'Original architectural vector drawing of The Archivist’s asymmetric coat strap assembly.',
    details: 'Technical design sheet combining traditional Japanese hakama pleats with modern tactical modular webbings.',
    aspectRatio: 'aspect-square',
    colorHex: '#D4AF37'
  },
  {
    id: 'arch-03',
    title: 'RK4 Physics Spring Benchmarks',
    type: 'prototype',
    date: '2025.09',
    description: 'Comparative study of Euler vs Verlet vs Runge-Kutta 4th Order numerical integration stability.',
    snippet: 'const [nextX, nextV] = solveRK4(x, v, target, k, c, dt);',
    details: 'Tested at 240Hz input sampling to prove sub-pixel motion smoothness across different browser display rates.',
    aspectRatio: 'aspect-[4/3]',
    colorHex: '#121212'
  },
  {
    id: 'arch-04',
    title: 'Fragmented Journal Page #42',
    type: 'note',
    date: '2025.07',
    description: 'Handwritten notes on the duality of creation and destruction in complex systems.',
    details: 'Excerpt: "To build a system that endures, one must first break it down to its elemental primitives. Structure precedes beauty."',
    aspectRatio: 'aspect-square',
    colorHex: '#EAE5D9'
  },
  {
    id: 'arch-05',
    title: 'Sub-pixel Font Rasterizer in WebGL',
    type: 'experiment',
    date: '2025.05',
    description: 'Signed Distance Field (SDF) typography rendering system handling 10,000 glyphs in 1 draw call.',
    snippet: 'float sigDist = texture2D(u_fontAtlas, uv).r - 0.5;',
    details: 'Ensures razor-sharp text clarity even when titles are rotated and scaled in 3D camera space.',
    aspectRatio: 'aspect-video',
    colorHex: '#050505'
  },
  {
    id: 'arch-06',
    title: 'Haptic Audio Synthesizer Node',
    type: 'prototype',
    date: '2025.02',
    description: 'Browser Web Audio API node generating procedural tactile feedback hums for mouse hover events.',
    details: 'Combines low-frequency sine waves (45Hz) with filtered white noise to create physical sense of weight on web elements.',
    aspectRatio: 'aspect-[4/3]',
    colorHex: '#C5A059'
  }
];

export const JOURNAL_ENTRIES: JournalEntry[] = [
  {
    id: 'j-01',
    pageNumber: 1,
    date: 'OCTOBER 14, 2025',
    title: 'The Solitary Engineering Mind',
    content: [
      'Engineering is not simply writing code to fulfill a spec. It is an act of solitary craftsmanship.',
      'When I sit before an empty canvas or terminal, I feel like an architect in an open field. Every component must have a structural purpose. Excess is noise.',
      'The Archivist exists to remind me: stay observant, break things apart, learn how they tick, and reconstruct them stronger.'
    ],
    quote: '"Order is built from the chaos we take time to understand."',
    tags: ['Philosophy', 'Craftsmanship', 'Architecture']
  },
  {
    id: 'j-02',
    pageNumber: 2,
    date: 'DECEMBER 03, 2025',
    title: 'On Resonance and Unrelated Systems',
    content: [
      'The most profound breakthroughs happen at the intersection of disciplines.',
      'Fluid dynamics from physics inspired my shader algorithms. Japanese joinery inspired my component modularity.',
      'When you see the underlying mathematics, everything connects: sound frequencies, visual color spaces, neural weights, and UI spring physics.'
    ],
    equation: '\\nabla \\times \\mathbf{B} = \\mu_0 \\mathbf{J} + \\mu_0 \\varepsilon_0 \\frac{\\partial \\mathbf{E}}{\\partial t}',
    quote: '"Everything is connected. The interesting part is finding where."',
    tags: ['Resonance', 'Physics', 'Systems']
  },
  {
    id: 'j-03',
    pageNumber: 3,
    date: 'JANUARY 22, 2026',
    title: 'The Paper & The Obsidian World',
    content: [
      'My creative lifecycle oscillates between two states:',
      '1. The Obsidian World — execution, dark screens, raw code, compiling binaries, performance metrics, high contrast.',
      '2. The Paper World — reflection, sketches, whiteboards, paper notebooks, mathematical proofs, quiet observation.',
      'A true engineer cannot exist solely in one world. Execution without reflection is blind; reflection without execution is idle.'
    ],
    quote: '"Execution without reflection is blind; reflection without execution is idle."',
    tags: ['Dual Worlds', 'Workflow', 'System Design']
  }
];
