import { supabase } from './supabase';

const JOB_CARD_PREFIX = 'ECO-';
const INITIAL_NUMBER = 12500;

export async function getNextJobCardNumber(): Promise<string> {
  try {
    // First try to update the counter and get the new value in one operation
    const { data: updated, error: updateError } = await supabase.rpc('increment_job_counter');
    
    if (updateError) throw updateError;
    if (updated) {
      return `${JOB_CARD_PREFIX}${updated.counter}`;
    }

    // Fallback: If the function fails, try to get the current counter
    const { data: setting, error: fetchError } = await supabase
      .from('settings')
      .select('value')
      .eq('key', 'job_card_counter')
      .single();

    if (fetchError) throw fetchError;

    const nextNumber = setting?.value?.counter 
      ? parseInt(setting.value.counter) + 1 
      : INITIAL_NUMBER;

    // Update the counter
    const { error: insertError } = await supabase
      .from('settings')
      .upsert({
        key: 'job_card_counter',
        value: { counter: nextNumber },
        updated_at: new Date().toISOString()
      });

    if (insertError) throw insertError;

    return `${JOB_CARD_PREFIX}${nextNumber}`;
  } catch (error) {
    console.error('Error generating job card number:', error);
    // Fallback to timestamp-based number if database fails
    const timestamp = Date.now().toString().slice(-5);
    return `${JOB_CARD_PREFIX}${timestamp}`;
  }
}