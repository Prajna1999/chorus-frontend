'use client';

import { useState } from 'react';
import { T, SANS, MONO } from '@/lib/theme';
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
  ChartBarIcon,
  StarIcon,
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
  const totalEarnings = approved.reduce((s, c) => s + c.earnings, 0);

  const userUnion = user.unionId ? MOCK_DATA_UNIONS.find(u => u.id === user.unionId) : null;

  const tabs = [
    { id: 'contribute', label: 'Contribute', Icon: ArrowUpTrayIcon },
    { id: 'data', label: 'My Data', Icon: ClipboardDocumentListIcon },
    { id: 'analytics', label: 'Analytics', Icon: ChartBarIcon },
    { id: 'earnings', label: 'Earnings', Icon: CurrencyRupeeIcon },
    { id: 'settings', label: 'Settings', Icon: Cog6ToothIcon }
  ];

  return (
    <div style={{ background: T.bg, minHeight: '100vh', color: T.text, fontFamily: SANS }}>
      {/* Header */}
      <nav style={{
        background: T.card,
        borderBottom: `1px solid ${T.border}`,
        padding: '12px 24px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <span style={{ fontFamily: SANS, fontSize: 18, fontWeight: 600, color: T.text }}>Chorus</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <div style={{ textAlign: 'right' }}>
            <div style={{ fontSize: 13, fontWeight: 500, color: T.text }}>{user.name}</div>
            <div style={{ fontSize: 12, color: T.textMid }}>{user.email}</div>
          </div>
          <button onClick={onLogout} style={{
            background: T.surface,
            border: `1px solid ${T.border}`,
            color: T.textMid,
            padding: '6px 12px',
            borderRadius: 6,
            cursor: 'pointer',
            fontSize: 13,
            fontFamily: SANS,
          }}>
            Logout
          </button>
        </div>
      </nav>

      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '24px' }}>
        {/* Welcome */}
        <div style={{ marginBottom: 24 }}>
          <h1 style={{
            fontFamily: SANS,
            fontSize: 28,
            fontWeight: 600,
            color: T.text,
            marginBottom: 4,
          }}>
            Welcome back, {user.name.split(' ')[0]}
          </h1>
          <p style={{ fontSize: 14, color: T.textMid }}>
            Manage your data contributions and track earnings
          </p>
        </div>

        {/* Mode Badge */}
        {user.mode === 'union' && userUnion ? (
          <div style={{
            background: T.card,
            border: `1px solid ${T.border}`,
            borderRadius: 8,
            padding: 16,
            marginBottom: 24,
          }}>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12 }}>
              <div style={{
                width: 40,
                height: 40,
                borderRadius: 6,
                background: T.greenLight,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
              }}>
                <UserGroupIcon style={{ width: 20, height: 20, color: T.green }} />
              </div>
              <div style={{ flex: 1 }}>
                <div style={{
                  fontFamily: MONO,
                  fontSize: 10,
                  letterSpacing: '0.05em',
                  textTransform: 'uppercase',
                  color: T.mutedText,
                  marginBottom: 4,
                }}>
                  Union Member
                </div>
                <h3 style={{ fontFamily: SANS, fontSize: 16, fontWeight: 600, color: T.text, marginBottom: 4 }}>
                  {userUnion.name}
                </h3>
                <p style={{ fontSize: 13, color: T.textMid, marginBottom: 12 }}>
                  {userUnion.tagline}
                </p>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12 }}>
                  {[
                    { label: 'Revenue Share', value: `${userUnion.revenueShare}%` },
                    { label: 'Members', value: userUnion.memberCount.toLocaleString() },
                    { label: 'Datasets', value: userUnion.datasetCount.toString() },
                    { label: 'Rating', value: userUnion.buyerRating.toFixed(1) },
                  ].map((item, idx) => (
                    <div key={idx}>
                      <div style={{ fontSize: 11, color: T.textDim, marginBottom: 2 }}>{item.label}</div>
                      <div style={{ fontSize: 16, fontWeight: 600, color: T.text }}>{item.value}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div style={{
            background: T.card,
            border: `1px solid ${T.border}`,
            borderRadius: 8,
            padding: 16,
            marginBottom: 24,
            display: 'flex',
            alignItems: 'center',
            gap: 12,
          }}>
            <div style={{
              width: 40,
              height: 40,
              borderRadius: 6,
              background: T.primaryLight,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
              <BoltIcon style={{ width: 20, height: 20, color: T.primary }} />
            </div>
            <div style={{ flex: 1 }}>
              <div style={{
                fontFamily: MONO,
                fontSize: 10,
                letterSpacing: '0.05em',
                textTransform: 'uppercase',
                color: T.mutedText,
                marginBottom: 4,
              }}>
                Independent Contributor
              </div>
              <h3 style={{ fontSize: 16, fontWeight: 600, color: T.text, marginBottom: 2 }}>
                Operating Independently
              </h3>
              <p style={{ fontSize: 13, color: T.textMid }}>
                {user.priceFloor && `Price floor: ₹${user.priceFloor}/unit · `}80% revenue share
              </p>
            </div>
          </div>
        )}

        {/* Stats Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16, marginBottom: 24 }}>
          <div style={{
            background: T.card,
            border: `1px solid ${T.border}`,
            borderRadius: 8,
            padding: 16,
          }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 }}>
              <div style={{ fontSize: 12, color: T.textMid, fontWeight: 500 }}>Total Earnings</div>
              <CurrencyRupeeIcon style={{ width: 16, height: 16, color: T.textMid }} />
            </div>
            <div style={{ fontFamily: SANS, fontSize: 24, fontWeight: 600, color: T.text }}>
              ₹{totalEarnings.toLocaleString()}
            </div>
          </div>

          <div style={{
            background: T.card,
            border: `1px solid ${T.border}`,
            borderRadius: 8,
            padding: 16,
          }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 }}>
              <div style={{ fontSize: 12, color: T.textMid, fontWeight: 500 }}>Approved</div>
              <CheckCircleIcon style={{ width: 16, height: 16, color: T.green }} />
            </div>
            <div style={{ fontFamily: SANS, fontSize: 24, fontWeight: 600, color: T.text }}>
              {approved.length}
            </div>
          </div>

          <div style={{
            background: T.card,
            border: `1px solid ${T.border}`,
            borderRadius: 8,
            padding: 16,
          }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 }}>
              <div style={{ fontSize: 12, color: T.textMid, fontWeight: 500 }}>Pending</div>
              <ClockIcon style={{ width: 16, height: 16, color: T.amber }} />
            </div>
            <div style={{ fontFamily: SANS, fontSize: 24, fontWeight: 600, color: T.text }}>
              {pending.length}
            </div>
          </div>

          <div style={{
            background: T.card,
            border: `1px solid ${T.border}`,
            borderRadius: 8,
            padding: 16,
          }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 }}>
              <div style={{ fontSize: 12, color: T.textMid, fontWeight: 500 }}>Total</div>
              <ChartBarIcon style={{ width: 16, height: 16, color: T.textMid }} />
            </div>
            <div style={{ fontFamily: SANS, fontSize: 24, fontWeight: 600, color: T.text }}>
              {contribs.length}
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div style={{ borderBottom: `1px solid ${T.border}`, marginBottom: 24 }}>
          <div style={{ display: 'flex', gap: 0 }}>
            {tabs.map((t) => {
              const Icon = t.Icon;
              const isActive = tab === t.id;
              return (
                <button
                  key={t.id}
                  onClick={() => setTab(t.id)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 6,
                    padding: '10px 16px',
                    background: 'transparent',
                    border: 'none',
                    borderBottom: isActive ? `2px solid ${T.primary}` : '2px solid transparent',
                    color: isActive ? T.text : T.textMid,
                    cursor: 'pointer',
                    fontSize: 14,
                    fontWeight: isActive ? 500 : 400,
                    fontFamily: SANS,
                  }}
                >
                  <Icon style={{ width: 16, height: 16 }} />
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
