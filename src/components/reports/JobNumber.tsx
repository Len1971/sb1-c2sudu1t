import React from 'react';
import { Hash } from 'lucide-react';

interface JobNumberProps {
  number: string;
  className?: string;
}

export default function JobNumber({ number, className = '' }: JobNumberProps) {
  return (
    <div className={`flex items-center ${className}`}>
      <Hash className="w-4 h-4 mr-1 text-ecovest-primary" />
      <span className="font-mono text-sm">{number}</span>
    </div>
  );
}