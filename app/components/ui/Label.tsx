'use client';

import { cn } from '@/lib/utils';
import type { ReactNode } from 'react';

interface LabelProps {
  children: ReactNode;
  className?: string;
}

export function Label({ children, className }: LabelProps) {
  return (
    <label
      className={cn(
        "block text-xs font-mono tracking-wider uppercase text-text-dim mb-1.5 font-semibold",
        className
      )}
    >
      {children}
    </label>
  );
}
