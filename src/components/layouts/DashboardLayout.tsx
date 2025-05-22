import React, { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '@/components/layouts/Sidebar';
import Topbar from '@/components/layouts/Topbar';
import { useToast } from '@/hooks/use-toast';
import { useTranslation } from 'react-i18next';

const DashboardLayout: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const { toast } = useToast();
    
  // Mobil ekran kontrolü
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
      // Mobil ekranda sidebar'ı otomatik olarak kapat
      if (window.innerWidth < 768) {
        setIsSidebarOpen(false);
      } else {
        setIsSidebarOpen(true);
      }
    };
    
    // İlk yükleme kontrolü
    checkMobile();
    
    // Ekran boyutu değiştiğinde kontrol et
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  // Function to demonstrate showing a toast notification
  const showWelcomeToast = () => {
    toast({
      title: 'CRM Paneline Hoş Geldiniz',
      description: 'Sisteme başarıyla giriş yaptınız.',
    });
  };

  return (
    <div className="flex h-screen bg-background">
      {/* Mobil için arka plan overlay */}
      {isMobile && isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-10"
          onClick={toggleSidebar}
        />
      )}
      
      <div 
        className={`sidebar z-20 transition-all duration-300 ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } ${isMobile ? 'fixed h-full w-64' : ''}`}
      >
        <Sidebar />
      </div>
      <div className="flex flex-1 flex-col overflow-hidden">
        <Topbar onToggleSidebar={toggleSidebar} showWelcomeToast={showWelcomeToast} />
        <main className="flex-1 overflow-y-auto p-4 md:p-6">
          <Outlet />
        </main>
        <footer className="border-t p-4 text-center text-sm text-muted-foreground">
          <p>© 2025 CRM Platformu. Tüm hakları saklıdır.</p>
        </footer>
      </div>
    </div>
  );
};

export default DashboardLayout;
