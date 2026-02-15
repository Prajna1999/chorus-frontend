'use client';

import { useState } from 'react';
import { Button } from '@/app/components/ui/Button';
import { Badge } from '@/app/components/ui/Badge';
import { Card } from '@/app/components/ui/Card';
import { Input } from '@/app/components/ui/Input';
import { Textarea } from '@/app/components/ui/Textarea';
import { Label } from '@/app/components/ui/Label';
import { Pill } from '@/app/components/ui/Pill';
import { DATA_TYPES } from '@/constants/dataTypes';
import { LANGUAGES } from '@/constants/languages';
import {
  UserGroupIcon,
  ArrowRightIcon,
  ArrowLeftIcon,
  BuildingOfficeIcon,
  ScaleIcon,
  GlobeAltIcon,
  CheckCircleIcon
} from '@heroicons/react/24/outline';

type Step = 'info' | 'specialization' | 'governance' | 'contact' | 'review';

interface UnionRegistrationProps {
  onBack: () => void;
  onComplete: () => void;
}

export function UnionRegistration({ onBack, onComplete }: UnionRegistrationProps) {
  const [step, setStep] = useState<Step>('info');

  // Union Info
  const [unionName, setUnionName] = useState('');
  const [tagline, setTagline] = useState('');
  const [description, setDescription] = useState('');
  const [website, setWebsite] = useState('');

  // Specialization
  const [selectedDataTypes, setSelectedDataTypes] = useState<string[]>([]);
  const [selectedLanguages, setSelectedLanguages] = useState<string[]>([]);

  // Governance
  const [governanceModel, setGovernanceModel] = useState<'democratic' | 'representative' | 'managed'>('democratic');
  const [votingRights, setVotingRights] = useState(true);
  const [revenueShare, setRevenueShare] = useState('75');

  // Contact
  const [adminName, setAdminName] = useState('');
  const [adminEmail, setAdminEmail] = useState('');
  const [adminPhone, setAdminPhone] = useState('');

  const toggleDataType = (typeId: string) => {
    setSelectedDataTypes(prev =>
      prev.includes(typeId) ? prev.filter(id => id !== typeId) : [...prev, typeId]
    );
  };

  const toggleLanguage = (langId: string) => {
    setSelectedLanguages(prev =>
      prev.includes(langId) ? prev.filter(id => id !== langId) : [...prev, langId]
    );
  };

  const canProceed = () => {
    if (step === 'info') return unionName && tagline && description;
    if (step === 'specialization') return selectedDataTypes.length > 0 && selectedLanguages.length > 0;
    if (step === 'governance') return revenueShare && Number(revenueShare) >= 60 && Number(revenueShare) <= 90;
    if (step === 'contact') return adminName && adminEmail;
    return true;
  };

  const handleSubmit = () => {
    // In production, this would submit to the backend
    alert(`Union Registration Submitted!\n\nUnion: ${unionName}\nAdmin: ${adminName} (${adminEmail})\n\nYour registration will be reviewed within 2-3 business days. You'll receive an email with next steps.`);
    onComplete();
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <nav className="px-8 py-5 flex justify-between items-center border-b border-border bg-surface shadow-sm">
        <div className="flex items-center gap-3">
          <div className="w-2 h-2 rounded-full bg-success shadow-sm" />
          <span className="text-base font-bold font-mono tracking-wide">CHORUS</span>
          <Badge color="info">UNION REGISTRATION</Badge>
        </div>
        <Button variant="ghost" onClick={onBack}>
          <ArrowLeftIcon className="w-5 h-5 inline mr-2" />
          Back to Home
        </Button>
      </nav>

      <div className="max-w-5xl mx-auto px-8 py-12">
        {/* Progress Steps */}
        <div className="flex items-center justify-center gap-3 mb-12">
          <StepIndicator label="Info" active={step === 'info'} completed={['specialization', 'governance', 'contact', 'review'].includes(step)} />
          <div className="w-12 h-0.5 bg-border" />
          <StepIndicator label="Specialization" active={step === 'specialization'} completed={['governance', 'contact', 'review'].includes(step)} />
          <div className="w-12 h-0.5 bg-border" />
          <StepIndicator label="Governance" active={step === 'governance'} completed={['contact', 'review'].includes(step)} />
          <div className="w-12 h-0.5 bg-border" />
          <StepIndicator label="Contact" active={step === 'contact'} completed={step === 'review'} />
          <div className="w-12 h-0.5 bg-border" />
          <StepIndicator label="Review" active={step === 'review'} completed={false} />
        </div>

        {/* Step: Basic Info */}
        {step === 'info' && (
          <Card className="p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-xl bg-success-dim flex items-center justify-center">
                <BuildingOfficeIcon className="w-6 h-6 text-success" />
              </div>
              <div>
                <h2 className="text-3xl font-bold text-text">Union Information</h2>
                <p className="text-sm text-text-mid">Tell us about your data union</p>
              </div>
            </div>

            <div className="space-y-5">
              <div>
                <Label>Union Name *</Label>
                <Input
                  value={unionName}
                  onChange={(e) => setUnionName(e.target.value)}
                  placeholder="e.g., Regional Voice Collective"
                />
              </div>

              <div>
                <Label>Tagline *</Label>
                <Input
                  value={tagline}
                  onChange={(e) => setTagline(e.target.value)}
                  placeholder="A one-line description of your union's mission"
                />
              </div>

              <div>
                <Label>Description *</Label>
                <Textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Describe your union's goals, values, and what makes it unique"
                  rows={5}
                />
              </div>

              <div>
                <Label>Website (Optional)</Label>
                <Input
                  value={website}
                  onChange={(e) => setWebsite(e.target.value)}
                  placeholder="yourwebsite.com"
                />
              </div>
            </div>

            <div className="flex justify-end mt-8">
              <Button onClick={() => setStep('specialization')} disabled={!canProceed()}>
                Next: Specialization <ArrowRightIcon className="w-5 h-5 inline ml-2" />
              </Button>
            </div>
          </Card>
        )}

        {/* Step: Specialization */}
        {step === 'specialization' && (
          <Card className="p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-xl bg-info-dim flex items-center justify-center">
                <GlobeAltIcon className="w-6 h-6 text-info" />
              </div>
              <div>
                <h2 className="text-3xl font-bold text-text">Specialization</h2>
                <p className="text-sm text-text-mid">What types of data and languages does your union focus on?</p>
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <Label>Data Types * (Select all that apply)</Label>
                <div className="flex flex-wrap gap-2 mt-3">
                  {DATA_TYPES.map((dt) => (
                    <Pill
                      key={dt.id}
                      active={selectedDataTypes.includes(dt.id)}
                      color="success"
                      onClick={() => toggleDataType(dt.id)}
                    >
                      {dt.label}
                    </Pill>
                  ))}
                </div>
              </div>

              <div>
                <Label>Languages * (Select all that apply)</Label>
                <div className="flex flex-wrap gap-2 mt-3">
                  {LANGUAGES.map((lang) => (
                    <Pill
                      key={lang.id}
                      active={selectedLanguages.includes(lang.id)}
                      color="info"
                      onClick={() => toggleLanguage(lang.id)}
                    >
                      {lang.label}
                    </Pill>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex justify-between mt-8">
              <Button variant="ghost" onClick={() => setStep('info')}>
                <ArrowLeftIcon className="w-5 h-5 inline mr-2" />
                Back
              </Button>
              <Button onClick={() => setStep('governance')} disabled={!canProceed()}>
                Next: Governance <ArrowRightIcon className="w-5 h-5 inline ml-2" />
              </Button>
            </div>
          </Card>
        )}

        {/* Step: Governance */}
        {step === 'governance' && (
          <Card className="p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-xl bg-warning-dim flex items-center justify-center">
                <ScaleIcon className="w-6 h-6 text-warning" />
              </div>
              <div>
                <h2 className="text-3xl font-bold text-text">Governance Model</h2>
                <p className="text-sm text-text-mid">Define how your union operates and compensates members</p>
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <Label>Governance Model *</Label>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mt-3">
                  <button
                    onClick={() => setGovernanceModel('democratic')}
                    className={`p-4 border rounded-lg text-left transition-all ${
                      governanceModel === 'democratic'
                        ? 'border-success bg-success-dim'
                        : 'border-border hover:border-success-border'
                    }`}
                  >
                    <div className="font-bold text-text mb-1">Democratic</div>
                    <div className="text-xs text-text-dim">All members vote on key decisions</div>
                  </button>
                  <button
                    onClick={() => setGovernanceModel('representative')}
                    className={`p-4 border rounded-lg text-left transition-all ${
                      governanceModel === 'representative'
                        ? 'border-success bg-success-dim'
                        : 'border-border hover:border-success-border'
                    }`}
                  >
                    <div className="font-bold text-text mb-1">Representative</div>
                    <div className="text-xs text-text-dim">Elected representatives decide</div>
                  </button>
                  <button
                    onClick={() => setGovernanceModel('managed')}
                    className={`p-4 border rounded-lg text-left transition-all ${
                      governanceModel === 'managed'
                        ? 'border-success bg-success-dim'
                        : 'border-border hover:border-success-border'
                    }`}
                  >
                    <div className="font-bold text-text mb-1">Managed</div>
                    <div className="text-xs text-text-dim">Leadership team manages operations</div>
                  </button>
                </div>
              </div>

              <div>
                <Label>Member Voting Rights</Label>
                <div className="flex gap-3 mt-3">
                  <button
                    onClick={() => setVotingRights(true)}
                    className={`px-4 py-2 border rounded-lg font-semibold text-sm transition-all ${
                      votingRights
                        ? 'border-success bg-success-dim text-success'
                        : 'border-border text-text-dim'
                    }`}
                  >
                    Yes - Members vote on deals
                  </button>
                  <button
                    onClick={() => setVotingRights(false)}
                    className={`px-4 py-2 border rounded-lg font-semibold text-sm transition-all ${
                      !votingRights
                        ? 'border-success bg-success-dim text-success'
                        : 'border-border text-text-dim'
                    }`}
                  >
                    No - Leadership decides
                  </button>
                </div>
              </div>

              <div>
                <Label>Member Revenue Share * (60-90%)</Label>
                <div className="flex items-center gap-4 mt-3">
                  <Input
                    type="number"
                    value={revenueShare}
                    onChange={(e) => setRevenueShare(e.target.value)}
                    placeholder="75"
                    className="w-32"
                    min="60"
                    max="90"
                  />
                  <span className="text-sm text-text-mid">
                    % of revenue goes to contributors (remaining covers union operations)
                  </span>
                </div>
              </div>
            </div>

            <div className="flex justify-between mt-8">
              <Button variant="ghost" onClick={() => setStep('specialization')}>
                <ArrowLeftIcon className="w-5 h-5 inline mr-2" />
                Back
              </Button>
              <Button onClick={() => setStep('contact')} disabled={!canProceed()}>
                Next: Contact Info <ArrowRightIcon className="w-5 h-5 inline ml-2" />
              </Button>
            </div>
          </Card>
        )}

        {/* Step: Contact */}
        {step === 'contact' && (
          <Card className="p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-xl bg-accent-dim flex items-center justify-center">
                <UserGroupIcon className="w-6 h-6 text-accent" />
              </div>
              <div>
                <h2 className="text-3xl font-bold text-text">Administrator Contact</h2>
                <p className="text-sm text-text-mid">Primary contact for union management</p>
              </div>
            </div>

            <div className="space-y-5">
              <div>
                <Label>Full Name *</Label>
                <Input
                  value={adminName}
                  onChange={(e) => setAdminName(e.target.value)}
                  placeholder="Your full name"
                />
              </div>

              <div>
                <Label>Email Address *</Label>
                <Input
                  type="email"
                  value={adminEmail}
                  onChange={(e) => setAdminEmail(e.target.value)}
                  placeholder="admin@yourunion.com"
                />
              </div>

              <div>
                <Label>Phone Number (Optional)</Label>
                <Input
                  type="tel"
                  value={adminPhone}
                  onChange={(e) => setAdminPhone(e.target.value)}
                  placeholder="+91 98765 43210"
                />
              </div>
            </div>

            <div className="flex justify-between mt-8">
              <Button variant="ghost" onClick={() => setStep('governance')}>
                <ArrowLeftIcon className="w-5 h-5 inline mr-2" />
                Back
              </Button>
              <Button onClick={() => setStep('review')} disabled={!canProceed()}>
                Review Application <ArrowRightIcon className="w-5 h-5 inline ml-2" />
              </Button>
            </div>
          </Card>
        )}

        {/* Step: Review */}
        {step === 'review' && (
          <div className="space-y-6">
            <Card className="p-8">
              <h2 className="text-3xl font-bold text-text mb-6">Review Your Application</h2>

              <div className="space-y-6">
                <div>
                  <div className="text-xs font-mono uppercase tracking-wider text-text-dim mb-2">Union Information</div>
                  <div className="bg-background p-4 rounded-lg space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm text-text-dim">Name:</span>
                      <span className="text-sm font-semibold text-text">{unionName}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-text-dim">Tagline:</span>
                      <span className="text-sm font-semibold text-text">{tagline}</span>
                    </div>
                    {website && (
                      <div className="flex justify-between">
                        <span className="text-sm text-text-dim">Website:</span>
                        <span className="text-sm font-semibold text-text">{website}</span>
                      </div>
                    )}
                  </div>
                </div>

                <div>
                  <div className="text-xs font-mono uppercase tracking-wider text-text-dim mb-2">Specialization</div>
                  <div className="bg-background p-4 rounded-lg space-y-3">
                    <div>
                      <span className="text-sm text-text-dim block mb-2">Data Types:</span>
                      <div className="flex flex-wrap gap-2">
                        {selectedDataTypes.map(id => {
                          const dt = DATA_TYPES.find(d => d.id === id);
                          return dt ? <Badge key={id} color="success">{dt.label}</Badge> : null;
                        })}
                      </div>
                    </div>
                    <div>
                      <span className="text-sm text-text-dim block mb-2">Languages:</span>
                      <div className="flex flex-wrap gap-2">
                        {selectedLanguages.map(id => {
                          const lang = LANGUAGES.find(l => l.id === id);
                          return lang ? <Badge key={id} color="info">{lang.label}</Badge> : null;
                        })}
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <div className="text-xs font-mono uppercase tracking-wider text-text-dim mb-2">Governance</div>
                  <div className="bg-background p-4 rounded-lg space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm text-text-dim">Model:</span>
                      <span className="text-sm font-semibold text-text capitalize">{governanceModel}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-text-dim">Voting Rights:</span>
                      <span className="text-sm font-semibold text-text">{votingRights ? 'Yes' : 'No'}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-text-dim">Member Revenue Share:</span>
                      <span className="text-sm font-semibold text-success">{revenueShare}%</span>
                    </div>
                  </div>
                </div>

                <div>
                  <div className="text-xs font-mono uppercase tracking-wider text-text-dim mb-2">Administrator</div>
                  <div className="bg-background p-4 rounded-lg space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm text-text-dim">Name:</span>
                      <span className="text-sm font-semibold text-text">{adminName}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-text-dim">Email:</span>
                      <span className="text-sm font-semibold text-text">{adminEmail}</span>
                    </div>
                    {adminPhone && (
                      <div className="flex justify-between">
                        <span className="text-sm text-text-dim">Phone:</span>
                        <span className="text-sm font-semibold text-text">{adminPhone}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </Card>

            <Card className="p-6 bg-info-dim border-info-border">
              <div className="flex gap-3">
                <CheckCircleIcon className="w-6 h-6 text-info flex-shrink-0 mt-0.5" />
                <div>
                  <div className="font-bold text-text mb-1">Review Process</div>
                  <div className="text-sm text-text-mid">
                    Your application will be reviewed within 2-3 business days. We'll verify your information
                    and may reach out for additional details. Once approved, you'll receive admin credentials
                    and onboarding materials.
                  </div>
                </div>
              </div>
            </Card>

            <div className="flex justify-between">
              <Button variant="ghost" onClick={() => setStep('contact')}>
                <ArrowLeftIcon className="w-5 h-5 inline mr-2" />
                Back
              </Button>
              <Button onClick={handleSubmit} className="px-8">
                Submit Application
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function StepIndicator({ label, active, completed }: { label: string; active: boolean; completed: boolean }) {
  return (
    <div className="flex flex-col items-center gap-2">
      <div
        className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-all ${
          completed
            ? 'bg-success text-white'
            : active
            ? 'bg-success-dim border-2 border-success text-success'
            : 'bg-surface border-2 border-border text-text-dim'
        }`}
      >
        {completed ? '✓' : label.charAt(0)}
      </div>
      <div className={`text-xs font-semibold ${active ? 'text-text' : 'text-text-dim'}`}>
        {label}
      </div>
    </div>
  );
}
