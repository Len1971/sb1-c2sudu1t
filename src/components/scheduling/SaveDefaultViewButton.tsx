import React, { useState } from 'react';
import { Save } from 'lucide-react';
import { saveDefaultView } from '../../lib/userPreferences';
import type { DateRange } from '../../utils/dateRanges';

interface SaveDefaultViewButtonProps {
  dateRange: DateRange;
  appointmentType: string;
}

export default function SaveDefaultViewButton({ dateRange, appointmentType }: SaveDefaultViewButtonProps) {
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  const handleSave = async () => {
    try {
      setSaving(true);
      await saveDefaultView({ dateRange, appointmentType });
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    } catch (error) {
      console.error('Error saving default view:', error);
    } finally {
      setSaving(false);
    }
  };

  return (
    <button
      onClick={handleSave}
      disabled={saving}
      className="inline-flex items-center px-3 py-1.5 text-sm font-medium rounded-md text-gray-700 bg-white border border-gray-300 hover:bg-gray-50 disabled:opacity-50"
    >
      <Save className="w-4 h-4 mr-1.5" />
      {saving ? 'Saving...' : saved ? 'Saved!' : 'Save This View as Default'}
    </button>
  );
}