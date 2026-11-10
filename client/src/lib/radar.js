// Geometry for the hexagonal base-stat radar (StatRadar).
// The SVG viewBox is 240×150; the hexagon is centred at (RCX, RCY).

export const VIEW_W = 240;
export const VIEW_H = 150;
export const RCX = 120;
export const RCY = 75;
const RR = 52; // outer ring radius
const RMAX = 160; // stat value the outer ring represents

export const STAT_ORDER = ['hp', 'attack', 'defense', 'special-attack', 'special-defense', 'speed'];
export const STAT_LABELS = ['HP', 'Atk', 'Def', 'Sp.A', 'Sp.D', 'Spe'];

const SIDES = [0, 1, 2, 3, 4, 5];
const ang = (i) => -Math.PI / 2 + (i * Math.PI) / 3;
const pt = (i, r) => [+(RCX + Math.cos(ang(i)) * r).toFixed(1), +(RCY + Math.sin(ang(i)) * r).toFixed(1)];

export const RINGS = [0.25, 0.5, 0.75, 1].map((k) => SIDES.map((i) => pt(i, RR * k).join(',')).join(' '));
export const AXES = SIDES.map((i) => pt(i, RR));

// Label positions as % of the box, nudged outward so they sit beside each corner.
export const LABEL_POS = SIDES.map((i) => {
  const [x, y] = pt(i, RR + 8);
  const c = Math.cos(ang(i));
  const tx = Math.abs(c) < 0.1 ? '-50%' : c > 0 ? '0%' : '-100%';
  const ty = i === 0 ? '-100%' : i === 3 ? '0%' : '-50%';
  return {
    left: `${((x / VIEW_W) * 100).toFixed(2)}%`,
    top: `${((y / VIEW_H) * 100).toFixed(2)}%`,
    transform: `translate(${tx},${ty})`,
  };
});

// Base stats in radar order, e.g. [45, 49, 49, 65, 65, 45].
export const statValues = (stats) => STAT_ORDER.map((k) => stats.find((s) => s.name === k)?.base_stat ?? 0);

// Corner points of the stat polygon for those values.
export const statPoints = (values) => values.map((v, i) => pt(i, (RR * Math.min(v, RMAX)) / RMAX));
