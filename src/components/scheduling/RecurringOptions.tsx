import React from 'react';
import { RecurringFrequency, RECURRING_FREQUENCIES } from '../../utils/recurring';

interface RecurringOptionsProps {
  value: {
    frequency: RecurringFrequency;
    interval: number;
  };
  onChange: (value: { frequency: RecurringFrequency; interval: number }) => void;
}

export default function RecurringOptions({ value, onChange }: RecurringOptionsProps) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        Repeat *
      </label>
      <select
        value={value.frequency}
        onChange={(e) => onChange({ 
          frequency: e.target.value as RecurringFrequency,
          interval: 1
        })}
        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-ecovest-primary focus:ring-ecovest-primary"
        required
      >
        <optgroup label="Monthly Options">
          <option value="first-monday-of-month">First Monday of Every Month</option>
          <option value="first-tuesday-of-month">First Tuesday of Every Month</option>
          <option value="first-wednesday-of-month">First Wednesday of Every Month</option>
          <option value="first-thursday-of-month">First Thursday of Every Month</option>
          <option value="first-friday-of-month">First Friday of Every Month</option>
        </optgroup>
        <optgroup label="Regular Intervals">
          <option value="every-month">Every Month</option>
          <option value="every-2-months">Every Second Month</option>
          <option value="every-3-months">Every Third Month</option>
          <option value="every-4-months">Every Fourth Month</option>
          <option value="every-5-months">Every Fifth Month</option>
          <option value="every-6-months">Every Sixth Month</option>
          <option value="every-year">Every Year</option>
        </optgroup>
        <optgroup label="Other">
          <option value="every-day">Every Day</option>
          <option value="every-week">Every Week</option>
          <option value="every-2-weeks">Every Second Week</option>
        </optgroup>
      </select>
    </div>
  );
}