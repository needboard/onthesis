'use client';

import * as React from 'react';
import { motion } from 'motion/react';

interface TextEffectProps {
  children: string;
  per?: 'word' | 'char' | 'line';
  preset?: 'blur-sm' | 'fade-in-blur' | 'scale' | 'fade' | 'slide';
  delay?: number;
  trigger?: boolean;
  as?: React.ElementType;
  className?: string;
  style?: React.CSSProperties;
  motionDelay?: string;
}

const presets = {
  'blur-sm': {
    initial: { opacity: 0, filter: 'blur(8px)' },
    animate: { opacity: 1, filter: 'blur(0px)' },
  },
  'fade-in-blur': {
    initial: { opacity: 0, filter: 'blur(4px)' },
    animate: { opacity: 1, filter: 'blur(0px)' },
  },
  scale: {
    initial: { opacity: 0, scale: 0.9 },
    animate: { opacity: 1, scale: 1 },
  },
  fade: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
  },
  slide: {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
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

  const { initial, animate } = presets[preset] || presets.fade;

  if (!trigger) {
    return <Component className={className} style={style} {...props}>{children}</Component>;
  }

  return (
    <Component className={className} style={style} {...props}>
      {segments.map((segment, index) => (
        <motion.span
          key={index}
          style={{
            display: per === 'line' ? 'block' : 'inline-block',
            whiteSpace: per === 'word' ? 'pre' : 'normal',
          } as React.CSSProperties}
          initial={false}
          animate={animate}
          transition={{
            duration: 0.8,
            delay: delay / 1000 + index * 0.12,
            ease: [0.16, 1, 0.3, 1],
          }}
        >
          {segment}{per === 'word' ? ' ' : per === 'char' ? '' : ''}
        </motion.span>
      ))}
    </Component>
  );
}