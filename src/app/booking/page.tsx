'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import {
  Calendar,
  Users,
  Search,
  ChevronLeft,
  Check,
  CreditCard,
  Shield,
  Clock,
  Star,
} from 'lucide-react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { PageHero } from '@/components/common/HeroSection';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { cn } from '@/lib/utils';

/**
 * G7 Hotels Booking Page
 * Complete booking flow with room selection, dates, guest details
 */

interface BookingStep {
  id: number;
  title: string;
  description: string;
}

const steps: BookingStep[] = [
  { id: 1, title: 'Search Rooms', description: 'Select your dates and preferences' },
  { id: 2, title: 'Choose Room', description: 'Select your perfect accommodation' },
  { id: 3, title: 'Guest Details', description: 'Provide your information' },
  { id: 4, title: 'Confirm Booking', description: 'Review and complete' },
];

const mockRooms = [
  {
    id: '1',
    name: 'Presidential Suite',
    type: 'presidential',
    description: 'The ultimate in luxury with panoramic city views, private terrace, and dedicated butler service.',
    image: '/images/rooms/luxury-room.jpg',
    basePrice: 125000,
    currency: 'INR',
    size: 2500,
    maxOccupancy: 4,
    amenities: ['Free Wi-Fi', 'Room Service', 'Air Conditioning', 'Smart TV', 'Balcony'],
    beds: ['2 King Beds'],
    rating: 5,
    reviewCount: 124,
  },
  {
    id: '2',
    name: 'Royal Suite',
    type: 'royal',
    description: 'Opulent living space with garden views, private plunge pool, and exclusive amenities.',
    image: '/images/rooms/luxury-room.jpg',
    basePrice: 183000,
    currency: 'INR',
    size: 3500,
    maxOccupancy: 6,
    amenities: ['Free Wi-Fi', 'Room Service', 'Air Conditioning', 'Smart TV', 'Private Pool'],
    beds: ['3 King Beds'],
    rating: 5,
    reviewCount: 89,
  },
  {
    id: '3',
    name: 'Deluxe Room',
    type: 'deluxe',
    description: 'Elegant room with modern amenities and city views.',
    image: '/images/rooms/hero-room.jpg',
    basePrice: 45000,
    currency: 'INR',
    size: 450,
    maxOccupancy: 2,
    amenities: ['Free Wi-Fi', 'Room Service', 'Air Conditioning', 'Smart TV'],
    beds: ['1 King Bed'],
    rating: 4.5,
    reviewCount: 256,
  },
  {
    id: '4',
    name: 'Standard Room',
    type: 'standard',
    description: 'Comfortable accommodation with essential amenities.',
    image: '/images/rooms/hero-room.jpg',
    basePrice: 28000,
    currency: 'INR',
    size: 350,
    maxOccupancy: 2,
    amenities: ['Free Wi-Fi', 'Air Conditioning', 'Smart TV'],
    beds: ['1 Queen Bed'],
    rating: 4.3,
    reviewCount: 312,
  },
];

