import React from 'react';
import { Leaf } from 'lucide-react';

export default function LoadingSpinner() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="relative w-8 h-8">
        {/* Outer circle */}
        <div 
          className="absolute border-2 border-ecovest-primary rounded-full animate-pulse"
          style={{
            top: '-24px',
            left: '-24px',
            right: '-24px',
            bottom: '-24px'
          }}
        />
        {/* Inner circle */}
        <div 
          className="absolute border-2 border-ecovest-primary rounded-full animate-pulse"
          style={{
            top: '-12px',
            left: '-12px',
            right: '-12px',
            bottom: '-12px'
          }}
        />
        {/* Leaf icon */}
        <Leaf className="w-full h-full text-[#F7931E] animate-spin" />
      </div>
    </div>
  );
}