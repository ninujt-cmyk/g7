'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  Clock,
  MapPin,
  Star,
  Heart,
  ChevronRight,
  UtensilsCrossed,
  Calendar,
  Menu as MenuIcon,
  Phone,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Card,
  CardContent,
  CardFooter,
} from '@/components/ui/card';
import { cn } from '@/lib/utils';
import type { Restaurant } from '@/types';

/**
 * G7 Hotels Restaurant Card Component
 * Elegant restaurant listing card with hover effects and booking CTA
 */

interface RestaurantCardProps {
  restaurant: Restaurant;
  onFavorite?: (restaurantId: string) => void;
  isFavorite?: boolean;
}

const cuisineColors: Record<string, string> = {
  indian: 'bg-orange-100 text-orange-800 border-orange-200',
  continental: 'bg-blue-100 text-blue-800 border-blue-200',
  chinese: 'bg-red-100 text-red-800 border-red-200',
  japanese: 'bg-pink-100 text-pink-800 border-pink-200',
  italian: 'bg-green-100 text-green-800 border-green-200',
  french: 'bg-purple-100 text-purple-800 border-purple-200',
  mediterranean: 'bg-amber-100 text-amber-800 border-amber-200',
  thai: 'bg-yellow-100 text-yellow-800 border-yellow-200',
  fusion: 'bg-cyan-100 text-cyan-800 border-cyan-200',
};

const mealTypeLabels: Record<string, string> = {
  breakfast: 'Breakfast',
  lunch: 'Lunch',
  dinner: 'Dinner',
  brunch: 'Brunch',
  'high-tea': 'High Tea',
  'all-day': 'All Day',
};

const priceRangeLabels: Record<string, string> = {
  $: 'Budget-Friendly',
  $$: 'Moderate',
  $$$: 'Upscale',
  $$$$: 'Fine Dining',
};

export function RestaurantCard({
  restaurant,
  onFavorite,
  isFavorite = false,
}: RestaurantCardProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  
  // Check if restaurant is currently open
  const isOpen = () => {
    const now = new Date();
    const day = now.toLocaleDateString('en-US', { weekday: 'long' }).toLowerCase();
    const currentTime = now.toTimeString().slice(0, 5);
    
    const hours = restaurant.openingHours[day];
    if (!hours || hours.closed) return false;
    
    return currentTime >= hours.open && currentTime <= hours.close;
  };

  const displayCuisines = restaurant.cuisine.slice(0, 2);
  const displayMealTypes = restaurant.mealTypes.slice(0, 2);
  const mainImage = restaurant.images[currentImageIndex] || '/images/dining/default-restaurant.jpg';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.6 }}
      className="group"
    >
      <Card className="overflow-hidden border-0 shadow-lg hover:shadow-2xl transition-all duration-500 bg-white group-hover:-translate-y-1">
        {/* Image Section */}
        <div className="relative aspect-[16/10] overflow-hidden">
          <Link href={`/dining/${restaurant.id}`}>
            <div className="relative w-full h-full img-zoom-container">
              <img
                src={mainImage}
                alt={restaurant.name}
                className="w-full h-full object-cover transition-transform duration-700"
              />
            </div>
          </Link>

          {/* Badges */}
          <div className="absolute top-4 left-4 flex flex-col gap-2">
            {restaurant.featured && (
              <Badge className="bg-g7-gold text-g7-charcoal hover:bg-g7-gold-light">
                Featured
              </Badge>
            )}
            <Badge
              variant="secondary"
              className={cn(
                'bg-black/70 text-white hover:bg-black/80',
                isOpen() ? 'border-l-4 border-green-500' : 'border-l-4 border-red-500'
              )}
            >
              {isOpen() ? 'Open Now' : 'Closed'}
            </Badge>
          </div>

          {/* Price Range Badge */}
          <div className="absolute top-4 right-4">
            <Badge className="bg-white/90 text-g7-charcoal hover:bg-white border-g7-gold/50">
              {restaurant.priceRange} · {priceRangeLabels[restaurant.priceRange]}
            </Badge>
          </div>

          {/* Favorite Button */}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onFavorite?.(restaurant.id)}
            className="absolute bottom-4 right-4 bg-white/90 hover:bg-white text-g7-charcoal hover:text-red-500 transition-colors"
          >
            <Heart className={cn('h-5 w-5', isFavorite && 'fill-current text-red-500')} />
          </Button>

          {/* View Indicator */}
          {restaurant.images.length > 1 && (
            <div className="absolute bottom-4 left-4 flex gap-1">
              {restaurant.images.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentImageIndex(index)}
                  className={cn(
                    'w-2 h-2 rounded-full transition-all',
                    index === currentImageIndex
                      ? 'bg-g7-gold w-6'
                      : 'bg-white/50 hover:bg-white'
                  )}
                />
              ))}
            </div>
          )}

          {/* Rating */}
          {restaurant.chef && (
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/70 text-white px-3 py-1 rounded-full flex items-center gap-2 text-sm">
              <Star className="h-4 w-4 fill-g7-gold text-g7-gold" />
              <span className="font-medium">Chef's Table</span>
            </div>
          )}
        </div>

        {/* Content Section */}
        <div className="p-6">
          <CardContent className="p-0 mb-4">
            {/* Header */}
            <div className="flex items-start justify-between gap-4 mb-3">
              <div className="flex-1">
                <Link href={`/dining/${restaurant.id}`}>
                  <h3 className="font-serif text-2xl text-g7-charcoal group-hover:text-g7-gold transition-colors mb-1">
                    {restaurant.name}
                  </h3>
                </Link>
                <div className="flex items-center gap-2 text-sm text-g7-charcoal/70">
                  <MapPin className="h-4 w-4 text-g7-gold" />
                  <span>Main Building, {restaurant.capacity} seats</span>
                </div>
              </div>
            </div>

            {/* Cuisine Type Badges */}
            <div className="flex flex-wrap gap-2 mb-3">
              {displayCuisines.map((cuisine) => (
                <Badge
                  key={cuisine}
                  variant="outline"
                  className={cn(
                    'capitalize text-xs',
                    cuisineColors[cuisine] || 'bg-gray-100 text-gray-800 border-gray-200'
                  )}
                >
                  {cuisine}
                </Badge>
              ))}
              {restaurant.cuisine.length > 2 && (
                <Badge variant="outline" className="text-xs text-g7-charcoal/70">
                  +{restaurant.cuisine.length - 2} more
                </Badge>
              )}
            </div>

            {/* Meal Types */}
            <div className="flex flex-wrap gap-2 mb-4">
              {displayMealTypes.map((mealType) => (
                <div
                  key={mealType}
                  className="flex items-center gap-1 text-xs text-g7-charcoal/70"
                >
                  <UtensilsCrossed className="h-3 w-3 text-g7-gold" />
                  <span>{mealTypeLabels[mealType]}</span>
                </div>
              ))}
              {restaurant.mealTypes.length > 2 && (
                <span className="text-xs text-g7-gold">
                  +{restaurant.mealTypes.length - 2} more
                </span>
              )}
            </div>

            {/* Description */}
            <p className="text-g7-charcoal/80 leading-relaxed mb-4 line-clamp-2">
              {restaurant.shortDescription}
            </p>

            {/* Opening Hours */}
            <div className="flex items-center gap-2 text-sm text-g7-charcoal/70 mb-3">
              <Clock className="h-4 w-4 text-g7-gold" />
              <span>
                {restaurant.openingHours.monday?.open || '07:00'} - {restaurant.openingHours.monday?.close || '23:00'}
              </span>
            </div>

            {/* Dietary Options */}
            {restaurant.dietaryOptions.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-4">
                {restaurant.dietaryOptions.slice(0, 3).map((dietary) => (
                  <span
                    key={dietary}
                    className="text-xs px-2 py-1 bg-g7-emerald/10 text-g7-emerald rounded-full capitalize"
                  >
                    {dietary}
                  </span>
                ))}
                {restaurant.dietaryOptions.length > 3 && (
                  <span className="text-xs text-g7-charcoal/70">
                    +{restaurant.dietaryOptions.length - 3} more
                  </span>
                )}
              </div>
            )}
          </CardContent>

          {/* Footer */}
          <CardFooter className="p-0 pt-4 flex flex-col sm:flex-row gap-3 border-t border-g7-charcoal/10">
            <Button
              asChild
              variant="outline"
              className="flex-1 border-g7-gold text-g7-charcoal hover:bg-g7-gold hover:text-g7-charcoal"
            >
              <Link href={`/dining/${restaurant.id}#menu`}>
                <MenuIcon className="mr-2 h-4 w-4" />
                View Menu
              </Link>
            </Button>
            {restaurant.tableBooking.enabled && (
              <Button
                asChild
                className="flex-1 bg-g7-charcoal text-g7-ivory hover:bg-g7-gold hover:text-g7-charcoal"
              >
                <Link href={`/dining/${restaurant.id}#book`}>
                  <Calendar className="mr-2 h-4 w-4" />
                  Reserve a Table
                </Link>
              </Button>
            )}
            <Button
              variant="ghost"
              size="icon"
              className="flex-shrink-0 text-g7-charcoal/60 hover:text-g7-gold"
              asChild
            >
              <Link href={`tel:+1234567890`}>
                <Phone className="h-4 w-4" />
              </Link>
            </Button>
          </CardFooter>
        </div>
      </Card>
    </motion.div>
  );
}

