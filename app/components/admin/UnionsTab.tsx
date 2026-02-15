'use client';

import { Card } from '@/app/components/ui/Card';
import { UserGroupIcon, BoltIcon } from '@heroicons/react/24/outline';

export function UnionsTab() {
  const unions = [
    { n: 'Odia Speakers Union', m: 312, ind: 24, d: 1, active: true },
    { n: 'Hindi Speakers Union', m: 890, ind: 71, d: 1, active: true },
    { n: 'Assamese Speakers Union', m: 67, ind: 8, d: 1, active: false }
  ];

  return (
    <div className="flex flex-col gap-2">
      {unions.map((u, i) => (
        <Card key={i} className="p-3">
          <div className="text-sm font-bold text-text">{u.n}</div>
          <div className="text-sm text-text-dim mt-1 font-mono flex items-center gap-2 flex-wrap">
            <span className="flex items-center gap-1">
              <UserGroupIcon className="w-4 h-4" /> {u.m} union
            </span>
            <span className="flex items-center gap-1">
              <BoltIcon className="w-4 h-4" /> {u.ind} independent
            </span>
            <span>{u.d} dataset</span>
            <span className={u.active ? 'text-success' : 'text-warning'}>
              {u.active ? 'Active' : 'Growing'}
            </span>
          </div>
        </Card>
      ))}
    </div>
  );
}
