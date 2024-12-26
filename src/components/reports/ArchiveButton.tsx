import React, { useState } from 'react';
import { Archive } from 'lucide-react';
import { archiveServiceReport } from '../../lib/serviceReports';
import Alert from '../ui/Alert';

interface ArchiveButtonProps {
  reportId: string;
  onArchive: () => void;
}

export default function ArchiveButton({ reportId, onArchive }: ArchiveButtonProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleArchive = async () => {
    if (!confirm('Are you sure you want to archive this report? Archived reports will no longer appear in the main list.')) {
      return;
    }

    try {
      setLoading(true);
      setError('');
      await archiveServiceReport(reportId);
      onArchive();
    } catch (err) {
      setError('Failed to archive report');
      console.error('Archive error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {error && <Alert type="error" message={error} className="mb-2" />}
      <button
        onClick={handleArchive}
        disabled={loading}
        className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50"
      >
        <Archive className="w-4 h-4 mr-2" />
        {loading ? 'Archiving...' : 'Archive'}
      </button>
    </>
  );
}