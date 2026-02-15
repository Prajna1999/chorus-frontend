import type { Dataset, License, DatasetRequest } from '@/types/marketplace';

export const MOCK_DATASETS: Dataset[] = [
  {
    id: 'ds-voice-odia-1',
    name: 'Odia Voice Dataset - Conversational',
    type: 'voice',
    description: 'High-quality conversational Odia voice recordings from 312 native speakers. Ideal for voice assistant training, TTS, and ASR models.',
    samples: 45000,
    contributors: 312,
    languages: ['odia'],
    size: '23 GB',
    quality: 'verified',
    seller: {
      type: 'union',
      name: 'Odia Speakers Union',
      rating: 4.8
    },
    pricingModel: 'public',
    pricing: {
      base: 50000,
      tiers: [
        { duration: 30, price: 50000 },
        { duration: 90, price: 120000, discount: 20 },
        { duration: 365, price: 400000, discount: 33 }
      ]
    },
    samples_preview: [
      { type: 'audio', preview: 'ମୁଁ ଆପଣଙ୍କୁ କିପରି ସାହାଯ୍ୟ କରିପାରିବି?' },
      { type: 'audio', preview: 'ଆଜି ମୌସମ କେମିତି ଅଛି?' }
    ],
    created: '2025-01-15',
    lastUpdated: '2025-02-10',
    tags: ['voice', 'odia', 'conversational', 'verified']
  },
  {
    id: 'ds-text-rlhf-1',
    name: 'Hindi RLHF Dataset - Instruction Following',
    type: 'text',
    description: 'Curated instruction-response pairs in Hindi for RLHF training. 15K high-quality examples covering diverse domains.',
    samples: 15000,
    contributors: 890,
    languages: ['hindi'],
    size: '45 MB',
    quality: 'high',
    seller: {
      type: 'union',
      name: 'Hindi Speakers Union',
      rating: 4.9
    },
    pricingModel: 'request-based',
    samples_preview: [
      { type: 'text', preview: 'निर्देश: भारत की राजधानी के बारे में बताएं\nउत्तर: भारत की राजधानी नई दिल्ली है...' },
      { type: 'text', preview: 'निर्देश: एक स्वस्थ नाश्ते की रेसिपी दें\nउत्तर: पोहा एक स्वस्थ विकल्प है...' }
    ],
    created: '2025-01-20',
    lastUpdated: '2025-02-12',
    tags: ['text', 'hindi', 'rlhf', 'instruction-following']
  },
  {
    id: 'ds-doc-ration-1',
    name: 'Ration Card Documents - Odisha',
    type: 'documents',
    description: 'Scanned and annotated ration card images from Odisha. Perfect for OCR and document understanding models.',
    samples: 8500,
    contributors: 24,
    languages: ['odia', 'english'],
    size: '12 GB',
    quality: 'high',
    seller: {
      type: 'independent',
      name: 'DocScan Collective',
      rating: 4.6
    },
    pricingModel: 'public',
    pricing: {
      base: 35000,
      tiers: [
        { duration: 30, price: 35000 },
        { duration: 90, price: 85000, discount: 19 },
        { duration: 365, price: 280000, discount: 33 }
      ]
    },
    samples_preview: [
      { type: 'image', preview: '[Ration card sample - PII redacted]' }
    ],
    created: '2025-02-01',
    lastUpdated: '2025-02-14',
    tags: ['documents', 'ocr', 'odia', 'government-docs']
  },
  {
    id: 'ds-sensor-iot-1',
    name: 'Agricultural Sensor Data - Eastern India',
    type: 'sensor',
    description: 'IoT sensor data from farms across eastern India. Temperature, humidity, soil moisture, rainfall data collected over 12 months.',
    samples: 2400000,
    contributors: 67,
    languages: [],
    size: '180 MB',
    quality: 'high',
    seller: {
      type: 'independent',
      name: 'AgriTech Data Cooperative',
      rating: 4.7
    },
    pricingModel: 'request-based',
    samples_preview: [
      { type: 'json', preview: '{"temp": 28.5, "humidity": 72, "soil_moisture": 0.45, "timestamp": "2024-06-15T14:30:00Z"}' }
    ],
    created: '2025-01-10',
    lastUpdated: '2025-02-08',
    tags: ['sensor', 'iot', 'agriculture', 'time-series']
  }
];

export const MOCK_LICENSES: License[] = [
  {
    id: 'lic-001',
    datasetId: 'ds-voice-odia-1',
    buyerId: 'buyer-001',
    type: 'training-only',
    duration: 90,
    startDate: '2025-02-01',
    expiryDate: '2025-05-02',
    price: 120000,
    status: 'active',
    downloadUrl: 'https://datasets.dataunion.ai/voice-odia-1/download?token=...',
    apiKey: 'du_live_abc123xyz789',
    downloadCount: 3,
    invoiceId: 'INV-2025-001',
    paymentStatus: 'paid'
  }
];

export const MOCK_REQUESTS: DatasetRequest[] = [
  {
    id: 'req-001',
    datasetId: 'ds-text-rlhf-1',
    buyer: {
      id: 'buyer-002',
      companyName: 'AI Labs India',
      email: 'procurement@ailabs.in',
      phone: '+91-9876543210'
    },
    useCase: 'Training a Hindi language model for customer support chatbot',
    estimatedVolume: '15K samples',
    budget: '₹1-2L',
    timeline: 'Need within 2 weeks',
    requirements: 'Must include diverse domains. Quality is critical.',
    status: 'quoted',
    quote: {
      price: 150000,
      duration: 90,
      terms: '90-day training license. Commercial deployment requires separate license.',
      validUntil: '2025-02-20'
    },
    createdAt: '2025-02-10',
    respondedAt: '2025-02-12'
  },
  {
    id: 'req-002',
    datasetId: 'ds-sensor-iot-1',
    buyer: {
      id: 'buyer-003',
      companyName: 'FarmTech Solutions',
      email: 'data@farmtech.co',
    },
    useCase: 'Research on crop yield prediction models',
    estimatedVolume: 'Full dataset',
    budget: 'Open to discussion',
    timeline: '1 month',
    requirements: 'Need metadata on farm locations and crop types',
    status: 'reviewing',
    createdAt: '2025-02-14'
  }
];
