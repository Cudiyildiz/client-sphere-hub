import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Users, 
  CreditCard, 
  Building2, 
  MessageSquare,
  Settings,
  LogOut,
  BarChart,
  Calendar,
  Tag,
  Link2,
  Share2
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

const Sidebar: React.FC = () => {
  const { user, logout } = useAuth();
  const location = useLocation();

  // Define navigation items based on user role
  const getNavItems = () => {
    switch (user?.role) {
      case 'admin':
        return [
          { path: '/admin', label: 'Gösterge Paneli', icon: <LayoutDashboard size={20} /> },
          { path: '/admin/staff', label: 'Personel Yönetimi', icon: <Users size={20} /> },
          { path: '/admin/brands', label: 'Marka Yönetimi', icon: <Building2 size={20} /> },
          { path: '/admin/subscription', label: 'Abonelik Planları', icon: <CreditCard size={20} /> },
          { path: '/admin/analytics', label: 'Sistem İstatistikleri', icon: <BarChart size={20} /> },
          { path: '/admin/messages', label: 'Marka Mesajları', icon: <MessageSquare size={20} /> },
          { path: '/admin/settings', label: 'Ayarlar', icon: <Settings size={20} /> },
        ];
      case 'staff':
        return [
          { path: '/staff', label: 'Gösterge Paneli', icon: <LayoutDashboard size={20} /> },
          { path: '/staff/brands', label: 'Markalar', icon: <Building2 size={20} /> },
          { path: '/staff/campaigns', label: 'Kampanyalar', icon: <Calendar size={20} /> },
          { path: '/staff/api-integrations', label: 'API Entegrasyonları', icon: <Link2 size={20} /> },
          { path: '/staff/messages', label: 'Müşteri Mesajları', icon: <MessageSquare size={20} /> },
          { path: '/staff/analytics', label: 'İstatistikler', icon: <BarChart size={20} /> },
          { path: '/staff/settings', label: 'Ayarlar', icon: <Settings size={20} /> },
        ];
      case 'brand':
        return [
          { path: '/brand', label: 'Gösterge Paneli', icon: <LayoutDashboard size={20} /> },
          { path: '/brand/customers', label: 'Müşteriler', icon: <Users size={20} /> },
          { path: '/brand/campaigns', label: 'Kampanyalar', icon: <Calendar size={20} /> },
          { path: '/brand/social-media', label: 'Platform Entegrasyonları', icon: <Share2 size={20} /> },
          { path: '/brand/messages', label: 'Müşteri Mesajları', icon: <MessageSquare size={20} /> },
          { path: '/brand/settings', label: 'Ayarlar', icon: <Settings size={20} /> },
        ];
      default:
        return [];
    }
  };

  const navItems = getNavItems();

  return (
    <div className="sidebar h-full w-64 flex-shrink-0 flex-col border-r bg-sidebar flex">
      <div className="flex h-16 items-center border-b px-6">
        <h1 className="text-lg font-bold text-primary">DataCrux</h1>
      </div>

      <div className="flex flex-1 flex-col justify-between overflow-y-auto py-4">
        <nav className="space-y-1 px-2">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                cn(
                  "flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors hover:bg-accent hover:text-accent-foreground",
                  isActive ? "bg-accent text-accent-foreground" : "text-muted-foreground"
                )
              }
            >
              {item.icon}
              <span>{item.label}</span>
            </NavLink>
          ))}
        </nav>

        <div className="px-2 py-4">
          <div className="mb-4 rounded-lg bg-sidebar-accent p-3">
            <div className="flex items-center">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground">
                {user?.name.charAt(0)}
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium">{user?.name}</p>
                <p className="text-xs text-muted-foreground">{user?.role}</p>
              </div>
            </div>
          </div>
          <Button 
            variant="outline" 
            className="w-full justify-start"
            onClick={() => logout()}
          >
            <LogOut className="mr-2 h-4 w-4" />
            <span>Çıkış Yap</span>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
