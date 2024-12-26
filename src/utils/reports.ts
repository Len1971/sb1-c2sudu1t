import { format } from 'date-fns';
import type { ServiceReport } from '../types';

export function groupReportsByDate(reports: ServiceReport[]): Map<string, ServiceReport[]> {
  const grouped = new Map<string, ServiceReport[]>();
  
  reports.forEach(report => {
    const date = format(new Date(report.service_date), 'yyyy-MM-dd');
    const existing = grouped.get(date) || [];
    grouped.set(date, [...existing, report]);
  });

  return new Map([...grouped.entries()].sort().reverse());
}