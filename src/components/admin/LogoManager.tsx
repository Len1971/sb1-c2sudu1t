import React, { useState } from 'react';
import { uploadBrandingImage } from '../../lib/storage';
import { ASSETS } from '../../config/assets';

export default function LogoManager() {
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState('');

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setUploading(true);
      setMessage('Uploading...');
      await uploadBrandingImage(file);
      setMessage('Logo uploaded successfully! Refresh to see changes.');
      
      // Force reload the logo by updating the timestamp
      const img = new Image();
      img.src = ASSETS.branding.logo;
    } catch (error) {
      setMessage('Error uploading logo. Please try again.');
      console.error('Upload error:', error);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="p-4 bg-white rounded-lg shadow">
      <h3 className="text-lg font-medium mb-4">Logo Management</h3>
      
      <div className="mb-4">
        <p className="text-sm text-gray-600 mb-2">Current logo:</p>
        <img 
          src={ASSETS.branding.logo} 
          alt="Current Logo" 
          className="h-16 object-contain bg-gray-50 rounded p-2"
        />
      </div>

      <div className="mt-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Upload new logo
        </label>
        <input
          type="file"
          accept="image/*"
          onChange={handleFileUpload}
          disabled={uploading}
          className="block w-full text-sm text-gray-500
            file:mr-4 file:py-2 file:px-4
            file:rounded-md file:border-0
            file:text-sm file:font-semibold
            file:bg-ecovest-primary file:text-white
            hover:file:bg-ecovest-dark
            disabled:opacity-50"
        />
      </div>

      {message && (
        <p className={`mt-2 text-sm ${
          message.includes('Error') ? 'text-red-600' : 'text-green-600'
        }`}>
          {message}
        </p>
      )}
    </div>
  );
}