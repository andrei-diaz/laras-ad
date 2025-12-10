import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/auth/ProtectedRoute';

// Lazy load pages for better performance
const HomePage = React.lazy(() => import('./pages/public/HomePage'));
const MenuPage = React.lazy(() => import('./pages/public/MenuPage'));
const AboutPage = React.lazy(() => import('./pages/public/AboutPage'));

const PublicPromotionsPage = React.lazy(() => import('./pages/public/PromotionsPage'));

const LoginPage = React.lazy(() => import('./pages/admin/LoginPage'));
const DashboardPage = React.lazy(() => import('./pages/admin/DashboardPage'));
const MenuManagementPage = React.lazy(() => import('./pages/admin/MenuManagementPage'));
const MenuTemplatePage = React.lazy(() => import('./pages/admin/MenuTemplatePage'));
const AdminPromotionsPage = React.lazy(() => import('./pages/admin/PromotionsPage'));
const SchedulePage = React.lazy(() => import('./pages/admin/SchedulePage'));
const SettingsPage = React.lazy(() => import('./pages/admin/SettingsPage'));
const ReviewsPage = React.lazy(() => import('./pages/admin/ReviewsPage'));
const MessagesPage = React.lazy(() => import('./pages/admin/MessagesPage'));

const isDev = process.env.NODE_ENV === 'development';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: isDev ? 0 : 5 * 60 * 1000, // 0 in dev, 5 min in prod
      refetchInterval: isDev ? 3000 : false, // Auto-refresh every 3s in dev
      retry: 1,
    },
  },
});

const LoadingFallback = () => (
  <div className="flex items-center justify-center min-h-screen">
    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
  </div>
);

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <BrowserRouter>
          <React.Suspense fallback={<LoadingFallback />}>
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<HomePage />} />
              <Route path="/menu" element={<MenuPage />} />
              <Route path="/nosotros" element={<AboutPage />} />

              <Route path="/promociones" element={<PublicPromotionsPage />} />

              {/* Admin Routes */}
              <Route path="/admin/login" element={<LoginPage />} />
              <Route element={<ProtectedRoute />}>
                <Route path="/admin" element={<Navigate to="/admin/dashboard" replace />} />
                <Route path="/admin/dashboard" element={<DashboardPage />} />
                <Route path="/admin/menu" element={<MenuManagementPage />} />
                <Route path="/admin/menu-template" element={<MenuTemplatePage />} />
                <Route path="/admin/promotions" element={<AdminPromotionsPage />} />
                <Route path="/admin/schedule" element={<SchedulePage />} />
                <Route path="/admin/settings" element={<SettingsPage />} />
                <Route path="/admin/reviews" element={<ReviewsPage />} />
                <Route path="/admin/messages" element={<MessagesPage />} />
              </Route>

              {/* Catch all */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </React.Suspense>
        </BrowserRouter>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
