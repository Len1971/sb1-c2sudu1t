import React, { useState } from 'react';
import { PlusCircle } from 'lucide-react';
import AppointmentForm from './AppointmentForm';

export default function ScheduleButton() {
  const [showForm, setShowForm] = useState(false);
  const [appointmentType, setAppointmentType] = useState<'ad-hoc' | 'permanent' | null>(null);

  const openForm = (type: 'ad-hoc' | 'permanent') => {
    setAppointmentType(type);
    setShowForm(true);
  };

  return (
    <div className="flex flex-col space-y-2">
      <button
        onClick={() => openForm('ad-hoc')}
        className="inline-flex items-center px-3 py-1.5 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-ecovest-primary hover:bg-ecovest-dark w-60"
      >
        <PlusCircle className="w-4 h-4 mr-2" />
        Schedule New Ad-Hoc
      </button>
      
      <button
        onClick={() => openForm('permanent')}
        className="inline-flex items-center px-3 py-1.5 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-ecovest-primary hover:bg-ecovest-dark w-60"
      >
        <PlusCircle className="w-4 h-4 mr-2" />
        Schedule New Permanent
      </button>

      {showForm && appointmentType && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <h2 className="text-lg font-medium mb-4">
              Schedule New {appointmentType === 'ad-hoc' ? 'Ad-Hoc' : 'Permanent'} Appointment
            </h2>
            <AppointmentForm
              appointmentType={appointmentType}
              onSuccess={() => {
                setShowForm(false);
                window.location.reload();
              }}
              onCancel={() => {
                setShowForm(false);
                setAppointmentType(null);
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
}