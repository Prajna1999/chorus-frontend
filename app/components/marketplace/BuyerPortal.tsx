'use client';

import { useState } from 'react';
import { Card } from '@/app/components/ui/Card';
import { Badge } from '@/app/components/ui/Badge';
import { Button } from '@/app/components/ui/Button';
import { T, SANS, MONO } from '@/lib/theme';
import { MOCK_LICENSES, MOCK_REQUESTS, MOCK_DATASETS } from '@/constants/marketplaceData';
import { ApiKeyModal } from './modals/ApiKeyModal';
import { DownloadModal } from './modals/DownloadModal';
import { InvoiceModal } from './modals/InvoiceModal';
import { NegotiateModal } from './modals/NegotiateModal';
import {
  ArrowDownTrayIcon,
  KeyIcon,
  ClockIcon,
  CheckCircleIcon,
  XCircleIcon,
  ChatBubbleLeftRightIcon
} from '@heroicons/react/24/outline';
import type { License, DatasetRequest } from '@/types/marketplace';

interface BuyerPortalProps {
  onBack: () => void;
  onRenewLicense: (datasetId: string) => void;
  onAcceptQuote: (request: DatasetRequest) => void;
}

export function BuyerPortal({ onBack, onRenewLicense, onAcceptQuote }: BuyerPortalProps) {
  const [tab, setTab] = useState<'licenses' | 'requests'>('licenses');
  const [showApiKey, setShowApiKey] = useState<License | null>(null);
  const [showDownload, setShowDownload] = useState<License | null>(null);
  const [showInvoice, setShowInvoice] = useState<License | null>(null);
  const [showNegotiate, setShowNegotiate] = useState<DatasetRequest | null>(null);

  const handleNegotiateSubmit = (counterOffer: number, message: string) => {
    alert(`Counter offer submitted!\n\nYour offer: ₹${counterOffer.toLocaleString()}\nMessage: ${message}\n\nThe seller will respond within 2 business days.`);
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
        background: `linear-gradient(to right, ${T.primaryLight}, ${T.greenLight})`
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <div style={{ width: 8, height: 8, borderRadius: '50%', background: T.green, boxShadow: '0 1px 2px 0 rgb(0 0 0 / 0.05)' }} />
          <button
            onClick={onBack}
            style={{
              fontSize: 14,
              fontWeight: 'bold',
              fontFamily: MONO,
              letterSpacing: '0.05em',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              transition: 'color 0.15s',
              color: T.text,
              padding: 0
            }}
            onMouseEnter={e => e.currentTarget.style.color = T.green}
            onMouseLeave={e => e.currentTarget.style.color = T.text}
          >
            CHORUS
          </button>
          <span style={{ marginLeft: 8 }}>
            <Badge color="info">BUYER PORTAL</Badge>
          </span>
        </div>
        <Button variant="ghost" onClick={onBack} style={{ fontSize: 12 }}>
          ← Back to Marketplace
        </Button>
      </nav>

      <div style={{ maxWidth: 1152, margin: '0 auto', padding: '32px 24px' }}>
        {/* Welcome */}
        <div style={{ marginBottom: 24 }}>
          <h1 style={{ fontSize: 36, fontWeight: 'bold', color: T.text, marginBottom: 8 }}>Welcome, Acme AI Labs</h1>
          <p style={{ fontSize: 14, color: T.textMid }}>Manage your licenses and dataset requests</p>
        </div>

        {/* Tabs */}
        <div style={{ display: 'flex', gap: 8, borderBottom: `1px solid ${T.border}`, marginBottom: 24 }}>
          <button
            onClick={() => setTab('licenses')}
            style={{
              padding: '12px 20px',
              fontSize: 18,
              fontWeight: 'bold',
              fontFamily: MONO,
              transition: 'all 0.15s',
              borderBottom: tab === 'licenses' ? `2px solid ${T.green}` : '2px solid transparent',
              color: tab === 'licenses' ? T.text : T.textDim,
              background: 'none',
              border: 'none',
              borderBottom: tab === 'licenses' ? `2px solid ${T.green}` : '2px solid transparent',
              cursor: 'pointer'
            }}
            onMouseEnter={e => { if (tab !== 'licenses') e.currentTarget.style.color = T.textMid; }}
            onMouseLeave={e => { if (tab !== 'licenses') e.currentTarget.style.color = T.textDim; }}
          >
            MY LICENSES ({MOCK_LICENSES.length})
          </button>
          <button
            onClick={() => setTab('requests')}
            style={{
              padding: '12px 20px',
              fontSize: 18,
              fontWeight: 'bold',
              fontFamily: MONO,
              transition: 'all 0.15s',
              borderBottom: tab === 'requests' ? `2px solid ${T.green}` : '2px solid transparent',
              color: tab === 'requests' ? T.text : T.textDim,
              background: 'none',
              border: 'none',
              borderBottom: tab === 'requests' ? `2px solid ${T.green}` : '2px solid transparent',
              cursor: 'pointer'
            }}
            onMouseEnter={e => { if (tab !== 'requests') e.currentTarget.style.color = T.textMid; }}
            onMouseLeave={e => { if (tab !== 'requests') e.currentTarget.style.color = T.textDim; }}
          >
            REQUESTS ({MOCK_REQUESTS.length})
          </button>
        </div>

        {/* Licenses Tab */}
        {tab === 'licenses' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {MOCK_LICENSES.length === 0 ? (
              <Card className="p-6" style={{ textAlign: 'center', padding: '64px 0' }}>
                <p style={{ color: T.textDim, fontSize: 18, marginBottom: 16 }}>No licenses yet</p>
                <Button variant="subtle" onClick={onBack}>
                  Browse Datasets
                </Button>
              </Card>
            ) : (
              MOCK_LICENSES.map((license) => {
                const dataset = MOCK_DATASETS.find(ds => ds.id === license.datasetId);
                if (!dataset) return null;

                const daysLeft = Math.floor(
                  (new Date(license.expiryDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)
                );
                const isExpired = daysLeft < 0;

                return (
                  <Card key={license.id} className="p-4">
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 }}>
                      <div style={{ flex: 1 }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
                          <h3 style={{ fontWeight: 'bold', fontSize: 20, color: T.text }}>{dataset.name}</h3>
                          <Badge color={isExpired ? 'danger' : 'success'}>
                            {isExpired ? 'Expired' : 'Active'}
                          </Badge>
                        </div>
                        <div style={{ fontSize: 14, color: T.textDim, fontFamily: MONO, display: 'flex', gap: 12 }}>
                          <span>License ID: {license.id}</span>
                          <span>•</span>
                          <span>{license.duration} days</span>
                          <span>•</span>
                          <span>Expires: {new Date(license.expiryDate).toLocaleDateString()}</span>
                        </div>
                      </div>
                      <div style={{ textAlign: 'right' }}>
                        <div style={{ fontSize: 16, fontWeight: 'bold', color: T.green, fontFamily: MONO }}>
                          ₹{license.price.toLocaleString()}
                        </div>
                        <div style={{ fontSize: 14, color: T.textDim }}>{license.type}</div>
                      </div>
                    </div>

                    {!isExpired && (
                      <>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12, fontSize: 16 }}>
                          <ClockIcon style={{ width: 20, height: 20, color: T.amber }} />
                          <span style={{ color: T.textMid, fontWeight: 600 }}>
                            {daysLeft} days remaining
                          </span>
                          <div style={{ flex: 1, background: T.border, borderRadius: 9999, height: 8, overflow: 'hidden' }}>
                            <div
                              style={{
                                background: T.green,
                                height: '100%',
                                transition: 'width 0.3s',
                                width: `${(daysLeft / license.duration) * 100}%`
                              }}
                            />
                          </div>
                        </div>

                        <div style={{ display: 'flex', gap: 8 }}>
                          <Button
                            onClick={() => setShowDownload(license)}
                            style={{ flex: 1, fontSize: 12, padding: '8px 16px' }}
                          >
                            <ArrowDownTrayIcon style={{ width: 20, height: 20, display: 'inline', marginRight: 4 }} />
                            Download Dataset
                          </Button>
                          <Button
                            onClick={() => setShowApiKey(license)}
                            variant="ghost"
                            style={{ padding: '8px 16px', fontSize: 12 }}
                          >
                            <KeyIcon style={{ width: 20, height: 20, display: 'inline', marginRight: 4 }} />
                            API Key
                          </Button>
                          <Button
                            onClick={() => setShowInvoice(license)}
                            variant="subtle"
                            style={{ padding: '8px 16px', fontSize: 12 }}
                          >
                            Invoice
                          </Button>
                        </div>

                        <div style={{ marginTop: 12, paddingTop: 12, borderTop: `1px solid ${T.border}`, fontSize: 14, color: T.textDim }}>
                          Downloads: {license.downloadCount} • API calls: 1,247
                        </div>
                      </>
                    )}

                    {isExpired && (
                      <div style={{ display: 'flex', gap: 8 }}>
                        <Button
                          onClick={() => setShowInvoice(license)}
                          variant="subtle"
                          style={{ flex: 1, fontSize: 12 }}
                        >
                          View Invoice
                        </Button>
                        <Button
                          onClick={() => onRenewLicense(dataset.id)}
                          style={{ fontSize: 12 }}
                        >
                          Renew License
                        </Button>
                      </div>
                    )}
                  </Card>
                );
              })
            )}
          </div>
        )}

        {/* Requests Tab */}
        {tab === 'requests' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {MOCK_REQUESTS.length === 0 ? (
              <Card className="p-6" style={{ textAlign: 'center', padding: '64px 0' }}>
                <p style={{ color: T.textDim, fontSize: 18, marginBottom: 16 }}>No pending requests</p>
                <Button variant="subtle" onClick={onBack}>
                  Browse Request-Based Datasets
                </Button>
              </Card>
            ) : (
              MOCK_REQUESTS.map((request) => {
                const dataset = MOCK_DATASETS.find(ds => ds.id === request.datasetId);
                if (!dataset) return null;

                const statusConfig = {
                  pending: { color: 'warning' as const, icon: ClockIcon, label: 'Pending Review' },
                  reviewing: { color: 'info' as const, icon: ChatBubbleLeftRightIcon, label: 'Under Review' },
                  quoted: { color: 'success' as const, icon: CheckCircleIcon, label: 'Quote Received' },
                  accepted: { color: 'success' as const, icon: CheckCircleIcon, label: 'Accepted' },
                  rejected: { color: 'danger' as const, icon: XCircleIcon, label: 'Declined' }
                };

                const config = statusConfig[request.status];
                const StatusIcon = config.icon;

                return (
                  <Card key={request.id} className="p-4">
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 }}>
                      <div style={{ flex: 1 }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
                          <h3 style={{ fontWeight: 'bold', fontSize: 20, color: T.text }}>{dataset.name}</h3>
                          <Badge color={config.color}>
                            <StatusIcon style={{ width: 20, height: 20, display: 'inline', marginRight: 4 }} />
                            {config.label}
                          </Badge>
                        </div>
                        <div style={{ fontSize: 14, color: T.textDim, fontFamily: MONO }}>
                          Request ID: {request.id} • Submitted: {new Date(request.createdAt).toLocaleDateString()}
                        </div>
                      </div>
                    </div>

                    <div style={{
                      background: T.bg,
                      border: `1px solid ${T.border}`,
                      borderRadius: 6,
                      padding: 12,
                      marginBottom: 12,
                      fontSize: 16
                    }}>
                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, color: T.textMid }}>
                        <div>
                          <span style={{ color: T.textDim }}>Use Case:</span> {request.useCase}
                        </div>
                        <div>
                          <span style={{ color: T.textDim }}>Timeline:</span> {request.timeline}
                        </div>
                      </div>
                    </div>

                    {request.quote && (
                      <Card className="p-3" style={{ marginBottom: 12, background: T.greenLight, borderColor: T.green }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 8 }}>
                          <div>
                            <div style={{ fontSize: 16, fontWeight: 'bold', color: T.green, marginBottom: 4 }}>Quote Received</div>
                            <div style={{ fontSize: 14, color: T.textDim }}>
                              Valid until: {new Date(request.quote.validUntil).toLocaleDateString()}
                            </div>
                          </div>
                          <div style={{ textAlign: 'right' }}>
                            <div style={{ fontSize: 24, fontWeight: 'bold', color: T.green, fontFamily: MONO }}>
                              ₹{request.quote.price.toLocaleString()}
                            </div>
                            <div style={{ fontSize: 14, color: T.textDim }}>{request.quote.duration} days</div>
                          </div>
                        </div>
                        <p style={{ fontSize: 14, color: T.textMid, marginBottom: 12 }}>{request.quote.terms}</p>
                        <div style={{ display: 'flex', gap: 8 }}>
                          <Button
                            onClick={() => onAcceptQuote(request)}
                            style={{ flex: 1, fontSize: 12 }}
                          >
                            Accept Quote & Pay
                          </Button>
                          <Button
                            onClick={() => setShowNegotiate(request)}
                            variant="ghost"
                            style={{ padding: '8px 16px', fontSize: 12 }}
                          >
                            Negotiate
                          </Button>
                        </div>
                      </Card>
                    )}

                    {!request.quote && request.status !== 'rejected' && (
                      <div style={{ fontSize: 14, color: T.textDim, display: 'flex', alignItems: 'center', gap: 8 }}>
                        <ClockIcon style={{ width: 20, height: 20 }} />
                        Waiting for seller response...
                      </div>
                    )}
                  </Card>
                );
              })
            )}
          </div>
        )}
      </div>

      {/* Modals */}
      {showApiKey && (
        <ApiKeyModal
          apiKey={showApiKey.apiKey!}
          datasetName={MOCK_DATASETS.find(ds => ds.id === showApiKey.datasetId)?.name || ''}
          onClose={() => setShowApiKey(null)}
        />
      )}

      {showDownload && (
        <DownloadModal
          datasetName={MOCK_DATASETS.find(ds => ds.id === showDownload.datasetId)?.name || ''}
          size={MOCK_DATASETS.find(ds => ds.id === showDownload.datasetId)?.size || ''}
          downloadUrl={showDownload.downloadUrl!}
          onClose={() => setShowDownload(null)}
        />
      )}

      {showInvoice && (
        <InvoiceModal
          license={showInvoice}
          datasetName={MOCK_DATASETS.find(ds => ds.id === showInvoice.datasetId)?.name || ''}
          onClose={() => setShowInvoice(null)}
        />
      )}

      {showNegotiate && showNegotiate.quote && (
        <NegotiateModal
          datasetName={MOCK_DATASETS.find(ds => ds.id === showNegotiate.datasetId)?.name || ''}
          currentQuote={showNegotiate.quote.price}
          onClose={() => setShowNegotiate(null)}
          onSubmit={handleNegotiateSubmit}
        />
      )}
    </div>
  );
}
