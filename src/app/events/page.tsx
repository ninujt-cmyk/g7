'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, MapPin, Users, Clock, ChevronRight, Filter, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Image from 'next/image';
import { EventType } from '@/types';

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 }
};

const eventTypes: { value: EventType; label: string; description: string }[] = [
  { value: 'wedding', label: 'Weddings', description: 'Create your dream celebration' },
  { value: 'corporate', label: 'Corporate Events', description: 'Business meetings and conferences' },
  { value: 'social', label: 'Social Events', description: 'Parties and celebrations' },
  { value: 'conference', label: 'Conferences', description: 'Large-scale gatherings' },
  { value: 'exhibition', label: 'Exhibitions', description: 'Showcase your brand' },
  { value: 'private-dining', label: 'Private Dining', description: 'Exclusive culinary experiences' }
];

const venues = [
  {
    id: '1',
    name: 'Grand Ballroom',
    type: ['wedding', 'corporate', 'social'] as EventType[],
    capacity: { theater: 500, classroom: 300, banquet: 350, cocktail: 400 },
    size: 5000,
    images: ['https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=800&h=600&fit=crop'],
    features: ['Natural Light', 'State-of-the-art AV', 'Dance Floor', 'Stage'],
    equipment: ['Projector', 'Sound System', 'Wireless Microphones', 'Lighting Control'],
    location: 'Ground Floor, Main Building',
    naturalLight: true,
    outdoorAccess: false,
    featured: true,
    description: 'Our flagship venue, perfect for grand celebrations and prestigious corporate events.'
  },
  {
    id: '2',
    name: 'Garden Pavilion',
    type: ['wedding', 'social'] as EventType[],
    capacity: { theater: 200, classroom: 100, banquet: 150, cocktail: 200 },
    size: 2500,
    images: ['https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=800&h=600&fit=crop'],
    features: ['Outdoor Setting', 'Garden View', 'Natural Light', 'Flexible Layout'],
    equipment: ['Portable Sound System', 'Tent Coverage'],
    location: 'Garden Level',
    naturalLight: true,
    outdoorAccess: true,
    featured: true,
    description: 'An elegant outdoor venue surrounded by lush gardens, ideal for romantic weddings.'
  },
  {
    id: '3',
    name: 'Executive Boardroom',
    type: ['corporate', 'conference'] as EventType[],
    capacity: { theater: 30, classroom: 20, banquet: 20, cocktail: 30 },
    size: 600,
    images: ['https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&h=600&fit=crop'],
    features: ['Private', 'Climate Control', 'Video Conferencing', 'High-Speed Internet'],
    equipment: ['85" Display', 'Video Conferencing System', 'Wireless Presentation', 'Coffee Station'],
    location: 'Executive Floor',
    naturalLight: false,
    outdoorAccess: false,
    featured: false,
    description: 'A sophisticated space for high-level executive meetings and confidential discussions.'
  },
  {
    id: '4',
    name: 'Rooftop Terrace',
    type: ['wedding', 'social', 'exhibition'] as EventType[],
    capacity: { theater: 150, classroom: 80, banquet: 100, cocktail: 200 },
    size: 2000,
    images: ['https://images.unsplash.com/photo-1567521464027-f127ff144326?w=800&h=600&fit=crop'],
    features: ['Panoramic Views', 'Open Air', 'Sunset Views', 'Flexible Layout'],
    equipment: ['Weather Protection', 'Portable Bar', 'Lighting System'],
    location: 'Rooftop',
    naturalLight: true,
    outdoorAccess: true,
    featured: true,
    description: 'Stunning city views create an unforgettable backdrop for any celebration.'
  },
  {
    id: '5',
    name: 'The Gallery',
    type: ['exhibition', 'conference', 'social'] as EventType[],
    capacity: { theater: 300, classroom: 150, banquet: 200, cocktail: 250 },
    size: 3500,
    images: ['https://images.unsplash.com/photo-1587825140708-dfaf72ae4b04?w=800&h=600&fit=crop'],
    features: ['Open Plan', 'High Ceilings', 'Gallery Lighting', 'Flexible Configurations'],
    equipment: ['Professional Lighting', 'Modular Walls', 'Display Systems', 'Sound System'],
    location: 'First Floor',
    naturalLight: true,
    outdoorAccess: false,
    featured: false,
    description: 'A versatile space designed for exhibitions, product launches, and creative events.'
  },
  {
    id: '6',
    name: 'Private Dining Room',
    type: ['private-dining', 'social'] as EventType[],
    capacity: { theater: 20, classroom: 15, banquet: 18, cocktail: 25 },
    size: 400,
    images: ['https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&h=600&fit=crop'],
    features: ['Intimate Setting', 'Private Entrance', 'Custom Menu', 'Wine Cellar Access'],
    equipment: ['Dining Table', 'Sideboard', 'Climate Control'],
    location: 'Restaurant Level',
    naturalLight: false,
    outdoorAccess: false,
    featured: true,
    description: 'An exclusive dining experience with personalized service and gourmet cuisine.'
  }
];

