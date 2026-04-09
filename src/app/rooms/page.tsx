'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import {
  SlidersHorizontal,
  X,
  ChevronDown,
  BedDouble,
  Map,
  Users,
  DollarSign,
  Star,
  Filter,
  Grid,
  List,
  Wifi,
  Coffee,
  Tv,
  Snowflake,
  Bath,
  UtensilsCrossed,
} from 'lucide-react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { PageHero } from '@/components/common/HeroSection';
import { RoomCard } from '@/components/rooms/RoomCard';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Slider } from '@/components/ui/slider';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { cn, format } from '@/lib/utils';
import type { Room, SearchFilters } from '@/types';

/**
 * G7 Hotels Rooms & Suites Page
 * Complete room listing with filters and search
 */

// Amenity icons mapping
const amenityIcons: Record<string, React.ReactNode> = {
  'Free Wi-Fi': <Wifi className="h-4 w-4" />,
  'Room Service': <UtensilsCrossed className="h-4 w-4" />,
  'Air Conditioning': <Snowflake className="h-4 w-4" />,
  'Smart TV': <Tv className="h-4 w-4" />,
  'Coffee Maker': <Coffee className="h-4 w-4" />,
  'Bathtub': <Bath className="h-4 w-4" />,
};

const roomTypes = [
  { value: 'standard', label: 'Standard Room' },
  { value: 'deluxe', label: 'Deluxe Room' },
  { value: 'suite', label: 'Suite' },
  { value: 'presidential', label: 'Presidential Suite' },
  { value: 'royal', label: 'Royal Suite' },
];

const roomViews = [
  { value: 'city', label: 'City View' },
  { value: 'garden', label: 'Garden View' },
  { value: 'ocean', label: 'Ocean View' },
  { value: 'mountain', label: 'Mountain View' },
  { value: 'pool', label: 'Pool View' },
  { value: 'courtyard', label: 'Courtyard View' },
];

const allAmenities = [
  'Free Wi-Fi',
  'Room Service',
  'Air Conditioning',
  'Smart TV',
  'Coffee Maker',
  'Bathtub',
  'Mini Bar',
  'Safe',
  'Balcony',
  'Work Desk',
];

