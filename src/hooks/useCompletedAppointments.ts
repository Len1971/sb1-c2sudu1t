import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import type { Appointment } from '../types';

export function useCompletedAppointments() {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchAppointments = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const { data, error: fetchError } = await supabase
        .from('appointments')
        .select(`
          id,
          customer_id,
          technician_id,
          assistant_id,
          scheduled_time,
          status,
          service_type,
          appointment_type,
          notes,
          recurring_frequency,
          recurring_start_date,
          recurring_end_date,
          customer:customers (
            id,
            name,
            address,
            phone,
            email
          )
        `)
        .eq('status', 'completed')
        .order('scheduled_time', { ascending: false });

      if (fetchError) throw fetchError;
      setAppointments(data || []);
    } catch (err) {
      console.error('Error fetching completed appointments:', err);
      setError('Failed to load completed jobs');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAppointments();

    const channel = supabase
      .channel('completed_appointments_changes')
      .on('postgres_changes', 
        { event: '*', schema: 'public', table: 'appointments' },
        () => fetchAppointments()
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  return { appointments, loading, error, refetch: fetchAppointments };
}