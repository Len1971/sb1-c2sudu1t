import React from 'react';
import { MapPin } from 'lucide-react';

interface TreatmentAreaSelectorProps {
  selectedAreas: string[];
  onChange: (areas: string[]) => void;
}

const TREATMENT_AREAS = [
  'Kitchen',
  'Bathroom',
  'Living Room',
  'Bedroom',
  'Dining Room',
  'Garage',
  'Basement',
  'Attic',
  'Exterior Perimeter',
  'Garden',
  'Roof',
  'Other'
];

export default function TreatmentAreaSelector({ selectedAreas, onChange }: TreatmentAreaSelectorProps) {
  const toggleArea = (area: string) => {
    if (selectedAreas.includes(area)) {
      onChange(selectedAreas.filter(a => a !== area));
    } else {
      onChange([...selectedAreas, area]);
    }
  };

  return (
    <div className="space-y-2">
      <label className="flex items-center text-sm font-medium text-gray-700">
        <MapPin className="w-4 h-4 mr-1" />
        Areas Treated
      </label>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
        {TREATMENT_AREAS.map((area) => (
          <button
            key={area}
            onClick={() => toggleArea(area)}
            className={`px-3 py-2 rounded-md text-sm font-medium transition-colors
              ${selectedAreas.includes(area)
                ? 'bg-ecovest-primary text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
          >
            {area}
          </button>
        ))}
      </div>
    </div>
  );
}