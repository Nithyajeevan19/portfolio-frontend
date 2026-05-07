import { useRef, useEffect } from 'react';
import { useSpring, useMotionValue } from 'framer-motion';

export function useMagnetic(strength = 0.3) {
  const ref = useRef<HTMLElement>(null);
  const rectRef = useRef<DOMRect | null>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springConfig = { stiffness: 150, damping: 15, mass: 0.1 };
  const springX = useSpring(x, springConfig);
  const springY = useSpring(y, springConfig);

  const updateRect = () => {
    if (ref.current) {
      rectRef.current = ref.current.getBoundingClientRect();
    }
  };

  useEffect(() => {
    window.addEventListener('resize', updateRect);
    return () => window.removeEventListener('resize', updateRect);
  }, []);

  const onMouseMove = (e: React.MouseEvent) => {
    if (!rectRef.current) updateRect();
    const rect = rectRef.current;
    if (!rect) return;
    
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    x.set((e.clientX - cx) * strength);
    y.set((e.clientY - cy) * strength);
  };

  const onMouseLeave = () => {
    x.set(0);
    y.set(0);
    rectRef.current = null;
  };

  const onMouseEnter = () => {
    updateRect();
  };

  return { ref, pos: { x: springX, y: springY }, onMouseMove, onMouseLeave, onMouseEnter };
}
