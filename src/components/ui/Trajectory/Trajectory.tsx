'use client';

import { useState, useSyncExternalStore } from 'react';
import styles from './Trajectory.module.scss';

const motionQuery = '(prefers-reduced-motion: reduce)';

function subscribe(onChange: () => void) {
  const query = window.matchMedia(motionQuery);
  query.addEventListener('change', onChange);
  return () => query.removeEventListener('change', onChange);
}

// Shared junctions let packets follow multi-hop routes through the same network.
const nodes = [
  [120, 390],
  [310, 315],
  [455, 368],
  [440, 170],
  [598, 254],
  [609, 465],
  [754, 385],
  [744, 159],
  [846, 244],
  [908, 93],
  [953, 334],
  [1046, 200],
  [1120, 86],
  [1190, 254],
  [1135, 427],
  [973, 502],
  [810, 553],
  [1240, 540],
  [671, 51],
  [412, 535],
  [1070, -20],
  [1260, 125],
];

const routes = [
  [0, 1, 2, 4, 7, 9, 12, 21],
  [3, 4, 8, 11, 13],
  [19, 5, 6, 8, 9, 20],
  [16, 6, 10, 11, 12],
  [2, 5, 15, 14, 17],
  [18, 7, 8, 10, 14, 13, 21],
  [3, 1],
  [9, 11],
  [6, 15],
  [10, 15],
  [5, 19, 0],
];

export function Trajectory({ play, pause }: { play: string; pause: string }) {
  const reduced = useSyncExternalStore(
    subscribe,
    () => window.matchMedia(motionQuery).matches,
    () => true,
  );
  const [choice, setChoice] = useState<boolean>();
  const playing = choice ?? !reduced;

  return (
    <div className={styles.figure} data-playing={playing}>
      <svg
        className={styles.paths}
        viewBox="0 0 1200 600"
        preserveAspectRatio="none"
        aria-hidden="true"
        focusable="false"
      >
        {routes.map((route, index) => {
          const path = 'M' + route.map((id) => nodes[id].join(',')).join(' L');
          return (
            <g key={index}>
              <path className={styles.connection} d={path} />
              {route.length > 2 && (
                <path
                  className={styles.point}
                  d={path}
                  pathLength="100"
                  style={{ animationDelay: `-${index * 1.73 + 0.8}s` }}
                />
              )}
            </g>
          );
        })}
        {nodes.map(([x, y], index) => (
          <g key={index}>
            {index % 4 === 0 && (
              <circle className={styles.hub} cx={x} cy={y} r="9" />
            )}
            <circle cx={x} cy={y} r={index % 4 === 0 ? 3.6 : 2.6} />
          </g>
        ))}
      </svg>
      <button type="button" onClick={() => setChoice(!playing)}>
        <span aria-hidden="true">{playing ? 'Ⅱ' : '▷'}</span>
        {playing ? pause : play}
      </button>
    </div>
  );
}
