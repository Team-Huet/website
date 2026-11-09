'use client';

import { useHeroMotion } from './HeroMotion';
import styles from './Trajectory.module.scss';

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

// Palm and fingertip coordinates are in the point-cloud mask's local space.
const fingers = [
  { tip: [57, -116], curve: 'Q35,-35 42,-55 T46,-96 Q49,-110' },
  { tip: [-56, -147], curve: 'Q2,-53 -11,-78 T-37,-123 Q-47,-137' },
  { tip: [-95, -130], curve: 'Q-16,-49 -36,-70 T-71,-109 Q-84,-122' },
  { tip: [-118, -95], curve: 'Q-30,-36 -50,-49 T-92,-77 Q-109,-87' },
  { tip: [-113, -52], curve: 'Q-29,-22 -54,-26 T-93,-41 Q-104,-45' },
];
const synapses = [
  'M72,83 Q52,32 27,8 T-1,-31',
  ...fingers.map(({ tip, curve }) => 'M-1,-31 ' + curve + ' ' + tip.join(',')),
  'M57,-116 L-23,-101 -53,-90 -70,-65 -74,-34',
];
const dust = Array.from({ length: 75 }, (_, i) => ({
  x: (i * 379 + 121) % 1200,
  y: (i * i * 13 + i * 137 + 17) % 600,
}));

export function Trajectory({ play, pause }: { play: string; pause: string }) {
  const { playing, toggle } = useHeroMotion();

  return (
    <div className={styles.figure} data-playing={playing}>
      <svg
        className={styles.paths}
        viewBox="0 0 1200 600"
        preserveAspectRatio="xMidYMid slice"
        aria-hidden="true"
        focusable="false"
      >
        <defs>
          <mask
            id="huet-hand-cloud"
            maskUnits="userSpaceOnUse"
            x="-135"
            y="-152"
            width="216"
            height="229"
          >
            <image
              href="/art/hand-points.webp"
              x="-135"
              y="-152"
              width="216"
              height="229"
            />
          </mask>
          <linearGradient
            id="huet-hand-depth"
            x1="0"
            y1="1"
            x2="0.75"
            y2="0"
            gradientUnits="objectBoundingBox"
          >
            <stop stopColor="var(--brand)" />
            <stop offset=".56" stopColor="var(--accent-text)" />
            <stop offset="1" stopColor="var(--hero-gold-peak)" />
          </linearGradient>
          <linearGradient id="huet-hand-wave" x2="0" y2="1">
            <stop stopColor="var(--gold)" stopOpacity="0" />
            <stop offset=".55" stopColor="var(--gold)" />
            <stop offset="1" stopColor="var(--ice)" stopOpacity="0" />
          </linearGradient>
        </defs>
        <g className={styles.network}>
          {routes.map((route, index) => {
            const path =
              'M' + route.map((id) => nodes[id].join(',')).join(' L');
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
        </g>
        <g className={styles.dust}>
          {dust.map(({ x, y }, i) => (
            <circle key={i} cx={x} cy={y} r={i % 8 === 0 ? 3.2 : 1.3} />
          ))}
        </g>
        <g transform="translate(875 447) scale(2.72)">
          <g className={styles.hand} data-particle-hand="">
            <g mask="url(#huet-hand-cloud)">
              <rect
                x="-135"
                y="-152"
                width="216"
                height="229"
                fill="url(#huet-hand-depth)"
              />
              <rect
                className={styles.wave}
                x="-135"
                y="0"
                width="216"
                height="60"
                fill="url(#huet-hand-wave)"
              />
            </g>
            <g className={styles.synapses}>
              {synapses.map((d, i) => (
                <g key={d}>
                  <path d={d} className={styles.fiber} />
                  <path
                    d={d}
                    pathLength="100"
                    className={styles.signal}
                    style={{ animationDelay: `-${i * 0.71}s` }}
                  />
                </g>
              ))}
              {fingers.map(({ tip: [x, y] }, i) => (
                <g key={x} transform={`translate(${x} ${y})`}>
                  <circle r="3.8" className={styles.ring} />
                  <circle
                    r="1.1"
                    className={styles.sensor}
                    style={{ animationDelay: `-${i * 0.56}s` }}
                  />
                </g>
              ))}
              <g transform="translate(-1 -31)">
                <path
                  className={styles.fiber}
                  d="M0,-12 11,-4 8,10 -7,11 -13,-2 Z M0,-12 8,10 -13,-2 11,-4 -7,11 Z"
                />
                <circle r="2" className={styles.sensor} />
                <circle r="15" className={styles.ripple} />
              </g>
            </g>
          </g>
        </g>
      </svg>
      <button type="button" onClick={toggle}>
        <span aria-hidden="true">{playing ? 'Ⅱ' : '▷'}</span>
        {playing ? pause : play}
      </button>
    </div>
  );
}
