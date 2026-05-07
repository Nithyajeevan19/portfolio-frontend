import { useEffect, useRef, useState } from "react";

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLSpanElement>(null);
  
  const pos = useRef({ x: -200, y: -200 });
  const ring = useRef({ x: -200, y: -200 });
  const rafRef = useRef<number | null>(null);
  const stateRef = useRef({ 
    isHovering: false, 
    cursorText: "", 
    currentSize: 34, 
    targetSize: 34,
    lastUpdate: 0 
  });

  useEffect(() => {
    const dot = dotRef.current;
    const ringEl = ringRef.current;
    const textEl = textRef.current;
    if (!dot || !ringEl || !textEl) return;

    const onMove = (e: MouseEvent) => {
      pos.current.x = e.clientX;
      pos.current.y = e.clientY;
    };

    const animate = (time: number) => {
      // Smoothly interpolate ring position
      ring.current.x += (pos.current.x - ring.current.x) * 0.15;
      ring.current.y += (pos.current.y - ring.current.y) * 0.15;

      const state = stateRef.current;
      const targetSize = state.isHovering ? (state.cursorText ? 76 : 42) : 34;
      
      // Smoothly interpolate size
      state.currentSize += (targetSize - state.currentSize) * 0.15;

      // Update positions using translate3d for GPU acceleration
      dot.style.transform = `translate3d(${pos.current.x - 3}px, ${pos.current.y - 3}px, 0)`;
      
      const ringScale = state.currentSize / 34;
      ringEl.style.transform = `translate3d(${ring.current.x - 17}px, ${ring.current.y - 17}px, 0) scale(${ringScale})`;

      // Update aesthetic properties only when they change significantly or on hover state change
      if (Math.abs(state.currentSize - targetSize) > 0.1 || time - state.lastUpdate > 100) {
        if (state.isHovering) {
          ringEl.style.backgroundColor = state.cursorText ? "rgba(4,50,34,0.88)" : "rgba(4,50,34,0.06)";
          ringEl.style.border = "none";
          textEl.style.opacity = state.cursorText ? "1" : "0";
          if (state.cursorText && textEl.textContent !== state.cursorText) {
            textEl.textContent = state.cursorText;
          }
        } else {
          ringEl.style.backgroundColor = "transparent";
          ringEl.style.border = "1px solid rgba(4,50,34,0.22)";
          textEl.style.opacity = "0";
        }
        state.lastUpdate = time;
      }

      rafRef.current = requestAnimationFrame(animate);
    };

    const onOver = (e: MouseEvent) => {
      const t = (e.target as HTMLElement).closest("[data-cursor]");
      if (t) {
        const text = (t as HTMLElement).dataset.cursor || "";
        stateRef.current.isHovering = true;
        stateRef.current.cursorText = text;
      }
    };

    const onOut = (e: MouseEvent) => {
      const t = (e.target as HTMLElement).closest("[data-cursor]");
      if (t) {
        stateRef.current.isHovering = false;
        stateRef.current.cursorText = "";
      }
    };

    document.addEventListener("mousemove", onMove, { passive: true });
    document.addEventListener("mouseover", onOver, { passive: true });
    document.addEventListener("mouseout", onOut, { passive: true });
    rafRef.current = requestAnimationFrame(animate);

    return () => {
      document.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseover", onOver);
      document.removeEventListener("mouseout", onOut);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <>
      <div
        ref={dotRef}
        className="fixed top-0 left-0 pointer-events-none z-[99999]"
        style={{
          width: "6px",
          height: "6px",
          borderRadius: "50%",
          backgroundColor: "#043222",
          willChange: "transform",
        }}
      />
      <div
        ref={ringRef}
        className="fixed top-0 left-0 pointer-events-none z-[99998] flex items-center justify-center"
        style={{
          width: "34px",
          height: "34px",
          borderRadius: "50%",
          willChange: "transform",
          backgroundColor: "transparent",
          border: "1px solid rgba(4,50,34,0.22)",
        }}
      >
        <span
          ref={textRef}
          style={{
            color: "#FFF8EE",
            fontSize: "0.5rem",
            fontWeight: "700",
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            textAlign: "center",
            fontFamily: "Inter,sans-serif",
            opacity: 0,
            transition: "opacity 0.2s ease",
            pointerEvents: "none",
          }}
        />
      </div>
    </>
  );
}
