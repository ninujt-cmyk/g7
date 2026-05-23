'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import {
  MapPin,
  Users,
  Star,
  Search,
  ArrowRight,
  Maximize,
  Utensils,
  Wifi,
  Car,
  Mic,
} from 'lucide-react';
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
 * G7 Hotels Events Venues Page
 * Event venues and spaces for weddings, corporate events, etc.
 */

interface Venue {
  id: string;
  name: string;
  type: 'ballroom' | 'conference' | 'outdoor' | 'rooftop' | 'dining';
  capacity: number;
  size: string;
  description: string;
  image: string;
  features: string[];
  startingPrice: number;
  currency: string;
  rating: number;
  reviewCount: number;
}

const mockVenues: Venue[] = [
  {
    id: '1',
    name: 'Grand Ballroom',
    type: 'ballroom',
    capacity: 500,
    size: '10,000 sq ft',
    description: 'Our magnificent ballroom features crystal chandeliers, marble floors, and panoramic city views. Perfect for grand weddings and gala dinners.',
    image: '/images/hero/hero-1.jpg',
    features: ['Stage & Dance Floor', 'AV Equipment', 'Catering Kitchen', 'Bridal Suite', 'Valet Parking'],
    startingPrice: 500000,
    currency: 'INR',
    rating: 5,
    reviewCount: 45,
  },
  {
    id: '2',
    name: 'Rooftop Garden',
    type: 'rooftop',
    capacity: 200,
    size: '5,000 sq ft',
    description: 'An elegant rooftop venue with stunning skyline views, lush greenery, and a romantic atmosphere. Ideal for intimate ceremonies and cocktail receptions.',
    image: '/images/hero/hero-1.jpg',
    features: ['Skyline Views', 'Garden Setting', 'Climate Control', 'Custom Lighting', 'Fire Pit'],
    startingPrice: 250000,
    currency: 'INR',
    rating: 4.9,
    reviewCount: 38,
  },
  {
    id: '3',
    name: 'Executive Conference Center',
    type: 'conference',
    capacity: 300,
    size: '8,000 sq ft',
    description: 'State-of-the-art conference facility with flexible meeting rooms, latest technology, and professional event planning services.',
    image: '/images/hero/hero-1.jpg',
    features: ['HD Projection', 'Video Conferencing', 'Breakout Rooms', 'Business Center', 'High-Speed WiFi'],
    startingPrice: 150000,
    currency: 'INR',
    rating: 4.8,
    reviewCount: 62,
  },
  {
    id: '4',
    name: 'Terrace Restaurant',
    type: 'dining',
    capacity: 150,
    size: '3,500 sq ft',
    description: 'Al fresco dining venue with open kitchen concept, perfect for private dining experiences, rehearsal dinners, and social gatherings.',
    image: '/images/dining/fine-dining.jpg',
    features: ['Open Kitchen', 'Outdoor Seating', 'Custom Menus', 'Wine Cellar', 'Live Cooking Stations'],
    startingPrice: 100000,
    currency: 'INR',
    rating: 4.7,
    reviewCount: 54,
  },
];

