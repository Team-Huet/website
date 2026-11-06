'use client';

import { useEffect, useRef, type ReactNode } from 'react';
import styles from './SectionMenu.module.scss';

export function SectionMenu({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  const ref = useRef<HTMLDetailsElement>(null);
  useEffect(() => {
    function closeOutside(event: PointerEvent) {
      const menu = ref.current;
      if (
        menu?.open &&
        event.target instanceof Node &&
        !menu.contains(event.target)
      )
        menu.open = false;
    }
    document.addEventListener('pointerdown', closeOutside);
    return () => document.removeEventListener('pointerdown', closeOutside);
  }, []);
  return (
    <details
      ref={ref}
      className={styles.menu}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget))
          event.currentTarget.open = false;
      }}
      onKeyDown={(event) => {
        if (event.key === 'Escape' && event.currentTarget.open) {
          event.currentTarget.open = false;
          event.currentTarget.querySelector('summary')?.focus();
        }
      }}
    >
      <summary>{title}</summary>
      <div
        onClick={(event) => {
          const link =
            event.target instanceof Element ? event.target.closest('a') : null;
          if (
            !link ||
            event.ctrlKey ||
            event.metaKey ||
            event.shiftKey ||
            event.altKey
          )
            return;
          const target = document.getElementById(link.hash.slice(1));
          if (ref.current) ref.current.open = false;
          if (target) {
            target.tabIndex = -1;
            target.focus({ preventScroll: true });
          }
        }}
      >
        {children}
      </div>
    </details>
  );
}
