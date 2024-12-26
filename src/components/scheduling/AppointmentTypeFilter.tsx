import React from 'react';
import { Filter } from 'lucide-react';

interface AppointmentTypeFilterProps {
  selectedType: string;
  onTypeChange: (type: string) => void;
}

export default function AppointmentTypeFilter({ selectedType = '', onTypeChange }: AppointmentTypeFilterProps) {
  return (
    <div className="flex items-center space-x-2">
      <Filter className="w-5 h-5 text-gray-500" />
      <select
        value={selectedType}
        onChange={(e) => onTypeChange(e.target.value)}
        className="block w-32 rounded-md border-gray-300 shadow-sm focus:border-ecovest-primary focus:ring-ecovest-primary text-sm"
      >
        <option value="">All Types</option>
        <option value="ad-hoc">Ad-Hoc</option>
        <option value="permanent">Permanent</option>
      </select>
    </div>
  );
}