import React from 'react';
import { MapPin } from 'lucide-react';

interface TreatmentSectionProps {
  title: string;
  items: string[];
  selectedItems: string[];
  onChange: (items: string[]) => void;
  icon?: React.ReactNode;
  chipColor?: string;
}

export default function TreatmentSection({ 
  title, 
  items, 
  selectedItems, 
  onChange,
  icon = <MapPin className="w-4 h-4 mr-1" />,
  chipColor = 'bg-gray-100 hover:bg-gray-200'
}: TreatmentSectionProps) {
  const toggleItem = (item: string) => {
    if (selectedItems.includes(item)) {
      onChange(selectedItems.filter(i => i !== item));
    } else {
      onChange([...selectedItems, item]);
    }
  };

  return (
    <div className="space-y-2">
      <label className="flex items-center text-sm font-medium text-gray-700">
        {icon}
        {title}
      </label>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
        {items.map((item) => (
          <button
            key={item}
            onClick={() => toggleItem(item)}
            className={`px-3 py-2 rounded-md text-sm font-medium transition-colors text-left
              ${selectedItems.includes(item)
                ? 'bg-ecovest-primary text-white hover:bg-ecovest-dark'
                : `${chipColor} text-gray-700`
              }`}
          >
            {item}
          </button>
        ))}
      </div>
    </div>
  );
}