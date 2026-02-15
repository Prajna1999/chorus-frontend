'use client';

import { Card } from '@/app/components/ui/Card';
import { Button } from '@/app/components/ui/Button';
import { Divider } from '@/app/components/ui/Divider';
import { XMarkIcon, ArrowDownTrayIcon, PrinterIcon } from '@heroicons/react/24/outline';
import type { License } from '@/types/marketplace';

interface InvoiceModalProps {
  license: License;
  datasetName: string;
  onClose: () => void;
}

export function InvoiceModal({ license, datasetName, onClose }: InvoiceModalProps) {
  const tax = license.price * 0.18;
  const total = license.price + tax;

  const handleDownload = () => {
    alert('Invoice PDF download started!\n\nIn production, this would generate and download a PDF invoice.');
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 bg-text/50 flex items-center justify-center z-50 p-4" onClick={onClose}>
      <div onClick={(e) => e.stopPropagation()}>
        <Card className="max-w-2xl w-full max-h-[90vh] overflow-y-auto">
          <div className="flex justify-between items-start mb-6">
          <div>
            <h3 className="text-2xl font-bold text-text mb-2">Invoice</h3>
            <p className="text-sm text-text-dim">{license.invoiceId}</p>
          </div>
          <button onClick={onClose} className="text-text-dim hover:text-text">
            <XMarkIcon className="w-5 h-5" />
          </button>
        </div>

        {/* Invoice Content */}
        <div className="space-y-4 mb-6">
          {/* Header */}
          <div className="flex justify-between">
            <div>
              <div className="text-sm font-bold text-text mb-1">CHORUS</div>
              <div className="text-xs text-text-dim">
                123 Data Street<br />
                Bangalore, KA 560001<br />
                GSTIN: 29ABCDE1234F1Z5
              </div>
            </div>
            <div className="text-right">
              <div className="text-xs text-text-dim mb-1">Invoice Date</div>
              <div className="text-sm font-semibold text-text">
                {new Date(license.startDate).toLocaleDateString('en-IN')}
              </div>
            </div>
          </div>

          <Divider />

          {/* Bill To */}
          <div>
            <div className="text-xs font-semibold text-text mb-1">BILL TO</div>
            <div className="text-xs text-text-mid">
              Acme AI Labs<br />
              billing@acme.ai<br />
              License ID: {license.id}
            </div>
          </div>

          <Divider />

          {/* Items */}
          <div>
            <div className="text-xs font-semibold text-text mb-2">ITEMS</div>
            <table className="w-full text-xs">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-2 text-text-dim font-semibold">Description</th>
                  <th className="text-right py-2 text-text-dim font-semibold">Duration</th>
                  <th className="text-right py-2 text-text-dim font-semibold">Amount</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="py-2 text-text">
                    <div className="font-semibold">{datasetName}</div>
                    <div className="text-text-dim">Dataset License - {license.type}</div>
                  </td>
                  <td className="text-right py-2 text-text">{license.duration} days</td>
                  <td className="text-right py-2 text-text font-mono">₹{license.price.toLocaleString()}</td>
                </tr>
              </tbody>
            </table>
          </div>

          <Divider />

          {/* Totals */}
          <div className="space-y-2">
            <div className="flex justify-between text-xs">
              <span className="text-text-dim">Subtotal</span>
              <span className="text-text font-mono">₹{license.price.toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-xs">
              <span className="text-text-dim">GST (18%)</span>
              <span className="text-text font-mono">₹{tax.toLocaleString()}</span>
            </div>
            <Divider />
            <div className="flex justify-between text-sm">
              <span className="font-bold text-text">Total Amount</span>
              <span className="font-bold text-success font-mono">₹{total.toLocaleString()}</span>
            </div>
          </div>

          {/* Payment Info */}
          <div className="bg-success-dim border border-success-border rounded p-3">
            <div className="text-xs font-semibold text-success mb-1">PAYMENT STATUS: PAID</div>
            <div className="text-xs text-text-dim">
              Paid on {new Date(license.startDate).toLocaleDateString('en-IN')}
              <br />
              Payment Method: Razorpay
            </div>
          </div>

          <div className="text-[10px] text-text-dim text-center pt-4 border-t border-border">
            This is a computer-generated invoice and does not require a signature.
            <br />
            For support, contact support@dataunion.ai
          </div>
        </div>

        <div className="flex gap-2">
          <Button onClick={handleDownload} className="flex-1">
            <ArrowDownTrayIcon className="w-5 h-5 inline mr-1" /> Download PDF
          </Button>
          <Button variant="ghost" onClick={handlePrint}>
            <PrinterIcon className="w-5 h-5 inline mr-1" /> Print
          </Button>
        </div>
        </Card>
      </div>
    </div>
  );
}
