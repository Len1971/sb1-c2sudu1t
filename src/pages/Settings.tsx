import React from 'react';
import { Settings as SettingsIcon } from 'lucide-react';
import LogoManager from '../components/admin/LogoManager';
import PestControlSettings from '../components/admin/PestControlSettings';

export default function Settings() {
  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          <SettingsIcon className="w-6 h-6 text-gray-500" />
          <h1 className="text-2xl font-semibold text-gray-900">Settings</h1>
        </div>
      </div>

      <div className="max-w-2xl space-y-8">
        <LogoManager />
        <PestControlSettings />
      </div>
    </div>
  );
}