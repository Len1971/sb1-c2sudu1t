import { supabase } from './supabase';
import type { DateRange } from '../utils/dateRanges';

interface SaveViewPreferences {
  dateRange: DateRange;
  appointmentType: string;
}

export async function saveDefaultView({ dateRange, appointmentType }: SaveViewPreferences) {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error('No authenticated user');

  const { error } = await supabase
    .from('user_preferences')
    .upsert({
      user_id: user.id,
      default_date_range: dateRange,
      default_appointment_type: appointmentType,
      updated_at: new Date().toISOString()
    }, {
      onConflict: 'user_id'
    });

  if (error) throw error;
}

export async function getDefaultView() {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return null;

  const { data } = await supabase
    .from('user_preferences')
    .select('default_date_range, default_appointment_type')
    .eq('user_id', user.id);

  // Return first preference if exists, otherwise return default values
  return data && data.length > 0 ? data[0] : {
    default_date_range: 'today',
    default_appointment_type: ''
  };
}