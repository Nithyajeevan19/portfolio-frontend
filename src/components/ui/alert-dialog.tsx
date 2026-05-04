/**
 * AlertDialog — Antigravity Motion System
 * Cinematic modal: blur overlay · scale + Y reveal · rotated close · shockwave action button
 */
import * as React from "react";
import * as AlertDialogPrimitive from "@radix-ui/react-alert-dialog";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";

const AlertDialog = AlertDialogPrimitive.Root;
const AlertDialogTrigger = AlertDialogPrimitive.Trigger;
const AlertDialogPortal = AlertDialogPrimitive.Portal;

// ── Overlay — animates backdrop-blur from 0 → 12px ──────────────────────────
const AlertDialogOverlay = React.forwardRef<
  React.ElementRef<typeof AlertDialogPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Overlay>
>(({ className, ...props }, ref) => (
  <AlertDialogPrimitive.Overlay
    className={cn(
      "fixed inset-0 z-50 bg-black/75",
      // Opacity fade
      "data-[state=open]:animate-in  data-[state=closed]:animate-out",
      "data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
      // Backdrop blur animates via custom classes
      "data-[state=open]:backdrop-blur-[12px] data-[state=closed]:backdrop-blur-[0px]",
      "transition-[backdrop-filter] duration-[500ms] [transition-timing-function:var(--ease-antigravity)]",
      className,
    )}
    {...props}
    ref={ref}
  />
));
AlertDialogOverlay.displayName = AlertDialogPrimitive.Overlay.displayName;

// ── Content — cinematic scale + Y slide on open, rotate on close ─────────────
const AlertDialogContent = React.forwardRef<
  React.ElementRef<typeof AlertDialogPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Content>
>(({ className, ...props }, ref) => (
  <AlertDialogPortal>
    <AlertDialogOverlay />
    <AlertDialogPrimitive.Content
      ref={ref}
      className={cn(
        // Positioning (translate applied in keyframes, not here to avoid conflict)
        "fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg gap-4",
        "border border-[oklch(0.245_0.045_155_/_0.15)]",
        "bg-[oklch(0.97_0.012_85)] p-6 shadow-2xl sm:rounded-xl",
        // Cinematic rim glow on the modal edge
        "shadow-[0_24px_60px_rgba(0,0,0,0.35),0_0_0_1px_rgba(139,184,255,0.08)]",
        // Open: scale(0.88) + translateY(12px) → scale(1) + translateY(0)
        "data-[state=open]:[animation:dialogOpen_400ms_cubic-bezier(0.23,1,0.32,1)_both]",
        // Close: scale(1) → scale(0.94) + rotate(-1deg)
        "data-[state=closed]:[animation:dialogClose_220ms_cubic-bezier(0.4,0,0.6,1)_both]",
        // Performance
        "will-change-transform",
        className,
      )}
      {...props}
    />
  </AlertDialogPortal>
));
AlertDialogContent.displayName = AlertDialogPrimitive.Content.displayName;

// ── Header ───────────────────────────────────────────────────────────────────
const AlertDialogHeader = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      "flex flex-col space-y-2 text-center sm:text-left",
      // Staggered entry: header fades in slightly after the container
      "animate-[slideDown_360ms_cubic-bezier(0,0,0.2,1)_80ms_both]",
      className,
    )}
    {...props}
  />
);
AlertDialogHeader.displayName = "AlertDialogHeader";

// ── Footer ───────────────────────────────────────────────────────────────────
const AlertDialogFooter = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      "flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2",
      // Footer staggered entry after header
      "animate-[slideDown_360ms_cubic-bezier(0,0,0.2,1)_160ms_both]",
      className,
    )}
    {...props}
  />
);
AlertDialogFooter.displayName = "AlertDialogFooter";

// ── Title ─────────────────────────────────────────────────────────────────────
const AlertDialogTitle = React.forwardRef<
  React.ElementRef<typeof AlertDialogPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Title>
>(({ className, ...props }, ref) => (
  <AlertDialogPrimitive.Title
    ref={ref}
    className={cn("text-lg font-semibold", className)}
    {...props}
  />
));
AlertDialogTitle.displayName = AlertDialogPrimitive.Title.displayName;

// ── Description ───────────────────────────────────────────────────────────────
const AlertDialogDescription = React.forwardRef<
  React.ElementRef<typeof AlertDialogPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Description>
>(({ className, ...props }, ref) => (
  <AlertDialogPrimitive.Description
    ref={ref}
    className={cn("text-sm text-muted-foreground", className)}
    {...props}
  />
));
AlertDialogDescription.displayName = AlertDialogPrimitive.Description.displayName;

// ── Action button — shockwave ripple on click (Law 3) ────────────────────────
const AlertDialogAction = React.forwardRef<
  React.ElementRef<typeof AlertDialogPrimitive.Action>,
  React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Action>
>(({ className, ...props }, ref) => (
  <AlertDialogPrimitive.Action
    ref={ref}
    className={cn(
      buttonVariants(),
      // Law 3: click shockwave
      "interactive",
      // Magnetic hover
      "transition-transform duration-[320ms] [transition-timing-function:var(--ease-antigravity)]",
      "hover:scale-[1.02] hover:translate-y-[-1px]",
      "active:scale-[0.97]",
      className,
    )}
    {...props}
  />
));
AlertDialogAction.displayName = AlertDialogPrimitive.Action.displayName;

// ── Cancel button — opacity lift + y translate on hover ───────────────────────
const AlertDialogCancel = React.forwardRef<
  React.ElementRef<typeof AlertDialogPrimitive.Cancel>,
  React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Cancel>
>(({ className, ...props }, ref) => (
  <AlertDialogPrimitive.Cancel
    ref={ref}
    className={cn(
      buttonVariants({ variant: "outline" }),
      "mt-2 sm:mt-0",
      // Law 5: organic decay — opacity lifts slowly
      "opacity-70 hover:opacity-100",
      "transition-[opacity,transform] duration-[320ms] [transition-timing-function:var(--ease-antigravity)]",
      "hover:translate-y-[-1px]",
      className,
    )}
    {...props}
  />
));
AlertDialogCancel.displayName = AlertDialogPrimitive.Cancel.displayName;

export {
  AlertDialog,
  AlertDialogPortal,
  AlertDialogOverlay,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogAction,
  AlertDialogCancel,
};
