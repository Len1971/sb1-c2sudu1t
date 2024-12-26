import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { DateRange, getDateRangeFilter } from '../utils/dateRanges';
import type { Appointment } from '../types';

export function useAppointments(dateRange: DateRange) {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchAppointments = async () => {
    try {
      setLoading(true);
      setError(null);

      const { start, end } = getDateRangeFilter(dateRange);
      
      let query = supabase
        .from('appointments')
        .select(`
          *,
          customer:customers (
            id,
            name,
            address,
            phone,
            email
          ),
          technician:technicians (
            id,
            name
          )
        `)
        .gte('scheduled_time', start.toISOString());

      if (end) {
        query = query.lte('scheduled_time', end.toISOString());
      }

      // Don't show cancelled appointments
      query = query.neq('status', 'cancelled');

      // Order by scheduled time
      query = query.order('scheduled_time', { ascending: true });

      const { data, error: fetchError } = await query;

      if (fetchError) throw fetchError;
      
      // Transform the data to include technician_name
      const transformedData = data?.map(apt => ({
        ...apt,
        technician_name: apt.technician?.name || 'Unassigned'
      })) || [];

      setAppointments(transformedData);
    } catch (err) {
      console.error('Error fetching appointments:', err);
      setError('Failed to load appointments');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAppointments();

    // Subscribe to realtime changes
    const channel = supabase
      .channel('appointments_changes')
      .on('postgres_changes', 
        { event: '*', schema: 'public', table: 'appointments' },
        fetchAppointments
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [dateRange]);

  return { 
    appointments, 
    loading, 
    error, 
    refetch: fetchAppointments 
  };
}