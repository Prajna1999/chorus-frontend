'use client';

import { cn } from '@/lib/utils';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

export function Input({ className, ...props }: InputProps) {
  return (
    <input
      className={cn(
        "w-full px-3 py-2 bg-surface border border-border rounded-lg text-sm text-text font-semibold",
        "focus:outline-none focus:border-success transition-colors",
        "placeholder:text-text-dim",
        className
      )}
      {...props}
    />
  );
}
