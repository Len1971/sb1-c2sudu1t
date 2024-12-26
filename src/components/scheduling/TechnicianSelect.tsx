import React from 'react';
import { useTechnicians } from '../../hooks/useTechnicians';
import { User } from 'lucide-react';

interface TechnicianSelectProps {
  value: string;
  onChange: (value: string) => void;
}

export default function TechnicianSelect({ value, onChange }: TechnicianSelectProps) {
  const { technicians, loading } = useTechnicians();

  if (loading) {
    return <div className="animate-pulse h-10 bg-gray-200 rounded" />;
  }

  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        Approved Technician Assigned *
      </label>
      <div className="flex items-center space-x-2">
        <User className="w-5 h-5 text-gray-500" />
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          required
          className="block w-full rounded-md border-gray-300 shadow-sm focus:border-ecovest-primary focus:ring-ecovest-primary"
        >
          <option value="">Select a technician</option>
          {technicians.map((tech) => (
            <option key={tech.id} value={tech.id}>
              {tech.name}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}