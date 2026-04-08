'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  UtensilsCrossed,
  Clock,
  MapPin,
  Filter,
  Grid,
  List,
  Search,
  Star,
} from 'lucide-react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { PageHero } from '@/components/common/HeroSection';
import { RestaurantCard } from '@/components/dining/RestaurantCard';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
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

/**
 * G7 Hotels Dining & Restaurants Page
 * Complete restaurant listing with filters and search
 */

const cuisineTypes = [
  { value: 'indian', label: 'Indian' },
  { value: 'continental', label: 'Continental' },
  { value: 'chinese', label: 'Chinese' },
  { value: 'japanese', label: 'Japanese' },
  { value: 'italian', label: 'Italian' },
  { value: 'french', label: 'French' },
  { value: 'mediterranean', label: 'Mediterranean' },
  { value: 'thai', label: 'Thai' },
  { value: 'fusion', label: 'Fusion' },
];

const mealTypes = [
  { value: 'breakfast', label: 'Breakfast' },
  { value: 'lunch', label: 'Lunch' },
  { value: 'dinner', label: 'Dinner' },
  { value: 'brunch', label: 'Brunch' },
  { value: 'high-tea', label: 'High Tea' },
  { value: 'all-day', label: 'All Day Dining' },
];

const priceRanges = [
  { value: '$', label: '$ - Budget' },
  { value: '$$', label: '$$ - Moderate' },
  { value: '$$$', label: '$$$ - Fine Dining' },
  { value: '$$$$', label: '$$$$ - Luxury' },
];

