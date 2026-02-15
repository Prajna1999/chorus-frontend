'use client';

import { useState } from 'react';
import { Card } from '@/app/components/ui/Card';
import { Badge } from '@/app/components/ui/Badge';
import { Button } from '@/app/components/ui/Button';
import { Pill } from '@/app/components/ui/Pill';
import { DATA_TYPES } from '@/constants/dataTypes';
import { MOCK_DATASETS } from '@/constants/marketplaceData';
import {
  MagnifyingGlassIcon,
  FunnelIcon,
  CurrencyRupeeIcon,
  ChatBubbleLeftRightIcon
} from '@heroicons/react/24/outline';
import type { Dataset } from '@/types/marketplace';

interface MarketplaceBrowseProps {
  onSelectDataset: (dataset: Dataset) => void;
  onGoToPortal: () => void;
  onBackToLanding: () => void;
}

export function MarketplaceBrowse({ onSelectDataset, onGoToPortal, onBackToLanding }: MarketplaceBrowseProps) {
  const [search, setSearch] = useState('');
  const [typeFilter, setTypeFilter] = useState<string>('all');
  const [pricingFilter, setPricingFilter] = useState<string>('all');

  const filtered = MOCK_DATASETS.filter((ds) => {
    const matchesSearch = ds.name.toLowerCase().includes(search.toLowerCase()) ||
                         ds.description.toLowerCase().includes(search.toLowerCase());
    const matchesType = typeFilter === 'all' || ds.type === typeFilter;
    const matchesPricing = pricingFilter === 'all' || ds.pricingModel === pricingFilter;
    return matchesSearch && matchesType && matchesPricing;
  });

  const colorMap: Record<string, 'success' | 'info' | 'warning' | 'accent'> = {
    voice: 'success',
    text: 'info',
    documents: 'warning',
    sensor: 'accent'
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <nav className="px-7 py-4 flex justify-between items-center border-b border-border shadow-sm bg-surface">
        <button onClick={onBackToLanding} className="flex items-center gap-2 hover:opacity-75 transition-opacity">
          <div className="w-2 h-2 rounded-full bg-success shadow-sm" />
          <span className="text-base font-bold font-mono tracking-wide">CHORUS</span>
          <Badge color="info" className="ml-2">MARKETPLACE</Badge>
        </button>
        <Button variant="ghost" onClick={onGoToPortal}>
          Buyer Portal →
        </Button>
      </nav>

      <div className="max-w-6xl mx-auto px-6 py-8">
        {/* Hero */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-text mb-3">
            Verified Training Datasets
          </h1>
          <p className="text-text-mid text-lg max-w-2xl mx-auto">
            Browse high-quality datasets from verified unions and independent contributors.
            Transparent pricing and licensing.
          </p>
        </div>

        {/* Search & Filters */}
        <div className="mb-6 space-y-3">
          <div className="relative">
            <MagnifyingGlassIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-text-dim" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search datasets..."
              className="w-full pl-11 pr-4 py-3 bg-surface border border-border rounded-lg text-base text-text focus:outline-none focus:border-success transition-colors"
            />
          </div>

          <div className="flex gap-2 items-center flex-wrap">
            <FunnelIcon className="w-5 h-5 text-text-dim" />
            <span className="text-sm text-text-dim font-mono font-semibold">FILTERS:</span>

            {/* Type filter */}
            <Pill active={typeFilter === 'all'} onClick={() => setTypeFilter('all')} color="success">
              All Types
            </Pill>
            {DATA_TYPES.map((dt) => {
              const Icon = dt.icon;
              return (
                <Pill
                  key={dt.id}
                  active={typeFilter === dt.id}
                  onClick={() => setTypeFilter(dt.id)}
                  color={colorMap[dt.id]}
                >
                  <Icon className="w-5 h-5" /> {dt.label}
                </Pill>
              );
            })}

            <span className="text-sm text-text-dim mx-2 font-bold">•</span>

            {/* Pricing model filter */}
            <Pill active={pricingFilter === 'all'} onClick={() => setPricingFilter('all')} color="info">
              All Pricing
            </Pill>
            <Pill active={pricingFilter === 'public'} onClick={() => setPricingFilter('public')} color="success">
              <CurrencyRupeeIcon className="w-5 h-5" /> Instant Buy
            </Pill>
            <Pill active={pricingFilter === 'request-based'} onClick={() => setPricingFilter('request-based')} color="warning">
              <ChatBubbleLeftRightIcon className="w-5 h-5" /> Request Quote
            </Pill>
          </div>
        </div>

        {/* Results count */}
        <div className="text-sm text-text-dim font-mono font-semibold mb-4">
          {filtered.length} DATASETS FOUND
        </div>

        {/* Dataset Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filtered.map((dataset) => {
            const Icon = DATA_TYPES.find(dt => dt.id === dataset.type)?.icon;
            const qualityColor = dataset.quality === 'verified' ? 'success' : 'info';

            return (
              <Card key={dataset.id} hover className="p-5">
                <div className="flex justify-between items-start mb-3">
                  <div className="flex items-center gap-2">
                    {Icon && <Icon className="w-6 h-6 text-text-mid" />}
                    <h3 className="font-bold text-lg text-text">{dataset.name}</h3>
                  </div>
                  <Badge color={qualityColor}>
                    {dataset.quality}
                  </Badge>
                </div>

                <p className="text-sm text-text-mid leading-relaxed mb-3 line-clamp-2">
                  {dataset.description}
                </p>

                <div className="flex gap-3 mb-3 text-sm text-text-dim font-mono">
                  <span>{dataset.samples.toLocaleString()} samples</span>
                  <span>•</span>
                  <span>{dataset.contributors} contributors</span>
                  <span>•</span>
                  <span>{dataset.size}</span>
                </div>

                <div className="flex items-center justify-between pt-3 border-t border-border">
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-text-dim font-mono">
                      {dataset.seller.name}
                    </span>
                    <span className="text-base">⭐ {dataset.seller.rating}</span>
                  </div>

                  {dataset.pricingModel === 'public' && dataset.pricing ? (
                    <div className="flex items-center gap-3">
                      <span className="text-sm font-bold text-success font-mono">
                        ₹{(dataset.pricing.base / 1000).toFixed(0)}K
                      </span>
                      <Button onClick={() => onSelectDataset(dataset)}>
                        View
                      </Button>
                    </div>
                  ) : (
                    <Button onClick={() => onSelectDataset(dataset)} variant="subtle">
                      Request Quote
                    </Button>
                  )}
                </div>
              </Card>
            );
          })}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-16">
            <p className="text-text-dim text-lg">No datasets match your filters</p>
          </div>
        )}
      </div>
    </div>
  );
}
