import React from 'react';
import { UserCheck } from 'lucide-react';

interface TechnicianSignatureProps {
  technicianName: string;
}

export default function TechnicianSignature({ technicianName }: TechnicianSignatureProps) {
  return (
    <div className="border-t border-gray-200 pt-4 mt-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center text-gray-700">
          <UserCheck className="w-5 h-5 mr-2 text-ecovest-primary" />
          <span className="font-medium">Certified Technician:</span>
        </div>
        <span className="text-lg font-semibold text-gray-900">{technicianName}</span>
      </div>
    </div>
  );
}