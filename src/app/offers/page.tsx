'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import {
  Tag,
  Calendar,
  Percent,
  Rupee,
  Clock,
  Check,
  ArrowRight,
} from 'lucide-react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { PageHero } from '@/components/common/HeroSection';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { cn, format } from '@/lib/utils';

/**
 * G7 Hotels Offers Page
 * Promotional packages and deals
 */

interface Offer {
  id: string;
  name: string;
  description: string;
  shortDescription: string;
  type: string;
  images: string[];
  startDate: Date;
  endDate: Date;
  discount: {
    type: 'percentage' | 'fixed';
    value: number;
  };
  minStay?: number;
  maxDiscount?: number;
  terms: string[];
  promoCode?: string;
  featured: boolean;
  active: boolean;
}

const mockOffers: Offer[] = [
  {
    id: '1',
    name: 'Summer Escape',
    description: 'Experience the perfect summer getaway with our exclusive package. Enjoy extended stays, complimentary breakfast, and a ₹8,300 spa credit. Perfect for families and couples looking to make the most of the season.',
    shortDescription: 'Stay 3 nights, pay for 2. Includes daily breakfast and spa credit.',
    type: 'stay-pay',
    images: ['/images/hero/hero-1.jpg'],
    startDate: new Date('2024-06-01'),
    endDate: new Date('2024-08-31'),
    discount: {
      type: 'percentage',
      value: 33,
    },
    minStay: 3,
    terms: [
      'Minimum 3-night stay required',
      'Valid for new bookings only',
      'Cannot be combined with other offers',
      'Subject to availability',
    ],
    promoCode: 'SUMMER33',
    featured: true,
    active: true,
  },
  {
    id: '2',
    name: 'Romantic Getaway',
    description: 'Celebrate love with our romantic package. Upon arrival, enjoy a bottle of chilled champagne, rose petal turndown service, and a complimentary couples spa treatment. Create unforgettable memories with your special someone.',
    shortDescription: 'Champagne on arrival, rose petal turndown, and couples spa treatment.',
    type: 'package',
    images: ['/images/rooms/luxury-room.jpg'],
    startDate: new Date('2024-01-01'),
    endDate: new Date('2024-12-31'),
    discount: {
      type: 'fixed',
      value: 16600,
    },
    terms: [
      'Valid for suite bookings only',
      'Advance booking required',
      'Romantic dinner reservations recommended',
      'Spa treatment subject to availability',
    ],
    promoCode: 'ROMANCE200',
    featured: true,
    active: true,
  },
  {
    id: '3',
    name: 'Early Bird Special',
    description: 'Plan ahead and save! Book at least 30 days in advance and enjoy 20% off your room rate. Perfect for business travelers and planners who like to organize their trips well in advance.',
    shortDescription: 'Book 30 days in advance and save 20% on room rates.',
    type: 'early-bird',
    images: ['/images/dining/fine-dining.jpg'],
    startDate: new Date('2024-01-01'),
    endDate: new Date('2024-12-31'),
    discount: {
      type: 'percentage',
      value: 20,
    },
    minStay: 2,
    terms: [
      'Book 30+ days in advance',
      'Non-refundable booking',
      'Full payment required at booking',
      'No modifications allowed',
    ],
    promoCode: 'EARLY20',
    featured: false,
    active: true,
  },
  {
    id: '4',
    name: 'Spa & Wellness Retreat',
    description: 'Rejuvenate your mind and body with our wellness package. Includes a 60-minute massage, full access to spa facilities, and healthy breakfast daily. Return home refreshed and renewed.',
    shortDescription: '60-minute massage, spa access, and healthy breakfast included.',
    type: 'spa',
    images: ['/images/spa/spa-treatment.jpg'],
    startDate: new Date('2024-01-01'),
    endDate: new Date('2024-12-31'),
    discount: {
      type: 'fixed',
      value: 150,
    },
    terms: [
      'Minimum 2-night stay',
      'Spa treatment must be booked in advance',
      'Valid Sunday-Thursday',
      'Based on double occupancy',
    ],
    promoCode: 'WELLNESS150',
    featured: false,
    active: true,
  },
];

