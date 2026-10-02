'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowDown, ArrowUpRight, Plus } from 'lucide-react';
import { ARCHIVE_ITEMS, JOURNAL_ENTRIES, PROFILE, PROJECTS_DATA, RESEARCH_PAPERS } from './data/portfolioData';

gsap.registerPlugin(ScrollTrigger);

const TOTAL_FRAMES = 240;
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';
const framePath = (index: number) => `${basePath}/frames2/ezgif-frame-${String(index + 1).padStart(3, '0')}.jpg`;
const chapters = [
  ['person', '01', 'Person'], ['character', '02', 'Character'], ['system', '03', 'System'],
  ['work', '04', 'Work'], ['research', '05', 'Research'], ['archive', '06', 'Archive'],
  ['journal', '07', 'Journal'], ['exit', '08', 'Exit'],
] as const;

function useMotionSystem() {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const context = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>('[data-reveal]').forEach((node) => {
        gsap.fromTo(node, { y: 24, opacity: 0, filter: 'blur(4px)' }, {
          y: 0, opacity: 1, filter: 'blur(0px)', duration: 0.85, ease: 'power3.out',
          scrollTrigger: { trigger: node, start: 'top 86%', once: true },
        });
      });
      gsap.utils.toArray<HTMLElement>('[data-stagger]').forEach((group) => {
        gsap.fromTo(group.children, { y: 16, opacity: 0 }, {
          y: 0, opacity: 1, duration: 0.65, stagger: 0.09, ease: 'power2.out',
          scrollTrigger: { trigger: group, start: 'top 84%', once: true },
        });
      });
      gsap.utils.toArray<SVGPathElement>('[data-draw]').forEach((path) => {
        const length = path.getTotalLength();
        gsap.set(path, { strokeDasharray: length, strokeDashoffset: length });
        gsap.to(path, { strokeDashoffset: 0, duration: 1.7, ease: 'power2.inOut',
          scrollTrigger: { trigger: path, start: 'top 86%', once: true } });
      });
    });
    return () => context.revert();
  }, []);
}

function MotionWords({ children }: { children: string }) {
  return <span className="motion-words" aria-label={children}>
    <span aria-hidden="true">{children.split(/\s+/).map((word, i) => <span className="motion-words__word" key={`${word}-${i}`}>{word}</span>)}</span>
  </span>;
}

