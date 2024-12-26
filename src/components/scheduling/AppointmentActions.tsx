import React from 'react';
import { Calendar, Play, X, Edit2 } from 'lucide-react';

interface AppointmentActionsProps {
  status: string;
  loading: boolean;
  onStart: () => void;
  onEdit: () => void;
  onCancel: () => void;
}

export default function AppointmentActions({ 
  status, 
  loading, 
  onStart, 
  onEdit,
  onCancel 
}: AppointmentActionsProps) {
  if (status === 'cancelled') {
    return null;
  }

  return (
    <div className="mt-2 flex flex-wrap gap-2">
      <button
        onClick={onStart}
        disabled={loading || status === 'in_progress'}
        className={`inline-flex items-center px-3 py-1 text-xs font-medium rounded-md shadow-sm text-white
          ${loading || status === 'in_progress'
            ? 'bg-gray-400 cursor-not-allowed'
            : 'bg-ecovest-primary hover:bg-ecovest-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-ecovest-primary'
          }`}
      >
        <Play className="w-3.5 h-3.5 mr-1" />
        {loading ? 'Starting...' : status === 'in_progress' ? 'In Progress' : 'Start Service'}
      </button>

      <button
        onClick={onEdit}
        disabled={loading}
        className="inline-flex items-center px-3 py-1 text-xs font-medium rounded-md text-gray-700 bg-white border border-gray-300 hover:bg-gray-50"
      >
        <Edit2 className="w-3.5 h-3.5 mr-1" />
        Edit
      </button>

      <button
        onClick={onCancel}
        disabled={loading}
        className="inline-flex items-center px-3 py-1 text-xs font-medium rounded-md text-white bg-red-600 hover:bg-red-700"
      >
        <X className="w-3.5 h-3.5 mr-1" />
        Cancel
      </button>
    </div>
  );
}