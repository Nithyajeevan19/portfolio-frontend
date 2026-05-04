/**
 * Alert — Antigravity Motion System
 * Particle entry from left · Orbital rim light · Destructive shockwave flash
 */
import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const alertVariants = cva(
  [
    // Base layout
    "relative w-full rounded-lg border px-4 py-3 text-sm",
    "[&>svg+div]:translate-y-[-3px] [&>svg]:absolute [&>svg]:left-4 [&>svg]:top-4",
    "[&>svg]:text-foreground [&>svg~*]:pl-7",
    // Law 1: breathe on mount
    "animate-particle-entry",
    // Law 2: magnetic hover lift
    "transition-[transform,box-shadow] duration-[320ms] [transition-timing-function:var(--ease-antigravity)]",
    "hover:scale-[1.005] hover:translate-y-[-1px]",
    // Law 3: click shockwave
    "interactive",
    // SVG icon: slow orbital rotation (matches moon orbiters)
    "[&>svg]:transition-transform [&>svg]:duration-[900ms]",
    "[&>svg]:[animation:orbit_10s_linear_infinite]",
    // Performance
    "will-change-transform",
  ].join(" "),
  {
    variants: {
      variant: {
        // Default: warm ambient glow (matches --color-energy)
        default: cn(
          "bg-background text-foreground border-[oklch(0.245_0.045_155_/_0.12)]",
          "hover:shadow-[0_4px_24px_rgba(255,248,238,0.25),0_0_1px_rgba(255,248,238,0.4)]",
          "hover:border-[oklch(0.245_0.045_155_/_0.22)]",
        ),

        // Destructive: shockwave border flash + shock glow
        destructive: cn(
          "border-destructive/50 text-destructive dark:border-destructive [&>svg]:text-destructive",
          "hover:shadow-[0_0_24px_rgba(255,246,224,0.2)] hover:border-destructive",
          "[animation:rimFlash_1.2s_var(--ease-shock)_infinite_alternate]",
        ),

        // [NEW] Orbital: cool blue rim light — matches SaturnOrb's rim
        orbital: cn(
          "border-[var(--color-rim)] bg-gradient-to-r from-[rgba(13,17,23,0.95)] to-transparent",
          "text-[var(--color-moon-0)]",
          "shadow-[0_0_24px_rgba(139,184,255,0.12),inset_0_0_20px_rgba(139,184,255,0.04)]",
          "hover:shadow-[0_0_40px_rgba(139,184,255,0.25),inset_0_0_30px_rgba(139,184,255,0.08)]",
          "[&>svg]:text-[var(--color-rim)]",
          "[animation:glowPulse_3s_var(--ease-antigravity)_infinite]",
        ),
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

const Alert = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & VariantProps<typeof alertVariants>
>(({ className, variant, ...props }, ref) => (
  <div
    ref={ref}
    role="alert"
    className={cn(alertVariants({ variant }), className)}
    {...props}
  />
));
Alert.displayName = "Alert";

const AlertTitle = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLHeadingElement>>(
  ({ className, ...props }, ref) => (
    <h5
      ref={ref}
      className={cn(
        "mb-1 font-medium leading-none tracking-tight",
        // Slight delay so title fades in after container
        "transition-opacity duration-[400ms] delay-[80ms]",
        className,
      )}
      {...props}
    />
  ),
);
AlertTitle.displayName = "AlertTitle";

const AlertDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "text-sm [&_p]:leading-relaxed",
      // Description appears after title (staggered entry)
      "transition-opacity duration-[500ms] delay-[120ms]",
      className,
    )}
    {...props}
  />
));
AlertDescription.displayName = "AlertDescription";

export { Alert, AlertTitle, AlertDescription };
