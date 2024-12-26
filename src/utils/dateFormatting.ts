import { format, addDays, startOfWeek, addMonths, startOfMonth } from 'date-fns';
import type { DateRange } from './dateRanges';

export function getHeaderText(dateRange: DateRange): string {
  const now = new Date();
  
  switch (dateRange) {
    case 'today':
      return `Schedule for ${format(now, 'MMMM d, yyyy')}`;
    case 'tomorrow':
      return `Schedule for ${format(addDays(now, 1), 'MMMM d, yyyy')}`;
    case 'this-week': {
      const weekStart = startOfWeek(now, { weekStartsOn: 1 }); // Monday
      const weekEnd = addDays(weekStart, 5); // Saturday (5 days after Monday)
      return `Schedule for ${format(weekStart, 'MMMM d')} - ${format(weekEnd, 'MMMM d, yyyy')}`;
    }
    case 'next-week': {
      const nextWeekStart = addDays(startOfWeek(now, { weekStartsOn: 1 }), 7);
      const nextWeekEnd = addDays(nextWeekStart, 5);
      return `Schedule for ${format(nextWeekStart, 'MMMM d')} - ${format(nextWeekEnd, 'MMMM d, yyyy')}`;
    }
    case 'this-month':
      return `Schedule for ${format(now, 'MMMM yyyy')}`;
    case 'next-month': {
      const nextMonth = addMonths(now, 1);
      return `Schedule for ${format(nextMonth, 'MMMM yyyy')}`;
    }
    case 'all':
      return 'All Future Appointments';
    default:
      return 'Schedule';
  }
}