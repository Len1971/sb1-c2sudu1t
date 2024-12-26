import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { RefreshCw } from 'lucide-react';
import { reopenService } from '../../lib/services';
import Alert from '../ui/Alert';

interface ReopenServiceButtonProps {
  appointmentId: string;
  onReopen?: () => void;
}

export default function ReopenServiceButton({ appointmentId, onReopen }: ReopenServiceButtonProps) {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleReopen = async () => {
    if (!confirm('Are you sure you want to reopen this service?')) {
      return;
    }

    try {
      setLoading(true);
      setError('');
      await reopenService(appointmentId);
      navigate(`/service/${appointmentId}`);
      if (onReopen) {
        onReopen();
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to reopen service');
      console.error('Reopen service error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {error && <Alert type="error" message={error} className="mt-2" />}
      <button
        onClick={handleReopen}
        disabled={loading}
        className="inline-flex items-center px-3 py-1.5 border border-transparent text-sm font-medium rounded-md text-white bg-ecovest-primary hover:bg-ecovest-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-ecovest-primary disabled:opacity-50"
      >
        <RefreshCw className="w-4 h-4 mr-1.5" />
        {loading ? 'Reopening...' : 'Reopen Service'}
      </button>
    </>
  );
}