import React from 'react';

interface AlertProps {
  type: 'error' | 'success';
  message: string;
}

export default function Alert({ type, message }: AlertProps) {
  const styles = {
    error: 'bg-red-50 border-red-200 text-red-700',
    success: 'bg-green-50 border-green-200 text-green-700'
  };

  return (
    <div className={`${styles[type]} px-4 py-3 rounded relative border`} role="alert">
      <span className="block sm:inline">{message}</span>
    </div>
  );
}