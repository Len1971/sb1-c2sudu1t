import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

interface Technician {
  id: string;
  name: string;
  active: boolean;
}

export function useTechnicians() {
  const [technicians, setTechnicians] = useState<Technician[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchTechnicians() {
      try {
        const { data, error } = await supabase
          .from('technicians')
          .select('*')
          .eq('active', true)
          .order('name');

        if (error) throw error;
        setTechnicians(data || []);
      } catch (error) {
        console.error('Error fetching technicians:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchTechnicians();
  }, []);

  return { technicians, loading };
}