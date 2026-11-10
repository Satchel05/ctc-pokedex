import { AXES, LABEL_POS, RCX, RCY, RINGS, STAT_LABELS, STAT_ORDER, VIEW_H, VIEW_W, statPoints, statValues } from '../lib/radar';

// Hexagonal base-stat radar. Uses the card's --c1 / --c1-fill colours (see card-tint in index.css).
export const StatRadar = ({ stats }) => {
  const values = statValues(stats);
  const dots = statPoints(values);

  return (
    <div className='relative aspect-[240/150] w-full'>
      <svg
        viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
        role='img'
        aria-label={values.map((v, i) => `${STAT_LABELS[i]} ${v}`).join(', ')}
        className='absolute inset-0 size-full overflow-visible'>
        <g className='fill-none stroke-line'>
          {RINGS.map((points) => (
            <polygon
              key={points}
              points={points}
            />
          ))}
          {AXES.map(([x, y]) => (
            <line
              key={`${x},${y}`}
              x1={RCX}
              y1={RCY}
              x2={x}
              y2={y}
            />
          ))}
        </g>
        <polygon
          points={dots.map((d) => d.join(',')).join(' ')}
          strokeWidth='1.5'
          strokeLinejoin='round'
          className='fill-(--c1-fill) stroke-(--c1)'
        />
        {dots.map(([x, y], i) => (
          <circle
            key={STAT_ORDER[i]}
            cx={x}
            cy={y}
            r='2.5'
            strokeWidth='1.5'
            className='fill-surface stroke-(--c1)'
          />
        ))}
      </svg>

      {LABEL_POS.map((pos, i) => (
        <span
          key={STAT_ORDER[i]}
          style={pos}
          className='absolute flex gap-0.75 text-[11px] leading-none whitespace-nowrap text-ink-muted'>
          {STAT_LABELS[i]}
          <span className='font-semibold text-ink-strong tabular-nums'>{values[i]}</span>
        </span>
      ))}
    </div>
  );
};