export default function DiningPage() {
  const [restaurants, setRestaurants] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // Filters
  const [selectedCuisines, setSelectedCuisines] = useState<string[]>([]);
  const [selectedMealTypes, setSelectedMealTypes] = useState<string[]>([]);
  const [selectedPriceRanges, setSelectedPriceRanges] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState('featured');

  useEffect(() => {
    fetchRestaurants();
  }, []);

  const fetchRestaurants = async () => {
    setLoading(true);
    try {
      // Mock data - in production, this would come from API
      const mockRestaurants = [
        {
          id: '1',
          name: 'The Golden Fork',
          description: 'Award-winning fine dining with innovative European fusion cuisine and impeccable service in an elegant setting.',
          cuisine: ['continental', 'french'],
          images: ['/images/dining/fine-dining.jpg'],
          priceRange: '$$$$',
          mealTypes: ['dinner'],
          openingHours: {
            monday: { open: '18:00', close: '23:00' },
            tuesday: { open: '18:00', close: '23:00' },
            wednesday: { open: '18:00', close: '23:00' },
            thursday: { open: '18:00', close: '23:00' },
            friday: { open: '18:00', close: '23:00' },
            saturday: { open: '18:00', close: '00:00' },
            sunday: { open: '18:00', close: '22:00' },
          },
          chef: {
            name: 'Michel Laurent',
            title: 'Executive Chef',
          },
          rating: 4.8,
          reviewCount: 234,
          featured: true,
          tableBookingEnabled: true,
        },
        {
          id: '2',
          name: 'Terrace Grill',
          description: 'Al fresco dining with stunning views and premium grilled selections, perfect for romantic evenings.',
          cuisine: ['continental'],
          images: ['/images/dining/fine-dining.jpg'],
          priceRange: '$$$',
          mealTypes: ['dinner', 'lunch'],
          openingHours: {
            monday: { open: '12:00', close: '23:00' },
            tuesday: { open: '12:00', close: '23:00' },
            wednesday: { open: '12:00', close: '23:00' },
            thursday: { open: '12:00', close: '23:00' },
            friday: { open: '12:00', close: '00:00' },
            saturday: { open: '11:00', close: '00:00' },
            sunday: { open: '11:00', close: '22:00' },
          },
          chef: {
            name: 'Alex Chen',
            title: 'Head Chef',
          },
          rating: 4.6,
          reviewCount: 189,
          featured: true,
          tableBookingEnabled: true,
        },
        {
          id: '3',
          name: 'Spice Garden',
          description: 'Authentic Indian cuisine with a modern twist, featuring regional specialties and tandoori specialties.',
          cuisine: ['indian'],
          images: ['/images/dining/fine-dining.jpg'],
          priceRange: '$$',
          mealTypes: ['lunch', 'dinner'],
          openingHours: {
            monday: { open: '11:00', close: '22:30' },
            tuesday: { open: '11:00', close: '22:30' },
            wednesday: { open: '11:00', close: '22:30' },
            thursday: { open: '11:00', close: '22:30' },
            friday: { open: '11:00', close: '23:00' },
            saturday: { open: '10:00', close: '23:00' },
            sunday: { open: '10:00', close: '22:30' },
          },
          chef: {
            name: 'Vikram Singh',
            title: 'Chef de Cuisine',
          },
          rating: 4.7,
          reviewCount: 156,
          featured: false,
          tableBookingEnabled: true,
        },
        {
          id: '4',
          name: 'Imperial Lounge',
          description: 'Elegant afternoon tea and light bites in a refined setting with panoramic city views.',
          cuisine: ['continental', 'fusion'],
          images: ['/images/dining/fine-dining.jpg'],
          priceRange: '$$$',
          mealTypes: ['breakfast', 'high-tea', 'all-day'],
          openingHours: {
            monday: { open: '07:00', close: '22:00' },
            tuesday: { open: '07:00', close: '22:00' },
            wednesday: { open: '07:00', close: '22:00' },
            thursday: { open: '07:00', close: '22:00' },
            friday: { open: '07:00', close: '23:00' },
            saturday: { open: '07:00', close: '23:00' },
            sunday: { open: '08:00', close: '21:00' },
          },
          rating: 4.5,
          reviewCount: 98,
          featured: false,
          tableBookingEnabled: true,
        },
      ];

      setRestaurants(mockRestaurants);
    } catch (error) {
      console.error('Error fetching restaurants:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredRestaurants = restaurants.filter((restaurant) => {
    // Search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      const matchesSearch =
        restaurant.name.toLowerCase().includes(query) ||
        restaurant.description.toLowerCase().includes(query) ||
        restaurant.cuisine.some((c: string) => c.toLowerCase().includes(query));
      if (!matchesSearch) return false;
    }

    // Cuisine filter
    if (selectedCuisines.length > 0) {
      const matchesCuisine = selectedCuisines.some((cuisine) =>
        restaurant.cuisine.includes(cuisine)
      );
      if (!matchesCuisine) return false;
    }

    // Meal type filter
    if (selectedMealTypes.length > 0) {
      const matchesMeal = selectedMealTypes.some((meal) =>
        restaurant.mealTypes.includes(meal)
      );
      if (!matchesMeal) return false;
    }

    // Price range filter
    if (selectedPriceRanges.length > 0) {
      if (!selectedPriceRanges.includes(restaurant.priceRange)) return false;
    }

    return true;
  });

  const activeFiltersCount =
    selectedCuisines.length +
    selectedMealTypes.length +
    selectedPriceRanges.length;

  const clearFilters = () => {
    setSelectedCuisines([]);
    setSelectedMealTypes([]);
    setSelectedPriceRanges([]);
    setSearchQuery('');
  };

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

              {/* Cuisine */}
              <div>
                <h3 className="font-medium text-g7-charcoal mb-3 flex items-center gap-2">
                  <UtensilsCrossed className="h-4 w-4" />
                  Cuisine
                </h3>
                <div className="space-y-2">
                  {cuisineTypes.map((cuisine) => (
                    <label
                      key={cuisine.value}
                      className="flex items-center gap-2 cursor-pointer group"
                    >
                      <Checkbox
                        checked={selectedCuisines.includes(cuisine.value)}
                        onCheckedChange={() =>
                          setSelectedCuisines((prev) =>
                            prev.includes(cuisine.value)
                              ? prev.filter((c) => c !== cuisine.value)
                              : [...prev, cuisine.value]
                          )
                        }
                        className="border-g7-gold/50 data-[state=checked]:bg-g7-gold data-[state=checked]:border-g7-gold"
                      />
                      <span className="text-sm text-g7-charcoal/80 group-hover:text-g7-charcoal">
                        {cuisine.label}
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
                  {mealTypes.map((meal) => (
                    <label
                      key={meal.value}
                      className="flex items-center gap-2 cursor-pointer group"
                    >
                      <Checkbox
                        checked={selectedMealTypes.includes(meal.value)}
                        onCheckedChange={() =>
                          setSelectedMealTypes((prev) =>
                            prev.includes(meal.value)
                              ? prev.filter((m) => m !== meal.value)
                              : [...prev, meal.value]
                          )
                        }
                        className="border-g7-gold/50 data-[state=checked]:bg-g7-gold data-[state=checked]:border-g7-gold"
                      />
                      <span className="text-sm text-g7-charcoal/80 group-hover:text-g7-charcoal">
                        {meal.label}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Price Range */}
              <div>
                <h3 className="font-medium text-g7-charcoal mb-3">Price Range</h3>
                <div className="space-y-2">
                  {priceRanges.map((price) => (
                    <label
                      key={price.value}
                      className="flex items-center gap-2 cursor-pointer group"
                    >
                      <Checkbox
                        checked={selectedPriceRanges.includes(price.value)}
                        onCheckedChange={() =>
                          setSelectedPriceRanges((prev) =>
                            prev.includes(price.value)
                              ? prev.filter((p) => p !== price.value)
                              : [...prev, price.value]
                          )
                        }
                        className="border-g7-gold/50 data-[state=checked]:bg-g7-gold data-[state=checked]:border-g7-gold"
                      />
                      <span className="text-sm text-g7-charcoal/80 group-hover:text-g7-charcoal">
                        {price.label}
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
              <div className="flex-1">
                <Input
                  placeholder="Search restaurants, cuisines..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="max-w-md"
                  icon={<Search className="h-4 w-4" />}
                />
                <p className="text-g7-charcoal/60 mt-2">
                  {filteredRestaurants.length}{' '}
                  {filteredRestaurants.length === 1 ? 'restaurant' : 'restaurants'}{' '}
                  found
                  {activeFiltersCount > 0 && (
                    <span className="text-g7-gold ml-2">
                      ({activeFiltersCount} filter{activeFiltersCount !== 1 ? 's' : ''})
                    </span>
                  )}
                </p>
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
                    <SelectItem value="price-low">Price: Low to High</SelectItem>
                    <SelectItem value="price-high">Price: High to Low</SelectItem>
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
                        <h3 className="font-medium text-g7-charcoal mb-3">Cuisine</h3>
                        <div className="space-y-2">
                          {cuisineTypes.map((cuisine) => (
                            <label
                              key={cuisine.value}
                              className="flex items-center gap-2 cursor-pointer"
                            >
                              <Checkbox
                                checked={selectedCuisines.includes(cuisine.value)}
                                onCheckedChange={() =>
                                  setSelectedCuisines((prev) =>
                                    prev.includes(cuisine.value)
                                      ? prev.filter((c) => c !== cuisine.value)
                                      : [...prev, cuisine.value]
                                  )
                                }
                              />
                              <span className="text-sm">{cuisine.label}</span>
                            </label>
                          ))}
                        </div>
                      </div>

                      <div>
                        <h3 className="font-medium text-g7-charcoal mb-3">Meal Type</h3>
                        <div className="space-y-2">
                          {mealTypes.map((meal) => (
                            <label
                              key={meal.value}
                              className="flex items-center gap-2 cursor-pointer"
                            >
                              <Checkbox
                                checked={selectedMealTypes.includes(meal.value)}
                                onCheckedChange={() =>
                                  setSelectedMealTypes((prev) =>
                                    prev.includes(meal.value)
                                      ? prev.filter((m) => m !== meal.value)
                                      : [...prev, meal.value]
                                  )
                                }
                              />
                              <span className="text-sm">{meal.label}</span>
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
            ) : filteredRestaurants.length === 0 ? (
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
                {filteredRestaurants.map((restaurant) => (
                  <RestaurantCard key={restaurant.id} {...restaurant} />
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
