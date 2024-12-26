import { addMonths, setDate, setDay, startOfMonth } from 'date-fns';

export type RecurringFrequency = 
  | 'every-day'
  | 'every-week'
  | 'every-2-weeks'
  | 'every-month'
  | 'first-monday-of-month'
  | 'first-tuesday-of-month'
  | 'first-wednesday-of-month'
  | 'first-thursday-of-month'
  | 'first-friday-of-month'
  | 'every-2-months'
  | 'every-3-months'
  | 'every-4-months'
  | 'every-5-months'
  | 'every-6-months'
  | 'every-year';

export const RECURRING_FREQUENCIES: Record<RecurringFrequency, string> = {
  'every-day': 'Every Day',
  'every-week': 'Every Week',
  'every-2-weeks': 'Every Second Week',
  'every-month': 'Every Month',
  'first-monday-of-month': 'First Monday of Every Month',
  'first-tuesday-of-month': 'First Tuesday of Every Month',
  'first-wednesday-of-month': 'First Wednesday of Every Month',
  'first-thursday-of-month': 'First Thursday of Every Month',
  'first-friday-of-month': 'First Friday of Every Month',
  'every-2-months': 'Every Second Month',
  'every-3-months': 'Every Third Month',
  'every-4-months': 'Every Fourth Month',
  'every-5-months': 'Every Fifth Month',
  'every-6-months': 'Every Sixth Month',
  'every-year': 'Every Year'
};

export function getNextOccurrence(frequency: RecurringFrequency, currentDate: Date): Date {
  const date = new Date(currentDate);

  switch (frequency) {
    case 'first-monday-of-month':
      return getFirstWeekdayOfMonth(date, 1); // 1 = Monday
    case 'first-tuesday-of-month':
      return getFirstWeekdayOfMonth(date, 2); // 2 = Tuesday
    case 'first-wednesday-of-month':
      return getFirstWeekdayOfMonth(date, 3); // 3 = Wednesday
    case 'first-thursday-of-month':
      return getFirstWeekdayOfMonth(date, 4); // 4 = Thursday
    case 'first-friday-of-month':
      return getFirstWeekdayOfMonth(date, 5); // 5 = Friday
    case 'every-month':
      return addMonths(date, 1);
    case 'every-2-months':
      return addMonths(date, 2);
    case 'every-3-months':
      return addMonths(date, 3);
    case 'every-4-months':
      return addMonths(date, 4);
    case 'every-5-months':
      return addMonths(date, 5);
    case 'every-6-months':
      return addMonths(date, 6);
    case 'every-year':
      return addMonths(date, 12);
    default:
      return date;
  }
}

function getFirstWeekdayOfMonth(date: Date, weekday: number): Date {
  // Get the first day of next month
  const firstOfMonth = startOfMonth(addMonths(date, 1));
  
  // Set to the desired weekday (0 = Sunday, 1 = Monday, etc.)
  const firstWeekday = setDay(firstOfMonth, weekday, { weekStartsOn: 1 });
  
  // If the weekday is before the first of the month, add a week
  if (firstWeekday < firstOfMonth) {
    return setDate(firstWeekday, firstWeekday.getDate() + 7);
  }
  
  return firstWeekday;
}

export function getIntervalFromFrequency(frequency: RecurringFrequency): {
  unit: 'days' | 'weeks' | 'months' | 'years';
  interval: number;
} {
  switch (frequency) {
    case 'every-day':
      return { unit: 'days', interval: 1 };
    case 'every-week':
      return { unit: 'weeks', interval: 1 };
    case 'every-2-weeks':
      return { unit: 'weeks', interval: 2 };
    case 'every-month':
    case 'first-monday-of-month':
    case 'first-tuesday-of-month':
    case 'first-wednesday-of-month':
    case 'first-thursday-of-month':
    case 'first-friday-of-month':
      return { unit: 'months', interval: 1 };
    case 'every-2-months':
      return { unit: 'months', interval: 2 };
    case 'every-3-months':
      return { unit: 'months', interval: 3 };
    case 'every-4-months':
      return { unit: 'months', interval: 4 };
    case 'every-5-months':
      return { unit: 'months', interval: 5 };
    case 'every-6-months':
      return { unit: 'months', interval: 6 };
    case 'every-year':
      return { unit: 'years', interval: 1 };
  }
}