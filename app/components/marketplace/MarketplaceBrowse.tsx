'use client';

import { useState } from 'react';
import { Card } from '@/app/components/ui/Card';
import { Badge } from '@/app/components/ui/Badge';
import { Button } from '@/app/components/ui/Button';
import { Pill } from '@/app/components/ui/Pill';
import { T, SANS, MONO } from '@/lib/theme';
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
    <div style={{ minHeight: '100vh', background: T.bg }}>
      {/* Header */}
      <nav style={{
        padding: '16px 28px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderBottom: `1px solid ${T.border}`,
        boxShadow: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
        background: T.surface
      }}>
        <button onClick={onBackToLanding} style={{
          display: 'flex',
          alignItems: 'center',
          gap: 8,
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          transition: 'opacity 0.15s',
          opacity: 1
        }}
        onMouseEnter={e => e.currentTarget.style.opacity = '0.75'}
        onMouseLeave={e => e.currentTarget.style.opacity = '1'}>
          <div style={{ width: 8, height: 8, borderRadius: '50%', background: T.green, boxShadow: '0 1px 2px 0 rgb(0 0 0 / 0.05)' }} />
          <span style={{ fontSize: 16, fontWeight: 'bold', fontFamily: MONO, letterSpacing: '0.05em' }}>CHORUS</span>
          <span style={{ marginLeft: 8 }}>
            <Badge color="info">MARKETPLACE</Badge>
          </span>
        </button>
        <Button variant="ghost" onClick={onGoToPortal}>
          Buyer Portal →
        </Button>
      </nav>

      <div style={{ maxWidth: 1152, margin: '0 auto', padding: '32px 24px' }}>
        {/* Hero */}
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <h1 style={{ fontSize: 36, fontWeight: 'bold', color: T.text, marginBottom: 12 }}>
            Verified Training Datasets
          </h1>
          <p style={{ color: T.textMid, fontSize: 18, maxWidth: 672, margin: '0 auto' }}>
            Browse quality datasets from unions and independent contributors.
            Clear pricing and licensing options.
          </p>
        </div>

        {/* Search & Filters */}
        <div style={{ marginBottom: 24, display: 'flex', flexDirection: 'column', gap: 12 }}>
          <div style={{ position: 'relative' }}>
            <MagnifyingGlassIcon style={{
              position: 'absolute',
              left: 12,
              top: '50%',
              transform: 'translateY(-50%)',
              width: 20,
              height: 20,
              color: T.textDim
            }} />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search datasets..."
              style={{
                width: '100%',
                paddingLeft: 44,
                paddingRight: 16,
                paddingTop: 12,
                paddingBottom: 12,
                background: T.surface,
                border: `1px solid ${T.border}`,
                borderRadius: 8,
                fontSize: 16,
                color: T.text,
                fontFamily: SANS,
                outline: 'none',
                transition: 'border-color 0.15s'
              }}
              onFocus={(e) => e.currentTarget.style.borderColor = T.green}
              onBlur={(e) => e.currentTarget.style.borderColor = T.border}
            />
          </div>

          <div style={{ display: 'flex', gap: 8, alignItems: 'center', flexWrap: 'wrap' }}>
            <FunnelIcon style={{ width: 20, height: 20, color: T.textDim }} />
            <span style={{ fontSize: 14, color: T.textDim, fontFamily: MONO, fontWeight: 600 }}>FILTERS:</span>

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

            <span style={{ fontSize: 14, color: T.textDim, margin: '0 8px', fontWeight: 'bold' }}>•</span>

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
        <div style={{ fontSize: 14, color: T.textDim, fontFamily: MONO, fontWeight: 600, marginBottom: 16 }}>
          {filtered.length} DATASETS FOUND
        </div>

        {/* Dataset Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))',
          gap: 16
        }}>
          {filtered.map((dataset) => {
            const Icon = DATA_TYPES.find(dt => dt.id === dataset.type)?.icon;
            const qualityColor = dataset.quality === 'verified' ? 'success' : 'info';

            return (
              <Card key={dataset.id} hover className="p-5">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    {Icon && <Icon style={{ width: 24, height: 24, color: T.textMid }} />}
                    <h3 style={{ fontWeight: 'bold', fontSize: 18, color: T.text }}>{dataset.name}</h3>
                  </div>
                  <Badge color={qualityColor}>
                    {dataset.quality}
                  </Badge>
                </div>

                <p style={{
                  fontSize: 14,
                  color: T.textMid,
                  lineHeight: 1.5,
                  marginBottom: 12,
                  display: '-webkit-box',
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: 'vertical',
                  overflow: 'hidden'
                }}>
                  {dataset.description}
                </p>

                <div style={{ display: 'flex', gap: 12, marginBottom: 12, fontSize: 14, color: T.textDim, fontFamily: MONO }}>
                  <span>{dataset.samples.toLocaleString()} samples</span>
                  <span>•</span>
                  <span>{dataset.contributors} contributors</span>
                  <span>•</span>
                  <span>{dataset.size}</span>
                </div>

                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  paddingTop: 12,
                  borderTop: `1px solid ${T.border}`
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <span style={{ fontSize: 14, color: T.textDim, fontFamily: MONO }}>
                      {dataset.seller.name}
                    </span>
                    <span style={{ fontSize: 16 }}>⭐ {dataset.seller.rating}</span>
                  </div>

                  {dataset.pricingModel === 'public' && dataset.pricing ? (
                    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                      <span style={{ fontSize: 14, fontWeight: 'bold', color: T.green, fontFamily: MONO }}>
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
          <div style={{ textAlign: 'center', padding: '64px 0' }}>
            <p style={{ color: T.textDim, fontSize: 18 }}>No datasets match your filters</p>
          </div>
        )}
      </div>
    </div>
  );
}
