'use client';

import { Card } from '@/app/components/ui/Card';
import { Badge } from '@/app/components/ui/Badge';
import { DATA_TYPES } from '@/constants/dataTypes';
import {
  InformationCircleIcon,
  CheckCircleIcon,
  ClockIcon,
  BanknotesIcon,
  CalendarIcon
} from '@heroicons/react/24/outline';
import type { Contribution, User } from '@/types';

interface EarningsTabProps {
  contribs: Contribution[];
  user: User;
}

// Mock payment history
const mockPaymentHistory = [
  {
    id: 'p1',
    date: '2025-02-01',
    amount: 8450,
    status: 'paid' as const,
    method: 'UPI',
    transactionId: 'TXN202502011234',
    description: 'Monthly payout - Jan 2025'
  },
  {
    id: 'p2',
    date: '2025-01-01',
    amount: 7820,
    status: 'paid' as const,
    method: 'Bank Transfer',
    transactionId: 'TXN202501015678',
    description: 'Monthly payout - Dec 2024'
  },
  {
    id: 'p3',
    date: '2024-12-01',
    amount: 6950,
    status: 'paid' as const,
    method: 'UPI',
    transactionId: 'TXN202412019876',
    description: 'Monthly payout - Nov 2024'
  }
];

const mockUpcomingPayout = {
  estimatedAmount: 12450,
  payoutDate: '2025-03-01',
  samplesIncluded: 145,
  status: 'processing' as const
};

export function EarningsTab({ contribs, user }: EarningsTabProps) {
  const approved = contribs.filter((c) => c.status === 'approved');
  const total = approved.reduce((s, c) => s + c.earnings, 0);
  const byType: Record<string, { e: number; n: number }> = {};
  approved.forEach((c) => {
    if (!byType[c.type]) byType[c.type] = { e: 0, n: 0 };
    byType[c.type].e += c.earnings;
    byType[c.type].n += 1;
  });
  const share = user?.mode === 'union' ? 70 : 80;

  const colorMap: Record<string, string> = {
    voice: 'text-success',
    text: 'text-info',
    documents: 'text-warning',
    sensor: 'text-accent'
  };

  const totalPaid = mockPaymentHistory.reduce((sum, p) => sum + p.amount, 0);

  return (
    <div className="space-y-6">
      {/* Total Earnings Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card className="p-6 bg-success-dim border-success-border text-center">
          <div className="text-xs text-success font-mono tracking-widest uppercase mb-2">Total Earned</div>
          <div className="text-4xl font-bold text-success font-mono mb-2">
            ₹{total.toLocaleString()}
          </div>
          <div className="text-sm text-text-dim">
            {approved.length} approved contributions · {share}% revenue share
          </div>
        </Card>

        <Card className="p-6 bg-info-dim border-info-border text-center">
          <div className="text-xs text-info font-mono tracking-widest uppercase mb-2">Total Paid Out</div>
          <div className="text-4xl font-bold text-info font-mono mb-2">
            ₹{totalPaid.toLocaleString()}
          </div>
          <div className="text-sm text-text-dim">
            {mockPaymentHistory.length} successful payments
          </div>
        </Card>
      </div>

      {/* Upcoming Payout */}
      <Card className="p-6 bg-warning-dim/30 border-warning-border">
        <div className="flex items-start gap-3">
          <ClockIcon className="w-6 h-6 text-warning flex-shrink-0" />
          <div className="flex-1">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-base font-bold text-text">Upcoming Payout</h3>
              <Badge color="warning">Processing</Badge>
            </div>
            <div className="grid grid-cols-3 gap-4">
              <div>
                <div className="text-xs text-text-dim mb-1">Estimated Amount</div>
                <div className="text-xl font-bold text-warning font-mono">
                  ₹{mockUpcomingPayout.estimatedAmount.toLocaleString()}
                </div>
              </div>
              <div>
                <div className="text-xs text-text-dim mb-1">Payout Date</div>
                <div className="text-sm text-text font-semibold">
                  {new Date(mockUpcomingPayout.payoutDate).toLocaleDateString('en-US', {
                    month: 'short',
                    day: 'numeric',
                    year: 'numeric'
                  })}
                </div>
              </div>
              <div>
                <div className="text-xs text-text-dim mb-1">Samples Included</div>
                <div className="text-sm text-text font-semibold">{mockUpcomingPayout.samplesIncluded}</div>
              </div>
            </div>
          </div>
        </div>
      </Card>

      {/* Earnings by Data Type */}
      <Card className="p-6">
        <h3 className="text-base font-bold text-text mb-4">Earnings by Data Type</h3>
        <div className="space-y-3">
          {Object.entries(byType).map(([type, data]) => {
            const dt = DATA_TYPES.find((d) => d.id === type);
            const Icon = dt?.icon;
            const color = colorMap[type] || 'text-success';
            const percentage = ((data.e / total) * 100).toFixed(1);

            return (
              <div key={type} className="flex justify-between items-center py-3 border-b border-border last:border-0">
                <div className="flex items-center gap-3 flex-1">
                  {Icon && (
                    <div className="w-10 h-10 rounded-lg bg-surface flex items-center justify-center">
                      <Icon className="w-5 h-5 text-text-mid" />
                    </div>
                  )}
                  <div className="flex-1">
                    <div className="text-sm font-semibold text-text">{dt?.label}</div>
                    <div className="text-xs text-text-dim font-mono">
                      {data.n} contributions · {percentage}% of total
                    </div>
                  </div>
                </div>
                <span className={`text-base font-bold ${color} font-mono`}>
                  ₹{data.e.toLocaleString()}
                </span>
              </div>
            );
          })}
        </div>
      </Card>

      {/* Payment History */}
      <div>
        <div className="flex items-center gap-2 mb-4">
          <BanknotesIcon className="w-6 h-6 text-success" />
          <h3 className="text-xl font-bold text-text">Payment History</h3>
        </div>

        <div className="space-y-3">
          {mockPaymentHistory.map((payment) => (
            <Card key={payment.id} className="p-5">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-success-dim flex items-center justify-center">
                    <CheckCircleIcon className="w-5 h-5 text-success" />
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-text">{payment.description}</div>
                    <div className="text-xs text-text-dim">
                      {new Date(payment.date).toLocaleDateString('en-US', {
                        month: 'long',
                        day: 'numeric',
                        year: 'numeric'
                      })}
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-xl font-bold text-success font-mono">₹{payment.amount.toLocaleString()}</div>
                  <Badge color="success">Paid</Badge>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4 pt-3 border-t border-border text-xs">
                <div>
                  <span className="text-text-dim">Method: </span>
                  <span className="text-text font-semibold">{payment.method}</span>
                </div>
                <div>
                  <span className="text-text-dim">Transaction ID: </span>
                  <span className="text-text font-mono">{payment.transactionId}</span>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Info Banner */}
      <Card className="p-5 bg-info-dim border-info-border">
        <div className="flex items-start gap-3">
          <InformationCircleIcon className="w-6 h-6 text-info flex-shrink-0" />
          <div>
            <div className="font-bold text-text mb-1">Payment Schedule</div>
            <p className="text-sm text-text-mid leading-relaxed">
              {user?.mode === 'union'
                ? 'Payouts are processed monthly on the 1st. Your union negotiates bulk deals and distributes earnings based on contribution quality and volume. Revenue share: 70%.'
                : 'Payouts are processed monthly. You earn 80% revenue share on direct licenses. Payments are made via your preferred method (UPI/Bank Transfer).'}
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
}
