'use client';

import { useState } from 'react';
import { Card } from '@/app/components/ui/Card';
import { Button } from '@/app/components/ui/Button';
import { Badge } from '@/app/components/ui/Badge';
import { XMarkIcon, ClipboardDocumentIcon, CheckIcon } from '@heroicons/react/24/outline';

interface ApiKeyModalProps {
  apiKey: string;
  datasetName: string;
  onClose: () => void;
}

export function ApiKeyModal({ apiKey, datasetName, onClose }: ApiKeyModalProps) {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(apiKey);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 bg-text/50 flex items-center justify-center z-50 p-4" onClick={onClose}>
      <div onClick={(e) => e.stopPropagation()}>
        <Card className="max-w-lg w-full">
          <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="text-2xl font-bold text-text mb-2">API Key</h3>
            <p className="text-sm text-text-dim">{datasetName}</p>
          </div>
          <button onClick={onClose} className="text-text-dim hover:text-text">
            <XMarkIcon className="w-5 h-5" />
          </button>
        </div>

        <Badge color="warning" className="mb-3">
          Keep this secret!
        </Badge>

        <div className="bg-background border border-border rounded-lg p-4 mb-4">
          <code className="text-base font-mono text-text break-all">{apiKey}</code>
        </div>

        <div className="space-y-3 mb-4">
          <div>
            <div className="text-base font-semibold text-text mb-2">Usage Example (Python)</div>
            <div className="bg-background border border-border rounded p-3 text-base font-mono text-text-mid overflow-x-auto">
              {`import requests

headers = {"Authorization": f"Bearer ${apiKey}"}
response = requests.get(
    "https://api.dataunion.ai/v1/datasets/stream",
    headers=headers
)
data = response.json()`}
            </div>
          </div>

          <div className="text-sm text-text-dim">
            <strong>API Endpoint:</strong> https://api.dataunion.ai/v1/datasets/stream
            <br />
            <strong>Rate Limit:</strong> 1000 requests/hour
            <br />
            <strong>Documentation:</strong> docs.dataunion.ai/api
          </div>
        </div>

        <div className="flex gap-2">
          <Button onClick={copyToClipboard} className="flex-1">
            {copied ? (
              <>
                <CheckIcon className="w-5 h-5 inline mr-1" /> Copied!
              </>
            ) : (
              <>
                <ClipboardDocumentIcon className="w-5 h-5 inline mr-1" /> Copy API Key
              </>
            )}
          </Button>
          <Button variant="ghost" onClick={onClose}>
            Close
          </Button>
        </div>
        </Card>
      </div>
    </div>
  );
}
