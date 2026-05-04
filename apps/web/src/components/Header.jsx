import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, Truck, LogOut, LayoutDashboard, User } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '@/contexts/AuthContext.jsx';
import { Button } from '@/components/ui/button';

const navLinks = [
  { name: 'Home', path: '/' },
  { name: 'About', path: '/about' },
  { name: 'Services', path: '/services' },
  { name: 'Booking', path: '/booking' },
  { name: 'Track', path: '/track-booking' },
  { name: 'Contact', path: '/contact' },
];

function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { isAuthenticated, isAdmin, logout } = useAuth();

  const isActive = (path) => location.pathname === path;

  const handleLogout = () => {
    logout();
    navigate('/');
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border shadow-sm">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center group-hover:scale-105 transition-transform duration-200">
              <Truck className="w-6 h-6 text-primary-foreground" />
            </div>
            <span className="text-xl md:text-2xl font-bold tracking-tight">
              Globe Express <span className="text-primary">Logistics</span>
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-6 lg:gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`relative font-medium text-sm transition-colors duration-200 ${
                  isActive(link.path)
                    ? 'text-primary'
                    : 'text-foreground hover:text-primary'
                }`}
              >
                {link.name}
                {isActive(link.path) && (
                  <motion.div
                    layoutId="activeNav"
                    className="absolute -bottom-[23px] left-0 right-0 h-[2px] bg-primary rounded-t-full"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </Link>
            ))}
            
            <div className="pl-6 border-l border-border flex items-center gap-4">
              {!isAuthenticated ? (
                <Link to="/login" className="text-sm font-medium text-muted-foreground hover:text-primary flex items-center gap-1.5 transition-colors">
                  <User className="w-4 h-4" />
                  Admin Login
                </Link>
              ) : (
                <>
                  {isAdmin && (
                    <Link to="/admin/bookings">
                      <Button variant="outline" size="sm" className="gap-2">
                        <LayoutDashboard className="w-4 h-4" />
                        Dashboard
                      </Button>
                    </Link>
                  )}
                  <Button variant="ghost" size="sm" onClick={handleLogout} className="gap-2 text-muted-foreground hover:text-destructive hover:bg-destructive/10">
                    <LogOut className="w-4 h-4" />
                    Logout
                  </Button>
                </>
              )}
            </div>
          </div>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden w-10 h-10 flex items-center justify-center text-foreground hover:text-primary transition-colors duration-200 bg-muted/50 rounded-lg"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden border-t border-border bg-background shadow-lg"
          >
            <div className="px-4 py-4 space-y-2">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`block px-4 py-3 rounded-lg font-medium transition-all duration-200 ${
                    isActive(link.path)
                      ? 'bg-primary/10 text-primary'
                      : 'text-foreground hover:bg-muted'
                  }`}
                >
                  {link.name}
                </Link>
              ))}
              <div className="pt-4 mt-2 border-t border-border">
                {!isAuthenticated ? (
                  <Link
                    to="/login"
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center gap-2 px-4 py-3 text-muted-foreground hover:text-primary rounded-lg hover:bg-muted transition-colors font-medium"
                  >
                    <User className="w-5 h-5" />
                    Admin Login
                  </Link>
                ) : (
                  <div className="space-y-2">
                    {isAdmin && (
                      <Link
                        to="/admin/bookings"
                        onClick={() => setMobileMenuOpen(false)}
                        className="flex items-center gap-2 px-4 py-3 bg-primary/10 text-primary rounded-lg font-medium"
                      >
                        <LayoutDashboard className="w-5 h-5" />
                        Dashboard
                      </Link>
                    )}
                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center gap-2 px-4 py-3 text-destructive hover:bg-destructive/10 rounded-lg font-medium transition-colors"
                    >
                      <LogOut className="w-5 h-5" />
                      Logout
                    </button>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

export default Header;