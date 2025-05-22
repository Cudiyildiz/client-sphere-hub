import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import ProtectedRoute from "@/components/ProtectedRoute";
import DashboardLayout from "@/components/layouts/DashboardLayout";

// Auth
import Login from "@/pages/Login";

// Admin pages
import AdminDashboard from "@/pages/admin/AdminDashboard";
import StaffManagement from "@/pages/admin/StaffManagement";
import BrandManagement from "@/pages/admin/BrandManagement";
import SubscriptionPlans from "@/pages/admin/SubscriptionPlans";
import AdminSettings from "@/pages/admin/AdminSettings";
import AdminAnalytics from "@/pages/admin/Analytics";
import AdminMessages from "@/pages/admin/Messages";

// Staff pages
import StaffDashboard from "@/pages/staff/StaffDashboard";
import StaffBrands from "@/pages/staff/StaffBrands";
import BrandDetail from "@/pages/staff/BrandDetail";
import StaffSettings from "@/pages/staff/StaffSettings";
import StaffCampaigns from "@/pages/staff/Campaigns";
import StaffMessages from "@/pages/staff/Messages";
import StaffAnalytics from "@/pages/staff/Analytics";
import ApiIntegrations from "@/pages/staff/ApiIntegrations";

// Brand pages
import BrandDashboard from "@/pages/brand/BrandDashboard";
import Customers from "@/pages/brand/Customers";
import Campaigns from "@/pages/brand/Campaigns";
import BrandMessages from "@/pages/brand/Messages";
import BrandSettings from "@/pages/brand/Settings";
import SocialMediaIntegrations from "@/pages/brand/SocialMediaIntegrations";

// 404 page
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            {/* Public routes */}
            <Route path="/login" element={<Login />} />
            
            {/* Admin routes */}
            <Route
              path="/admin"
              element={
                <ProtectedRoute allowedRoles={["admin"]}>
                  <DashboardLayout />
                </ProtectedRoute>
              }
            >
              <Route index element={<AdminDashboard />} />
              <Route path="staff" element={<StaffManagement />} />
              <Route path="brands" element={<BrandManagement />} />
              <Route path="subscription" element={<SubscriptionPlans />} />
              <Route path="analytics" element={<AdminAnalytics />} />
              <Route path="messages" element={<AdminMessages />} />
              <Route path="settings" element={<AdminSettings />} />
            </Route>
            
            {/* Staff routes */}
            <Route
              path="/staff"
              element={
                <ProtectedRoute allowedRoles={["staff"]}>
                  <DashboardLayout />
                </ProtectedRoute>
              }
            >
              <Route index element={<StaffDashboard />} />
              <Route path="brands" element={<StaffBrands />} />
              <Route path="brands/:brandId" element={<BrandDetail />} />
              <Route path="campaigns" element={<StaffCampaigns />} />
              <Route path="messages" element={<StaffMessages />} />
              <Route path="analytics" element={<StaffAnalytics />} />
              <Route path="api-integrations" element={<ApiIntegrations />} />
              <Route path="settings" element={<StaffSettings />} />
            </Route>
            
            {/* Brand routes */}
            <Route
              path="/brand"
              element={
                <ProtectedRoute allowedRoles={["brand"]}>
                  <DashboardLayout />
                </ProtectedRoute>
              }
            >
              <Route index element={<BrandDashboard />} />
              <Route path="customers" element={<Customers />} />
              <Route path="campaigns" element={<Campaigns />} />
              <Route path="messages" element={<BrandMessages />} />
              <Route path="social-media" element={<SocialMediaIntegrations />} />
              <Route path="settings" element={<BrandSettings />} />
            </Route>
            
            {/* Redirect root to login */}
            <Route path="/" element={<Navigate to="/login" replace />} />
            
            {/* 404 route */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;