'use client';

import { useState } from 'react';
import { T, SANS, MONO, RADIUS } from '@/lib/theme';
import { LICENSE_TEXT } from '@/constants/license';
import { DataUnionRegistry } from './DataUnionRegistry';
import {
  UserGroupIcon,
  BoltIcon,
  CheckIcon,
  UserIcon,
  CheckCircleIcon,
  ArrowRightIcon,
  ScaleIcon,
} from '@heroicons/react/24/outline';
import type { User } from '@/types';
import type { DataUnion } from '@/types/dataUnion';

interface OnboardingProps {
  onComplete: (user: User) => void;
  onBack: () => void;
}

type Step = 'identity' | 'path' | 'agreement';

export function Onboarding({ onComplete, onBack }: OnboardingProps) {
  const [step, setStep] = useState<Step>('identity');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [mode, setMode] = useState<'union' | 'independent' | null>(null);
  const [selectedUnion, setSelectedUnion] = useState<DataUnion | null>(null);
  const [price, setPrice] = useState(5);
  const [agreed, setAgreed] = useState(false);
  const [showUnionRegistry, setShowUnionRegistry] = useState(false);

  const handleUnionSelect = (union: DataUnion) => {
    setSelectedUnion(union);
    setMode('union');
    setShowUnionRegistry(false);
    setStep('agreement');
  };

  const handleIndependentNext = () => {
    setMode('independent');
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
        allowedUses: {
          speechRecognition: true,
          languageModels: true,
          voiceAgents: true,
          research: true
        }
      });
    }
  };

  const steps = ['Identity', 'Choose Path', 'Agreement'];
  const currentStepIndex = steps.indexOf(
    step === 'identity' ? 'Identity' : step === 'path' ? 'Choose Path' : 'Agreement'
  );

  return (
    <div style={{ background: T.bg, minHeight: '100vh', color: T.text, fontFamily: SANS }}>
      {/* Header */}
      <nav style={{
        background: T.card,
        borderBottom: `1px solid ${T.border}`,
        padding: '20px 48px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <div style={{ width: 6, height: 6, borderRadius: '50%', background: T.primary }} />
          <span style={{ fontFamily: SANS, fontSize: 18, fontWeight: 600, color: T.text }}>Chorus</span>
          <span style={{
            fontFamily: MONO,
            fontSize: 10,
            textTransform: 'uppercase',
            letterSpacing: '0.1em',
            color: T.textDim,
            background: T.primaryLight,
            padding: '4px 8px',
            borderRadius: RADIUS.sm,
            border: `1px solid ${T.border}`,
          }}>
            Onboarding
          </span>
        </div>
        <button onClick={onBack} style={{
          background: 'transparent',
          border: `1px solid ${T.border}`,
          color: T.textMid,
          padding: '8px 16px',
          borderRadius: RADIUS.md,
          cursor: 'pointer',
          fontFamily: SANS,
          fontSize: 13,
          fontWeight: 500,
          transition: 'all 0.2s',
        }}
        onMouseEnter={e => {
          e.currentTarget.style.borderColor = T.red;
          e.currentTarget.style.color = T.red;
        }}
        onMouseLeave={e => {
          e.currentTarget.style.borderColor = T.border;
          e.currentTarget.style.color = T.textMid;
        }}>
          Exit Setup
        </button>
      </nav>

      <div style={{ maxWidth: 1000, margin: '0 auto', padding: '60px 48px' }}>
        {/* Progress Arc */}
        <div style={{ marginBottom: 64, textAlign: 'center' }}>
          <div style={{
            fontFamily: MONO,
            fontSize: 11,
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
            color: T.primary,
            marginBottom: 32,
          }}>
            Step {currentStepIndex + 1} of {steps.length}
          </div>

          {/* Progress circles */}
          <div style={{ display: 'flex', justifyContent: 'center', gap: 16, marginBottom: 16 }}>
            {steps.map((s, idx) => (
              <div key={idx} style={{
                width: idx <= currentStepIndex ? 16 : 12,
                height: idx <= currentStepIndex ? 16 : 12,
                borderRadius: '50%',
                background: idx <= currentStepIndex ? T.primary : T.border,
                transition: 'all 0.3s',
              }} />
            ))}
          </div>
          <div style={{ fontSize: 15, color: T.textMid, fontWeight: 500 }}>{steps[currentStepIndex]}</div>
        </div>

        {/* Step: Identity */}
        {step === 'identity' && (
          <div className="du-fade" style={{ maxWidth: 600, margin: '0 auto' }}>
            <h2 style={{
              fontFamily: SANS,
              fontSize: 48,
              fontWeight: 700,
              color: T.text,
              marginBottom: 16,
              textAlign: 'center',
            }}>
              Welcome to Chorus
            </h2>
            <p style={{ fontSize: 16, color: T.textMid, marginBottom: 48, textAlign: 'center', lineHeight: 1.7 }}>
              Let's get you set up to start monetizing your data.
            </p>

            <div style={{
              background: T.card,
              border: `1px solid ${T.border}`,
              borderRadius: RADIUS.lg,
              padding: 48,
            }}>
              <div style={{ marginBottom: 32 }}>
                <label style={{
                  display: 'block',
                  fontFamily: SANS,
                  fontSize: 14,
                  fontWeight: 600,
                  color: T.textMid,
                  marginBottom: 8,
                }}>
                  Full Name
                </label>
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter your full name"
                  autoFocus
                  style={{
                    width: '100%',
                    padding: '14px 16px',
                    background: T.bg,
                    border: `1px solid ${T.border}`,
                    borderRadius: RADIUS.md,
                    color: T.text,
                    fontFamily: SANS,
                    fontSize: 15,
                    outline: 'none',
                    transition: 'all 0.2s',
                  }}
                  onFocus={e => e.currentTarget.style.borderColor = T.primary}
                  onBlur={e => e.currentTarget.style.borderColor = T.border}
                />
              </div>

              <div>
                <label style={{
                  display: 'block',
                  fontFamily: SANS,
                  fontSize: 14,
                  fontWeight: 600,
                  color: T.textMid,
                  marginBottom: 8,
                }}>
                  Email Address
                </label>
                <input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  type="email"
                  style={{
                    width: '100%',
                    padding: '14px 16px',
                    background: T.bg,
                    border: `1px solid ${T.border}`,
                    borderRadius: RADIUS.md,
                    color: T.text,
                    fontFamily: SANS,
                    fontSize: 15,
                    outline: 'none',
                    transition: 'all 0.2s',
                  }}
                  onFocus={e => e.currentTarget.style.borderColor = T.primary}
                  onBlur={e => e.currentTarget.style.borderColor = T.border}
                />
                <p style={{ fontSize: 13, color: T.textDim, marginTop: 8 }}>
                  We'll use this for important updates about your earnings.
                </p>
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 32 }}>
              <button
                onClick={() => setStep('path')}
                disabled={!name || !email}
                style={{
                  background: T.primary,
                  border: 'none',
                  color: '#ffffff',
                  padding: '14px 32px',
                  borderRadius: RADIUS.md,
                  cursor: name && email ? 'pointer' : 'not-allowed',
                  fontFamily: SANS,
                  fontSize: 15,
                  fontWeight: 600,
                  opacity: name && email ? 1 : 0.5,
                  transition: 'all 0.2s',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 8,
                }}
                onMouseEnter={e => {
                  if (name && email) e.currentTarget.style.background = T.primaryHover;
                }}
                onMouseLeave={e => {
                  if (name && email) e.currentTarget.style.background = T.primary;
                }}>
                Continue
                <ArrowRightIcon className="w-5 h-5" />
              </button>
            </div>
          </div>
        )}

        {/* Step: Path Selection (Union Registry OR Independent with inline config) */}
        {step === 'path' && !showUnionRegistry && (
          <div className="du-fade">
            <h2 style={{
              fontFamily: SANS,
              fontSize: 48,
              fontWeight: 700,
              color: T.text,
              marginBottom: 16,
              textAlign: 'center',
            }}>
              Choose your path
            </h2>
            <p style={{ fontSize: 16, color: T.textMid, marginBottom: 56, textAlign: 'center', lineHeight: 1.7, maxWidth: 600, margin: '0 auto 56px' }}>
              Join a union for collective bargaining, or set your own terms independently.
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 32 }}>
              {/* Join Union */}
              <div style={{
                background: T.card,
                border: `1px solid ${T.border}`,
                borderRadius: RADIUS.lg,
                padding: 40,
                position: 'relative',
                overflow: 'hidden',
                cursor: 'pointer',
                transition: 'all 0.2s',
              }}
              onClick={() => setShowUnionRegistry(true)}
              onMouseEnter={e => {
                e.currentTarget.style.borderColor = T.green;
              }}
              onMouseLeave={e => {
                e.currentTarget.style.borderColor = T.border;
              }}>
                <div style={{ position: 'relative' }}>
                  <div style={{
                    width: 72,
                    height: 72,
                    borderRadius: RADIUS.lg,
                    background: T.greenLight,
                    border: `1px solid ${T.border}`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: 24,
                  }}>
                    <UserGroupIcon className="w-9 h-9" style={{ color: T.green }} />
                  </div>

                  <div style={{
                    fontFamily: MONO,
                    fontSize: 11,
                    letterSpacing: '0.1em',
                    textTransform: 'uppercase',
                    color: T.green,
                    marginBottom: 12,
                  }}>
                    Recommended
                  </div>

                  <h3 style={{ fontFamily: SANS, fontSize: 32, fontWeight: 700, color: T.text, marginBottom: 16 }}>
                    Join a Union
                  </h3>
                  <p style={{ fontSize: 15, lineHeight: 1.7, color: T.textMid, marginBottom: 28 }}>
                    Collective bargaining power. The union negotiates pricing, manages licensing, and you just contribute data.
                  </p>

                  <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 28px 0' }}>
                    {[
                      'Union sets pricing (3x average)',
                      'Collective negotiation power',
                      '70% revenue share',
                      'Democratic governance',
                    ].map((item, idx) => (
                      <li key={idx} style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
                        <CheckIcon className="w-5 h-5 flex-shrink-0" style={{ color: T.green }} />
                        <span style={{ fontSize: 14, color: T.textMid }}>{item}</span>
                      </li>
                    ))}
                  </ul>

                  <div style={{
                    padding: '12px 20px',
                    background: T.green,
                    color: '#ffffff',
                    borderRadius: RADIUS.md,
                    textAlign: 'center',
                    fontWeight: 600,
                    fontSize: 15,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: 8,
                  }}>
                    Browse Unions
                    <ArrowRightIcon className="w-5 h-5" />
                  </div>
                </div>
              </div>

              {/* Stay Independent */}
              <div style={{
                background: T.card,
                border: `1px solid ${T.border}`,
                borderRadius: RADIUS.lg,
                padding: 40,
                position: 'relative',
                overflow: 'hidden',
              }}>
                <div style={{ position: 'relative' }}>
                  <div style={{
                    width: 72,
                    height: 72,
                    borderRadius: RADIUS.lg,
                    background: T.primaryLight,
                    border: `1px solid ${T.border}`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: 24,
                  }}>
                    <BoltIcon className="w-9 h-9" style={{ color: T.primary }} />
                  </div>

                  <div style={{
                    fontFamily: MONO,
                    fontSize: 11,
                    letterSpacing: '0.1em',
                    textTransform: 'uppercase',
                    color: T.primary,
                    marginBottom: 12,
                  }}>
                    For Experienced
                  </div>

                  <h3 style={{ fontFamily: SANS, fontSize: 32, fontWeight: 700, color: T.text, marginBottom: 16 }}>
                    Stay Independent
                  </h3>
                  <p style={{ fontSize: 15, lineHeight: 1.7, color: T.textMid, marginBottom: 28 }}>
                    Full control over pricing and licensing. You negotiate directly with buyers.
                  </p>

                  <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 28px 0' }}>
                    {[
                      'You set your own prices',
                      'Direct buyer relationships',
                      '80% revenue share',
                      'Full licensing control',
                    ].map((item, idx) => (
                      <li key={idx} style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
                        <CheckIcon className="w-5 h-5 flex-shrink-0" style={{ color: T.primary }} />
                        <span style={{ fontSize: 14, color: T.textMid }}>{item}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Inline price picker */}
                  <div style={{
                    background: T.surface,
                    border: `1px solid ${T.border}`,
                    borderRadius: RADIUS.md,
                    padding: 20,
                    marginBottom: 16,
                  }}>
                    <label style={{
                      display: 'block',
                      fontFamily: SANS,
                      fontSize: 13,
                      fontWeight: 600,
                      color: T.textMid,
                      marginBottom: 12,
                    }}>
                      Set Minimum Price Floor
                    </label>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 8 }}>
                      <input
                        type="range"
                        min={1}
                        max={20}
                        value={price}
                        onChange={(e) => setPrice(+e.target.value)}
                        style={{ flex: 1, accentColor: T.primary }}
                      />
                      <div style={{
                        fontFamily: MONO,
                        fontSize: 28,
                        fontWeight: 700,
                        color: T.primary,
                        minWidth: 80,
                        textAlign: 'right',
                      }}>
                        ₹{price}
                      </div>
                    </div>
                    <div style={{ fontSize: 12, color: T.textDim }}>
                      Per audio minute or per 1K text tokens
                    </div>
                  </div>

                  <button onClick={handleIndependentNext} style={{
                    padding: '12px 20px',
                    background: 'transparent',
                    border: `1px solid ${T.border}`,
                    color: T.primary,
                    borderRadius: RADIUS.md,
                    textAlign: 'center',
                    fontWeight: 600,
                    fontSize: 15,
                    width: '100%',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: 8,
                    transition: 'all 0.2s',
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.background = T.primaryLight;
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.background = 'transparent';
                  }}>
                    Continue Independently
                    <ArrowRightIcon className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 48, paddingTop: 32, borderTop: `1px solid ${T.border}` }}>
              <button onClick={() => setStep('identity')} style={{
                background: 'transparent',
                border: 'none',
                color: T.textMid,
                padding: '8px 16px',
                borderRadius: RADIUS.md,
                cursor: 'pointer',
                fontFamily: SANS,
                fontSize: 14,
                fontWeight: 500,
                display: 'flex',
                alignItems: 'center',
                gap: 6,
              }}>
                ← Previous
              </button>
            </div>
          </div>
        )}

        {/* Union Registry Sub-view */}
        {step === 'path' && showUnionRegistry && (
          <DataUnionRegistry
            onSelectUnion={handleUnionSelect}
            onBack={() => setShowUnionRegistry(false)}
          />
        )}

        {/* Step: Agreement */}
        {step === 'agreement' && (
          <div className="du-fade" style={{ maxWidth: 800, margin: '0 auto' }}>
            <h2 style={{
              fontFamily: SANS,
              fontSize: 48,
              fontWeight: 700,
              color: T.text,
              marginBottom: 16,
              textAlign: 'center',
            }}>
              Review & Accept
            </h2>
            <p style={{ fontSize: 16, color: T.textMid, marginBottom: 48, textAlign: 'center', lineHeight: 1.7 }}>
              Please review your setup and accept the terms to continue.
            </p>

            {/* Summary Card */}
            <div style={{
              background: T.card,
              border: `1px solid ${T.border}`,
              borderRadius: RADIUS.lg,
              padding: 40,
              marginBottom: 32,
            }}>
              <h3 style={{ fontFamily: SANS, fontSize: 28, fontWeight: 700, color: T.text, marginBottom: 24 }}>
                Your Setup Summary
              </h3>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
                <div>
                  <div style={{ fontSize: 12, color: T.textDim, marginBottom: 4, fontFamily: MONO, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Name</div>
                  <div style={{ fontSize: 16, fontWeight: 600, color: T.text }}>{name}</div>
                </div>
                <div>
                  <div style={{ fontSize: 12, color: T.textDim, marginBottom: 4, fontFamily: MONO, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Email</div>
                  <div style={{ fontSize: 16, fontWeight: 600, color: T.text }}>{email}</div>
                </div>
                <div>
                  <div style={{ fontSize: 12, color: T.textDim, marginBottom: 4, fontFamily: MONO, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Mode</div>
                  <div style={{ fontSize: 16, fontWeight: 600, color: T.text, textTransform: 'capitalize' }}>{mode}</div>
                </div>
                {mode === 'union' && selectedUnion && (
                  <div>
                    <div style={{ fontSize: 12, color: T.textDim, marginBottom: 4, fontFamily: MONO, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Union</div>
                    <div style={{ fontSize: 16, fontWeight: 600, color: T.green }}>{selectedUnion.name}</div>
                  </div>
                )}
                {mode === 'independent' && (
                  <div>
                    <div style={{ fontSize: 12, color: T.textDim, marginBottom: 4, fontFamily: MONO, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Price Floor</div>
                    <div style={{ fontSize: 16, fontWeight: 600, color: T.primary }}>₹{price}/unit</div>
                  </div>
                )}
              </div>

              {mode === 'union' && selectedUnion && (
                <div style={{
                  marginTop: 24,
                  paddingTop: 24,
                  borderTop: `1px solid ${T.border}`,
                  fontSize: 14,
                  color: T.textMid,
                  lineHeight: 1.6,
                }}>
                  <strong style={{ color: T.green }}>Note:</strong> By joining {selectedUnion.name}, pricing and licensing terms will be managed by the union. You'll earn {selectedUnion.revenueShare}% revenue share.
                </div>
              )}
            </div>

            {/* License Agreement */}
            <div style={{
              background: T.card,
              border: `1px solid ${T.border}`,
              borderRadius: RADIUS.lg,
              padding: 40,
            }}>
              <h4 style={{ fontFamily: SANS, fontSize: 16, fontWeight: 600, color: T.textMid, marginBottom: 16 }}>
                License Agreement
              </h4>
              <div style={{
                background: T.surface,
                border: `1px solid ${T.border}`,
                borderRadius: RADIUS.md,
                padding: 24,
                maxHeight: 300,
                overflowY: 'auto',
                fontFamily: MONO,
                fontSize: 12,
                lineHeight: 1.7,
                color: T.textMid,
                whiteSpace: 'pre-wrap',
                marginBottom: 24,
              }}>
                {LICENSE_TEXT}
              </div>

              <label style={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: 16,
                padding: 20,
                background: T.primaryLight,
                border: `1px solid ${T.border}`,
                borderRadius: RADIUS.md,
                cursor: 'pointer',
                transition: 'all 0.2s',
              }}
              onMouseEnter={e => e.currentTarget.style.background = T.surface}
              onMouseLeave={e => e.currentTarget.style.background = T.primaryLight}>
                <input
                  type="checkbox"
                  checked={agreed}
                  onChange={() => setAgreed(!agreed)}
                  style={{ width: 20, height: 20, cursor: 'pointer', accentColor: T.primary, marginTop: 2 }}
                />
                <span style={{ fontSize: 14, color: T.text, fontWeight: 600, lineHeight: 1.6 }}>
                  I have read and agree to the License Agreement and Terms of Service
                </span>
              </label>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 48, paddingTop: 32, borderTop: `1px solid ${T.border}` }}>
              <button onClick={() => setStep('path')} style={{
                background: 'transparent',
                border: 'none',
                color: T.textMid,
                padding: '8px 16px',
                borderRadius: RADIUS.md,
                cursor: 'pointer',
                fontFamily: SANS,
                fontSize: 14,
                fontWeight: 500,
                display: 'flex',
                alignItems: 'center',
                gap: 6,
              }}>
                ← Previous
              </button>
              <button
                onClick={handleComplete}
                disabled={!agreed}
                style={{
                  background: T.primary,
                  border: 'none',
                  color: '#ffffff',
                  padding: '14px 36px',
                  borderRadius: RADIUS.md,
                  cursor: agreed ? 'pointer' : 'not-allowed',
                  fontFamily: SANS,
                  fontSize: 16,
                  fontWeight: 600,
                  opacity: agreed ? 1 : 0.5,
                  transition: 'all 0.2s',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 8,
                }}
                onMouseEnter={e => {
                  if (agreed) e.currentTarget.style.background = T.primaryHover;
                }}
                onMouseLeave={e => {
                  if (agreed) e.currentTarget.style.background = T.primary;
                }}>
                Complete Setup
                <CheckCircleIcon className="w-5 h-5" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
