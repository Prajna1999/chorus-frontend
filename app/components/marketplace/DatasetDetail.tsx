'use client';

import { useState } from 'react';
import { Card } from '@/app/components/ui/Card';
import { Badge } from '@/app/components/ui/Badge';
import { Button } from '@/app/components/ui/Button';
import { Input } from '@/app/components/ui/Input';
import { T, SANS, MONO } from '@/lib/theme';
import { DATA_TYPES } from '@/constants/dataTypes';
import {
  ArrowLeftIcon,
  CheckIcon,
  ClockIcon,
  UserGroupIcon,
  DocumentTextIcon,
  ArrowDownTrayIcon,
  ShieldCheckIcon,
  ChartBarIcon,
  CalendarIcon,
  MapPinIcon,
  ArrowTrendingUpIcon,
  ArrowTrendingDownIcon,
  BanknotesIcon
} from '@heroicons/react/24/outline';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import type { Dataset, MarketData, Bid, Ask, Trade } from '@/types/marketplace';

interface DatasetDetailProps {
  dataset: Dataset;
  onBack: () => void;
  onCheckout: (datasetId: string, tierId: number) => void;
  onRequestQuote: (datasetId: string) => void;
  onGoToPortal: () => void;
}

type Tab = 'overview' | 'samples' | 'licensing' | 'provenance' | 'market';

