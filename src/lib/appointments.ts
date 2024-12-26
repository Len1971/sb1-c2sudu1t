import { supabase } from './supabase';
import { getNextOccurrence } from '../utils/recurring';
import type { RecurringFrequency } from '../utils/recurring';

interface AppointmentData {
  customerId: string;
  technicianId: string;
  assistantId?: string;
  scheduledTime: string;
  serviceType: string;
  appointmentType: 'ad-hoc' | 'permanent';
  notes?: string;
  recurring?: {
    frequency: RecurringFrequency;
    startDate: string;
    endDate: string;
  };
}

export async function createAppointment(data: AppointmentData) {
  try {
    let scheduledTime = data.scheduledTime;

    // For first weekday of month appointments, calculate the correct date
    if (data.appointmentType === 'permanent' && data.recurring?.frequency.startsWith('first-')) {
      const nextDate = getNextOccurrence(
        data.recurring.frequency as RecurringFrequency,
        new Date(data.recurring.startDate)
      );
      scheduledTime = nextDate.toISOString();
    }

    const { error } = await supabase
      .from('appointments')
      .insert({
        customer_id: data.customerId,
        technician_id: data.technicianId,
        assistant_id: data.assistantId || null,
        scheduled_time: scheduledTime,
        service_type: data.serviceType,
        appointment_type: data.appointmentType,
        notes: data.notes,
        recurring_frequency: data.appointmentType === 'permanent' ? data.recurring?.frequency : null,
        recurring_start_date: data.appointmentType === 'permanent' ? data.recurring?.startDate : null,
        recurring_end_date: data.appointmentType === 'permanent' ? data.recurring?.endDate : null,
        status: 'scheduled'
      });

    if (error) throw error;
  } catch (error) {
    console.error('Appointment creation error:', error);
    throw error;
  }
}

export async function updateAppointment(id: string, data: Partial<AppointmentData>) {
  try {
    let scheduledTime = data.scheduledTime;

    // For first weekday of month appointments, calculate the correct date
    if (data.appointmentType === 'permanent' && data.recurring?.frequency.startsWith('first-')) {
      const nextDate = getNextOccurrence(
        data.recurring.frequency as RecurringFrequency,
        new Date(data.recurring.startDate)
      );
      scheduledTime = nextDate.toISOString();
    }

    const { error } = await supabase
      .from('appointments')
      .update({
        customer_id: data.customerId,
        technician_id: data.technicianId,
        assistant_id: data.assistantId || null,
        scheduled_time: scheduledTime,
        service_type: data.serviceType,
        notes: data.notes,
        recurring_frequency: data.recurring?.frequency,
        recurring_start_date: data.recurring?.startDate,
        recurring_end_date: data.recurring?.endDate,
        updated_at: new Date().toISOString()
      })
      .eq('id', id);

    if (error) throw error;
  } catch (error) {
    console.error('Appointment update error:', error);
    throw error;
  }
}

export async function cancelAppointment(id: string) {
  try {
    const { error } = await supabase
      .from('appointments')
      .update({ 
        status: 'cancelled',
        updated_at: new Date().toISOString()
      })
      .eq('id', id);

    if (error) throw error;
  } catch (error) {
    console.error('Appointment cancellation error:', error);
    throw error;
  }
}