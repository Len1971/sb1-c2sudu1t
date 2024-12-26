import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import type { ServiceReport } from '../types';

export function useServiceReports() {
  const [reports, setReports] = useState<ServiceReport[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchReports = async () => {
    try {
      setLoading(true);
      const { data, error: fetchError } = await supabase
        .from('service_reports')
        .select(`
          *,
          customer:customers (
            id,
            name,
            address
          ),
          technician:technicians (
            id,
            name
          )
        `)
        .eq('archived', false)
        .order('service_date', { ascending: false });

      if (fetchError) throw fetchError;
      setReports(data || []);
    } catch (err) {
      console.error('Error fetching service reports:', err);
      setError('Failed to load service reports');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReports();

    // Subscribe to realtime changes
    const channel = supabase
      .channel('service_reports_changes')
      .on('postgres_changes', 
        { event: '*', schema: 'public', table: 'service_reports' },
        () => fetchReports()
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  return { reports, loading, error, refetch: fetchReports };
}