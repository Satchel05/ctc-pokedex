// sampleArt() from Pokemon Cards v2, as a promise-returning function with a cache.
// Buckets opaque pixels by hue, weights by saturation × value, and picks the two
// strongest hues as { primary, secondary } hex strings (null if nothing usable).

const cache = new Map();

const analyse = (img) => {
  const S = 48;
  const cv = document.createElement('canvas');
  cv.width = cv.height = S;
  const ctx = cv.getContext('2d', { willReadFrequently: true });
  ctx.drawImage(img, 0, 0, S, S);
  const px = ctx.getImageData(0, 0, S, S).data;

  const buckets = Array.from({ length: 12 }, () => ({ w: 0, r: 0, g: 0, b: 0 }));
  for (let i = 0; i < px.length; i += 4) {
    if (px[i + 3] < 200) continue;
    const r = px[i], g = px[i + 1], b = px[i + 2];
    const mx = Math.max(r, g, b), mn = Math.min(r, g, b), d = mx - mn;
    const sat = mx ? d / mx : 0, val = mx / 255;
    if (sat < 0.25 || val < 0.2 || val > 0.97) continue;
    let h = d === 0 ? 0 : mx === r ? ((g - b) / d) % 6 : mx === g ? (b - r) / d + 2 : (r - g) / d + 4;
    h = (h * 60 + 360) % 360;
    const bk = buckets[Math.floor(h / 30) % 12], w = sat * val;
    bk.w += w; bk.r += r * w; bk.g += g * w; bk.b += b * w;
  }

  const top = buckets.filter((bk) => bk.w > 0).sort((a, b) => b.w - a.w);
  if (!top.length) return null;
  const hex = (bk) => '#' + [bk.r, bk.g, bk.b].map((c) => Math.round(c / bk.w).toString(16).padStart(2, '0')).join('');
  const primary = hex(top[0]);
  const secondary = top[1] && top[1].w > top[0].w * 0.25 ? hex(top[1]) : primary;
  return { primary, secondary };
};

export const sampleArt = (src) => {
  if (!src) return Promise.resolve(null);
  if (!cache.has(src)) {
    cache.set(
      src,
      new Promise((resolve) => {
        const img = new window.Image();
        img.crossOrigin = 'anonymous';
        img.onload = () => {
          try {
            resolve(analyse(img));
          } catch {
            resolve(null); // tainted canvas (no CORS): keep the type-colour fallback
          }
        };
        img.onerror = () => resolve(null);
        img.src = src;
      }),
    );
  }
  return cache.get(src);
};
