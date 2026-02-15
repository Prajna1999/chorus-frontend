import type { DataType } from '@/types';
import {
  MicrophoneIcon,
  DocumentTextIcon,
  DocumentIcon,
  SignalIcon
} from '@heroicons/react/24/outline';

export const DATA_TYPES: DataType[] = [
  { id: "voice",     icon: MicrophoneIcon,    label: "Voice",        desc: "Read-aloud recordings in your language" },
  { id: "text",      icon: DocumentTextIcon,  label: "Text / RLHF",  desc: "Q&A pairs, instruction-following, annotations" },
  { id: "documents", icon: DocumentIcon,      label: "Documents",    desc: "Scanned forms, contracts, structured PDFs" },
  { id: "sensor",    icon: SignalIcon,        label: "Sensor",       desc: "GPS traces, IoT logs, environmental data" },
];
