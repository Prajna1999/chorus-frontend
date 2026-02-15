'use client';

import { cn } from '@/lib/utils';
import type { ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
}

export function Card({ children, className, hover = false }: CardProps) {
  return (
    <div
      className={cn(
        "bg-surface border border-border rounded-xl p-5 animate-fade-in shadow-card",
        hover && "hover-lift cursor-pointer",
        className
      )}
    >
      {children}
    </div>
  );
}
