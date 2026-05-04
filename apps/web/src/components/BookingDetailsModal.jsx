import React from 'react';
import { format } from 'date-fns';
import { 
  X, MapPin, Calendar, Clock, Package, Phone, Mail, User, 
  FileText, ShieldAlert, Hash
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

const statusColors = {
  Pending: 'bg-[hsl(var(--status-pending-bg))] text-[hsl(var(--status-pending))] border-[hsl(var(--status-pending))/20]',
  Confirmed: 'bg-[hsl(var(--status-confirmed-bg))] text-[hsl(var(--status-confirmed))] border-[hsl(var(--status-confirmed))/20]',
  'In Transit': 'bg-[hsl(var(--status-transit-bg))] text-[hsl(var(--status-transit))] border-[hsl(var(--status-transit))/20]',
  Delivered: 'bg-[hsl(var(--status-delivered-bg))] text-[hsl(var(--status-delivered))] border-[hsl(var(--status-delivered))/20]',
  Cancelled: 'bg-[hsl(var(--status-cancelled-bg))] text-[hsl(var(--status-cancelled))] border-[hsl(var(--status-cancelled))/20]',
};

export default function BookingDetailsModal({ booking, open, onOpenChange, onUpdateClick }) {
  if (!booking) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader className="border-b border-border pb-4 mb-4">
          <div className="flex items-center justify-between">
            <div>
              <DialogTitle className="text-2xl font-bold flex items-center gap-2">
                Booking Details
              </DialogTitle>
              <p className="text-muted-foreground font-medium mt-1 flex items-center gap-1.5">
                <Hash className="w-4 h-4" /> {booking.bookingId}
              </p>
            </div>
            <Badge className={`px-3 py-1 text-sm border ${statusColors[booking.status] || 'bg-muted text-muted-foreground'}`}>
              {booking.status}
            </Badge>
          </div>
        </DialogHeader>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Customer Info */}
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                <User className="w-5 h-5 text-primary" />
                Customer Information
              </h3>
              <div className="bg-muted/50 rounded-xl p-4 space-y-3">
                <p className="text-sm">
                  <span className="text-muted-foreground block mb-1">Full Name</span>
                  <span className="font-medium">{booking.name}</span>
                </p>
                <p className="text-sm">
                  <span className="text-muted-foreground block mb-1 flex items-center gap-1.5"><Mail className="w-3.5 h-3.5"/> Email</span>
                  <a href={`mailto:${booking.email}`} className="font-medium text-primary hover:underline">{booking.email}</a>
                </p>
                <p className="text-sm">
                  <span className="text-muted-foreground block mb-1 flex items-center gap-1.5"><Phone className="w-3.5 h-3.5"/> Phone</span>
                  <a href={`tel:${booking.phone}`} className="font-medium text-primary hover:underline">{booking.phone}</a>
                </p>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                <Package className="w-5 h-5 text-primary" />
                Shipment Details
              </h3>
              <div className="bg-muted/50 rounded-xl p-4 space-y-3">
                <p className="text-sm">
                  <span className="text-muted-foreground block mb-1">Goods Type</span>
                  <Badge variant="outline" className="bg-background">{booking.goodsType}</Badge>
                </p>
                <div className="grid grid-cols-2 gap-4">
                  <p className="text-sm">
                    <span className="text-muted-foreground block mb-1 flex items-center gap-1.5"><Calendar className="w-3.5 h-3.5"/> Date</span>
                    <span className="font-medium">{format(new Date(booking.date), 'MMM dd, yyyy')}</span>
                  </p>
                  <p className="text-sm">
                    <span className="text-muted-foreground block mb-1 flex items-center gap-1.5"><Clock className="w-3.5 h-3.5"/> Time</span>
                    <span className="font-medium">{booking.time}</span>
                  </p>
                </div>
                {booking.estimatedDelivery && (
                  <p className="text-sm pt-2 border-t border-border/50">
                    <span className="text-muted-foreground block mb-1">Estimated Delivery</span>
                    <span className="font-medium text-[hsl(var(--status-delivered))]">{format(new Date(booking.estimatedDelivery), 'MMM dd, yyyy')}</span>
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Location & Notes */}
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                <MapPin className="w-5 h-5 text-primary" />
                Route
              </h3>
              <div className="bg-muted/50 rounded-xl p-4 relative">
                <div className="absolute left-[23px] top-8 bottom-8 w-0.5 bg-border z-0"></div>
                
                <div className="relative z-10 flex gap-4 mb-6">
                  <div className="w-4 h-4 rounded-full bg-primary mt-1 ring-4 ring-background shrink-0"></div>
                  <div>
                    <span className="text-xs text-muted-foreground uppercase tracking-wider font-semibold">Pickup</span>
                    <p className="font-medium text-sm mt-1">{booking.pickupLocation}</p>
                  </div>
                </div>
                
                <div className="relative z-10 flex gap-4">
                  <div className="w-4 h-4 rounded-full bg-secondary mt-1 ring-4 ring-background shrink-0"></div>
                  <div>
                    <span className="text-xs text-muted-foreground uppercase tracking-wider font-semibold">Delivery</span>
                    <p className="font-medium text-sm mt-1">{booking.deliveryLocation}</p>
                  </div>
                </div>
              </div>
            </div>

            {booking.notes && (
              <div>
                <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                  <FileText className="w-5 h-5 text-primary" />
                  Customer Notes
                </h3>
                <div className="bg-muted/50 rounded-xl p-4 text-sm italic border-l-2 border-primary">
                  {booking.notes}
                </div>
              </div>
            )}

            {booking.adminNotes && (
              <div>
                <h3 className="text-lg font-semibold mb-3 flex items-center gap-2 text-amber-600">
                  <ShieldAlert className="w-5 h-5" />
                  Admin Notes
                </h3>
                <div className="bg-amber-50 dark:bg-amber-950/30 rounded-xl p-4 text-sm border border-amber-200 dark:border-amber-900">
                  {booking.adminNotes}
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-border flex justify-between items-center">
          <p className="text-xs text-muted-foreground">
            Created: {format(new Date(booking.created), 'MMM dd, yyyy HH:mm')}
          </p>
          <div className="flex gap-3">
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              Close
            </Button>
            <Button onClick={onUpdateClick} className="bg-primary text-primary-foreground">
              Update Status
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}