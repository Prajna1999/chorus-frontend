'use client';

import { Card } from '@/app/components/ui/Card';
import { Button } from '@/app/components/ui/Button';
import { DATA_TYPES } from '@/constants/dataTypes';
import { CheckIcon, XMarkIcon, PlayIcon } from '@heroicons/react/24/outline';
import type { Contribution } from '@/types';

interface ReviewTabProps {
  contribs: Contribution[];
}

export function ReviewTab({ contribs }: ReviewTabProps) {
  const pending = contribs.filter((c) => c.status === 'pending');

  return (
    <div>
      <div className="text-[9px] font-mono text-text-dim tracking-wide mb-3">
        {pending.length} PENDING
      </div>
      {!pending.length && (
        <div className="text-center py-11 text-text-dim text-sm flex items-center justify-center gap-1">
          <CheckIcon className="w-5 h-5" /> All clear
        </div>
      )}
      {pending.map((c) => {
        const Icon = DATA_TYPES.find((d) => d.id === c.type)?.icon;
        return (
          <Card key={c.id} className="mb-2 p-3">
            <div className="flex items-start gap-2">
              {Icon && <Icon className="w-5 h-5 text-text-mid mt-0.5" />}
              <div className="flex-1">
                <div className="text-sm text-text">{c.title}</div>
                <div className="text-sm text-text-dim mt-1 font-mono">
                  {c.type} · {c.size} · {c.date}
                </div>
              </div>
            </div>
            <div className="flex gap-2 mt-3">
              <Button className="px-3 py-1 text-xs">
                <CheckIcon className="w-4 h-4 inline mr-1" /> Approve
              </Button>
              <Button variant="danger" className="px-3 py-1 text-xs">
                <XMarkIcon className="w-4 h-4 inline mr-1" /> Reject
              </Button>
              {c.type === 'voice' && (
                <Button variant="ghost" className="px-3 py-1 text-xs">
                  <PlayIcon className="w-4 h-4 inline mr-1" /> Play
                </Button>
              )}
            </div>
          </Card>
        );
      })}
    </div>
  );
}
