import { supabase } from './supabase';

export async function startService(appointmentId: string) {
  try {
    // First check if the appointment exists and is in a valid state
    const { data: appointment, error: checkError } = await supabase
      .from('appointments')
      .select('status')
      .eq('id', appointmentId)
      .single();

    if (checkError) throw checkError;
    if (!appointment) throw new Error('Appointment not found');
    if (appointment.status === 'cancelled') throw new Error('Cannot start a cancelled appointment');
    if (appointment.status === 'in_progress') throw new Error('Service is already in progress');

    // Update the appointment status
    const { data, error } = await supabase
      .from('appointments')
      .update({ 
        status: 'in_progress',
        started_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      })
      .eq('id', appointmentId)
      .select()
      .single();

    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error starting service:', error);
    throw error instanceof Error ? error : new Error('Failed to start service');
  }
}

export async function completeService(appointmentId: string) {
  try {
    const { data, error } = await supabase
      .from('appointments')
      .update({ 
        status: 'completed',
        updated_at: new Date().toISOString()
      })
      .eq('id', appointmentId)
      .select()
      .single();

    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error completing service:', error);
    throw error instanceof Error ? error : new Error('Failed to complete service');
  }
}

export async function reopenService(appointmentId: string) {
  try {
    const { data, error } = await supabase
      .from('appointments')
      .update({ 
        status: 'in_progress',
        started_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      })
      .eq('id', appointmentId)
      .select()
      .single();

    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error reopening service:', error);
    throw error instanceof Error ? error : new Error('Failed to reopen service');
  }
}