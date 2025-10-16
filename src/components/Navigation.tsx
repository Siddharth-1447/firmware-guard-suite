import { Link, useLocation } from 'react-router-dom';
import { Shield, LogOut, User } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';

export const Navigation = () => {
  const { user, signOut } = useAuth();
  const location = useLocation();

  const navLinks = [
    { path: '/dashboard', label: 'Dashboard' },
    { path: '/results', label: 'Results' },
    { path: '/about', label: 'About' },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-card/80 backdrop-blur-lg border-b border-border">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <Link to="/dashboard" className="flex items-center gap-3 group">
            <Shield className="w-8 h-8 text-primary animate-glow-pulse" />
            <span className="text-2xl font-bold bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent">
              CryptoFinder
            </span>
          </Link>

          <div className="flex items-center gap-8">
            {user && (
              <div className="hidden md:flex items-center gap-6">
                {navLinks.map((link) => (
                  <Link
                    key={link.path}
                    to={link.path}
                    className={`text-sm font-medium transition-all duration-300 ${
                      isActive(link.path)
                        ? 'text-primary drop-shadow-[0_0_8px_hsl(var(--primary))]'
                        : 'text-muted-foreground hover:text-primary'
                    }`}
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            )}

            {user && (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className="focus:outline-none">
                    <Avatar className="w-10 h-10 border-2 border-primary cursor-pointer hover:shadow-glow transition-all">
                      <AvatarFallback className="bg-secondary text-primary font-semibold">
                        {user.email?.charAt(0).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48 bg-card border-border">
                  <DropdownMenuItem className="cursor-pointer" disabled>
                    <User className="w-4 h-4 mr-2" />
                    <span className="text-xs truncate">{user.email}</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="cursor-pointer text-destructive" onClick={signOut}>
                    <LogOut className="w-4 h-4 mr-2" />
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};
