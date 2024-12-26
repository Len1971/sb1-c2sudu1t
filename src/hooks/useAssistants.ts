import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

interface Assistant {
  id: string;
  name: string;
  active: boolean;
}

export function useAssistants() {
  const [assistants, setAssistants] = useState<Assistant[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchAssistants() {
      try {
        const { data, error } = await supabase
          .from('assistants')
          .select('*')
          .eq('active', true)
          .order('name');

        if (error) throw error;
        setAssistants(data || []);
      } catch (error) {
        console.error('Error fetching assistants:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchAssistants();
  }, []);

  return { assistants, loading };
}