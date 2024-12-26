import React from 'react';
import { Archive } from 'lucide-react';
import ServiceReportList from '../components/reports/ServiceReportList';
import { useArchivedReports } from '../hooks/useArchivedReports';
import LoadingSpinner from '../components/ui/LoadingSpinner';
import Alert from '../components/ui/Alert';

export default function ArchivedReports() {
  const { reports, loading, error } = useArchivedReports();

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <Alert type="error" message={error} />;
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <div className="flex items-center gap-2">
          <Archive className="w-6 h-6 text-gray-500" />
          <h1 className="text-2xl font-semibold text-gray-900">Archived Reports</h1>
        </div>
        <span className="text-sm text-gray-500">
          {reports.length} archived report{reports.length !== 1 ? 's' : ''}
        </span>
      </div>

      <ServiceReportList reports={reports} />
    </div>
  );
}