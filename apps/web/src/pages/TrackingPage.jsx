import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { format } from 'date-fns';
import { Search, MapPin, Package, Calendar, Truck, CheckCircle2, Clock } from 'lucide-react';
import pb from '@/lib/pocketbaseClient';
import { toast } from 'sonner';

import Header from '@/components/Header.jsx';
import Footer from '@/components/Footer.jsx';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';

const STAGES = ['Pending', 'Confirmed', 'In Transit', 'Delivered'];

export default function TrackingPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [booking, setBooking] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;

    setIsLoading(true);
    setHasSearched(true);
    setBooking(null);

    try {
      // Use >= and < logic for dates if it was a date field, but here we search by text
      const records = await pb.collection('bookings').getList(1, 1, {
        filter: `bookingId = "${searchQuery.trim()}" || email = "${searchQuery.trim().toLowerCase()}"`,
        $autoCancel: false
      });

      if (records.items.length > 0) {
        setBooking(records.items[0]);
      } else {
        toast.error("No booking found with that ID or email.");
      }
    } catch (error) {
      console.error('Tracking error:', error);
      toast.error('Failed to retrieve tracking information.');
    } finally {
      setIsLoading(false);
    }
  };

  const getCurrentStageIndex = (status) => {
    if (status === 'Cancelled') return -1;
    return STAGES.indexOf(status);
  };

  return (
    <div className="min-h-screen flex flex-col bg-muted/30">
      <Helmet>
        <title>Track Shipment - Globe Express Logistics</title>
        <meta name="description" content="Track your Globe Express Logistics shipment status in real-time." />
      </Helmet>

      <Header />

      <main className="flex-1 py-16 md:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">Track Your Shipment</h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Enter your Booking ID or Email address below to get real-time status updates on your logistics service.
            </p>
          </div>

          <Card className="shadow-lg border-border mb-12">
            <CardContent className="p-6 md:p-8">
              <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <Input
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Enter Booking ID (e.g. GEL-123456) or Email"
                    className="pl-12 h-14 text-lg bg-background"
                  />
                </div>
                <Button 
                  type="submit" 
                  size="lg" 
                  className="h-14 px-8 bg-primary text-primary-foreground hover:bg-primary/90 text-lg"
                  disabled={isLoading}
                >
                  {isLoading ? 'Searching...' : 'Track'}
                </Button>
              </form>
            </CardContent>
          </Card>

          {isLoading && (
            <div className="flex justify-center py-12">
              <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
            </div>
          )}

          {!isLoading && hasSearched && !booking && (
            <motion.div 
              initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
              className="text-center py-12 bg-card rounded-2xl border border-border shadow-sm"
            >
              <Package className="w-16 h-16 text-muted-foreground/30 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Shipment Not Found</h3>
              <p className="text-muted-foreground max-w-md mx-auto">
                We couldn't find a booking matching "{searchQuery}". Please check your tracking details and try again.
              </p>
            </motion.div>
          )}

          {!isLoading && booking && (
            <motion.div 
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
              className="bg-card rounded-2xl shadow-lg border border-border overflow-hidden"
            >
              {/* Header Status Bar */}
              <div className={`p-6 border-b border-border ${booking.status === 'Cancelled' ? 'bg-destructive/10' : 'bg-primary/5'}`}>
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground tracking-wide uppercase mb-1">Booking Reference</p>
                    <h2 className="text-3xl font-bold">{booking.bookingId}</h2>
                  </div>
                  <div className="text-left md:text-right">
                    <p className="text-sm font-medium text-muted-foreground tracking-wide uppercase mb-1">Current Status</p>
                    <span className={`inline-flex items-center px-4 py-1.5 rounded-full text-base font-semibold
                      ${booking.status === 'Cancelled' ? 'bg-destructive/20 text-destructive' : 'bg-primary text-primary-foreground'}
                    `}>
                      {booking.status}
                    </span>
                  </div>
                </div>
              </div>

              <div className="p-6 md:p-8">
                {/* Progress Stepper */}
                {booking.status !== 'Cancelled' && (
                  <div className="mb-12 relative">
                    <div className="absolute top-5 left-8 right-8 h-1 bg-muted rounded-full"></div>
                    <div 
                      className="absolute top-5 left-8 h-1 bg-primary rounded-full transition-all duration-500"
                      style={{ width: `${(Math.max(0, getCurrentStageIndex(booking.status)) / (STAGES.length - 1)) * 100}%` }}
                    ></div>

                    <div className="flex justify-between relative z-10">
                      {STAGES.map((stage, index) => {
                        const isCompleted = getCurrentStageIndex(booking.status) >= index;
                        const isCurrent = booking.status === stage;
                        return (
                          <div key={stage} className="flex flex-col items-center">
                            <div className={`w-10 h-10 rounded-full flex items-center justify-center border-4 transition-colors duration-300
                              ${isCompleted 
                                ? 'bg-primary border-primary text-primary-foreground' 
                                : 'bg-card border-muted text-muted-foreground'}
                              ${isCurrent ? 'ring-4 ring-primary/20' : ''}
                            `}>
                              {isCompleted ? <CheckCircle2 className="w-5 h-5" /> : <div className="w-2.5 h-2.5 rounded-full bg-current opacity-50" />}
                            </div>
                            <span className={`mt-3 text-sm font-medium ${isCompleted ? 'text-foreground' : 'text-muted-foreground'}`}>
                              {stage}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* Details Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-6">
                    <div>
                      <h4 className="text-sm font-medium text-muted-foreground mb-3 uppercase tracking-wider">Route</h4>
                      <div className="relative pl-6 space-y-6 border-l-2 border-border ml-2">
                        <div className="relative">
                          <div className="absolute -left-[31px] top-1 w-4 h-4 rounded-full bg-primary ring-4 ring-card" />
                          <p className="text-sm text-muted-foreground mb-1">Pickup Location</p>
                          <p className="font-semibold text-lg leading-tight">{booking.pickupLocation}</p>
                        </div>
                        <div className="relative">
                          <div className="absolute -left-[31px] top-1 w-4 h-4 rounded-full bg-secondary ring-4 ring-card" />
                          <p className="text-sm text-muted-foreground mb-1">Delivery Location</p>
                          <p className="font-semibold text-lg leading-tight">{booking.deliveryLocation}</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-6 bg-muted/30 p-6 rounded-xl border border-border">
                    <h4 className="text-sm font-medium text-muted-foreground mb-1 uppercase tracking-wider">Shipment Details</h4>
                    
                    <div className="space-y-4">
                      <div className="flex items-start gap-3">
                        <Package className="w-5 h-5 text-muted-foreground shrink-0 mt-0.5" />
                        <div>
                          <p className="text-sm text-muted-foreground">Goods Type</p>
                          <p className="font-medium">{booking.goodsType}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start gap-3">
                        <Calendar className="w-5 h-5 text-muted-foreground shrink-0 mt-0.5" />
                        <div>
                          <p className="text-sm text-muted-foreground">Scheduled Date</p>
                          <p className="font-medium">{format(new Date(booking.date), 'MMMM dd, yyyy')}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start gap-3">
                        <Clock className="w-5 h-5 text-muted-foreground shrink-0 mt-0.5" />
                        <div>
                          <p className="text-sm text-muted-foreground">Preferred Time</p>
                          <p className="font-medium">{booking.time}</p>
                        </div>
                      </div>

                      {booking.estimatedDelivery && (
                        <div className="flex items-start gap-3 pt-4 border-t border-border">
                          <Truck className="w-5 h-5 text-[hsl(var(--status-delivered))] shrink-0 mt-0.5" />
                          <div>
                            <p className="text-sm font-medium text-[hsl(var(--status-delivered))]">Estimated Delivery</p>
                            <p className="font-bold">{format(new Date(booking.estimatedDelivery), 'MMMM dd, yyyy')}</p>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}