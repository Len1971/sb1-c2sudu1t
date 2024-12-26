import React from 'react';
import { Phone, Mail, MapPin } from 'lucide-react';
import type { Customer } from '../types';

interface CustomerCardProps {
  customer: Customer;
}

export default function CustomerCard({ customer }: CustomerCardProps) {
  return (
    <div className="bg-white rounded-lg shadow p-4 text-sm">
      <h3 className="font-medium text-gray-900 truncate mb-2">{customer.name}</h3>
      <div className="space-y-1.5">
        <div className="flex items-start text-gray-600">
          <MapPin className="h-4 w-4 mr-1.5 flex-shrink-0 mt-0.5" />
          <span className="line-clamp-2">{customer.address}</span>
        </div>
        {customer.phone && (
          <div className="flex items-center text-gray-600">
            <Phone className="h-4 w-4 mr-1.5 flex-shrink-0" />
            <span className="truncate">{customer.phone}</span>
          </div>
        )}
        {customer.email && (
          <div className="flex items-center text-gray-600">
            <Mail className="h-4 w-4 mr-1.5 flex-shrink-0" />
            <span className="truncate">{customer.email}</span>
          </div>
        )}
      </div>
    </div>
  );
}