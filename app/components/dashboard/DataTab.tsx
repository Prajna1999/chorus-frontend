'use client';

import { useState } from 'react';
import { Pill } from '@/app/components/ui/Pill';
import { DATA_TYPES } from '@/constants/dataTypes';
import { CheckIcon, XMarkIcon } from '@heroicons/react/24/outline';
import type { Contribution } from '@/types';

interface DataTabProps {
  contribs: Contribution[];
}

export function DataTab({ contribs }: DataTabProps) {
  const [filter, setFilter] = useState('all');

  const colorMap: Record<string, 'success' | 'info' | 'warning' | 'accent'> = {
    voice: 'success',
    text: 'info',
    documents: 'warning',
    sensor: 'accent'
  };

  const filtered = filter === 'all' ? contribs : contribs.filter((c) => c.type === filter);

  return (
    <div>
      <div className="flex gap-1.5 mb-3 flex-wrap">
        <Pill active={filter === 'all'} onClick={() => setFilter('all')} color="success">
          All
        </Pill>
        {DATA_TYPES.map((dt) => {
          const Icon = dt.icon;
          return (
            <Pill key={dt.id} active={filter === dt.id} onClick={() => setFilter(dt.id)} color={colorMap[dt.id] || 'success'}>
              <Icon className="w-4 h-4" /> {dt.label}
            </Pill>
          );
        })}
      </div>
      {!filtered.length && (
        <div className="text-center py-11 text-text-dim text-sm">
          No contributions yet
        </div>
      )}
      <div className="flex flex-col gap-1.5">
        {filtered.map((c) => {
          const Icon = DATA_TYPES.find((d) => d.id === c.type)?.icon;
          const statusColors = {
            approved: { bg: 'bg-success-dim', border: 'border-success-border', text: 'text-success' },
            pending: { bg: 'bg-warning-dim', border: 'border-warning-border', text: 'text-warning' },
            rejected: { bg: 'bg-danger-dim', border: 'border-danger-border', text: 'text-danger' }
          };
          const sc = statusColors[c.status];

          return (
            <div
              key={c.id}
              className="bg-card border border-border rounded-lg px-3 py-2 flex items-center gap-2 animate-fade-in"
            >
              {Icon && <Icon className="w-5 h-5 text-text-mid" />}
              <div className={`w-5 h-5 rounded-full ${sc.bg} border ${sc.border} ${sc.text} flex items-center justify-center text-[9px] flex-shrink-0`}>
                {c.status === 'approved' && <CheckIcon className="w-4 h-4" />}
                {c.status === 'pending' && '…'}
                {c.status === 'rejected' && <XMarkIcon className="w-4 h-4" />}
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-xs text-text overflow-hidden text-ellipsis whitespace-nowrap">
                  {c.title}
                </div>
                <div className="text-sm text-text-dim mt-0.5 font-mono">
                  {c.size} · {c.date}
                  {c.lang && c.lang !== '–' ? ` · ${c.lang}` : ''}
                  {c.reason && <span className="text-danger"> · {c.reason}</span>}
                </div>
              </div>
              {c.earnings > 0 && (
                <span className="text-sm font-bold text-success font-mono">
                  ₹{c.earnings}
                </span>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
