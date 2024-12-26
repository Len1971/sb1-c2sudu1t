import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Clock, MapPin, Edit2, X, Play, User, ArrowRightCircle, Archive } from 'lucide-react';
import { format } from 'date-fns';
import { startService } from '../../lib/services';
import { cancelAppointment, updateAppointment } from '../../lib/appointments';
import AppointmentStatusBadge from './AppointmentStatusBadge';
import AppointmentTypeBadge from './AppointmentTypeBadge';
import EditAppointmentForm from './EditAppointmentForm';
import ReopenServiceButton from '../service/ReopenServiceButton';
import Alert from '../ui/Alert';
import type { Appointment } from '../../types';

interface AppointmentCardProps {
  appointment: Appointment;
  onStatusChange?: () => void;
}

export default function AppointmentCard({ appointment, onStatusChange }: AppointmentCardProps) {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showEdit, setShowEdit] = useState(false);

  if (!appointment.customer) {
    return null;
  }

  const handleStartService = async () => {
    try {
      setLoading(true);
      setError('');
      await startService(appointment.id);
      navigate(`/service/${appointment.id}`);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to start service');
      console.error('Start service error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = async () => {
    if (!confirm('Are you sure you want to cancel this appointment?')) {
      return;
    }

    try {
      setLoading(true);
      setError('');
      await cancelAppointment(appointment.id);
      if (onStatusChange) {
        onStatusChange();
      }
    } catch (err) {
      setError('Failed to cancel appointment');
      console.error('Cancel error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdate = async (formData: any) => {
    try {
      setLoading(true);
      setError('');
      await updateAppointment(appointment.id, formData);
      setShowEdit(false);
      if (onStatusChange) {
        onStatusChange();
      }
    } catch (err) {
      setError('Failed to update appointment');
      console.error('Update error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleArchive = async () => {
    if (!confirm('Are you sure you want to archive this completed job?')) {
      return;
    }

    try {
      setLoading(true);
      setError('');
      await fetch(`/api/archive-job/${appointment.id}`, {
        method: 'POST'
      });
      if (onStatusChange) {
        onStatusChange();
      }
    } catch (err) {
      setError('Failed to archive job');
      console.error('Archive error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`px-6 py-4 transition-all duration-300 ${
      loading ? 'opacity-50' : 'opacity-100'
    }`}>
      <div className="flex justify-between items-start">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <h3 className="text-lg font-medium text-gray-900">
              {appointment.customer.name}
            </h3>
            <AppointmentTypeBadge type={appointment.appointment_type} />
            <AppointmentStatusBadge status={appointment.status} />
          </div>
          
          <div className="mt-2 space-y-1">
            <div className="flex items-center text-sm text-gray-500">
              <Clock className="flex-shrink-0 mr-1.5 h-4 w-4" />
              <span>
                {format(new Date(appointment.scheduled_time), 'PPpp')}
              </span>
            </div>
            <div className="flex items-center text-sm text-gray-500">
              <MapPin className="flex-shrink-0 mr-1.5 h-4 w-4" />
              <span className="line-clamp-2">
                {appointment.customer.address}
              </span>
            </div>
            <div className="flex items-center text-sm text-gray-500">
              <User className="flex-shrink-0 mr-1.5 h-4 w-4" />
              <span>
                Technician: {appointment.technician?.name || 'Unassigned'}
              </span>
            </div>
          </div>
        </div>
        
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-ecovest-primary/10 text-ecovest-primary">
          {appointment.service_type}
        </span>
      </div>
      
      {error && <Alert type="error" message={error} className="mt-2" />}
      
      {appointment.status === 'scheduled' && (
        <div className="mt-4 flex space-x-3">
          <button
            onClick={handleStartService}
            disabled={loading}
            className="inline-flex items-center px-3 py-1.5 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-ecovest-primary hover:bg-ecovest-dark disabled:opacity-50"
          >
            <Play className="w-4 h-4 mr-1.5" />
            Start Service
          </button>

          <button
            onClick={() => setShowEdit(true)}
            disabled={loading}
            className="inline-flex items-center px-3 py-1.5 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50"
          >
            <Edit2 className="w-4 h-4 mr-1.5" />
            Edit
          </button>

          <button
            onClick={handleCancel}
            disabled={loading}
            className="inline-flex items-center px-3 py-1.5 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 disabled:opacity-50"
          >
            <X className="w-4 h-4 mr-1.5" />
            Cancel
          </button>
        </div>
      )}

      {appointment.status === 'in_progress' && (
        <div className="mt-4">
          <button
            onClick={() => navigate(`/service/${appointment.id}`)}
            className="inline-flex items-center px-3 py-1.5 border border-transparent text-sm font-medium rounded-md text-white bg-ecovest-primary hover:bg-ecovest-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-ecovest-primary"
          >
            <ArrowRightCircle className="w-4 h-4 mr-1.5" />
            Resume Service
          </button>
        </div>
      )}

      {appointment.status === 'completed' && (
        <div className="mt-4 flex space-x-3">
          <ReopenServiceButton
            appointmentId={appointment.id}
            onReopen={onStatusChange}
          />
          <button
            onClick={handleArchive}
            disabled={loading}
            className="inline-flex items-center px-3 py-1.5 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50"
          >
            <Archive className="w-4 h-4 mr-1.5" />
            {loading ? 'Archiving...' : 'Archive'}
          </button>
        </div>
      )}

      {showEdit && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <h3 className="text-lg font-medium mb-4">Edit Appointment</h3>
            <EditAppointmentForm
              appointment={appointment}
              onSave={handleUpdate}
              onCancel={() => setShowEdit(false)}
            />
          </div>
        </div>
      )}
    </div>
  );
}