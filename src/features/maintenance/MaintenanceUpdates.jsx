import React, { useState } from 'react';

export default function MaintenanceUpdates() {
  const [version, setVersion] = useState('v1.2.3');
  const [updateStatus, setUpdateStatus] = useState('');
  const [resetStatus, setResetStatus] = useState('');

  const triggerManualUpdate = () => {
    setUpdateStatus('Checking for updates...');
    setTimeout(() => {
      setVersion('v1.2.4'); // Simulate update version bump
      setUpdateStatus('System successfully updated to v1.2.4');
    }, 1500);
  };

  const resetSystem = () => {
    localStorage.clear(); // Clear stored tokens, theme, etc.
    setResetStatus('Local data cleared. System reset to defaults.');
    setTimeout(() => {
      window.location.reload(); // Refresh the app
    }, 2000);
  };

  return (
    <div className="p-6 h-screen space-y-6 ">
      <h2 className="text-2xl font-bold">Maintenance & Updates</h2>

      {/* Current Version */}
      <div className="bg-gradient-to-r from-yellow-200 to-sky-500  text-black p-3 rounded">
        <strong>Current Version:</strong> {version}
      </div>

      {/* Manual Update Trigger */}
      <div className="space-y-2">
        <button
          onClick={triggerManualUpdate}
          className="bg-green-500 text-white px-4 py-2 rounded"
        >
          Trigger Manual Update
        </button>
        {updateStatus && (
          <p className="text-sm text-green-500">{updateStatus}</p>
        )}
      </div>

      {/* System Reset / Clear Cache */}
      <div className="space-y-2">
        <button
          onClick={resetSystem}
          className="bg-red-500 text-white px-4 py-2 rounded"
        >
          Clear Cache / Reset System
        </button>
        {resetStatus && (
          <p className="text-sm text-red-700">{resetStatus}</p>
        )}
      </div>
    </div>
  );
}
