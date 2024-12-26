import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import CompletedJobs from './pages/CompletedJobs';
import Reports from './pages/Reports';
import JobCards from './pages/JobCards';
import ArchivedReports from './pages/ArchivedReports';
import Customers from './pages/Customers';
import Settings from './pages/Settings';
import Login from './pages/Login';
import ServiceInProgressPage from './pages/ServiceInProgressPage';
import { useAuth } from './hooks/useAuth';
import LoadingSpinner from './components/ui/LoadingSpinner';

function AuthenticatedRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Navigate to="/dashboard" replace />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="completed" element={<CompletedJobs />} />
        <Route path="reports" element={<Reports />} />
        <Route path="jobcards" element={<JobCards />} />
        <Route path="archive" element={<ArchivedReports />} />
        <Route path="customers" element={<Customers />} />
        <Route path="settings" element={<Settings />} />
        <Route path="service/:id" element={<ServiceInProgressPage />} />
      </Route>
    </Routes>
  );
}

export default function App() {
  const { user, loading } = useAuth();

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <BrowserRouter>
      {user ? <AuthenticatedRoutes /> : <Login />}
    </BrowserRouter>
  );
}