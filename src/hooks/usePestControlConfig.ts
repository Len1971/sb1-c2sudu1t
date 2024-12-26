import { useState, useEffect } from 'react';
import { getPestControlConfig } from '../lib/settings';

interface PestControlConfig {
  areas: string[];
  products: string[];
}

export function usePestControlConfig() {
  const [config, setConfig] = useState<PestControlConfig | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchConfig() {
      try {
        setLoading(true);
        const data = await getPestControlConfig();
        setConfig(data);
      } catch (err) {
        console.error('Error fetching pest control config:', err);
        setError('Failed to load configuration');
      } finally {
        setLoading(false);
      }
    }

    fetchConfig();
  }, []);

  return { config, loading, error };
}