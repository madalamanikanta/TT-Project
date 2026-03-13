import { useState, useEffect } from 'react';
import { Sidebar } from '../../components/layout/Sidebar';
import { Button } from '../../components/ui/button';
import { Settings as SettingsIcon, Save } from 'lucide-react';
import api from '../../../services/api';

export default function Settings() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [settings, setSettings] = useState({
    appName: '',
    version: '',
    maintenanceMode: false,
    registrationEnabled: true,
    apiRequestsLast24h: 0
  });

  useEffect(() => {
    const loadSettings = async () => {
      try {
        const response = await api.get('/admin/settings');
        setSettings(response.data);
      } catch (err: any) {
        setError(err.response?.data?.error || 'Unable to load settings from server');
      } finally {
        setLoading(false);
      }
    };
    loadSettings();
  }, []);

  const handleSave = () => {
    // Simulated save action (backend API for PUT settings is beyond current requirements)
    alert('Settings saved successfully (simulated)');
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar userRole="admin" />
      
      <div className="flex-1 p-8">
        <div className="mb-8">
          <h1 className="text-3xl font-semibold text-gray-900 mb-2">System Settings</h1>
          <p className="text-gray-600">Manage global platform configurations</p>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
            <p className="font-semibold text-red-900">Error</p>
            <p className="text-red-800">{error}</p>
          </div>
        )}

        <div className="bg-white rounded-lg border border-gray-200 p-8 max-w-3xl">
          <div className="flex items-center space-x-3 mb-6">
            <div className="bg-primary/10 p-2 rounded-lg">
              <SettingsIcon className="h-6 w-6 text-primary" />
            </div>
            <h2 className="text-xl font-semibold">General configuration</h2>
          </div>

          {loading ? (
            <p className="text-gray-500">Loading settings...</p>
          ) : (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Application Name
                  </label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50"
                    value={settings.appName}
                    onChange={(e) => setSettings({ ...settings, appName: e.target.value })}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    System Version
                  </label>
                  <input
                    type="text"
                    disabled
                    className="w-full px-3 py-2 border border-gray-200 bg-gray-50 rounded-md text-gray-500"
                    value={settings.version}
                  />
                </div>
              </div>

              <div className="border-t border-gray-100 pt-6">
                <h3 className="text-sm font-medium text-gray-900 mb-4">Platform Toggles</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-900">Maintenance Mode</p>
                      <p className="text-sm text-gray-500">Temporarily disable student access</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input 
                         type="checkbox" 
                         className="sr-only peer" 
                         checked={settings.maintenanceMode}
                         onChange={(e) => setSettings({ ...settings, maintenanceMode: e.target.checked })}
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                    </label>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-900">Enable Registration</p>
                      <p className="text-sm text-gray-500">Allow new students to sign up</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input 
                         type="checkbox" 
                         className="sr-only peer" 
                         checked={settings.registrationEnabled}
                         onChange={(e) => setSettings({ ...settings, registrationEnabled: e.target.checked })}
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                    </label>
                  </div>
                </div>
              </div>

              <div className="border-t border-gray-100 pt-6">
                <h3 className="text-sm font-medium text-gray-900 mb-4">System Statistics</h3>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-gray-600">API Requests (24h)</span>
                    <span className="font-semibold text-gray-900">{settings.apiRequestsLast24h.toLocaleString()}</span>
                  </div>
                </div>
              </div>

              <div className="flex justify-end pt-4">
                <Button onClick={handleSave}>
                  <Save className="h-4 w-4 mr-2" />
                  Save Changes
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
