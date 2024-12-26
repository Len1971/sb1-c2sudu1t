import React, { useEffect } from 'react';
import { format, addYears, isValid, isBefore } from 'date-fns';
import { getMinDateTime } from '../../utils/dateTime';
import { AlertCircle } from 'lucide-react';

interface DateRangeInputProps {
  startDate: string;
  endDate: string;
  onChange: (dates: { startDate: string; endDate: string }) => void;
}

export default function DateRangeInput({ startDate, endDate, onChange }: DateRangeInputProps) {
  const [error, setError] = React.useState('');
  const minDateTime = format(getMinDateTime(), "yyyy-MM-dd'T'HH:mm");

  // Set end date to 12 months from current date
  useEffect(() => {
    const defaultEndDate = format(addYears(new Date(), 1), "yyyy-MM-dd'T'HH:mm");
    if (endDate !== defaultEndDate) {
      onChange({
        startDate,
        endDate: defaultEndDate
      });
    }
  }, []);

  const validateDateTime = (dateTime: string): string | null => {
    if (!dateTime || !isValid(new Date(dateTime))) {
      return 'Invalid date';
    }

    const selectedDate = new Date(dateTime);
    const minDate = new Date(minDateTime);

    if (isBefore(selectedDate, minDate)) {
      return 'Cannot select a past date or time';
    }

    return null;
  };

  const handleStartDateChange = (newStartDate: string) => {
    const validationError = validateDateTime(newStartDate);
    setError(validationError || '');

    if (!validationError) {
      onChange({
        startDate: newStartDate,
        endDate: format(addYears(new Date(), 1), "yyyy-MM-dd'T'HH:mm")
      });
    }
  };

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Start Date *
        </label>
        <input
          type="datetime-local"
          value={startDate || ''}
          onChange={(e) => handleStartDateChange(e.target.value)}
          min={minDateTime}
          required
          className={`block w-full rounded-md shadow-sm focus:border-ecovest-primary focus:ring-ecovest-primary ${
            error ? 'border-red-300' : 'border-gray-300'
          }`}
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          End Date (12 months from today but may be adjusted accordingly)
        </label>
        <input
          type="datetime-local"
          value={endDate || ''}
          disabled
          className="block w-full rounded-md border-gray-300 bg-gray-50 shadow-sm cursor-not-allowed"
        />
      </div>

      {error && (
        <div className="flex items-center text-red-600 text-sm">
          <AlertCircle className="w-4 h-4 mr-1" />
          {error}
        </div>
      )}
    </div>
  );
}