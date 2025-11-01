import { useState, useEffect, useRef } from 'react';

const easeOutQuad = (t: number) => t * (2 - t);

export const useCountUp = (end: number, duration: number = 2000): number => {
  const [count, setCount] = useState(0);
  const frameRef = useRef<number | null>(null);

  useEffect(() => {
    if (end === 0 && count === 0) {
      return;
    }

    let startTime: number | null = null;
    
    const animate = (timestamp: number) => {
      if (!startTime) {
        startTime = timestamp;
      }

      const progress = timestamp - startTime;
      const progressFraction = Math.min(progress / duration, 1);
      
      const easedProgress = easeOutQuad(progressFraction);
      
      const currentVal = Math.floor(easedProgress * end);
      
      setCount(currentVal);

      if (progress < duration) {
        frameRef.current = requestAnimationFrame(animate);
      } else {
        setCount(end); // Ensure final value is exact
      }
    };
    
    frameRef.current = requestAnimationFrame(animate);

    return () => {
      if (frameRef.current) {
        cancelAnimationFrame(frameRef.current);
      }
    };
  }, [end, duration]);

  return count;
};
