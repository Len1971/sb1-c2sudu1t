import React, { useState, useEffect } from 'react';
import { format } from 'date-fns';
import { Calendar } from 'lucide-react';
import Logo from '../components/ui/Logo';
import ScheduleButton from '../components/scheduling/ScheduleButton';
import DateRangeFilter from '../components/scheduling/DateRangeFilter';
import AppointmentTypeFilter from '../components/scheduling/AppointmentTypeFilter';
import TechnicianFilter from '../components/scheduling/TechnicianFilter';
import SaveDefaultViewButton from '../components/scheduling/SaveDefaultViewButton';
import AppointmentCard from '../components/scheduling/AppointmentCard';
import { useAppointments } from '../hooks/useAppointments';
import { useDefaultView } from '../hooks/useDefaultView';
import { getHeaderText } from '../utils/dateFormatting';
import type { DateRange } from '../utils/dateRanges';
import LoadingSpinner from '../components/ui/LoadingSpinner';
import Alert from '../components/ui/Alert';

export default function Dashboard() {
  const { defaultView, loading: loadingDefaults } = useDefaultView();
  const [dateRange, setDateRange] = useState<DateRange>('today');
  const [appointmentType, setAppointmentType] = useState('');
  const [selectedTechnician, setSelectedTechnician] = useState('');
  
  useEffect(() => {
    if (defaultView && !loadingDefaults) {
      setDateRange(defaultView.dateRange);
      setAppointmentType(defaultView.appointmentType);
    }
  }, [defaultView, loadingDefaults]);

  const { appointments, loading, error, refetch } = useAppointments(dateRange);

  const filteredAppointments = appointments.filter(apt => 
    (appointmentType ? apt.appointment_type === appointmentType : true) &&
    (selectedTechnician ? apt.technician_name === selectedTechnician : true) &&
    apt.status !== 'completed'
  );

  if (loading || loadingDefaults) {
    return <LoadingSpinner />;
  }

  return (
    <div>
      <div className="flex flex-col items-center mb-8">
        <div className="w-64 h-24 mb-6">
          <Logo className="w-full h-full" />
        </div>
        <div className="w-full max-w-4xl">
          <div className="flex flex-wrap items-center gap-4 mb-4">
            <DateRangeFilter
              selectedRange={dateRange}
              onRangeChange={setDateRange}
            />
            <AppointmentTypeFilter
              selectedType={appointmentType}
              onTypeChange={setAppointmentType}
            />
            <TechnicianFilter
              selectedTechnician={selectedTechnician}
              onTechnicianChange={setSelectedTechnician}
            />
            <SaveDefaultViewButton
              dateRange={dateRange}
              appointmentType={appointmentType}
            />
          </div>
          <div>
            <ScheduleButton />
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow">
        <div className="px-6 py-4 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-medium text-gray-900">
              {getHeaderText(dateRange)}
            </h2>
            <div className="flex items-center text-sm text-gray-500">
              <Calendar className="w-4 h-4 mr-1" />
              {filteredAppointments.length} appointment{filteredAppointments.length !== 1 ? 's' : ''}
            </div>
          </div>
        </div>
        
        {error ? (
          <Alert type="error" message={error} />
        ) : (
          <div className="divide-y divide-gray-200">
            {filteredAppointments.length === 0 ? (
              <div className="px-6 py-8 text-center">
                <Calendar className="mx-auto h-12 w-12 text-gray-400" />
                <h3 className="mt-2 text-sm font-medium text-gray-900">No appointments</h3>
                <p className="mt-1 text-sm text-gray-500">
                  No appointments scheduled for this period.
                </p>
              </div>
            ) : (
              filteredAppointments.map((appointment) => (
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