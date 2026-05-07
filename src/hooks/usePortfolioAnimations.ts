/**
 * usePortfolioAnimations
 * Global animation hook — wires cursor → CSS vars, scroll progress,
 * click burst particles, and returns mousePos ref for SaturnOrb.
 */
import { useEffect, useRef } from "react";

export function usePortfolioAnimations() {
  const mousePos = useRef({ x: 0, y: 0 });

  useEffect(() => {
    // 1. Track cursor (keep in ref for components that might need it)
    const onMove = (e: MouseEvent) => {
      mousePos.current.x = e.clientX;
      mousePos.current.y = e.clientY;
    };

    // 2. Click → spawn burst particle DOM node (Law 3: clicks have mass)
    const onClick = (e: MouseEvent) => {
      const el = document.createElement("div");
      el.className = "click-burst";
      el.style.left = `${e.clientX}px`;
      el.style.top = `${e.clientY}px`;
      document.body.appendChild(el);
      // Clean up after animation finishes
      setTimeout(() => el.remove(), 640);
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("click", onClick, { passive: true });

    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("click", onClick);
    };
  }, []);

  return mousePos;
}
