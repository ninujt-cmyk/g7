'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import {
  UtensilsCrossed,
  Spa,
  Calendar,
  Star,
  Award,
  MapPin,
  Phone,
  Mail,
  ArrowRight,
  Check,
  Crown,
  Sparkles,
} from 'lucide-react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { HeroSection } from '@/components/common/HeroSection';
import { TestimonialCarousel } from '@/components/common/TestimonialCarousel';
import { LoyaltyBadge } from '@/components/loyalty/LoyaltyBadge';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { cn, format } from '@/lib/utils';

/**
 * G7 Hotels Homepage
 * Luxury hotel homepage with hero, featured sections, and CTAs
 * Inspired by Taj Hotels' elegant storytelling
 */

// Mock data - In production, this would come from CMS/API
const featuredRooms = [
  {
    id: '1',
    name: 'Presidential Suite',
    type: 'presidential',
    shortDescription: 'The ultimate in luxury with panoramic city views, private terrace, and dedicated butler service.',
    images: ['/images/rooms/luxury-room.jpg'],
    basePrice: 125,000,
    currency: 'INR',
    rating: 5,
    reviewCount: 124,
    featured: true,
    maxOccupancy: 4,
    beds: [{ type: 'king', count: 2 }],
    size: 2500,
    view: 'city',
    amenities: ['Free Wi-Fi', 'Room Service', 'Air Conditioning', 'Smart TV'],
    features: { smoking: false, petFriendly: false, accessible: true, connectingRooms: true },
    availability: { total: 2, available: 1 },
  },
  {
    id: '2',
    name: 'Royal Suite',
    type: 'royal',
    shortDescription: 'Opulent living space with garden views, private plunge pool, and exclusive amenities.',
    images: ['/images/rooms/luxury-room.jpg'],
    basePrice: 183,000,
    currency: 'INR',
    rating: 5,
    reviewCount: 89,
    featured: true,
    maxOccupancy: 6,
    beds: [{ type: 'king', count: 3 }],
    size: 3500,
    view: 'garden',
    amenities: ['Free Wi-Fi', 'Room Service', 'Air Conditioning', 'Smart TV'],
    features: { smoking: false, petFriendly: true, accessible: false, connectingRooms: true },
    availability: { total: 1, available: 1 },
  },
];

const diningHighlights = [
  {
    id: '1',
    name: 'The Golden Fork',
    cuisine: ['Modern European', 'Fusion'],
    description: 'Award-winning fine dining with innovative cuisine and impeccable service.',
    image: '/images/dining/fine-dining.jpg',
    priceRange: '$$$$',
    featured: true,
  },
  {
    id: '2',
    name: 'Terrace Grill',
    cuisine: ['Grill', 'Steakhouse'],
    description: 'Al fresco dining with stunning views and premium grilled selections.',
    image: '/images/dining/fine-dining.jpg',
    priceRange: '$$$',
    featured: true,
  },
];

const experiences = [
  {
    id: '1',
    name: 'Sunset Yacht Cruise',
    category: 'adventure',
    shortDescription: 'Sail into the sunset with champagne and gourmet canapés.',
    price: 29,000,
    currency: 'INR',
    duration: '3 hours',
    image: '/images/hero/hero-1.jpg',
    featured: true,
  },
  {
    id: '2',
    name: 'Private Chef Experience',
    category: 'culinary',
    shortDescription: 'A bespoke dining experience prepared by our executive chef.',
    price: 41,500,
    currency: 'INR',
    duration: '4 hours',
    image: '/images/dining/fine-dining.jpg',
    featured: true,
  },
];

const whyChooseUs = [
  {
    icon: <Award className="h-8 w-8" />,
    title: 'Award-Winning Service',
    description: 'Recognized globally for excellence in hospitality and guest satisfaction.',
  },
  {
    icon: <Crown className="h-8 w-8" />,
    title: 'Luxury Amenities',
    description: 'World-class spa, fine dining, and exclusive experiences at your fingertips.',
  },
  {
    icon: <MapPin className="h-8 w-8" />,
    title: 'Prime Location',
    description: 'Centrally located with easy access to city attractions and business districts.',
  },
  {
    icon: <Sparkles className="h-8 w-8" />,
    title: 'Personalized Service',
    description: 'Dedicated concierge and staff committed to exceeding your expectations.',
  },
];

