import React, { useState, useEffect } from 'react';
import { CheckCircle } from 'lucide-react';
import JobCardHeader from './JobCardHeader';
import JobCardForm from './JobCardForm';
import Alert from '../ui/Alert';
import { usePestControlConfig } from '../../hooks/usePestControlConfig';
import LoadingSpinner from '../ui/LoadingSpinner';
import type { ServiceReport } from '../../types';

interface PestControlJobCardProps {
  appointmentId: string;
  customerId: string;
  onComplete: (data: Partial<ServiceReport>) => Promise<void>;
}

export default function PestControlJobCard({ 
  appointmentId, 
  customerId, 
  onComplete 
}: PestControlJobCardProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [jobNumber, setJobNumber] = useState<string>('');
  const [serviceType, setServiceType] = useState('Initial');
  const [pestsFound, setPestsFound] = useState<string[]>([]);
  const [treatmentAreas, setTreatmentAreas] = useState<string[]>([]);
  const [productsUsed, setProductsUsed] = useState<string[]>([]);
  const [notes, setNotes] = useState('');
  const { config, loading: configLoading, error: configError } = usePestControlConfig();

  const handleSubmit = async () => {
    if (!serviceType) {
      setError('Please select a service type');
      return;
    }

    if (pestsFound.length === 0) {
      setError('Please select at least one pest treated');
      return;
    }

    if (treatmentAreas.length === 0) {
      setError('Please select at least one treatment area');
      return;
    }

    if (productsUsed.length === 0) {
      setError('Please select at least one product used');
      return;
    }

    try {
      setLoading(true);
      setError('');
      
      await onComplete({
        customer_id: customerId,
        service_date: new Date().toISOString(),
        treatment_type: serviceType,
        pests_found: pestsFound,
        areas_treated: treatmentAreas,
        products_used: productsUsed,
        notes: notes.trim(),
        job_number: jobNumber
      });
    } catch (err) {
      setError('Failed to complete service. Please try again.');
      console.error('Service completion error:', err);
    } finally {
      setLoading(false);
    }
  };

  if (configLoading) {
    return <LoadingSpinner />;
  }

  if (configError || !config) {
    return <Alert type="error" message="Failed to load pest control configuration" />;
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 space-y-8">
      <JobCardHeader />

      {error && <Alert type="error" message={error} />}

      <JobCardForm
        treatmentAreas={treatmentAreas}
        productsUsed={productsUsed}
        serviceType={serviceType}
        pestsFound={pestsFound}
        notes={notes}
        onTreatmentAreasChange={setTreatmentAreas}
        onProductsUsedChange={setProductsUsed}
        onServiceTypeChange={setServiceType}
        onPestsFoundChange={setPestsFound}
        onNotesChange={setNotes}
        availableAreas={config.areas}
        availableProducts={config.products}
      />

      <button
        onClick={handleSubmit}
        disabled={loading}
        className="w-full flex justify-center items-center px-4 py-3 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-ecovest-primary hover:bg-ecovest-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-ecovest-primary disabled:opacity-50 transition-colors"
      >
        <CheckCircle className="w-5 h-5 mr-2" />
        {loading ? 'Completing Service...' : 'Complete Service'}
      </button>
    </div>
  );
}