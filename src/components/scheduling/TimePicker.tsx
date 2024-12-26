import React, { useState, useRef, useEffect } from 'react';
import { format, isValid, parse } from 'date-fns';
import { Clock, AlertCircle } from 'lucide-react';
import { getMinDateTime } from '../../utils/dateTime';

interface TimePickerProps {
  value: string;
  date: string;
  onChange: (value: string) => void;
}

export default function TimePicker({ value, date, onChange }: TimePickerProps) {
  const [showPicker, setShowPicker] = useState(false);
  const [error, setError] = useState('');
  const pickerRef = useRef<HTMLDivElement>(null);
  const minDateTime = getMinDateTime();

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (pickerRef.current && !pickerRef.current.contains(event.target as Node)) {
        setShowPicker(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleTimeChange = (newTime: string) => {
    setError('');
    
    try {
      // Parse the time string to ensure it's valid
      const parsedTime = parse(newTime, 'HH:mm', new Date());
      if (!isValid(parsedTime)) {
        setError('Invalid time');
        return;
      }

      // Combine date and new time
      const [hours, minutes] = newTime.split(':');
      const newDateTime = new Date(date);
      newDateTime.setHours(parseInt(hours), parseInt(minutes));

      // Check if the combined date/time is in the past
      if (newDateTime < minDateTime) {
        setError('Cannot select a past time');
        return;
      }

      // Update with the new time while keeping the same date
      onChange(`${date.split('T')[0]}T${newTime}`);
      setShowPicker(false);
    } catch (err) {
      setError('Invalid time format');
    }
  };

  return (
    <div className="relative">
      <label className="block text-sm font-medium text-gray-700 mb-1">
        Scheduled Time *
      </label>
      <div className="relative">
        <input
          type="text"
          value={format(new Date(value), 'HH:mm')}
          readOnly
          className="block w-full rounded-md border-gray-300 shadow-sm focus:border-ecovest-primary focus:ring-ecovest-primary pr-10 cursor-pointer"
          onClick={() => setShowPicker(true)}
        />
        <Clock 
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
            type="time"
            value={value.split('T')[1]}
            onChange={(e) => handleTimeChange(e.target.value)}
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