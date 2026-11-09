'use client';

import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { GradientText } from '../GradientText/GradientText';
import { useHeroMotion } from '@/components/ui/Trajectory/HeroMotion';
import styles from './TextType.module.scss';

// React Bits Text Type, adapted to one bilingual heading and the shared Hero control.
// https://reactbits.dev/text-animations/text-type — license in ../LICENSE.md.
const typingSpeed = 150;
const pauseDuration = 1500;
const deletingSpeed = 50;
const mistakes = 0.2;
const neighbors: Record<string, string> = {
  a: 'qwsz',
  b: 'vghn',
  c: 'xdfv',
  d: 'serfcx',
  e: 'wsdr',
  f: 'drtgvc',
  g: 'ftyhbv',
  h: 'gyujnb',
  i: 'ujko',
  j: 'huikmn',
  k: 'jiolm',
  l: 'kop',
  m: 'njk',
  n: 'bhjm',
  o: 'iklp',
  p: 'ol',
  q: 'wa',
  r: 'edft',
  s: 'awedxz',
  t: 'rfgy',
  u: 'yhji',
  v: 'cfgb',
  w: 'qase',
  x: 'zsdc',
  y: 'tghu',
  z: 'asx',
};

function Accent({ children }: { children: React.ReactNode }) {
  return (
    <GradientText colors={['var(--hero-gold-peak)', 'var(--hero-gold-shade)']}>
      {children}
    </GradientText>
  );
}

type Phase = 'type' | 'correct' | 'retry' | 'delete';

export function TextType({ title, accent }: { title: string; accent: string }) {
  const { playing } = useHeroMotion();
  const [count, setCount] = useState(0);
  const [phase, setPhase] = useState<Phase>('type');
  const [typo, setTypo] = useState('');
  const heading = useRef<HTMLHeadingElement>(null);
  const caret = useRef<HTMLSpanElement>(null);
  const cursor = useRef<HTMLSpanElement>(null);
  const text = title + accent;
  const atEnd = count === text.length;

  useEffect(() => {
    if (!playing) return;
    let delay = typingSpeed;
    if (phase === 'delete') delay = deletingSpeed;
    else if (atEnd) delay = pauseDuration;
    else if (phase === 'correct') delay = 350;

    const timer = window.setTimeout(() => {
      if (phase === 'delete' || atEnd) {
        setCount(count - 1);
        setPhase(count === 1 ? 'type' : 'delete');
      } else if (phase === 'correct') {
        setTypo('');
        setPhase('retry');
      } else {
        const char = text[count];
        const keys = neighbors[char.toLowerCase()];
        // Upstream scales this intensity to keep simulated errors occasional.
        if (
          count > 0 &&
          phase !== 'retry' &&
          keys &&
          Math.random() < mistakes * 0.16
        ) {
          const wrong = keys[Math.floor(Math.random() * keys.length)];
          setTypo(char === char.toUpperCase() ? wrong.toUpperCase() : wrong);
          setPhase('correct');
        } else {
          setCount(count + 1);
          setPhase('type');
        }
      }
    }, delay);
    return () => window.clearTimeout(timer);
  }, [playing, phase, count, atEnd, text]);

  useLayoutEffect(() => {
    const root = heading.current,
      marker = caret.current,
      bar = cursor.current;
    if (!playing || !root || !marker || !bar) return;
    function position() {
      if (!root || !marker || !bar) return;
      const box = root.getBoundingClientRect();
      const target = marker.getBoundingClientRect();
      const x = target.left - box.left;
      const y = target.top - box.top;
      bar.style.transitionDuration =
        bar.style.top === y + 'px' ? '120ms' : '0ms';
      bar.style.top = y + 'px';
      bar.style.transform = 'translateX(' + x + 'px)';
    }
    position();
    const observer = new ResizeObserver(position);
    observer.observe(root);
    document.fonts.addEventListener('loadingdone', position);
    return () => {
      observer.disconnect();
      document.fonts.removeEventListener('loadingdone', position);
    };
  }, [playing, count, typo]);

  function line(value: string, offset: number, active: boolean) {
    const shown = Math.min(value.length, Math.max(0, count - offset));
    const error = active ? typo : '';
    return (
      <>
        {Array.from(value.slice(0, shown)).map((char, index) => (
          <span key={index} className={styles.glyph}>
            {char}
          </span>
        ))}
        {error && <span className={styles.glyph}>{error}</span>}
        {active && <span ref={caret} className={styles.marker} />}
        <span className={styles.remainder}>
          {value.slice(shown + error.length)}
        </span>
      </>
    );
  }

  return (
    <h1
      id="hero-title"
      ref={heading}
      className={styles.heading}
      aria-label={title + ' ' + accent}
    >
      <span aria-hidden="true" className={playing ? styles.reserve : undefined}>
        <span className={styles.line}>{title}</span>
        <span className={styles.line}>
          <Accent>{accent}</Accent>
          <span className={styles.staticBar} />
        </span>
      </span>
      {playing && (
        <span className={styles.overlay} aria-hidden="true" data-typing="">
          <span className={styles.line}>
            {line(title, 0, count < title.length)}
          </span>
          <span className={styles.line}>
            <Accent>{line(accent, title.length, count >= title.length)}</Accent>
          </span>
          <span ref={cursor} className={styles.cursor} />
        </span>
      )}
    </h1>
  );
}