export default function EventsPage() {
  const [selectedType, setSelectedType] = useState<EventType | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredVenues = venues.filter(venue => {
    const matchesType = selectedType === 'all' || venue.type.includes(selectedType);
    const matchesSearch = venue.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         venue.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesType && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-[#F8F6F2]">
      {/* Hero Section */}
      <section className="relative h-[60vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=1920&h=1080&fit=crop"
            alt="G7 Hotels Events"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/60" />
        </div>
        
        <div className="relative z-10 text-center text-white px-4 max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl md:text-7xl font-serif mb-6">Events & Celebrations</h1>
            <p className="text-xl md:text-2xl font-light opacity-90">
              Create Unforgettable Moments at G7 Hotels
            </p>
          </motion.div>
        </div>
      </section>

      {/* Event Types Overview */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl md:text-5xl font-serif text-[#1A1A1A] mb-4">What We Host</h2>
            <p className="text-xl text-[#1A1A1A]/70">From intimate gatherings to grand celebrations</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ staggerChildren: 0.1 }}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {eventTypes.map((type, index) => (
              <motion.div
                key={type.value}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group"
              >
                <Card className="h-full border-2 border-transparent hover:border-[#C9A45C] transition-all cursor-pointer bg-[#F8F6F2]">
                  <CardContent className="p-8">
                    <h3 className="text-2xl font-serif text-[#1A1A1A] mb-2 group-hover:text-[#C9A45C] transition-colors">
                      {type.label}
                    </h3>
                    <p className="text-[#1A1A1A]/70">{type.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Venues Section */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <h2 className="text-4xl md:text-5xl font-serif text-[#1A1A1A] mb-4">Our Venues</h2>
            <p className="text-xl text-[#1A1A1A]/70">Discover the perfect space for your event</p>
          </motion.div>

          {/* Filters */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-8 space-y-4"
          >
            <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
              <div className="relative flex-1 max-w-md w-full">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#1A1A1A]/40 w-5 h-5" />
                <Input
                  placeholder="Search venues..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 bg-white"
                />
              </div>
              <Tabs value={selectedType} onValueChange={(v) => setSelectedType(v as EventType | 'all')}>
                <TabsList className="bg-white border border-[#1A1A1A]/10">
                  <TabsTrigger value="all">All Venues</TabsTrigger>
                  {eventTypes.map(type => (
                    <TabsTrigger key={type.value} value={type.value}>{type.label}</TabsTrigger>
                  ))}
                </TabsList>
              </Tabs>
            </div>
          </motion.div>

          {/* Venue Cards */}
          <motion.div
            variants={{
              animate: {
                transition: {
                  staggerChildren: 0.1
                }
              }
            }}
            initial="initial"
            animate="animate"
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {filteredVenues.map((venue, index) => (
              <motion.div
                key={venue.id}
                variants={fadeInUp}
              >
                <Card className="overflow-hidden group">
                  <div className="relative h-64 overflow-hidden">
                    <Image
                      src={venue.images[0]}
                      alt={venue.name}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    {venue.featured && (
                      <Badge className="absolute top-4 right-4 bg-[#C9A45C] text-[#1A1A1A]">
                        Featured
                      </Badge>
                    )}
                    {venue.naturalLight && (
                      <Badge variant="secondary" className="absolute top-4 left-4 bg-white/90 text-[#1A1A1A]">
                        Natural Light
                      </Badge>
                    )}
                  </div>
                  
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-3">
                      <h3 className="text-2xl font-serif text-[#1A1A1A]">{venue.name}</h3>
                    </div>
                    
                    <p className="text-[#1A1A1A]/70 mb-4 line-clamp-2">{venue.description}</p>
                    
                    <div className="space-y-3 mb-4">
                      <div className="flex items-center gap-2 text-sm text-[#1A1A1A]/80">
                        <Users className="w-4 h-4 text-[#C9A45C]" />
                        <span>Cocktail: {venue.capacity.cocktail} guests</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-[#1A1A1A]/80">
                        <Users className="w-4 h-4 text-[#C9A45C]" />
                        <span>Banquet: {venue.capacity.banquet} guests</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-[#1A1A1A]/80">
                        <MapPin className="w-4 h-4 text-[#C9A45C]" />
                        <span>{venue.location}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-[#1A1A1A]/80">
                        <Clock className="w-4 h-4 text-[#C9A45C]" />
                        <span>{venue.size.toLocaleString()} sq ft</span>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      {venue.type.slice(0, 2).map(type => (
                        <Badge key={type} variant="outline" className="text-xs">
                          {eventTypes.find(t => t.value === type)?.label}
                        </Badge>
                      ))}
                      {venue.type.length > 2 && (
                        <Badge variant="outline" className="text-xs">
                          +{venue.type.length - 2} more
                        </Badge>
                      )}
                    </div>
                  </CardContent>

                  <CardFooter className="p-6 pt-0">
                    <Button className="w-full group/btn">
                      View Details
                      <ChevronRight className="w-4 h-4 ml-2 group-hover/btn:translate-x-1 transition-transform" />
                    </Button>
                  </CardFooter>
                </Card>
              </motion.div>
            ))}
          </motion.div>

          {filteredVenues.length === 0 && (
            <div className="text-center py-16">
              <p className="text-xl text-[#1A1A1A]/60">No venues match your criteria. Please try different filters.</p>
            </div>
          )}
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-20 px-4 bg-[#1A1A1A]">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-serif text-[#F8F6F2] mb-4">Why Host With G7</h2>
            <p className="text-xl text-[#F8F6F2]/70">Exceptional service for exceptional events</p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Users,
                title: 'Dedicated Event Team',
                description: 'Our experienced event planners work with you from concept to completion, ensuring every detail is perfect.'
              },
              {
                icon: Calendar,
                title: 'Customizable Packages',
                description: 'Flexible options tailored to your needs, from intimate gatherings to grand celebrations.'
              },
              {
                icon: MapPin,
                title: 'Prime Locations',
                description: 'Strategically located venues with stunning views and convenient access.'
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <div className="w-20 h-20 bg-[#C9A45C]/20 rounded-full flex items-center justify-center mx-auto mb-6">
                  <feature.icon className="w-10 h-10 text-[#C9A45C]" />
                </div>
                <h3 className="text-2xl font-serif text-[#F8F6F2] mb-3">{feature.title}</h3>
                <p className="text-[#F8F6F2]/70">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-[#C9A45C]">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-serif text-[#1A1A1A] mb-6">
              Ready to Plan Your Event?
            </h2>
            <p className="text-xl text-[#1A1A1A]/80 mb-8">
              Let our expert team help you create an unforgettable experience.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="bg-[#1A1A1A] text-[#F8F6F2] hover:bg-[#2C4A3E] text-lg px-8"
              >
                Request a Quote
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-[#1A1A1A] text-[#1A1A1A] hover:bg-[#1A1A1A] hover:text-[#F8F6F2] text-lg px-8"
              >
                Contact Events Team
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
