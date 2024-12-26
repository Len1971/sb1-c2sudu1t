import React, { useState, useEffect } from 'react';
import { Bug, Plus, Trash2 } from 'lucide-react';
import { getPestControlConfig, updatePestControlConfig } from '../../lib/settings';
import Alert from '../ui/Alert';

export default function PestControlSettings() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [newArea, setNewArea] = useState('');
  const [newProduct, setNewProduct] = useState('');
  const [areas, setAreas] = useState<string[]>([]);
  const [products, setProducts] = useState<string[]>([]);

  useEffect(() => {
    loadConfig();
  }, []);

  const loadConfig = async () => {
    try {
      const config = await getPestControlConfig();
      setAreas(config.areas);
      setProducts(config.products);
    } catch (err) {
      console.error('Error loading config:', err);
      setError('Failed to load settings');
    }
  };

  const handleSave = async () => {
    try {
      setLoading(true);
      setError('');
      await updatePestControlConfig({ areas, products });
      setSuccess('Settings saved successfully!');
      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      setError('Failed to save settings');
      console.error('Settings update error:', err);
    } finally {
      setLoading(false);
    }
  };

  const addArea = () => {
    if (newArea && !areas.includes(newArea)) {
      setAreas([...areas, newArea]);
      setNewArea('');
    }
  };

  const removeArea = (area: string) => {
    setAreas(areas.filter(a => a !== area));
  };

  const addProduct = () => {
    if (newProduct && !products.includes(newProduct)) {
      setProducts([...products, newProduct]);
      setNewProduct('');
    }
  };

  const removeProduct = (product: string) => {
    setProducts(products.filter(p => p !== product));
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex items-center space-x-2 text-ecovest-primary mb-6">
        <Bug className="w-6 h-6" />
        <h2 className="text-xl font-semibold">Pest Control Settings</h2>
      </div>

      {error && <Alert type="error" message={error} />}
      {success && <Alert type="success" message={success} />}

      <div className="space-y-6">
        {/* Treatment Areas */}
        <div className="space-y-4">
          <h3 className="text-lg font-medium text-gray-900">Treatment Areas</h3>
          <div className="flex gap-2">
            <input
              type="text"
              value={newArea}
              onChange={(e) => setNewArea(e.target.value)}
              placeholder="Add new area..."
              className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-ecovest-primary focus:ring-ecovest-primary"
            />
            <button
              onClick={addArea}
              disabled={!newArea}
              className="inline-flex items-center px-3 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-ecovest-primary hover:bg-ecovest-dark disabled:opacity-50"
            >
              <Plus className="w-4 h-4 mr-1" />
              Add
            </button>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
            {areas.map((area) => (
              <div
                key={area}
                className="flex items-center justify-between px-3 py-2 bg-gray-50 rounded-md"
              >
                <span className="text-sm text-gray-700">{area}</span>
                <button
                  onClick={() => removeArea(area)}
                  className="text-red-600 hover:text-red-700"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Products */}
        <div className="space-y-4">
          <h3 className="text-lg font-medium text-gray-900">Products</h3>
          <div className="flex gap-2">
            <input
              type="text"
              value={newProduct}
              onChange={(e) => setNewProduct(e.target.value)}
              placeholder="Add new product..."
              className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-ecovest-primary focus:ring-ecovest-primary"
            />
            <button
              onClick={addProduct}
              disabled={!newProduct}
              className="inline-flex items-center px-3 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-ecovest-primary hover:bg-ecovest-dark disabled:opacity-50"
            >
              <Plus className="w-4 h-4 mr-1" />
              Add
            </button>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
            {products.map((product) => (
              <div
                key={product}
                className="flex items-center justify-between px-3 py-2 bg-gray-50 rounded-md"
              >
                <span className="text-sm text-gray-700">{product}</span>
                <button
                  onClick={() => removeProduct(product)}
                  className="text-red-600 hover:text-red-700"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="pt-4">
          <button
            onClick={handleSave}
            disabled={loading}
            className="w-full flex justify-center items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-ecovest-primary hover:bg-ecovest-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-ecovest-primary disabled:opacity-50"
          >
            {loading ? 'Saving...' : 'Save Changes'}
          </button>
        </div>
      </div>
    </div>
  );
}