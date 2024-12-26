import React, { useState, useRef, useEffect } from 'react';
import { format, isValid } from 'date-fns';
import { Calendar, AlertCircle } from 'lucide-react';
import { getMinDateTime, validateDateTime } from '../../utils/dateTime';

interface DateTimePickerProps {
  value: string;
  onChange: (value: string) => void;
}

export default function DateTimePicker({ value, onChange }: DateTimePickerProps) {
  const [showPicker, setShowPicker] = useState(false);
  const [tempValue, setTempValue] = useState(value);
  const [error, setError] = useState('');
  const pickerRef = useRef<HTMLDivElement>(null);
  const minDateTime = format(getMinDateTime(), "yyyy-MM-dd'T'HH:mm");

  // Handle clicks outside the picker
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (pickerRef.current && !pickerRef.current.contains(event.target as Node)) {
        setShowPicker(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleDateTimeChange = (newValue: string) => {
    setError('');
    const selectedDate = new Date(newValue);
    
    if (!isValid(selectedDate)) {
      setError('Invalid date');
      return;
    }

    if (selectedDate < new Date(minDateTime)) {
      setError('Cannot select a past date or time');
      return;
    }

    setTempValue(newValue);
  };

  const handleClear = () => {
    setTempValue('');
    onChange('');
    setShowPicker(false);
    setError('');
  };

  const handleOK = () => {
    if (error) return;
    
    const validatedDateTime = validateDateTime(tempValue);
    onChange(validatedDateTime);
    setShowPicker(false);
    setError('');
  };

  const handleToday = () => {
    const now = format(new Date(), "yyyy-MM-dd'T'HH:mm");
    const validatedDateTime = validateDateTime(now);
    setTempValue(validatedDateTime);
    setError('');
  };

  return (
    <div className="relative">
      <label className="block text-sm font-medium text-gray-700 mb-1">
        Scheduled Date and Time *
      </label>
      <div className="relative">
        <input
          type="text"
          value={format(new Date(value || new Date()), 'PPpp')}
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
          className="absolute z-10 mt-1 bg-white rounded-lg shadow-lg border border-gray-200 p-4 w-full max-w-md"
        >
          <input
            type="datetime-local"
            value={tempValue}
            onChange={(e) => handleDateTimeChange(e.target.value)}
            min={minDateTime}
            required
            className={`block w-full rounded-md shadow-sm focus:ring-ecovest-primary focus:border-ecovest-primary mb-2 ${
              error ? 'border-red-300' : 'border-gray-300'
            }`}
          />
          
          {error && (
            <div className="flex items-center text-red-600 text-sm mb-3">
              <AlertCircle className="w-4 h-4 mr-1" />
              {error}
            </div>
          )}

          <div className="flex justify-between space-x-2">
            <button
              type="button"
              onClick={handleClear}
              className="px-3 py-1.5 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
            >
              Clear
            </button>
            <button
              type="button"
              onClick={handleToday}
              className="px-3 py-1.5 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
            >
              Today
            </button>
            <button
              type="button"
              onClick={handleOK}
              disabled={!!error}
              className="px-3 py-1.5 text-sm font-medium text-white bg-ecovest-primary border border-transparent rounded-md hover:bg-ecovest-dark disabled:opacity-50 disabled:cursor-not-allowed"
            >
              OK
            </button>
          </div>
        </div>
      )}
    </div>
  );
}