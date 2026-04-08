'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, Users, Search, ChevronDown, MapPin, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Calendar as CalendarComponent } from '@/components/ui/calendar';
import { cn, addDays, format } from '@/lib/utils';
import type { BookingFormData } from '@/types';

/**
 * G7 Hotels Booking Widget Component
 * Unified booking engine for rooms, dining, and experiences
 * Features: Date picker, guest selector, promo codes, dynamic pricing
 */

type BookingType = 'rooms' | 'dining' | 'experiences';

export function BookingWidget() {
  const [bookingType, setBookingType] = useState<BookingType>('rooms');
  const [checkIn, setCheckIn] = useState<Date | undefined>(new Date());
  const [checkOut, setCheckOut] = useState<Date | undefined>(addDays(new Date(), 1));
  const [adults, setAdults] = useState(2);
  const [children, setChildren] = useState(0);
  const [rooms, setRooms] = useState(1);
  const [promoCode, setPromoCode] = useState('');
  const [showGuestDropdown, setShowGuestDropdown] = useState(false);

  const handleSearch = () => {
    console.log('Search with:', {
      type: bookingType,
      checkIn,
      checkOut,
      adults,
      children,
      rooms,
      promoCode,
    });
  };

  const bookingTypes = [
    { id: 'rooms', label: 'Rooms', icon: MapPin },
    { id: 'dining', label: 'Dining', icon: Sparkles },
    { id: 'experiences', label: 'Experiences', icon: Search },
  ] as const;

  return (
    <div className="w-full">
      {/* Booking Type Tabs */}
      <div className="flex gap-2 mb-6">
        {bookingTypes.map((type) => (
          <button
            key={type.id}
            onClick={() => setBookingType(type.id as BookingType)}
            className={cn(
              'flex items-center gap-2 px-6 py-3 rounded-sm font-medium transition-all duration-300',
              bookingType === type.id
                ? 'bg-g7-gold text-g7-charcoal'
                : 'bg-transparent text-g7-ivory/70 hover:text-g7-ivory hover:bg-white/5'
            )}
          >
            <type.icon className="h-4 w-4" />
            {type.label}
          </button>
        ))}
      </div>

      {/* Booking Form */}
      <form onSubmit={(e) => { e.preventDefault(); handleSearch(); }} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Check-in Date */}
          <div className="space-y-2">
            <Label className="text-g7-ivory/80 text-sm">Check-in</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    'w-full justify-start text-left bg-white/5 border-g7-gold/30 text-g7-ivory hover:bg-white/10',
                    !checkIn && 'text-g7-ivory/50'
                  )}
                >
                  <Calendar className="mr-2 h-4 w-4" />
                  {checkIn ? format(checkIn, 'MMM dd, yyyy') : 'Select date'}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0 bg-g7-charcoal border-g7-gold/30">
                <CalendarComponent
                  mode="single"
                  selected={checkIn}
                  onSelect={(date) => {
                    setCheckIn(date);
                    if (date && checkOut && date >= checkOut) {
                      setCheckOut(addDays(date, 1));
                    }
                  }}
                  disabled={(date) => date < new Date()}
                  initialFocus
                  className="text-g7-ivory"
                />
              </PopoverContent>
            </Popover>
          </div>

          {/* Check-out Date */}
          <div className="space-y-2">
            <Label className="text-g7-ivory/80 text-sm">Check-out</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    'w-full justify-start text-left bg-white/5 border-g7-gold/30 text-g7-ivory hover:bg-white/10',
                    !checkOut && 'text-g7-ivory/50'
                  )}
                >
                  <Calendar className="mr-2 h-4 w-4" />
                  {checkOut ? format(checkOut, 'MMM dd, yyyy') : 'Select date'}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0 bg-g7-charcoal border-g7-gold/30">
                <CalendarComponent
                  mode="single"
                  selected={checkOut}
                  onSelect={setCheckOut}
                  disabled={(date) => !checkIn || date < checkIn || date < new Date()}
                  initialFocus
                  className="text-g7-ivory"
                />
              </PopoverContent>
            </Popover>
          </div>

          {/* Guests & Rooms */}
          <div className="space-y-2">
            <Label className="text-g7-ivory/80 text-sm">Guests & Rooms</Label>
            <div className="relative">
              <Button
                type="button"
                variant="outline"
                onClick={() => setShowGuestDropdown(!showGuestDropdown)}
                className="w-full justify-start bg-white/5 border-g7-gold/30 text-g7-ivory hover:bg-white/10"
              >
                <Users className="mr-2 h-4 w-4" />
                <span className="flex-1 text-left">
                  {rooms} room{rooms !== 1 ? 's' : ''}, {adults} adult{adults !== 1 ? 's' : ''}
                  {children > 0 && `, ${children} child${children !== 1 ? 'ren' : ''}`}
                </span>
                <ChevronDown
                  className={cn(
                    'h-4 w-4 transition-transform duration-200',
                    showGuestDropdown && 'rotate-180'
                  )}
                />
              </Button>

              <AnimatePresence>
                {showGuestDropdown && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="absolute top-full left-0 right-0 mt-2 p-4 bg-g7-charcoal border border-g7-gold/30 rounded-sm shadow-xl z-50"
                  >
                    <div className="space-y-4">
                      {/* Rooms */}
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium text-g7-ivory">Rooms</p>
                          <p className="text-xs text-g7-ivory/60">Number of rooms</p>
                        </div>
                        <div className="flex items-center gap-3">
                          <button
                            type="button"
                            onClick={() => setRooms(Math.max(1, rooms - 1))}
                            className="w-8 h-8 flex items-center justify-center border border-g7-gold/30 rounded-sm text-g7-ivory hover:bg-g7-gold/20"
                          >
                            -
                          </button>
                          <span className="w-8 text-center font-medium">{rooms}</span>
                          <button
                            type="button"
                            onClick={() => setRooms(Math.min(5, rooms + 1))}
                            className="w-8 h-8 flex items-center justify-center border border-g7-gold/30 rounded-sm text-g7-ivory hover:bg-g7-gold/20"
                          >
                            +
                          </button>
                        </div>
                      </div>

                      {/* Adults */}
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium text-g7-ivory">Adults</p>
                          <p className="text-xs text-g7-ivory/60">Ages 13 or above</p>
                        </div>
                        <div className="flex items-center gap-3">
                          <button
                            type="button"
                            onClick={() => setAdults(Math.max(1, adults - 1))}
                            className="w-8 h-8 flex items-center justify-center border border-g7-gold/30 rounded-sm text-g7-ivory hover:bg-g7-gold/20"
                          >
                            -
                          </button>
                          <span className="w-8 text-center font-medium">{adults}</span>
                          <button
                            type="button"
                            onClick={() => setAdults(Math.min(rooms * 4, adults + 1))}
                            className="w-8 h-8 flex items-center justify-center border border-g7-gold/30 rounded-sm text-g7-ivory hover:bg-g7-gold/20"
                          >
                            +
                          </button>
                        </div>
                      </div>

                      {/* Children */}
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium text-g7-ivory">Children</p>
                          <p className="text-xs text-g7-ivory/60">Ages 0-12</p>
                        </div>
                        <div className="flex items-center gap-3">
                          <button
                            type="button"
                            onClick={() => setChildren(Math.max(0, children - 1))}
                            className="w-8 h-8 flex items-center justify-center border border-g7-gold/30 rounded-sm text-g7-ivory hover:bg-g7-gold/20"
                          >
                            -
                          </button>
                          <span className="w-8 text-center font-medium">{children}</span>
                          <button
                            type="button"
                            onClick={() => setChildren(Math.min(rooms * 2, children + 1))}
                            className="w-8 h-8 flex items-center justify-center border border-g7-gold/30 rounded-sm text-g7-ivory hover:bg-g7-gold/20"
                          >
                            +
                          </button>
                        </div>
                      </div>
                    </div>

                    <Button
                      type="button"
                      onClick={() => setShowGuestDropdown(false)}
                      className="w-full mt-4 bg-g7-gold text-g7-charcoal hover:bg-g7-gold-light"
                    >
                      Done
                    </Button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Promo Code */}
          <div className="space-y-2">
            <Label className="text-g7-ivory/80 text-sm">Promo Code (Optional)</Label>
            <div className="relative">
              <Input
                type="text"
                placeholder="Enter code"
                value={promoCode}
                onChange={(e) => setPromoCode(e.target.value)}
                className="bg-white/5 border-g7-gold/30 text-g7-ivory placeholder:text-g7-ivory/50 pr-20"
              />
              {promoCode && (
                <button
                  type="button"
                  onClick={() => setPromoCode('')}
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-g7-ivory/50 hover:text-g7-gold text-sm"
                >
                  Clear
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Room Type Filter (for rooms booking) */}
        {bookingType === 'rooms' && (
          <div className="space-y-2">
            <Label className="text-g7-ivory/80 text-sm">Room Type</Label>
            <Select>
              <SelectTrigger className="bg-white/5 border-g7-gold/30 text-g7-ivory">
                <SelectValue placeholder="All room types" />
              </SelectTrigger>
              <SelectContent className="bg-g7-charcoal border-g7-gold/30">
                <SelectItem value="all">All Room Types</SelectItem>
                <SelectItem value="standard">Standard Room</SelectItem>
                <SelectItem value="deluxe">Deluxe Room</SelectItem>
                <SelectItem value="suite">Suite</SelectItem>
                <SelectItem value="presidential">Presidential Suite</SelectItem>
                <SelectItem value="royal">Royal Suite</SelectItem>
              </SelectContent>
            </Select>
          </div>
        )}

        {/* Submit Button */}
        <Button
          type="submit"
          className="w-full bg-g7-gold text-g7-charcoal hover:bg-g7-gold-light py-6 text-lg font-medium"
        >
          <Search className="mr-2 h-5 w-5" />
          {bookingType === 'rooms' && 'Search Rooms'}
          {bookingType === 'dining' && 'Find a Table'}
          {bookingType === 'experiences' && 'Discover Experiences'}
        </Button>

        {/* Best Rate Guarantee Badge */}
        <div className="flex items-center justify-center gap-2 text-g7-ivory/60 text-sm">
          <span className="text-g7-gold">✓</span>
          <span>Best Rate Guaranteed • Free Cancellation • No Booking Fees</span>
        </div>
      </form>
    </div>
  );
}

