import type { ReactNode } from 'react';
import styles from './GradientText.module.scss';

// React Bits Gradient Text, linear variant adapted for the hero's shared playback control.
// https://reactbits.dev/text-animations/gradient-text
export function GradientText({
  children,
  colors,
}: {
  children: ReactNode;
  colors: [string, string, ...string[]];
}) {
  const loop = [...colors, colors[0]];
  return (
    <span
      className={styles.content}
      style={{ backgroundImage: `linear-gradient(90deg, ${loop.join(', ')})` }}
    >
      {children}
    </span>
  );
}
