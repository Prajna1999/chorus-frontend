'use client';

import { useState } from 'react';
import { Card } from '@/app/components/ui/Card';
import { Button } from '@/app/components/ui/Button';
import { Input } from '@/app/components/ui/Input';
import { Label } from '@/app/components/ui/Label';
import { Badge } from '@/app/components/ui/Badge';
import { Divider } from '@/app/components/ui/Divider';
import {
  ArrowLeftIcon,
  CheckIcon,
  ShieldCheckIcon,
  DocumentTextIcon
} from '@heroicons/react/24/outline';
import type { Dataset } from '@/types/marketplace';

interface CheckoutProps {
  dataset: Dataset;
  tierId: number;
  onBack: () => void;
  onComplete: () => void;
}

export function Checkout({ dataset, tierId, onBack, onComplete }: CheckoutProps) {
  const [agreed, setAgreed] = useState(false);
  const tier = dataset.pricing?.tiers[tierId];

  if (!tier) return null;

  const handlePayment = () => {
    // Here you would integrate with Razorpay/Stripe
    console.log('Processing payment...');
    setTimeout(() => onComplete(), 1500);
  };

  const tax = tier.price * 0.18; // 18% GST
  const total = tier.price + tax;

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <nav className="px-7 py-4 flex justify-between items-center border-b border-border shadow-sm bg-surface">
        <div className="flex items-center gap-3">
          <button onClick={onBack} className="text-text-dim hover:text-text transition-colors">
            <ArrowLeftIcon className="w-5 h-5" />
          </button>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-success shadow-sm" />
            <span className="text-sm font-bold font-mono tracking-wide">CHORUS</span>
          </div>
        </div>
        <Badge color="success">SECURE CHECKOUT</Badge>
      </nav>

      <div className="max-w-5xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left - Checkout Form */}
          <div className="lg:col-span-2 space-y-4">
            <div>
              <h1 className="text-2xl font-bold text-text mb-2">Complete Purchase</h1>
              <p className="text-sm text-text-mid">
                Secure your license for {dataset.name}
              </p>
            </div>

            {/* Billing Info */}
            <Card>
              <h3 className="text-sm font-bold text-text mb-3">Billing Information</h3>
              <div className="space-y-3">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <Label>Company Name *</Label>
                    <Input placeholder="Acme AI Labs" />
                  </div>
                  <div>
                    <Label>Email *</Label>
                    <Input type="email" placeholder="billing@acme.ai" />
                  </div>
                </div>

                <div>
                  <Label>GST Number (Optional)</Label>
                  <Input placeholder="22AAAAA0000A1Z5" />
                </div>

                <div>
                  <Label>Billing Address *</Label>
                  <Input placeholder="Street address" className="mb-2" />
                  <div className="grid grid-cols-3 gap-2">
                    <Input placeholder="City" />
                    <Input placeholder="State" />
                    <Input placeholder="Pincode" />
                  </div>
                </div>
              </div>
            </Card>

            {/* License Terms */}
            <Card>
              <h3 className="text-sm font-bold text-text mb-3 flex items-center gap-2">
                <DocumentTextIcon className="w-5 h-5" />
                License Agreement
              </h3>
              <div className="bg-background border border-border rounded p-4 max-h-48 overflow-y-auto text-sm text-text-mid leading-relaxed mb-3">
                <p className="mb-2">
                  <strong>DataUnion Standard License Agreement</strong>
                </p>
                <p className="mb-2">
                  This license grants you the right to use the dataset "{dataset.name}" for
                  <strong> {tier.duration} days</strong> from the date of purchase.
                </p>
                <p className="mb-2">
                  <strong>Permitted Uses:</strong>
                  <br />• Training machine learning models
                  <br />• Research and development
                  <br />• Internal testing and validation
                </p>
                <p className="mb-2">
                  <strong>Restrictions:</strong>
                  <br />• No redistribution or resale of raw data
                  <br />• No sublicensing to third parties
                  <br />• Attribution required in model cards
                </p>
                <p>
                  Contributors retain ownership. You receive a non-exclusive, non-transferable license.
                  Full terms available after purchase.
                </p>
              </div>

              <label className="flex items-start gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={agreed}
                  onChange={(e) => setAgreed(e.target.checked)}
                  className="mt-1"
                />
                <span className="text-sm text-text-mid">
                  I agree to the license terms and DataUnion's Terms of Service
                </span>
              </label>
            </Card>

            {/* Payment */}
            <Card>
              <h3 className="text-sm font-bold text-text mb-3 flex items-center gap-2">
                <ShieldCheckIcon className="w-5 h-5" />
                Payment Method
              </h3>
              <div className="bg-info-dim border border-info-border rounded p-3 mb-3">
                <p className="text-xs text-info">
                  Payment processed securely via Razorpay. We accept UPI, cards, net banking, and wallets.
                </p>
              </div>
              <Button
                onClick={handlePayment}
                disabled={!agreed}
                className="w-full"
              >
                Pay ₹{total.toLocaleString()} →
              </Button>
            </Card>
          </div>

          {/* Right - Order Summary */}
          <div className="lg:col-span-1">
            <Card className="sticky top-4">
              <h3 className="text-sm font-bold text-text mb-3">Order Summary</h3>

              <div className="mb-3">
                <div className="text-base font-bold text-text mb-1">{dataset.name}</div>
                <div className="text-sm text-text-dim">
                  {dataset.samples.toLocaleString()} samples • {dataset.size}
                </div>
              </div>

              <Divider />

              <div className="space-y-2 text-xs mb-3">
                <div className="flex justify-between">
                  <span className="text-text-dim">License Duration</span>
                  <span className="text-text font-semibold">{tier.duration} days</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-text-dim">Base Price</span>
                  <span className="text-text">₹{tier.price.toLocaleString()}</span>
                </div>
                {tier.discount && (
                  <div className="flex justify-between text-success">
                    <span>Discount ({tier.discount}%)</span>
                    <span>-₹{((dataset.pricing!.base * (tier.duration / 30) - tier.price)).toLocaleString()}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span className="text-text-dim">GST (18%)</span>
                  <span className="text-text">₹{tax.toLocaleString()}</span>
                </div>
              </div>

              <Divider />

              <div className="flex justify-between text-sm font-bold mb-4">
                <span className="text-text">Total</span>
                <span className="text-success font-mono">₹{total.toLocaleString()}</span>
              </div>

              <div className="space-y-2 text-sm text-text-dim">
                <div className="flex items-center gap-1">
                  <CheckIcon className="w-4 h-4 text-success" />
                  <span>Instant download access</span>
                </div>
                <div className="flex items-center gap-1">
                  <CheckIcon className="w-4 h-4 text-success" />
                  <span>API key included</span>
                </div>
                <div className="flex items-center gap-1">
                  <CheckIcon className="w-4 h-4 text-success" />
                  <span>Technical support</span>
                </div>
                <div className="flex items-center gap-1">
                  <CheckIcon className="w-4 h-4 text-success" />
                  <span>Invoice & certificate</span>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
