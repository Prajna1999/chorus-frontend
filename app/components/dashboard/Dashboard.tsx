'use client';

import { useState } from 'react';
import { Badge } from '@/app/components/ui/Badge';
import { Button } from '@/app/components/ui/Button';
import { Card } from '@/app/components/ui/Card';
import { ContributeTab } from './ContributeTab';
import { DataTab } from './DataTab';
import { EarningsTab } from './EarningsTab';
import { SettingsTab } from './SettingsTab';
import { AnalyticsTab } from './AnalyticsTab';
import { MOCK_DATA_UNIONS } from '@/constants/dataUnions';
import {
  ArrowUpTrayIcon,
  ClipboardDocumentListIcon,
  Cog6ToothIcon,
  UserGroupIcon,
  BoltIcon,
  CurrencyRupeeIcon,
  CheckCircleIcon,
  ClockIcon,
  UsersIcon,
  CircleStackIcon,
  StarIcon,
  ArrowRightIcon,
  ScaleIcon,
  ChartBarIcon
} from '@heroicons/react/24/outline';
import type { User, Contribution } from '@/types';

interface DashboardProps {
  user: User;
  contribs: Contribution[];
  setContribs: React.Dispatch<React.SetStateAction<Contribution[]>>;
  onLogout: () => void;
}

