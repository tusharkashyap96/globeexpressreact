import React from 'react';
import { Route, Routes, BrowserRouter as Router } from 'react-router-dom';
import { Toaster } from '@/components/ui/sonner';
import ScrollToTop from './components/ScrollToTop';
import { AuthProvider } from './contexts/AuthContext.jsx';
import ProtectedRoute from './components/ProtectedRoute.jsx';

import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import ServicesPage from './pages/ServicesPage';
import BookingPage from './pages/BookingPage.jsx';
import TrackingPage from './pages/TrackingPage.jsx';
import ContactPage from './pages/ContactPage';
import CareersPage from './pages/CareersPage';
import TermsPage from './pages/TermsPage';
import PrivacyPage from './pages/PrivacyPage';
import RefundPage from './pages/RefundPage';
import LoginPage from './pages/LoginPage.jsx';
import AdminBookingsPage from './pages/AdminBookingsPage.jsx';

function App() {
  return (
    <Router>
      <AuthProvider>
        <ScrollToTop />
        <Toaster position="top-center" />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/booking" element={<BookingPage />} />
          <Route path="/track-booking" element={<TrackingPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/careers" element={<CareersPage />} />
          <Route path="/terms" element={<TermsPage />} />
          <Route path="/privacy" element={<PrivacyPage />} />
          <Route path="/refund" element={<RefundPage />} />
          
          <Route path="/login" element={<LoginPage />} />
          <Route 
            path="/admin/bookings" 
            element={
              <ProtectedRoute requireAdmin={true}>
                <AdminBookingsPage />
              </ProtectedRoute>
            } 
          />

          <Route path="*" element={
            <div className="min-h-screen flex items-center justify-center bg-background">
              <div className="text-center">
                <h1 className="text-6xl font-bold text-primary mb-4">404</h1>
                <p className="text-xl text-muted-foreground mb-8">Page not found</p>
                <a href="/" className="text-primary hover:underline">Back to home</a>
              </div>
            </div>
          } />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;