export interface DataUnion {
  id: string;
  name: string;
  description: string;
  tagline: string;
  founded: string;
  verified: boolean;

  // Membership
  memberCount: number;
  datasetCount: number;

  // Revenue
  revenueShare: number; // e.g., 70 means 70% to contributors
  totalEarningsDistributed: number;

  // Specialization
  specializations: string[]; // e.g., ["Voice Data", "Indian Languages", "Medical"]
  languages: string[]; // e.g., ["Hindi", "Odia", "Bengali"]
  dataTypes: string[]; // e.g., ["voice", "text", "documents"]

  // Track Record
  buyerRating: number; // 1-5
  dataQualityScore: number; // 1-100
  activeDeals: number;

  // Governance
  governanceModel: 'democratic' | 'representative' | 'managed';
  votingRights: boolean;

  // Contact
  website?: string;
  contact?: string;
}
