'use client';

import { useState } from 'react';
import { MOCK_CONTRIBUTIONS } from '@/constants/mockData';
import { Landing } from './landing/Landing';
import { Onboarding } from './onboarding/Onboarding';
import { UnionRegistration } from './onboarding/UnionRegistration';
import { Dashboard } from './dashboard/Dashboard';
import { Admin } from './admin/Admin';
import { Marketplace } from './marketplace/Marketplace';
import type { User, Contribution } from '@/types';

export default function DataUnionApp() {
  const [view, setView] = useState<'landing' | 'onboard' | 'union-register' | 'dashboard' | 'admin' | 'marketplace'>('landing');
  const [user, setUser] = useState<User | null>(null);
  const [contribs, setContribs] = useState<Contribution[]>(MOCK_CONTRIBUTIONS);

  if (view === 'landing')
    return (
      <div className="min-h-screen bg-background font-sans text-text">
        <Landing
          onStart={() => setView('onboard')}
          onAdmin={() => setView('admin')}
          onMarketplace={() => setView('marketplace')}
          onRegisterUnion={() => setView('union-register')}
        />
      </div>
    );

  if (view === 'onboard')
    return (
      <div className="min-h-screen bg-background font-sans text-text">
        <Onboarding
          onComplete={(u) => {
            setUser(u);
            setView('dashboard');
          }}
          onBack={() => setView('landing')}
        />
      </div>
    );

  if (view === 'union-register')
    return (
      <div className="min-h-screen bg-background font-sans text-text">
        <UnionRegistration
          onComplete={() => setView('landing')}
          onBack={() => setView('landing')}
        />
      </div>
    );

  if (view === 'admin')
    return (
      <div className="min-h-screen bg-background font-sans text-text">
        <Admin contribs={contribs} onBack={() => setView('landing')} />
      </div>
    );

  if (view === 'marketplace')
    return (
      <div className="min-h-screen bg-background font-sans text-text">
        <Marketplace onBackToLanding={() => setView('landing')} />
      </div>
    );

  return (
    <div className="min-h-screen bg-background font-sans text-text">
      <Dashboard
        user={user!}
        contribs={contribs}
        setContribs={setContribs}
        onLogout={() => {
          setUser(null);
          setView('landing');
        }}
      />
    </div>
  );
}
