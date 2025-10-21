import { useState, useEffect } from "react";

export default function useResponsiveScale(ref, min = 0.8, max = 1.2) {
  const [scale, setScale] = useState(1);

  useEffect(() => {
    if (!ref.current) return;

    const observer = new ResizeObserver(([entry]) => {
      const width = entry.contentRect.width;
      const factor = Math.min(max, Math.max(min, width / 800));
      setScale(factor);
    });

    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [ref, min, max]);

  return scale;
}
