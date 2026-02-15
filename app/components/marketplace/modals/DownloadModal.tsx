'use client';

import { Card } from '@/app/components/ui/Card';
import { Button } from '@/app/components/ui/Button';
import { Badge } from '@/app/components/ui/Badge';
import {
  XMarkIcon,
  ArrowDownTrayIcon,
  DocumentArrowDownIcon,
  CodeBracketIcon
} from '@heroicons/react/24/outline';

interface DownloadModalProps {
  datasetName: string;
  size: string;
  downloadUrl: string;
  onClose: () => void;
}

export function DownloadModal({ datasetName, size, downloadUrl, onClose }: DownloadModalProps) {
  const handleDownload = (format: 'zip' | 'tar') => {
    // Simulate download
    const link = document.createElement('a');
    link.href = `${downloadUrl}?format=${format}`;
    link.download = `${datasetName.replace(/\s+/g, '-').toLowerCase()}.${format}`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    // In production, this would trigger the actual download
    alert(`Download started: ${datasetName}.${format}\n\nIn production, this would download from your secure S3/GCS bucket.`);
  };

  return (
    <div className="fixed inset-0 bg-text/50 flex items-center justify-center z-50 p-4" onClick={onClose}>
      <div onClick={(e) => e.stopPropagation()}>
        <Card className="max-w-lg w-full">
          <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="text-2xl font-bold text-text mb-2">Download Dataset</h3>
            <p className="text-sm text-text-dim">{datasetName} • {size}</p>
          </div>
          <button onClick={onClose} className="text-text-dim hover:text-text">
            <XMarkIcon className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-3 mb-4">
          <div>
            <Badge color="info" className="mb-2">Choose Format</Badge>
            <div className="space-y-2">
              <button
                onClick={() => handleDownload('zip')}
                className="w-full flex items-center justify-between p-3 border border-border rounded-lg hover:border-success hover:bg-success-dim transition-all"
              >
                <div className="flex items-center gap-3">
                  <DocumentArrowDownIcon className="w-6 h-6 text-text-mid" />
                  <div className="text-left">
                    <div className="text-sm font-semibold text-text">ZIP Archive</div>
                    <div className="text-sm text-text-dim">Recommended for Windows</div>
                  </div>
                </div>
                <ArrowDownTrayIcon className="w-5 h-5 text-text-dim" />
              </button>

              <button
                onClick={() => handleDownload('tar')}
                className="w-full flex items-center justify-between p-3 border border-border rounded-lg hover:border-success hover:bg-success-dim transition-all"
              >
                <div className="flex items-center gap-3">
                  <CodeBracketIcon className="w-6 h-6 text-text-mid" />
                  <div className="text-left">
                    <div className="text-sm font-semibold text-text">TAR.GZ Archive</div>
                    <div className="text-sm text-text-dim">Recommended for Linux/Mac</div>
                  </div>
                </div>
                <ArrowDownTrayIcon className="w-5 h-5 text-text-dim" />
              </button>
            </div>
          </div>

          <div className="bg-info-dim border border-info-border rounded p-3 text-base text-info">
            <strong>What's included:</strong>
            <ul className="mt-1 space-y-0.5 ml-4 list-disc">
              <li>Raw dataset files (JSON/CSV/Audio/Images)</li>
              <li>Metadata and annotations</li>
              <li>README with usage instructions</li>
              <li>License certificate (PDF)</li>
            </ul>
          </div>

          <div className="text-sm text-text-dim">
            <strong>Download via CLI:</strong>
            <div className="bg-background border border-border rounded p-3 mt-1 font-mono overflow-x-auto text-base">
              curl -H "Authorization: Bearer YOUR_API_KEY" {downloadUrl} -o dataset.zip
            </div>
          </div>
        </div>

        <Button variant="ghost" onClick={onClose} className="w-full">
          Cancel
        </Button>
        </Card>
      </div>
    </div>
  );
}
