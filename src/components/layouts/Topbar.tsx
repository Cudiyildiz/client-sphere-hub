
import React from 'react';
import { Menu, BellIcon, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useAuth } from '@/contexts/AuthContext';

const Topbar: React.FC = () => {
  const { user } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
    
    // Toggle a class on the sidebar for mobile view
    const sidebar = document.querySelector('.sidebar');
    sidebar?.classList.toggle('mobile-open');
  };

  return (
    <header className="flex h-16 items-center border-b bg-card px-4 md:px-6">
      <Button
        variant="ghost"
        size="icon"
        className="mr-2 md:hidden"
        onClick={toggleMobileMenu}
      >
        <Menu className="h-6 w-6" />
        <span className="sr-only">Toggle menu</span>
      </Button>
      
      <div className="flex w-full items-center justify-between">
        <div className="relative w-full max-w-md">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search..."
            className="w-full bg-background pl-8 md:w-[300px] lg:w-[400px]"
          />
        </div>
        
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" className="relative">
            <BellIcon className="h-5 w-5" />
            <span className="absolute right-1 top-1 h-2 w-2 rounded-full bg-accent" />
          </Button>
          
          <div className="flex items-center">
            <div className="hidden md:block mr-3">
              <p className="text-sm font-medium">{user?.name}</p>
              <p className="text-xs text-muted-foreground capitalize">{user?.role} Account</p>
            </div>
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground">
              {user?.name.charAt(0)}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Topbar;
