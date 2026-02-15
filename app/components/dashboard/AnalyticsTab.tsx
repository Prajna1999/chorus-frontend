'use client';

import { Card } from '@/app/components/ui/Card';
import { Badge } from '@/app/components/ui/Badge';
import { DATA_TYPES } from '@/constants/dataTypes';
import {
  BuildingOfficeIcon,
  ChartBarIcon,
  CurrencyRupeeIcon,
  CalendarIcon,
  ArrowTrendingUpIcon
} from '@heroicons/react/24/outline';
import type { Contribution, User } from '@/types';

interface AnalyticsTabProps {
  contribs: Contribution[];
  user: User;
}

// Mock data for who's using the contributor's data
const mockBuyerUsage = [
  {
    id: 'buyer1',
    companyName: 'OpenAI',
    accountType: 'enterprise' as const,
    datasetsLicensed: 3,
    samplesUsed: 1247,
    totalRevenue: 12450,
    firstLicense: '2024-11-15',
    lastLicense: '2025-02-10',
    activeDeals: 2,
    dataTypes: ['voice', 'text']
  },
  {
    id: 'buyer2',
    companyName: 'Anthropic',
    accountType: 'enterprise' as const,
    datasetsLicensed: 2,
    samplesUsed: 845,
    totalRevenue: 8920,
    firstLicense: '2024-12-01',
    lastLicense: '2025-02-08',
    activeDeals: 1,
    dataTypes: ['voice']
  },
  {
    id: 'buyer3',
    companyName: 'Sarvam AI',
    accountType: 'startup' as const,
    datasetsLicensed: 1,
    samplesUsed: 420,
    totalRevenue: 4200,
    firstLicense: '2025-01-20',
    lastLicense: '2025-01-20',
    activeDeals: 1,
    dataTypes: ['voice', 'text']
  },
  {
    id: 'buyer4',
    companyName: 'Google DeepMind',
    accountType: 'enterprise' as const,
    datasetsLicensed: 4,
    samplesUsed: 2150,
    totalRevenue: 18600,
    firstLicense: '2024-10-05',
    lastLicense: '2025-02-14',
    activeDeals: 3,
    dataTypes: ['voice', 'documents']
  }
];