export default function RoomsPage() {
  const searchParams = useSearchParams();
  const [rooms, setRooms] = useState<Room[]>([]);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  
  // Filters state
  const [filters, setFilters] = useState<SearchFilters>({
    type: searchParams.get('type') as any || undefined,
    view: undefined,
    priceRange: { min: 0, max: 5000 },
    adults: 2,
    children: 0,
    rooms: 1,
    amenities: [],
    sortBy: 'popularity',
    sortOrder: 'desc',
  });

  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [selectedViews, setSelectedViews] = useState<string[]>([]);
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([]);

  // Fetch rooms
  useEffect(() => {
    fetchRooms();
  }, [filters]);

  const fetchRooms = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      
      if (selectedTypes.length > 0) {
        params.append('type', selectedTypes.join(','));
      }
      if (selectedViews.length > 0) {
        params.append('view', selectedViews.join(','));
      }
      if (filters.priceRange) {
        params.append('minPrice', filters.priceRange.min.toString());
        params.append('maxPrice', filters.priceRange.max.toString());
      }
      if (filters.adults) {
        params.append('adults', filters.adults.toString());
      }
      if (filters.children) {
        params.append('children', filters.children.toString());
      }
      if (filters.sortBy) {
        params.append('sort', filters.sortBy);
        params.append('order', filters.sortOrder);
      }

      const response = await fetch(`/api/rooms?${params}`);
      const data = await response.json();

      if (data.success) {
        // Filter by amenities
        let filteredRooms = data.data;
        
        if (selectedAmenities.length > 0) {
          filteredRooms = filteredRooms.filter((room: Room) =>
            selectedAmenities.every(amenity =>
              room.amenities.includes(amenity)
            )
          );
        }

        setRooms(filteredRooms);
      }
    } catch (error) {
      console.error('Error fetching rooms:', error);
    } finally {
      setLoading(false);
    }
  };

  const toggleType = (type: string) => {
    setSelectedTypes((prev) =>
      prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]
    );
  };

  const toggleView = (view: string) => {
    setSelectedViews((prev) =>
      prev.includes(view) ? prev.filter((v) => v !== view) : [...prev, view]
    );
  };

  const toggleAmenity = (amenity: string) => {
    setSelectedAmenities((prev) =>
      prev.includes(amenity) ? prev.filter((a) => a !== amenity) : [...prev, amenity]
    );
  };

  const clearFilters = () => {
    setSelectedTypes([]);
    setSelectedViews([]);
    setSelectedAmenities([]);
    setFilters((prev) => ({
      ...prev,
      priceRange: { min: 0, max: 5000 },
    }));
  };

  const activeFiltersCount = selectedTypes.length + selectedViews.length + selectedAmenities.length;

  return (
    <div className="min-h-screen flex flex-col bg-g7-ivory">
      <Header />

      {/* Page Hero */}
      <PageHero
        title="Rooms & Suites"
        subtitle="Luxury Accommodations with Stunning Views"
        backgroundImage="/images/rooms/luxury-room.jpg"
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Rooms & Suites' },
        ]}
      />

      {/* Main Content */}
      <main className="flex-1 container mx-auto px-4 py-12">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar - Desktop */}
          <aside className="hidden lg:block w-72 flex-shrink-0">
            <div className="sticky top-24 space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="font-serif text-xl text-g7-charcoal">Filters</h2>
                {activeFiltersCount > 0 && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={clearFilters}
                    className="text-g7-gold hover:text-g7-gold-dark"
                  >
                    Clear all
                  </Button>
                )}
              </div>

              {/* Room Type */}
              <div>
                <h3 className="font-medium text-g7-charcoal mb-3 flex items-center gap-2">
                  <BedDouble className="h-4 w-4" />
                  Room Type
                </h3>
                <div className="space-y-2">
                  {roomTypes.map((type) => (
                    <label
                      key={type.value}
                      className="flex items-center gap-2 cursor-pointer group"
                    >
                      <Checkbox
                        checked={selectedTypes.includes(type.value)}
                        onCheckedChange={() => toggleType(type.value)}
                        className="border-g7-gold/50 data-[state=checked]:bg-g7-gold data-[state=checked]:border-g7-gold"
                      />
                      <span className="text-sm text-g7-charcoal/80 group-hover:text-g7-charcoal">
                        {type.label}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Room View */}
              <div>
                <h3 className="font-medium text-g7-charcoal mb-3 flex items-center gap-2">
                  <Map className="h-4 w-4" />
                  View
                </h3>
                <div className="space-y-2">
                  {roomViews.map((view) => (
                    <label
                      key={view.value}
                      className="flex items-center gap-2 cursor-pointer group"
                    >
                      <Checkbox
                        checked={selectedViews.includes(view.value)}
                        onCheckedChange={() => toggleView(view.value)}
                        className="border-g7-gold/50 data-[state=checked]:bg-g7-gold data-[state=checked]:border-g7-gold"
                      />
                      <span className="text-sm text-g7-charcoal/80 group-hover:text-g7-charcoal">
                        {view.label}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Price Range */}
              <div>
                <h3 className="font-medium text-g7-charcoal mb-3 flex items-center gap-2">
                  <DollarSign className="h-4 w-4" />
                  Price Range
                </h3>
                <div className="space-y-4">
                  <Slider
                    value={[filters.priceRange?.max || 100000]}
                    onValueChange={([value]) =>
                      setFilters((prev) => ({
                        ...prev,
                        priceRange: { min: 0, max: value },
                      }))
                    }
                    max={100000}
                    step={5000}
                    className="[&_[role=slider]]:bg-g7-gold"
                  />
                  <div className="flex justify-between text-sm text-g7-charcoal/60">
                    <span>₹0</span>
                    <span>₹{(filters.priceRange?.max || 100000).toLocaleString()}</span>
                  </div>
                </div>
              </div>

              {/* Amenities */}
              <div>
                <h3 className="font-medium text-g7-charcoal mb-3 flex items-center gap-2">
                  <Wifi className="h-4 w-4" />
                  Amenities
                </h3>
                <div className="space-y-2">
                  {allAmenities.slice(0, 6).map((amenity) => (
                    <label
                      key={amenity}
                      className="flex items-center gap-2 cursor-pointer group"
                    >
                      <Checkbox
                        checked={selectedAmenities.includes(amenity)}
                        onCheckedChange={() => toggleAmenity(amenity)}
                        className="border-g7-gold/50 data-[state=checked]:bg-g7-gold data-[state=checked]:border-g7-gold"
                      />
                      <div className="flex items-center gap-2">
                        {amenityIcons[amenity]}
                        <span className="text-sm text-g7-charcoal/80 group-hover:text-g7-charcoal">
                          {amenity}
                        </span>
                      </div>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </aside>

          {/* Room Listings */}
          <div className="flex-1">
            {/* Results Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
              <div>
                <p className="text-g7-charcoal/60">
                  {rooms.length} {rooms.length === 1 ? 'room' : 'rooms'} found
                </p>
                {activeFiltersCount > 0 && (
                  <p className="text-sm text-g7-gold mt-1">
                    {activeFiltersCount} filter{activeFiltersCount !== 1 ? 's' : ''} applied
                  </p>
                )}
              </div>

              <div className="flex items-center gap-3">
                {/* Sort */}
                <Select
                  value={filters.sortBy}
                  onValueChange={(value) =>
                    setFilters((prev) => ({ ...prev, sortBy: value as any }))
                  }
                >
                  <SelectTrigger className="w-[160px]">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="popularity">Popularity</SelectItem>
                    <SelectItem value="price">Price</SelectItem>
                    <SelectItem value="rating">Rating</SelectItem>
                    <SelectItem value="name">Name</SelectItem>
                  </SelectContent>
                </Select>

                {/* View Toggle */}
                <div className="flex border border-g7-gold/30 rounded-sm overflow-hidden">
                  <Button
                    variant={viewMode === 'grid' ? 'default' : 'ghost'}
                    size="icon"
                    onClick={() => setViewMode('grid')}
                    className={cn(
                      'rounded-none',
                      viewMode === 'grid'
                        ? 'bg-g7-gold text-g7-charcoal'
                        : 'text-g7-charcoal/60 hover:text-g7-charcoal'
                    )}
                  >
                    <Grid className="h-4 w-4" />
                  </Button>
                  <Button
                    variant={viewMode === 'list' ? 'default' : 'ghost'}
                    size="icon"
                    onClick={() => setViewMode('list')}
                    className={cn(
                      'rounded-none',
                      viewMode === 'list'
                        ? 'bg-g7-gold text-g7-charcoal'
                        : 'text-g7-charcoal/60 hover:text-g7-charcoal'
                    )}
                  >
                    <List className="h-4 w-4" />
                  </Button>
                </div>

                {/* Mobile Filters Button */}
                <Sheet open={mobileFiltersOpen} onOpenChange={setMobileFiltersOpen}>
                  <SheetTrigger asChild className="lg:hidden">
                    <Button variant="outline" className="border-g7-gold/50">
                      <Filter className="h-4 w-4 mr-2" />
                      Filters
                      {activeFiltersCount > 0 && (
                        <Badge className="ml-2 bg-g7-gold text-g7-charcoal">
                          {activeFiltersCount}
                        </Badge>
                      )}
                    </Button>
                  </SheetTrigger>
                  <SheetContent side="left" className="w-80 overflow-y-auto">
                    <SheetHeader>
                      <SheetTitle>Filters</SheetTitle>
                    </SheetHeader>
                    <div className="mt-6 space-y-6">
                      {/* Mobile filter content (same as desktop) */}
                      <div>
                        <h3 className="font-medium text-g7-charcoal mb-3">Room Type</h3>
                        <div className="space-y-2">
                          {roomTypes.map((type) => (
                            <label
                              key={type.value}
                              className="flex items-center gap-2 cursor-pointer"
                            >
                              <Checkbox
                                checked={selectedTypes.includes(type.value)}
                                onCheckedChange={() => toggleType(type.value)}
                              />
                              <span className="text-sm">{type.label}</span>
                            </label>
                          ))}
                        </div>
                      </div>

                      <div>
                        <h3 className="font-medium text-g7-charcoal mb-3">View</h3>
                        <div className="space-y-2">
                          {roomViews.map((view) => (
                            <label
                              key={view.value}
                              className="flex items-center gap-2 cursor-pointer"
                            >
                              <Checkbox
                                checked={selectedViews.includes(view.value)}
                                onCheckedChange={() => toggleView(view.value)}
                              />
                              <span className="text-sm">{view.label}</span>
                            </label>
                          ))}
                        </div>
                      </div>

                      <div>
                        <h3 className="font-medium text-g7-charcoal mb-3">Amenities</h3>
                        <div className="space-y-2">
                          {allAmenities.slice(0, 6).map((amenity) => (
                            <label
                              key={amenity}
                              className="flex items-center gap-2 cursor-pointer"
                            >
                              <Checkbox
                                checked={selectedAmenities.includes(amenity)}
                                onCheckedChange={() => toggleAmenity(amenity)}
                              />
                              <span className="text-sm">{amenity}</span>
                            </label>
                          ))}
                        </div>
                      </div>

                      <Button
                        onClick={() => {
                          clearFilters();
                          setMobileFiltersOpen(false);
                        }}
                        variant="outline"
                        className="w-full"
                      >
                        Clear All Filters
                      </Button>
                    </div>
                  </SheetContent>
                </Sheet>
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
            ) : rooms.length === 0 ? (
              /* Empty State */
              <div className="text-center py-16">
                <BedDouble className="h-16 w-16 mx-auto text-g7-gold/30 mb-4" />
                <h3 className="font-serif text-2xl text-g7-charcoal mb-2">
                  No rooms found
                </h3>
                <p className="text-g7-charcoal/60 mb-6">
                  Try adjusting your filters to see more results
                </p>
                <Button onClick={clearFilters} variant="outline">
                  Clear Filters
                </Button>
              </div>
            ) : (
              /* Room Grid/List */
              <div
                className={cn(
                  viewMode === 'grid'
                    ? 'grid grid-cols-1 md:grid-cols-2 gap-6'
                    : 'space-y-6'
                )}
              >
                {rooms.map((room) => (
                  <RoomCard
                    key={room.id}
                    room={room}
                    variant={viewMode}
                    showPrice={true}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
