'use client';

import { useEffect, useRef, type ReactNode } from 'react';

export function SectionEntrance({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current || !('IntersectionObserver' in window)) return;
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          entry.target.removeAttribute('data-entering');
          entry.target.setAttribute('data-entered', '');
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.2 },
    );

    for (const text of ref.current.querySelectorAll('p, h2, dl > div')) {
      text.setAttribute('data-entering', '');
      observer.observe(text);
    }
    return () => observer.disconnect();
  }, []);

  return <div ref={ref}>{children}</div>;
}
