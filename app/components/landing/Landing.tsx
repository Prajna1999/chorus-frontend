'use client';

import { Badge } from '@/app/components/ui/Badge';
import { Button } from '@/app/components/ui/Button';
import { Card } from '@/app/components/ui/Card';
import { DATA_TYPES } from '@/constants/dataTypes';
import {
  UserGroupIcon,
  BuildingOfficeIcon,
  UserIcon,
  CheckCircleIcon,
  ShieldCheckIcon,
  CurrencyRupeeIcon,
  ChartBarIcon,
  SparklesIcon,
  ArrowRightIcon,
  GlobeAltIcon,
  ScaleIcon
} from '@heroicons/react/24/outline';

interface LandingProps {
  onStart: () => void;
  onAdmin: () => void;
  onMarketplace: () => void;
  onRegisterUnion: () => void;
}

export function Landing({ onStart, onAdmin, onMarketplace, onRegisterUnion }: LandingProps) {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <nav className="px-8 py-5 flex justify-between items-center border-b border-border bg-surface shadow-sm sticky top-0 z-50">
        <div className="flex items-center gap-3">
          <div className="w-2 h-2 rounded-full bg-success shadow-sm" />
          <span className="text-base font-bold font-mono tracking-wide">CHORUS</span>
          <Badge color="success">DATA MARKETPLACE</Badge>
        </div>
        <div className="flex gap-3">
          <Button variant="ghost" onClick={onMarketplace}>
            Browse Data Marketplace
          </Button>
          <Button onClick={onStart}>
            Join as Contributor
          </Button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-8 py-20 text-center">
        <Badge color="info" className="mb-6">
          CONNECTING DATA CONTRIBUTORS & AI COMPANIES
        </Badge>

        <h1 className="text-6xl font-bold text-text mb-6 max-w-4xl mx-auto leading-tight">
          Data Trading Platform for
          <span className="text-success"> AI Training</span>
        </h1>

        <p className="text-base text-text-mid mb-12 max-w-3xl mx-auto leading-relaxed">
          AI companies access verified training datasets with transparent pricing.
          Contributors monetize their data through professional data providers.
        </p>

        <div className="flex gap-4 justify-center mb-16">
          <Button onClick={onStart} className="px-6">
            <UserIcon className="w-5 h-5 inline mr-2" />
            Start Contributing
          </Button>
          <Button onClick={onMarketplace} variant="ghost" className="px-6">
            <BuildingOfficeIcon className="w-5 h-5 inline mr-2" />
            License Training Data
          </Button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 max-w-5xl mx-auto">
          <Card className="p-6 text-center">
            <div className="text-4xl font-bold text-success mb-2">600+</div>
            <div className="text-sm text-text-dim">Available Datasets</div>
          </Card>
          <Card className="p-6 text-center">
            <div className="text-4xl font-bold text-info mb-2">40K+</div>
            <div className="text-sm text-text-dim">Active Contributors</div>
          </Card>
          <Card className="p-6 text-center">
            <div className="text-4xl font-bold text-warning mb-2">₹14M+</div>
            <div className="text-sm text-text-dim">Paid to Contributors</div>
          </Card>
          <Card className="p-6 text-center">
            <div className="text-4xl font-bold text-accent mb-2">20+</div>
            <div className="text-sm text-text-dim">Languages Supported</div>
          </Card>
        </div>
      </section>


      {/* Three Audiences */}
      <section className="bg-surface py-20 border-y border-border">
        <div className="max-w-7xl mx-auto px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-text mb-4">Two-Sided Data Marketplace</h2>
            <p className="text-base text-text-mid max-w-2xl mx-auto">
              AI companies get verified datasets with transparent pricing. Contributors monetize their data with industry-leading revenue share.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* For AI Companies - FIRST, they're the customers */}
            <Card className="p-8 hover-lift border-2 border-info-border">
              <div className="w-16 h-16 rounded-xl bg-info flex items-center justify-center mb-6">
                <BuildingOfficeIcon className="w-8 h-8 text-white" />
              </div>
              <Badge color="info" className="mb-4">FOR BUYERS</Badge>
              <h3 className="text-2xl font-bold text-text mb-4">For AI Companies</h3>
              <p className="text-sm text-text-mid mb-6 leading-relaxed">
                Access verified training datasets with transparent pricing and clear legal terms.
                Professionally managed, consistent quality, instant access.
              </p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-start gap-2 text-sm text-text-mid">
                  <CheckCircleIcon className="w-5 h-5 text-info mt-0.5 flex-shrink-0" />
                  <span>600+ verified datasets ready now</span>
                </li>
                <li className="flex items-start gap-2 text-sm text-text-mid">
                  <CheckCircleIcon className="w-5 h-5 text-info mt-0.5 flex-shrink-0" />
                  <span>Transparent pricing, no surprises</span>
                </li>
                <li className="flex items-start gap-2 text-sm text-text-mid">
                  <CheckCircleIcon className="w-5 h-5 text-info mt-0.5 flex-shrink-0" />
                  <span>Professionally managed datasets</span>
                </li>
                <li className="flex items-start gap-2 text-sm text-text-mid">
                  <CheckCircleIcon className="w-5 h-5 text-info mt-0.5 flex-shrink-0" />
                  <span>Clear legal compliance</span>
                </li>
              </ul>
              <Button onClick={onMarketplace} className="w-full">
                Browse Datasets <ArrowRightIcon className="w-5 h-5 inline ml-2" />
              </Button>
            </Card>

            {/* For Contributors - SECOND */}
            <Card className="p-8 hover-lift">
              <div className="w-16 h-16 rounded-xl bg-success-dim flex items-center justify-center mb-6">
                <UserIcon className="w-8 h-8 text-success" />
              </div>
              <Badge color="success" className="mb-4">FOR CONTRIBUTORS</Badge>
              <h3 className="text-2xl font-bold text-text mb-4">For Data Contributors</h3>
              <p className="text-sm text-text-mid mb-6 leading-relaxed">
                Monetize your voice, text, documents, or mobility data. Join organized providers
                or operate independently with full control over pricing.
              </p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-start gap-2 text-sm text-text-mid">
                  <CheckCircleIcon className="w-5 h-5 text-success mt-0.5 flex-shrink-0" />
                  <span>Recurring payments for every use</span>
                </li>
                <li className="flex items-start gap-2 text-sm text-text-mid">
                  <CheckCircleIcon className="w-5 h-5 text-success mt-0.5 flex-shrink-0" />
                  <span>70-80% revenue share</span>
                </li>
                <li className="flex items-start gap-2 text-sm text-text-mid">
                  <CheckCircleIcon className="w-5 h-5 text-success mt-0.5 flex-shrink-0" />
                  <span>Join a provider or stay independent</span>
                </li>
                <li className="flex items-start gap-2 text-sm text-text-mid">
                  <CheckCircleIcon className="w-5 h-5 text-success mt-0.5 flex-shrink-0" />
                  <span>Clear usage terms upfront</span>
                </li>
              </ul>
              <Button onClick={onStart} variant="ghost" className="w-full">
                Start Contributing <ArrowRightIcon className="w-5 h-5 inline ml-2" />
              </Button>
            </Card>
          </div>
        </div>
      </section>

      {/* Data Types */}
      <section className="max-w-7xl mx-auto px-8 py-20">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-text mb-4">Diverse Data Types Available</h2>
          <p className="text-sm text-text-mid max-w-2xl mx-auto">
            From voice recordings to research documents, access the training data you need.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {DATA_TYPES.map((dt) => {
            const Icon = dt.icon;
            return (
              <Card key={dt.id} className="p-6 text-center hover-lift">
                <div className="w-16 h-16 rounded-xl bg-success-dim flex items-center justify-center mx-auto mb-4">
                  <Icon className="w-8 h-8 text-success" />
                </div>
                <h3 className="text-base font-bold text-text mb-2">{dt.label}</h3>
                <p className="text-sm text-text-dim">{dt.desc}</p>
              </Card>
            );
          })}
        </div>
      </section>

      {/* Why DataUnion */}
      <section className="bg-gradient-to-r from-success-dim/30 to-info-dim/30 py-20 border-y border-border">
        <div className="max-w-7xl mx-auto px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-text mb-4">Why Chorus?</h2>
            <p className="text-sm text-text-mid max-w-2xl mx-auto">
              Verified data, transparent pricing, and professional infrastructure for data trading.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-20 h-20 rounded-full bg-success flex items-center justify-center mx-auto mb-6">
                <ShieldCheckIcon className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-text mb-3">Verified & Compliant</h3>
              <p className="text-sm text-text-mid leading-relaxed">
                Every dataset comes with verified consent and clear licensing terms.
                All data is legally compliant with proper documentation.
              </p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 rounded-full bg-info flex items-center justify-center mx-auto mb-6">
                <CurrencyRupeeIcon className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-text mb-3">Market-Based Pricing</h3>
              <p className="text-sm text-text-mid leading-relaxed">
                Competitive rates with 70-80% revenue share for contributors.
                Transparent pricing and automated recurring payments.
              </p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 rounded-full bg-warning flex items-center justify-center mx-auto mb-6">
                <ChartBarIcon className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-text mb-3">Quality Assurance</h3>
              <p className="text-sm text-text-mid leading-relaxed">
                All contributions are reviewed and verified. Union oversight ensures
                consistent quality standards across datasets.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="max-w-5xl mx-auto px-8 py-20 text-center">
        <SparklesIcon className="w-16 h-16 text-success mx-auto mb-6" />
        <h2 className="text-5xl font-bold text-text mb-6">Ready to Get Started?</h2>
        <p className="text-sm text-text-mid mb-12 max-w-2xl mx-auto">
          Join thousands of contributors monetizing their data, or access verified training datasets for your AI models.
        </p>
        <div className="flex gap-4 justify-center">
          <Button onClick={onStart} className="text-base px-8 py-2.5">
            Join as Contributor
          </Button>
          <Button onClick={onMarketplace} variant="ghost" className="text-base px-8 py-2.5">
            Browse Datasets
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border bg-surface py-8">
        <div className="max-w-7xl mx-auto px-8">
          <div className="flex flex-wrap justify-center gap-8 text-sm text-text-dim">
            <div className="flex items-center gap-2">
              <ShieldCheckIcon className="w-5 h-5" />
              <span>Encrypted & Secure</span>
            </div>
            <div className="flex items-center gap-2">
              <ScaleIcon className="w-5 h-5" />
              <span>Transparent Licensing</span>
            </div>
            <div className="flex items-center gap-2">
              <CurrencyRupeeIcon className="w-5 h-5" />
              <span>Recurring Payments</span>
            </div>
            <div className="flex items-center gap-2">
              <GlobeAltIcon className="w-5 h-5" />
              <span>Global Community</span>
            </div>
          </div>
          <div className="text-center mt-6 text-sm text-text-dim">
            <button onClick={onAdmin} className="hover:text-text transition-colors">
              Admin Portal
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}
