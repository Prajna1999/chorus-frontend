'use client';

import { useState } from 'react';
import { MarketplaceBrowse } from './MarketplaceBrowse';
import { DatasetDetail } from './DatasetDetail';
import { Checkout } from './Checkout';
import { RequestQuote } from './RequestQuote';
import { BuyerPortal } from './BuyerPortal';
import type { Dataset } from '@/types/marketplace';

type View =
  | { type: 'browse' }
  | { type: 'detail'; dataset: Dataset }
  | { type: 'checkout'; dataset: Dataset; tierId: number }
  | { type: 'request'; dataset: Dataset }
  | { type: 'portal' }
  | { type: 'success' };

interface MarketplaceProps {
  onBackToLanding: () => void;
}

export function Marketplace({ onBackToLanding }: MarketplaceProps) {
  const [view, setView] = useState<View>({ type: 'browse' });

  if (view.type === 'browse') {
    return (
      <MarketplaceBrowse
        onSelectDataset={(dataset) => setView({ type: 'detail', dataset })}
        onGoToPortal={() => setView({ type: 'portal' })}
        onBackToLanding={onBackToLanding}
      />
    );
  }

  if (view.type === 'detail') {
    return (
      <DatasetDetail
        dataset={view.dataset}
        onBack={() => setView({ type: 'browse' })}
        onCheckout={(datasetId, tierId) => {
          setView({ type: 'checkout', dataset: view.dataset, tierId });
        }}
        onRequestQuote={(datasetId) => {
          setView({ type: 'request', dataset: view.dataset });
        }}
        onGoToPortal={() => setView({ type: 'portal' })}
      />
    );
  }

  if (view.type === 'checkout') {
    return (
      <Checkout
        dataset={view.dataset}
        tierId={view.tierId}
        onBack={() => setView({ type: 'detail', dataset: view.dataset })}
        onComplete={() => setView({ type: 'success' })}
      />
    );
  }

  if (view.type === 'request') {
    return (
      <RequestQuote
        dataset={view.dataset}
        onBack={() => setView({ type: 'detail', dataset: view.dataset })}
        onSubmit={() => setView({ type: 'success' })}
      />
    );
  }

  if (view.type === 'portal') {
    return (
      <BuyerPortal
        onBack={() => setView({ type: 'browse' })}
        onRenewLicense={(datasetId) => {
          const dataset = require('@/constants/marketplaceData').MOCK_DATASETS.find((ds: any) => ds.id === datasetId);
          if (dataset) {
            setView({ type: 'detail', dataset });
          }
        }}
        onAcceptQuote={(request) => {
          const dataset = require('@/constants/marketplaceData').MOCK_DATASETS.find((ds: any) => ds.id === request.datasetId);
          if (dataset && request.quote) {
            // Create a temporary checkout-like flow for quoted requests
            alert(`Proceeding to payment for ${dataset.name}\n\nQuoted Price: ₹${request.quote.price.toLocaleString()}\nDuration: ${request.quote.duration} days\n\nIn production, this would go to checkout with the custom quote.`);
            setView({ type: 'success' });
          }
        }}
      />
    );
  }

  // Success page
  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <div className="text-center max-w-md mx-auto px-6">
        <div className="w-16 h-16 bg-success-dim rounded-full flex items-center justify-center mx-auto mb-4">
          <svg className="w-8 h-8 text-success" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h2 className="text-4xl font-bold text-text mb-3">
          {view.type === 'success' ? 'Success!' : ''}
        </h2>
        <p className="text-sm text-text-mid mb-8">
          Check your buyer portal for access details and download links.
        </p>
        <div className="flex gap-3 justify-center">
          <button
            onClick={() => setView({ type: 'portal' })}
            className="px-6 py-3 bg-success text-white rounded-lg font-bold text-lg hover:bg-success-dark transition-colors"
          >
            Go to Portal
          </button>
          <button
            onClick={() => setView({ type: 'browse' })}
            className="px-6 py-3 border border-border text-text-mid rounded-lg font-bold text-lg hover:bg-background transition-colors"
          >
            Browse More
          </button>
        </div>
      </div>
    </div>
  );
}
