export interface Dataset {
  id: string;
  name: string;
  type: 'voice' | 'text' | 'documents' | 'sensor';
  description: string;

  // Data details
  samples: number;
  contributors: number;
  languages: string[];
  size: string;
  quality: 'high' | 'medium' | 'verified';

  // Seller info
  seller: {
    type: 'union' | 'independent';
    name: string;
    rating: number;
  };

  // Pricing model
  pricingModel: 'public' | 'request-based';

  // Public pricing (only if pricingModel === 'public')
  pricing?: {
    base: number; // Base price in ₹
    tiers: {
      duration: 30 | 90 | 365;
      price: number;
      discount?: number;
    }[];
  };

  // Sample data
  samples_preview: {
    type: string;
    preview: string;
  }[];

  // Metadata
  created: string;
  lastUpdated: string;
  tags: string[];
}

export interface License {
  id: string;
  datasetId: string;
  buyerId: string;

  // License details
  type: 'training-only' | 'commercial' | 'research';
  duration: number; // days
  startDate: string;
  expiryDate: string;

  // Pricing
  price: number;
  status: 'active' | 'expired' | 'cancelled';

  // Download
  downloadUrl?: string;
  apiKey?: string;
  downloadCount: number;

  // Transaction
  invoiceId: string;
  paymentStatus: 'paid' | 'pending' | 'failed';
}

export interface DatasetRequest {
  id: string;
  datasetId: string;

  // Buyer info
  buyer: {
    id: string;
    companyName: string;
    email: string;
    phone?: string;
  };

  // Request details
  useCase: string;
  estimatedVolume: string;
  budget?: string;
  timeline: string;
  requirements: string;

  // Status
  status: 'pending' | 'reviewing' | 'quoted' | 'accepted' | 'rejected';

  // Quote (if seller responds)
  quote?: {
    price: number;
    duration: number;
    terms: string;
    validUntil: string;
  };

  // Dates
  createdAt: string;
  respondedAt?: string;
}

export interface Buyer {
  id: string;
  companyName: string;
  email: string;
  phone?: string;
  contactName: string;

  // Account
  accountType: 'startup' | 'enterprise' | 'research';
  verified: boolean;

  // Billing
  billingAddress: {
    street: string;
    city: string;
    state: string;
    pincode: string;
    country: string;
    gst?: string;
  };
}

// Market trading types
export interface Bid {
  id: string;
  buyerId: string;
  buyerName: string;
  price: number; // Price per sample
  quantity: number; // Number of samples
  timestamp: Date;
  status: 'active' | 'filled' | 'cancelled';
}

export interface Ask {
  id: string;
  sellerId: string;
  sellerName: string;
  price: number; // Price per sample
  quantity: number; // Number of samples
  timestamp: Date;
  status: 'active' | 'filled' | 'cancelled';
}

export interface Trade {
  id: string;
  price: number;
  quantity: number;
  timestamp: Date;
  buyerId: string;
  sellerId: string;
}

export interface MarketData {
  currentPrice: number;
  priceChange24h: number;
  priceChangePercent: number;
  volume24h: number;
  high24h: number;
  low24h: number;
  bids: Bid[];
  asks: Ask[];
  recentTrades: Trade[];
}
