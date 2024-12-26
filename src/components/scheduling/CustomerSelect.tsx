import React, { useEffect, useState } from 'react';
import { PlusCircle } from 'lucide-react';
import { supabase } from '../../lib/supabase';
import CustomerForm from './CustomerForm';
import type { Customer } from '../../types';

interface CustomerSelectProps {
  value: string;
  onChange: (value: string) => void;
}

export default function CustomerSelect({ value, onChange }: CustomerSelectProps) {
  const [customers, setCustomers] = useState<Array<{ id: string; name: string }>>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    fetchCustomers();
  }, []);

  const fetchCustomers = async () => {
    try {
      const { data, error } = await supabase
        .from('customers')
        .select('id, name')
        .order('name');

      if (error) throw error;
      setCustomers(data || []);
    } catch (error) {
      console.error('Error fetching customers:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleNewCustomer = (customer: Customer) => {
    setCustomers(prev => [...prev, { id: customer.id, name: customer.name }]);
    onChange(customer.id);
    setShowForm(false);
  };

  if (loading) {
    return <div className="animate-pulse h-10 bg-gray-200 rounded" />;
  }

  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        Customer *
      </label>
      <div className="flex space-x-2">
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          required
          className="block w-full rounded-md border-gray-300 shadow-sm focus:border-ecovest-primary focus:ring-ecovest-primary"
        >
          <option value="">Select a customer</option>
          {customers.map((customer) => (
            <option key={customer.id} value={customer.id}>
              {customer.name}
            </option>
          ))}
        </select>
        <button
          type="button"
          onClick={() => setShowForm(true)}
          className="inline-flex items-center px-3 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-ecovest-primary hover:bg-ecovest-dark"
        >
          <PlusCircle className="w-5 h-5" />
        </button>
      </div>

      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <h2 className="text-lg font-medium mb-4">Add New Customer</h2>
            <CustomerForm
              onSuccess={handleNewCustomer}
              onCancel={() => setShowForm(false)}
            />
          </div>
        </div>
      )}
    </div>
  );
}