export function AnalyticsTab({ contribs, user }: AnalyticsTabProps) {
  const approved = contribs.filter((c) => c.status === 'approved');
  const totalSamplesContributed = approved.length;
  const totalEarnings = approved.reduce((s, c) => s + c.earnings, 0);

  // Calculate total samples used across all buyers
  const totalSamplesUsed = mockBuyerUsage.reduce((sum, buyer) => sum + buyer.samplesUsed, 0);
  const totalRevenue = mockBuyerUsage.reduce((sum, buyer) => sum + buyer.totalRevenue, 0);

  return (
    <div className="space-y-6">
      {/* Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="p-5 text-center border-l-4 border-l-success">
          <div className="text-xs text-text-dim mb-2">Active Buyers</div>
          <div className="text-3xl font-bold text-success">{mockBuyerUsage.length}</div>
        </Card>
        <Card className="p-5 text-center border-l-4 border-l-info">
          <div className="text-xs text-text-dim mb-2">Samples in Use</div>
          <div className="text-3xl font-bold text-info">{totalSamplesUsed.toLocaleString()}</div>
        </Card>
        <Card className="p-5 text-center border-l-4 border-l-warning">
          <div className="text-xs text-text-dim mb-2">Total Revenue</div>
          <div className="text-3xl font-bold text-warning font-mono">₹{totalRevenue.toLocaleString()}</div>
        </Card>
        <Card className="p-5 text-center border-l-4 border-l-accent">
          <div className="text-xs text-text-dim mb-2">Avg Price/Sample</div>
          <div className="text-3xl font-bold text-accent font-mono">₹{Math.round(totalRevenue / totalSamplesUsed)}</div>
        </Card>
      </div>

      {/* Who's Using Your Data */}
      <div>
        <div className="flex items-center gap-2 mb-4">
          <BuildingOfficeIcon className="w-6 h-6 text-success" />
          <h3 className="text-xl font-bold text-text">Companies Using Your Data</h3>
        </div>

        <div className="space-y-4">
          {mockBuyerUsage
            .sort((a, b) => b.totalRevenue - a.totalRevenue)
            .map((buyer) => (
              <Card key={buyer.id} className="p-6 hover-lift">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-12 h-12 rounded-xl bg-info flex items-center justify-center">
                        <BuildingOfficeIcon className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h4 className="text-base font-bold text-text">{buyer.companyName}</h4>
                        <div className="flex items-center gap-2 mt-1">
                          <Badge color={buyer.accountType === 'enterprise' ? 'info' : 'accent'}>
                            {buyer.accountType}
                          </Badge>
                          {buyer.activeDeals > 0 && (
                            <Badge color="success">
                              {buyer.activeDeals} Active {buyer.activeDeals === 1 ? 'Deal' : 'Deals'}
                            </Badge>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-xs text-text-dim mb-1">Revenue from this buyer</div>
                    <div className="text-2xl font-bold text-success font-mono">₹{buyer.totalRevenue.toLocaleString()}</div>
                  </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4 border-t border-border">
                  <div>
                    <div className="text-xs text-text-dim mb-1">Datasets Licensed</div>
                    <div className="text-base font-bold text-text">{buyer.datasetsLicensed}</div>
                  </div>
                  <div>
                    <div className="text-xs text-text-dim mb-1">Samples Used</div>
                    <div className="text-base font-bold text-text">{buyer.samplesUsed.toLocaleString()}</div>
                  </div>
                  <div>
                    <div className="text-xs text-text-dim mb-1">First License</div>
                    <div className="text-sm text-text-mid">
                      {new Date(buyer.firstLicense).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                    </div>
                  </div>
                  <div>
                    <div className="text-xs text-text-dim mb-1">Last License</div>
                    <div className="text-sm text-text-mid">
                      {new Date(buyer.lastLicense).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                    </div>
                  </div>
                </div>

                <div className="mt-3 pt-3 border-t border-border">
                  <div className="text-xs text-text-dim mb-2">Data Types Licensed</div>
                  <div className="flex gap-2">
                    {buyer.dataTypes.map((typeId) => {
                      const dataType = DATA_TYPES.find(dt => dt.id === typeId);
                      const Icon = dataType?.icon;
                      return (
                        <div key={typeId} className="flex items-center gap-1 text-xs text-text-mid">
                          {Icon && <Icon className="w-4 h-4" />}
                          <span>{dataType?.label}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </Card>
            ))}
        </div>
      </div>

      {/* Performance Insights */}
      <Card className="p-6 bg-success-dim/20 border-success-border">
        <div className="flex items-start gap-3">
          <ChartBarIcon className="w-6 h-6 text-success flex-shrink-0" />
          <div>
            <h3 className="text-base font-bold text-text mb-2">Performance Insights</h3>
            <ul className="text-sm text-text-mid space-y-2">
              <li className="flex items-start gap-2">
                <ArrowTrendingUpIcon className="w-4 h-4 text-success mt-0.5 flex-shrink-0" />
                <span>
                  Your data is being used by <strong>{mockBuyerUsage.length} companies</strong> including
                  {' '}{mockBuyerUsage.filter(b => b.accountType === 'enterprise').length} enterprise buyers
                </span>
              </li>
              <li className="flex items-start gap-2">
                <CalendarIcon className="w-4 h-4 text-success mt-0.5 flex-shrink-0" />
                <span>
                  Average usage rate: <strong>{Math.round(totalSamplesUsed / totalSamplesContributed * 100)}%</strong> of your
                  contributed samples are actively licensed
                </span>
              </li>
              <li className="flex items-start gap-2">
                <CurrencyRupeeIcon className="w-4 h-4 text-success mt-0.5 flex-shrink-0" />
                <span>
                  You're earning an average of <strong>₹{Math.round(totalRevenue / totalSamplesUsed)}/sample</strong> -
                  {user.mode === 'union' ? ' higher than independent rates' : ' competitive market rate'}
                </span>
              </li>
            </ul>
          </div>
        </div>
      </Card>
    </div>
  );
}