export default function VenuesPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [typeFilter, setTypeFilter] = useState('all');
  const [capacityFilter, setCapacityFilter] = useState('all');

  const filteredVenues = mockVenues.filter((venue) => {
    const matchesSearch = venue.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = typeFilter === 'all' || venue.type === typeFilter;
    const matchesCapacity =
      capacityFilter === 'all' ||
      (capacityFilter === 'small' && venue.capacity <= 150) ||
      (capacityFilter === 'medium' && venue.capacity > 150 && venue.capacity <= 300) ||
      (capacityFilter === 'large' && venue.capacity > 300);
    return matchesSearch && matchesType && matchesCapacity;
  });

  const venueTypes = [
    { value: 'all', label: 'All Venues' },
    { value: 'ballroom', label: 'Ballrooms' },
    { value: 'conference', label: 'Conference' },
    { value: 'outdoor', label: 'Outdoor' },
    { value: 'rooftop', label: 'Rooftop' },
    { value: 'dining', label: 'Dining' },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-g7-ivory">
      <Header />

      <PageHero
        title="Event Venues"
        subtitle="Create Unforgettable Celebrations"
        backgroundImage="/images/hero/hero-1.jpg"
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Events', href: '/events' },
          { label: 'Venues' },
        ]}
      />

      <main className="flex-1 container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h2 className="font-serif text-4xl text-g7-charcoal mb-4">Exceptional Event Spaces</h2>
          <p className="text-g7-charcoal/70 max-w-2xl mx-auto">
            From intimate gatherings to grand celebrations, our versatile venues provide the perfect backdrop for your special occasions.
          </p>
        </div>

        <Card className="p-6 mb-8">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-g7-charcoal/40" />
              <Input
                placeholder="Search venues..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 border-g7-gold/50"
              />
            </div>
            <div className="w-full lg:w-48">
              <Select value={typeFilter} onValueChange={setTypeFilter}>
                <SelectTrigger className="border-g7-gold/50">
                  <SelectValue placeholder="Venue Type" />
                </SelectTrigger>
                <SelectContent>
                  {venueTypes.map((type) => (
                    <SelectItem key={type.value} value={type.value}>
                      {type.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="w-full lg:w-48">
              <Select value={capacityFilter} onValueChange={setCapacityFilter}>
                <SelectTrigger className="border-g7-gold/50">
                  <SelectValue placeholder="Capacity" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Capacities</SelectItem>
                  <SelectItem value="small">Up to 150</SelectItem>
                  <SelectItem value="medium">151 - 300</SelectItem>
                  <SelectItem value="large">300+</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {filteredVenues.map((venue, index) => (
            <motion.div
              key={venue.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="overflow-hidden hover:shadow-2xl transition-all duration-500">
                <div className="relative aspect-[4/3] overflow-hidden">
                  <img
                    src={venue.image}
                    alt={venue.name}
                    className="w-full h-full object-cover transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                  <Badge className="absolute top-4 left-4 bg-g7-gold text-g7-charcoal capitalize">
                    {venue.type}
                  </Badge>
                  <div className="absolute bottom-4 left-4 right-4">
                    <div className="flex items-center justify-between">
                      <h3 className="font-serif text-2xl text-white">{venue.name}</h3>
                      <div className="flex items-center gap-1 text-white">
                        <Star className="h-4 w-4 fill-g7-gold text-g7-gold" />
                        <span className="text-sm">{venue.rating}</span>
                      </div>
                    </div>
                  </div>
                </div>
                <CardContent className="p-6">
                  <p className="text-g7-charcoal/70 text-sm mb-4 line-clamp-2">{venue.description}</p>

                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div className="flex items-center gap-2 text-sm text-g7-charcoal/80">
                      <Users className="h-4 w-4 text-g7-gold" />
                      <span>{venue.capacity} guests</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-g7-charcoal/80">
                      <Maximize className="h-4 w-4 text-g7-gold" />
                      <span>{venue.size}</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t">
                    <div>
                      <span className="text-sm text-g7-charcoal/60">Starting from</span>
                      <p className="text-xl font-serif text-g7-charcoal">
                        ₹{venue.startingPrice.toLocaleString()}
                      </p>
                    </div>
                    <Button
                      asChild
                      size="sm"
                      className="bg-g7-charcoal text-g7-ivory hover:bg-g7-gold hover:text-g7-charcoal"
                    >
                      <Link href={`/contact?venue=${venue.id}`}>
                        Inquire
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <div className="max-w-6xl mx-auto mb-16">
          <h2 className="font-serif text-3xl text-g7-charcoal text-center mb-12">Venue Amenities</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
            {[
              { icon: <Wifi className="h-8 w-8" />, label: 'High-Speed WiFi' },
              { icon: <Mic className="h-8 w-8" />, label: 'AV Equipment' },
              { icon: <Utensils className="h-8 w-8" />, label: 'Catering' },
              { icon: <Car className="h-8 w-8" />, label: 'Valet Parking' },
              { icon: <Users className="h-8 w-8" />, label: 'Event Staff' },
              { icon: <MapPin className="h-8 w-8" />, label: 'Prime Location' },
            ].map((item, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 mx-auto mb-3 flex items-center justify-center rounded-full bg-g7-gold/10 text-g7-gold">
                  {item.icon}
                </div>
                <p className="text-sm text-g7-charcoal/80">{item.label}</p>
              </div>
            ))}
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto"
        >
          <Card className="p-8 md:p-12 bg-g7-charcoal text-g7-ivory border-0">
            <MapPin className="h-12 w-12 mx-auto mb-6 text-g7-gold" />
            <h2 className="font-serif text-3xl text-center mb-4">Plan Your Perfect Event</h2>
            <p className="text-g7-ivory/80 text-center mb-8">
              Our dedicated event planning team is ready to help you create an unforgettable experience. Contact us today to discuss your requirements.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                asChild
                size="lg"
                className="bg-g7-gold text-g7-charcoal hover:bg-g7-gold-light"
              >
                <Link href="/contact">Contact Event Team</Link>
              </Button>
            </div>
          </Card>
        </motion.div>
      </main>

      <Footer />
    </div>
  );
}
