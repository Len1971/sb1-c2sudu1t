import React, { useState } from 'react';
import { FileText, Upload } from 'lucide-react';
import ServiceReportList from '../components/reports/ServiceReportList';
import ExcelUpload from '../components/jobCards/ExcelUpload';
import JobCardPreview from '../components/jobCards/JobCardPreview';
import JobCardCreationStatus from '../components/jobCards/JobCardCreationStatus';
import { createJobCardsFromExcel } from '../lib/jobCards/creator';
import { useServiceReports } from '../hooks/useServiceReports';
import LoadingSpinner from '../components/ui/LoadingSpinner';
import Alert from '../components/ui/Alert';
import type { JobCardData } from '../types/jobCards';

export default function JobCards() {
  const { reports, loading, error, refetch } = useServiceReports();
  const [showUpload, setShowUpload] = useState(false);
  const [previewData, setPreviewData] = useState<JobCardData[] | null>(null);
  const [creationStatus, setCreationStatus] = useState<{
    show: boolean;
    success: boolean;
    message: string;
  }>({ show: false, success: false, message: '' });

  const handleCreateJobCards = async () => {
    if (!previewData) return;

    try {
      await createJobCardsFromExcel(previewData);
      setCreationStatus({
        show: true,
        success: true,
        message: `Successfully created ${previewData.length} job card${previewData.length !== 1 ? 's' : ''}`
      });
      setPreviewData(null);
      setShowUpload(false);
      refetch();
    } catch (err) {
      setCreationStatus({
        show: true,
        success: false,
        message: 'Failed to create job cards. Please try again.'
      });
    }
  };

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
          <h1 className="text-2xl font-semibold text-gray-900">Job Cards</h1>
        </div>
        <button
          onClick={() => setShowUpload(true)}
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-ecovest-primary hover:bg-ecovest-dark"
        >
          <Upload className="w-4 h-4 mr-2" />
          Upload Excel
        </button>
      </div>

      {creationStatus.show && (
        <div className="mb-8">
          <JobCardCreationStatus
            success={creationStatus.success}
            message={creationStatus.message}
            onClose={() => setCreationStatus({ ...creationStatus, show: false })}
          />
        </div>
      )}

      {showUpload && !previewData && (
        <div className="bg-white rounded-lg shadow p-6 mb-8">
          <ExcelUpload onDataParsed={setPreviewData} />
        </div>
      )}

      {previewData && (
        <div className="bg-white rounded-lg shadow p-6 mb-8">
          <JobCardPreview
            data={previewData}
            onConfirm={handleCreateJobCards}
            onCancel={() => {
              setPreviewData(null);
              setShowUpload(false);
            }}
          />
        </div>
      )}

      <ServiceReportList reports={reports} onUpdate={refetch} />
    </div>
  );
}