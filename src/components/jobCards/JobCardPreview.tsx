import React from 'react';
import { Check, X } from 'lucide-react';

interface JobCardPreviewProps {
  data: any[];
  onConfirm: () => void;
  onCancel: () => void;
}

export default function JobCardPreview({ data, onConfirm, onCancel }: JobCardPreviewProps) {
  return (
    <div className="space-y-6">
      <h3 className="text-lg font-medium text-gray-900">
        Preview Job Cards ({data.length})
      </h3>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Customer
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Service Type
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Areas
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Products
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {data.map((card, index) => (
              <tr key={index}>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {card.customer}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {card.serviceType}
                </td>
                <td className="px-6 py-4 text-sm text-gray-500">
                  {card.areas.join(', ')}
                </td>
                <td className="px-6 py-4 text-sm text-gray-500">
                  {card.products.join(', ')}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex justify-end space-x-3">
        <button
          onClick={onCancel}
          className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
        >
          <X className="w-4 h-4 mr-2" />
          Cancel
        </button>
        <button
          onClick={onConfirm}
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-ecovest-primary hover:bg-ecovest-dark"
        >
          <Check className="w-4 h-4 mr-2" />
          Create Job Cards
        </button>
      </div>
    </div>
  );
}