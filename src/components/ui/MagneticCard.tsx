/**
 * MagneticCard — Awwwards-level 3D tilt card with radial glow.
 * Matches SaturnOrb's cursor-gravity + depth-parallax feel.
 * Uses refs only — zero state, zero re-renders.
 */
import { useRef } from "react";
import type { MouseEvent, ReactNode } from "react";
import { cn } from "@/lib/utils";

interface MagneticCardProps {
  children: ReactNode;
  className?: string;
  tiltStrength?: number;   // default 12
  glowColor?: string;      // default rgba(139,184,255,0.12) — rim light tone
  scaleOnHover?: number;   // default 1.03
}

export function MagneticCard({
  children,
  className,
  tiltStrength = 12,
  glowColor = "rgba(139,184,255,0.12)",
  scaleOnHover = 1.03,
}: MagneticCardProps) {
  const cardRef   = useRef<HTMLDivElement>(null);
  const frameRef  = useRef(0);
  const stateRef  = useRef({ rx: 0, ry: 0, gx: 50, gy: 50, hovering: false });

  // Smooth lerp for tilt return
  const lerpRef = useRef({ rx: 0, ry: 0 });
  const rafReturn = useRef(0);

  const animateReturn = () => {
    const s = lerpRef.current;
    s.rx += (0 - s.rx) * 0.08;
    s.ry += (0 - s.ry) * 0.08;

    if (cardRef.current) {
      cardRef.current.style.transform =
        `perspective(900px) rotateX(${s.rx}deg) rotateY(${s.ry}deg) scale(1)`;
    }

    if (Math.abs(s.rx) > 0.01 || Math.abs(s.ry) > 0.01) {
      rafReturn.current = requestAnimationFrame(animateReturn);
    }
  };

  const onMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const cx = (e.clientX - rect.left) / rect.width  - 0.5;
    const cy = (e.clientY - rect.top)  / rect.height - 0.5;

    cancelAnimationFrame(frameRef.current);
    frameRef.current = requestAnimationFrame(() => {
      const rx = cy * -tiltStrength;
      const ry = cx *  tiltStrength;
      lerpRef.current = { rx, ry };

      const gx = (cx + 0.5) * 100;
      const gy = (cy + 0.5) * 100;

      if (!cardRef.current) return;
      cardRef.current.style.transform =
        `perspective(900px) rotateX(${rx}deg) rotateY(${ry}deg) scale(${scaleOnHover})`;
      cardRef.current.style.setProperty("--gx", `${gx}%`);
      cardRef.current.style.setProperty("--gy", `${gy}%`);
    });
  };

  const onEnter = () => {
    cancelAnimationFrame(rafReturn.current);
    stateRef.current.hovering = true;
  };

  const onLeave = () => {
    stateRef.current.hovering = false;
    cancelAnimationFrame(frameRef.current);
    // Animate back to neutral with lerp
    animateReturn();
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={onMove}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      className={cn(
        // Base card — dark glass style to match SaturnOrb's dark palette
        "relative rounded-2xl border border-white/10 bg-black/30 backdrop-blur-md",
        // Transition for entry/exit (lerp handles the hover itself)
        "transition-[box-shadow] duration-[550ms] [transition-timing-function:var(--ease-antigravity)]",
        // Glow on hover via box-shadow
        "hover:shadow-[0_0_40px_rgba(139,184,255,0.15),0_0_1px_rgba(139,184,255,0.3)]",
        "will-change-transform",
        // Pseudo radial glow follows cursor via CSS vars
        "before:absolute before:inset-0 before:rounded-2xl before:pointer-events-none",
        "before:transition-opacity before:duration-300",
        "before:opacity-0 hover:before:opacity-100",
        className,
      )}
      style={{
        // @ts-ignore — custom CSS properties
        "--gx": "50%",
        "--gy": "50%",
        transition: "box-shadow 550ms var(--ease-antigravity)",
      }}
    >
      {/* Radial glow overlay — follows cursor position via CSS vars */}
      <div
        className="pointer-events-none absolute inset-0 rounded-2xl"
        style={{
          background: `radial-gradient(circle at var(--gx, 50%) var(--gy, 50%), ${glowColor}, transparent 60%)`,
        }}
      />
      {children}
    </div>
  );
}
