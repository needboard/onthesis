'use client';

import * as React from 'react';
import { motion, HTMLMotionProps } from 'motion/react';

interface TextEffectProps extends Omit<HTMLMotionProps<'p'>, 'children'> {
  children: string;
  per?: 'word' | 'char' | 'line';
  preset?: 'blur-sm' | 'fade-in-blur' | 'scale' | 'fade' | 'slide';
  delay?: number;
  trigger?: boolean;
  as?: React.ElementType;
  className?: string;
  style?: React.CSSProperties & { '--motion-delay'?: string };
  motionDelay?: string;
}

const presets = {
  'blur-sm': {
    container: { opacity: 1 },
    item: { opacity: [0, 1], filter: ['blur(8px)', 'blur(0px)'] },
  },
  'fade-in-blur': {
    container: { opacity: 1 },
    item: { opacity: [0, 1], filter: ['blur(4px)', 'blur(0px)'] },
  },
  scale: {
    container: { opacity: 1 },
    item: { opacity: [0, 1], scale: [0.9, 1] },
  },
  fade: {
    container: { opacity: 1 },
    item: { opacity: [0, 1] },
  },
  slide: {
    container: { opacity: 1 },
    item: { opacity: [0, 1], y: [20, 0] },
  },
};

export function TextEffect({
  children,
  per = 'word',
  preset = 'fade',
  delay = 0,
  trigger = true,
  as: Component = 'p',
  className = '',
  style,
  motionDelay,
  ...props
}: TextEffectProps) {
  const segments = per === 'line'
    ? children.split('\n').filter(Boolean)
    : per === 'word'
    ? children.split(' ').filter(Boolean)
    : children.split('').filter(Boolean);

  const { container, item } = presets[preset] || presets.fade;

  if (!trigger) {
    return <Component className={className} style={style} {...props}>{children}</Component>;
  }

  return (
    <motion.div
      className={className}
      style={style}
      initial={false}
      animate={container}
      {...props}
    >
      {segments.map((segment, index) => (
        <motion.span
          key={index}
          style={{
            display: per === 'line' ? 'block' : per === 'word' ? 'inline-block' : 'inline-block',
            whiteSpace: per === 'word' ? 'pre' : 'normal',
            '--motion-delay': motionDelay || '0ms',
          } as React.CSSProperties}
          initial={item}
          animate={item}
          transition={{
            duration: 0.8,
            delay: delay / 1000 + index * 0.12,
            ease: [0.16, 1, 0.3, 1],
          }}
        >
          {segment}{per === 'word' ? ' ' : per === 'char' ? '' : ''}
        </motion.span>
      ))}
    </motion.div>
  );
}