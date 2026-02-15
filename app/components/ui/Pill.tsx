'use client';

import { cn } from '@/lib/utils';
import type { ReactNode } from 'react';

interface PillProps {
  children: ReactNode;
  active?: boolean;
  color: 'success' | 'info' | 'warning' | 'accent';
  onClick?: () => void;
}

export function Pill({ children, active, color, onClick }: PillProps) {
  const colorClasses = {
    success: active
      ? 'bg-success-dim border-success-border text-success'
      : 'border-border text-text-dim',
    info: active
      ? 'bg-info-dim border-info-border text-info'
      : 'border-border text-text-dim',
    warning: active
      ? 'bg-warning-dim border-warning-border text-warning'
      : 'border-border text-text-dim',
    accent: active
      ? 'bg-accent-dim border-accent-border text-accent'
      : 'border-border text-text-dim',
  }

  return (
    <button
      onClick={onClick}
      className={cn(
        "px-2.5 py-1 border rounded text-xs font-mono font-semibold tracking-tight transition-all cursor-pointer",
        active ? colorClasses[color] : 'bg-transparent border-border text-text-dim'
      )}
    >
      {children}
    </button>
  );
}