/**
 * Compact Booking Widget for inline use
 */
export function CompactBookingWidget() {
  const [checkIn, setCheckIn] = useState<Date | undefined>(new Date());
  const [checkOut, setCheckOut] = useState<Date | undefined>(addDays(new Date(), 1));
  const [guests, setGuests] = useState(2);

  return (
    <div className="bg-white rounded-lg shadow-2xl p-6 max-w-4xl mx-auto -mt-20 relative z-10">
      <form className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="space-y-2">
          <Label className="text-g7-charcoal text-sm font-medium">Check-in</Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn(
                  'w-full justify-start text-left border-g7-charcoal/20 text-g7-charcoal',
                  !checkIn && 'text-g7-charcoal/50'
                )}
              >
                <Calendar className="mr-2 h-4 w-4" />
                {checkIn ? format(checkIn, 'MMM dd') : 'Select'}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <CalendarComponent
                mode="single"
                selected={checkIn}
                onSelect={(date) => {
                  setCheckIn(date);
                  if (date && checkOut && date >= checkOut) {
                    setCheckOut(addDays(date, 1));
                  }
                }}
                disabled={(date) => date < new Date()}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </div>

        <div className="space-y-2">
          <Label className="text-g7-charcoal text-sm font-medium">Check-out</Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn(
                  'w-full justify-start text-left border-g7-charcoal/20 text-g7-charcoal',
                  !checkOut && 'text-g7-charcoal/50'
                )}
              >
                <Calendar className="mr-2 h-4 w-4" />
                {checkOut ? format(checkOut, 'MMM dd') : 'Select'}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <CalendarComponent
                mode="single"
                selected={checkOut}
                onSelect={setCheckOut}
                disabled={(date) => !checkIn || date < checkIn || date < new Date()}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </div>

        <div className="space-y-2">
          <Label className="text-g7-charcoal text-sm font-medium">Guests</Label>
          <Select value={guests.toString()} onValueChange={(v) => setGuests(parseInt(v))}>
            <SelectTrigger className="border-g7-charcoal/20 text-g7-charcoal">
              <Users className="mr-2 h-4 w-4" />
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {[1, 2, 3, 4, 5, 6].map((num) => (
                <SelectItem key={num} value={num.toString()}>
                  {num} Guest{num > 1 ? 's' : ''}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="flex items-end">
          <Button type="submit" className="w-full bg-g7-charcoal text-g7-ivory hover:bg-g7-gold hover:text-g7-charcoal">
            Search Rooms
          </Button>
        </div>
      </form>
    </div>
  );
}
