'use client';

import { useState } from 'react';
import { Card } from '@/app/components/ui/Card';
import { Button } from '@/app/components/ui/Button';
import { Input } from '@/app/components/ui/Input';
import { Label } from '@/app/components/ui/Label';
import { Badge } from '@/app/components/ui/Badge';
import { Divider } from '@/app/components/ui/Divider';
import { T, SANS, MONO } from '@/lib/theme';
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
            <span style={{ fontSize: 14, fontWeight: 'bold', fontFamily: MONO, letterSpacing: '0.05em' }}>CHORUS</span>
          </div>
        </div>
        <Badge color="success">SECURE CHECKOUT</Badge>
      </nav>

      <div style={{ maxWidth: 960, margin: '0 auto', padding: '32px 24px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: 24 }}>
          <style>{`
            @media (min-width: 1024px) {
              .checkout-grid {
                grid-template-columns: 2fr 1fr;
              }
            }
          `}</style>
          <div className="checkout-grid" style={{ display: 'grid', gap: 24 }}>
          {/* Left - Checkout Form */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <div>
              <h1 style={{ fontSize: 24, fontWeight: 'bold', color: T.text, marginBottom: 8 }}>Complete Purchase</h1>
              <p style={{ fontSize: 14, color: T.textMid }}>
                Secure your license for {dataset.name}
              </p>
            </div>

            {/* Billing Info */}
            <Card>
              <h3 style={{ fontSize: 14, fontWeight: 'bold', color: T.text, marginBottom: 12 }}>Billing Information</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
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
                  <Input placeholder="Street address" style={{ marginBottom: 8 }} />
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 8 }}>
                    <Input placeholder="City" />
                    <Input placeholder="State" />
                    <Input placeholder="Pincode" />
                  </div>
                </div>
              </div>
            </Card>

            {/* License Terms */}
            <Card>
              <h3 style={{ fontSize: 14, fontWeight: 'bold', color: T.text, marginBottom: 12, display: 'flex', alignItems: 'center', gap: 8 }}>
                <DocumentTextIcon style={{ width: 20, height: 20 }} />
                License Agreement
              </h3>
              <div style={{
                background: T.bg,
                border: `1px solid ${T.border}`,
                borderRadius: 6,
                padding: 16,
                maxHeight: 192,
                overflowY: 'auto',
                fontSize: 14,
                color: T.textMid,
                lineHeight: 1.5,
                marginBottom: 12
              }}>
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

              <label style={{ display: 'flex', alignItems: 'flex-start', gap: 8, cursor: 'pointer' }}>
                <input
                  type="checkbox"
                  checked={agreed}
                  onChange={(e) => setAgreed(e.target.checked)}
                  style={{ marginTop: 4 }}
                />
                <span style={{ fontSize: 14, color: T.textMid }}>
                  I agree to the license terms and DataUnion's Terms of Service
                </span>
              </label>
            </Card>

            {/* Payment */}
            <Card>
              <h3 style={{ fontSize: 14, fontWeight: 'bold', color: T.text, marginBottom: 12, display: 'flex', alignItems: 'center', gap: 8 }}>
                <ShieldCheckIcon style={{ width: 20, height: 20 }} />
                Payment Method
              </h3>
              <div style={{
                background: T.primaryLight,
                border: `1px solid ${T.primary}`,
                borderRadius: 6,
                padding: 12,
                marginBottom: 12
              }}>
                <p style={{ fontSize: 12, color: T.primary }}>
                  Payment processed securely via Razorpay. We accept UPI, cards, net banking, and wallets.
                </p>
              </div>
              <Button
                onClick={handlePayment}
                disabled={!agreed}
                style={{ width: '100%' }}
              >
                Pay ₹{total.toLocaleString()} →
              </Button>
            </Card>
          </div>

          {/* Right - Order Summary */}
          <div>
            <Card style={{ position: 'sticky', top: 16 }}>
              <h3 style={{ fontSize: 14, fontWeight: 'bold', color: T.text, marginBottom: 12 }}>Order Summary</h3>

              <div style={{ marginBottom: 12 }}>
                <div style={{ fontSize: 16, fontWeight: 'bold', color: T.text, marginBottom: 4 }}>{dataset.name}</div>
                <div style={{ fontSize: 14, color: T.textDim }}>
                  {dataset.samples.toLocaleString()} samples • {dataset.size}
                </div>
              </div>

              <Divider />

              <div style={{ display: 'flex', flexDirection: 'column', gap: 8, fontSize: 12, marginBottom: 12 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: T.textDim }}>License Duration</span>
                  <span style={{ color: T.text, fontWeight: 600 }}>{tier.duration} days</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: T.textDim }}>Base Price</span>
                  <span style={{ color: T.text }}>₹{tier.price.toLocaleString()}</span>
                </div>
                {tier.discount && (
                  <div style={{ display: 'flex', justifyContent: 'space-between', color: T.green }}>
                    <span>Discount ({tier.discount}%)</span>
                    <span>-₹{((dataset.pricing!.base * (tier.duration / 30) - tier.price)).toLocaleString()}</span>
                  </div>
                )}
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: T.textDim }}>GST (18%)</span>
                  <span style={{ color: T.text }}>₹{tax.toLocaleString()}</span>
                </div>
              </div>

              <Divider />

              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 14, fontWeight: 'bold', marginBottom: 16 }}>
                <span style={{ color: T.text }}>Total</span>
                <span style={{ color: T.green, fontFamily: MONO }}>₹{total.toLocaleString()}</span>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 8, fontSize: 14, color: T.textDim }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                  <CheckIcon style={{ width: 16, height: 16, color: T.green }} />
                  <span>Instant download access</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                  <CheckIcon style={{ width: 16, height: 16, color: T.green }} />
                  <span>API key included</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                  <CheckIcon style={{ width: 16, height: 16, color: T.green }} />
                  <span>Technical support</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                  <CheckIcon style={{ width: 16, height: 16, color: T.green }} />
                  <span>Invoice & certificate</span>
                </div>
              </div>
            </Card>
          </div>
          </div>
        </div>
      </div>
    </div>
  );
}
