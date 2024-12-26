import React from 'react';
import { Users } from 'lucide-react';
import CustomerList from '../components/CustomerList';
import AddCustomerButton from '../components/customers/AddCustomerButton';
import { useCustomers } from '../hooks/useCustomers';
import LoadingSpinner from '../components/ui/LoadingSpinner';
import Alert from '../components/ui/Alert';

export default function Customers() {
  const { customers, loading, error } = useCustomers();

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <Alert type="error" message={error} />;
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <div className="flex items-center space-x-4">
          <h1 className="text-2xl font-semibold text-gray-900">Customers</h1>
          <div className="flex items-center space-x-2">
            <Users className="w-5 h-5 text-gray-500" />
            <span className="text-gray-600">{customers.length} total</span>
          </div>
        </div>
        <AddCustomerButton />
      </div>
      <CustomerList customers={customers} />
    </div>
  );
}