import { useEffect, useState } from "react";

interface ReadingPosition {
  y: number;
  ratio: number;
}

const key = (slug: string) => `reading:${slug}`;

export function getReadingRatio(slug: string): number {
  try {
    const raw = localStorage.getItem(key(slug));
    if (!raw) return 0;
    return (JSON.parse(raw) as ReadingPosition).ratio;
  } catch {
    return 0;
  }
}

export function useReadingPosition(slug: string) {
  const [savedPosition, setSavedPosition] = useState<ReadingPosition | null>(null);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(key(slug));
      if (raw) {
        const pos = JSON.parse(raw) as ReadingPosition;
        if (pos.y > 800 && pos.ratio < 0.97) setSavedPosition(pos);
      }
    } catch {
      // ignore
    }

    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      window.setTimeout(() => {
        ticking = false;
        const max = document.documentElement.scrollHeight - window.innerHeight;
        if (max <= 0) return;
        const ratio = Math.min(1, window.scrollY / max);
        try {
          localStorage.setItem(key(slug), JSON.stringify({ y: window.scrollY, ratio }));
        } catch {
          // ignore
        }
      }, 500);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [slug]);

  const resume = () => {
    if (savedPosition) {
      window.scrollTo({ top: savedPosition.y, behavior: "smooth" });
      setSavedPosition(null);
    }
  };

  const dismiss = () => setSavedPosition(null);

  return { savedPosition, resume, dismiss };
}