export function Dashboard({ user, contribs, setContribs, onLogout }: DashboardProps) {
  const [tab, setTab] = useState('contribute');
  const approved = contribs.filter((c) => c.status === 'approved');
  const pending = contribs.filter((c) => c.status === 'pending');
  const rejected = contribs.filter((c) => c.status === 'rejected');
  const totalEarnings = approved.reduce((s, c) => s + c.earnings, 0);

  // Get union details if user is a member
  const userUnion = user.unionId
    ? MOCK_DATA_UNIONS.find(u => u.id === user.unionId)
    : null;

  const tabs = [
    { id: 'contribute', label: 'Contribute Data', Icon: ArrowUpTrayIcon },
    { id: 'data', label: 'My Contributions', Icon: ClipboardDocumentListIcon },
    { id: 'analytics', label: 'Usage & Buyers', Icon: ChartBarIcon },
    { id: 'earnings', label: 'Earnings & Payouts', Icon: CurrencyRupeeIcon },
    { id: 'settings', label: 'Settings', Icon: Cog6ToothIcon }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <nav className="px-8 py-5 flex items-center justify-between border-b border-border bg-surface shadow-sm">
        <div className="flex items-center gap-3">
          <div className="w-2 h-2 rounded-full bg-success shadow-sm" />
          <span className="text-sm font-bold font-mono tracking-wide">CHORUS</span>
          <Badge color="success">CONTRIBUTOR</Badge>
        </div>
        <div className="flex items-center gap-4">
          <div className="text-right">
            <div className="text-base font-semibold text-text">{user.name}</div>
            <div className="text-sm text-text-dim">{user.email}</div>
          </div>
          <Button variant="ghost" onClick={onLogout}>
            Logout
          </Button>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-4xl font-bold text-text mb-2">
                Welcome back, {user.name.split(' ')[0]}! 👋
              </h1>
              <p className="text-sm text-text-mid">
                Here's your contribution dashboard
              </p>
            </div>
          </div>

          {/* Mode Badge - Union or Independent */}
          {user.mode === 'union' && userUnion ? (
            <Card className="p-6 bg-gradient-to-r from-success-dim to-success-dim/50 border-success-border">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-14 h-14 rounded-xl bg-success flex items-center justify-center">
                      <UserGroupIcon className="w-7 h-7 text-white" />
                    </div>
                    <div>
                      <Badge color="success">UNION MEMBER</Badge>
                      <h3 className="text-2xl font-bold text-text mt-1">{userUnion.name}</h3>
                    </div>
                  </div>
                  <p className="text-sm text-text-mid mb-4">
                    {userUnion.tagline}
                  </p>
                  <div className="grid grid-cols-4 gap-6">
                    <div>
                      <div className="text-sm text-text-dim mb-1">Revenue Share</div>
                      <div className="text-2xl font-bold text-success">{userUnion.revenueShare}%</div>
                    </div>
                    <div>
                      <div className="text-sm text-text-dim mb-1">Total Members</div>
                      <div className="text-2xl font-bold text-text">{userUnion.memberCount.toLocaleString()}</div>
                    </div>
                    <div>
                      <div className="text-sm text-text-dim mb-1">Union Datasets</div>
                      <div className="text-2xl font-bold text-text">{userUnion.datasetCount}</div>
                    </div>
                    <div>
                      <div className="text-sm text-text-dim mb-1">Buyer Rating</div>
                      <div className="text-2xl font-bold text-text flex items-center gap-1">
                        <StarIcon className="w-5 h-5 text-warning" />
                        {userUnion.buyerRating}
                      </div>
                    </div>
                  </div>
                </div>
                <button className="text-success font-semibold text-base hover:underline flex items-center gap-1">
                  View Union Details
                  <ArrowRightIcon className="w-5 h-5" />
                </button>
              </div>
            </Card>
          ) : (
            <Card className="p-6 bg-gradient-to-r from-info-dim to-info-dim/50 border-info-border">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-xl bg-info flex items-center justify-center">
                  <BoltIcon className="w-7 h-7 text-white" />
                </div>
                <div className="flex-1">
                  <Badge color="info">INDEPENDENT CONTRIBUTOR</Badge>
                  <h3 className="text-2xl font-bold text-text mt-1">Operating Independently</h3>
                  <p className="text-sm text-text-mid mt-2">
                    You set your own pricing and licensing terms. {user.priceFloor && `Current price floor: ₹${user.priceFloor}/unit`}
                  </p>
                </div>
                <div className="text-right">
                  <div className="text-sm text-text-dim mb-1">Revenue Share</div>
                  <div className="text-3xl font-bold text-info">80%</div>
                </div>
              </div>
            </Card>
          )}

          {/* Collective Power Metrics - Only for Union Members */}
          {user.mode === 'union' && userUnion && (
            <Card className="p-6 border-2 border-success">
              <div className="flex items-center gap-3 mb-4">
                <ScaleIcon className="w-6 h-6 text-success" />
                <h3 className="text-xl font-bold text-text">Collective Bargaining Power</h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <div className="text-xs font-mono uppercase tracking-wider text-text-dim mb-2">Rate Multiplier</div>
                  <div className="text-4xl font-bold text-success mb-1">3.2x</div>
                  <div className="text-sm text-text-mid">
                    Co-op rate: ₹48/sample vs ₹15 independent
                  </div>
                </div>

                <div>
                  <div className="text-xs font-mono uppercase tracking-wider text-text-dim mb-2">Member Strength</div>
                  <div className="text-4xl font-bold text-text mb-1">{userUnion.memberCount.toLocaleString()}</div>
                  <div className="text-sm text-text-mid">
                    Largest {userUnion.name.includes('Hindi') ? 'Hindi' : userUnion.name.includes('Tamil') ? 'Tamil' : userUnion.name.includes('Driver') ? 'driver' : userUnion.name.includes('Delivery') ? 'delivery' : ''} dataset in region
                  </div>
                </div>

                <div>
                  <div className="text-xs font-mono uppercase tracking-wider text-text-dim mb-2">Total Distributed</div>
                  <div className="text-4xl font-bold text-text mb-1">
                    ₹{(userUnion.totalEarningsDistributed / 1000000).toFixed(1)}M
                  </div>
                  <div className="text-sm text-text-mid">
                    To {userUnion.memberCount.toLocaleString()} co-op members
                  </div>
                </div>
              </div>

              <div className="mt-4 pt-4 border-t border-border">
                <div className="flex items-start gap-2">
                  <CheckCircleIcon className="w-5 h-5 text-success mt-0.5 flex-shrink-0" />
                  <div className="text-sm text-text-mid">
                    <span className="font-semibold text-text">Recent Win:</span> Co-op negotiated enterprise deal
                    with AI company at {userUnion.revenueShare}% member revenue share. Individual contributors
                    typically get 40-50% after platform fees.
                  </div>
                </div>
              </div>
            </Card>
          )}
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="p-6 border-l-4 border-l-success">
            <div className="flex items-center justify-between mb-3">
              <div className="text-sm text-text-dim font-semibold">Total Earnings</div>
              <CurrencyRupeeIcon className="w-6 h-6 text-success" />
            </div>
            <div className="text-3xl font-bold text-success font-mono">₹{totalEarnings.toLocaleString()}</div>
            <div className="text-sm text-text-dim mt-2">
              {user.mode === 'union' && userUnion && `${userUnion.revenueShare}% of total sales`}
            </div>
          </Card>

          <Card className="p-6 border-l-4 border-l-info">
            <div className="flex items-center justify-between mb-3">
              <div className="text-sm text-text-dim font-semibold">Approved</div>
              <CheckCircleIcon className="w-6 h-6 text-info" />
            </div>
            <div className="text-3xl font-bold text-info">{approved.length}</div>
            <div className="text-sm text-text-dim mt-2">Contributions approved</div>
          </Card>

          <Card className="p-6 border-l-4 border-l-warning">
            <div className="flex items-center justify-between mb-3">
              <div className="text-sm text-text-dim font-semibold">Pending Review</div>
              <ClockIcon className="w-6 h-6 text-warning" />
            </div>
            <div className="text-3xl font-bold text-warning">{pending.length}</div>
            <div className="text-sm text-text-dim mt-2">Awaiting approval</div>
          </Card>

          <Card className="p-6 border-l-4 border-l-text">
            <div className="flex items-center justify-between mb-3">
              <div className="text-sm text-text-dim font-semibold">Total Contributions</div>
              <CircleStackIcon className="w-6 h-6 text-text-mid" />
            </div>
            <div className="text-3xl font-bold text-text">{contribs.length}</div>
            <div className="text-sm text-text-dim mt-2">All time submissions</div>
          </Card>
        </div>

        {/* Tabs */}
        <div className="border-b border-border mb-8">
          <div className="flex gap-1">
            {tabs.map((t) => {
              const Icon = t.Icon;
              return (
                <button
                  key={t.id}
                  onClick={() => setTab(t.id)}
                  className={`flex items-center gap-2 px-6 py-4 border-b-2 transition-all text-base font-semibold ${
                    tab === t.id
                      ? 'border-success text-success bg-success-dim/30'
                      : 'border-transparent text-text-dim hover:text-text hover:bg-surface'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  {t.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Tab Content */}
        <div>
          {tab === 'contribute' && <ContributeTab user={user} setContribs={setContribs} />}
          {tab === 'data' && <DataTab contribs={contribs} />}
          {tab === 'analytics' && <AnalyticsTab contribs={contribs} user={user} />}
          {tab === 'earnings' && <EarningsTab contribs={contribs} user={user} />}
          {tab === 'settings' && <SettingsTab user={user} />}
        </div>
      </div>
    </div>
  );
}
