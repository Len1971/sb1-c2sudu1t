import React from 'react';
import { CheckCircle } from 'lucide-react';
import { useCompletedAppointments } from '../hooks/useCompletedAppointments';
import AppointmentCard from '../components/scheduling/AppointmentCard';
import LoadingSpinner from '../components/ui/LoadingSpinner';
import Alert from '../components/ui/Alert';

export default function CompletedJobs() {
  const { appointments, loading, error, refetch } = useCompletedAppointments();

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <div className="flex items-center gap-2">
          <CheckCircle className="w-6 h-6 text-gray-500" />
          <h1 className="text-2xl font-semibold text-gray-900">Completed Jobs</h1>
        </div>
        <span className="text-sm text-gray-500">
          {appointments.length} completed job{appointments.length !== 1 ? 's' : ''}
        </span>
      </div>

      <div className="bg-white rounded-lg shadow">
        {error ? (
          <Alert type="error" message={error} />
        ) : (
          <div className="divide-y divide-gray-200">
            {appointments.length === 0 ? (
              <div className="px-6 py-8 text-center">
                <CheckCircle className="mx-auto h-12 w-12 text-gray-400" />
                <h3 className="mt-2 text-sm font-medium text-gray-900">No completed jobs</h3>
                <p className="mt-1 text-sm text-gray-500">
                  Completed jobs will appear here.
                </p>
              </div>
            ) : (
              appointments.map((appointment) => (
                <AppointmentCard
                  key={appointment.id}
                  appointment={appointment}
                  onStatusChange={refetch}
                />
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
}