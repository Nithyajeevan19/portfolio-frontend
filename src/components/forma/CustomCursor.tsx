import { useEffect, useRef, useState } from "react";

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [isHovering, setIsHovering] = useState(false);
  const [cursorText, setCursorText] = useState("");
  const pos = useRef({ x: -200, y: -200 });
  const ring = useRef({ x: -200, y: -200 });
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      pos.current = { x: e.clientX, y: e.clientY };
    };
    const animate = () => {
      ring.current.x += (pos.current.x - ring.current.x) * 0.1;
      ring.current.y += (pos.current.y - ring.current.y) * 0.1;
      if (dotRef.current)
        dotRef.current.style.transform = `translate(${pos.current.x - 3}px, ${pos.current.y - 3}px)`;
      if (ringRef.current) {
        const size = isHovering ? (cursorText ? 76 : 42) : 34;
        ringRef.current.style.transform = `translate(${ring.current.x - size / 2}px, ${ring.current.y - size / 2}px)`;
      }
      rafRef.current = requestAnimationFrame(animate);
    };
    const onOver = (e: MouseEvent) => {
      const t = (e.target as HTMLElement).closest("[data-cursor]");
      if (t) {
        setIsHovering(true);
        setCursorText((t as HTMLElement).dataset.cursor || "");
      }
    };
    const onOut = (e: MouseEvent) => {
      const t = (e.target as HTMLElement).closest("[data-cursor]");
      if (t) {
        setIsHovering(false);
        setCursorText("");
      }
    };
    document.addEventListener("mousemove", onMove, { passive: true });
    document.addEventListener("mouseover", onOver);
    document.addEventListener("mouseout", onOut);
    rafRef.current = requestAnimationFrame(animate);
    return () => {
      document.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseover", onOver);
      document.removeEventListener("mouseout", onOut);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [isHovering, cursorText]);

  const size = isHovering ? (cursorText ? 76 : 42) : 34;
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
          width: `${size}px`,
          height: `${size}px`,
          borderRadius: "50%",
          border: isHovering ? "none" : "1px solid rgba(4,50,34,0.22)",
          backgroundColor: isHovering
            ? cursorText
              ? "rgba(4,50,34,0.88)"
              : "rgba(4,50,34,0.06)"
            : "transparent",
          willChange: "transform",
          transition:
            "width 0.3s ease, height 0.3s ease, background-color 0.25s ease, border 0.25s ease",
        }}
      >
        {cursorText && isHovering && (
          <span
            style={{
              color: "#FFF8EE",
              fontSize: "0.5rem",
              fontWeight: "700",
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              textAlign: "center",
              fontFamily: "Inter,sans-serif",
            }}
          >
            {cursorText}
          </span>
        )}
      </div>
    </>
  );
}
