'use client';

import { cn } from '@/lib/utils';
import type { ReactNode } from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: 'primary' | 'ghost' | 'danger' | 'subtle';
}

export function Button({ children, variant = 'primary', className, ...props }: ButtonProps) {
  return (
    <button
      className={cn(
        // Base styles
        "px-4 py-2 rounded-lg text-base font-semibold transition-all disabled:opacity-35 disabled:cursor-not-allowed shadow-sm",
        "hover:shadow-md active:scale-[0.98]",
        // Variant styles
        {
          'bg-success text-white hover:bg-success-dark': variant === 'primary',
          'border border-border text-text-mid bg-transparent hover:bg-background': variant === 'ghost',
          'bg-danger-dim border border-danger-border text-danger hover:bg-danger hover:text-white': variant === 'danger',
          'bg-surface border border-border text-text-mid hover:bg-background': variant === 'subtle',
        },
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}
