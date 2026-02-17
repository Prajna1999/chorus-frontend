'use client';

import { useState } from 'react';
import { Card } from '@/app/components/ui/Card';
import { Button } from '@/app/components/ui/Button';
import { Input } from '@/app/components/ui/Input';
import { Textarea } from '@/app/components/ui/Textarea';
import { Label } from '@/app/components/ui/Label';
import { Badge } from '@/app/components/ui/Badge';
import { T, SANS, MONO } from '@/lib/theme';
import { ArrowLeftIcon, CheckIcon } from '@heroicons/react/24/outline';
import type { Dataset } from '@/types/marketplace';

interface RequestQuoteProps {
  dataset: Dataset;
  onBack: () => void;
  onSubmit: () => void;
}

export function RequestQuote({ dataset, onBack, onSubmit }: RequestQuoteProps) {
  const [formData, setFormData] = useState({
    companyName: '',
    email: '',
    phone: '',
    contactName: '',
    useCase: '',
    estimatedVolume: '',
    budget: '',
    timeline: '',
    requirements: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would submit the request
    console.log('Quote request:', formData);
    onSubmit();
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
      </nav>

      <div style={{ maxWidth: 768, margin: '0 auto', padding: '32px 24px' }}>
        <div style={{ marginBottom: 24 }}>
          <div style={{ marginBottom: 12 }}>
            <Badge color="warning">REQUEST QUOTE</Badge>
          </div>
          <h1 style={{ fontSize: 24, fontWeight: 'bold', color: T.text, marginBottom: 8 }}>Request Custom Quote</h1>
          <p style={{ fontSize: 14, color: T.textMid }}>
            Submit your requirements for <span style={{ fontWeight: 600, color: T.text }}>{dataset.name}</span> and
            the seller will respond with a tailored quote.
          </p>
        </div>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {/* Company Info */}
          <Card>
            <h3 style={{ fontSize: 14, fontWeight: 'bold', color: T.text, marginBottom: 12 }}>Company Information</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              <div>
                <Label>Company Name *</Label>
                <Input
                  required
                  value={formData.companyName}
                  onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                  placeholder="Acme AI Labs"
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                <div>
                  <Label>Contact Name *</Label>
                  <Input
                    required
                    value={formData.contactName}
                    onChange={(e) => setFormData({ ...formData, contactName: e.target.value })}
                    placeholder="John Doe"
                  />
                </div>
                <div>
                  <Label>Email *</Label>
                  <Input
                    required
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="john@acme.ai"
                  />
                </div>
              </div>

              <div>
                <Label>Phone (Optional)</Label>
                <Input
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="+91-9876543210"
                />
              </div>
            </div>
          </Card>

          {/* Project Details */}
          <Card>
            <h3 style={{ fontSize: 14, fontWeight: 'bold', color: T.text, marginBottom: 12 }}>Project Details</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              <div>
                <Label>Use Case *</Label>
                <Textarea
                  required
                  value={formData.useCase}
                  onChange={(e) => setFormData({ ...formData, useCase: e.target.value })}
                  placeholder="Describe how you plan to use this dataset..."
                  rows={3}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                <div>
                  <Label>Estimated Volume</Label>
                  <Input
                    value={formData.estimatedVolume}
                    onChange={(e) => setFormData({ ...formData, estimatedVolume: e.target.value })}
                    placeholder="e.g., Full dataset or 10K samples"
                  />
                </div>
                <div>
                  <Label>Budget Range (Optional)</Label>
                  <Input
                    value={formData.budget}
                    onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                    placeholder="e.g., ₹1-2L"
                  />
                </div>
              </div>

              <div>
                <Label>Timeline *</Label>
                <Input
                  required
                  value={formData.timeline}
                  onChange={(e) => setFormData({ ...formData, timeline: e.target.value })}
                  placeholder="When do you need access?"
                />
              </div>

              <div>
                <Label>Additional Requirements</Label>
                <Textarea
                  value={formData.requirements}
                  onChange={(e) => setFormData({ ...formData, requirements: e.target.value })}
                  placeholder="Any specific format, quality, or licensing requirements..."
                  rows={3}
                />
              </div>
            </div>
          </Card>

          {/* What Happens Next */}
          <Card style={{ background: T.primaryLight, borderColor: T.primary }}>
            <h3 style={{ fontSize: 14, fontWeight: 600, color: T.primary, marginBottom: 12, display: 'flex', alignItems: 'center', gap: 8 }}>
              <CheckIcon style={{ width: 20, height: 20 }} />
              What Happens Next
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8, fontSize: 12, color: T.primary }}>
              <div style={{ display: 'flex', gap: 8 }}>
                <span style={{ fontFamily: MONO }}>1.</span>
                <span>Your request is sent to {dataset.seller.name}</span>
              </div>
              <div style={{ display: 'flex', gap: 8 }}>
                <span style={{ fontFamily: MONO }}>2.</span>
                <span>Seller reviews and prepares a custom quote (2 business days)</span>
              </div>
              <div style={{ display: 'flex', gap: 8 }}>
                <span style={{ fontFamily: MONO }}>3.</span>
                <span>You receive the quote via email and in your buyer portal</span>
              </div>
              <div style={{ display: 'flex', gap: 8 }}>
                <span style={{ fontFamily: MONO }}>4.</span>
                <span>Accept the quote to proceed with payment and access</span>
              </div>
            </div>
          </Card>

          {/* Submit */}
          <div style={{ display: 'flex', gap: 12 }}>
            <Button type="button" variant="ghost" onClick={onBack}>
              Cancel
            </Button>
            <Button type="submit" style={{ flex: 1 }}>
              Submit Request →
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
