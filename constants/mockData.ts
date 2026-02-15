import type { Contribution, Dataset } from '@/types';

export const MOCK_CONTRIBUTIONS: Contribution[] = [
  { id: 1, type: "voice",     title: "ଆଜି ପାଗ ବହୁତ ଭଲ ଅଛି।",                 lang: "odia",  size: "3.2s",    status: "approved", date: "2026-02-10", earnings: 16 },
  { id: 2, type: "voice",     title: "ମୋର ନାମ ___ ଏବଂ ମୁଁ ଓଡ଼ିଶାରୁ।",         lang: "odia",  size: "4.1s",    status: "approved", date: "2026-02-10", earnings: 20.5 },
  { id: 3, type: "voice",     title: "ଏହି ଫସଲ ଏଥର ବହୁତ ଭଲ ହୋଇଛି।",           lang: "odia",  size: "3.8s",    status: "pending",  date: "2026-02-12", earnings: 0 },
  { id: 4, type: "text",      title: "NCERT Maths Q&A — Speed & Distance",     lang: "hindi", size: "420 tok", status: "approved", date: "2026-02-11", earnings: 0.84 },
  { id: 5, type: "text",      title: "Sentiment annotation batch (12 rows)",   lang: "odia",  size: "1.2k tok",status: "rejected", date: "2026-02-11", earnings: 0, reason: "Incomplete answers" },
  { id: 6, type: "documents", title: "Ration card scan — Bhadrak district",    lang: "odia",  size: "2 pages", status: "pending",  date: "2026-02-13", earnings: 0 },
];

export const MOCK_DATASETS: Dataset[] = [
  { id: "ds1", name: "Odia Voice Dataset v1",       type: "voice",     samples: 2847, contributors: 312, status: "licensed",   licensee: "VoiceAI Labs", revenue: 185000, expiry: "2026-08-10" },
  { id: "ds2", name: "Hindi Conversational v1",     type: "voice",     samples: 5210, contributors: 890, status: "licensed",   licensee: "BharatLLM",   revenue: 342000, expiry: "2026-12-01" },
  { id: "ds3", name: "Assamese Voice v1",           type: "voice",     samples: 420,  contributors: 67,  status: "collecting", licensee: null, revenue: 0,      expiry: null },
  { id: "ds4", name: "NCERT RLHF Pairs — Maths v1",type: "text",      samples: 1340, contributors: 204, status: "available",  licensee: null, revenue: 0,      expiry: null },
  { id: "ds5", name: "Govt Doc OCR — Odisha Pilot", type: "documents", samples: 890,  contributors: 45,  status: "collecting", licensee: null, revenue: 0,      expiry: null },
];
