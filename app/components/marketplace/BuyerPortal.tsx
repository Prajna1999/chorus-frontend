'use client';

import { useState } from 'react';
import { Card } from '@/app/components/ui/Card';
import { Badge } from '@/app/components/ui/Badge';
import { Button } from '@/app/components/ui/Button';
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
    <div className="min-h-screen bg-background">
      {/* Header */}
      <nav className="px-7 py-4 flex justify-between items-center border-b border-border shadow-sm bg-gradient-to-r from-info/5 to-success/5">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-success shadow-sm" />
          <button
            onClick={onBack}
            className="text-sm font-bold font-mono tracking-wide hover:text-success transition-colors cursor-pointer"
          >
            CHORUS
          </button>
          <Badge color="info" className="ml-2">BUYER PORTAL</Badge>
        </div>
        <Button variant="ghost" onClick={onBack} className="text-xs">
          ← Back to Marketplace
        </Button>
      </nav>

      <div className="max-w-6xl mx-auto px-6 py-8">
        {/* Welcome */}
        <div className="mb-6">
          <h1 className="text-4xl font-bold text-text mb-2">Welcome, Acme AI Labs</h1>
          <p className="text-sm text-text-mid">Manage your licenses and dataset requests</p>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 border-b border-border mb-6">
          <button
            onClick={() => setTab('licenses')}
            className={`px-5 py-3 text-lg font-bold font-mono transition-all border-b-2 ${
              tab === 'licenses'
                ? 'border-success text-text'
                : 'border-transparent text-text-dim hover:text-text-mid'
            }`}
          >
            MY LICENSES ({MOCK_LICENSES.length})
          </button>
          <button
            onClick={() => setTab('requests')}
            className={`px-5 py-3 text-lg font-bold font-mono transition-all border-b-2 ${
              tab === 'requests'
                ? 'border-success text-text'
                : 'border-transparent text-text-dim hover:text-text-mid'
            }`}
          >
            REQUESTS ({MOCK_REQUESTS.length})
          </button>
        </div>

        {/* Licenses Tab */}
        {tab === 'licenses' && (
          <div className="space-y-4">
            {MOCK_LICENSES.length === 0 ? (
              <Card className="text-center py-16">
                <p className="text-text-dim text-lg mb-4">No licenses yet</p>
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
                    <div className="flex justify-between items-start mb-3">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h3 className="font-bold text-xl text-text">{dataset.name}</h3>
                          <Badge color={isExpired ? 'danger' : 'success'}>
                            {isExpired ? 'Expired' : 'Active'}
                          </Badge>
                        </div>
                        <div className="text-sm text-text-dim font-mono space-x-3">
                          <span>License ID: {license.id}</span>
                          <span>•</span>
                          <span>{license.duration} days</span>
                          <span>•</span>
                          <span>Expires: {new Date(license.expiryDate).toLocaleDateString()}</span>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-base font-bold text-success font-mono">
                          ₹{license.price.toLocaleString()}
                        </div>
                        <div className="text-sm text-text-dim">{license.type}</div>
                      </div>
                    </div>

                    {!isExpired && (
                      <>
                        <div className="flex items-center gap-2 mb-3 text-base">
                          <ClockIcon className="w-5 h-5 text-warning" />
                          <span className="text-text-mid font-semibold">
                            {daysLeft} days remaining
                          </span>
                          <div className="flex-1 bg-border rounded-full h-2 overflow-hidden">
                            <div
                              className="bg-success h-full transition-all"
                              style={{ width: `${(daysLeft / license.duration) * 100}%` }}
                            />
                          </div>
                        </div>

                        <div className="flex gap-2">
                          <Button
                            onClick={() => setShowDownload(license)}
                            className="flex-1 text-xs py-2"
                          >
                            <ArrowDownTrayIcon className="w-5 h-5 inline mr-1" />
                            Download Dataset
                          </Button>
                          <Button
                            onClick={() => setShowApiKey(license)}
                            variant="ghost"
                            className="px-4 text-xs py-2"
                          >
                            <KeyIcon className="w-5 h-5 inline mr-1" />
                            API Key
                          </Button>
                          <Button
                            onClick={() => setShowInvoice(license)}
                            variant="subtle"
                            className="px-4 text-xs py-2"
                          >
                            Invoice
                          </Button>
                        </div>

                        <div className="mt-3 pt-3 border-t border-border text-sm text-text-dim">
                          Downloads: {license.downloadCount} • API calls: 1,247
                        </div>
                      </>
                    )}

                    {isExpired && (
                      <div className="flex gap-2">
                        <Button
                          onClick={() => setShowInvoice(license)}
                          variant="subtle"
                          className="flex-1 text-xs"
                        >
                          View Invoice
                        </Button>
                        <Button
                          onClick={() => onRenewLicense(dataset.id)}
                          className="text-xs"
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
          <div className="space-y-4">
            {MOCK_REQUESTS.length === 0 ? (
              <Card className="text-center py-16">
                <p className="text-text-dim text-lg mb-4">No pending requests</p>
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
                    <div className="flex justify-between items-start mb-3">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h3 className="font-bold text-xl text-text">{dataset.name}</h3>
                          <Badge color={config.color}>
                            <StatusIcon className="w-5 h-5 inline mr-1" />
                            {config.label}
                          </Badge>
                        </div>
                        <div className="text-sm text-text-dim font-mono">
                          Request ID: {request.id} • Submitted: {new Date(request.createdAt).toLocaleDateString()}
                        </div>
                      </div>
                    </div>

                    <div className="bg-background border border-border rounded p-3 mb-3 text-base">
                      <div className="grid grid-cols-2 gap-2 text-text-mid">
                        <div>
                          <span className="text-text-dim">Use Case:</span> {request.useCase}
                        </div>
                        <div>
                          <span className="text-text-dim">Timeline:</span> {request.timeline}
                        </div>
                      </div>
                    </div>

                    {request.quote && (
                      <Card className="mb-3 bg-success-dim border-success-border p-3">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <div className="text-base font-bold text-success mb-1">Quote Received</div>
                            <div className="text-sm text-text-dim">
                              Valid until: {new Date(request.quote.validUntil).toLocaleDateString()}
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="text-2xl font-bold text-success font-mono">
                              ₹{request.quote.price.toLocaleString()}
                            </div>
                            <div className="text-sm text-text-dim">{request.quote.duration} days</div>
                          </div>
                        </div>
                        <p className="text-sm text-text-mid mb-3">{request.quote.terms}</p>
                        <div className="flex gap-2">
                          <Button
                            onClick={() => onAcceptQuote(request)}
                            className="flex-1 text-xs"
                          >
                            Accept Quote & Pay
                          </Button>
                          <Button
                            onClick={() => setShowNegotiate(request)}
                            variant="ghost"
                            className="px-4 text-xs"
                          >
                            Negotiate
                          </Button>
                        </div>
                      </Card>
                    )}

                    {!request.quote && request.status !== 'rejected' && (
                      <div className="text-sm text-text-dim flex items-center gap-2">
                        <ClockIcon className="w-5 h-5" />
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
