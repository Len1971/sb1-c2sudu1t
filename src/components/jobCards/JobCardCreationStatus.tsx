import React from 'react';
import { CheckCircle, XCircle } from 'lucide-react';

interface JobCardCreationStatusProps {
  success: boolean;
  message: string;
  onClose: () => void;
}

export default function JobCardCreationStatus({ 
  success, 
  message, 
  onClose 
}: JobCardCreationStatusProps) {
  return (
    <div className="rounded-md bg-white p-4">
      <div className="flex">
        <div className="flex-shrink-0">
          {success ? (
            <CheckCircle className="h-5 w-5 text-green-400" />
          ) : (
            <XCircle className="h-5 w-5 text-red-400" />
          )}
        </div>
        <div className="ml-3">
          <h3 className={`text-sm font-medium ${
            success ? 'text-green-800' : 'text-red-800'
          }`}>
            {success ? 'Success' : 'Error'}
          </h3>
          <div className="mt-2 text-sm text-gray-700">
            <p>{message}</p>
          </div>
          <div className="mt-4">
            <button
              type="button"
              onClick={onClose}
              className="rounded-md bg-white text-sm font-medium text-ecovest-primary hover:text-ecovest-dark focus:outline-none focus:ring-2 focus:ring-ecovest-primary focus:ring-offset-2"
            >
              Dismiss
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}