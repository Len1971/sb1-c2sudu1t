import React, { useState } from 'react';
import { FileText } from 'lucide-react';
import ServiceReportGroup from './ServiceReportGroup';
import ReportDetails from './ReportDetails';
import { groupReportsByDate } from '../../utils/reports';
import type { ServiceReport } from '../../types';

interface ServiceReportListProps {
  reports: ServiceReport[];
  onUpdate?: () => void;
}

export default function ServiceReportList({ reports, onUpdate }: ServiceReportListProps) {
  const [selectedReport, setSelectedReport] = useState<ServiceReport | null>(null);
  const groupedReports = groupReportsByDate(reports);

  if (reports.length === 0) {
    return (
      <div className="text-center py-12 bg-white rounded-lg shadow">
        <FileText className="mx-auto h-12 w-12 text-gray-400" />
        <h3 className="mt-2 text-sm font-medium text-gray-900">No reports</h3>
        <p className="mt-1 text-sm text-gray-500">
          Service reports will appear here once services are completed.
        </p>
      </div>
    );
  }

  return (
    <>
      <div className="space-y-8">
        {Array.from(groupedReports.entries()).map(([date, dateReports]) => (
          <ServiceReportGroup
            key={date}
            date={date}
            reports={dateReports}
            onSelectReport={setSelectedReport}
          />
        ))}
      </div>

      {selectedReport && (
        <ReportDetails
          report={selectedReport}
          onClose={() => setSelectedReport(null)}
          onUpdate={() => {
            setSelectedReport(null);
            if (onUpdate) {
              onUpdate();
            }
          }}
        />
      )}
    </>
  );
}