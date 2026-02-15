import type { DataUnion } from '@/types/dataUnion';

export const MOCK_DATA_UNIONS: DataUnion[] = [
  {
    id: 'bharat-voice-collective',
    name: 'Bharat Voice Collective',
    tagline: 'Hindi speakers united for better AI representation',
    description: 'Member-owned co-operative of Hindi speakers across North India. Pool voice data to negotiate better rates with AI companies. Democratic governance, 70% revenue share, 3.2x market rate achieved through collective bargaining.',
    founded: '2023-06',
    verified: true,

    memberCount: 8847,
    datasetCount: 456,

    revenueShare: 70,
    totalEarningsDistributed: 8250000,

    specializations: ['Hindi Voice', 'Regional Accents', 'Code-Switching Hindi-English'],
    languages: ['Hindi', 'Hinglish'],
    dataTypes: ['voice'],

    buyerRating: 4.8,
    dataQualityScore: 94,
    activeDeals: 18,

    governanceModel: 'democratic',
    votingRights: true,

    website: 'bharatvoice.ai',
    contact: 'join@bharatvoice.ai'
  },
  {
    id: 'metro-wheels-collective',
    name: 'Metro Wheels Driver Collective',
    tagline: 'Ride-hailing drivers pooling mobility data for bargaining power',
    description: 'Co-operative of Ola, Uber, and ride-hailing drivers across metro cities. Pool trip data, earnings data, and route insights. Negotiate with city planners, transport companies, and research orgs. 75% revenue share, driver-owned governance.',
    founded: '2023-08',
    verified: true,

    memberCount: 12456,
    datasetCount: 234,

    revenueShare: 75,
    totalEarningsDistributed: 6800000,

    specializations: ['Urban Mobility', 'Traffic Patterns', 'Driver Economics'],
    languages: ['Hindi', 'English', 'Regional'],
    dataTypes: ['sensor'],

    buyerRating: 4.7,
    dataQualityScore: 91,
    activeDeals: 14,

    governanceModel: 'democratic',
    votingRights: true,

    website: 'metrowheels.org',
    contact: 'drivers@metrowheels.org'
  },
  {
    id: 'delivery-partners-united',
    name: 'Delivery Partners United',
    tagline: 'Food and package delivery workers bargaining collectively',
    description: 'Co-operative of delivery partners from Swiggy, Zomato, Amazon, and other platforms. Pool delivery data, route optimization insights, and demand patterns. Sell aggregated mobility analytics to city planners and logistics companies. 78% revenue share.',
    founded: '2024-01',
    verified: true,

    memberCount: 18234,
    datasetCount: 312,

    revenueShare: 78,
    totalEarningsDistributed: 4950000,

    specializations: ['Last-Mile Delivery', 'Urban Logistics', 'Demand Forecasting'],
    languages: ['Multi-lingual'],
    dataTypes: ['sensor'],

    buyerRating: 4.6,
    dataQualityScore: 88,
    activeDeals: 22,

    governanceModel: 'representative',
    votingRights: true,

    website: 'deliveryunited.in',
    contact: 'partners@deliveryunited.in'
  },
  {
    id: 'indie-content-creators',
    name: 'Independent Content Creators Union',
    tagline: 'Creators united for fair AI training',
    description: 'A union of writers, bloggers, and content creators licensing their text data. We specialize in high-quality, original content across multiple domains and ensure our members retain creative rights.',
    founded: '2024-01',
    verified: true,

    memberCount: 1523,
    datasetCount: 89,

    revenueShare: 75,
    totalEarningsDistributed: 1850000,

    specializations: ['Text Data', 'Creative Writing', 'Technical Documentation'],
    languages: ['English', 'Hindi', 'Mixed'],
    dataTypes: ['text', 'documents'],

    buyerRating: 4.6,
    dataQualityScore: 91,
    activeDeals: 15,

    governanceModel: 'representative',
    votingRights: true,

    website: 'iccunion.org',
    contact: 'hello@iccunion.org'
  },
  {
    id: 'medical-data-alliance',
    name: 'Medical Data Alliance',
    tagline: 'Healthcare professionals for medical AI',
    description: 'Verified healthcare professionals contributing anonymized medical case studies, diagnostic data, and clinical notes. Strict ethical guidelines and HIPAA-compliant data handling.',
    founded: '2023-09',
    verified: true,

    memberCount: 456,
    datasetCount: 34,

    revenueShare: 65,
    totalEarningsDistributed: 3100000,

    specializations: ['Medical Data', 'Healthcare', 'Clinical Notes'],
    languages: ['English'],
    dataTypes: ['text', 'documents'],

    buyerRating: 4.9,
    dataQualityScore: 98,
    activeDeals: 8,

    governanceModel: 'managed',
    votingRights: false,

    website: 'meddata-alliance.org',
    contact: 'info@meddata-alliance.org'
  },
  {
    id: 'global-polyglots',
    name: 'Global Polyglots Network',
    tagline: 'Multilingual excellence for language AI',
    description: 'A network of multilingual speakers contributing translation data, code-switching examples, and cross-lingual content. Focus on underrepresented language pairs and dialects.',
    founded: '2023-03',
    verified: true,

    memberCount: 3421,
    datasetCount: 203,

    revenueShare: 72,
    totalEarningsDistributed: 2980000,

    specializations: ['Multilingual', 'Translation', 'Code-Switching'],
    languages: ['50+ languages'],
    dataTypes: ['voice', 'text'],

    buyerRating: 4.7,
    dataQualityScore: 89,
    activeDeals: 31,

    governanceModel: 'democratic',
    votingRights: true,

    website: 'globalpolyglots.net'
  },
  {
    id: 'open-research-collective',
    name: 'Open Research Collective',
    tagline: 'Academic research for public good AI',
    description: 'Researchers and academics contributing research data, survey responses, and experimental results. All data is ethically sourced and properly anonymized. Proceeds support open science initiatives.',
    founded: '2024-02',
    verified: false,

    memberCount: 789,
    datasetCount: 45,

    revenueShare: 68,
    totalEarningsDistributed: 560000,

    specializations: ['Research Data', 'Survey Data', 'Academic'],
    languages: ['English', 'Multi'],
    dataTypes: ['text', 'documents', 'sensor'],

    buyerRating: 4.5,
    dataQualityScore: 92,
    activeDeals: 6,

    governanceModel: 'representative',
    votingRights: true,

    website: 'openresearch.io',
    contact: 'contact@openresearch.io'
  },
  {
    id: 'tamil-voice-cooperative',
    name: 'Tamil Voice Co-operative',
    tagline: 'Tamil speakers pooling voice data across South India',
    description: 'Member-owned co-operative of Tamil speakers in Tamil Nadu, Kerala, and diaspora. Negotiate collectively for better rates on Tamil voice datasets. Democratic governance, member voting on all deals. 72% revenue share, 2.8x independent rates.',
    founded: '2023-11',
    verified: true,

    memberCount: 6890,
    datasetCount: 287,

    revenueShare: 72,
    totalEarningsDistributed: 5420000,

    specializations: ['Tamil Voice', 'South Indian Accents', 'Colloquial Tamil'],
    languages: ['Tamil', 'Tanglish'],
    dataTypes: ['voice', 'text'],

    buyerRating: 4.8,
    dataQualityScore: 93,
    activeDeals: 16,

    governanceModel: 'democratic',
    votingRights: true,

    website: 'tamilvoice.org',
    contact: 'join@tamilvoice.org'
  }
];
