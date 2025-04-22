'use client';

import { useEffect, useState } from 'react';

export function useMediaQuery(query: string) {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    // Pastikan kita hanya menggunakan matchMedia setelah komponen dipasang di klien
    const media = window.matchMedia(query);
    const listener = () => setMatches(media.matches);

    media.addEventListener('change', listener);
    listener(); // Initial check to set the state immediately

    return () => {
      media.removeEventListener('change', listener);
    };
  }, [query]);

  return matches;
}