function DataCounter({ text }: { text: string }) {
  const valueRef = useRef<HTMLElement>(null);
  useEffect(() => {
    const node = valueRef.current;
    const match = text.match(/\d[\d,.]*/);
    if (!node || !match || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const raw = Number(match[0].replace(/,/g, ''));
    const precision = (match[0].split('.')[1] || '').length;
    const start = match.index || 0;
    const prefix = text.slice(0, start);
    const suffix = text.slice(start + match[0].length);
    const counter = { value: 0 };
    const trigger = ScrollTrigger.create({
      trigger: node, start: 'top 90%', once: true,
      onEnter: () => gsap.to(counter, { value: raw, duration: 1.15, ease: 'power2.out', onUpdate: () => {
        const value = new Intl.NumberFormat('en-US', { maximumFractionDigits: precision, minimumFractionDigits: precision }).format(counter.value);
        node.textContent = `${prefix}${value}${suffix}`;
      } }),
    });
    return () => trigger.kill();
  }, [text]);
  return <strong ref={valueRef}>{text}</strong>;
}

function ArchivistFilm() {
  const sectionRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const contextRef = useRef<CanvasRenderingContext2D | null>(null);
  const imagesRef = useRef<(HTMLImageElement | undefined)[]>([]);
  const progressRef = useRef(0);
  const renderedFrameRef = useRef(-1);
  const [frame, setFrame] = useState(1);

  useEffect(() => {
    const canvas = canvasRef.current;
    const section = sectionRef.current;
    const context = canvas?.getContext('2d', { alpha: false });
    if (!canvas || !section || !context) return;
    contextRef.current = context;
    const images: (HTMLImageElement | undefined)[] = new Array(TOTAL_FRAMES);
    imagesRef.current = images;
    let cancelled = false;
    let firstReady = false;
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const draw = (requested: number) => {
      const image = images[requested];
      if (!image?.complete || !image.naturalWidth) return;
      const bounds = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const width = Math.round(bounds.width * dpr);
      const height = Math.round(bounds.height * dpr);
      if (canvas.width !== width || canvas.height !== height) { canvas.width = width; canvas.height = height; }
      context.setTransform(dpr, 0, 0, dpr, 0, 0);
      context.fillStyle = '#090909';
      context.fillRect(0, 0, bounds.width, bounds.height);
      const scale = Math.min(bounds.width / image.naturalWidth, bounds.height / image.naturalHeight);
      const w = image.naturalWidth * scale;
      const h = image.naturalHeight * scale;
      const horizontalOffset = bounds.width < 700 ? 0 : bounds.width * 0.16;
      context.drawImage(image, (bounds.width - w) / 2 + horizontalOffset, (bounds.height - h) / 2, w, h);
      renderedFrameRef.current = requested;
    };
    const load = (index: number) => {
      if (cancelled || images[index]) return;
      const image = new Image();
      images[index] = image;
      image.decoding = 'async';
      image.onload = () => {
        if (cancelled) return;
        if (index === 0) firstReady = true;
        if (firstReady && (index === 0 || index === renderedFrameRef.current)) draw(index);
      };
      image.src = framePath(index);
    };
    const request = (index: number) => {
      for (let offset = -2; offset <= 2; offset += 1) {
        const candidate = Math.max(0, Math.min(TOTAL_FRAMES - 1, index + offset));
        load(candidate);
      }
      if (images[index]?.complete && images[index]?.naturalWidth) draw(index);
    };
    request(0);
    let nextBatch = 5;
    let batchTimer: ReturnType<typeof setTimeout> | undefined;
    const preload = () => {
      if (cancelled || nextBatch >= TOTAL_FRAMES) return;
      for (let i = nextBatch; i < Math.min(nextBatch + 12, TOTAL_FRAMES); i += 1) load(i);
      nextBatch += 12;
      batchTimer = setTimeout(preload, 90);
    };
    if (!reducedMotion) batchTimer = setTimeout(preload, 100);
    const resize = new ResizeObserver(() => draw(Math.round(progressRef.current * (TOTAL_FRAMES - 1))));
    resize.observe(canvas);
    let timeline: gsap.core.Timeline | undefined;
    if (!reducedMotion) {
      timeline = gsap.timeline({
        scrollTrigger: {
          trigger: section, start: 'top top', end: '+=320%', pin: true, scrub: 0.7, invalidateOnRefresh: true,
          onUpdate: (trigger) => {
            const p = trigger.progress;
            progressRef.current = p;
            const clamp = (v: number) => Math.max(0, Math.min(1, v));
            const setScene = (selector: string, opacity: number, y: number) => {
              const node = section.querySelector<HTMLElement>(selector);
              if (!node) return;
              node.style.opacity = String(opacity);
              node.setAttribute('aria-hidden', String(opacity < 0.1));
              node.style.transform = `translate3d(0, ${y * (1 - opacity)}px, 0)`;
            };
            setScene('.film__person', clamp(1 - p * 5), -18);
            setScene('.film__character', Math.min(clamp((p - 0.14) * 5), clamp((0.72 - p) * 4)), 18);
            setScene('.film__system', clamp((p - 0.56) * 4), 18);
            const index = Math.round(p * (TOTAL_FRAMES - 1));
            request(index);
            if (index % 3 === 0) setFrame(index + 1);
          },
        },
      });
    }
    return () => {
      cancelled = true;
      if (batchTimer) clearTimeout(batchTimer);
      timeline?.scrollTrigger?.kill();
      timeline?.kill();
      resize.disconnect();
      images.forEach((image) => { if (image) image.onload = null; });
    };
  }, []);

  return <section ref={sectionRef} className="film" aria-label="Amaan Ali and The Archivist">
    <canvas ref={canvasRef} className="film__canvas" aria-hidden="true" />
    <div className="film__top">
      <a className="wordmark" href="#person" aria-label="Amaan Ali, return to beginning">AA<span>.</span></a>
      <span className="film__edition">COMPUTER SCIENCE <i>·</i> ARTIFICIAL INTELLIGENCE</span>
      <a className="film__contact" href="#exit">CONTACT <ArrowUpRight size={14} /></a>
    </div>
    <div className="film__copy">
      <div className="film__person"><p className="eyebrow">PERSON <i>·</i> 01 / 08</p><h1>AMAAN<br />ALI</h1><p className="film__subline">Engineer. Researcher. Builder.</p></div>
      <div className="film__character" id="character" aria-hidden="true"><p className="eyebrow">CHARACTER <i>·</i> 02 / 08</p><h2>THE<br /><span>ARCHIVIST</span></h2><p className="film__caption">A visual signature for a hands-on way of working.</p></div>
      <div className="film__system" aria-hidden="true"><p className="eyebrow">SYSTEM <i>·</i> 03 / 08</p><p className="film__statement">Research it.<br /><span>Build it.</span><br />Make it work.</p><p className="film__caption">AI · systems · software · devices</p></div>
    </div>
    <div className="film__bottom"><span>KLE TECHNOLOGICAL UNIVERSITY <i>·</i> CSE (AI)</span><a className="film__scroll" href="#system"><span>SCROLL TO ENTER</span><ArrowDown size={13} /></a><span>FRAME <b>{String(frame).padStart(3, '0')}</b> / 240</span></div>
  </section>;
}

function ChapterHeading({ number, title, note, light = false }: { number: string; title: string; note: string; light?: boolean }) {
  return <header className={`chapter-heading ${light ? 'chapter-heading--light' : ''}`}>
    <span className="eyebrow" data-reveal>{number} <i>·</i> {note}</span>
    <h2 data-reveal>{title}</h2>
    <div className="chapter-rule" aria-hidden="true" />
  </header>;
}

export default function App() {
  useMotionSystem();
  const [selectedProject, setSelectedProject] = useState(0);
  const [selectedResearch, setSelectedResearch] = useState<number | null>(0);
  const [selectedArchive, setSelectedArchive] = useState<number | null>(null);
  const [noteIndex, setNoteIndex] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeChapter, setActiveChapter] = useState('person');
  const project = PROJECTS_DATA[selectedProject];
  const note = JOURNAL_ENTRIES[noteIndex];
  const lightChapter = ['system', 'research', 'archive', 'journal'].includes(activeChapter);

  useEffect(() => {
    const observers: IntersectionObserver[] = [];
    chapters.forEach(([id]) => {
      const node = document.getElementById(id);
      if (!node) return;
      const observer = new IntersectionObserver(([entry]) => {
        if (entry.isIntersecting) setActiveChapter(id);
      }, { rootMargin: '-38% 0px -52% 0px' });
      observer.observe(node);
      observers.push(observer);
    });
    return () => observers.forEach((observer) => observer.disconnect());
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    const update = () => root.style.setProperty('--scroll-progress', String(window.scrollY / Math.max(1, document.documentElement.scrollHeight - window.innerHeight)));
    update();
    window.addEventListener('scroll', update, { passive: true });
    return () => window.removeEventListener('scroll', update);
  }, []);

  const goToChapter = (id: string) => {
    setMenuOpen(false);
    if (id === 'character') {
      const film = document.querySelector<HTMLElement>('.film');
      const trigger = ScrollTrigger.getAll().find((item) => item.trigger === film);
      if (trigger) {
        window.scrollTo({ top: trigger.start + (trigger.end - trigger.start) * 0.35, behavior: 'smooth' });
        return;
      }
    }
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return <main className="experience">
    <div className="reading-progress" aria-hidden="true" />
    <nav className={`chapter-index ${lightChapter ? 'chapter-index--light' : ''}`} aria-label="Chapter navigation">
      <button className="chapter-index__toggle" onClick={() => setMenuOpen((open) => !open)} aria-expanded={menuOpen}>
        <span>{menuOpen ? 'CLOSE INDEX' : 'INDEX'}</span><span className="chapter-index__plus">{menuOpen ? '−' : '+'}</span>
      </button>
      <div className={`chapter-index__list ${menuOpen ? 'is-open' : ''}`}>
        {chapters.map(([id, number, label]) => <button key={id} onClick={() => goToChapter(id)} aria-current={activeChapter === id ? 'location' : undefined}>
          <span>{number}</span>{label}
        </button>)}
      </div>
    </nav>

    <div id="person"><ArchivistFilm /></div>
    <div className="story">
      <section id="system" className="chapter system-chapter">
        <div className="chapter__inner">
          <ChapterHeading number="03" title="SYSTEM" note="HOW I WORK" />
          <div className="identity-band" data-reveal>
            <p className="identity-band__line">Computer science meets <em>hands-on engineering.</em></p>
            <div className="identity-band__facts">
              <div><span className="eyebrow">EDUCATION</span><strong>{PROFILE.role}</strong><span>{PROFILE.university} · {PROFILE.education}</span></div>
              <div><span className="eyebrow">CURRENT FOCUS</span><strong>AI systems, research &amp; software</strong><span>Models from cloud pipelines to edge devices.</span></div>
              <div><span className="eyebrow">ACADEMIC RECORD</span><strong>{PROFILE.cgpa} / 10 CGPA</strong><span>Cumulative grade point average.</span></div>
            </div>
          </div>
          <div className="method" data-stagger>
            <div><span className="method__number">01</span><h3>Observe</h3><p>Trace the signal. Define the constraint.</p></div>
            <div><span className="method__number">02</span><h3>Model</h3><p>Choose the architecture that fits the problem.</p></div>
            <div><span className="method__number">03</span><h3>Engineer</h3><p>Build the pipeline, system, or device.</p></div>
            <div><span className="method__number">04</span><h3>Validate</h3><p>Measure outcomes. Recover when the system fails.</p></div>
          </div>
          <svg className="method__trace" viewBox="0 0 1200 80" preserveAspectRatio="none" role="presentation"><path data-draw d="M2 56 C190 56 185 20 350 20 S510 60 675 60 850 18 1010 18 1120 45 1198 45" /></svg>
        </div>
      </section>

      <section id="work" className="chapter work-chapter">
        <div className="chapter__inner">
          <ChapterHeading number="04" title="WORK" note="SELECTED BUILDS" />
          <div className="work-intro" data-reveal><p>Systems that leave the screen.</p><span>{String(PROJECTS_DATA.length).padStart(2, '0')} PROJECTS <i>·</i> 2025—26</span></div>
          <div className="work-layout">
            <div className="work-list" aria-label="Select a project">
              {PROJECTS_DATA.map((item, index) => <button key={item.id} className={`work-list__item ${selectedProject === index ? 'is-selected' : ''}`} onClick={() => setSelectedProject(index)} aria-pressed={selectedProject === index}>
                <span className="work-list__number">{item.number}</span><span className="work-list__title">{item.title}</span><span className="work-list__arrow">↗</span>
              </button>)}
            </div>
            <article className="work-detail" key={project.id} aria-live="polite">
              <div className="work-detail__meta"><span>{project.area}</span><span>{project.year}</span></div>
              <h3>{project.title}</h3>
              <p className="work-detail__summary">{project.description}</p>
              <div className="system-plate" aria-hidden="true">
                <span className="system-plate__label">SYSTEM MAP <i>·</i> {project.number}</span>
                <div className="system-plate__nodes"><i /><span>{project.stack[0]}</span><b>→</b><span>{project.stack[Math.floor(project.stack.length / 2)]}</span><b>→</b><i /></div>
                <div className="system-plate__base"><span>INPUT</span><span>ORCHESTRATE</span><span>OUTPUT</span></div>
              </div>
              <div className="work-detail__approach"><span className="eyebrow">ENGINEERING APPROACH</span><p>{project.approach}</p></div>
              <div className="work-detail__outcome"><span className="eyebrow">SYSTEM IN PRACTICE</span><p>{project.outcome}</p></div>
              {project.metric && <div className="work-detail__metric"><DataCounter text={project.metric.value} /><span>{project.metric.label}</span></div>}
              <div className="work-detail__stack"><span className="eyebrow">BUILT WITH</span><p>{project.stack.join(' · ')}</p></div>
            </article>
          </div>
        </div>
      </section>

      <section id="research" className="chapter research-chapter">
        <div className="chapter__inner">
          <ChapterHeading number="05" title="RESEARCH" note="EXPERIMENT, EVALUATE, REPORT" light />
          <div className="research-lede" data-reveal><p>Make the hypothesis testable.<br /><em>Make the result accountable.</em></p><span>SELECTED RESEARCH <i>·</i> 2025—26</span></div>
          <div className="research-list">
            {RESEARCH_PAPERS.map((paper, index) => <article className={`research-record ${selectedResearch === index ? 'is-open' : ''}`} key={paper.id}>
              <button className="research-record__trigger" onClick={() => setSelectedResearch(selectedResearch === index ? null : index)} aria-expanded={selectedResearch === index}>
                <span className="research-record__num">{paper.number}</span><span className="research-record__title">{paper.title}</span><Plus size={17} />
              </button>
              {selectedResearch === index && <div className="research-record__body">
                {paper.distinction && <p className="research-record__distinction"><span className="eyebrow">RECOGNITION</span><strong>{paper.distinction}</strong></p>}
                <div><span className="eyebrow">CONTEXT</span><p>{paper.context}</p></div>
                <div><span className="eyebrow">METHOD</span><p>{paper.method}</p></div>
                <div className="research-record__result"><span className="eyebrow">RESULT</span><p>{paper.result}</p></div>
              </div>}
            </article>)}
          </div>
        </div>
      </section>

      <section id="archive" className="chapter archive-chapter">
        <div className="chapter__inner archive-inner">
          <ChapterHeading number="06" title="ARCHIVE" note="TOOLS, TEAMS, TRAINING" light />
          <div className="archive-intro" data-reveal><p>What the systems<br /><em>are made of.</em></p><span>TECHNICAL INDEX <i>·</i> 05 COLLECTIONS</span></div>
          <div className="archive-list">
            {ARCHIVE_ITEMS.map((item, index) => <button className={`archive-item ${selectedArchive === index ? 'is-selected' : ''}`} key={item.id} onClick={() => setSelectedArchive(selectedArchive === index ? null : index)} aria-expanded={selectedArchive === index}>
              <span className="archive-item__index">0{index + 1}</span><span className="archive-item__label">{item.label}</span><span className="archive-item__detail">{item.detail}</span><span className="archive-item__mark">{selectedArchive === index ? '−' : '+'}</span>
            </button>)}
          </div>
          <div className="career-ledger" data-reveal>
            <div><span className="eyebrow">INDUSTRY</span><h3>{PROFILE.internship}</h3><p>{PROFILE.internshipDates} <i>·</i> Built a modular product search engine for 21,000+ products.</p></div>
            <div><span className="eyebrow">COMMUNITY</span><h3>{PROFILE.leadership}</h3><p>Organized a state-level Agentic AI Hackathon and delivered workshops on LLMs, RAG, and agentic AI.</p></div>
            <div><span className="eyebrow">INVOLVEMENT</span><h3>{PROFILE.clubs}</h3><p>Core Member <i>·</i> Cloud &amp; DevOps Club (2025—26).</p></div>
          </div>
        </div>
      </section>

      <section id="journal" className="chapter journal-chapter">
        <div className="chapter__inner">
          <ChapterHeading number="07" title="JOURNAL" note="NOTES FROM THE BUILD" light />
          <div className="journal-shell" key={note.id}>
            <div className="journal-rail" aria-label="Choose a build note">
              <span className="eyebrow">BUILD NOTES <i>·</i> 0{noteIndex + 1} / 0{JOURNAL_ENTRIES.length}</span>
              {JOURNAL_ENTRIES.map((entry, index) => <button key={entry.id} className={index === noteIndex ? 'is-active' : ''} onClick={() => setNoteIndex(index)} aria-pressed={index === noteIndex}>
                <span>{entry.index}</span>{entry.title}
              </button>)}
            </div>
            <article className="journal-note">
              <div className="eyebrow">{note.context}</div>
              <h3><MotionWords>{note.title}</MotionWords></h3>
              <p>{note.detail}</p>
              <span className="journal-note__stack">{note.stack}</span>
            </article>
          </div>
        </div>
      </section>

      <footer id="exit" className="exit-chapter">
        <div className="exit-chapter__inner">
          <span className="eyebrow" data-reveal>08 <i>·</i> EXIT</span>
          <h2 data-reveal>Build what<br /><em>comes next.</em></h2>
          <p data-reveal>Open to engineering, AI, and research opportunities.</p>
          <a className="exit-link" href={`mailto:${PROFILE.email}`}>START A CONVERSATION <ArrowUpRight size={15} /></a>
          <div className="exit-footer"><a href="#person">AMAAN ALI <i>·</i> THE ARCHIVIST</a><span>{PROFILE.role}</span><a href={`mailto:${PROFILE.email}`}>{PROFILE.email}</a></div>
        </div>
      </footer>
    </div>
  </main>;
}