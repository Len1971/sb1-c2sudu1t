import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import type { ServiceReport } from '../types';

export function useArchivedReports() {
  const [reports, setReports] = useState<ServiceReport[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchReports = async () => {
    try {
      setLoading(true);
      setError(null);

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
        .eq('archived', true)
        .order('service_date', { ascending: false });

      if (fetchError) throw fetchError;
      setReports(data || []);
    } catch (err) {
      console.error('Error fetching archived reports:', err);
      setError('Failed to load archived reports');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReports();

    // Subscribe to realtime changes
    const channel = supabase
      .channel('archived_reports_changes')
      .on('postgres_changes', 
        { 
          event: '*', 
          schema: 'public', 
          table: 'service_reports',
          filter: 'archived=eq.true'
        },
        fetchReports
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  return { reports, loading, error, refetch: fetchReports };
}