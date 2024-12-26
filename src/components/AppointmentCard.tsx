import React, { useState } from 'react';
import { Clock, MapPin } from 'lucide-react';
import { startService } from '../lib/services';
import { cancelAppointment, rescheduleAppointment } from '../lib/appointments';
import Alert from './ui/Alert';
import DateTimePicker from './scheduling/DateTimePicker';
import AppointmentActions from './scheduling/AppointmentActions';

interface AppointmentCardProps {
  appointment: {
    id: string;
    time: string;
    customer: string;
    address: string;
    service: string;
    status?: string;
  };
  onStatusChange?: () => void;
}

export default function AppointmentCard({ appointment, onStatusChange }: AppointmentCardProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showReschedule, setShowReschedule] = useState(false);
  const [newDateTime, setNewDateTime] = useState('');
  const [isVisible, setIsVisible] = useState(true);

  const handleStartService = async () => {
    try {
      setLoading(true);
      setError('');
      await startService(appointment.id);
      if (onStatusChange) {
        onStatusChange();
      }
    } catch (err) {
      setError('Failed to start service. Please try again.');
      console.error('Start service error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = async () => {
    try {
      setLoading(true);
      setError('');
      await cancelAppointment(appointment.id);
      setIsVisible(false);
      setTimeout(() => {
        if (onStatusChange) {
          onStatusChange();
        }
      }, 300);
    } catch (err) {
      setError('Failed to cancel appointment. Please try again.');
      console.error('Cancel error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleReschedule = async () => {
    if (!newDateTime) return;
    
    try {
      setLoading(true);
      setError('');
      await rescheduleAppointment(appointment.id, newDateTime);
      setShowReschedule(false);
      if (onStatusChange) {
        onStatusChange();
      }
    } catch (err) {
      setError('Failed to reschedule appointment. Please try again.');
      console.error('Reschedule error:', err);
    } finally {
      setLoading(false);
    }
  };

  if (!isVisible) {
    return null;
  }

  return (
    <div className={`px-4 py-3 border-b border-gray-200 last:border-b-0 transition-all duration-300 ${
      loading ? 'opacity-50' : 'opacity-100'
    }`}>
      <div className="flex justify-between items-start gap-4">
        <div className="min-w-0 flex-1">
          <div className="flex items-center justify-between mb-1">
            <h3 className="text-sm font-medium text-gray-900 truncate">{appointment.customer}</h3>
            <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-ecovest-primary/10 text-ecovest-primary">
              {appointment.service}
            </span>
          </div>
          <div className="flex flex-col gap-1">
            <div className="flex items-center text-xs text-gray-500">
              <Clock className="flex-shrink-0 mr-1 h-3.5 w-3.5" />
              {appointment.time}
            </div>
            <div className="flex items-center text-xs text-gray-500">
              <MapPin className="flex-shrink-0 mr-1 h-3.5 w-3.5" />
              <span className="truncate">{appointment.address}</span>
            </div>
          </div>
        </div>
      </div>
      
      {error && <Alert type="error" message={error} />}
      
      <AppointmentActions
        status={appointment.status || 'scheduled'}
        loading={loading}
        onStart={handleStartService}
        onEdit={() => setShowReschedule(true)}
        onCancel={handleCancel}
      />

      {showReschedule && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <h3 className="text-lg font-medium mb-4">Reschedule Appointment</h3>
            <div className="space-y-4">
              <DateTimePicker
                value={newDateTime}
                onChange={setNewDateTime}
              />
              <div className="flex justify-end space-x-3">
                <button
                  onClick={() => setShowReschedule(false)}
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  onClick={handleReschedule}
                  disabled={!newDateTime || loading}
                  className="px-4 py-2 text-sm font-medium text-white bg-ecovest-primary border border-transparent rounded-md hover:bg-ecovest-dark disabled:opacity-50"
                >
                  {loading ? 'Saving...' : 'Save Changes'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}