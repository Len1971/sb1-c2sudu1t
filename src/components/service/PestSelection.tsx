import React from 'react';
import { Bug } from 'lucide-react';

interface PestSelectionProps {
  selectedPests: string[];
  onChange: (pests: string[]) => void;
}

const PEST_OPTIONS = [
  'Cockroaches',
  'Flies',
  'Rats / Mice',
  'Stored Product',
  'Fleas',
  'Ants',
  'Fishmoths'
];

export default function PestSelection({ selectedPests, onChange }: PestSelectionProps) {
  const togglePest = (pest: string) => {
    if (selectedPests.includes(pest)) {
      onChange(selectedPests.filter(p => p !== pest));
    } else {
      onChange([...selectedPests, pest]);
    }
  };

  return (
    <div className="space-y-2">
      <label className="flex items-center text-sm font-medium text-gray-700">
        <Bug className="w-4 h-4 mr-1" />
        Pests Covered and Treated for
      </label>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
        {PEST_OPTIONS.map((pest) => (
          <button
            key={pest}
            onClick={() => togglePest(pest)}
            className={`px-3 py-2 rounded-md text-sm font-medium transition-colors text-left
              ${selectedPests.includes(pest)
                ? 'bg-ecovest-primary text-white hover:bg-ecovest-dark'
                : 'bg-yellow-50 text-gray-700 hover:bg-yellow-100'
              }`}
          >
            {pest}
          </button>
        ))}
      </div>
    </div>
  );
}