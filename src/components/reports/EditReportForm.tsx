import React, { useState } from 'react';
import { updateServiceReport } from '../../lib/serviceReports';
import { usePestControlConfig } from '../../hooks/usePestControlConfig';
import TreatmentSection from '../service/TreatmentSection';
import Alert from '../ui/Alert';
import type { ServiceReport } from '../../types';

interface EditReportFormProps {
  report: ServiceReport;
  onSave: () => void;
  onCancel: () => void;
}

export default function EditReportForm({ report, onSave, onCancel }: EditReportFormProps) {
  const { config } = usePestControlConfig();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    treatment_type: report.treatment_type,
    areas_treated: report.areas_treated,
    products_used: report.products_used,
    notes: report.notes || ''
  });

  const handleSubmit = async () => {
    try {
      setLoading(true);
      setError('');
      await updateServiceReport(report.id, formData);
      onSave();
    } catch (err) {
      setError('Failed to update report. Please try again.');
      console.error('Update error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-lg font-medium">Edit Job Card</h2>

      {error && <Alert type="error" message={error} />}

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Treatment Type
        </label>
        <input
          type="text"
          value={formData.treatment_type}
          onChange={(e) => setFormData(prev => ({ ...prev, treatment_type: e.target.value }))}
          className="block w-full rounded-md border-gray-300 shadow-sm focus:border-ecovest-primary focus:ring-ecovest-primary"
        />
      </div>

      <TreatmentSection
        title="Areas Treated"
        items={config?.areas || []}
        selectedItems={formData.areas_treated}
        onChange={(areas) => setFormData(prev => ({ ...prev, areas_treated: areas }))}
      />

      <TreatmentSection
        title="Products Used"
        items={config?.products || []}
        selectedItems={formData.products_used}
        onChange={(products) => setFormData(prev => ({ ...prev, products_used: products }))}
      />

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Notes
        </label>
        <textarea
          value={formData.notes}
          onChange={(e) => setFormData(prev => ({ ...prev, notes: e.target.value }))}
          rows={4}
          className="block w-full rounded-md border-gray-300 shadow-sm focus:border-ecovest-primary focus:ring-ecovest-primary"
        />
      </div>

      <div className="flex justify-end space-x-3">
        <button
          onClick={onCancel}
          className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
        >
          Cancel
        </button>
        <button
          onClick={handleSubmit}
          disabled={loading}
          className="px-4 py-2 text-sm font-medium text-white bg-ecovest-primary border border-transparent rounded-md hover:bg-ecovest-dark disabled:opacity-50"
        >
          {loading ? 'Saving...' : 'Save Changes'}
        </button>
      </div>
    </div>
  );
}