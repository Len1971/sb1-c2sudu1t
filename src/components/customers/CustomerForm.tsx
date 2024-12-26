import React, { useState } from 'react';
import { createCustomer } from '../../lib/customers';
import FormInput from '../ui/FormInput';
import Alert from '../ui/Alert';
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

  const handleSubmit = async () => {
    setError('');
    setLoading(true);

    try {
      const customer = await createCustomer(formData);
      onSuccess(customer);
    } catch (err) {
      setError('Failed to create customer. Please try again.');
      console.error('Customer creation error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <p className="text-red-600 font-bold text-sm">* All fields must be completed</p>
      {error && <Alert type="error" message={error} />}

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
        required
        value={formData.phone}
        onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
      />

      <FormInput
        id="email"
        label="Email"
        type="email"
        required
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
          type="button"
          onClick={handleSubmit}
          disabled={loading || !formData.name || !formData.address || !formData.phone || !formData.email}
          className="px-4 py-2 text-sm font-medium text-white bg-ecovest-primary border border-transparent rounded-md hover:bg-ecovest-dark disabled:opacity-50"
        >
          {loading ? 'Creating...' : 'Create Customer'}
        </button>
      </div>
    </div>
  );
}