import React, { useState } from 'react';
import { completeService } from '../../lib/services';
import { createServiceReport } from '../../lib/serviceReports';
import PestControlJobCard from './PestControlJobCard';
import Alert from '../ui/Alert';
import type { Appointment, ServiceReport } from '../../types';

interface ServiceInProgressProps {
  appointment: Appointment;
  onComplete: () => void;
}

export default function ServiceInProgress({ appointment, onComplete }: ServiceInProgressProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleComplete = async (reportData: Partial<ServiceReport>) => {
    try {
      setLoading(true);
      setError('');
      
      // Create service report
      await createServiceReport({
        ...reportData,
        technician_id: appointment.technician_id
      });

      // Mark appointment as completed
      await completeService(appointment.id);
      
      onComplete();
    } catch (err) {
      setError('Failed to complete service. Please try again.');
      console.error('Service completion error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto">
      {error && <Alert type="error" message={error} className="mb-6" />}
      
      <PestControlJobCard
        appointmentId={appointment.id}
        customerId={appointment.customer_id}
        onComplete={handleComplete}
      />
    </div>
  );
}