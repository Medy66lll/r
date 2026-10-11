import { Variants } from 'framer-motion';

export const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
  },
};

export const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.05,
    },
  },
};

export const swingVariant: Variants = {
  rest: { rotate: 0 },
  hover: {
    rotate: [0, 4, -4, 2, -1, 0],
    transition: { duration: 2.2, ease: 'easeInOut' },
  },
};

export const scaleOnTap = {
  tap: { scale: 0.98 },
  hover: { y: -2 },
};
