'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Calendar, Search, Filter, Download, Eye, Calendar as CalendarIcon } from 'lucide-react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { PageHero } from '@/components/common/HeroSection';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { cn } from '@/lib/utils';

/**
 * G7 Hotels My Bookings Page
 * View and manage guest bookings
 */

interface Booking {
  id: string;
  confirmationNumber: string;
  hotelName: string;
  roomType: string;
  checkIn: Date;
  checkOut: Date;
  status: 'confirmed' | 'pending' | 'completed' | 'cancelled';
  guests: number;
  totalAmount: number;
  currency: string;
}

const mockBookings: Booking[] = [
  {
    id: '1',
    confirmationNumber: 'G7-847392',
    hotelName: 'G7 Hotels Tirupati',
    roomType: 'Presidential Suite',
    checkIn: new Date('2024-03-15'),
    checkOut: new Date('2024-03-18'),
    status: 'confirmed',
    guests: 2,
    totalAmount: 375000,
    currency: 'INR',
  },
  {
    id: '2',
    confirmationNumber: 'G7-748291',
    hotelName: 'G7 Hotels Srikalahasti',
    roomType: 'Royal Suite',
    checkIn: new Date('2024-02-10'),
    checkOut: new Date('2024-02-12'),
    status: 'completed',
    guests: 4,
    totalAmount: 366000,
    currency: 'INR',
  },
  {
    id: '3',
    confirmationNumber: 'G7-639284',
    hotelName: 'G7 Hotels Rayalaseema',
    roomType: 'Deluxe Room',
    checkIn: new Date('2024-04-20'),
    checkOut: new Date('2024-04-22'),
    status: 'pending',
    guests: 2,
    totalAmount: 90000,
    currency: 'INR',
  },
];

