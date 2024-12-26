import React, { useEffect, useState } from 'react';
import { Bug } from 'lucide-react';
import { getNextJobCardNumber } from '../../lib/jobCards';

export default function JobCardHeader() {
  const [jobNumber, setJobNumber] = useState<string>('');

  useEffect(() => {
    async function fetchJobNumber() {
      try {
        const number = await getNextJobCardNumber();
        setJobNumber(number);
      } catch (error) {
        console.error('Failed to get job card number:', error);
      }
    }

    fetchJobNumber();
  }, []);

  return (
    <div className="flex items-center justify-between border-b border-gray-200 pb-4">
      <div className="flex items-center space-x-2 text-ecovest-primary">
        <Bug className="w-6 h-6" />
        <h2 className="text-xl font-semibold">Pest Control Service</h2>
      </div>
      <div className="text-right">
        <span className="text-sm text-gray-500">Job Card Number</span>
        <div className="text-lg font-semibold text-ecovest-primary">
          {jobNumber || 'Generating...'}
        </div>
      </div>
    </div>
  );
}