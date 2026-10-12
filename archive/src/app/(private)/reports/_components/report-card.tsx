'use client';

import toast from 'react-hot-toast';
import { useState } from 'react';
import { updateReportAction } from '@/app/actions';
import type { reportsTable } from '@/lib/db/migrations/schema';

interface ReportCardProps {
  report: typeof reportsTable.$inferSelect;
}

export function ReportCard({ report }: ReportCardProps) {
  const [isValid, setIsValid] = useState(report.valid);

  async function handleToggleVisibility() {
    try {
      setIsValid(!isValid);
      const response = await updateReportAction(report.id);
      if (response?.id) {
        toast.success('Report updated successfully');
      }
    } catch (err: any) {
      setIsValid(!isValid);
      toast.error(err.message);
    }
  }

  return (
    <div className="card w-full bg-base-100 shadow-xl">
      <div className="card-body">
        <a href={report.repoUrl!} className="link card-title" target="_blank">
          {report.repoUrl?.split('github.com/').at(1)}
        </a>
        <p>{report.message}</p>
        <div className="card-actions justify-end">
          {isValid ? 'Valid' : 'Invalid'}
          <input
            type="checkbox"
            className="toggle toggle-warning"
            checked={isValid}
            onChange={handleToggleVisibility}
          />
        </div>
      </div>
    </div>
  );
}
