import React, { useState } from 'react';
import { format } from 'date-fns';
import { X, Edit2 } from 'lucide-react';
import ReportActions from './ReportActions';
import JobNumber from './JobNumber';
import TechnicianSignature from './TechnicianSignature';
import EditReportForm from './EditReportForm';
import type { ServiceReport } from '../../types';

interface ReportDetailsProps {
  report: ServiceReport;
  onClose: () => void;
  onUpdate?: () => void;
}

export default function ReportDetails({ report, onClose, onUpdate }: ReportDetailsProps) {
  const [isEditing, setIsEditing] = useState(false);

  if (isEditing) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
        <div className="bg-white rounded-lg p-6 max-w-2xl w-full">
          <EditReportForm
            report={report}
            onSave={() => {
              setIsEditing(false);
              if (onUpdate) onUpdate();
            }}
            onCancel={() => setIsEditing(false)}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg p-6 max-w-2xl w-full">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h2 className="text-xl font-semibold">{report.customer?.name}</h2>
            <JobNumber number={report.job_number || 'N/A'} className="mt-1" />
          </div>
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setIsEditing(true)}
              className="text-gray-500 hover:text-gray-700"
            >
              <Edit2 className="w-5 h-5" />
            </button>
            <ReportActions report={report} onUpdate={onUpdate} />
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <h3 className="font-medium text-gray-900">Service Details</h3>
            <p className="text-gray-600">{format(new Date(report.service_date), 'PPpp')}</p>
            <p className="text-gray-600">Treatment: {report.treatment_type}</p>
          </div>
          
          <div>
            <h3 className="font-medium text-gray-900">Areas Treated</h3>
            <div className="flex flex-wrap gap-2 mt-1">
              {report.areas_treated.map((area) => (
                <span key={area} className="px-2 py-1 bg-gray-100 rounded-full text-sm">
                  {area}
                </span>
              ))}
            </div>
          </div>

          <div>
            <h3 className="font-medium text-gray-900">Products Used</h3>
            <div className="flex flex-wrap gap-2 mt-1">
              {report.products_used.map((product) => (
                <span key={product} className="px-2 py-1 bg-blue-100 rounded-full text-sm">
                  {product}
                </span>
              ))}
            </div>
          </div>

          {report.notes && (
            <div>
              <h3 className="font-medium text-gray-900">Notes</h3>
              <p className="text-gray-600 whitespace-pre-wrap">{report.notes}</p>
            </div>
          )}

          <TechnicianSignature technicianName={report.technician?.name || 'Unknown'} />
        </div>
      </div>
    </div>
  );
}