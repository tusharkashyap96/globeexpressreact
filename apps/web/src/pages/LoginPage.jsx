import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Lock, LogIn, AlertCircle } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext.jsx';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import Header from '@/components/Header.jsx';
import Footer from '@/components/Footer.jsx';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { login, isAuthenticated, isAdmin } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || (isAdmin ? '/admin/bookings' : '/');

  React.useEffect(() => {
    if (isAuthenticated) {
      navigate(from, { replace: true });
    }
  }, [isAuthenticated, navigate, from]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      setError('Please enter both email and password.');
      return;
    }

    setIsSubmitting(true);
    setError('');

    try {
      await login(email, password);
      // Navigation is handled by the useEffect above when isAuthenticated changes
    } catch (err) {
      console.error('Login failed:', err);
      setError('Invalid email or password. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-muted/30">
      <Helmet>
        <title>Admin Login - Globe Express Logistics</title>
      </Helmet>
      
      <Header />

      <main className="flex-1 flex items-center justify-center p-4 py-20">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md"
        >
          <div className="bg-card rounded-2xl shadow-xl border border-border overflow-hidden">
            <div className="p-8 sm:p-10">
              <div className="flex justify-center mb-6">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
                  <Lock className="w-8 h-8 text-primary" />
                </div>
              </div>
              
              <h1 className="text-2xl font-bold text-center mb-2">Admin Portal</h1>
              <p className="text-muted-foreground text-center mb-8">
                Sign in to access the logistics management dashboard.
              </p>

              {error && (
                <Alert variant="destructive" className="mb-6">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="admin@globeexpresslogistics.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="bg-background"
                    disabled={isSubmitting}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="bg-background"
                    disabled={isSubmitting}
                  />
                </div>

                <Button 
                  type="submit" 
                  className="w-full bg-primary text-primary-foreground hover:bg-primary/90 mt-4"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <span className="flex items-center gap-2">
                      <span className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                      Authenticating...
                    </span>
                  ) : (
                    <span className="flex items-center gap-2">
                      <LogIn className="w-4 h-4" />
                      Sign In
                    </span>
                  )}
                </Button>
              </form>
            </div>
            <div className="bg-muted/50 px-8 py-4 text-center border-t border-border">
              <p className="text-xs text-muted-foreground">
                Secure access for authorized personnel only.
              </p>
            </div>
          </div>
        </motion.div>
      </main>

      <Footer />
    </div>
  );
}