const specialOffers = [
  {
    id: '1',
    name: 'Summer Escape',
    description: 'Stay 3 nights, pay for 2. Includes daily breakfast and spa credit.',
    discount: { type: 'percentage', value: 33 },
    validUntil: '2024-08-31',
    code: 'SUMMER33',
  },
  {
    id: '2',
    name: 'Romantic Getaway',
    description: 'Champagne on arrival, rose petal turndown, and couples spa treatment.',
    discount: { type: 'fixed', value: 200 },
    validUntil: '2024-12-31',
    code: 'ROMANCE200',
  },
];

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col bg-g7-ivory">
      <Header />

      {/* Hero Section */}
      <HeroSection
        title="Experience Timeless Luxury"
        subtitle="Where Every Moment Becomes a Treasured Memory"
        description="Discover unparalleled hospitality, exquisite dining, and world-class amenities at G7 Hotels. Your journey to extraordinary begins here."
        backgroundImage="/images/hero/hero-1.jpg"
        showBookingWidget={true}
        ctaText="Explore Our Rooms"
        ctaHref="/rooms"
      />

      {/* Why Choose Us Section */}
      <section className="py-20 px-4 bg-white">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <Badge className="bg-g7-gold text-g7-charcoal mb-4">Why G7 Hotels</Badge>
            <h2 className="font-serif text-4xl md:text-5xl text-g7-charcoal mb-4">
              A Legacy of Excellence
            </h2>
            <p className="text-g7-charcoal/70 text-lg max-w-2xl mx-auto">
              For over two decades, we have been setting the standard for luxury hospitality, creating unforgettable experiences for discerning travelers.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {whyChooseUs.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <div className="w-16 h-16 mx-auto mb-6 flex items-center justify-center rounded-full bg-g7-gold/10 text-g7-gold">
                  {item.icon}
                </div>
                <h3 className="font-serif text-xl text-g7-charcoal mb-3">{item.title}</h3>
                <p className="text-g7-charcoal/70">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Rooms Section */}
      <section className="py-20 px-4 bg-g7-ivory">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-col md:flex-row md:items-end md:justify-between mb-12"
          >
            <div>
              <Badge className="bg-g7-charcoal text-g7-ivory mb-4">Accommodations</Badge>
              <h2 className="font-serif text-4xl md:text-5xl text-g7-charcoal mb-4">
                Luxury Rooms & Suites
              </h2>
              <p className="text-g7-charcoal/70 text-lg max-w-xl">
                Experience the epitome of comfort and elegance in our meticulously designed rooms and suites.
              </p>
            </div>
            <Button
              asChild
              variant="outline"
              className="mt-6 md:mt-0 border-g7-gold text-g7-charcoal hover:bg-g7-gold hover:text-g7-charcoal"
            >
              <Link href="/rooms">
                View All Rooms
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {featuredRooms.map((room) => (
              <motion.div
                key={room.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <Card className="overflow-hidden border-0 shadow-lg hover:shadow-2xl transition-all duration-500 group">
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <img
                      src={room.images[0]}
                      alt={room.name}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                    <Badge className="absolute top-4 left-4 bg-g7-gold text-g7-charcoal">
                      {room.type}
                    </Badge>
                    <div className="absolute bottom-4 left-4 right-4">
                      <h3 className="font-serif text-2xl text-white mb-2">{room.name}</h3>
                      <p className="text-white/80 text-sm mb-3 line-clamp-2">
                        {room.shortDescription}
                      </p>
                      <div className="flex items-center justify-between">
                        <div>
                          <span className="text-g7-gold font-serif text-xl">
                            ₹{room.basePrice.toLocaleString()}
                          </span>
                          <span className="text-white/60 text-sm"> /night</span>
                        </div>
                        <div className="flex items-center gap-1 text-white">
                          <Star className="h-4 w-4 fill-g7-gold text-g7-gold" />
                          <span className="text-sm">{room.rating}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <CardContent className="p-6">
                    <Button asChild className="w-full bg-g7-charcoal text-g7-ivory hover:bg-g7-gold hover:text-g7-charcoal">
                      <Link href={`/rooms/${room.id}`}>Book Now</Link>
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Dining Section */}
      <section className="py-20 px-4 bg-g7-charcoal">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <Badge className="bg-g7-gold text-g7-charcoal mb-4">Culinary Excellence</Badge>
            <h2 className="font-serif text-4xl md:text-5xl text-g7-ivory mb-4">
              Exquisite Dining Experiences
            </h2>
            <p className="text-g7-ivory/70 text-lg max-w-2xl mx-auto">
              From fine dining to casual elegance, our restaurants offer culinary journeys that delight the senses.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {diningHighlights.map((restaurant, index) => (
              <motion.div
                key={restaurant.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="overflow-hidden border-0 bg-g7-charcoal-light group cursor-pointer">
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <img
                      src={restaurant.image}
                      alt={restaurant.name}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-black/40 group-hover:bg-black/30 transition-colors" />
                  </div>
                  <CardContent className="p-6">
                    <div className="flex items-center gap-2 mb-3">
                      <UtensilsCrossed className="h-5 w-5 text-g7-gold" />
                      <span className="text-g7-gold text-sm font-medium">
                        {restaurant.cuisine.join(' • ')}
                      </span>
                    </div>
                    <h3 className="font-serif text-2xl text-g7-ivory mb-3">{restaurant.name}</h3>
                    <p className="text-g7-ivory/70 mb-4">{restaurant.description}</p>
                    <Link href="/dining" className="inline-flex items-center text-g7-gold hover:text-g7-gold-light transition-colors">
                      Reserve a Table
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Button
              asChild
              variant="outline"
              className="border-g7-gold text-g7-gold hover:bg-g7-gold hover:text-g7-charcoal"
            >
              <Link href="/dining">
                Explore All Restaurants
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Experiences Section */}
      <section className="py-20 px-4 bg-white">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <Badge className="bg-g7-gold text-g7-charcoal mb-4">Curated Experiences</Badge>
            <h2 className="font-serif text-4xl md:text-5xl text-g7-charcoal mb-4">
              Unforgettable Moments
            </h2>
            <p className="text-g7-charcoal/70 text-lg max-w-2xl mx-auto">
              Discover bespoke experiences designed to create lasting memories during your stay.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {experiences.map((experience, index) => (
              <motion.div
                key={experience.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="overflow-hidden border-0 shadow-lg hover:shadow-2xl transition-all duration-500 group">
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <img
                      src={experience.image}
                      alt={experience.name}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                    <Badge className="absolute top-4 left-4 bg-g7-gold text-g7-charcoal capitalize">
                      {experience.category}
                    </Badge>
                  </div>
                  <CardContent className="p-6">
                    <h3 className="font-serif text-xl text-g7-charcoal mb-2">{experience.name}</h3>
                    <p className="text-g7-charcoal/70 text-sm mb-4">{experience.shortDescription}</p>
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="text-g7-charcoal font-medium">₹{experience.price.toLocaleString()}</span>
                        <span className="text-g7-charcoal/60 text-sm"> /person</span>
                      </div>
                      <span className="text-g7-charcoal/60 text-sm">{experience.duration}</span>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}

            {/* More Experiences Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
            >
              <Card className="overflow-hidden border-0 shadow-lg hover:shadow-2xl transition-all duration-500 h-full bg-g7-gold/5 flex flex-col items-center justify-center p-8 text-center group cursor-pointer">
                <div className="w-16 h-16 mb-6 flex items-center justify-center rounded-full bg-g7-gold/20 text-g7-gold group-hover:bg-g7-gold group-hover:text-g7-charcoal transition-all">
                  <Sparkles className="h-8 w-8" />
                </div>
                <h3 className="font-serif text-2xl text-g7-charcoal mb-3">More Experiences</h3>
                <p className="text-g7-charcoal/70 mb-6">
                  Discover spa treatments, cultural tours, adventure activities, and more.
                </p>
                <Button
                  asChild
                  variant="outline"
                  className="border-g7-gold text-g7-charcoal hover:bg-g7-gold hover:text-g7-charcoal"
                >
                  <Link href="/experiences">
                    Explore All
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Special Offers Section */}
      <section className="py-20 px-4 bg-g7-ivory">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <Badge className="bg-g7-charcoal text-g7-ivory mb-4">Exclusive Offers</Badge>
            <h2 className="font-serif text-4xl md:text-5xl text-g7-charcoal mb-4">
              Special Packages & Deals
            </h2>
            <p className="text-g7-charcoal/70 text-lg max-w-2xl mx-auto">
              Take advantage of our exclusive offers and make your stay even more memorable.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {specialOffers.map((offer, index) => (
              <motion.div
                key={offer.id}
                initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="overflow-hidden border-2 border-g7-gold/30 hover:border-g7-gold transition-colors">
                  <CardContent className="p-8">
                    <div className="flex items-start justify-between mb-4">
                      <Badge className="bg-g7-gold text-g7-charcoal text-base px-4 py-1">
                        {offer.discount.type === 'percentage'
                          ? `${offer.discount.value}% OFF`
                          : `₹${offer.discount.value.toLocaleString()} OFF`}
                      </Badge>
                      <span className="text-sm text-g7-charcoal/60">
                        Valid until {format(new Date(offer.validUntil), 'MMM dd, yyyy')}
                      </span>
                    </div>
                    <h3 className="font-serif text-2xl text-g7-charcoal mb-3">{offer.name}</h3>
                    <p className="text-g7-charcoal/70 mb-6">{offer.description}</p>
                    <div className="space-y-2 mb-6">
                      <div className="flex items-center gap-2 text-sm text-g7-charcoal/80">
                        <Check className="h-4 w-4 text-g7-gold" />
                        <span>Best rate guaranteed</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-g7-charcoal/80">
                        <Check className="h-4 w-4 text-g7-gold" />
                        <span>Free cancellation</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-g7-charcoal/80">
                        <Check className="h-4 w-4 text-g7-gold" />
                        <span>No booking fees</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Button asChild className="flex-1 bg-g7-charcoal text-g7-ivory hover:bg-g7-gold hover:text-g7-charcoal">
                        <Link href="/booking">Book Now</Link>
                      </Button>
                      <div className="text-center">
                        <p className="text-xs text-g7-charcoal/60 mb-1">Use code</p>
                        <p className="font-mono font-bold text-g7-gold">{offer.code}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Button
              asChild
              variant="outline"
              className="border-g7-charcoal text-g7-charcoal hover:bg-g7-charcoal hover:text-g7-ivory"
            >
              <Link href="/offers">
                View All Offers
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Loyalty Program Section */}
      <section className="py-20 px-4 bg-white">
        <div className="container mx-auto">
          <div className="max-w-5xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <Badge className="bg-g7-gold text-g7-charcoal mb-4">Rewards Program</Badge>
              <h2 className="font-serif text-4xl md:text-5xl text-g7-charcoal mb-4">
                Join the G7 Rewards
              </h2>
              <p className="text-g7-charcoal/70 text-lg max-w-2xl mx-auto">
                Earn points on every stay and unlock exclusive benefits, room upgrades, and memorable experiences.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
              <div className="space-y-4">
                <LoyaltyBadge
                  tier="gold"
                  points={25000}
                  showLabel={true}
                  size="lg"
                  variant="card"
                />
                <Button asChild className="w-full bg-g7-charcoal text-g7-ivory hover:bg-g7-gold hover:text-g7-charcoal">
                  <Link href="/loyalty">Join Now - It's Free</Link>
                </Button>
              </div>

              <div className="space-y-6">
                <h3 className="font-serif text-2xl text-g7-charcoal">Member Benefits</h3>
                <div className="space-y-4">
                  {[
                    'Earn 5 points per ₹100 spent on rooms',
                    '10% bonus points for Gold members',
                    'Priority check-in and late check-out',
                    'Room upgrades subject to availability',
                    'Exclusive member-only rates',
                    'Complimentary Wi-Fi',
                    'Birthday surprises and anniversary treats',
                  ].map((benefit, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.05 }}
                      className="flex items-start gap-3"
                    >
                      <Check className="h-5 w-5 text-g7-gold flex-shrink-0 mt-0.5" />
                      <span className="text-g7-charcoal/80">{benefit}</span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <TestimonialCarousel autoplay={true} showAvatars={true} variant="full" />

      {/* CTA Section */}
      <section className="py-20 px-4 bg-g7-charcoal relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <img
            src="/images/hero/hero-1.jpg"
            alt=""
            className="w-full h-full object-cover"
          />
        </div>
        <div className="container mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center max-w-3xl mx-auto"
          >
            <h2 className="font-serif text-4xl md:text-5xl text-g7-ivory mb-6">
              Ready for Your Luxury Getaway?
            </h2>
            <p className="text-g7-ivory/80 text-lg mb-8">
              Book your stay today and experience the extraordinary at G7 Hotels. 
              Our dedicated team is ready to make your visit unforgettable.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                asChild
                size="lg"
                className="bg-g7-gold text-g7-charcoal hover:bg-g7-gold-light px-8 py-6 text-lg"
              >
                <Link href="/booking">
                  <Calendar className="mr-2 h-5 w-5" />
                  Book Your Stay
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="border-g7-gold text-g7-gold hover:bg-g7-gold hover:text-g7-charcoal px-8 py-6 text-lg"
              >
                <Link href="/contact">
                  <Phone className="mr-2 h-5 w-5" />
                  Contact Us
                </Link>
              </Button>
            </div>

            <div className="mt-12 flex flex-wrap items-center justify-center gap-8 text-g7-ivory/70">
              <a href="tel:+18001234567" className="flex items-center gap-2 hover:text-g7-gold transition-colors">
                <Phone className="h-5 w-5" />
                <span>+1 800 123 4567</span>
              </a>
              <a href="mailto:reservations@g7hotels.com" className="flex items-center gap-2 hover:text-g7-gold transition-colors">
                <Mail className="h-5 w-5" />
                <span>reservations@g7hotels.com</span>
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
