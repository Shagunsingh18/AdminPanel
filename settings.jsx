import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useContext} from 'react';
const defaultSettings = {
  zoomApiKey: '',
  stripeApiKey: '',
  gradingScale: 'percentage',
  theme: 'light',
  emailNotifications: false,
  language: 'en',
  sessionTimeout: 30,
};

export default function Settings() {
  const [settings, setSettings] = useState(defaultSettings);
  const {
    register,
    handleSubmit,
    reset,
    formState: { isDirty },
  } = useForm({
    defaultValues: defaultSettings,
  });

  useEffect(() => {
    const stored = localStorage.getItem('lms-settings');
    if (stored) {
      const parsed = JSON.parse(stored);
      setSettings(parsed);
      reset(parsed);
    }
  }, [reset]);

  const onSubmit = (data) => {
    setSettings(data);
    localStorage.setItem('lms-settings', JSON.stringify(data));
    alert('Settings saved! ✅');
    reset(data);
    changeTheme(data.theme); 
  };

  return (
    <div className="max-w-xl mx-auto p-6 rounded-xl shadow bg-white" >
      <h2 className="text-2xl font-semibold mb-4" style={{ color: '#6B8E23' }}>Settings & Configuration</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Zoom API Key */}
        <div>
          <label className="block text-sm font-medium mb-1">Zoom API Key</label>
          <input
            {...register('zoomApiKey')}
            className="w-full p-2 border rounded"
            placeholder="Enter Zoom API Key"
          />
        </div>

        {/* Stripe API Key */}
        <div>
          <label className="block text-sm font-medium mb-1">Stripe API Key</label>
          <input
            {...register('stripeApiKey')}
            className="w-full p-2 border rounded"
            placeholder="Enter Stripe API Key"
          />
        </div>

        {/* Grading Scale */}
        <div>
          <label className="block text-sm font-medium mb-1">Grading Scheme</label>
          <select {...register('gradingScale')} className="w-full p-2 border rounded">
            <option value="percentage">Percentage (%)</option>
            <option value="letter">Letter Grades (A, B, C...)</option>
            <option value="gpa">GPA (4.0)</option>
          </select>
        </div>

        {/* Theme */}
        <div>
          <label className="block text-sm font-medium mb-1">Theme</label>
          <select {...register('theme')} className="w-full p-2 border rounded">
            <option value="light">Light</option>
            <option value="dark">Dark</option>
            <option value="system">System Default</option>
          </select>
        </div>

        {/* Email Notifications */}
        <div className="flex items-center gap-2">
          <input type="checkbox" {...register('emailNotifications')} />
          <label className="text-sm font-medium">Enable Email Notifications</label>
        </div>

        {/* Language */}
        <div>
          <label className="block text-sm font-medium mb-1">Language</label>
          <select {...register('language')} className="w-full p-2 border rounded">
            <option value="en">English</option>
            <option value="hi">Hindi</option>
            <option value="es">Spanish</option>
          </select>
        </div>

        {/* Session Timeout */}
        <div>
          <label className="block text-sm font-medium mb-1">Session Timeout (minutes)</label>
          <input
            type="number"
            {...register('sessionTimeout')}
            className="w-full p-2 border rounded"
            placeholder="30"
            min="5"
          />
        </div>

        <div className="flex justify-end gap-2 pt-4">
          <button
            type="submit"
            disabled={!isDirty}
            className="px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-70"
          >
            Save Settings
          </button>
        </div>
      </form>
    </div>
  );
}
