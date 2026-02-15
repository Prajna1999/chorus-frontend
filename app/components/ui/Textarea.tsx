'use client';

import { cn } from '@/lib/utils';

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

export function Textarea({ className, rows = 4, ...props }: TextareaProps) {
  return (
    <textarea
      className={cn(
        "w-full px-3 py-2 bg-surface border border-border rounded-lg text-sm text-text resize-y font-semibold",
        "focus:outline-none focus:border-info transition-colors",
        "placeholder:text-text-dim leading-relaxed",
        className
      )}
      rows={rows}
      {...props}
    />
  );
}
