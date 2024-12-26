import React from 'react';
import { Beaker } from 'lucide-react';

interface ProductSelectorProps {
  selectedProducts: string[];
  onChange: (products: string[]) => void;
}

const PEST_CONTROL_PRODUCTS = [
  'General Insecticide',
  'Ant Treatment',
  'Cockroach Gel',
  'Rodent Bait',
  'Spider Treatment',
  'Termite Treatment',
  'Mosquito Spray',
  'Fly Control',
  'Other'
];

export default function ProductSelector({ selectedProducts, onChange }: ProductSelectorProps) {
  const toggleProduct = (product: string) => {
    if (selectedProducts.includes(product)) {
      onChange(selectedProducts.filter(p => p !== product));
    } else {
      onChange([...selectedProducts, product]);
    }
  };

  return (
    <div className="space-y-2">
      <label className="flex items-center text-sm font-medium text-gray-700">
        <Beaker className="w-4 h-4 mr-1" />
        Products Used
      </label>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
        {PEST_CONTROL_PRODUCTS.map((product) => (
          <button
            key={product}
            onClick={() => toggleProduct(product)}
            className={`px-3 py-2 rounded-md text-sm font-medium transition-colors
              ${selectedProducts.includes(product)
                ? 'bg-ecovest-primary text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
          >
            {product}
          </button>
        ))}
      </div>
    </div>
  );
}