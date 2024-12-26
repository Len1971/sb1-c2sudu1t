import React, { useState } from 'react';
import { Printer, Mail, Save, Archive } from 'lucide-react';
import { saveReportToPDF } from '../../utils/reportExport';
import { archiveServiceReport } from '../../lib/serviceReports';
import Alert from '../ui/Alert';
import type { ServiceReport } from '../../types';

interface ReportActionsProps {
  report: ServiceReport;
  onUpdate?: () => void;
}

export default function ReportActions({ report, onUpdate }: ReportActionsProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleArchive = async () => {
    if (!confirm('Are you sure you want to archive this report? The report will be compressed and stored in the archive.')) {
      return;
    }

    try {
      setLoading(true);
      setError('');
      await archiveServiceReport(report);
      if (onUpdate) {
        onUpdate();
      }
    } catch (err) {
      setError('Failed to archive report');
      console.error('Archive error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const handleEmail = async () => {
    try {
      await fetch('/api/email-report', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ reportId: report.id })
      });
    } catch (error) {
      console.error('Failed to send email:', error);
    }
  };

  const handleSave = () => {
    saveReportToPDF(report);
  };

  return (
    <div className="flex flex-col space-y-2">
      {error && <Alert type="error" message={error} />}
      
      <div className="flex space-x-2 print:hidden">
        <button
          onClick={handlePrint}
          className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
        >
          <Printer className="w-4 h-4 mr-2" />
          Print
        </button>

        <button
          onClick={handleEmail}
          className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
        >
          <Mail className="w-4 h-4 mr-2" />
          Email
        </button>

        <button
          onClick={handleSave}
          className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
        >
          <Save className="w-4 h-4 mr-2" />
          Save PDF
        </button>

        <button
          onClick={handleArchive}
          disabled={loading || report.archived}
          className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50"
        >
          <Archive className="w-4 h-4 mr-2" />
          {loading ? 'Archiving...' : report.archived ? 'Archived' : 'Archive'}
        </button>
      </div>
    </div>
  );
}