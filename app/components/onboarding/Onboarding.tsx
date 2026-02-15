'use client';

import { useState } from 'react';
import { Badge } from '@/app/components/ui/Badge';
import { Button } from '@/app/components/ui/Button';
import { Input } from '@/app/components/ui/Input';
import { Label } from '@/app/components/ui/Label';
import { cn } from '@/lib/utils';
import { LICENSE_TEXT } from '@/constants/license';
import { DataUnionRegistry } from './DataUnionRegistry';
import {
  UserGroupIcon,
  BoltIcon,
  CheckIcon,
  UserIcon,
  ScaleIcon,
  DocumentTextIcon,
  CheckCircleIcon,
  CogIcon
} from '@heroicons/react/24/outline';
import type { User } from '@/types';
import type { DataUnion } from '@/types/dataUnion';

interface OnboardingProps {
  onComplete: (user: User) => void;
  onBack: () => void;
}

type Step = 'identity' | 'mode' | 'union-registry' | 'independent-terms' | 'agreement';

export function Onboarding({ onComplete, onBack }: OnboardingProps) {
  const [step, setStep] = useState<Step>('identity');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [mode, setMode] = useState<'union' | 'independent' | null>(null);
  const [selectedUnion, setSelectedUnion] = useState<DataUnion | null>(null);
  const [price, setPrice] = useState(5);
  const [agreed, setAgreed] = useState(false);
  const [uses, setUses] = useState({
    speechRecognition: true,
    languageModels: true,
    voiceAgents: true,
    research: true
  });

  const handleModeSelect = (selectedMode: 'union' | 'independent') => {
    setMode(selectedMode);
    if (selectedMode === 'union') {
      setStep('union-registry');
    } else {
      setStep('independent-terms');
    }
  };

  const handleUnionSelect = (union: DataUnion) => {
    setSelectedUnion(union);
    setStep('agreement');
  };

  const handleComplete = () => {
    if (mode === 'union' && selectedUnion) {
      onComplete({
        name,
        email,
        mode: 'union',
        unionId: selectedUnion.id,
        unionName: selectedUnion.name
      });
    } else {
      onComplete({
        name,
        email,
        mode: 'independent',
        priceFloor: price,
        allowedUses: uses
      });
    }
  };

  const STEP_INFO = {
    identity: { label: 'Identity', icon: UserIcon, order: 1 },
    mode: { label: 'Choose Mode', icon: ScaleIcon, order: 2 },
    'union-registry': { label: 'Select Union', icon: UserGroupIcon, order: 3 },
    'independent-terms': { label: 'Set Terms', icon: CogIcon, order: 3 },
    agreement: { label: 'Agreement', icon: DocumentTextIcon, order: 4 }
  };

  const currentStepInfo = STEP_INFO[step];
  const totalSteps = mode === 'union' ? 4 : 4;

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <nav className="px-8 py-5 flex items-center justify-between border-b border-border bg-surface shadow-sm">
        <div className="flex items-center gap-3">
          <div className="w-2 h-2 rounded-full bg-success shadow-sm" />
          <span className="text-sm font-bold font-mono tracking-wide">CHORUS</span>
          <Badge color="info">ONBOARDING</Badge>
        </div>
        <Button variant="ghost" onClick={onBack}>
          Exit Setup
        </Button>
      </nav>

      <div className="max-w-5xl mx-auto px-8 py-12">
        {/* Progress Indicator */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm font-mono font-bold text-text-dim">
              STEP {currentStepInfo.order} OF {totalSteps}
            </span>
            <span className="text-base font-bold text-text flex items-center gap-2">
              <currentStepInfo.icon className="w-6 h-6" />
              {currentStepInfo.label}
            </span>
          </div>
          <div className="flex gap-2">
            {Array.from({ length: totalSteps }).map((_, idx) => (
              <div
                key={idx}
                className={cn(
                  "h-2 flex-1 rounded-full transition-all",
                  idx < currentStepInfo.order ? "bg-success" : "bg-border"
                )}
              />
            ))}
          </div>
        </div>

        {/* Step: Identity */}
        {step === 'identity' && (
          <div className="animate-fade-in max-w-2xl mx-auto">
            <h2 className="text-5xl font-bold text-text mb-4">Welcome to DataUnion</h2>
            <p className="text-sm text-text-mid mb-10">
              Let's start with some basic information about you.
            </p>

            <div className="bg-surface border border-border rounded-xl p-8 shadow-card">
              <div className="space-y-6">
                <div>
                  <Label>Full Name</Label>
                  <Input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter your full name"
                    autoFocus
                  />
                </div>

                <div>
                  <Label>Email Address</Label>
                  <Input
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    type="email"
                  />
                  <p className="text-sm text-text-dim mt-2">
                    We'll use this for important updates about your account and earnings.
                  </p>
                </div>
              </div>
            </div>

            <div className="flex justify-end mt-8">
              <Button
                onClick={() => setStep('mode')}
                disabled={!name || !email}
                className="text-sm px-10"
              >
                Continue →
              </Button>
            </div>
          </div>
        )}

        {/* Step: Mode Selection */}
        {step === 'mode' && (
          <div className="animate-fade-in max-w-4xl mx-auto">
            <h2 className="text-5xl font-bold text-text mb-4">Choose Your Path</h2>
            <p className="text-sm text-text-mid mb-10">
              Decide how you want to participate in the data economy.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Join a Union */}
              <button
                onClick={() => handleModeSelect('union')}
                className="bg-surface border-2 border-border hover:border-success-border rounded-xl p-8 transition-all text-left hover:shadow-lg group"
              >
                <div className="w-20 h-20 rounded-xl bg-success-dim flex items-center justify-center mb-6 group-hover:bg-success group-hover:scale-110 transition-all">
                  <UserGroupIcon className="w-10 h-10 text-success group-hover:text-white" />
                </div>

                <h3 className="text-3xl font-bold text-text mb-3">Join a Data Union</h3>
                <p className="text-sm text-text-mid leading-relaxed mb-6">
                  Browse and join an existing union that aligns with your values. The union handles
                  negotiations, pricing, and licensing on your behalf.
                </p>

                <div className="space-y-2 mb-6">
                  <div className="flex items-center gap-2 text-sm text-text-mid">
                    <CheckIcon className="w-5 h-5 text-success" />
                    <span>Union sets pricing and terms</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-text-mid">
                    <CheckIcon className="w-5 h-5 text-success" />
                    <span>Collective bargaining power</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-text-mid">
                    <CheckIcon className="w-5 h-5 text-success" />
                    <span>Democratic governance (most unions)</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-text-mid">
                    <CheckIcon className="w-5 h-5 text-success" />
                    <span>Contribute data anytime after joining</span>
                  </div>
                </div>

                <Badge color="success">RECOMMENDED FOR MOST</Badge>
              </button>

              {/* Stay Independent */}
              <button
                onClick={() => handleModeSelect('independent')}
                className="bg-surface border-2 border-border hover:border-info-border rounded-xl p-8 transition-all text-left hover:shadow-lg group"
              >
                <div className="w-20 h-20 rounded-xl bg-info-dim flex items-center justify-center mb-6 group-hover:bg-info group-hover:scale-110 transition-all">
                  <BoltIcon className="w-10 h-10 text-info group-hover:text-white" />
                </div>

                <h3 className="text-3xl font-bold text-text mb-3">Stay Independent</h3>
                <p className="text-sm text-text-mid leading-relaxed mb-6">
                  Set your own pricing and negotiate directly with data buyers.
                  You retain full control over your data licensing terms.
                </p>

                <div className="space-y-2 mb-6">
                  <div className="flex items-center gap-2 text-sm text-text-mid">
                    <CheckIcon className="w-5 h-5 text-info" />
                    <span>You set your own prices</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-text-mid">
                    <CheckIcon className="w-5 h-5 text-info" />
                    <span>Direct control over licensing</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-text-mid">
                    <CheckIcon className="w-5 h-5 text-info" />
                    <span>Higher revenue share (80%)</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-text-mid">
                    <CheckIcon className="w-5 h-5 text-info" />
                    <span>Direct buyer relationships</span>
                  </div>
                </div>

                <Badge color="info">FOR EXPERIENCED CONTRIBUTORS</Badge>
              </button>
            </div>

            <div className="flex justify-between mt-12 pt-8 border-t border-border">
              <Button variant="ghost" onClick={() => setStep('identity')} className="text-lg">
                ← Previous
              </Button>
            </div>
          </div>
        )}

        {/* Step: Union Registry */}
        {step === 'union-registry' && (
          <DataUnionRegistry
            onSelectUnion={handleUnionSelect}
            onBack={() => setStep('mode')}
          />
        )}

        {/* Step: Independent Terms */}
        {step === 'independent-terms' && (
          <div className="animate-fade-in max-w-3xl mx-auto">
            <h2 className="text-5xl font-bold text-text mb-4">Set Your Terms</h2>
            <p className="text-sm text-text-mid mb-10">
              Configure your pricing preferences and allowed use cases.
            </p>

            <div className="space-y-6">
              <div className="bg-surface border border-border rounded-xl p-8 shadow-card">
                <Label>Minimum Price Floor</Label>
                <p className="text-sm text-text-dim mb-6">
                  Set the minimum price you want to receive for your data contributions
                </p>

                <div className="flex items-center gap-6 mb-4">
                  <input
                    type="range"
                    min={1}
                    max={20}
                    value={price}
                    onChange={(e) => setPrice(+e.target.value)}
                    className="flex-1 h-3 accent-success"
                  />
                  <div className="text-5xl font-bold text-success font-mono min-w-[120px] text-right">
                    ₹{price}
                  </div>
                </div>

                <div className="bg-background border border-border rounded-lg p-4">
                  <div className="text-sm text-text-mid">
                    <div className="flex justify-between mb-2">
                      <span>Per audio minute (voice):</span>
                      <span className="font-bold text-text">₹{price}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Per 1,000 tokens (text):</span>
                      <span className="font-bold text-text">₹{(price * 0.4).toFixed(1)}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-surface border border-border rounded-xl p-8 shadow-card">
                <Label>Allowed Use Cases</Label>
                <p className="text-sm text-text-dim mb-6">
                  Select which use cases are permitted for your data
                </p>

                <div className="space-y-3">
                  {Object.entries(uses).map(([key, value]) => (
                    <label
                      key={key}
                      className="flex items-center gap-4 p-4 bg-background border border-border rounded-lg cursor-pointer hover:border-success-border transition-all"
                    >
                      <input
                        type="checkbox"
                        checked={value}
                        onChange={() => setUses((p) => ({ ...p, [key]: !p[key as keyof typeof uses] }))}
                        className="accent-success w-6 h-6"
                      />
                      <span className="text-base text-text font-semibold">
                        {key.replace(/([A-Z])/g, ' $1').replace(/^./, (s) => s.toUpperCase())}
                      </span>
                    </label>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex justify-between mt-12 pt-8 border-t border-border">
              <Button variant="ghost" onClick={() => setStep('mode')} className="text-lg">
                ← Previous
              </Button>
              <Button onClick={() => setStep('agreement')} className="text-sm px-10">
                Continue →
              </Button>
            </div>
          </div>
        )}

        {/* Step: Agreement */}
        {step === 'agreement' && (
          <div className="animate-fade-in max-w-3xl mx-auto">
            <h2 className="text-5xl font-bold text-text mb-4">Review & Accept</h2>
            <p className="text-sm text-text-mid mb-10">
              Please review the terms and complete your registration.
            </p>

            {/* Summary Card */}
            <div className="bg-info-dim border-2 border-info-border rounded-xl p-8 mb-6">
              <h3 className="text-2xl font-bold text-text mb-6">Your Setup Summary</h3>
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <div className="text-sm text-text-dim mb-1">Name</div>
                  <div className="text-sm font-semibold text-text">{name}</div>
                </div>
                <div>
                  <div className="text-sm text-text-dim mb-1">Email</div>
                  <div className="text-sm font-semibold text-text">{email}</div>
                </div>
                <div>
                  <div className="text-sm text-text-dim mb-1">Mode</div>
                  <div className="text-sm font-semibold text-text capitalize">{mode}</div>
                </div>
                {mode === 'union' && selectedUnion && (
                  <div>
                    <div className="text-sm text-text-dim mb-1">Union</div>
                    <div className="text-sm font-semibold text-success">{selectedUnion.name}</div>
                  </div>
                )}
                {mode === 'independent' && (
                  <div>
                    <div className="text-sm text-text-dim mb-1">Price Floor</div>
                    <div className="text-sm font-semibold text-success">₹{price}/unit</div>
                  </div>
                )}
              </div>

              {mode === 'union' && selectedUnion && (
                <div className="mt-6 pt-6 border-t border-info-border">
                  <div className="text-base text-info">
                    <strong>Note:</strong> By joining {selectedUnion.name}, pricing and licensing terms
                    will be managed by the union. You can start contributing data anytime after joining.
                  </div>
                </div>
              )}
            </div>

            <div className="bg-surface border border-border rounded-xl p-8 shadow-card">
              <Label>License Agreement</Label>
              <div className="bg-background border border-border rounded-lg p-6 max-h-96 overflow-y-auto text-base leading-relaxed text-text-mid whitespace-pre-wrap font-mono mb-6">
                {LICENSE_TEXT}
              </div>

              <label className="flex items-start gap-4 p-5 bg-success-dim border-2 border-success-border rounded-lg cursor-pointer hover:bg-success-dim/70 transition-all">
                <input
                  type="checkbox"
                  checked={agreed}
                  onChange={() => setAgreed(!agreed)}
                  className="accent-success w-6 h-6 mt-1 flex-shrink-0"
                />
                <span className="text-sm text-text font-semibold">
                  I have read and agree to the License Agreement and Terms of Service
                </span>
              </label>
            </div>

            <div className="flex justify-between mt-12 pt-8 border-t border-border">
              <Button
                variant="ghost"
                onClick={() => setStep(mode === 'union' ? 'union-registry' : 'independent-terms')}
                className="text-lg"
              >
                ← Previous
              </Button>
              <Button
                onClick={handleComplete}
                disabled={!agreed}
                className="text-base px-12"
              >
                Complete Setup <CheckCircleIcon className="w-6 h-6 ml-2 inline" />
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
