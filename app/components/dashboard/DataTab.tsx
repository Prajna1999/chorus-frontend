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
        <div style={{
          textAlign: 'center',
          padding: '80px 32px',
          background: '#f9fafb',
          border: `1px dashed #e5e7eb`,
          borderRadius: 12,
        }}>
          <div style={{
            width: 80,
            height: 80,
            margin: '0 auto 24px',
            borderRadius: '50%',
            background: '#f0fdf4',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="2">
              <path d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <div style={{ fontSize: 18, fontWeight: 600, color: '#18181b', marginBottom: 8 }}>
            {filter === 'all' ? 'No contributions yet' : `No ${filter} contributions`}
          </div>
          <div style={{ fontSize: 14, color: '#71717a' }}>
            {filter === 'all'
              ? 'Start contributing to see your submissions here'
              : `Switch to the Contribute tab to add ${filter} data`}
          </div>
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
