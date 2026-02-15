export interface User {
  name: string;
  email: string;
  mode: 'union' | 'independent';

  // Union members
  unionId?: string;
  unionName?: string;

  // Independent contributors only
  priceFloor?: number;
  allowedUses?: Record<string, boolean>;

  // Optional - can be set later during contribution
  languages?: string[];
  dataTypes?: string[];
}

export interface Contribution {
  id: number;
  type: string;
  title: string;
  lang: string;
  size: string;
  status: 'approved' | 'pending' | 'rejected';
  date: string;
  earnings: number;
  reason?: string;
}

export interface Dataset {
  id: string;
  name: string;
  type: string;
  samples: number;
  contributors: number;
  status: string;
  licensee: string | null;
  revenue: number;
  expiry: string | null;
}

export interface Language {
  id: string;
  label: string;
  code: string;
}

export interface DataType {
  id: string;
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  desc: string;
}

export interface VoicePrompt {
  id: string;
  text: string;
  translation: string;
}

export interface TextPrompt {
  id: string;
  cat: string;
  inst: string;
  q: string;
}
