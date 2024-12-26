import React from 'react';
import { ClipboardEdit } from 'lucide-react';

interface ServiceNotesProps {
  value: string;
  onChange: (value: string) => void;
}

export default function ServiceNotes({ value, onChange }: ServiceNotesProps) {
  return (
    <div className="space-y-2">
      <label className="flex items-center text-sm font-medium text-gray-700">
        <ClipboardEdit className="w-4 h-4 mr-1" />
        Service Notes
      </label>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        rows={4}
        className="w-full rounded-md border-gray-300 shadow-sm focus:border-ecovest-primary focus:ring-ecovest-primary resize-none"
        placeholder="Enter any additional notes or observations..."
      />
    </div>
  );
}