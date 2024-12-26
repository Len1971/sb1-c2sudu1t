import React from 'react';
import { Tag } from 'lucide-react';

interface ServiceTypeSelectorProps {
  value: string;
  onChange: (value: string) => void;
}

const SERVICE_TYPES = [
  'Initial',
  'Monthly',
  '6 Weekly',
  'Quarterly',
  'Follow up',
  'Rodent Check',
  'Other'
];

export default function ServiceTypeSelector({ value, onChange }: ServiceTypeSelectorProps) {
  return (
    <div className="space-y-2">
      <label className="flex items-center text-sm font-medium text-gray-700">
        <Tag className="w-4 h-4 mr-1" />
        Service Type
      </label>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
        {SERVICE_TYPES.map((type) => (
          <label
            key={type}
            className={`flex items-center space-x-2 p-2 rounded-md cursor-pointer transition-colors ${
              value === type
                ? 'bg-ecovest-primary text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            <input
              type="radio"
              name="serviceType"
              value={type}
              checked={value === type}
              onChange={(e) => onChange(e.target.value)}
              className="hidden"
            />
            <span className="text-sm font-medium">{type}</span>
          </label>
        ))}
      </div>
    </div>
  );
}