/**
 * Featured Restaurant Card - More prominent for homepage
 */
export function FeaturedRestaurantCard({ restaurant }: { restaurant: Restaurant }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="group relative overflow-hidden rounded-lg aspect-[16/9] cursor-pointer"
    >
      <Link href={`/dining/${restaurant.id}`}>
        <div className="relative w-full h-full img-zoom-container">
          <img
            src={restaurant.images[0] || '/images/dining/default-restaurant.jpg'}
            alt={restaurant.name}
            className="w-full h-full object-cover transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
        </div>

        <div className="absolute top-4 left-4 flex flex-col gap-2">
          {restaurant.featured && (
            <Badge className="bg-g7-gold text-g7-charcoal hover:bg-g7-gold-light">
              Featured
            </Badge>
          )}
          <Badge className="bg-white/90 text-g7-charcapital">
            {restaurant.priceRange}
          </Badge>
        </div>

        <div className="absolute bottom-0 left-0 right-0 p-6">
          <div className="flex flex-wrap gap-2 mb-3">
            {restaurant.cuisine.slice(0, 2).map((cuisine) => (
              <Badge
                key={cuisine}
                variant="outline"
                className={cn(
                  'capitalize bg-white/10 text-white border-white/30',
                  cuisineColors[cuisine]?.replace('text-', 'text-white/90 ')
                )}
              >
                {cuisine}
              </Badge>
            ))}
          </div>
          
          <h3 className="font-serif text-3xl text-white mb-2 group-hover:text-g7-gold transition-colors">
            {restaurant.name}
          </h3>
          <p className="text-white/80 text-sm mb-3 line-clamp-2">
            {restaurant.shortDescription}
          </p>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-white/70 text-sm">
              <Clock className="h-4 w-4" />
              <span>{restaurant.openingHours.monday?.open} - {restaurant.openingHours.monday?.close}</span>
            </div>
            <ChevronRight className="h-5 w-5 text-g7-gold transform group-hover:translate-x-2 transition-transform" />
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
