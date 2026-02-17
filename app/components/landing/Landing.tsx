'use client';

import { T, SANS, MONO } from '@/lib/theme';
import {
  ArrowRightIcon,
  CheckCircleIcon,
  ShieldCheckIcon,
  CurrencyRupeeIcon,
  UserGroupIcon,
  MicrophoneIcon,
  ChartBarIcon,
} from '@heroicons/react/24/outline';

interface LandingProps {
  onStart: () => void;
  onAdmin: () => void;
  onMarketplace: () => void;
  onRegisterUnion?: () => void;
}

export function Landing({ onStart, onAdmin, onMarketplace }: LandingProps) {
  return (
    <div style={{ background: T.bg, minHeight: '100vh', color: T.text, fontFamily: SANS }}>
      {/* Header */}
      <nav style={{
        background: T.card,
        borderBottom: `1px solid ${T.border}`,
        padding: '12px 24px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <span style={{ fontSize: 18, fontWeight: 600, color: T.text }}>
            Chorus
          </span>
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          <button onClick={onMarketplace} style={{
            background: T.surface,
            border: `1px solid ${T.border}`,
            color: T.text,
            padding: '6px 16px',
            borderRadius: 6,
            cursor: 'pointer',
            fontFamily: SANS,
            fontSize: 14,
          }}>
            Browse Data
          </button>
          <button onClick={onStart} style={{
            background: T.primary,
            border: 'none',
            color: '#ffffff',
            padding: '6px 16px',
            borderRadius: 6,
            cursor: 'pointer',
            fontFamily: SANS,
            fontSize: 14,
            fontWeight: 500,
          }}>
            Get Started
          </button>
        </div>
      </nav>

      {/* Hero */}
      <section style={{ maxWidth: 1000, margin: '0 auto', padding: '60px 24px', textAlign: 'center' }}>
        <h1 style={{
          fontSize: 42,
          fontWeight: 600,
          lineHeight: 1.2,
          color: T.text,
          marginBottom: 16,
        }}>
          Data Marketplace for AI Training
        </h1>

        <p style={{
          fontSize: 18,
          lineHeight: 1.6,
          color: T.textMid,
          maxWidth: 700,
          margin: '0 auto 40px',
        }}>
          Contributors earn by providing quality data. AI companies access verified datasets for model training.
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, maxWidth: 600, margin: '0 auto 48px' }}>
          <div style={{
            background: T.card,
            border: `1px solid ${T.border}`,
            borderRadius: 8,
            padding: 20,
            textAlign: 'left',
          }}>
            <div style={{ fontSize: 12, color: T.textMid, marginBottom: 8, textTransform: 'uppercase', letterSpacing: '0.05em' }}>For Contributors</div>
            <div style={{ fontSize: 15, color: T.text, marginBottom: 12, fontWeight: 500 }}>Earn from your data</div>
            <button onClick={onStart} style={{
              background: T.primary,
              border: 'none',
              color: '#ffffff',
              padding: '8px 16px',
              borderRadius: 6,
              cursor: 'pointer',
              fontFamily: SANS,
              fontSize: 14,
              fontWeight: 500,
              width: '100%',
            }}>
              Start Contributing →
            </button>
          </div>

          <div style={{
            background: T.card,
            border: `1px solid ${T.border}`,
            borderRadius: 8,
            padding: 20,
            textAlign: 'left',
          }}>
            <div style={{ fontSize: 12, color: T.textMid, marginBottom: 8, textTransform: 'uppercase', letterSpacing: '0.05em' }}>For Buyers</div>
            <div style={{ fontSize: 15, color: T.text, marginBottom: 12, fontWeight: 500 }}>Access quality datasets</div>
            <button onClick={onMarketplace} style={{
              background: T.surface,
              border: `1px solid ${T.border}`,
              color: T.text,
              padding: '8px 16px',
              borderRadius: 6,
              cursor: 'pointer',
              fontFamily: SANS,
              fontSize: 14,
              width: '100%',
            }}>
              Browse Datasets →
            </button>
          </div>
        </div>

        {/* Stats */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 20, maxWidth: 800, margin: '0 auto' }}>
          {[
            { label: 'Contributors', value: '12,000+' },
            { label: 'AI Companies', value: '85+' },
            { label: 'Datasets', value: '450+' },
            { label: 'Total Earnings', value: '₹8.2M' },
          ].map((stat, idx) => (
            <div key={idx} style={{ textAlign: 'center' }}>
              <div style={{ fontSize: 24, fontWeight: 600, color: T.text, marginBottom: 4 }}>{stat.value}</div>
              <div style={{ fontSize: 13, color: T.textMid }}>{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* How It Works */}
      <section style={{ background: T.surface, padding: '60px 24px' }}>
        <div style={{ maxWidth: 900, margin: '0 auto' }}>
          <h2 style={{ fontSize: 28, fontWeight: 600, color: T.text, marginBottom: 8, textAlign: 'center' }}>
            How It Works for Contributors
          </h2>
          <p style={{ fontSize: 15, color: T.textMid, textAlign: 'center', marginBottom: 40 }}>
            Three simple steps to start earning
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24 }}>
            {[
              { icon: UserGroupIcon, title: 'Sign Up', desc: 'Create an account and choose to go independent or join a data union' },
              { icon: MicrophoneIcon, title: 'Contribute Data', desc: 'Upload voice, text, documents, or sensor data through our platform' },
              { icon: CurrencyRupeeIcon, title: 'Get Paid', desc: 'Earn money when AI companies license your data for training' },
            ].map((step, idx) => {
              const Icon = step.icon;
              return (
                <div key={idx} style={{
                  background: T.card,
                  border: `1px solid ${T.border}`,
                  borderRadius: 8,
                  padding: 24,
                }}>
                  <div style={{
                    width: 40,
                    height: 40,
                    borderRadius: 6,
                    background: T.primaryLight,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: 16,
                  }}>
                    <Icon style={{ width: 20, height: 20, color: T.primary }} />
                  </div>
                  <h3 style={{ fontSize: 16, fontWeight: 600, color: T.text, marginBottom: 8 }}>{step.title}</h3>
                  <p style={{ fontSize: 14, color: T.textMid, lineHeight: 1.6 }}>{step.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* For Contributors */}
      <section style={{ maxWidth: 900, margin: '0 auto', padding: '60px 24px' }}>
        <h2 style={{ fontSize: 28, fontWeight: 600, color: T.text, marginBottom: 8, textAlign: 'center' }}>
          For Contributors
        </h2>
        <p style={{ fontSize: 15, color: T.textMid, textAlign: 'center', marginBottom: 40 }}>
          Choose how you want to monetize your data
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
          <div style={{
            background: T.card,
            border: `1px solid ${T.border}`,
            borderRadius: 8,
            padding: 24,
          }}>
            <div style={{
              width: 40,
              height: 40,
              borderRadius: 6,
              background: T.greenLight,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: 16,
            }}>
              <UserGroupIcon style={{ width: 20, height: 20, color: T.green }} />
            </div>
            <h3 style={{ fontSize: 18, fontWeight: 600, color: T.text, marginBottom: 12 }}>Join a Union</h3>
            <p style={{ fontSize: 14, color: T.textMid, marginBottom: 16, lineHeight: 1.6 }}>
              Pool your data with others for better negotiating power. Unions handle pricing, licensing, and buyer relationships.
            </p>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
              {[
                'Higher average prices (3x individual)',
                'Collective negotiation power',
                '70% revenue share',
                'Democratic governance',
              ].map((item, idx) => (
                <li key={idx} style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
                  <CheckCircleIcon style={{ width: 16, height: 16, color: T.green, flexShrink: 0 }} />
                  <span style={{ fontSize: 13, color: T.textMid }}>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div style={{
            background: T.card,
            border: `1px solid ${T.border}`,
            borderRadius: 8,
            padding: 24,
          }}>
            <div style={{
              width: 40,
              height: 40,
              borderRadius: 6,
              background: T.primaryLight,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: 16,
            }}>
              <ChartBarIcon style={{ width: 20, height: 20, color: T.primary }} />
            </div>
            <h3 style={{ fontSize: 18, fontWeight: 600, color: T.text, marginBottom: 12 }}>Go Independent</h3>
            <p style={{ fontSize: 14, color: T.textMid, marginBottom: 16, lineHeight: 1.6 }}>
              Set your own prices and licensing terms. Deal directly with buyers and maintain full control.
            </p>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
              {[
                'Full pricing control',
                'Direct buyer relationships',
                '80% revenue share',
                'Flexible licensing terms',
              ].map((item, idx) => (
                <li key={idx} style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
                  <CheckCircleIcon style={{ width: 16, height: 16, color: T.primary, flexShrink: 0 }} />
                  <span style={{ fontSize: 13, color: T.textMid }}>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* For Buyers */}
      <section style={{ background: T.surface, padding: '60px 24px' }}>
        <div style={{ maxWidth: 900, margin: '0 auto' }}>
          <h2 style={{ fontSize: 28, fontWeight: 600, color: T.text, marginBottom: 8, textAlign: 'center' }}>
            For AI Companies
          </h2>
          <p style={{ fontSize: 15, color: T.textMid, textAlign: 'center', marginBottom: 40 }}>
            Access verified, high-quality training data
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24 }}>
            {[
              {
                icon: CheckCircleIcon,
                title: 'Verified Quality',
                desc: 'All contributions reviewed and verified before licensing',
                metric: '98% accuracy rate'
              },
              {
                icon: ShieldCheckIcon,
                title: 'Secure & Compliant',
                desc: 'Industry-standard data protection and privacy compliance',
                metric: 'GDPR compliant'
              },
              {
                icon: ChartBarIcon,
                title: 'Diverse Data',
                desc: 'Voice, text, documents, and sensor data across multiple languages',
                metric: '450+ datasets'
              },
            ].map((feature, idx) => {
              const Icon = feature.icon;
              return (
                <div key={idx} style={{
                  background: T.card,
                  border: `1px solid ${T.border}`,
                  borderRadius: 8,
                  padding: 24,
                }}>
                  <div style={{
                    width: 40,
                    height: 40,
                    borderRadius: 6,
                    background: T.primaryLight,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: 16,
                  }}>
                    <Icon style={{ width: 20, height: 20, color: T.primary }} />
                  </div>
                  <h3 style={{ fontSize: 16, fontWeight: 600, color: T.text, marginBottom: 8 }}>{feature.title}</h3>
                  <p style={{ fontSize: 14, color: T.textMid, lineHeight: 1.6, marginBottom: 12 }}>{feature.desc}</p>
                  <div style={{
                    fontSize: 12,
                    color: T.primary,
                    fontWeight: 500,
                    fontFamily: MONO,
                  }}>
                    {feature.metric}
                  </div>
                </div>
              );
            })}
          </div>

          <div style={{ textAlign: 'center', marginTop: 32 }}>
            <button onClick={onMarketplace} style={{
              background: T.primary,
              border: 'none',
              color: '#ffffff',
              padding: '12px 24px',
              borderRadius: 6,
              cursor: 'pointer',
              fontFamily: SANS,
              fontSize: 15,
              fontWeight: 500,
              display: 'inline-flex',
              alignItems: 'center',
              gap: 6,
            }}>
              Browse Available Datasets
              <ArrowRightIcon style={{ width: 16, height: 16 }} />
            </button>
          </div>
        </div>
      </section>

      {/* Trust Section */}
      <section style={{ padding: '60px 24px' }}>
        <div style={{ maxWidth: 900, margin: '0 auto' }}>
          <h2 style={{ fontSize: 28, fontWeight: 600, color: T.text, marginBottom: 40, textAlign: 'center' }}>
            How We Work
          </h2>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24 }}>
            {[
              { icon: ShieldCheckIcon, title: 'Secure Platform', desc: 'Industry-standard encryption and data protection' },
              { icon: CheckCircleIcon, title: 'Quality Control', desc: 'All contributions reviewed before going live' },
              { icon: CurrencyRupeeIcon, title: 'Reliable Payments', desc: 'Clear pricing and on-time payouts' },
            ].map((feature, idx) => {
              const Icon = feature.icon;
              return (
                <div key={idx} style={{ textAlign: 'center' }}>
                  <div style={{
                    width: 48,
                    height: 48,
                    borderRadius: 6,
                    background: T.primaryLight,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto 16px',
                  }}>
                    <Icon style={{ width: 24, height: 24, color: T.primary }} />
                  </div>
                  <h3 style={{ fontSize: 16, fontWeight: 600, color: T.text, marginBottom: 8 }}>{feature.title}</h3>
                  <p style={{ fontSize: 14, color: T.textMid, lineHeight: 1.6 }}>{feature.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ maxWidth: 900, margin: '0 auto', padding: '60px 24px', textAlign: 'center' }}>
        <h2 style={{ fontSize: 32, fontWeight: 600, color: T.text, marginBottom: 16 }}>
          Ready to Get Started?
        </h2>
        <p style={{ fontSize: 16, color: T.textMid, marginBottom: 32, maxWidth: 600, margin: '0 auto 32px' }}>
          Join thousands of contributors already earning from their data
        </p>
        <button onClick={onStart} style={{
          background: T.primary,
          border: 'none',
          color: '#ffffff',
          padding: '14px 28px',
          borderRadius: 6,
          cursor: 'pointer',
          fontFamily: SANS,
          fontSize: 16,
          fontWeight: 500,
          display: 'inline-flex',
          alignItems: 'center',
          gap: 8,
        }}>
          Create Your Account
          <ArrowRightIcon style={{ width: 18, height: 18 }} />
        </button>
      </section>

      {/* Footer */}
      <footer style={{
        background: T.surface,
        borderTop: `1px solid ${T.border}`,
        padding: '24px',
        textAlign: 'center',
      }}>
        <div style={{ fontSize: 13, color: T.textMid, marginBottom: 8 }}>
          © 2024 Chorus Data Union Platform
        </div>
        <div style={{ display: 'flex', gap: 16, justifyContent: 'center' }}>
          <button onClick={onAdmin} style={{
            background: 'transparent',
            border: 'none',
            color: T.textMid,
            cursor: 'pointer',
            fontSize: 13,
            textDecoration: 'underline',
          }}>
            Admin Login
          </button>
        </div>
      </footer>
    </div>
  );
}
