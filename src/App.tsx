'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowDown, ArrowUpRight, ChevronLeft, ChevronRight, Plus } from 'lucide-react';
import { ARCHIVE_ITEMS, JOURNAL_ENTRIES, PROJECTS_DATA, RESEARCH_PAPERS } from './data/portfolioData';

gsap.registerPlugin(ScrollTrigger);

const TOTAL_FRAMES = 240;
const staticBasePath = process.env.NEXT_PUBLIC_BASE_PATH || '';
const framePath = (index: number) => `${staticBasePath}/frames2/ezgif-frame-${String(index + 1).padStart(3, '0')}.jpg`;

function useEditorialMotion() {
  useEffect(() => {
    const ctx = gsap.context(() => {
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
      gsap.utils.toArray<HTMLElement>('.motion-reveal').forEach((element) => {
        gsap.fromTo(element, { y: 28, opacity: 0, filter: 'blur(5px)' }, {
          y: 0, opacity: 1, filter: 'blur(0px)', duration: 0.9, ease: 'power3.out',
          scrollTrigger: { trigger: element, start: 'top 86%', once: true },
        });
      });
      gsap.utils.toArray<HTMLElement>('.motion-rule').forEach((element) => {
        gsap.fromTo(element, { scaleX: 0, transformOrigin: 'left center' }, {
          scaleX: 1, duration: 1.1, ease: 'power2.inOut',
          scrollTrigger: { trigger: element, start: 'top 90%', once: true },
        });
      });
      gsap.utils.toArray<HTMLElement>('.motion-stagger').forEach((group) => {
        gsap.fromTo(group.children, { y: 22, opacity: 0 }, {
          y: 0, opacity: 1, duration: 0.7, stagger: 0.12, ease: 'power3.out',
          scrollTrigger: { trigger: group, start: 'top 84%', once: true },
        });
      });
    });
    return () => ctx.revert();
  }, []);
}

