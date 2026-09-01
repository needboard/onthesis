'use client';

import { motion, useTransform } from 'motion/react';
import { useStack } from './StackContext';

export function ScrollProgress() {
  const { scrollY, totalSections, sectionHeight } = useStack();
  const totalHeight = totalSections * sectionHeight;

  const progress = useTransform(scrollY, [0, totalHeight], [0, 1]);
  const fillHeight = useTransform(progress, [0, 1], ['0%', '100%']);
  const opacity = useTransform(progress, [0.95, 1], [1, 0]);

  return (
    <motion.div
      style={{ opacity }}
      className="fixed bottom-6 left-6 w-[40px] h-[200px] bg-muted/20 rounded z-[9999] flex items-center justify-center p-[10px]"
    >
      {/* Inner container - the "glass" */}
      <div className="relative w-full h-full bg-muted/10 rounded-sm overflow-hidden border border-muted/30">
        {/* Water fill - animated height from bottom */}
        <motion.div
          style={{
            height: fillHeight,
          }}
          className="absolute bottom-0 left-0 w-full bg-accent/70"
        >
          {/* Animated wave on top of water */}
          <svg
            className="absolute -top-[6px] left-0 w-full h-[8px]"
            viewBox="0 0 80 8"
            preserveAspectRatio="none"
          >
            <motion.path
              d="M0,4 Q20,0 40,4 T80,4 V8 H0 Z"
              fill="currentColor"
              className="text-accent/70"
              animate={{
                d: [
                  "M0,4 Q20,0 40,4 T80,4 V8 H0 Z",
                  "M0,4 Q20,8 40,4 T80,4 V8 H0 Z",
                  "M0,4 Q20,0 40,4 T80,4 V8 H0 Z",
                ],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          </svg>
        </motion.div>
      </div>
    </motion.div>
  );
}