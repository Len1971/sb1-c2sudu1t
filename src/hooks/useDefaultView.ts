import { useState, useEffect } from 'react';
import { getDefaultView } from '../lib/userPreferences';
import type { DateRange } from '../utils/dateRanges';

interface DefaultView {
  dateRange: DateRange;
  appointmentType: string;
}

export function useDefaultView() {
  const [defaultView, setDefaultView] = useState<DefaultView | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchDefaultView() {
      try {
        const data = await getDefaultView();
        if (data) {
          setDefaultView({
            dateRange: data.default_date_range as DateRange,
            appointmentType: data.default_appointment_type
          });
        }
      } catch (error) {
        console.error('Error fetching default view:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchDefaultView();
  }, []);

  return { defaultView, loading };
}