import { isSameDay } from 'date-fns';

export function canStartService(scheduledTime: string): boolean {
  const appointmentDate = new Date(scheduledTime);
  const today = new Date();
  return isSameDay(appointmentDate, today);
}