export function DatasetDetail({ dataset, onBack, onCheckout, onRequestQuote, onGoToPortal }: DatasetDetailProps) {
  const [selectedTier, setSelectedTier] = useState(0);
  const [activeTab, setActiveTab] = useState<Tab>('overview');
  const Icon = DATA_TYPES.find(dt => dt.id === dataset.type)?.icon;

  // Market trading state
  const [bidPrice, setBidPrice] = useState('');
  const [bidQuantity, setBidQuantity] = useState('');

  // Mock market data (in production, this would come from real-time API)
  const mockMarketData: MarketData = {
    currentPrice: 850, // ₹850 per sample
    priceChange24h: 19.5,
    priceChangePercent: 2.35,
    volume24h: 1247,
    high24h: 875,
    low24h: 820,
    bids: [
      { id: 'b1', buyerId: 'buyer1', buyerName: 'TechCorp AI', price: 845, quantity: 800, timestamp: new Date(), status: 'active' },
      { id: 'b2', buyerId: 'buyer2', buyerName: 'DataLabs Inc', price: 840, quantity: 1200, timestamp: new Date(), status: 'active' },
      { id: 'b3', buyerId: 'buyer3', buyerName: 'AI Research Co', price: 835, quantity: 600, timestamp: new Date(), status: 'active' },
    ],
    asks: [
      { id: 'a1', sellerId: 'seller1', sellerName: 'Bharat Voice Collective', price: 855, quantity: 750, timestamp: new Date(), status: 'active' },
      { id: 'a2', sellerId: 'seller2', sellerName: 'Bharat Voice Collective', price: 860, quantity: 1000, timestamp: new Date(), status: 'active' },
      { id: 'a3', sellerId: 'seller3', sellerName: 'Bharat Voice Collective', price: 865, quantity: 500, timestamp: new Date(), status: 'active' },
    ],
    recentTrades: [
      { id: 't1', price: 852, quantity: 500, timestamp: new Date(Date.now() - 1000 * 60 * 5), buyerId: 'b1', sellerId: 's1' },
      { id: 't2', price: 848, quantity: 300, timestamp: new Date(Date.now() - 1000 * 60 * 15), buyerId: 'b2', sellerId: 's2' },
      { id: 't3', price: 845, quantity: 1000, timestamp: new Date(Date.now() - 1000 * 60 * 45), buyerId: 'b3', sellerId: 's3' },
    ]
  };

  // Mock price history (last 7 days)
  const priceHistory = [
    { date: '2/8', price: 820 },
    { date: '2/9', price: 825 },
    { date: '2/10', price: 818 },
    { date: '2/11', price: 835 },
    { date: '2/12', price: 842 },
    { date: '2/13', price: 838 },
    { date: '2/14', price: 831 },
    { date: '2/15', price: 850 },
  ];

  const handleDownloadSample = () => {
    // In production, this would trigger actual download
    alert(`Downloading sample data for ${dataset.name}...\n\nSample includes:\n- 10 representative samples\n- Format: ${dataset.type === 'voice' ? 'WAV' : 'JSON'}\n- Size: ~2MB\n\nIn production, this would download a real file.`);
  };

  const handlePlaceBid = () => {
    if (!bidPrice || !bidQuantity) {
      alert('Please enter both price and quantity');
      return;
    }
    const totalCost = parseFloat(bidPrice) * parseInt(bidQuantity);
    alert(`Bid Placed!\n\nPrice per sample: ₹${bidPrice}\nQuantity: ${bidQuantity} samples\nTotal: ₹${totalCost.toLocaleString()}\n\nYour bid has been added to the order book. You'll be notified if it's filled.`);
    setBidPrice('');
    setBidQuantity('');
  };

  const spread = mockMarketData.asks[0]?.price - mockMarketData.bids[0]?.price;

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
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <button onClick={onBack} style={{
            color: T.textDim,
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            transition: 'color 0.15s',
            padding: 0
          }}
          onMouseEnter={e => e.currentTarget.style.color = T.text}
          onMouseLeave={e => e.currentTarget.style.color = T.textDim}>
            <ArrowLeftIcon style={{ width: 20, height: 20 }} />
          </button>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <div style={{ width: 8, height: 8, borderRadius: '50%', background: T.green, boxShadow: '0 1px 2px 0 rgb(0 0 0 / 0.05)' }} />
            <span style={{ fontSize: 16, fontWeight: 'bold', fontFamily: MONO, letterSpacing: '0.05em' }}>CHORUS</span>
            <Badge color="info">MARKETPLACE</Badge>
          </div>
        </div>
        <Button variant="ghost" onClick={onGoToPortal}>
          Buyer Portal →
        </Button>
      </nav>

      <div style={{ maxWidth: 1152, margin: '0 auto', padding: '32px 24px' }}>
        {/* Dataset Header */}
        <div style={{ marginBottom: 32 }}>
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: 16, marginBottom: 16 }}>
            {Icon && (
              <div style={{
                width: 64,
                height: 64,
                borderRadius: 12,
                background: T.greenLight,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0
              }}>
                <Icon style={{ width: 32, height: 32, color: T.green }} />
              </div>
            )}
            <div style={{ flex: 1 }}>
              <h1 style={{ fontSize: 36, fontWeight: 'bold', color: T.text, marginBottom: 12 }}>{dataset.name}</h1>
              <p style={{ fontSize: 16, color: T.textMid, lineHeight: 1.5, marginBottom: 16 }}>
                {dataset.description}
              </p>
              <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                {dataset.tags.map((tag) => (
                  <Badge key={tag} color="info">
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
          </div>

          {/* Quick Stats */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: 16 }}>
            <Card className="p-4" style={{ textAlign: 'center' }}>
              <div style={{ fontSize: 24, fontWeight: 'bold', color: T.green, marginBottom: 4 }}>{dataset.samples.toLocaleString()}</div>
              <div style={{ fontSize: 12, color: T.textDim }}>Total Samples</div>
            </Card>
            <Card className="p-4" style={{ textAlign: 'center' }}>
              <div style={{ fontSize: 24, fontWeight: 'bold', color: T.primary, marginBottom: 4 }}>{dataset.contributors}</div>
              <div style={{ fontSize: 12, color: T.textDim }}>Contributors</div>
            </Card>
            <Card className="p-4" style={{ textAlign: 'center' }}>
              <div style={{ fontSize: 24, fontWeight: 'bold', color: T.amber, marginBottom: 4 }}>{dataset.size}</div>
              <div style={{ fontSize: 12, color: T.textDim }}>Dataset Size</div>
            </Card>
            <Card className="p-4" style={{ textAlign: 'center' }}>
              <div style={{ fontSize: 24, fontWeight: 'bold', color: T.text, marginBottom: 4 }}>⭐ {dataset.seller.rating}</div>
              <div style={{ fontSize: 12, color: T.textDim }}>Seller Rating</div>
            </Card>
          </div>
        </div>

        {/* Tabs */}
        <div style={{ borderBottom: `1px solid ${T.border}`, marginBottom: 24 }}>
          <div style={{ display: 'flex', gap: 4 }}>
            {[
              { id: 'overview', label: 'Overview' },
              { id: 'samples', label: 'Sample Data' },
              { id: 'licensing', label: 'Licensing Terms' },
              { id: 'provenance', label: 'Data Provenance' },
              { id: 'market', label: 'Market' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as Tab)}
                style={{
                  padding: '12px 24px',
                  borderBottom: activeTab === tab.id ? `2px solid ${T.green}` : '2px solid transparent',
                  transition: 'all 0.15s',
                  fontSize: 14,
                  fontWeight: 600,
                  color: activeTab === tab.id ? T.green : T.textDim,
                  background: activeTab === tab.id ? `${T.greenLight}` : 'transparent',
                  border: 'none',
                  borderBottom: activeTab === tab.id ? `2px solid ${T.green}` : '2px solid transparent',
                  cursor: 'pointer'
                }}
                onMouseEnter={(e) => {
                  if (activeTab !== tab.id) {
                    e.currentTarget.style.color = T.text;
                    e.currentTarget.style.background = T.surface;
                  }
                }}
                onMouseLeave={(e) => {
                  if (activeTab !== tab.id) {
                    e.currentTarget.style.color = T.textDim;
                    e.currentTarget.style.background = 'transparent';
                  }
                }}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: 24 }}>
          <style>{`
            @media (min-width: 1024px) {
              .dataset-detail-grid {
                grid-template-columns: 2fr 1fr;
              }
            }
          `}</style>
          <div className="dataset-detail-grid" style={{ display: 'grid', gap: 24 }}>
          {/* Left Column - Tab Content */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
            {/* Overview Tab */}
            {activeTab === 'overview' && (
              <>
                <Card className="p-6">
                  <h3 style={{ fontSize: 20, fontWeight: 'bold', color: T.text, marginBottom: 16 }}>What's Included</h3>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 12 }}>
                    {[
                      'Raw dataset files (JSON/CSV/Audio)',
                      'Metadata and annotations',
                      'Quality verification reports',
                      'Contributor demographics',
                      'API access (optional)',
                      'Technical support',
                      'License certificate',
                      'Usage analytics dashboard'
                    ].map((item, i) => (
                      <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 8, fontSize: 14, color: T.textMid }}>
                        <CheckIcon style={{ width: 20, height: 20, color: T.green, flexShrink: 0, marginTop: 2 }} />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </Card>

                <Card className="p-6">
                  <h3 style={{ fontSize: 20, fontWeight: 'bold', color: T.text, marginBottom: 16 }}>About the Seller</h3>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
                    <div style={{
                      width: 48,
                      height: 48,
                      borderRadius: 12,
                      background: T.green,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}>
                      <UserGroupIcon style={{ width: 24, height: 24, color: 'white' }} />
                    </div>
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
                        <span style={{ fontSize: 16, fontWeight: 'bold', color: T.text }}>{dataset.seller.name}</span>
                        {dataset.seller.type === 'union' ? (
                          <Badge color="success">Data Provider</Badge>
                        ) : (
                          <Badge color="info">Independent</Badge>
                        )}
                      </div>
                      <div style={{ fontSize: 14, color: T.textMid }}>⭐ {dataset.seller.rating}/5.0 • {dataset.contributors} contributors</div>
                    </div>
                  </div>
                  <p style={{ fontSize: 14, color: T.textMid, lineHeight: 1.5 }}>
                    {dataset.seller.type === 'union'
                      ? 'Professional data provider with verified contributors and quality oversight. All data is reviewed and verified before listing.'
                      : 'Independent data contributor with verified quality standards.'}
                  </p>
                </Card>
              </>
            )}

            {/* Samples Tab */}
            {activeTab === 'samples' && (
              <>
                <Card className="p-6">
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
                    <h3 style={{ fontSize: 20, fontWeight: 'bold', color: T.text }}>Sample Preview</h3>
                    <Button variant="ghost" onClick={handleDownloadSample} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <ArrowDownTrayIcon style={{ width: 20, height: 20 }} />
                      Download Sample Pack
                    </Button>
                  </div>
                  <p style={{ fontSize: 14, color: T.textDim, marginBottom: 24 }}>
                    Preview representative samples from this dataset. Download the full sample pack (10 samples, ~2MB) to evaluate quality.
                  </p>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                    {dataset.samples_preview.map((sample, i) => (
                      <div key={i} style={{
                        background: T.bg,
                        border: `1px solid ${T.border}`,
                        borderRadius: 8,
                        padding: 16
                      }}>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 }}>
                          <div style={{ fontSize: 12, color: T.textDim, fontFamily: MONO, textTransform: 'uppercase' }}>
                            Sample #{i + 1} • {sample.type}
                          </div>
                          <Badge color="success">Verified</Badge>
                        </div>
                        <div style={{
                          fontSize: 14,
                          color: T.text,
                          fontFamily: MONO,
                          lineHeight: 1.5,
                          background: T.surface,
                          padding: 12,
                          borderRadius: 6
                        }}>
                          {sample.preview}
                        </div>
                      </div>
                    ))}
                  </div>
                </Card>

                <Card className="p-6 bg-info-dim border-info-border">
                  <div className="flex items-start gap-3">
                    <ShieldCheckIcon className="w-6 h-6 text-info flex-shrink-0" />
                    <div>
                      <div className="font-bold text-text mb-1">Sample Pack Includes</div>
                      <ul className="text-sm text-text-mid space-y-1">
                        <li>• 10 representative samples from the full dataset</li>
                        <li>• Metadata and annotation files</li>
                        <li>• Quality metrics report</li>
                        <li>• Format documentation</li>
                      </ul>
                    </div>
                  </div>
                </Card>
              </>
            )}

            {/* Licensing Tab */}
            {activeTab === 'licensing' && (
              <>
                <Card className="p-6">
                  <h3 className="text-xl font-bold text-text mb-4">License Agreement</h3>

                  <div className="space-y-6">
                    <div>
                      <h4 className="font-bold text-text mb-2">Grant of License</h4>
                      <p className="text-sm text-text-mid leading-relaxed">
                        Upon purchase, you are granted a non-exclusive, non-transferable license to use this dataset
                        for the duration specified in your selected tier. The license permits use for commercial AI
                        model training, development, and research purposes.
                      </p>
                    </div>

                    <div>
                      <h4 className="font-bold text-text mb-2">Permitted Uses</h4>
                      <ul className="text-sm text-text-mid space-y-1">
                        <li className="flex items-start gap-2">
                          <CheckIcon className="w-4 h-4 text-success mt-0.5 flex-shrink-0" />
                          <span>Training machine learning and AI models</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckIcon className="w-4 h-4 text-success mt-0.5 flex-shrink-0" />
                          <span>Research and development purposes</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckIcon className="w-4 h-4 text-success mt-0.5 flex-shrink-0" />
                          <span>Commercial deployment of trained models</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckIcon className="w-4 h-4 text-success mt-0.5 flex-shrink-0" />
                          <span>Internal testing and evaluation</span>
                        </li>
                      </ul>
                    </div>

                    <div>
                      <h4 className="font-bold text-text mb-2">Restrictions</h4>
                      <ul className="text-sm text-text-mid space-y-1">
                        <li className="flex items-start gap-2">
                          <span className="text-danger mt-0.5">✗</span>
                          <span>Redistribution or resale of raw dataset</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-danger mt-0.5">✗</span>
                          <span>Sublicensing to third parties</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-danger mt-0.5">✗</span>
                          <span>Reverse engineering to identify individuals</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-danger mt-0.5">✗</span>
                          <span>Use for surveillance or discriminatory purposes</span>
                        </li>
                      </ul>
                    </div>

                    <div>
                      <h4 className="font-bold text-text mb-2">License Duration</h4>
                      <p className="text-sm text-text-mid leading-relaxed">
                        Your license is valid for the duration selected at purchase (30, 90, or 365 days). Models
                        trained during the license period may continue to be used after expiration. To access updated
                        data or extend usage rights, renew your license through the Buyer Portal.
                      </p>
                    </div>

                    <div>
                      <h4 className="font-bold text-text mb-2">Attribution & Compliance</h4>
                      <p className="text-sm text-text-mid leading-relaxed mb-2">
                        You must maintain attribution to the data source as specified in the license certificate.
                        All data is sourced with verified consent and complies with applicable data protection regulations.
                      </p>
                    </div>
                  </div>
                </Card>

                <Card className="p-6 bg-warning-dim border-warning-border">
                  <div className="flex items-start gap-3">
                    <DocumentTextIcon className="w-6 h-6 text-warning flex-shrink-0" />
                    <div>
                      <div className="font-bold text-text mb-1">Full License Certificate</div>
                      <p className="text-sm text-text-mid">
                        Upon checkout, you'll receive a detailed license certificate with unique ID, terms, and
                        proof of purchase for your records and compliance documentation.
                      </p>
                    </div>
                  </div>
                </Card>
              </>
            )}

            {/* Provenance Tab */}
            {activeTab === 'provenance' && (
              <>
                <Card className="p-6">
                  <h3 className="text-xl font-bold text-text mb-4">Data Source & Collection</h3>

                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <MapPinIcon className="w-5 h-5 text-success mt-0.5 flex-shrink-0" />
                      <div>
                        <div className="font-semibold text-text mb-1">Geographic Source</div>
                        <div className="text-sm text-text-mid">
                          {dataset.type === 'voice'
                            ? 'Contributors from North India (Delhi, UP, Haryana, Punjab). Urban and semi-urban regions.'
                            : 'Multiple regions across India with demographic diversity'}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <CalendarIcon className="w-5 h-5 text-success mt-0.5 flex-shrink-0" />
                      <div>
                        <div className="font-semibold text-text mb-1">Collection Period</div>
                        <div className="text-sm text-text-mid">
                          Collected between Jan 2024 - Present. Continuously updated with new contributions.
                        </div>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <UserGroupIcon className="w-5 h-5 text-success mt-0.5 flex-shrink-0" />
                      <div>
                        <div className="font-semibold text-text mb-1">Contributor Profile</div>
                        <div className="text-sm text-text-mid">
                          {dataset.contributors} verified contributors • Ages 18-65 • Gender balanced • Native speakers
                        </div>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <ShieldCheckIcon className="w-5 h-5 text-success mt-0.5 flex-shrink-0" />
                      <div>
                        <div className="font-semibold text-text mb-1">Consent & Verification</div>
                        <div className="text-sm text-text-mid">
                          All contributors provided explicit consent for commercial AI training use. Identity verified, consent documented.
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>

                <Card className="p-6">
                  <h3 className="text-xl font-bold text-text mb-4">Quality Metrics</h3>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-background p-4 rounded-lg">
                      <div className="text-xs text-text-dim mb-1">Quality Score</div>
                      <div className="text-2xl font-bold text-success">94/100</div>
                    </div>
                    <div className="bg-background p-4 rounded-lg">
                      <div className="text-xs text-text-dim mb-1">Verification Rate</div>
                      <div className="text-2xl font-bold text-success">98%</div>
                    </div>
                    <div className="bg-background p-4 rounded-lg">
                      <div className="text-xs text-text-dim mb-1">Noise Level</div>
                      <div className="text-2xl font-bold text-info">Low</div>
                    </div>
                    <div className="bg-background p-4 rounded-lg">
                      <div className="text-xs text-text-dim mb-1">Format Consistency</div>
                      <div className="text-2xl font-bold text-success">100%</div>
                    </div>
                  </div>

                  <div className="mt-4 pt-4 border-t border-border">
                    <div className="text-sm font-semibold text-text mb-2">Quality Assurance Process</div>
                    <ul className="text-sm text-text-mid space-y-1">
                      <li>• Manual review of 15% random sample</li>
                      <li>• Automated format and quality checks on 100%</li>
                      <li>• Duplicate detection and removal</li>
                      <li>• Noise and background filtering (for audio)</li>
                      <li>• Metadata validation and enrichment</li>
                    </ul>
                  </div>
                </Card>

                <Card className="p-6">
                  <div className="flex items-start gap-3">
                    <ChartBarIcon className="w-6 h-6 text-info flex-shrink-0" />
                    <div>
                      <h3 className="text-base font-bold text-text mb-2">Provider Track Record</h3>
                      <div className="grid grid-cols-3 gap-4 text-center">
                        <div>
                          <div className="text-lg font-bold text-text">18</div>
                          <div className="text-xs text-text-dim">Active Deals</div>
                        </div>
                        <div>
                          <div className="text-lg font-bold text-text">₹8.2M</div>
                          <div className="text-xs text-text-dim">Revenue Distributed</div>
                        </div>
                        <div>
                          <div className="text-lg font-bold text-success">4.8/5</div>
                          <div className="text-xs text-text-dim">Buyer Rating</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>
              </>
            )}

            {/* Market Tab */}
            {activeTab === 'market' && (
              <>
                {/* Price Ticker */}
                <Card className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-bold text-text">Market Price</h3>
                    {mockMarketData.priceChangePercent >= 0 ? (
                      <Badge color="success">
                        <ArrowTrendingUpIcon className="w-4 h-4 inline mr-1" />
                        +{mockMarketData.priceChangePercent.toFixed(2)}%
                      </Badge>
                    ) : (
                      <Badge color="danger">
                        <ArrowTrendingDownIcon className="w-4 h-4 inline mr-1" />
                        {mockMarketData.priceChangePercent.toFixed(2)}%
                      </Badge>
                    )}
                  </div>

                  <div className="mb-4">
                    <div className="text-4xl font-bold text-success font-mono mb-2">
                      ₹{mockMarketData.currentPrice}
                      <span className="text-sm text-text-dim ml-2">per sample</span>
                    </div>
                    <div className="text-sm text-text-mid">
                      24h Change: <span className={mockMarketData.priceChange24h >= 0 ? 'text-success' : 'text-danger'}>
                        {mockMarketData.priceChange24h >= 0 ? '+' : ''}₹{mockMarketData.priceChange24h}
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-4 pt-4 border-t border-border">
                    <div>
                      <div className="text-xs text-text-dim mb-1">24h High</div>
                      <div className="text-base font-bold text-text">₹{mockMarketData.high24h}</div>
                    </div>
                    <div>
                      <div className="text-xs text-text-dim mb-1">24h Low</div>
                      <div className="text-base font-bold text-text">₹{mockMarketData.low24h}</div>
                    </div>
                    <div>
                      <div className="text-xs text-text-dim mb-1">24h Volume</div>
                      <div className="text-base font-bold text-text">{mockMarketData.volume24h.toLocaleString()}</div>
                    </div>
                  </div>
                </Card>

                {/* Price History Chart */}
                <Card className="p-6">
                  <h3 className="text-xl font-bold text-text mb-4">7-Day Price History</h3>
                  <ResponsiveContainer width="100%" height={200}>
                    <LineChart data={priceHistory}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#E1E4E8" />
                      <XAxis
                        dataKey="date"
                        tick={{ fill: '#6B7280', fontSize: 12 }}
                        stroke="#E1E4E8"
                      />
                      <YAxis
                        tick={{ fill: '#6B7280', fontSize: 12 }}
                        stroke="#E1E4E8"
                        domain={['dataMin - 10', 'dataMax + 10']}
                      />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: '#FFFFFF',
                          border: '1px solid #E1E4E8',
                          borderRadius: '8px',
                          fontSize: '12px'
                        }}
                        formatter={(value) => [`₹${value}`, 'Price']}
                      />
                      <Line
                        type="monotone"
                        dataKey="price"
                        stroke="#059669"
                        strokeWidth={2}
                        dot={{ fill: '#059669', r: 4 }}
                        activeDot={{ r: 6 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </Card>

                {/* Order Book */}
                <Card className="p-6">
                  <h3 className="text-xl font-bold text-text mb-4">Order Book</h3>

                  {/* Asks (Sellers) */}
                  <div className="mb-4">
                    <div className="text-xs font-semibold text-text-dim uppercase tracking-wide mb-2">
                      Asks (Sellers)
                    </div>
                    <div className="space-y-2">
                      {mockMarketData.asks.slice(0, 3).map((ask) => (
                        <div key={ask.id} className="flex items-center justify-between bg-danger-dim/30 border border-danger-border/50 rounded p-2">
                          <span className="text-sm font-bold text-danger font-mono">₹{ask.price}</span>
                          <span className="text-xs text-text-mid">× {ask.quantity} samples</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Spread */}
                  <div className="flex items-center justify-center py-3 my-2 border-y border-border">
                    <div className="text-sm text-text-mid">
                      Spread: <span className="font-bold text-text font-mono">₹{spread}</span>
                    </div>
                  </div>

                  {/* Bids (Buyers) */}
                  <div>
                    <div className="text-xs font-semibold text-text-dim uppercase tracking-wide mb-2">
                      Bids (Buyers)
                    </div>
                    <div className="space-y-2">
                      {mockMarketData.bids.slice(0, 3).map((bid) => (
                        <div key={bid.id} className="flex items-center justify-between bg-success-dim/30 border border-success-border/50 rounded p-2">
                          <span className="text-sm font-bold text-success font-mono">₹{bid.price}</span>
                          <span className="text-xs text-text-mid">× {bid.quantity} samples</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </Card>

                {/* Place Bid */}
                <Card className="p-6 bg-success-dim/20 border-success-border">
                  <div className="flex items-center gap-2 mb-4">
                    <BanknotesIcon className="w-6 h-6 text-success" />
                    <h3 className="text-xl font-bold text-text">Place Your Bid</h3>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-xs font-semibold text-text-dim uppercase tracking-wide mb-1">
                        Price per Sample (₹)
                      </label>
                      <Input
                        type="number"
                        value={bidPrice}
                        onChange={(e) => setBidPrice(e.target.value)}
                        placeholder="e.g., 845"
                        className="font-mono"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-text-dim uppercase tracking-wide mb-1">
                        Quantity (samples)
                      </label>
                      <Input
                        type="number"
                        value={bidQuantity}
                        onChange={(e) => setBidQuantity(e.target.value)}
                        placeholder="e.g., 500"
                        className="font-mono"
                      />
                    </div>

                    {bidPrice && bidQuantity && (
                      <div className="pt-3 border-t border-border">
                        <div className="flex items-center justify-between mb-3">
                          <span className="text-sm text-text-dim">Total Cost</span>
                          <span className="text-xl font-bold text-success font-mono">
                            ₹{(parseFloat(bidPrice) * parseInt(bidQuantity)).toLocaleString()}
                          </span>
                        </div>
                      </div>
                    )}

                    <Button onClick={handlePlaceBid} className="w-full">
                      Submit Bid
                    </Button>

                    <p className="text-xs text-text-dim text-center">
                      Your bid will be added to the order book. You'll be notified if it gets filled.
                    </p>
                  </div>
                </Card>

                {/* Recent Activity */}
                <Card className="p-6">
                  <h3 className="text-base font-bold text-text mb-4">Recent Activity</h3>
                  <div className="space-y-2">
                    {mockMarketData.recentTrades.map((trade) => {
                      const timeAgo = Math.floor((Date.now() - trade.timestamp.getTime()) / 1000 / 60);
                      return (
                        <div key={trade.id} className="flex items-center justify-between py-2 border-b border-border last:border-0">
                          <div className="flex items-center gap-2">
                            <CheckIcon className="w-4 h-4 text-success" />
                            <span className="text-sm text-text">
                              Filled at <span className="font-bold font-mono">₹{trade.price}</span>
                            </span>
                          </div>
                          <div className="text-xs text-text-dim">
                            {trade.quantity} samples • {timeAgo}m ago
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </Card>
              </>
            )}
          </div>

          {/* Right Column - Pricing (Sticky) */}
          <div>
            {dataset.pricingModel === 'public' && dataset.pricing ? (
              <Card className="p-6" style={{ position: 'sticky', top: 16 }}>
                <h3 style={{ fontSize: 18, fontWeight: 'bold', color: T.text, marginBottom: 16 }}>Select License Tier</h3>

                <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 24 }}>
                  {dataset.pricing.tiers.map((tier, i) => (
                    <button
                      key={i}
                      onClick={() => setSelectedTier(i)}
                      style={{
                        width: '100%',
                        padding: 16,
                        borderRadius: 8,
                        border: selectedTier === i ? `2px solid ${T.green}` : `2px solid ${T.border}`,
                        background: selectedTier === i ? T.greenLight : T.surface,
                        transition: 'all 0.15s',
                        textAlign: 'left',
                        cursor: 'pointer'
                      }}
                      onMouseEnter={(e) => {
                        if (selectedTier !== i) e.currentTarget.style.borderColor = T.textMid;
                      }}
                      onMouseLeave={(e) => {
                        if (selectedTier !== i) e.currentTarget.style.borderColor = T.border;
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 }}>
                        <span style={{ fontSize: 16, fontWeight: 'bold', color: T.text }}>
                          {tier.duration} Days
                        </span>
                        {tier.discount && (
                          <Badge color="success">
                            Save {tier.discount}%
                          </Badge>
                        )}
                      </div>
                      <div style={{ display: 'flex', alignItems: 'baseline', gap: 8 }}>
                        <span style={{ fontSize: 20, fontWeight: 'bold', color: T.green, fontFamily: MONO }}>
                          ₹{(tier.price / 1000).toFixed(0)}K
                        </span>
                        {tier.discount && dataset.pricing && (
                          <span style={{ fontSize: 14, color: T.textDim, textDecoration: 'line-through' }}>
                            ₹{(dataset.pricing.base * (tier.duration / 30) / 1000).toFixed(0)}K
                          </span>
                        )}
                      </div>
                    </button>
                  ))}
                </div>

                <Button
                  onClick={() => onCheckout(dataset.id, selectedTier)}
                  style={{ width: '100%', marginBottom: 16 }}
                >
                  Proceed to Checkout →
                </Button>

                <div style={{
                  fontSize: 12,
                  color: T.textDim,
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 8,
                  paddingTop: 16,
                  borderTop: `1px solid ${T.border}`
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <ClockIcon style={{ width: 16, height: 16 }} />
                    <span>Instant access after payment</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <CheckIcon style={{ width: 16, height: 16 }} />
                    <span>Secure payment via Razorpay</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <ShieldCheckIcon style={{ width: 16, height: 16 }} />
                    <span>Legal compliance guaranteed</span>
                  </div>
                </div>
              </Card>
            ) : (
              <Card className="p-6" style={{ position: 'sticky', top: 16 }}>
                <div style={{ marginBottom: 16 }}>
                  <Badge color="warning">Custom Pricing</Badge>
                </div>
                <h3 style={{ fontSize: 18, fontWeight: 'bold', color: T.text, marginBottom: 12 }}>Request Quote</h3>
                <p style={{ fontSize: 14, color: T.textMid, marginBottom: 24, lineHeight: 1.5 }}>
                  This dataset uses custom pricing. Submit a request with your use case and requirements
                  to receive a tailored quote.
                </p>

                <Button
                  onClick={() => onRequestQuote(dataset.id)}
                  variant="subtle"
                  style={{ width: '100%', marginBottom: 16 }}
                >
                  Request Custom Quote →
                </Button>

                <div style={{
                  fontSize: 12,
                  color: T.textDim,
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 8,
                  paddingTop: 16,
                  borderTop: `1px solid ${T.border}`
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <ClockIcon style={{ width: 16, height: 16 }} />
                    <span>Response within 2 business days</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <CheckIcon style={{ width: 16, height: 16 }} />
                    <span>Flexible terms and pricing</span>
                  </div>
                </div>
              </Card>
            )}
          </div>
          </div>
        </div>
      </div>
    </div>
  );
}