function MotionType({ text }: { text: string }) {
  const lineRef = useRef<HTMLParagraphElement>(null);
  useEffect(() => {
    const line = lineRef.current;
    if (!line || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const words = line.querySelectorAll('.motion-word');
    let tween: gsap.core.Tween | undefined;
    const trigger = ScrollTrigger.create({
      trigger: line,
      start: 'top 88%',
      once: true,
      onEnter: () => {
        tween = gsap.fromTo(words, { y: 7, opacity: 0, filter: 'blur(2px)' }, {
          y: 0, opacity: 1, filter: 'blur(0px)', duration: 0.42, stagger: 0.025, ease: 'power2.out',
        });
      },
    });
    return () => { trigger.kill(); tween?.kill(); };
  }, [text]);
  return <p ref={lineRef} className="motion-type" aria-label={text}><span aria-hidden="true">{text.split(/\s+/).map((word, index) => <span className="motion-word" key={`${index}-${word}`}>{word}</span>)}</span></p>;
}

function CounterValue({ text }: { text: string }) {
  const valueRef = useRef<HTMLElement>(null);
  useEffect(() => {
    const match = text.match(/-?\d[\d,]*(?:\.\d+)?/);
    const element = valueRef.current;
    if (!match || !element || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const numericValue = Number(match[0].replace(/,/g, ''));
    const precision = (match[0].split('.')[1] || '').length;
    const prefix = text.slice(0, match.index);
    const suffix = text.slice((match.index || 0) + match[0].length);
    const counter = { value: 0 };
    const update = () => {
      const formatted = new Intl.NumberFormat('en-US', { maximumFractionDigits: precision, minimumFractionDigits: precision }).format(counter.value);
      element.textContent = `${prefix}${formatted}${suffix}`;
    };
    const trigger = ScrollTrigger.create({
      trigger: element,
      start: 'top 90%',
      once: true,
      onEnter: () => gsap.to(counter, { value: numericValue, duration: 1.2, ease: 'power2.out', onUpdate: update }),
    });
    return () => trigger.kill();
  }, [text]);
  return <strong ref={valueRef}>{text}</strong>;
}

function ArchivistFilm() {
  const sectionRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imagesRef = useRef<(HTMLImageElement | undefined)[]>([]);
  const progressRef = useRef(0);

  useEffect(() => {
    let cancelled = false;
    const images: (HTMLImageElement | undefined)[] = new Array(TOTAL_FRAMES);
    imagesRef.current = images;
    let firstFrameReady = false;
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const draw = (requestedIndex: number) => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const context = canvas.getContext('2d', { alpha: false });
      if (!context) return;
      let image = images[requestedIndex];
      if (!image?.complete || !image.naturalWidth) {
        image = undefined;
        for (let distance = 1; distance < images.length && !image; distance++) {
          const before = images[requestedIndex - distance];
          const after = images[requestedIndex + distance];
          if (before?.complete && before.naturalWidth) image = before;
          else if (after?.complete && after.naturalWidth) image = after;
        }
      }
      if (!image?.naturalWidth) return;
      const bounds = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const width = Math.round(bounds.width * dpr);
      const height = Math.round(bounds.height * dpr);
      if (canvas.width !== width || canvas.height !== height) {
        canvas.width = width;
        canvas.height = height;
      }
      context.setTransform(dpr, 0, 0, dpr, 0, 0);
      context.fillStyle = '#090909';
      context.fillRect(0, 0, bounds.width, bounds.height);
      const scale = Math.min(bounds.width / image.naturalWidth, bounds.height / image.naturalHeight);
      const drawWidth = image.naturalWidth * scale;
      const drawHeight = image.naturalHeight * scale;
      context.drawImage(image, (bounds.width - drawWidth) / 2, (bounds.height - drawHeight) / 2, drawWidth, drawHeight);
    };
    const load = (index: number) => {
      const image = new Image();
      images[index] = image;
      image.decoding = 'async';
      image.src = framePath(index);
      image.onload = () => {
        if (cancelled) return;
        if (index === 0) firstFrameReady = true;
        if (firstFrameReady) draw(Math.round(progressRef.current * (TOTAL_FRAMES - 1)));
      };
    };
    if (reducedMotion) {
      load(0);
      const stillObserver = new ResizeObserver(() => draw(0));
      if (canvasRef.current) stillObserver.observe(canvasRef.current);
      return () => {
        cancelled = true;
        stillObserver.disconnect();
        images.forEach((image) => { if (image) image.onload = null; });
      };
    }
    for (let index = 0; index < TOTAL_FRAMES; index += 1) load(index);

    const resizeObserver = new ResizeObserver(() => draw(Math.round(progressRef.current * (TOTAL_FRAMES - 1))));
    if (canvasRef.current) resizeObserver.observe(canvasRef.current);
    const section = sectionRef.current;
    let timeline: gsap.core.Timeline | undefined;
    if (section) {
      timeline = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: '+=420%',
          pin: true,
          scrub: 0.65,
          invalidateOnRefresh: true,
          onUpdate: (trigger) => {
            const progress = trigger.progress;
            const clamp = (value: number) => Math.max(0, Math.min(1, value));
            progressRef.current = progress;
            const person = clamp(1 - progress * 6);
            const character = Math.min(clamp((progress - 0.12) * 5), clamp((0.68 - progress) * 4.5));
            const system = clamp((progress - 0.56) * 4);
            const setOverlay = (selector: string, opacity: number, offset: number) => {
              const element = section.querySelector<HTMLElement>(selector);
              if (!element) return;
              element.style.opacity = String(opacity);
              element.setAttribute('aria-hidden', String(opacity < 0.08));
              const shift = (1 - opacity) * offset;
              element.style.transform = `translate(-50%, calc(-50% ${shift >= 0 ? '+' : '-'} ${Math.abs(shift)}px))`;
            };
            setOverlay('.film__person', person, -20);
            setOverlay('.film__character', character, 20);
            setOverlay('.film__system', system, 20);
            section.querySelector('[data-film-frame]')?.replaceChildren(String(Math.round(trigger.progress * 239) + 1).padStart(3, '0'));
            draw(Math.min(TOTAL_FRAMES - 1, Math.round(trigger.progress * (TOTAL_FRAMES - 1))));
          },
        },
      });
    }
    return () => {
      cancelled = true;
      timeline?.scrollTrigger?.kill();
      timeline?.kill();
      resizeObserver.disconnect();
      images.forEach((image) => { if (image) image.onload = null; });
    };
  }, []);

  return (
    <section ref={sectionRef} className="film" aria-label="The Archivist, a cinematic portrait">
      <canvas ref={canvasRef} className="film__canvas" aria-hidden="true" />
      <div className="film__shade" />
      <div className="film__top"><a className="wordmark" href="#person" aria-label="Eric, return to beginning">E<span>.</span></a><span className="film__edition">A STUDY IN SYSTEMS <i>—</i> 2026</span><a className="film__contact" href="#exit">LET’S TALK <ArrowUpRight size={14} /></a></div>
      <div className="film__copy">
        <div className="film__person"><p className="eyebrow">PERSON — 01 / 08</p><h1>ERIC</h1><p className="film__subline">A mind in motion.</p></div>
        <div className="film__character" aria-hidden="true"><p className="eyebrow">CHARACTER — 02 / 08</p><h2>Observe.<br /><em>Understand.</em><br />Rebuild.</h2><p className="film__caption">A visual language for the way I see the world.</p></div>
        <div className="film__system" aria-hidden="true"><p className="eyebrow">SYSTEM — 03 / 08</p><p className="film__statement">Find the structure<br />beneath the surface.</p><p className="film__caption">Then make something that could not exist before.</p></div>
      </div>
      <div className="film__bottom"><span>INDEPENDENT DESIGNER &amp; SYSTEMS THINKER</span><span className="film__scroll"><span>SCROLL TO ENTER</span><ArrowDown size={13} /></span><span>FRAME <b data-film-frame>001</b> / 240</span></div>
    </section>
  );
}

