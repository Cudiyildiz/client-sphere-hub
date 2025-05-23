
import React, { useState } from 'react';
import { Menu, BellIcon, Search, Settings, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useAuth } from '@/contexts/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface TopbarProps {
  onToggleSidebar?: () => void;
  showWelcomeToast?: () => void;
}

const Topbar: React.FC<TopbarProps> = ({ onToggleSidebar, showWelcomeToast }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  
  // Notification data for dropdown
  const notifications = [
    { id: 1, text: "Yeni mesaj", description: "Müşteriden yeni mesaj geldi", time: "5 dk önce" },
    { id: 2, text: "Kampanya 'Summer Sale' aktif", description: "Kampanya başarıyla aktifleştirildi", time: "1 saat önce" },
    { id: 3, text: "Yeni müşteri kaydoldu", description: "Platformunuza yeni bir müşteri katıldı", time: "3 saat önce" },
  ];
  
  const handleSettingsClick = () => {
    // Navigate to settings page based on user role
    if (user?.role === "brand") {
      navigate('/brand/settings');
    } else if (user?.role === "staff") {
      navigate('/staff/settings');
    } else if (user?.role === "admin") {
      navigate('/admin/settings');
    }
  };

  const handleProfileClick = () => {
    // Navigate to profile page based on user role
    if (user?.role === "brand") {
      navigate('/brand/settings');
    } else if (user?.role === "staff") {
      navigate('/staff/settings');
    } else if (user?.role === "admin") {
      navigate('/admin/settings');
    }
  };

  return (
    <header className="flex h-16 items-center border-b bg-card px-4 md:px-6">
      <Button
        variant="ghost"
        size="icon"
        className="mr-2 md:mr-4"
        onClick={onToggleSidebar}
      >
        <Menu className="h-6 w-6" />
        <span className="sr-only">Toggle menu</span>
      </Button>
      
      <div className="flex w-full items-center justify-between">
        <div className="relative w-full max-w-md">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Arama yap..."
            className="w-full bg-background pl-8 md:w-[300px] lg:w-[400px]"
          />
        </div>
        
        <div className="flex items-center gap-2 md:gap-4">
          <DropdownMenu open={notificationsOpen} onOpenChange={setNotificationsOpen}>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="relative">
                <BellIcon className="h-5 w-5" />
                {notifications.length > 0 && (
                  <span className="absolute right-1 top-1 h-2 w-2 rounded-full bg-red-500" />
                )}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-80">
              <DropdownMenuLabel>Bildirimler</DropdownMenuLabel>
              <DropdownMenuSeparator />
              {notifications.length > 0 ? (
                <>
                  {notifications.map(notification => (
                    <DropdownMenuItem key={notification.id} className="py-2 cursor-pointer">
                      <div className="space-y-1 w-full">
                        <div className="flex items-center justify-between">
                          <p className="font-medium text-sm">{notification.text}</p>
                          <p className="text-xs text-muted-foreground">{notification.time}</p>
                        </div>
                        <p className="text-xs text-muted-foreground">{notification.description}</p>
                      </div>
                    </DropdownMenuItem>
                  ))}
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="justify-center">
                    <Button variant="ghost" className="w-full" size="sm">
                      Tüm bildirimleri görüntüle
                    </Button>
                  </DropdownMenuItem>
                </>
              ) : (
                <div className="p-4 text-center">
                  <p className="text-muted-foreground">Yeni bildirim yok</p>
                </div>
              )}
            </DropdownMenuContent>
          </DropdownMenu>

          <Button variant="ghost" size="icon" onClick={handleSettingsClick}>
            <Settings className="h-5 w-5" />
          </Button>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <div className="flex items-center cursor-pointer">
                <div className="hidden md:block mr-3">
                  <p className="text-sm font-medium">{user?.name}</p>
                  <p className="text-xs text-muted-foreground capitalize">{user?.role} Hesabım</p>
                </div>
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary text-primary-foreground">
                  {user?.name.charAt(0)}
                </div>
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Hesabım</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleProfileClick}>
                <User className="mr-2 h-4 w-4" />
                <span>Profil</span>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={handleSettingsClick}>
                <Settings className="mr-2 h-4 w-4" />
                <span>Ayarlar</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={logout}>
                <span>Çıkış Yap</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
};

export default Topbar;
