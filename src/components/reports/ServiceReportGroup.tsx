import React from 'react';
import { format } from 'date-fns';
import { ChevronRight } from 'lucide-react';
import JobNumber from './JobNumber';
import type { ServiceReport } from '../../types';

interface ServiceReportGroupProps {
  date: string;
  reports: ServiceReport[];
  onSelectReport: (report: ServiceReport) => void;
}

export default function ServiceReportGroup({ date, reports, onSelectReport }: ServiceReportGroupProps) {
  return (
    <div className="mb-6">
      <h3 className="text-lg font-medium text-gray-900 mb-3">
        {format(new Date(date), 'MMMM d, yyyy')}
      </h3>
      <div className="bg-white rounded-lg shadow divide-y divide-gray-200">
        {reports.map((report) => (
          <button
            key={report.id}
            onClick={() => onSelectReport(report)}
            className="w-full px-6 py-4 flex items-center justify-between hover:bg-gray-50 transition-colors text-left"
          >
            <div className="space-y-1">
              <h4 className="text-base font-medium text-gray-900">
                {report.customer?.name}
              </h4>
              <div className="flex items-center space-x-4">
                <p className="text-sm text-gray-500">
                  {format(new Date(report.service_date), 'h:mm a')}
                </p>
                <JobNumber number={report.job_number || 'N/A'} />
              </div>
            </div>
            <ChevronRight className="w-5 h-5 text-gray-400" />
          </button>
        ))}
      </div>
    </div>
  );
}