import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import type { Appointment } from '../types';

export function useAppointment(id: string) {
  const [appointment, setAppointment] = useState<Appointment | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    async function fetchAppointment() {
      if (!id) return;

      try {
        setLoading(true);
        setError(null);

        const { data, error: fetchError } = await supabase
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
          .eq('id', id)
          .single();

        if (fetchError) {
          throw new Error(fetchError.message);
        }

        if (!data) {
          throw new Error('Appointment not found');
        }

        if (isMounted) {
          setAppointment(data);
        }
      } catch (err) {
        console.error('Appointment fetch error:', err);
        if (isMounted) {
          setError(err instanceof Error ? err.message : 'Failed to load appointment');
          setAppointment(null);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }

    fetchAppointment();

    // Subscribe to realtime changes
    const channel = supabase
      .channel(`appointment_${id}`)
      .on('postgres_changes', 
        { event: '*', schema: 'public', table: 'appointments', filter: `id=eq.${id}` },
        () => fetchAppointment()
      )
      .subscribe();

    return () => {
      isMounted = false;
      supabase.removeChannel(channel);
    };
  }, [id]);

  return { appointment, loading, error };
}