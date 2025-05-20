
import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '@/components/layouts/Sidebar';
import Topbar from '@/components/layouts/Topbar';
import { useToast } from '@/hooks/use-toast';

const DashboardLayout: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const { toast } = useToast();
  
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  // Function to demonstrate showing a toast notification
  const showWelcomeToast = () => {
    toast({
      title: 'Welcome to the CRM Dashboard',
      description: 'You have successfully logged in to the system.',
    });
  };

  return (
    <div className="flex h-screen bg-background">
      <div className={`sidebar transition-all duration-300 ${isSidebarOpen ? '' : 'hidden'}`}>
        <Sidebar />
      </div>
      <div className="flex flex-1 flex-col overflow-hidden">
        <Topbar onToggleSidebar={toggleSidebar} showWelcomeToast={showWelcomeToast} />
        <main className="flex-1 overflow-y-auto p-4 md:p-6">
          <Outlet />
        </main>
        <footer className="border-t p-4 text-center text-sm text-muted-foreground">
          <p>© 2025 CRM Platform. All rights reserved.</p>
        </footer>
      </div>
    </div>
  );
};

export default DashboardLayout;
