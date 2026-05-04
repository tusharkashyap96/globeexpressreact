import React, { useState, useEffect, useCallback } from 'react';
import { Helmet } from 'react-helmet';
import { format } from 'date-fns';
import { Search, Filter, RefreshCw, Eye, Edit, Trash2, PackageSearch, Activity, Inbox } from 'lucide-react';
import pb from '@/lib/pocketbaseClient';
import { toast } from 'sonner';

import Header from '@/components/Header.jsx';
import Footer from '@/components/Footer.jsx';
import BookingDetailsModal from '@/components/BookingDetailsModal.jsx';
import StatusUpdateForm from '@/components/StatusUpdateForm.jsx';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Card, CardContent } from '@/components/ui/card';

const statusColors = {
  Pending: 'bg-[hsl(var(--status-pending-bg))] text-[hsl(var(--status-pending))] border-[hsl(var(--status-pending))/20]',
  Confirmed: 'bg-[hsl(var(--status-confirmed-bg))] text-[hsl(var(--status-confirmed))] border-[hsl(var(--status-confirmed))/20]',
  'In Transit': 'bg-[hsl(var(--status-transit-bg))] text-[hsl(var(--status-transit))] border-[hsl(var(--status-transit))/20]',
  Delivered: 'bg-[hsl(var(--status-delivered-bg))] text-[hsl(var(--status-delivered))] border-[hsl(var(--status-delivered))/20]',
  Cancelled: 'bg-[hsl(var(--status-cancelled-bg))] text-[hsl(var(--status-cancelled))] border-[hsl(var(--status-cancelled))/20]',
};

