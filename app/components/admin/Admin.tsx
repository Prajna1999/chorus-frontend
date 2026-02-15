'use client';

import { useState } from 'react';
import { Badge } from '@/app/components/ui/Badge';
import { ReviewTab } from './ReviewTab';
import { DatasetsTab } from './DatasetsTab';
import { UnionsTab } from './UnionsTab';
import type { Contribution } from '@/types';

interface AdminProps {
  contribs: Contribution[];
  onBack: () => void;
}

export function Admin({ contribs, onBack }: AdminProps) {
  const [tab, setTab] = useState('review');

  return (
    <>
      <nav className="px-5 py-3 flex items-center gap-3 border-b border-border">
        <button
          onClick={onBack}
          className="bg-transparent border-none text-text-dim cursor-pointer text-sm font-mono hover:opacity-75 transition-opacity"
        >
          ← BACK
        </button>
        <Badge color="warning">ADMIN</Badge>
      </nav>
      <div className="flex px-5 border-b border-border">
        {['review', 'datasets', 'unions'].map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`py-2 px-4 bg-transparent border-none border-b-2 text-sm font-semibold font-mono tracking-wide uppercase transition-colors ${
              tab === t
                ? 'border-warning text-text'
                : 'border-transparent text-text-dim'
            }`}
          >
            {t}
          </button>
        ))}
      </div>
      <div className="p-4 max-w-[620px] mx-auto">
        {tab === 'review' && <ReviewTab contribs={contribs} />}
        {tab === 'datasets' && <DatasetsTab />}
        {tab === 'unions' && <UnionsTab />}
      </div>
    </>
  );
}
