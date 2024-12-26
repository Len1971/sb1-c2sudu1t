import { addDays, addMonths, startOfDay, endOfDay, startOfWeek, endOfWeek, startOfMonth, endOfMonth, isSunday, nextMonday } from 'date-fns';

export type DateRange = 'today' | 'tomorrow' | 'this-week' | 'next-week' | 'this-month' | 'next-month' | 'all';

export const dateRangeOptions: Record<DateRange, string> = {
  'today': 'Today',
  'tomorrow': 'Tomorrow',
  'this-week': 'This Week (Mon-Sat)',
  'next-week': 'Next Week (Mon-Sat)',
  'this-month': 'This Month',
  'next-month': 'Next Month',
  'all': 'All Appointments'
};

export function getDateRangeFilter(range: DateRange): { start: Date; end: Date | null } {
  const now = new Date();

  switch (range) {
    case 'today':
      return {
        start: startOfDay(now),
        end: endOfDay(now)
      };
    case 'tomorrow':
      const tomorrow = addDays(now, 1);
      return {
        start: startOfDay(tomorrow),
        end: endOfDay(tomorrow)
      };
    case 'this-week': {
      // If today is Sunday, start from next Monday
      const weekStart = isSunday(now) ? nextMonday(now) : startOfWeek(now, { weekStartsOn: 1 });
      // End on Saturday (5 days after Monday)
      const weekEnd = addDays(weekStart, 5);
      return {
        start: startOfDay(weekStart),
        end: endOfDay(weekEnd)
      };
    }
    case 'next-week': {
      // Get next Monday
      const nextWeekStart = addDays(startOfWeek(now, { weekStartsOn: 1 }), 7);
      // End on Saturday (5 days after Monday)
      const nextWeekEnd = addDays(nextWeekStart, 5);
      return {
        start: startOfDay(nextWeekStart),
        end: endOfDay(nextWeekEnd)
      };
    }
    case 'this-month': {
      return {
        start: startOfDay(startOfMonth(now)),
        end: endOfDay(endOfMonth(now))
      };
    }
    case 'next-month': {
      const nextMonth = addMonths(now, 1);
      return {
        start: startOfDay(startOfMonth(nextMonth)),
        end: endOfDay(endOfMonth(nextMonth))
      };
    }
    case 'all':
      return {
        start: startOfDay(now),
        end: null
      };
  }
}