export default function AdminBookingsPage() {
  const [bookings, setBookings] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [typeFilter, setTypeFilter] = useState('All');
  const [stats, setStats] = useState({ total: 0, pending: 0, confirmed: 0, transit: 0, delivered: 0, cancelled: 0 });
  
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [detailsModalOpen, setDetailsModalOpen] = useState(false);
  const [updateModalOpen, setUpdateModalOpen] = useState(false);

  const fetchBookings = useCallback(async () => {
    setIsLoading(true);
    try {
      let filterString = [];
      
      if (searchTerm) {
        filterString.push(`(name ~ "${searchTerm}" || email ~ "${searchTerm}" || bookingId ~ "${searchTerm}")`);
      }
      if (statusFilter !== 'All') {
        filterString.push(`status = "${statusFilter}"`);
      }
      if (typeFilter !== 'All') {
        filterString.push(`goodsType = "${typeFilter}"`);
      }

      const records = await pb.collection('bookings').getFullList({
        sort: '-created',
        filter: filterString.join(' && '),
        $autoCancel: false
      });

      setBookings(records);

      // Only calculate totals if no filters applied to keep stats consistent, or calculate based on all records
      if (searchTerm === '' && statusFilter === 'All' && typeFilter === 'All') {
        const counts = { total: records.length, pending: 0, confirmed: 0, transit: 0, delivered: 0, cancelled: 0 };
        records.forEach(r => {
          if (r.status === 'Pending') counts.pending++;
          if (r.status === 'Confirmed') counts.confirmed++;
          if (r.status === 'In Transit') counts.transit++;
          if (r.status === 'Delivered') counts.delivered++;
          if (r.status === 'Cancelled') counts.cancelled++;
        });
        setStats(counts);
      }
    } catch (error) {
      console.error('Failed to fetch bookings:', error);
      toast.error('Failed to load bookings database.');
    } finally {
      setIsLoading(false);
    }
  }, [searchTerm, statusFilter, typeFilter]);

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      fetchBookings();
    }, 300);
    return () => clearTimeout(delayDebounceFn);
  }, [fetchBookings]);

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this booking? This action cannot be undone.')) return;
    
    try {
      await pb.collection('bookings').delete(id, { $autoCancel: false });
      toast.success('Booking deleted successfully');
      fetchBookings();
    } catch (error) {
      console.error('Failed to delete:', error);
      toast.error('Failed to delete booking');
    }
  };

  const handleView = (booking) => {
    setSelectedBooking(booking);
    setDetailsModalOpen(true);
  };

  const handleUpdate = (booking) => {
    setSelectedBooking(booking);
    setUpdateModalOpen(true);
    setDetailsModalOpen(false);
  };

  const StatCard = ({ title, value, colorClass }) => (
    <Card>
      <CardContent className="p-6">
        <div className="flex flex-col gap-1">
          <span className="text-sm font-medium text-muted-foreground">{title}</span>
          <span className={`text-3xl font-bold ${colorClass}`}>{value}</span>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="min-h-screen bg-muted/20 flex flex-col">
      <Helmet>
        <title>Dashboard - Globe Express Logistics</title>
      </Helmet>
      
      <Header />

      <main className="flex-1 max-w-[1400px] w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Booking Management</h1>
            <p className="text-muted-foreground mt-1">Monitor and manage all transport logistics requests.</p>
          </div>
          <Button onClick={fetchBookings} variant="outline" className="gap-2">
            <RefreshCw className="w-4 h-4" />
            Refresh Data
          </Button>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
          <StatCard title="Total" value={stats.total} colorClass="text-foreground" />
          <StatCard title="Pending" value={stats.pending} colorClass="text-[hsl(var(--status-pending))]" />
          <StatCard title="Confirmed" value={stats.confirmed} colorClass="text-[hsl(var(--status-confirmed))]" />
          <StatCard title="In Transit" value={stats.transit} colorClass="text-[hsl(var(--status-transit))]" />
          <StatCard title="Delivered" value={stats.delivered} colorClass="text-[hsl(var(--status-delivered))]" />
          <StatCard title="Cancelled" value={stats.cancelled} colorClass="text-destructive" />
        </div>

        {/* Filters and Table Container */}
        <Card className="border-border shadow-sm overflow-hidden">
          <div className="p-4 border-b border-border bg-card flex flex-col lg:flex-row gap-4 items-center justify-between">
            <div className="relative w-full lg:w-96">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input 
                placeholder="Search by ID, name or email..." 
                className="pl-9 bg-background"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <div className="flex flex-wrap items-center gap-3 w-full lg:w-auto">
              <div className="flex items-center gap-2">
                <Filter className="w-4 h-4 text-muted-foreground" />
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-[140px] bg-background">
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="All">All Statuses</SelectItem>
                    <SelectItem value="Pending">Pending</SelectItem>
                    <SelectItem value="Confirmed">Confirmed</SelectItem>
                    <SelectItem value="In Transit">In Transit</SelectItem>
                    <SelectItem value="Delivered">Delivered</SelectItem>
                    <SelectItem value="Cancelled">Cancelled</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Select value={typeFilter} onValueChange={setTypeFilter}>
                <SelectTrigger className="w-[140px] bg-background">
                  <SelectValue placeholder="Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="All">All Types</SelectItem>
                  <SelectItem value="Commercial">Commercial</SelectItem>
                  <SelectItem value="Household">Household</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="overflow-x-auto">
            <Table>
              <TableHeader className="bg-muted/50">
                <TableRow>
                  <TableHead className="font-semibold whitespace-nowrap">Booking ID</TableHead>
                  <TableHead className="font-semibold">Customer</TableHead>
                  <TableHead className="font-semibold">Type</TableHead>
                  <TableHead className="font-semibold">Date</TableHead>
                  <TableHead className="font-semibold max-w-[200px]">Route</TableHead>
                  <TableHead className="font-semibold">Status</TableHead>
                  <TableHead className="font-semibold text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {isLoading ? (
                  Array.from({ length: 5 }).map((_, i) => (
                    <TableRow key={i}>
                      <TableCell><Skeleton className="h-5 w-24" /></TableCell>
                      <TableCell><Skeleton className="h-5 w-32" /><Skeleton className="h-4 w-40 mt-1" /></TableCell>
                      <TableCell><Skeleton className="h-6 w-20 rounded-full" /></TableCell>
                      <TableCell><Skeleton className="h-5 w-24" /></TableCell>
                      <TableCell><Skeleton className="h-5 w-full" /></TableCell>
                      <TableCell><Skeleton className="h-6 w-24 rounded-full" /></TableCell>
                      <TableCell><Skeleton className="h-8 w-24 ml-auto" /></TableCell>
                    </TableRow>
                  ))
                ) : bookings.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={7} className="h-[400px] text-center">
                      <div className="flex flex-col items-center justify-center text-muted-foreground space-y-3">
                        <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center">
                          <Inbox className="w-8 h-8 opacity-50" />
                        </div>
                        <p className="text-lg font-medium text-foreground">No bookings found</p>
                        <p>Try adjusting your search or filters.</p>
                      </div>
                    </TableCell>
                  </TableRow>
                ) : (
                  bookings.map((booking) => (
                    <TableRow key={booking.id} className="hover:bg-muted/50 transition-colors">
                      <TableCell className="font-medium">
                        {booking.bookingId}
                      </TableCell>
                      <TableCell>
                        <div className="font-medium text-foreground">{booking.name}</div>
                        <div className="text-sm text-muted-foreground">{booking.email}</div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline" className="bg-background font-normal">
                          {booking.goodsType}
                        </Badge>
                      </TableCell>
                      <TableCell className="whitespace-nowrap">
                        <div>{format(new Date(booking.date), 'MMM dd, yyyy')}</div>
                        <div className="text-sm text-muted-foreground">{booking.time}</div>
                      </TableCell>
                      <TableCell className="max-w-[200px] truncate">
                        <div className="flex items-center gap-1.5 text-sm truncate" title={booking.pickupLocation}>
                          <span className="w-2 h-2 rounded-full bg-primary shrink-0" />
                          <span className="truncate">{booking.pickupLocation.split(',')[0]}</span>
                        </div>
                        <div className="flex items-center gap-1.5 text-sm mt-1 truncate" title={booking.deliveryLocation}>
                          <span className="w-2 h-2 rounded-full bg-secondary shrink-0" />
                          <span className="truncate">{booking.deliveryLocation.split(',')[0]}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge className={`border px-2.5 py-0.5 whitespace-nowrap ${statusColors[booking.status] || 'bg-muted'}`}>
                          {booking.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button variant="ghost" size="icon" onClick={() => handleView(booking)} title="View Details">
                            <Eye className="w-4 h-4 text-muted-foreground" />
                          </Button>
                          <Button variant="ghost" size="icon" onClick={() => handleUpdate(booking)} title="Update Status">
                            <Edit className="w-4 h-4 text-primary" />
                          </Button>
                          <Button variant="ghost" size="icon" onClick={() => handleDelete(booking.id)} title="Delete Booking" className="hover:text-destructive">
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </Card>
      </main>

      <Footer />

      <BookingDetailsModal 
        booking={selectedBooking} 
        open={detailsModalOpen} 
        onOpenChange={setDetailsModalOpen}
        onUpdateClick={() => handleUpdate(selectedBooking)}
      />

      <StatusUpdateForm 
        booking={selectedBooking} 
        open={updateModalOpen} 
        onOpenChange={setUpdateModalOpen}
        onSuccess={() => {
          setUpdateModalOpen(false);
          fetchBookings();
        }}
      />
    </div>
  );
}