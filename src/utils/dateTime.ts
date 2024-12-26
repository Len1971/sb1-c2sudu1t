import { addHours, isBefore, startOfHour, startOfDay, isValid } from 'date-fns';

export function getMinDateTime(): Date {
  const now = new Date();
  return startOfHour(addHours(now, 3));
}

export function getMinDate(): Date {
  return startOfDay(new Date());
}

export function validateDateTime(dateTime: string): string {
  if (!dateTime || !isValid(new Date(dateTime))) {
    return getMinDateTime().toISOString().slice(0, 16);
  }

  const selectedDate = new Date(dateTime);
  const minDateTime = getMinDateTime();

  // If selected date is before minimum allowed time, return minimum time
  if (isBefore(selectedDate, minDateTime)) {
    return minDateTime.toISOString().slice(0, 16);
  }

  return dateTime;
}