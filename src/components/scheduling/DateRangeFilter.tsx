import React from 'react';
import { Calendar } from 'lucide-react';
import { DateRange, dateRangeOptions } from '../../utils/dateRanges';

interface DateRangeFilterProps {
  selectedRange: DateRange;
  onRangeChange: (range: DateRange) => void;
}

export default function DateRangeFilter({ selectedRange = 'today', onRangeChange }: DateRangeFilterProps) {
  return (
    <div className="flex items-center space-x-2">
      <Calendar className="w-5 h-5 text-gray-500" />
      <select
        value={selectedRange}
        onChange={(e) => onRangeChange(e.target.value as DateRange)}
        className="block w-40 rounded-md border-gray-300 shadow-sm focus:border-ecovest-primary focus:ring-ecovest-primary text-sm"
      >
        {Object.entries(dateRangeOptions).map(([value, label]) => (
          <option key={value} value={value}>
            {label}
          </option>
        ))}
      </select>
    </div>
  );
}