'use client';

import { cn } from '@/lib/utils';
import type { ReactNode } from 'react';

interface BadgeProps {
  children: ReactNode;
  color: 'success' | 'warning' | 'danger' | 'info' | 'accent';
  className?: string;
}

export function Badge({ children, color, className }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 px-2 py-1 rounded text-xs font-bold font-mono tracking-wide uppercase",
        {
          'bg-success-dim border border-success-border text-success': color === 'success',
          'bg-warning-dim border border-warning-border text-warning': color === 'warning',
          'bg-danger-dim border border-danger-border text-danger': color === 'danger',
          'bg-info-dim border border-info-border text-info': color === 'info',
          'bg-accent-dim border border-accent-border text-accent': color === 'accent',
        },
        className
      )}
    >
      {children}
    </span>
  );
}
