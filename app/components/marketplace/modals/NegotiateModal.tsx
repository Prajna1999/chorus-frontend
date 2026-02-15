'use client';

import { useState } from 'react';
import { Card } from '@/app/components/ui/Card';
import { Button } from '@/app/components/ui/Button';
import { Textarea } from '@/app/components/ui/Textarea';
import { Input } from '@/app/components/ui/Input';
import { Label } from '@/app/components/ui/Label';
import { XMarkIcon, PaperAirplaneIcon } from '@heroicons/react/24/outline';

interface NegotiateModalProps {
  datasetName: string;
  currentQuote: number;
  onClose: () => void;
  onSubmit: (counterOffer: number, message: string) => void;
}

export function NegotiateModal({ datasetName, currentQuote, onClose, onSubmit }: NegotiateModalProps) {
  const [counterOffer, setCounterOffer] = useState(currentQuote.toString());
  const [message, setMessage] = useState('');

  const handleSubmit = () => {
    if (!counterOffer || !message.trim()) {
      alert('Please provide both a counter offer and message');
      return;
    }
    onSubmit(parseInt(counterOffer), message);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-text/50 flex items-center justify-center z-50 p-4" onClick={onClose}>
      <div onClick={(e) => e.stopPropagation()}>
        <Card className="max-w-lg w-full">
          <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="text-2xl font-bold text-text mb-2">Negotiate Quote</h3>
            <p className="text-sm text-text-dim">{datasetName}</p>
          </div>
          <button onClick={onClose} className="text-text-dim hover:text-text">
            <XMarkIcon className="w-5 h-5" />
          </button>
        </div>

        <div className="bg-background border border-border rounded p-3 mb-4 text-base">
          <div className="flex justify-between mb-1">
            <span className="text-text-dim">Current Quote:</span>
            <span className="font-bold text-lg text-text font-mono">₹{currentQuote.toLocaleString()}</span>
          </div>
        </div>

        <div className="space-y-3 mb-4">
          <div>
            <Label>Your Counter Offer *</Label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-text-mid">₹</span>
              <Input
                type="number"
                value={counterOffer}
                onChange={(e) => setCounterOffer(e.target.value)}
                placeholder="120000"
                className="pl-7"
              />
            </div>
            <div className="text-sm text-text-dim mt-1 font-semibold">
              {parseInt(counterOffer) < currentQuote && (
                <span className="text-success">
                  ↓ {(((currentQuote - parseInt(counterOffer)) / currentQuote) * 100).toFixed(0)}% lower
                </span>
              )}
              {parseInt(counterOffer) > currentQuote && (
                <span className="text-danger">
                  ↑ {(((parseInt(counterOffer) - currentQuote) / currentQuote) * 100).toFixed(0)}% higher
                </span>
              )}
            </div>
          </div>

          <div>
            <Label>Message to Seller *</Label>
            <Textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Explain your counter offer. Be professional and specific about your requirements or budget constraints..."
              rows={5}
            />
            <div className="text-sm text-text-dim mt-1">
              {message.length}/500 characters
            </div>
          </div>
        </div>

        <div className="bg-info-dim border border-info-border rounded p-3 mb-4 text-base text-info">
          <strong>💡 Negotiation Tips:</strong>
          <ul className="mt-1 space-y-0.5 ml-4 list-disc">
            <li>Be specific about your use case and volume needs</li>
            <li>Mention if you're a research institution or startup</li>
            <li>Consider longer license duration for better rates</li>
            <li>Be respectful - contributors set fair prices</li>
          </ul>
        </div>

        <div className="flex gap-2">
          <Button variant="ghost" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleSubmit} className="flex-1">
            <PaperAirplaneIcon className="w-5 h-5 inline mr-1" /> Send Counter Offer
          </Button>
        </div>
        </Card>
      </div>
    </div>
  );
}
