import React from 'react';

interface FaviconProps {
  className?: string;
}

export default function Favicon({ className = '' }: FaviconProps) {
  return (
    <div className={`relative ${className}`}>
      <img 
        src="https://wgzftywwvyyanpoxlyii.supabase.co/storage/v1/object/public/media/favicon-16x16.png?t=2024-12-25T09%3A26%3A04.417Z"
        alt="Ecovest Favicon"
        className="w-full h-full object-contain"
        onError={(e) => {
          console.error('Favicon failed to load');
          e.currentTarget.style.display = 'none';
        }}
      />
    </div>
  );
}