import React from 'react';
import { FileText } from 'lucide-react';
import ServiceReportList from '../components/reports/ServiceReportList';
import { useServiceReports } from '../hooks/useServiceReports';
import LoadingSpinner from '../components/ui/LoadingSpinner';
import Alert from '../components/ui/Alert';

export default function Reports() {
  const { reports, loading, error } = useServiceReports();

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
          <FileText className="w-6 h-6 text-gray-500" />
          <h1 className="text-2xl font-semibold text-gray-900">Service Reports</h1>
        </div>
      </div>

      <ServiceReportList reports={reports} />
    </div>
  );
}