function ChapterHeading({ number, title, note, light = false }: { number: string; title: string; note: string; light?: boolean }) {
  return <header className={`chapter-heading ${light ? 'chapter-heading--light' : ''}`}><span className="eyebrow motion-reveal">{number} <i>—</i> {note}</span><h2 className="motion-reveal">{title}</h2><div className="chapter-rule motion-rule" /></header>;
}

export default function App() {
  useEditorialMotion();
  const [selectedProject, setSelectedProject] = useState(0);
  const [selectedPaper, setSelectedPaper] = useState<number | null>(null);
  const [selectedArtifact, setSelectedArtifact] = useState<number | null>(null);
  const [journalPage, setJournalPage] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const project = PROJECTS_DATA[selectedProject];
  const entry = JOURNAL_ENTRIES[journalPage];

  const goToChapter = (id: string) => {
    setMenuOpen(false);
    if (id === 'character') {
      const film = document.querySelector<HTMLElement>('.film');
      const trigger = ScrollTrigger.getAll().find((item) => item.trigger === film);
      if (trigger) {
        window.scrollTo({ top: trigger.start + (trigger.end - trigger.start) * 0.32, behavior: 'smooth' });
        return;
      }
      document.getElementById('person')?.scrollIntoView({ behavior: 'smooth' });
      return;
    }
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    const root = document.documentElement;
    const update = () => root.style.setProperty('--scroll-progress', String(window.scrollY / Math.max(1, document.documentElement.scrollHeight - window.innerHeight)));
    window.addEventListener('scroll', update, { passive: true });
    return () => window.removeEventListener('scroll', update);
  }, []);

  return <div className="experience">
    <div className="reading-progress" aria-hidden="true" />
    <nav className="side-nav" aria-label="Chapter navigation">
      <button className="side-nav__toggle" onClick={() => setMenuOpen(!menuOpen)} aria-expanded={menuOpen}><span>INDEX</span><span className="side-nav__icon">{menuOpen ? '−' : '+'}</span></button>
      <div className={`side-nav__list ${menuOpen ? 'is-open' : ''}`}>{[['person','01','Person'],['character','02','Character'],['system','03','System'],['work','04','Work'],['research','05','Research'],['archive','06','Archive'],['journal','07','Journal'],['exit','08','Exit']].map(([id,n,label]) => <button key={id} onClick={() => goToChapter(id)}><span>{n}</span>{label}</button>)}</div>
    </nav>

    <div id="person"><ArchivistFilm /></div>
    <div className="story-transition">
      <section id="system" className="chapter system-chapter">
        <div className="chapter__inner system-chapter__inner">
          <ChapterHeading number="03" title="SYSTEM" note="THE METHOD" />
          <div className="system-chapter__body motion-stagger"><p className="system-lede">Curiosity is the<br /><em>first instrument.</em></p><div className="system-copy"><p>I look for the hidden logic in complex things: how they connect, where they fail, and what they might become.</p><p>Code, research, image, and motion are different materials. The work is learning what each one can reveal.</p><div className="system-diagram"><span>OBSERVE</span><i></i><span>MODEL</span><i></i><span>MAKE</span><svg viewBox="0 0 420 52" role="presentation"><path d="M2 38 C80 38 78 12 150 12 S220 42 286 42 340 12 418 12" /></svg></div></div></div>
        </div>
      </section>

      <section id="work" className="chapter work-chapter">
        <div className="chapter__inner">
          <ChapterHeading number="04" title="WORK" note="THINGS MADE TO LAST" />
          <div className="work-layout">
            <div className="work-list" role="tablist" aria-label="Selected work">{PROJECTS_DATA.map((item, index) => <button role="tab" aria-selected={selectedProject === index} key={item.id} className={`work-list__item ${selectedProject === index ? 'is-selected' : ''}`} onClick={() => setSelectedProject(index)}><span className="work-list__number">{item.number}</span><span className="work-list__title">{item.title}</span><span className="work-list__arrow">↗</span></button>)}</div>
            <article className="work-detail" key={project.id}>
              <div className="work-detail__meta"><span>{project.category}</span><span>{project.year}</span></div>
              <h3>{project.title}</h3><p className="work-detail__subtitle">{project.subtitle}</p><p className="work-detail__summary">{project.summary}</p>
              <div className="work-detail__result"><span className="eyebrow">THE RESULT</span><p>{project.result}</p></div>
              <div className="work-detail__metrics">{project.metrics.map((metric) => <div key={metric.label}><CounterValue text={metric.value} /><span>{metric.label}</span></div>)}</div>
              <div className="work-detail__links">{project.githubUrl && <a href={project.githubUrl} target="_blank" rel="noreferrer">EXPLORE PROJECT <ArrowUpRight size={14} /></a>}{project.demoUrl && <a href={project.demoUrl} target="_blank" rel="noreferrer">LIVE STUDY <ArrowUpRight size={14} /></a>}</div>
            </article>
          </div>
        </div>
      </section>

      <section id="research" className="chapter paper-chapter">
        <div className="chapter__inner">
          <ChapterHeading number="05" title="RESEARCH" note="QUESTIONS, MADE VISIBLE" light />
          <div className="research-intro motion-reveal"><p>Not answers for their own sake.<br /><em>Better questions, made precise.</em></p><span>{String(RESEARCH_PAPERS.length).padStart(2,'0')} PAPERS / SELECTED</span></div>
          <div className="paper-list">{RESEARCH_PAPERS.map((paper, index) => <article className={`paper-row ${selectedPaper === index ? 'is-open' : ''}`} key={paper.id}>
            <button className="paper-row__trigger" onClick={() => setSelectedPaper(selectedPaper === index ? null : index)} aria-expanded={selectedPaper === index}><span className="paper-row__num">{paper.number}</span><span className="paper-row__title">{paper.title}</span><span className="paper-row__date">{paper.date}</span><Plus size={18} /></button>
            {selectedPaper === index && <div className="paper-row__body"><MotionType text={paper.abstract} /><div><span>QUESTION</span><p>{paper.question}</p></div><div><span>METHOD</span><p>{paper.methodology}</p></div></div>}
          </article>)}</div>
        </div>
      </section>

      <section id="archive" className="chapter archive-chapter">
        <div className="chapter__inner">
          <ChapterHeading number="06" title="ARCHIVE" note="A RECORD OF BECOMING" light />
          <div className="archive-intro motion-reveal"><p>Ideas, in their unfinished state.<br /><em>Before they know what they are.</em></p><span>FIELD NOTES / 01—{String(ARCHIVE_ITEMS.length).padStart(2,'0')}</span></div>
          <div className="archive-list">{ARCHIVE_ITEMS.map((item, index) => <button className={`archive-item ${selectedArtifact === index ? 'is-selected' : ''}`} key={item.id} onClick={() => setSelectedArtifact(selectedArtifact === index ? null : index)}><span className="archive-item__index">{String(index + 1).padStart(2,'0')}</span><span className="archive-item__content"><span className="archive-item__title">{item.title}</span><span className="archive-item__description">{selectedArtifact === index ? item.details : item.description}</span></span><span className="archive-item__type">{item.type} <i>·</i> {item.date}</span><span className="archive-item__mark">{selectedArtifact === index ? '−' : '+'}</span></button>)}</div>
        </div>
      </section>

      <section id="journal" className="chapter journal-chapter">
        <div className="chapter__inner journal-chapter__inner">
          <ChapterHeading number="07" title="JOURNAL" note="THOUGHTS IN PROGRESS" light />
          <div className="journal-spread" key={entry.pageNumber}>
            <div className="journal-spread__margin"><span>PRIVATE OBSERVATIONS</span><span>{String(entry.pageNumber).padStart(2,'0')} / {String(JOURNAL_ENTRIES.length).padStart(2,'0')}</span></div>
            <article className="journal-entry"><div className="eyebrow">{entry.date} <i>—</i> FIELD NOTE {String(entry.pageNumber).padStart(2,'0')}</div><h3>{entry.title}</h3><div className="journal-entry__copy">{entry.content.map((paragraph, index) => <MotionType key={index} text={paragraph} />)}</div>{entry.quote && <blockquote>“{entry.quote}”</blockquote>}{entry.equation && <div className="journal-equation">{entry.equation}</div>}<div className="journal-entry__tags">{entry.tags.map((tag) => <span key={tag}>{tag}</span>)}</div></article>
            <div className="journal-controls"><span>A NOTE TO SELF</span><div><button aria-label="Previous journal page" disabled={journalPage === 0} onClick={() => setJournalPage((page) => Math.max(0, page - 1))}><ChevronLeft size={17} /></button><button aria-label="Next journal page" disabled={journalPage === JOURNAL_ENTRIES.length - 1} onClick={() => setJournalPage((page) => Math.min(JOURNAL_ENTRIES.length - 1, page + 1))}><ChevronRight size={17} /></button></div></div>
          </div>
        </div>
      </section>

      <footer id="exit" className="exit-chapter">
        <div className="exit-chapter__inner"><span className="eyebrow motion-reveal">08 — EXIT / OR BEGIN AGAIN</span><p className="exit-thought motion-reveal">The work is never<br /><em>quite finished.</em></p><a className="exit-link" href="mailto:eric.archivist@systems.dev">CONTINUE THE CONVERSATION <ArrowUpRight size={16} /></a><div className="exit-footer"><a href="#person">ERIC <i>—</i> THE ARCHIVIST</a><span>INDEPENDENT BY DESIGN</span><span>© 2026</span></div></div>
      </footer>
    </div>
  </div>;
}
