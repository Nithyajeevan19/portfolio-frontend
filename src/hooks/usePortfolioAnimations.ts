/**
 * usePortfolioAnimations
 * Global animation hook — wires cursor → CSS vars, scroll progress,
 * click burst particles, and returns mousePos ref for SaturnOrb.
 */
import { useEffect, useRef } from "react";

export function usePortfolioAnimations() {
  const mousePos = useRef({ x: 0, y: 0 });

  useEffect(() => {
    // 1. Track cursor → expose as CSS custom properties
    const onMove = (e: MouseEvent) => {
      mousePos.current = { x: e.clientX, y: e.clientY };
      document.documentElement.style.setProperty(
        "--cursor-x",
        String((e.clientX / window.innerWidth - 0.5).toFixed(4)),
      );
      document.documentElement.style.setProperty(
        "--cursor-y",
        String((e.clientY / window.innerHeight - 0.5).toFixed(4)),
      );
    };

    // 2. Scroll progress for depth parallax layers
    const onScroll = () => {
      const total = document.body.scrollHeight - window.innerHeight;
      if (total > 0) {
        document.documentElement.style.setProperty(
          "--scroll-progress",
          (window.scrollY / total).toFixed(4),
        );
      }
    };

    // 3. Click → spawn burst particle DOM node (Law 3: clicks have mass)
    const onClick = (e: MouseEvent) => {
      const el = document.createElement("div");
      el.className = "click-burst";
      el.style.left = `${e.clientX}px`;
      el.style.top = `${e.clientY}px`;
      document.body.appendChild(el);
      // Clean up after animation finishes
      setTimeout(() => el.remove(), 640);
    };

    window.addEventListener("mousemove", onMove,  { passive: true });
    window.addEventListener("scroll",    onScroll, { passive: true });
    window.addEventListener("click",     onClick);

    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("scroll",    onScroll);
      window.removeEventListener("click",     onClick);
    };
  }, []);

  return mousePos;
}
