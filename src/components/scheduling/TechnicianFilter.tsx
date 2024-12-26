import React from 'react';
import { UserCircle } from 'lucide-react';
import { useTechnicians } from '../../hooks/useTechnicians';

interface TechnicianFilterProps {
  selectedTechnician: string;
  onTechnicianChange: (technicianName: string) => void;
}

export default function TechnicianFilter({ selectedTechnician, onTechnicianChange }: TechnicianFilterProps) {
  const { technicians, loading } = useTechnicians();

  if (loading) {
    return null;
  }

  return (
    <div className="flex items-center space-x-2">
      <UserCircle className="w-5 h-5 text-gray-500" />
      <select
        value={selectedTechnician}
        onChange={(e) => onTechnicianChange(e.target.value)}
        className="block w-40 rounded-md border-gray-300 shadow-sm focus:border-ecovest-primary focus:ring-ecovest-primary text-sm"
      >
        <option value="">All Technicians</option>
        {technicians.map((tech) => (
          <option key={tech.id} value={tech.name}>
            {tech.name}
          </option>
        ))}
      </select>
    </div>
  );
}