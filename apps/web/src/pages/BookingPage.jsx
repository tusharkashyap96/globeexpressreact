import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { toast } from 'sonner';
import { Send, CheckCircle2, MessageCircle } from 'lucide-react';
import pb from '@/lib/pocketbaseClient';
import { useNavigate } from 'react-router-dom';

import Header from '@/components/Header.jsx';
import Footer from '@/components/Footer.jsx';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

const formSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  phone: z.string().min(10, 'Phone number must be at least 10 digits'),
  goodsType: z.string().min(1, 'Please select goods type'),
  pickupLocation: z.string().min(5, 'Please enter a complete pickup address'),
  deliveryLocation: z.string().min(5, 'Please enter a complete delivery address'),
  date: z.string().min(1, 'Please select a date'),
  time: z.string().min(1, 'Please select a time'),
  notes: z.string().optional(),
});

function BookingPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successData, setSuccessData] = useState(null);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
    watch
  } = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      goodsType: '',
      pickupLocation: '',
      deliveryLocation: '',
      date: '',
      time: '',
      notes: ''
    }
  });

  const goodsType = watch('goodsType');

  const formatWhatsAppMessage = (data, bookingId) => {
    const message = `🚚 *New Booking Request - Globe Express Logistics*

📋 *Booking Details:*
• *Booking ID:* ${bookingId}
• *Name:* ${data.name}
• *Email:* ${data.email}
• *Phone:* ${data.phone}
• *Goods Type:* ${data.goodsType}

📍 *Locations:*
• *Pickup:* ${data.pickupLocation}
• *Delivery:* ${data.deliveryLocation}

⏰ *Schedule:*
• *Date:* ${data.date}
• *Time:* ${data.time}

📝 *Notes:* ${data.notes || 'No additional notes'}

---
*Please process this booking request at your earliest convenience.*
📞 *Contact: +919889406999*`;

    return encodeURIComponent(message);
  };

  const sendToWhatsApp = (data, bookingId) => {
    const message = formatWhatsAppMessage(data, bookingId);
    const whatsappUrl = `https://wa.me/919889406999?text=${message}`;
    window.open(whatsappUrl, '_blank');
  };

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    
    try {
      // Generate unique Booking ID
      const timestamp = Date.now().toString().slice(-6);
      const randomStr = Math.random().toString(36).substring(2, 5).toUpperCase();
      const bookingId = `GEL-${timestamp}${randomStr}`;

      const formattedDate = `${data.date} 12:00:00.000Z`;
      
      const submissionData = {
        ...data,
        date: formattedDate,
        bookingId: bookingId,
        status: 'Pending'
      };

      // Since we removed PocketBase, skip the database save
      // await pb.collection('bookings').create(submissionData, { $autoCancel: false });
      
      toast.success('Booking submitted successfully!');
      setSuccessData(submissionData);
      
      // Send to WhatsApp
      sendToWhatsApp(data, bookingId);
      
      reset();
      
    } catch (error) {
      console.error('Booking error:', error);
      toast.error(error.message || 'Failed to submit booking. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>Book Transport Service - Globe Express Logistics</title>
        <meta name="description" content="Book your commercial freight or household goods transport easily with Globe Express Logistics. Fast, reliable, and secure nationwide service." />
      </Helmet>

      <Header />

      <section className="relative py-24 md:py-32 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1565891741441-64926e441838"
            alt="Logistics warehouse operations"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-charcoal/80 backdrop-blur-[2px]" />
        </div>
        
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white mb-6 leading-tight" style={{letterSpacing: '-0.02em'}}>
              Book Your <span className="text-primary">Transport Service</span>
            </h1>
            <p className="text-xl text-white/90 max-w-2xl mx-auto leading-relaxed">
              Scheduling your shipment has never been easier. Fill out the form below with your details, and our team will handle the rest.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-muted/30">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-card rounded-2xl shadow-xl border border-border overflow-hidden"
          >
            <div className="p-8 md:p-12">
              {successData ? (
                <div className="text-center py-12">
                  <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <CheckCircle2 className="w-10 h-10 text-green-600" />
                  </div>
                  <h2 className="text-3xl font-bold mb-2">Booking Confirmed!</h2>
                  <p className="text-muted-foreground text-lg mb-8">
                    Your transport request has been received.
                  </p>
                  
                  <div className="bg-muted rounded-xl p-6 mb-8 max-w-sm mx-auto border border-border">
                    <p className="text-sm text-muted-foreground uppercase tracking-wider font-semibold mb-1">Booking Reference</p>
                    <p className="text-2xl font-bold text-foreground">{successData.bookingId}</p>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Button 
                      onClick={() => navigate('/track-booking')}
                      className="bg-primary text-primary-foreground min-w-[200px]"
                    >
                      Track Shipment
                    </Button>
                    <Button 
                      onClick={() => setSuccessData(null)}
                      variant="outline"
                      className="min-w-[200px]"
                    >
                      Book Another
                    </Button>
                  </div>
                </div>
              ) : (
                <>
                  <div className="mb-8">
                    <h2 className="text-2xl font-bold mb-2">Shipment Details</h2>
                    <p className="text-muted-foreground">Please provide accurate information to help us serve you better.</p>
                  </div>

                  <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="name">Full Name <span className="text-destructive">*</span></Label>
                        <Input
                          id="name"
                          {...register('name')}
                          placeholder="Maya Chen"
                          className="bg-background text-foreground"
                        />
                        {errors.name && <p className="text-sm text-destructive">{errors.name.message}</p>}
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="email">Email Address <span className="text-destructive">*</span></Label>
                        <Input
                          id="email"
                          type="email"
                          {...register('email')}
                          placeholder="maya.chen@example.com"
                          className="bg-background text-foreground"
                        />
                        {errors.email && <p className="text-sm text-destructive">{errors.email.message}</p>}
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="phone">Phone Number <span className="text-destructive">*</span></Label>
                        <Input
                          id="phone"
                          type="tel"
                          {...register('phone')}
                          placeholder="+1 (555) 000-0000"
                          className="bg-background text-foreground"
                        />
                        {errors.phone && <p className="text-sm text-destructive">{errors.phone.message}</p>}
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="goodsType">Goods Type <span className="text-destructive">*</span></Label>
                        <Select
                          value={goodsType}
                          onValueChange={(value) => setValue('goodsType', value)}
                        >
                          <SelectTrigger className="bg-background text-foreground">
                            <SelectValue placeholder="Select type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Commercial">Commercial</SelectItem>
                            <SelectItem value="Household">Household</SelectItem>
                          </SelectContent>
                        </Select>
                        {errors.goodsType && <p className="text-sm text-destructive">{errors.goodsType.message}</p>}
                      </div>

                      <div className="space-y-2 md:col-span-2">
                        <Label htmlFor="pickupLocation">Pickup Location <span className="text-destructive">*</span></Label>
                        <Input
                          id="pickupLocation"
                          {...register('pickupLocation')}
                          placeholder="Full pickup address"
                          className="bg-background text-foreground"
                        />
                        {errors.pickupLocation && <p className="text-sm text-destructive">{errors.pickupLocation.message}</p>}
                      </div>

                      <div className="space-y-2 md:col-span-2">
                        <Label htmlFor="deliveryLocation">Delivery Location <span className="text-destructive">*</span></Label>
                        <Input
                          id="deliveryLocation"
                          {...register('deliveryLocation')}
                          placeholder="Full delivery address"
                          className="bg-background text-foreground"
                        />
                        {errors.deliveryLocation && <p className="text-sm text-destructive">{errors.deliveryLocation.message}</p>}
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="date">Preferred Date <span className="text-destructive">*</span></Label>
                        <Input
                          id="date"
                          type="date"
                          {...register('date')}
                          className="bg-background text-foreground"
                        />
                        {errors.date && <p className="text-sm text-destructive">{errors.date.message}</p>}
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="time">Preferred Time <span className="text-destructive">*</span></Label>
                        <Input
                          id="time"
                          type="time"
                          {...register('time')}
                          className="bg-background text-foreground"
                        />
                        {errors.time && <p className="text-sm text-destructive">{errors.time.message}</p>}
                      </div>

                      <div className="space-y-2 md:col-span-2">
                        <Label htmlFor="notes">Additional Notes</Label>
                        <Textarea
                          id="notes"
                          {...register('notes')}
                          placeholder="Any special instructions..."
                          rows={4}
                          className="bg-background text-foreground resize-none"
                        />
                      </div>
                    </div>

                    <div className="pt-4 border-t border-border">
                      <div className="flex flex-col sm:flex-row gap-4">
                        <Button
                          type="submit"
                          disabled={isSubmitting}
                          size="lg"
                          className="w-full md:w-auto md:min-w-[200px] bg-primary text-primary-foreground hover:bg-primary/90 transition-all duration-200 active:scale-[0.98]"
                        >
                          {isSubmitting ? (
                            <span className="flex items-center gap-2">
                              <span className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                              Processing...
                            </span>
                          ) : (
                            <span className="flex items-center gap-2">
                              <Send className="w-4 h-4" />
                              Submit Booking
                            </span>
                          )}
                        </Button>
                        
                        <Button
                          type="button"
                          onClick={() => {
                            const formData = watch();
                            if (formData.name && formData.email && formData.phone && formData.pickupLocation && formData.deliveryLocation && formData.date && formData.time) {
                              const timestamp = Date.now().toString().slice(-6);
                              const randomStr = Math.random().toString(36).substring(2, 5).toUpperCase();
                              const bookingId = `GEL-${timestamp}${randomStr}`;
                              sendToWhatsApp(formData, bookingId);
                            } else {
                              toast.error('Please fill in all required fields before sending to WhatsApp.');
                            }
                          }}
                          size="lg"
                          variant="outline"
                          className="w-full md:w-auto md:min-w-[200px] border-green-600 text-green-600 hover:bg-green-50 hover:border-green-700 transition-all duration-200 active:scale-[0.98]"
                        >
                          <span className="flex items-center gap-2">
                            <MessageCircle className="w-4 h-4" />
                            Send via WhatsApp
                          </span>
                        </Button>
                      </div>
                    </div>
                  </form>
                </>
              )}
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </>
  );
}

export default BookingPage;