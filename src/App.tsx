import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/layout/Layout';
import { ToastProvider } from './components/shared/ToastContext';
import { SettingsProvider } from './components/shared/SettingsContext';
import Home from './pages/Home';
import About from './pages/About';
import Academics from './pages/Academics';
import Admissions from './pages/Admissions';
import Notices from './pages/Notices';
import CalendarPage from './pages/Calendar';
import Staff from './pages/Staff';
import StudentLife from './pages/StudentLife';
import Infrastructure from './pages/Infrastructure';
import Gallery from './pages/Gallery';
import Results from './pages/Results';
import Downloads from './pages/Downloads';
import Alumni from './pages/Alumni';
import Contact from './pages/Contact';

// The admin dashboard is loaded separately and is not linked anywhere on the public site.
const AdminApp = lazy(() => import('./admin/AdminApp'));

function App() {
  return (
    <Router>
      <ToastProvider>
        <Routes>
          <Route
            path="/admin/*"
            element={
              <Suspense fallback={<div className="min-h-screen bg-brand-light" />}>
                <AdminApp />
              </Suspense>
            }
          />
          <Route
            path="/"
            element={
              <SettingsProvider>
                <Layout />
              </SettingsProvider>
            }
          >
            <Route index element={<Home />} />
            <Route path="about" element={<About />} />
            <Route path="academics" element={<Academics />} />
            <Route path="admissions" element={<Admissions />} />
            <Route path="notices" element={<Notices />} />
            <Route path="calendar" element={<CalendarPage />} />
            <Route path="staff" element={<Staff />} />
            <Route path="student-life" element={<StudentLife />} />
            <Route path="infrastructure" element={<Infrastructure />} />
            <Route path="gallery" element={<Gallery />} />
            <Route path="results" element={<Results />} />
            <Route path="downloads" element={<Downloads />} />
            <Route path="alumni" element={<Alumni />} />
            <Route path="contact" element={<Contact />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Route>
        </Routes>
      </ToastProvider>
    </Router>
  );
}

export default App;
