'use client';

import { Card } from '@/app/components/ui/Card';
import { Badge } from '@/app/components/ui/Badge';
import { DATA_TYPES } from '@/constants/dataTypes';
import { MOCK_DATASETS } from '@/constants/mockData';

export function DatasetsTab() {
  return (
    <div className="flex flex-col gap-2">
      {MOCK_DATASETS.map((ds) => {
        const Icon = DATA_TYPES.find((d) => d.id === ds.type)?.icon;
        const badgeColor = ds.status === 'licensed' ? 'success' : ds.status === 'available' ? 'info' : 'warning';

        return (
          <Card key={ds.id} className="p-3">
            <div className="flex justify-between items-start">
              <div className="flex gap-2 items-center">
                {Icon && <Icon className="w-5 h-5 text-text-mid" />}
                <span className="text-sm font-bold text-text">{ds.name}</span>
              </div>
              <Badge color={badgeColor}>{ds.status}</Badge>
            </div>
            <div className="text-sm text-text-dim mt-2 font-mono">
              {ds.samples} samples · {ds.contributors} contributors
              {ds.licensee && ` · ${ds.licensee}`}
            </div>
            {ds.revenue > 0 && (
              <div className="text-sm font-bold text-success mt-2 font-mono">
                ₹{(ds.revenue / 1000).toFixed(0)}K
                {ds.expiry && (
                  <span className="font-normal text-sm text-text-dim"> · expires {ds.expiry}</span>
                )}
              </div>
            )}
          </Card>
        );
      })}
    </div>
  );
}
