"use client";

import { useState, useEffect, useRef } from "react";

export default function AnimatedNumber({ value }: { value: string }) {
  const [count, setCount] = useState(0);
  const elementRef = useRef<HTMLSpanElement>(null);

  const match = value.match(/^(\D*)(\d+)(.*)$/);
  const hasMatch = !!match;
  const prefix = match ? match[1] : "";
  const numStr = match ? match[2] : "";
  const suffix = match ? match[3] : "";
  const numericValue = parseInt(numStr, 10) || 0;

  useEffect(() => {
    if (!hasMatch) return;

    let active = true;
    let observer: IntersectionObserver;

    if (elementRef.current) {
      observer = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting) {
            const end = numericValue;
            const duration = 1500;
            const startTime = performance.now();

            const animate = (now: number) => {
              if (!active) return;
              const elapsed = now - startTime;
              const progress = Math.min(elapsed / duration, 1);
              const easeProgress = progress * (2 - progress);
              setCount(Math.floor(easeProgress * end));

              if (progress < 1) {
                requestAnimationFrame(animate);
              } else {
                setCount(end);
              }
            };

            requestAnimationFrame(animate);
            observer.disconnect();
          }
        },
        { threshold: 0.1 }
      );
      observer.observe(elementRef.current);
    }

    return () => {
      active = false;
      if (observer) observer.disconnect();
    };
  }, [hasMatch, numericValue]);

  if (!hasMatch) {
    return <span>{value}</span>;
  }

  return (
    <span ref={elementRef}>
      {prefix}
      {count}
      {suffix}
    </span>
  );
}
