import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAppointment } from '../hooks/useAppointment';
import ServiceInProgress from '../components/service/ServiceInProgress';
import LoadingSpinner from '../components/ui/LoadingSpinner';
import Alert from '../components/ui/Alert';

export default function ServiceInProgressPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { appointment, loading, error } = useAppointment(id!);

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <Alert type="error" message={error} />;
  }

  if (!appointment) {
    return <Alert type="error" message="Appointment not found" />;
  }

  if (appointment.status !== 'in_progress') {
    navigate('/dashboard');
    return null;
  }

  return (
    <div className="py-8">
      <h1 className="text-2xl font-semibold text-gray-900 mb-8">Service in Progress</h1>
      <ServiceInProgress
        appointment={appointment}
        onComplete={() => navigate('/dashboard')}
      />
    </div>
  );
}