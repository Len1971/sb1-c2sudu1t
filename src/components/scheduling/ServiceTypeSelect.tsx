import React from 'react';

interface ServiceTypeSelectProps {
  value: string;
  onChange: (value: string) => void;
}

const SERVICE_TYPES = [
  'General Pest Control',
  'Termite Inspection',
  'Rodent Control',
  'Bird Control',
  'Mosquito Treatment',
  'Custom Request - See below in Notes'
];

export default function ServiceTypeSelect({ value, onChange }: ServiceTypeSelectProps) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        Service Type *
      </label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        required
        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-ecovest-primary focus:ring-ecovest-primary"
      >
        <option value="">Select a service type</option>
        {SERVICE_TYPES.map((type) => (
          <option key={type} value={type}>
            {type}
          </option>
        ))}
      </select>
    </div>
  );
}