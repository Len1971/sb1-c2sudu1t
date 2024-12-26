import React, { useState } from 'react';
import { Upload, FileSpreadsheet, AlertCircle } from 'lucide-react';
import { parseExcelJobCards } from '../../utils/excelParser';
import Alert from '../ui/Alert';

interface ExcelUploadProps {
  onDataParsed: (data: any[]) => void;
}

export default function ExcelUpload({ onDataParsed }: ExcelUploadProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.name.match(/\.(xlsx|xls)$/)) {
      setError('Please upload an Excel file (.xlsx or .xls)');
      return;
    }

    try {
      setLoading(true);
      setError('');
      const data = await parseExcelJobCards(file);
      onDataParsed(data);
    } catch (err) {
      setError('Failed to parse Excel file. Please check the format.');
      console.error('Excel parse error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      {error && <Alert type="error" message={error} />}
      
      <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
        <div className="space-y-4">
          <div className="flex justify-center">
            <FileSpreadsheet className="h-12 w-12 text-gray-400" />
          </div>
          <div>
            <label className="relative cursor-pointer rounded-md font-medium text-ecovest-primary hover:text-ecovest-dark focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-ecovest-primary">
              <span>Upload Excel File</span>
              <input
                type="file"
                className="sr-only"
                accept=".xlsx,.xls"
                onChange={handleFileUpload}
                disabled={loading}
              />
            </label>
          </div>
          <p className="text-sm text-gray-500">
            Upload an Excel file containing job card data
          </p>
        </div>
      </div>

      {loading && (
        <div className="flex items-center justify-center text-sm text-gray-500">
          <Upload className="w-4 h-4 mr-2 animate-spin" />
          Processing file...
        </div>
      )}

      <div className="mt-4">
        <h4 className="text-sm font-medium text-gray-900 mb-2">Required Format:</h4>
        <div className="text-sm text-gray-500 space-y-1">
          <p>• First row should contain column headers</p>
          <p>• Required columns: Customer, Address, Service Type, Areas, Products</p>
          <p>• Optional columns: Notes, Date</p>
        </div>
      </div>
    </div>
  );
}