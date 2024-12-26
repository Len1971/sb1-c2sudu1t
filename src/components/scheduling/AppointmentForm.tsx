import React, { useState } from 'react';
import { format } from 'date-fns';
import { createAppointment } from '../../lib/appointments';
import CustomerSelect from './CustomerSelect';
import TechnicianSelect from './TechnicianSelect';
import AssistantSelect from './AssistantSelect';
import DatePicker from './DatePicker';
import TimePicker from './TimePicker';
import ServiceTypeSelect from './ServiceTypeSelect';
import RecurringOptions from './RecurringOptions';
import DateRangeInput from './DateRangeInput';
import Alert from '../ui/Alert';
import type { RecurringFrequency } from '../../utils/recurring';

interface AppointmentFormProps {
  appointmentType: 'ad-hoc' | 'permanent';
  onSuccess: () => void;
  onCancel: () => void;
}

export default function AppointmentForm({ appointmentType, onSuccess, onCancel }: AppointmentFormProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    customerId: '',
    technicianId: '',
    assistantId: '',
    scheduledTime: format(new Date(), "yyyy-MM-dd'T'HH:mm"),
    serviceType: '',
    notes: '',
    recurring: {
      frequency: 'every-month' as RecurringFrequency,
      startDate: format(new Date(), "yyyy-MM-dd'T'HH:mm"),
      endDate: format(new Date(), "yyyy-MM-dd'T'HH:mm")
    }
  });

  const handleSubmit = async () => {
    try {
      setError('');
      setLoading(true);

      await createAppointment({
        ...formData,
        appointmentType,
        recurring: appointmentType === 'permanent' ? {
          frequency: formData.recurring.frequency,
          startDate: formData.recurring.startDate,
          endDate: formData.recurring.endDate
        } : undefined
      });

      onSuccess();
    } catch (err) {
      console.error('Appointment creation error:', err);
      setError('Failed to create appointment. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const isValid = 
    formData.customerId && 
    formData.technicianId &&
    formData.serviceType && 
    formData.notes &&
    (appointmentType === 'ad-hoc' ? formData.scheduledTime : (
      formData.recurring.startDate && 
      formData.recurring.endDate
    ));

  return (
    <div className="space-y-6">
      {error && <Alert type="error" message={error} />}

      <CustomerSelect
        value={formData.customerId}
        onChange={(value) => setFormData(prev => ({ ...prev, customerId: value }))}
      />

      <ServiceTypeSelect
        value={formData.serviceType}
        onChange={(value) => setFormData(prev => ({ ...prev, serviceType: value }))}
      />

      {appointmentType === 'permanent' ? (
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
              recurring: {
                ...prev.recurring,
                frequency: recurring.frequency
              }
            }))}
          />
        </>
      ) : (
        <div className="space-y-4">
          <DatePicker
            value={formData.scheduledTime}
            onChange={(value) => setFormData(prev => ({ ...prev, scheduledTime: value }))}
          />
          <TimePicker
            value={formData.scheduledTime}
            date={formData.scheduledTime}
            onChange={(value) => setFormData(prev => ({ ...prev, scheduledTime: value }))}
          />
        </div>
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

      <div className="flex justify-end space-x-3 pt-4">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
        >
          Cancel
        </button>
        <button
          type="button"
          onClick={handleSubmit}
          disabled={loading || !isValid}
          className="px-4 py-2 text-sm font-medium text-white bg-ecovest-primary border border-transparent rounded-md hover:bg-ecovest-dark disabled:opacity-50"
        >
          {loading ? 'Scheduling...' : 'Schedule Appointment'}
        </button>
      </div>
    </div>
  );
}