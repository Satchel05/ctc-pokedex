import { useEffect, useState } from 'react';
import { sampleArt } from './sampleArt';

// Returns { primary, secondary } hex colours sampled from the artwork,
// or null until sampling finishes (or if it fails).
export const useArtColors = (src) => {
  const [sampled, setSampled] = useState(null);

  useEffect(() => {
    let cancelled = false;
    sampleArt(src).then((result) => {
      if (!cancelled) setSampled(result ? { src, ...result } : null);
    });
    return () => {
      cancelled = true;
    };
  }, [src]);

  return sampled && sampled.src === src ? sampled : null;
};