export default function OffersPage() {
  const [offers, setOffers] = useState<Offer[]>([]);
  const [loading, setLoading] = useState(true);
  const [filterType, setFilterType] = useState('all');
  const [sortBy, setSortBy] = useState('featured');

  useEffect(() => {
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      let filtered = [...mockOffers];
      
      if (filterType !== 'all') {
        filtered = filtered.filter(offer => offer.type === filterType);
      }
      
      // Sort
      if (sortBy === 'featured') {
        filtered.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
      } else if (sortBy === 'discount') {
        filtered.sort((a, b) => b.discount.value - a.discount.value);
      } else if (sortBy === 'ending') {
        filtered.sort((a, b) => a.endDate.getTime() - b.endDate.getTime());
      }
      
      setOffers(filtered);
      setLoading(false);
    }, 500);
  }, [filterType, sortBy]);

  return (
    <div className="min-h-screen flex flex-col bg-g7-ivory">
      <Header />

      {/* Page Hero */}
      <PageHero
        title="Special Offers & Packages"
        subtitle="Exclusive Deals for Your Perfect Stay"
        backgroundImage="/images/hero/hero-1.jpg"
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Offers' },
        ]}
      />

      <main className="flex-1 container mx-auto px-4 py-12">
        {/* Filters */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
          <div>
            <h2 className="font-serif text-2xl text-g7-charcoal mb-2">
              Available Offers
            </h2>
            <p className="text-g7-charcoal/60">
              {offers.length} {offers.length === 1 ? 'offer' : 'offers'} available
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Select value={filterType} onValueChange={setFilterType}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="All Offers" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Offers</SelectItem>
                <SelectItem value="stay-pay">Stay & Pay</SelectItem>
                <SelectItem value="package">Packages</SelectItem>
                <SelectItem value="early-bird">Early Bird</SelectItem>
                <SelectItem value="spa">Spa & Wellness</SelectItem>
                <SelectItem value="dining">Dining</SelectItem>
              </SelectContent>
            </Select>

            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="featured">Featured</SelectItem>
                <SelectItem value="discount">Best Discount</SelectItem>
                <SelectItem value="ending">Ending Soon</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Loading State */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[...Array(4)].map((_, i) => (
              <div
                key={i}
                className="bg-white rounded-lg h-96 animate-pulse"
              />
            ))}
          </div>
        ) : offers.length === 0 ? (
          <div className="text-center py-16">
            <Tag className="h-16 w-16 mx-auto text-g7-gold/30 mb-4" />
            <h3 className="font-serif text-2xl text-g7-charcoal mb-2">
              No offers available
            </h3>
            <p className="text-g7-charcoal/60 mb-6">
              Check back later for new promotions
            </p>
          </div>
        ) : (
          /* Offers Grid */
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {offers.map((offer) => (
              <motion.div
                key={offer.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <Card className="overflow-hidden border-2 border-g7-gold/30 hover:border-g7-gold transition-all duration-500 group">
                  {/* Image */}
                  <div className="relative aspect-[16/9] overflow-hidden">
                    <img
                      src={offer.images[0]}
                      alt={offer.name}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                    
                    {/* Badges */}
                    <div className="absolute top-4 left-4 flex gap-2">
                      {offer.featured && (
                        <Badge className="bg-g7-gold text-g7-charcoal">
                          Featured
                        </Badge>
                      )}
                      <Badge
                        variant="secondary"
                        className="bg-black/70 text-white"
                      >
                        {offer.type.split('-').map(word => 
                          word.charAt(0).toUpperCase() + word.slice(1)
                        ).join(' ')}
                      </Badge>
                    </div>

                    {/* Discount Badge */}
                    <div className="absolute bottom-4 left-4 bg-g7-gold text-g7-charcoal px-4 py-2 rounded-full font-medium flex items-center gap-2">
                      {offer.discount.type === 'percentage' ? (
                        <>
                          <Percent className="h-4 w-4" />
                          {offer.discount.value}% OFF
                        </>
                      ) : (
                        <>
                          <Rupee className="h-4 w-4" />
                          ₹{offer.discount.value.toLocaleString()} OFF
                        </>
                      )}
                    </div>
                  </div>

                  {/* Content */}
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <h3 className="font-serif text-2xl text-g7-charcoal mb-2 group-hover:text-g7-gold transition-colors">
                          {offer.name}
                        </h3>
                        <p className="text-g7-charcoal/70 text-sm mb-3">
                          {offer.shortDescription}
                        </p>
                      </div>
                    </div>

                    {/* Validity */}
                    <div className="flex items-center gap-2 text-sm text-g7-charcoal/60 mb-4">
                      <Calendar className="h-4 w-4" />
                      <span>
                        Valid until {format(offer.endDate, 'MMM dd, yyyy')}
                      </span>
                    </div>

                    {/* Terms Preview */}
                    <div className="space-y-2 mb-4">
                      {offer.terms.slice(0, 2).map((term, index) => (
                        <div key={index} className="flex items-start gap-2 text-sm text-g7-charcoal/70">
                          <Check className="h-4 w-4 text-g7-gold flex-shrink-0 mt-0.5" />
                          <span>{term}</span>
                        </div>
                      ))}
                      {offer.terms.length > 2 && (
                        <p className="text-sm text-g7-gold">
                          +{offer.terms.length - 2} more terms
                        </p>
                      )}
                    </div>

                    {/* Promo Code */}
                    {offer.promoCode && (
                      <div className="mb-4 p-3 bg-g7-charcoal/5 rounded-lg">
                        <p className="text-xs text-g7-charcoal/60 mb-1">Promo Code</p>
                        <p className="font-mono font-bold text-g7-charcoal">
                          {offer.promoCode}
                        </p>
                      </div>
                    )}

                    {/* CTA */}
                    <div className="flex gap-3">
                      <Button
                        asChild
                        className="flex-1 bg-g7-charcoal text-g7-ivory hover:bg-g7-gold hover:text-g7-charcoal"
                      >
                        <Link href={`/booking?promo=${offer.promoCode}`}>
                          Book Now
                        </Link>
                      </Button>
                      <Button
                        asChild
                        variant="outline"
                        className="border-g7-gold text-g7-charcoal hover:bg-g7-gold hover:text-g7-charcoal"
                      >
                        <Link href="/offers">
                          Details
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        )}

        {/* Info Section */}
        <div className="mt-16 p-8 bg-g7-charcoal text-g7-ivory rounded-lg">
          <div className="max-w-3xl mx-auto text-center">
            <h3 className="font-serif text-2xl mb-4">Terms & Conditions</h3>
            <p className="text-g7-ivory/80 mb-6">
              All offers are subject to availability and cannot be combined with other promotions unless stated otherwise. 
              Blackout dates may apply. Please read individual offer terms for complete details.
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-sm text-g7-ivory/60">
              <span>✓ Best Rate Guaranteed</span>
              <span>✓ Free Cancellation</span>
              <span>✓ No Hidden Fees</span>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
