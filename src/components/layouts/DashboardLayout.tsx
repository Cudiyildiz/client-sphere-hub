
import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '@/components/layouts/Sidebar';
import Topbar from '@/components/layouts/Topbar';

const DashboardLayout: React.FC = () => {
  return (
    <div className="flex h-screen bg-background">
      <Sidebar />
      <div className="flex flex-1 flex-col overflow-hidden">
        <Topbar />
        <main className="flex-1 overflow-y-auto p-4 md:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
