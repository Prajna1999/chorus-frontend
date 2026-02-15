'use client';

import { useState } from 'react';
import { Card } from '@/app/components/ui/Card';
import { Button } from '@/app/components/ui/Button';
import { Input } from '@/app/components/ui/Input';
import { Textarea } from '@/app/components/ui/Textarea';
import { Label } from '@/app/components/ui/Label';
import { Badge } from '@/app/components/ui/Badge';
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
      </nav>

      <div className="max-w-3xl mx-auto px-6 py-8">
        <div className="mb-6">
          <Badge color="warning" className="mb-3">REQUEST QUOTE</Badge>
          <h1 className="text-2xl font-bold text-text mb-2">Request Custom Quote</h1>
          <p className="text-sm text-text-mid">
            Submit your requirements for <span className="font-semibold text-text">{dataset.name}</span> and
            the seller will respond with a tailored quote.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Company Info */}
          <Card>
            <h3 className="text-sm font-bold text-text mb-3">Company Information</h3>
            <div className="space-y-3">
              <div>
                <Label>Company Name *</Label>
                <Input
                  required
                  value={formData.companyName}
                  onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                  placeholder="Acme AI Labs"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
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
            <h3 className="text-sm font-bold text-text mb-3">Project Details</h3>
            <div className="space-y-3">
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

              <div className="grid grid-cols-2 gap-3">
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
          <Card className="bg-info-dim border-info-border">
            <h3 className="text-sm font-semibold text-info mb-3 flex items-center gap-2">
              <CheckIcon className="w-5 h-5" />
              What Happens Next
            </h3>
            <div className="space-y-2 text-xs text-info">
              <div className="flex gap-2">
                <span className="font-mono">1.</span>
                <span>Your request is sent to {dataset.seller.name}</span>
              </div>
              <div className="flex gap-2">
                <span className="font-mono">2.</span>
                <span>Seller reviews and prepares a custom quote (2 business days)</span>
              </div>
              <div className="flex gap-2">
                <span className="font-mono">3.</span>
                <span>You receive the quote via email and in your buyer portal</span>
              </div>
              <div className="flex gap-2">
                <span className="font-mono">4.</span>
                <span>Accept the quote to proceed with payment and access</span>
              </div>
            </div>
          </Card>

          {/* Submit */}
          <div className="flex gap-3">
            <Button type="button" variant="ghost" onClick={onBack}>
              Cancel
            </Button>
            <Button type="submit" className="flex-1">
              Submit Request →
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
