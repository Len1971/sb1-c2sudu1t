import React, { useState, useRef, useEffect } from 'react';
import { format, isValid } from 'date-fns';
import { Calendar, AlertCircle } from 'lucide-react';
import { getMinDateTime } from '../../utils/dateTime';

interface DatePickerProps {
  value: string;
  onChange: (value: string) => void;
}

export default function DatePicker({ value, onChange }: DatePickerProps) {
  const [showPicker, setShowPicker] = useState(false);
  const [error, setError] = useState('');
  const pickerRef = useRef<HTMLDivElement>(null);
  const minDate = format(getMinDateTime(), "yyyy-MM-dd");

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (pickerRef.current && !pickerRef.current.contains(event.target as Node)) {
        setShowPicker(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleDateChange = (newValue: string) => {
    setError('');
    const selectedDate = new Date(newValue);
    
    if (!isValid(selectedDate)) {
      setError('Invalid date');
      return;
    }

    if (selectedDate < new Date(minDate)) {
      setError('Cannot select a past date');
      return;
    }

    onChange(newValue);
    setShowPicker(false);
  };

  return (
    <div className="relative">
      <label className="block text-sm font-medium text-gray-700 mb-1">
        Scheduled Date *
      </label>
      <div className="relative">
        <input
          type="text"
          value={format(new Date(value), 'PPPP')}
          readOnly
          className="block w-full rounded-md border-gray-300 shadow-sm focus:border-ecovest-primary focus:ring-ecovest-primary pr-10 cursor-pointer"
          onClick={() => setShowPicker(true)}
        />
        <Calendar 
          className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 cursor-pointer"
          onClick={() => setShowPicker(true)}
        />
      </div>

      {showPicker && (
        <div 
          ref={pickerRef}
          className="absolute z-10 mt-1 bg-white rounded-lg shadow-lg border border-gray-200 p-4"
        >
          <input
            type="date"
            value={value.split('T')[0]}
            onChange={(e) => handleDateChange(`${e.target.value}T${value.split('T')[1]}`)}
            min={minDate}
            required
            className={`block w-full rounded-md shadow-sm focus:ring-ecovest-primary focus:border-ecovest-primary ${
              error ? 'border-red-300' : 'border-gray-300'
            }`}
          />
          
          {error && (
            <div className="flex items-center text-red-600 text-sm mt-2">
              <AlertCircle className="w-4 h-4 mr-1" />
              {error}
            </div>
          )}
        </div>
      )}
    </div>
  );
}