export default function BookingPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [searchParams, setSearchParams] = useState({
    checkIn: '',
    checkOut: '',
    adults: '2',
    children: '0',
  });
  const [selectedRoom, setSelectedRoom] = useState<any>(null);
  const [guestDetails, setGuestDetails] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    specialRequests: '',
  });

  const calculateNights = () => {
    if (!searchParams.checkIn || !searchParams.checkOut) return 0;
    const start = new Date(searchParams.checkIn);
    const end = new Date(searchParams.checkOut);
    const diffTime = Math.abs(end.getTime() - start.getTime());
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };

  const calculateTotal = () => {
    if (!selectedRoom) return 0;
    const nights = calculateNights();
    return selectedRoom.basePrice * nights;
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchParams.checkIn && searchParams.checkOut) {
      setCurrentStep(2);
    }
  };

  const handleRoomSelect = (room: any) => {
    setSelectedRoom(room);
    setCurrentStep(3);
  };

  const handleGuestSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setCurrentStep(4);
  };

  return (
    <div className="min-h-screen flex flex-col bg-g7-ivory">
      <Header />

      {/* Page Hero */}
      <PageHero
        title="Book Your Stay"
        subtitle="Begin Your Luxury Journey"
        backgroundImage="/images/hero/hero-1.jpg"
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Booking' },
        ]}
      />

      <main className="flex-1 container mx-auto px-4 py-12">
        {/* Progress Steps */}
        <div className="max-w-4xl mx-auto mb-12">
          <div className="flex items-center justify-between">
            {steps.map((step, index) => (
              <React.Fragment key={step.id}>
                <div className="flex flex-col items-center flex-1">
                  <motion.div
                    initial={{ scale: 0.8 }}
                    animate={{ scale: 1 }}
                    className={cn(
                      'w-12 h-12 rounded-full flex items-center justify-center font-semibold transition-all duration-300',
                      currentStep === step.id
                        ? 'bg-g7-gold text-g7-charcol scale-110'
                        : currentStep > step.id
                        ? 'bg-g7-charcoal text-g7-ivory'
                        : 'bg-gray-200 text-gray-500'
                    )}
                  >
                    {currentStep > step.id ? <Check className="h-5 w-5" /> : step.id}
                  </motion.div>
                  <div className="mt-2 text-center">
                    <p className={cn(
                      'text-sm font-medium',
                      currentStep >= step.id ? 'text-g7-charcoal' : 'text-gray-400'
                    )}>
                      {step.title}
                    </p>
                  </div>
                </div>
                {index < steps.length - 1 && (
                  <div className={cn(
                    'flex-1 h-0.5 mx-4',
                    currentStep > step.id ? 'bg-g7-charcoal' : 'bg-gray-200'
                  )} />
                )}
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* Step 1: Search Rooms */}
        {currentStep === 1 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-4xl mx-auto"
          >
            <Card className="p-8 border-g7-gold/30">
              <h2 className="font-serif text-3xl text-g7-charcoal mb-6">Find Your Perfect Room</h2>
              <form onSubmit={handleSearch} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="checkIn">Check-In Date</Label>
                    <Input
                      id="checkIn"
                      type="date"
                      value={searchParams.checkIn}
                      onChange={(e) => setSearchParams({ ...searchParams, checkIn: e.target.value })}
                      className="border-g7-gold/50"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="checkOut">Check-Out Date</Label>
                    <Input
                      id="checkOut"
                      type="date"
                      value={searchParams.checkOut}
                      onChange={(e) => setSearchParams({ ...searchParams, checkOut: e.target.value })}
                      className="border-g7-gold/50"
                      required
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="adults">Adults</Label>
                    <Select value={searchParams.adults} onValueChange={(value) => setSearchParams({ ...searchParams, adults: value })}>
                      <SelectTrigger className="border-g7-gold/50">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {[1, 2, 3, 4, 5, 6].map((num) => (
                          <SelectItem key={num} value={num.toString()}>
                            {num} {num === 1 ? 'Adult' : 'Adults'}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="children">Children</Label>
                    <Select value={searchParams.children} onValueChange={(value) => setSearchParams({ ...searchParams, children: value })}>
                      <SelectTrigger className="border-g7-gold/50">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {[0, 1, 2, 3, 4].map((num) => (
                          <SelectItem key={num} value={num.toString()}>
                            {num} {num === 1 ? 'Child' : 'Children'}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <Button
                  type="submit"
                  size="lg"
                  className="w-full bg-g7-charcoal text-g7-ivory hover:bg-g7-gold hover:text-g7-charcoal"
                >
                  <Search className="mr-2 h-5 w-5" />
                  Search Available Rooms
                </Button>
              </form>
            </Card>
          </motion.div>
        )}

        {/* Step 2: Select Room */}
        {currentStep === 2 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-6xl mx-auto"
          >
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="font-serif text-3xl text-g7-charcoal mb-2">Available Rooms</h2>
                <p className="text-g7-charcoal/70">
                  {calculateNights()} night(s) • {searchParams.adults} adult(s)
                </p>
              </div>
              <Button
                variant="outline"
                onClick={() => setCurrentStep(1)}
                className="border-g7-charcoal text-g7-charcoal hover:bg-g7-charcoal hover:text-g7-ivory"
              >
                <ChevronLeft className="mr-2 h-4 w-4" />
                Modify Search
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {mockRooms.map((room) => (
                <Card key={room.id} className="overflow-hidden hover:shadow-2xl transition-all duration-500">
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <img
                      src={room.image}
                      alt={room.name}
                      className="w-full h-full object-cover"
                    />
                    <Badge className="absolute top-4 left-4 bg-g7-gold text-g7-charcoal">
                      {room.type}
                    </Badge>
                  </div>
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-3">
                      <h3 className="font-serif text-2xl text-g7-charcoal">{room.name}</h3>
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 fill-g7-gold text-g7-gold" />
                        <span className="text-sm">{room.rating}</span>
                      </div>
                    </div>
                    <p className="text-g7-charcoal/70 text-sm mb-4">{room.description}</p>
                    <div className="space-y-2 mb-4">
                      <p className="text-sm text-g7-charcoal/80">
                        <strong>Size:</strong> {room.size} sq ft
                      </p>
                      <p className="text-sm text-g7-charcoal/80">
                        <strong>Beds:</strong> {room.beds.join(', ')}
                      </p>
                      <p className="text-sm text-g7-charcoal/80">
                        <strong>Max Occupancy:</strong> {room.maxOccupancy} guests
                      </p>
                    </div>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {room.amenities.slice(0, 4).map((amenity, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {amenity}
                        </Badge>
                      ))}
                    </div>
                    <div className="flex items-center justify-between pt-4 border-t">
                      <div>
                        <span className="text-2xl font-serif text-g7-charcoal">
                          ₹{room.basePrice.toLocaleString()}
                        </span>
                        <span className="text-g7-charcoal/60 text-sm"> /night</span>
                      </div>
                      <Button
                        onClick={() => handleRoomSelect(room)}
                        className="bg-g7-charcoal text-g7-ivory hover:bg-g7-gold hover:text-g7-charcoal"
                      >
                        Select Room
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </motion.div>
        )}

        {/* Step 3: Guest Details */}
        {currentStep === 3 && selectedRoom && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-4xl mx-auto"
          >
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Guest Form */}
              <div className="lg:col-span-2">
                <Card className="p-8">
                  <h2 className="font-serif text-3xl text-g7-charcoal mb-6">Guest Information</h2>
                  <form onSubmit={handleGuestSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="firstName">First Name</Label>
                        <Input
                          id="firstName"
                          value={guestDetails.firstName}
                          onChange={(e) => setGuestDetails({ ...guestDetails, firstName: e.target.value })}
                          className="border-g7-gold/50"
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="lastName">Last Name</Label>
                        <Input
                          id="lastName"
                          value={guestDetails.lastName}
                          onChange={(e) => setGuestDetails({ ...guestDetails, lastName: e.target.value })}
                          className="border-g7-gold/50"
                          required
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address</Label>
                      <Input
                        id="email"
                        type="email"
                        value={guestDetails.email}
                        onChange={(e) => setGuestDetails({ ...guestDetails, email: e.target.value })}
                        className="border-g7-gold/50"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input
                        id="phone"
                        type="tel"
                        value={guestDetails.phone}
                        onChange={(e) => setGuestDetails({ ...guestDetails, phone: e.target.value })}
                        className="border-g7-gold/50"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="specialRequests">Special Requests (Optional)</Label>
                      <textarea
                        id="specialRequests"
                        value={guestDetails.specialRequests}
                        onChange={(e) => setGuestDetails({ ...guestDetails, specialRequests: e.target.value })}
                        className="w-full min-h-[100px] px-3 py-2 border border-g7-gold/50 rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-g7-gold/50"
                        placeholder="Any special requests or requirements..."
                      />
                    </div>
                    <div className="flex gap-4">
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => setCurrentStep(2)}
                        className="border-g7-charcoal text-g7-charcoal hover:bg-g7-charcoal hover:text-g7-ivory"
                      >
                        <ChevronLeft className="mr-2 h-4 w-4" />
                        Back
                      </Button>
                      <Button
                        type="submit"
                        className="flex-1 bg-g7-charcoal text-g7-ivory hover:bg-g7-gold hover:text-g7-charcoal"
                      >
                        Continue to Payment
                      </Button>
                    </div>
                  </form>
                </Card>
              </div>

              {/* Booking Summary */}
              <div>
                <Card className="p-6 sticky top-24">
                  <h3 className="font-serif text-xl text-g7-charcoal mb-4">Booking Summary</h3>
                  <div className="space-y-4">
                    <div>
                      <img
                        src={selectedRoom.image}
                        alt={selectedRoom.name}
                        className="w-full h-32 object-cover rounded-lg mb-2"
                      />
                      <h4 className="font-semibold text-g7-charcoal">{selectedRoom.name}</h4>
                      <p className="text-sm text-g7-charcoal/70">{selectedRoom.type}</p>
                    </div>
                    <div className="pt-4 border-t space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-g7-charcoal/70">Check-In</span>
                        <span className="text-g7-charcoal">
                          {new Date(searchParams.checkIn).toLocaleDateString('en-IN', {
                            day: 'numeric',
                            month: 'short',
                            year: 'numeric',
                          })}
                        </span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-g7-charcoal/70">Check-Out</span>
                        <span className="text-g7-charcoal">
                          {new Date(searchParams.checkOut).toLocaleDateString('en-IN', {
                            day: 'numeric',
                            month: 'short',
                            year: 'numeric',
                          })}
                        </span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-g7-charcoal/70">Duration</span>
                        <span className="text-g7-charcoal">{calculateNights()} night(s)</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-g7-charcoal/70">Guests</span>
                        <span className="text-g7-charcoal">{searchParams.adults} adult(s)</span>
                      </div>
                    </div>
                    <div className="pt-4 border-t space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-g7-charcoal/70">Room Rate</span>
                        <span className="text-g7-charcoal">
                          ₹{selectedRoom.basePrice.toLocaleString()} x {calculateNights()} night(s)
                        </span>
                      </div>
                    </div>
                    <div className="pt-4 border-t">
                      <div className="flex justify-between">
                        <span className="font-semibold text-g7-charcoal">Total</span>
                        <span className="font-bold text-2xl text-g7-charcoal">
                          ₹{calculateTotal().toLocaleString()}
                        </span>
                      </div>
                      <p className="text-xs text-g7-charcoal/60 mt-2">
                        + Taxes and fees will be added at checkout
                      </p>
                    </div>
                  </div>
                </Card>
              </div>
            </div>
          </motion.div>
        )}

        {/* Step 4: Confirm Booking */}
        {currentStep === 4 && selectedRoom && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-4xl mx-auto"
          >
            <Card className="p-8">
              <div className="text-center mb-8">
                <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-green-100 flex items-center justify-center">
                  <Check className="h-10 w-10 text-green-600" />
                </div>
                <h2 className="font-serif text-3xl text-g7-charcoal mb-2">Booking Confirmed!</h2>
                <p className="text-g7-charcoal/70">
                  Your reservation has been successfully confirmed. A confirmation email has been sent to{' '}
                  {guestDetails.email}.
                </p>
              </div>

              <div className="space-y-6 mb-8">
                <div className="p-6 bg-g7-gold/10 rounded-lg">
                  <h3 className="font-semibold text-g7-charcoal mb-4">Booking Details</h3>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-g7-charcoal/60">Confirmation Number</p>
                      <p className="font-semibold text-g7-charcoal">G7-{Date.now().toString().slice(-6)}</p>
                    </div>
                    <div>
                      <p className="text-g7-charcoal/60">Guest Name</p>
                      <p className="font-semibold text-g7-charcoal">
                        {guestDetails.firstName} {guestDetails.lastName}
                      </p>
                    </div>
                    <div>
                      <p className="text-g7-charcoal/60">Room Type</p>
                      <p className="font-semibold text-g7-charcoal">{selectedRoom.name}</p>
                    </div>
                    <div>
                      <p className="text-g7-charcoal/60">Total Amount</p>
                      <p className="font-semibold text-g7-charcoal">
                        ₹{calculateTotal().toLocaleString()}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="p-6 bg-gray-50 rounded-lg">
                    <h4 className="font-semibold text-g7-charcoal mb-4 flex items-center gap-2">
                      <Calendar className="h-5 w-5 text-g7-gold" />
                      Check-In Information
                    </h4>
                    <p className="text-g7-charcoal/70 text-sm mb-2">Time: 3:00 PM</p>
                    <p className="text-g7-charcoal/70 text-sm">
                      Please bring a valid government-issued ID and credit card for verification.
                    </p>
                  </div>
                  <div className="p-6 bg-gray-50 rounded-lg">
                    <h4 className="font-semibold text-g7-charcoal mb-4 flex items-center gap-2">
                      <Clock className="h-5 w-5 text-g7-gold" />
                      Check-Out Information
                    </h4>
                    <p className="text-g7-charcoal/70 text-sm mb-2">Time: 11:00 AM</p>
                    <p className="text-g7-charcoal/70 text-sm">
                      Late check-out available upon request subject to availability.
                    </p>
                  </div>
                </div>

                <div className="p-6 bg-g7-charcoal/5 rounded-lg">
                  <h4 className="font-semibold text-g7-charcoal mb-4 flex items-center gap-2">
                    <Shield className="h-5 w-5 text-g7-gold" />
                    Payment & Cancellation Policy
                  </h4>
                  <ul className="space-y-2 text-sm text-g7-charcoal/70">
                    <li>• Free cancellation up to 48 hours before check-in</li>
                    <li>• Full payment required at check-in</li>
                    <li>• All major credit cards accepted</li>
                    <li>• Taxes and fees are additional</li>
                  </ul>
                </div>
              </div>

              <div className="flex gap-4">
                <Button
                  asChild
                  className="flex-1 bg-g7-charcoal text-g7-ivory hover:bg-g7-gold hover:text-g7-charcoal"
                >
                  <Link href="/">Return to Home</Link>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  className="border-g7-charcoal text-g7-charcoal hover:bg-g7-charcoal hover:text-g7-ivory"
                >
                  <Link href="/bookings">View My Bookings</Link>
                </Button>
              </div>
            </Card>
          </motion.div>
        )}
      </main>

      <Footer />
    </div>
  );
}
