import React, { useState } from 'react';

const roles = [
  { id: 1, name: 'Admin', permissions: ['Manage Users', 'View Reports', 'Edit Settings'] },
  { id: 2, name: 'Instructor', permissions: ['Create Courses', 'Grade Students'] },
  { id: 3, name: 'Student', permissions: ['View Courses', 'Submit Assignments'] },
];

const activityLogs = [
  'User John edited “Java Basics” - 16 July, 4:22 PM',
  'Admin updated site settings - 15 July, 3:00 PM',
  'Instructor Sarah created new course - 15 July, 10:12 AM',
];

export default function SecurityManagement() {
  const [twoFAEnabled, setTwoFAEnabled] = useState(false);
  const [accountLocked, setAccountLocked] = useState(false);
  const [failedAttempts, setFailedAttempts] = useState(2);

  const toggle2FA = () => setTwoFAEnabled(prev => !prev);
  const toggleLock = () => setAccountLocked(prev => !prev);

  return (
    <div className="p-6 space-y-6 h-full">
      <h2 className="text-2xl font-bold">Security Management</h2>

      {/* Role-Based Access Control */}
      <div className="bg-white shadow rounded-xl p-4 border-2 bg-gradient-to-r from-blue-300 to-pink-300" style={{ }}>
        <h3 className="font-semibold text-lg mb-2">User Roles & Permissions</h3>
        {roles.map(role => (
          <div key={role.id} className="mb-4">
            <h4 className="font-semibold">{role.name}</h4>
            <ul className="list-disc list-inside ml-4 text-sm text-white">
              {role.permissions.map((perm, index) => (
                <li key={index}>{perm}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Two-Factor Authentication */}
      <div className=" p-4 shadow rounded-xl border-2 bg-gradient-to-r from-blue-300 to-pink-300" style={{  }} >
        <h3 className="font-semibold text-lg mb-2">Two-Factor Authentication (2FA)</h3>
        <button
          onClick={toggle2FA}
          className={`px-4 py-2 rounded text-white ${twoFAEnabled ? 'bg-red-600' : 'bg-gray-600'}`}
        >
          {twoFAEnabled ? 'Disable 2FA' : 'Enable 2FA'}
        </button>
        <p className="mt-2 text-sm text-white">
          2FA is currently <strong>{twoFAEnabled ? 'enabled' : 'disabled'}</strong>.
        </p>
      </div>

      {/* Account Locking / Login Attempts */}
      <div className="bg-white shadow rounded-xl p-4 border-2 bg-gradient-to-r from-blue-300 to-pink-300" style={{ }}>
        <h3 className="font-semibold  text-lg mb-2">Account Security</h3>
        <p className='text-white'>Failed login attempts: <strong>{failedAttempts}</strong></p>
        <button
          onClick={toggleLock}
          className={`mt-2 px-4 py-2 rounded text-white ${accountLocked ? 'bg-gray-500' : 'bg-gray-600'}`}
        >
          {accountLocked ? 'Unlock Account' : 'Lock Account'}
        </button>
        <p className="mt-2 text-sm text-white">
          Account is currently <strong>{accountLocked ? 'Locked' : 'Active'}</strong>.
        </p>
      </div>

      {/* Activity Logs */}
      <div className="bg-white shadow rounded-xl p-4 border-2 bg-gradient-to-r from-blue-300 to-pink-300"style={{  }}>
        <h3 className="font-semibold text-lg mb-2">Activity Logs</h3>
        <ul className="list-disc list-inside text-sm text-white space-y-1">
          {activityLogs.map((log, index) => (
            <li key={index}>{log}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
