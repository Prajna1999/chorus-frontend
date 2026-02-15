'use client';

import { useState } from 'react';
import { Button } from '@/app/components/ui/Button';
import { Badge } from '@/app/components/ui/Badge';
import { Card } from '@/app/components/ui/Card';
import { Input } from '@/app/components/ui/Input';
import { cn } from '@/lib/utils';
import { MOCK_DATA_UNIONS } from '@/constants/dataUnions';
import {
  MagnifyingGlassIcon,
  CheckBadgeIcon,
  UsersIcon,
  CircleStackIcon,
  CurrencyRupeeIcon,
  StarIcon,
  ScaleIcon,
  GlobeAltIcon,
  ArrowRightIcon
} from '@heroicons/react/24/outline';
import type { DataUnion } from '@/types/dataUnion';

interface DataUnionRegistryProps {
  onSelectUnion: (union: DataUnion) => void;
  onBack: () => void;
}

export function DataUnionRegistry({ onSelectUnion, onBack }: DataUnionRegistryProps) {
  const [search, setSearch] = useState('');
  const [selectedUnion, setSelectedUnion] = useState<DataUnion | null>(null);

  const filtered = MOCK_DATA_UNIONS.filter((union) =>
    union.name.toLowerCase().includes(search.toLowerCase()) ||
    union.description.toLowerCase().includes(search.toLowerCase()) ||
    union.specializations.some(s => s.toLowerCase().includes(search.toLowerCase()))
  );

  if (selectedUnion) {
    return (
      <div className="animate-fade-in">
        <Button variant="ghost" onClick={() => setSelectedUnion(null)} className="mb-6">
          ← Back to Registry
        </Button>

        <div className="space-y-6">
          {/* Header */}
          <div className="bg-surface border border-border rounded-xl p-8 shadow-card">
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h2 className="text-3xl font-bold text-text">{selectedUnion.name}</h2>
                  {selectedUnion.verified && (
                    <CheckBadgeIcon className="w-8 h-8 text-success" title="Verified Union" />
                  )}
                </div>
                <p className="text-sm text-text-mid italic mb-4">"{selectedUnion.tagline}"</p>
                <p className="text-sm text-text-mid leading-relaxed">{selectedUnion.description}</p>
              </div>
            </div>

            <div className="flex flex-wrap gap-2 mb-4">
              {selectedUnion.specializations.map((spec) => (
                <Badge key={spec} color="info">{spec}</Badge>
              ))}
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
              <div className="text-center p-4 bg-background rounded-lg">
                <UsersIcon className="w-8 h-8 text-success mx-auto mb-2" />
                <div className="text-2xl font-bold text-text">{selectedUnion.memberCount.toLocaleString()}</div>
                <div className="text-sm text-text-dim">Members</div>
              </div>
              <div className="text-center p-4 bg-background rounded-lg">
                <CircleStackIcon className="w-8 h-8 text-info mx-auto mb-2" />
                <div className="text-2xl font-bold text-text">{selectedUnion.datasetCount}</div>
                <div className="text-sm text-text-dim">Datasets</div>
              </div>
              <div className="text-center p-4 bg-background rounded-lg">
                <CurrencyRupeeIcon className="w-8 h-8 text-warning mx-auto mb-2" />
                <div className="text-2xl font-bold text-text">{selectedUnion.revenueShare}%</div>
                <div className="text-sm text-text-dim">Revenue Share</div>
              </div>
              <div className="text-center p-4 bg-background rounded-lg">
                <StarIcon className="w-8 h-8 text-accent mx-auto mb-2" />
                <div className="text-2xl font-bold text-text">{selectedUnion.buyerRating}/5</div>
                <div className="text-sm text-text-dim">Buyer Rating</div>
              </div>
            </div>
          </div>

          {/* Track Record */}
          <div className="bg-surface border border-border rounded-xl p-8 shadow-card">
            <h3 className="text-2xl font-bold text-text mb-6">Track Record</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <div className="text-sm text-text-dim mb-2">Total Earnings Distributed</div>
                <div className="text-3xl font-bold text-success font-mono">
                  ₹{(selectedUnion.totalEarningsDistributed / 1000000).toFixed(2)}M
                </div>
              </div>
              <div>
                <div className="text-sm text-text-dim mb-2">Data Quality Score</div>
                <div className="text-3xl font-bold text-info">
                  {selectedUnion.dataQualityScore}/100
                </div>
              </div>
              <div>
                <div className="text-sm text-text-dim mb-2">Active Deals</div>
                <div className="text-3xl font-bold text-text">
                  {selectedUnion.activeDeals}
                </div>
              </div>
            </div>
          </div>

          {/* Governance & Details */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-surface border border-border rounded-xl p-8 shadow-card">
              <h3 className="text-base font-bold text-text mb-4 flex items-center gap-2">
                <ScaleIcon className="w-6 h-6" />
                Governance
              </h3>
              <div className="space-y-3">
                <div>
                  <div className="text-sm text-text-dim">Model</div>
                  <div className="text-sm font-semibold text-text capitalize">
                    {selectedUnion.governanceModel}
                  </div>
                </div>
                <div>
                  <div className="text-sm text-text-dim">Voting Rights</div>
                  <div className="text-sm font-semibold text-text">
                    {selectedUnion.votingRights ? 'Yes - Members vote on key decisions' : 'No - Managed by leadership'}
                  </div>
                </div>
                <div>
                  <div className="text-sm text-text-dim">Founded</div>
                  <div className="text-sm font-semibold text-text">
                    {new Date(selectedUnion.founded).toLocaleDateString('en-US', { year: 'numeric', month: 'long' })}
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-surface border border-border rounded-xl p-8 shadow-card">
              <h3 className="text-base font-bold text-text mb-4 flex items-center gap-2">
                <GlobeAltIcon className="w-6 h-6" />
                Specialization
              </h3>
              <div className="space-y-3">
                <div>
                  <div className="text-sm text-text-dim">Languages Supported</div>
                  <div className="text-sm font-semibold text-text">
                    {selectedUnion.languages.join(', ')}
                  </div>
                </div>
                <div>
                  <div className="text-sm text-text-dim">Data Types</div>
                  <div className="text-sm font-semibold text-text capitalize">
                    {selectedUnion.dataTypes.join(', ')}
                  </div>
                </div>
                {selectedUnion.website && (
                  <div>
                    <div className="text-sm text-text-dim">Website</div>
                    <a
                      href={`https://${selectedUnion.website}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm font-semibold text-success hover:underline"
                    >
                      {selectedUnion.website}
                    </a>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Join Button */}
          <div className="flex justify-center pt-6">
            <Button onClick={() => onSelectUnion(selectedUnion)} className="text-sm px-10 py-3">
              Join {selectedUnion.name} <ArrowRightIcon className="w-6 h-6 ml-2 inline" />
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="animate-fade-in">
      <div className="mb-8">
        <h2 className="text-4xl font-bold text-text mb-3">Browse Data Co-operatives</h2>
        <p className="text-base text-text-mid">
          Member-owned organizations that pool data for collective bargaining. Join a co-op
          to access better rates, democratic governance, and professional representation.
        </p>
      </div>

      {/* Search */}
      <div className="mb-8">
        <div className="relative">
          <MagnifyingGlassIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-6 h-6 text-text-dim" />
          <Input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search unions by name, specialization, or description..."
            className="pl-14"
          />
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <Card className="p-6 text-center">
          <div className="text-3xl font-bold text-success mb-2">{MOCK_DATA_UNIONS.length}</div>
          <div className="text-sm text-text-dim">Active Co-operatives</div>
        </Card>
        <Card className="p-6 text-center">
          <div className="text-3xl font-bold text-info mb-2">
            {MOCK_DATA_UNIONS.reduce((acc, u) => acc + u.memberCount, 0).toLocaleString()}
          </div>
          <div className="text-sm text-text-dim">Collective Bargaining Power</div>
        </Card>
        <Card className="p-6 text-center">
          <div className="text-3xl font-bold text-warning mb-2">
            ₹{(MOCK_DATA_UNIONS.reduce((acc, u) => acc + u.totalEarningsDistributed, 0) / 1000000).toFixed(1)}M
          </div>
          <div className="text-sm text-text-dim">Member Earnings</div>
        </Card>
      </div>

      {/* Union Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filtered.map((union) => (
          <div key={union.id} onClick={() => setSelectedUnion(union)}>
            <Card hover className="p-6 cursor-pointer">
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <h3 className="text-base font-bold text-text">{union.name}</h3>
                  {union.verified && (
                    <CheckBadgeIcon className="w-6 h-6 text-success" title="Verified" />
                  )}
                </div>
                <p className="text-sm text-text-mid italic mb-3">"{union.tagline}"</p>
              </div>
            </div>

            <p className="text-sm text-text-mid leading-relaxed mb-4 line-clamp-2">
              {union.description}
            </p>

            <div className="flex flex-wrap gap-2 mb-4">
              {union.specializations.slice(0, 3).map((spec) => (
                <Badge key={spec} color="info">{spec}</Badge>
              ))}
              {union.specializations.length > 3 && (
                <Badge color="info">+{union.specializations.length - 3} more</Badge>
              )}
            </div>

            <div className="grid grid-cols-3 gap-4 pt-4 border-t border-border">
              <div>
                <div className="text-sm text-text-dim">Members</div>
                <div className="text-sm font-bold text-text">{union.memberCount.toLocaleString()}</div>
              </div>
              <div>
                <div className="text-sm text-text-dim">Revenue Share</div>
                <div className="text-sm font-bold text-success">{union.revenueShare}%</div>
              </div>
              <div>
                <div className="text-sm text-text-dim">Rating</div>
                <div className="text-sm font-bold text-text flex items-center gap-1">
                  <StarIcon className="w-5 h-5 text-warning inline" />
                  {union.buyerRating}
                </div>
              </div>
            </div>

            <div className="mt-4 text-right">
              <span className="text-base text-success font-semibold">
                View Details →
              </span>
            </div>
            </Card>
          </div>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-16">
          <p className="text-sm text-text-dim">No unions match your search</p>
        </div>
      )}

      <div className="flex justify-center mt-12 pt-8 border-t border-border">
        <Button variant="ghost" onClick={onBack} className="text-lg">
          ← Back to Mode Selection
        </Button>
      </div>
    </div>
  );
}
