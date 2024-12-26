import React from 'react';
import { Calendar, Repeat } from 'lucide-react';

interface AppointmentTypeBadgeProps {
  type: 'ad-hoc' | 'permanent';
}

export default function AppointmentTypeBadge({ type }: AppointmentTypeBadgeProps) {
  return (
    <div className={`flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${
      type === 'permanent'
        ? 'bg-blue-100 text-blue-800'
        : 'bg-gray-100 text-gray-800'
    }`}>
      {type === 'permanent' ? (
        <>
          <Repeat className="w-3 h-3 mr-1" />
          Permanent
        </>
      ) : (
        <>
          <Calendar className="w-3 h-3 mr-1" />
          Ad-hoc
        </>
      )}
    </div>
  );
}