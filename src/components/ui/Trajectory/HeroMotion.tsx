'use client';

import {
  createContext,
  useContext,
  useState,
  useSyncExternalStore,
  type ReactNode,
} from 'react';

const MotionContext = createContext({ playing: false, toggle: () => {} });
export const useHeroMotion = () => useContext(MotionContext);

const motionQuery = '(prefers-reduced-motion: reduce)';

function subscribe(onChange: () => void) {
  const query = window.matchMedia(motionQuery);
  query.addEventListener('change', onChange);
  return () => query.removeEventListener('change', onChange);
}

export function HeroMotion({ children }: { children: ReactNode }) {
  const reduced = useSyncExternalStore(
    subscribe,
    () => window.matchMedia(motionQuery).matches,
    () => true,
  );
  const [choice, setChoice] = useState<boolean>();
  const playing = choice ?? !reduced;

  return (
    <MotionContext.Provider
      value={{ playing, toggle: () => setChoice(!playing) }}
    >
      {children}
    </MotionContext.Provider>
  );
}
