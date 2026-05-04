import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
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
import { toast } from 'sonner';
import { Send } from 'lucide-react';

const formSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  phone: z.string().min(10, 'Phone number must be at least 10 digits'),
  goodsType: z.string().min(1, 'Please select goods type'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
});

function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  
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
      message: ''
    }
  });

  const goodsType = watch('goodsType');

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    
    try {
      const submissions = JSON.parse(localStorage.getItem('contactSubmissions') || '[]');
      const newSubmission = {
        ...data,
        id: Date.now(),
        timestamp: new Date().toISOString()
      };
      
      submissions.push(newSubmission);
      localStorage.setItem('contactSubmissions', JSON.stringify(submissions));
      
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast.success('Quote request submitted successfully');
      reset();
    } catch (error) {
      toast.error('Failed to submit request. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div>
        <Label htmlFor="name" className="text-foreground">Full name</Label>
        <Input
          id="name"
          {...register('name')}
          placeholder="Enter your full name"
          className="mt-2 text-foreground placeholder:text-muted-foreground"
        />
        {errors.name && (
          <p className="text-sm text-destructive mt-1">{errors.name.message}</p>
        )}
      </div>

      <div>
        <Label htmlFor="email" className="text-foreground">Email address</Label>
        <Input
          id="email"
          type="email"
          {...register('email')}
          placeholder="your.email@example.com"
          className="mt-2 text-foreground placeholder:text-muted-foreground"
        />
        {errors.email && (
          <p className="text-sm text-destructive mt-1">{errors.email.message}</p>
        )}
      </div>

      <div>
        <Label htmlFor="phone" className="text-foreground">Phone number</Label>
        <Input
          id="phone"
          type="tel"
          {...register('phone')}
          placeholder="+91 98765 43210"
          className="mt-2 text-foreground placeholder:text-muted-foreground"
        />
        {errors.phone && (
          <p className="text-sm text-destructive mt-1">{errors.phone.message}</p>
        )}
      </div>

      <div>
        <Label htmlFor="goodsType" className="text-foreground">Goods type</Label>
        <Select
          value={goodsType}
          onValueChange={(value) => setValue('goodsType', value)}
        >
          <SelectTrigger className="mt-2 text-foreground">
            <SelectValue placeholder="Select goods type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="commercial">Commercial</SelectItem>
            <SelectItem value="household">Household</SelectItem>
          </SelectContent>
        </Select>
        {errors.goodsType && (
          <p className="text-sm text-destructive mt-1">{errors.goodsType.message}</p>
        )}
      </div>

      <div>
        <Label htmlFor="message" className="text-foreground">Message</Label>
        <Textarea
          id="message"
          {...register('message')}
          placeholder="Tell us about your transportation needs..."
          rows={5}
          className="mt-2 text-foreground placeholder:text-muted-foreground"
        />
        {errors.message && (
          <p className="text-sm text-destructive mt-1">{errors.message.message}</p>
        )}
      </div>

      <Button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-primary text-primary-foreground hover:bg-primary/90 transition-all duration-200 active:scale-[0.98]"
      >
        {isSubmitting ? (
          <span className="flex items-center gap-2">
            <span className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
            Submitting...
          </span>
        ) : (
          <span className="flex items-center gap-2">
            <Send className="w-4 h-4" />
            Request quote
          </span>
        )}
      </Button>
    </form>
  );
}

export default ContactForm;