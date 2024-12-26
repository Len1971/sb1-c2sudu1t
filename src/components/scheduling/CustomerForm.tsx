import React, { useState } from 'react';
import { supabase } from '../../lib/supabase';
import FormInput from '../ui/FormInput';
import type { Customer } from '../../types';

interface CustomerFormProps {
  onSuccess: (customer: Customer) => void;
  onCancel: () => void;
}

export default function CustomerForm({ onSuccess, onCancel }: CustomerFormProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    address: '',
    phone: '',
    email: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const { data, error: createError } = await supabase
        .from('customers')
        .insert({
          name: formData.name,
          address: formData.address,
          phone: formData.phone,
          email: formData.email
        })
        .select()
        .single();

      if (createError) throw createError;
      if (data) onSuccess(data);
    } catch (err) {
      setError('Failed to create customer. Please try again.');
      console.error('Customer creation error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <div className="text-red-600 text-sm">{error}</div>
      )}

      <FormInput
        id="name"
        label="Name"
        type="text"
        required
        value={formData.name}
        onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
      />

      <FormInput
        id="address"
        label="Address"
        type="text"
        required
        value={formData.address}
        onChange={(e) => setFormData(prev => ({ ...prev, address: e.target.value }))}
      />

      <FormInput
        id="phone"
        label="Phone"
        type="tel"
        value={formData.phone}
        onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
      />

      <FormInput
        id="email"
        label="Email"
        type="email"
        value={formData.email}
        onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
      />

      <div className="flex justify-end space-x-3">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={loading}
          className="px-4 py-2 text-sm font-medium text-white bg-ecovest-primary border border-transparent rounded-md hover:bg-ecovest-dark disabled:opacity-50"
        >
          {loading ? 'Creating...' : 'Create Customer'}
        </button>
      </div>
    </form>
  );
}