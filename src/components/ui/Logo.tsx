import React, { useState, useEffect } from 'react';
import { Leaf } from 'lucide-react';
import { ASSETS } from '../../config/assets';

interface LogoProps {
  className?: string;
  borderColor?: string;
}

export default function Logo({ className = '', borderColor = 'border-ecovest-primary' }: LogoProps) {
  const [imageError, setImageError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const img = new Image();
    img.src = ASSETS.branding.logo;
    img.onload = () => setIsLoading(false);
    img.onerror = () => {
      setIsLoading(false);
      setImageError(true);
    };
  }, []);

  if (isLoading) {
    return (
      <div className={`flex items-center ${className}`}>
        <Leaf className="w-8 h-8 text-white animate-pulse" />
      </div>
    );
  }

  if (imageError) {
    return (
      <div className={`flex items-center ${className}`}>
        <Leaf className="w-8 h-8 text-white" />
        <span className="ml-2 font-semibold text-white text-xl">
          {ASSETS.branding.fallback.text}
        </span>
      </div>
    );
  }

  return (
    <div className={`relative ${className}`}>
      <img 
        src={ASSETS.branding.logo}
        alt={ASSETS.branding.fallback.text}
        className={`w-full h-full object-contain border-2 ${borderColor} rounded-md p-1`}
        onError={() => setImageError(true)}
      />
    </div>
  );
}