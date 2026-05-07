import { Variants } from "framer-motion";

export const luxuryEase = [0.16, 1, 0.3, 1] as const;

export const transition = {
  duration: 0.8,
  ease: luxuryEase,
};

export const fadeIn: Variants = {
  initial: { opacity: 0 },
  animate: { 
    opacity: 1, 
    transition 
  },
};

export const fadeUp: Variants = {
  initial: { opacity: 0, y: 20 },
  animate: { 
    opacity: 1, 
    y: 0, 
    transition 
  },
};

export const staggerContainer: Variants = {
  initial: {},
  animate: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
};

export const revealTransition = {
  duration: 0.8,
  ease: luxuryEase,
};

export const revealVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: revealTransition 
  },
};

export const viewportConfig = {
  once: true,
  amount: 0.2,
};


