import React, { Suspense, lazy } from 'react';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from './queryClient';
import ErrorBoundary from './ErrorBoundary.jsx';
import {
  RouterProvider,
  createBrowserRouter,
  Navigate,
} from 'react-router-dom';
import UserDetails from './features/users/UserDetails.jsx';
import AdminLayout from './layouts/AdminLayout.jsx';

const Dashboard      = lazy(() => import('./features/dashboard/SystemMonitoring.jsx'));
const Users          = lazy(() => import('./features/users/Users.jsx'));
const Courses        = lazy(() => import('./features/courses/Courses.jsx'));
const Settings       = lazy(() => import('./features/settings.jsx'));
const Reports        = lazy(() => import('./features/reports.jsx'));
const Security       = lazy(() => import('./features/security/SecurityManagement.jsx'));
const Maintenance    = lazy(() => import('./features/maintenance/MaintenanceUpdates.jsx'));
const Analytics       = lazy(() => import('./features/analytics/ReportingAnalytics.jsx'));

const router = createBrowserRouter([
  {
    element: <AdminLayout />,
    errorElement: <ErrorBoundary />,
    children: [
      { index: true, element: <Dashboard /> }, // / (System Monitoring)
      { path: 'users',       element: <Users /> },
      { path: 'courses',     element: <Courses /> },
      { path: 'settings',  element: <Settings /> },
      { path: 'reports',     element: <Reports /> },
      { path: 'analytics',   element: <Analytics /> },       
      { path: 'security',    element: <Security /> },        
      { path: 'maintenance', element: <Maintenance /> },      
      { path: '*',           element: <Navigate to="/" replace /> },
      {path: '/users/:id',element: <UserDetails />}
    ],
  },
]);


export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Suspense fallback={<div className="p-4">Loading…</div>}>
        <RouterProvider router={router} />
      </Suspense>
    </QueryClientProvider>
  );
}
