'use client';

import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { motion } from 'framer-motion';
import Link from 'next/link';
import {
  UtensilsCrossed,
  Filter,
  Grid,
  List,
  SlidersHorizontal,
  X,
  Clock,
  Star,
} from 'lucide-react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { PageHero } from '@/components/common/HeroSection';
import { DiningCard } from '@/components/dining/DiningCard';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { Checkbox } from '@/components/ui/checkbox';
import { cn } from '@/lib/utils';
import type { Restaurant } from '@/types';

/**
 * G7 Hotels Dining & Restaurants Page
 * Restaurant listings with filters and table booking
 */

const cuisineTypes = [
  'Indian',
  'Continental',
  'Chinese',
  'Japanese',
  'Italian',
  'French',
  'Mediterranean',
  'Thai',
  'Fusion',
  'Mexican',
];

const mealTypes = [
  'Breakfast',
  'Lunch',
  'Dinner',
  'Brunch',
  'High Tea',
  'All Day',
];

const dietaryOptions = [
  'Vegetarian',
  'Vegan',
  'Gluten-Free',
  'Dairy-Free',
  'Nut-Free',
  'Halal',
  'Kosher',
];

export default function DiningPage() {
  const searchParams = useSearchParams();
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  // Filters state
  const [selectedCuisines, setSelectedCuisines] = useState<string[]>([]);
  const [selectedMealTypes, setSelectedMealTypes] = useState<string[]>([]);
  const [selectedDietary, setSelectedDietary] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<string>('all');
  const [sortBy, setSortBy] = useState('featured');

  // Mock data - In production, this would come from API
  const mockRestaurants: Restaurant[] = [
    {
      id: '1',
      name: 'The Golden Fork',
      description: 'Experience world-class culinary excellence at our signature fine dining restaurant. Our award-winning chefs create innovative dishes using the finest seasonal ingredients, complemented by an extensive wine list featuring over 500 selections from around the world.',
      shortDescription: 'Award-winning fine dining with innovative cuisine and extensive wine selection.',
      cuisine: ['Modern European', 'Fusion'],
      mealTypes: ['dinner'],
      images: ['/images/dining/fine-dining.jpg'],
      capacity: 80,
      openingHours: {
        monday: { open: '18:00', close: '23:00' },
        tuesday: { open: '18:00', close: '23:00' },
        wednesday: { open: '18:00', close: '23:00' },
        thursday: { open: '18:00', close: '23:00' },
        friday: { open: '18:00', close: '23:30' },
        saturday: { open: '18:00', close: '23:30' },
        sunday: { open: '18:00', close: '22:00' },
      },
      dressCode: 'Smart Casual',
      priceRange: '$$$$',
      features: ['Outdoor Seating', 'Private Dining', 'Wine Cellar', 'Live Music'],
      dietaryOptions: ['Vegetarian', 'Gluten-Free', 'Vegan'],
      tableBooking: {
        enabled: true,
        minGuests: 1,
        maxGuests: 20,
        depositRequired: false,
      },
      featured: true,
      location: 'Ground Floor, Main Building',
      rating: 4.8,
      reviewCount: 342,
    },
    {
      id: '2',
      name: 'Terrace Grill',
      description: 'Enjoy premium grilled specialties under the stars at our alfresco restaurant. Featuring prime cuts, fresh seafood, and seasonal vegetables cooked to perfection over our custom-built charcoal grill, all while enjoying stunning views of the city skyline.',
      shortDescription: 'Al fresco dining with premium grilled specialties and stunning city views.',
      cuisine: ['Grill', 'Steakhouse'],
      mealTypes: ['lunch', 'dinner'],
      images: ['/images/dining/fine-dining.jpg'],
      capacity: 120,
      openingHours: {
        monday: { open: '12:00', close: '23:00' },
        tuesday: { open: '12:00', close: '23:00' },
        wednesday: { open: '12:00', close: '23:00' },
        thursday: { open: '12:00', close: '23:00' },
        friday: { open: '12:00', close: '00:00' },
        saturday: { open: '12:00', close: '00:00' },
        sunday: { open: '12:00', close: '22:00' },
      },
      dressCode: 'Casual',
      priceRange: '$$$',
      features: ['Outdoor Seating', 'Bar', 'Cocktails', 'Views'],
      dietaryOptions: ['Vegetarian', 'Gluten-Free'],
      tableBooking: {
        enabled: true,
        minGuests: 1,
        maxGuests: 50,
        depositRequired: false,
      },
      featured: true,
      location: 'Rooftop, Tower B',
      rating: 4.6,
      reviewCount: 289,
    },
    {
      id: '3',
      name: 'Spice Garden',
      description: 'Embark on a culinary journey through the rich flavors of India. Our authentic Indian restaurant features traditional recipes passed down through generations, prepared with aromatic spices imported directly from India.',
      shortDescription: 'Authentic Indian cuisine with traditional recipes and aromatic spices.',
      cuisine: ['Indian'],
      mealTypes: ['lunch', 'dinner'],
      images: ['/images/dining/fine-dining.jpg'],
      capacity: 60,
      openingHours: {
        monday: { open: '12:00', close: '22:30' },
        tuesday: { open: '12:00', close: '22:30' },
        wednesday: { open: '12:00', close: '22:30' },
        thursday: { open: '12:00', close: '22:30' },
        friday: { open: '12:00', close: '23:00' },
        saturday: { open: '12:00', close: '23:00' },
        sunday: { open: '12:00', close: '22:30' },
      },
      dressCode: 'Smart Casual',
      priceRange: '$$',
      features: ['Private Dining', 'Takeaway', 'Catering'],
      dietaryOptions: ['Vegetarian', 'Vegan', 'Gluten-Free', 'Halal'],
      tableBooking: {
        enabled: true,
        minGuests: 2,
        maxGuests: 30,
        depositRequired: false,
      },
      featured: false,
      location: 'First Floor, Tower A',
      rating: 4.7,
      reviewCount: 198,
    },
  ];

  useEffect(() => {
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setRestaurants(mockRestaurants);
      setLoading(false);
    }, 500);
  }, []);

  const toggleCuisine = (cuisine: string) => {
    setSelectedCuisines((prev) =>
      prev.includes(cuisine) ? prev.filter((c) => c !== cuisine) : [...prev, cuisine]
    );
  };

  const toggleMealType = (type: string) => {
    setSelectedMealTypes((prev) =>
      prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]
    );
  };

  const toggleDietary = (option: string) => {
    setSelectedDietary((prev) =>
      prev.includes(option) ? prev.filter((d) => d !== option) : [...prev, option]
    );
  };

  const clearFilters = () => {
    setSelectedCuisines([]);
    setSelectedMealTypes([]);
    setSelectedDietary([]);
    setPriceRange('all');
  };

  const activeFiltersCount =
    selectedCuisines.length + selectedMealTypes.length + selectedDietary.length + (priceRange !== 'all' ? 1 : 0);

  return (
    <div className="min-h-screen flex flex-col bg-g7-ivory">
      <Header />

      {/* Page Hero */}
      <PageHero
        title="Dining & Restaurants"
        subtitle="Exquisite Culinary Experiences"
        backgroundImage="/images/dining/fine-dining.jpg"
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Dining' },
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

              {/* Cuisine Type */}
              <div>
                <h3 className="font-medium text-g7-charcoal mb-3 flex items-center gap-2">
                  <UtensilsCrossed className="h-4 w-4" />
                  Cuisine
                </h3>
                <div className="space-y-2 max-h-60 overflow-y-auto">
                  {cuisineTypes.map((cuisine) => (
                    <label
                      key={cuisine}
                      className="flex items-center gap-2 cursor-pointer group"
                    >
                      <Checkbox
                        checked={selectedCuisines.includes(cuisine)}
                        onCheckedChange={() => toggleCuisine(cuisine)}
                        className="border-g7-gold/50 data-[state=checked]:bg-g7-gold data-[state=checked]:border-g7-gold"
                      />
                      <span className="text-sm text-g7-charcoal/80 group-hover:text-g7-charcoal">
                        {cuisine}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Meal Type */}
              <div>
                <h3 className="font-medium text-g7-charcoal mb-3 flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  Meal Type
                </h3>
                <div className="space-y-2">
                  {mealTypes.map((type) => (
                    <label
                      key={type}
                      className="flex items-center gap-2 cursor-pointer group"
                    >
                      <Checkbox
                        checked={selectedMealTypes.includes(type)}
                        onCheckedChange={() => toggleMealType(type)}
                        className="border-g7-gold/50 data-[state=checked]:bg-g7-gold data-[state=checked]:border-g7-gold"
                      />
                      <span className="text-sm text-g7-charcoal/80 group-hover:text-g7-charcoal">
                        {type}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Price Range */}
              <div>
                <h3 className="font-medium text-g7-charcoal mb-3">Price Range</h3>
                <Select value={priceRange} onValueChange={setPriceRange}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Prices</SelectItem>
                    <SelectItem value="$">Budget ($)</SelectItem>
                    <SelectItem value="$$">Moderate ($$)</SelectItem>
                    <SelectItem value="$$$">Expensive ($$$)</SelectItem>
                    <SelectItem value="$$$$">Fine Dining ($$$$)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Dietary Options */}
              <div>
                <h3 className="font-medium text-g7-charcoal mb-3">Dietary Options</h3>
                <div className="space-y-2">
                  {dietaryOptions.map((option) => (
                    <label
                      key={option}
                      className="flex items-center gap-2 cursor-pointer group"
                    >
                      <Checkbox
                        checked={selectedDietary.includes(option)}
                        onCheckedChange={() => toggleDietary(option)}
                        className="border-g7-gold/50 data-[state=checked]:bg-g7-gold data-[state=checked]:border-g7-gold"
                      />
                      <span className="text-sm text-g7-charcoal/80 group-hover:text-g7-charcoal">
                        {option}
                      </span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </aside>

          {/* Restaurant Listings */}
          <div className="flex-1">
            {/* Results Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
              <div>
                <p className="text-g7-charcoal/60">
                  {restaurants.length} {restaurants.length === 1 ? 'restaurant' : 'restaurants'} found
                </p>
                {activeFiltersCount > 0 && (
                  <p className="text-sm text-g7-gold mt-1">
                    {activeFiltersCount} filter{activeFiltersCount !== 1 ? 's' : ''} applied
                  </p>
                )}
              </div>

              <div className="flex items-center gap-3">
                {/* Sort */}
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-[160px]">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="featured">Featured</SelectItem>
                    <SelectItem value="rating">Rating</SelectItem>
                    <SelectItem value="name">Name</SelectItem>
                    <SelectItem value="price-low">Price: Low to High</SelectItem>
                    <SelectItem value="price-high">Price: High to Low</SelectItem>
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
                        <h3 className="font-medium text-g7-charcoal mb-3">Cuisine</h3>
                        <div className="space-y-2 max-h-40 overflow-y-auto">
                          {cuisineTypes.map((cuisine) => (
                            <label
                              key={cuisine}
                              className="flex items-center gap-2 cursor-pointer"
                            >
                              <Checkbox
                                checked={selectedCuisines.includes(cuisine)}
                                onCheckedChange={() => toggleCuisine(cuisine)}
                              />
                              <span className="text-sm">{cuisine}</span>
                            </label>
                          ))}
                        </div>
                      </div>

                      <div>
                        <h3 className="font-medium text-g7-charcoal mb-3">Meal Type</h3>
                        <div className="space-y-2">
                          {mealTypes.map((type) => (
                            <label
                              key={type}
                              className="flex items-center gap-2 cursor-pointer"
                            >
                              <Checkbox
                                checked={selectedMealTypes.includes(type)}
                                onCheckedChange={() => toggleMealType(type)}
                              />
                              <span className="text-sm">{type}</span>
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
                {[...Array(3)].map((_, i) => (
                  <div
                    key={i}
                    className="bg-white rounded-lg h-96 animate-pulse"
                  />
                ))}
              </div>
            ) : restaurants.length === 0 ? (
              /* Empty State */
              <div className="text-center py-16">
                <UtensilsCrossed className="h-16 w-16 mx-auto text-g7-gold/30 mb-4" />
                <h3 className="font-serif text-2xl text-g7-charcoal mb-2">
                  No restaurants found
                </h3>
                <p className="text-g7-charcoal/60 mb-6">
                  Try adjusting your filters to see more results
                </p>
                <Button onClick={clearFilters} variant="outline">
                  Clear Filters
                </Button>
              </div>
            ) : (
              /* Restaurant Grid/List */
              <div
                className={cn(
                  viewMode === 'grid'
                    ? 'grid grid-cols-1 md:grid-cols-2 gap-6'
                    : 'space-y-6'
                )}
              >
                {restaurants.map((restaurant) => (
                  <DiningCard
                    key={restaurant.id}
                    restaurant={restaurant}
                    variant={viewMode}
                    showBooking={true}
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
