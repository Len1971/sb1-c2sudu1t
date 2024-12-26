import React from 'react';
import { useAssistants } from '../../hooks/useAssistants';
import { UserPlus } from 'lucide-react';

interface AssistantSelectProps {
  value: string;
  onChange: (value: string) => void;
  showSelect: boolean;
}

export default function AssistantSelect({ value, onChange, showSelect }: AssistantSelectProps) {
  const { assistants, loading } = useAssistants();

  if (!showSelect) {
    return null;
  }

  if (loading) {
    return <div className="animate-pulse h-10 bg-gray-200 rounded" />;
  }

  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        Approved Assistant Assigned
      </label>
      <div className="flex items-center space-x-2">
        <UserPlus className="w-5 h-5 text-gray-500" />
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="block w-full rounded-md border-gray-300 shadow-sm focus:border-ecovest-primary focus:ring-ecovest-primary"
        >
          <option value="">No assistant needed</option>
          {assistants.map((assistant) => (
            <option key={assistant.id} value={assistant.id}>
              {assistant.name}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}