/**
 * Accordion — Antigravity Motion System
 * Law 1: breathes · Law 2: magnetic spring · Law 3: click mass · Law 5: organic decay
 */
import * as React from "react";
import * as AccordionPrimitive from "@radix-ui/react-accordion";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

const Accordion = AccordionPrimitive.Root;

const AccordionItem = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Item>
>(({ className, ...props }, ref) => (
  <AccordionPrimitive.Item
    ref={ref}
    className={cn(
      // Base border
      "border-b border-[oklch(0.245_0.045_155_/_0.12)]",
      // Warm background shift when open (matches --color-energy)
      "data-[state=open]:bg-[oklch(0.975_0.012_85_/_0.6)]",
      // Smooth transition on bg
      "transition-colors duration-[320ms] [transition-timing-function:var(--ease-antigravity)]",
      className,
    )}
    {...props}
  />
));
AccordionItem.displayName = "AccordionItem";

const AccordionTrigger = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Trigger>
>(({ className, children, ...props }, ref) => (
  <AccordionPrimitive.Header className="flex">
    <AccordionPrimitive.Trigger
      ref={ref}
      className={cn(
        // Base layout
        "flex flex-1 items-center justify-between py-4 text-sm font-medium text-left",
        // Antigravity transition — all transforms lerp smoothly
        "transition-all duration-[320ms] [transition-timing-function:var(--ease-antigravity)]",
        // Law 2: magnetic scale on hover (spring overshoot feel)
        "hover:scale-[1.005] hover:pl-0.5",
        // Law 3: active press feedback
        "active:scale-[0.997]",
        // Energy color shift on open
        "[&[data-state=open]]:text-[oklch(0.245_0.045_155)]",
        // Shockwave ripple via interactive class
        "interactive",
        className,
      )}
      {...props}
    >
      {children}
      {/* ChevronDown — spring-overshot rotation on open */}
      <ChevronDown
        className={cn(
          "h-4 w-4 shrink-0 text-muted-foreground",
          // Spring easing — overshoot matching --ease-magnetic
          "transition-transform duration-[550ms] [transition-timing-function:cubic-bezier(0.34,1.56,0.64,1)]",
          "[&[data-state=open]]:rotate-180",
          // Glow on open state (via parent data attribute)
          "[[data-state=open]_&]:text-[oklch(0.245_0.045_155_/_0.9)]",
        )}
      />
    </AccordionPrimitive.Trigger>
  </AccordionPrimitive.Header>
));
AccordionTrigger.displayName = AccordionPrimitive.Trigger.displayName;

const AccordionContent = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Content>
>(({ className, children, ...props }, ref) => (
  <AccordionPrimitive.Content
    ref={ref}
    className={cn(
      "overflow-hidden text-sm",
      // Radix height animation (accordion-down/up)
      "data-[state=closed]:animate-accordion-up",
      "data-[state=open]:animate-accordion-down",
      // Law 1: content slides in from slightly above (depth feel)
      "data-[state=open]:motion-safe:animate-[slideDown_320ms_cubic-bezier(0,0,0.2,1)_both]",
      // Law 5: close collapses with ease-collapse (no snap)
      "data-[state=closed]:motion-safe:animate-[slideUp_200ms_cubic-bezier(0.4,0,0.6,1)_both]",
    )}
    {...props}
  >
    <div className={cn("pb-4 pt-0 pl-0.5", className)}>{children}</div>
  </AccordionPrimitive.Content>
));
AccordionContent.displayName = AccordionPrimitive.Content.displayName;

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent };
