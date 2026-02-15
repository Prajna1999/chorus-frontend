'use client';

import { useState } from 'react';
import { Card } from '@/app/components/ui/Card';
import { Badge } from '@/app/components/ui/Badge';
import { Button } from '@/app/components/ui/Button';
import { Label } from '@/app/components/ui/Label';
import { Input } from '@/app/components/ui/Input';
import { LANGUAGES } from '@/constants/languages';
import { DATA_TYPES } from '@/constants/dataTypes';
import { MOCK_DATA_UNIONS } from '@/constants/dataUnions';
import {
  UserGroupIcon,
  BoltIcon,
  MagnifyingGlassIcon,
  CheckBadgeIcon,
  StarIcon,
  BanknotesIcon,
  CreditCardIcon
} from '@heroicons/react/24/outline';
import type { User } from '@/types';
import type { DataUnion } from '@/types/dataUnion';

interface SettingsTabProps {
  user: User;
}

export function SettingsTab({ user }: SettingsTabProps) {
  const [revoking, setRevoking] = useState(false);
  const [browsing, setBrowsing] = useState(false);
  const [search, setSearch] = useState('');
  const modeColor = user?.mode === 'union' ? 'text-success' : 'text-info';

  const filteredUnions = MOCK_DATA_UNIONS.filter(union =>
    union.name.toLowerCase().includes(search.toLowerCase()) ||
    union.description.toLowerCase().includes(search.toLowerCase()) ||
    union.specializations.some(s => s.toLowerCase().includes(search.toLowerCase()))
  );

  const handleSwitchMode = () => {
    if (user?.mode === 'union') {
      // Switch to independent
      alert('Switched to Independent mode. Takes effect on next license cycle.');
      setBrowsing(false);
    } else {
      // Show union browser
      setBrowsing(true);
    }
  };

  const handleJoinUnion = (union: DataUnion) => {
    alert(`Joined ${union.name}!\n\nYour new revenue share: ${union.revenueShare}%\n\nChanges take effect on next license cycle.`);
    setBrowsing(false);
  };

  if (browsing) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-bold text-text">Browse Data Co-operatives</h3>
          <Button variant="ghost" onClick={() => setBrowsing(false)}>
            ← Back to Settings
          </Button>
        </div>

        {/* Search */}
        <div className="relative">
          <MagnifyingGlassIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-text-dim" />
          <Input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search co-operatives..."
            className="pl-10"
          />
        </div>

        {/* Union List */}
        <div className="space-y-4">
          {filteredUnions.map((union) => (
            <Card key={union.id} className="p-5 hover-lift">
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <h4 className="text-base font-bold text-text">{union.name}</h4>
                    {union.verified && (
                      <CheckBadgeIcon className="w-5 h-5 text-success" />
                    )}
                  </div>
                  <p className="text-sm text-text-mid italic mb-2">"{union.tagline}"</p>
                  <p className="text-sm text-text-mid line-clamp-2">{union.description}</p>
                </div>
              </div>

              <div className="grid grid-cols-4 gap-3 mb-3">
                <div>
                  <div className="text-xs text-text-dim">Members</div>
                  <div className="text-sm font-bold text-text">{union.memberCount.toLocaleString()}</div>
                </div>
                <div>
                  <div className="text-xs text-text-dim">Revenue Share</div>
                  <div className="text-sm font-bold text-success">{union.revenueShare}%</div>
                </div>
                <div>
                  <div className="text-xs text-text-dim">Datasets</div>
                  <div className="text-sm font-bold text-text">{union.datasetCount}</div>
                </div>
                <div>
                  <div className="text-xs text-text-dim">Rating</div>
                  <div className="text-sm font-bold text-text flex items-center gap-1">
                    <StarIcon className="w-4 h-4 text-warning" />
                    {union.buyerRating}
                  </div>
                </div>
              </div>

              <Button onClick={() => handleJoinUnion(union)} className="w-full" variant="subtle">
                Join {union.name}
              </Button>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Profile Info */}
      <Card className="p-6">
        <h3 className="text-base font-bold text-text mb-4">Profile Information</h3>
        {[
          { l: 'Name', v: user?.name },
          { l: 'Email', v: user?.email },
          {
            l: 'Mode',
            v: user?.mode === 'union' ? (
              <span className="flex items-center gap-1">
                <UserGroupIcon className="w-5 h-5" /> Union member
              </span>
            ) : (
              <span className="flex items-center gap-1">
                <BoltIcon className="w-5 h-5" /> Independent
              </span>
            ),
            c: modeColor
          },
          {
            l: 'Languages',
            v: user?.languages?.map((l) => LANGUAGES.find((x) => x.id === l)?.label).join(', ')
          },
          {
            l: 'Data types',
            v: user?.dataTypes?.map((id) => DATA_TYPES.find((d) => d.id === id)?.label).join(', ')
          },
          { l: 'Price floor', v: `₹${user?.priceFloor}/min`, c: 'text-success font-mono' }
        ].map((f, i, arr) => (
          <div key={i} className={i < arr.length - 1 ? 'mb-3' : ''}>
            <Label>{f.l}</Label>
            <div className={`text-sm ${f.c || 'text-text'} ${f.c ? 'font-semibold' : ''}`}>
              {f.v}
            </div>
          </div>
        ))}
      </Card>

      {/* Contributor Mode */}
      <Card className="p-6">
        <h3 className="text-base font-bold text-text mb-3">Contributor Mode</h3>
        <div className="text-sm text-text-mid leading-relaxed mb-4">
          {user?.mode === 'union'
            ? "You're in a Union. The platform negotiates collectively on your behalf for better rates and terms."
            : "You're operating independently. You negotiate directly with buyers and set your own pricing."}{' '}
          You can switch modes anytime — changes take effect on the next license cycle.
        </div>
        <Button onClick={handleSwitchMode} variant="subtle">
          {user?.mode === 'union' ? (
            <>
              Switch to Independent <BoltIcon className="w-5 h-5 inline ml-2" />
            </>
          ) : (
            <>
              Browse Co-operatives <UserGroupIcon className="w-5 h-5 inline ml-2" />
            </>
          )}
        </Button>
      </Card>

      {/* Payment Settings */}
      <Card className="p-6">
        <div className="flex items-center gap-2 mb-4">
          <BanknotesIcon className="w-6 h-6 text-success" />
          <h3 className="text-base font-bold text-text">Payment Settings</h3>
        </div>
        <div className="space-y-3">
          <div>
            <Label>Payment Method</Label>
            <div className="text-sm text-text flex items-center gap-2">
              <CreditCardIcon className="w-5 h-5 text-text-mid" />
              UPI: user@bank
            </div>
          </div>
          <div>
            <Label>Payout Schedule</Label>
            <div className="text-sm text-text">Monthly (1st of every month)</div>
          </div>
          <Button variant="ghost" className="text-sm">
            Update Payment Method
          </Button>
        </div>
      </Card>

      {/* Revoke Consent */}
      <Card className="p-6 bg-danger-dim border-danger-border">
        <div className="text-sm font-mono tracking-wide text-danger mb-2 uppercase">
          Revoke Consent
        </div>
        <p className="text-sm text-text-mid leading-relaxed mb-4">
          Removes your data from future datasets. Existing licenses remain valid until expiry.
          This action cannot be undone.
        </p>
        {!revoking ? (
          <Button
            variant="danger"
            onClick={() => setRevoking(true)}
            className="text-sm"
          >
            Revoke All Consent
          </Button>
        ) : (
          <div className="flex gap-2">
            <Button variant="ghost" onClick={() => setRevoking(false)}>
              Cancel
            </Button>
            <Button
              variant="danger"
              onClick={() => {
                alert('Consent revoked. Your data will no longer be included in new datasets.');
                setRevoking(false);
              }}
            >
              Confirm Revoke
            </Button>
          </div>
        )}
      </Card>
    </div>
  );
}