export default function BookingsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [bookings, setBookings] = useState<Booking[]>(mockBookings);

  const filteredBookings = bookings.filter((booking) => {
    const matchesSearch =
      booking.hotelName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      booking.confirmationNumber.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || booking.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed':
        return 'bg-green-100 text-green-700 border-green-300';
      case 'pending':
        return 'bg-yellow-100 text-yellow-700 border-yellow-300';
      case 'completed':
        return 'bg-blue-100 text-blue-700 border-blue-300';
      case 'cancelled':
        return 'bg-red-100 text-red-700 border-red-300';
      default:
        return 'bg-gray-100 text-gray-700 border-gray-300';
    }
  };

  const calculateNights = (checkIn: Date, checkOut: Date) => {
    const diffTime = Math.abs(checkOut.getTime() - checkIn.getTime());
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };

  return (
    <div className="min-h-screen flex flex-col bg-g7-ivory">
      <Header />

      {/* Page Hero */}
      <PageHero
        title="My Bookings"
        subtitle="Manage Your Reservations"
        backgroundImage="/images/hero/hero-1.jpg"
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'My Bookings' },
        ]}
      />

      <main className="flex-1 container mx-auto px-4 py-12">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8 gap-4">
          <div>
            <h2 className="font-serif text-3xl text-g7-charcoal mb-2">Your Bookings</h2>
            <p className="text-g7-charcoal/70">
              {filteredBookings.length} {filteredBookings.length === 1 ? 'booking' : 'bookings'} found
            </p>
          </div>

          <Button
            asChild
            variant="outline"
            className="border-g7-gold text-g7-charcoal hover:bg-g7-gold hover:text-g7-charcoal"
          >
            <Link href="/booking">
              <CalendarIcon className="mr-2 h-4 w-4" />
              New Booking
            </Link>
          </Button>
        </div>

        {/* Filters */}
        <Card className="p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-g7-charcoal/40" />
              <Input
                placeholder="Search by hotel name or confirmation number..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 border-g7-gold/50"
              />
            </div>
            <div className="w-full md:w-48">
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="border-g7-gold/50">
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="confirmed">Confirmed</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                  <SelectItem value="cancelled">Cancelled</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </Card>

        {/* Bookings List */}
        {filteredBookings.length === 0 ? (
          <Card className="p-12 text-center">
            <Calendar className="h-16 w-16 mx-auto text-g7-gold/30 mb-4" />
            <h3 className="font-serif text-2xl text-g7-charcoal mb-2">No Bookings Found</h3>
            <p className="text-g7-charcoal/70 mb-6">
              {searchQuery || statusFilter !== 'all'
                ? 'Try adjusting your search or filters'
                : 'You don\'t have any bookings yet'}
            </p>
            {!searchQuery && statusFilter === 'all' && (
              <Button
                asChild
                className="bg-g7-charcoal text-g7-ivory hover:bg-g7-gold hover:text-g7-charcoal"
              >
                <Link href="/booking">Book Your First Stay</Link>
              </Button>
            )}
          </Card>
        ) : (
          <div className="space-y-6">
            {filteredBookings.map((booking) => (
              <motion.div
                key={booking.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <Card className="overflow-hidden hover:shadow-lg transition-all duration-300">
                  <CardContent className="p-6">
                    <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
                      {/* Booking Info */}
                      <div className="flex-1">
                        <div className="flex flex-wrap items-center gap-3 mb-4">
                          <h3 className="font-serif text-2xl text-g7-charcoal">{booking.hotelName}</h3>
                          <Badge className={getStatusColor(booking.status)}>
                            {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                          </Badge>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                          <div>
                            <p className="text-g7-charcoal/60 mb-1">Confirmation Number</p>
                            <p className="font-semibold text-g7-charcoal">{booking.confirmationNumber}</p>
                          </div>
                          <div>
                            <p className="text-g7-charcoal/60 mb-1">Room Type</p>
                            <p className="font-semibold text-g7-charcoal">{booking.roomType}</p>
                          </div>
                          <div>
                            <p className="text-g7-charcoal/60 mb-1">Check-In</p>
                            <p className="font-semibold text-g7-charcoal">
                              {booking.checkIn.toLocaleDateString('en-IN', {
                                weekday: 'short',
                                day: 'numeric',
                                month: 'short',
                                year: 'numeric',
                              })}
                            </p>
                          </div>
                          <div>
                            <p className="text-g7-charcoal/60 mb-1">Check-Out</p>
                            <p className="font-semibold text-g7-charcoal">
                              {booking.checkOut.toLocaleDateString('en-IN', {
                                weekday: 'short',
                                day: 'numeric',
                                month: 'short',
                                year: 'numeric',
                              })}
                            </p>
                          </div>
                          <div>
                            <p className="text-g7-charcoal/60 mb-1">Duration</p>
                            <p className="font-semibold text-g7-charcoal">
                              {calculateNights(booking.checkIn, booking.checkOut)} night(s)
                            </p>
                          </div>
                          <div>
                            <p className="text-g7-charcoal/60 mb-1">Guests</p>
                            <p className="font-semibold text-g7-charcoal">{booking.guests} guest(s)</p>
                          </div>
                        </div>
                      </div>

                      {/* Total & Actions */}
                      <div className="lg:text-right space-y-4">
                        <div>
                          <p className="text-g7-charcoal/60 text-sm mb-1">Total Amount</p>
                          <p className="text-2xl font-serif font-bold text-g7-charcoal">
                            ₹{booking.totalAmount.toLocaleString()}
                          </p>
                        </div>

                        <div className="flex lg:flex-col gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            className="border-g7-gold text-g7-charcoal hover:bg-g7-gold hover:text-g7-charcoal"
                          >
                            <Eye className="mr-2 h-4 w-4" />
                            View Details
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            className="border-g7-charcoal text-g7-charcoal hover:bg-g7-charcoal hover:text-g7-ivory"
                          >
                            <Download className="mr-2 h-4 w-4" />
                            Download
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        )}

        {/* Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
          <Card className="p-6 bg-g7-gold/5 border-g7-gold/20">
            <Calendar className="h-8 w-8 text-g7-gold mb-3" />
            <h4 className="font-semibold text-g7-charcoal mb-2">Manage Booking</h4>
            <p className="text-sm text-g7-charcoal/70">
              View details, make changes, or cancel your reservation online.
            </p>
          </Card>

          <Card className="p-6 bg-g7-gold/5 border-g7-gold/20">
            <Download className="h-8 w-8 text-g7-gold mb-3" />
            <h4 className="font-semibold text-g7-charcoal mb-2">Download Receipt</h4>
            <p className="text-sm text-g7-charcoal/70">
              Get a PDF copy of your booking confirmation for your records.
            </p>
          </Card>

          <Card className="p-6 bg-g7-gold/5 border-g7-gold/20">
            <CalendarIcon className="h-8 w-8 text-g7-gold mb-3" />
            <h4 className="font-semibold text-g7-charcoal mb-2">Need Help?</h4>
            <p className="text-sm text-g7-charcoal/70">
              Contact our 24/7 guest services for any assistance with your booking.
            </p>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  );
}
