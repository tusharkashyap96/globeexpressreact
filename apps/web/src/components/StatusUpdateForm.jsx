import React, { useState } from 'react';
import { toast } from 'sonner';
import { Save } from 'lucide-react';
import pb from '@/lib/pocketbaseClient';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';

export default function StatusUpdateForm({ booking, open, onOpenChange, onSuccess }) {
  const [status, setStatus] = useState(booking?.status || 'Pending');
  const [adminNotes, setAdminNotes] = useState(booking?.adminNotes || '');
  const [estimatedDelivery, setEstimatedDelivery] = useState(
    booking?.estimatedDelivery ? booking.estimatedDelivery.split(' ')[0] : ''
  );
  const [isSubmitting, setIsSubmitting] = useState(false);

  React.useEffect(() => {
    if (booking) {
      setStatus(booking.status);
      setAdminNotes(booking.adminNotes || '');
      setEstimatedDelivery(booking.estimatedDelivery ? booking.estimatedDelivery.split(' ')[0] : '');
    }
  }, [booking]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!booking) return;

    setIsSubmitting(true);
    try {
      const updateData = { 
        status, 
        adminNotes 
      };

      if (estimatedDelivery) {
        updateData.estimatedDelivery = `${estimatedDelivery} 12:00:00.000Z`;
      }

      await pb.collection('bookings').update(booking.id, updateData, { $autoCancel: false });
      
      toast.success('Booking updated successfully');
      onSuccess();
    } catch (error) {
      console.error('Update failed:', error);
      toast.error('Failed to update booking');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!booking) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Update Booking</DialogTitle>
          <DialogDescription>
            Modify status and add internal notes for {booking.bookingId}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6 mt-4">
          <div className="space-y-2">
            <Label htmlFor="status">Current Status</Label>
            <Select value={status} onValueChange={setStatus}>
              <SelectTrigger className="bg-background">
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Pending">Pending</SelectItem>
                <SelectItem value="Confirmed">Confirmed</SelectItem>
                <SelectItem value="In Transit">In Transit</SelectItem>
                <SelectItem value="Delivered">Delivered</SelectItem>
                <SelectItem value="Cancelled">Cancelled</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="estimatedDelivery">Estimated Delivery Date (Optional)</Label>
            <Input
              id="estimatedDelivery"
              type="date"
              value={estimatedDelivery}
              onChange={(e) => setEstimatedDelivery(e.target.value)}
              className="bg-background"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="adminNotes">Internal Admin Notes</Label>
            <Textarea
              id="adminNotes"
              value={adminNotes}
              onChange={(e) => setAdminNotes(e.target.value)}
              placeholder="Add notes visible only to admins..."
              className="bg-background min-h-[100px] resize-none"
            />
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t border-border">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting} className="bg-primary text-primary-foreground">
              {isSubmitting ? 'Saving...' : (
                <>
                  <Save className="w-4 h-4 mr-2" />
                  Save Changes
                </>
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}