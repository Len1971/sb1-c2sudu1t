import React, { useState } from 'react';
import { format } from 'date-fns';
import CustomerSelect from './CustomerSelect';
import TechnicianSelect from './TechnicianSelect';
import AssistantSelect from './AssistantSelect';
import DateTimePicker from './DateTimePicker';
import ServiceTypeSelect from './ServiceTypeSelect';
import RecurringOptions from './RecurringOptions';
import DateRangeInput from './DateRangeInput';
import type { RecurringFrequency } from '../../utils/recurring';
import type { Appointment } from '../../types';

interface EditAppointmentFormProps {
  appointment: Appointment;
  onSave: (data: any) => Promise<void>;
  onCancel: () => void;
}

export default function EditAppointmentForm({ appointment, onSave, onCancel }: EditAppointmentFormProps) {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    customerId: appointment.customer_id,
    technicianId: appointment.technician_id || '',
    assistantId: appointment.assistant_id || '',
    scheduledTime: format(new Date(appointment.scheduled_time), "yyyy-MM-dd'T'HH:mm"),
    serviceType: appointment.service_type,
    appointmentType: appointment.appointment_type,
    notes: appointment.notes || '',
    recurring: {
      frequency: (appointment.recurring_frequency || 'every-month') as RecurringFrequency,
      startDate: appointment.recurring_start_date || format(new Date(), "yyyy-MM-dd'T'HH:mm"),
      endDate: appointment.recurring_end_date || format(new Date(), "yyyy-MM-dd'T'HH:mm")
    }
  });

  const handleSubmit = async () => {
    try {
      setLoading(true);
      await onSave(formData);
    } finally {
      setLoading(false);
    }
  };

  const isValid = 
    formData.customerId && 
    formData.technicianId &&
    formData.serviceType && 
    formData.notes &&
    (formData.appointmentType === 'ad-hoc' ? formData.scheduledTime : (
      formData.recurring.startDate && 
      formData.recurring.endDate
    ));

  return (
    <div className="space-y-6">
      <CustomerSelect
        value={formData.customerId}
        onChange={(value) => setFormData(prev => ({ ...prev, customerId: value }))}
      />

      <ServiceTypeSelect
        value={formData.serviceType}
        onChange={(value) => setFormData(prev => ({ ...prev, serviceType: value }))}
      />

      {formData.appointmentType === 'permanent' ? (
        <>
          <DateRangeInput
            startDate={formData.recurring.startDate}
            endDate={formData.recurring.endDate}
            onChange={(dates) => setFormData(prev => ({
              ...prev,
              recurring: {
                ...prev.recurring,
                ...dates
              }
            }))}
          />
          <RecurringOptions
            value={{
              frequency: formData.recurring.frequency,
              interval: 1
            }}
            onChange={(recurring) => setFormData(prev => ({ 
              ...prev, 
              recurring: { ...prev.recurring, ...recurring }
            }))}
          />
        </>
      ) : (
        <DateTimePicker
          value={formData.scheduledTime}
          onChange={(value) => setFormData(prev => ({ ...prev, scheduledTime: value }))}
        />
      )}

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Notes *
        </label>
        <textarea
          value={formData.notes}
          onChange={(e) => setFormData(prev => ({ ...prev, notes: e.target.value }))}
          placeholder="Type Important Notes Here"
          className="block w-full rounded-md border-gray-300 shadow-sm focus:border-ecovest-primary focus:ring-ecovest-primary"
          rows={3}
          required
        />
      </div>

      <TechnicianSelect
        value={formData.technicianId}
        onChange={(value) => setFormData(prev => ({ ...prev, technicianId: value }))}
      />

      <AssistantSelect
        value={formData.assistantId}
        onChange={(value) => setFormData(prev => ({ ...prev, assistantId: value }))}
        showSelect={!!formData.technicianId}
      />

      <div className="flex justify-end space-x-3">
        <button
          onClick={onCancel}
          className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
        >
          Cancel
        </button>
        <button
          onClick={handleSubmit}
          disabled={loading || !isValid}
          className="px-4 py-2 text-sm font-medium text-white bg-ecovest-primary border border-transparent rounded-md hover:bg-ecovest-dark disabled:opacity-50"
        >
          {loading ? 'Saving...' : 'Save Changes'}
        </button>
      </div>
    </div>
  );
}