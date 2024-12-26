import React, { useState } from 'react';
import { PlusCircle } from 'lucide-react';
import CustomerForm from './CustomerForm';

export default function AddCustomerButton() {
  const [showForm, setShowForm] = useState(false);

  return (
    <>
      <button
        onClick={() => setShowForm(true)}
        className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-ecovest-primary hover:bg-ecovest-dark"
      >
        <PlusCircle className="w-5 h-5 mr-2" />
        Add Customer
      </button>

      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <h2 className="text-lg font-medium mb-4">Add New Customer</h2>
            <CustomerForm
              onSuccess={() => setShowForm(false)}
              onCancel={() => setShowForm(false)}
            />
          </div>
        </div>
      )}
    </>
  );
}