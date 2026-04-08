'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  UtensilsCrossed,
  Clock,
  MapPin,
  Star,
  Heart,
  ChevronRight,
  Phone,
  Calendar,
  Users,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import type { Restaurant } from '@/types';

/**
 * G7 Hotels Dining Card Component
 * Restaurant listing card with booking and details
 */

interface DiningCardProps {
  restaurant: Restaurant;
  variant?: 'grid' | 'list';
  showBooking?: boolean;
  onFavorite?: (restaurantId: string) => void;
  isFavorite?: boolean;
}

const priceRangeSymbols = {
  '$': 'Budget',
  '$$': 'Moderate',
  '$$$': 'Expensive',
  '$$$$': 'Fine Dining',
};

export function DiningCard({
  restaurant,
  variant = 'grid',
  showBooking = true,
  onFavorite,
  isFavorite = false,
}: DiningCardProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const mainImage = restaurant.images[0] || '/images/dining/fine-dining.jpg';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className={cn(
        'group',
        variant === 'list' && 'flex flex-col md:flex-row'
      )}
    >
      <Card className={cn(
        'overflow-hidden border-0 shadow-lg hover:shadow-2xl transition-all duration-500 bg-white',
        'group-hover:-translate-y-1',
        variant === 'list' && 'flex flex-col md:flex-row w-full'
      )}>
        {/* Image Section */}
        <div className={cn(
          'relative overflow-hidden',
          variant === 'list' ? 'md:w-2/5' : 'aspect-[4/3]'
        )}>
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
            {restaurant.priceRange && (
              <Badge variant="secondary" className="bg-black/70 text-white">
                {priceRangeSymbols[restaurant.priceRange] || restaurant.priceRange}
              </Badge>
            )}
          </div>

          {/* Favorite Button */}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onFavorite?.(restaurant.id)}
            className="absolute top-4 right-4 bg-white/90 hover:bg-white text-g7-charcoal hover:text-red-500 transition-colors"
          >
            <Heart className={cn('h-5 w-5', isFavorite && 'fill-current text-red-500')} />
          </Button>

          {/* Rating */}
          {restaurant.rating && restaurant.rating > 0 && (
            <div className="absolute bottom-4 left-4 bg-black/70 text-white px-3 py-1 rounded-full flex items-center gap-1 text-sm">
              <Star className="h-4 w-4 fill-g7-gold text-g7-gold" />
              <span className="font-medium">{restaurant.rating}</span>
            </div>
          )}
        </div>

        {/* Content Section */}
        <div className={cn(
          'flex flex-col p-6',
          variant === 'list' && 'md:w-3/5'
        )}>
          <CardContent className="flex-1 p-0">
            {/* Cuisine Types */}
            <div className="flex flex-wrap gap-2 mb-3">
              {Array.isArray(restaurant.cuisine) ? restaurant.cuisine.map((cuisine: string) => (
                <Badge
                  key={cuisine}
                  variant="outline"
                  className="border-g7-gold/30 text-g7-gold text-xs"
                >
                  {cuisine}
                </Badge>
              )) : null}
            </div>

            {/* Header */}
            <h3 className="font-serif text-2xl text-g7-charcoal mb-2 group-hover:text-g7-gold transition-colors">
              {restaurant.name}
            </h3>

            <p className="text-g7-charcoal/80 mb-4 line-clamp-2">
              {restaurant.shortDescription}
            </p>

            {/* Details */}
            <div className="flex flex-wrap gap-4 mb-4 text-sm text-g7-charcoal/70">
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-g7-gold" />
                <span>
                  {restaurant.openingHours?.monday?.open} - {restaurant.openingHours?.monday?.close}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-g7-gold" />
                <span>{restaurant.location}</span>
              </div>
            </div>

            {/* Features */}
            {restaurant.features && restaurant.features.length > 0 && (
              <div className="mb-4">
                <div className="flex flex-wrap gap-2">
                  {restaurant.features.slice(0, 3).map((feature, index) => (
                    <span
                      key={index}
                      className="text-xs text-g7-charcoal/60 flex items-center gap-1"
                    >
                      • {feature}
                    </span>
                  ))}
                  {restaurant.features.length > 3 && (
                    <span className="text-xs text-g7-gold">
                      +{restaurant.features.length - 3} more
                    </span>
                  )}
                </div>
              </div>
            )}

            {/* Dietary Options */}
            {restaurant.dietaryOptions && restaurant.dietaryOptions.length > 0 && (
              <div className="mb-4">
                <p className="text-xs text-g7-charcoal/60 mb-2">Dietary Options:</p>
                <div className="flex flex-wrap gap-2">
                  {restaurant.dietaryOptions.slice(0, 4).map((option, index) => (
                    <Badge
                      key={index}
                      variant="outline"
                      className="border-g7-charcoal/20 text-g7-charcoal/60 text-xs"
                    >
                      {option}
                    </Badge>
                  ))}
                </div>
              </div>
            )}
          </CardContent>

          {/* Footer */}
          <div className="pt-4 border-t border-g7-gold/20 flex flex-col sm:flex-row gap-3">
            {showBooking && restaurant.tableBooking?.enabled && (
              <Button
                asChild
                className="flex-1 bg-g7-charcoal text-g7-ivory hover:bg-g7-gold hover:text-g7-charcoal"
              >
                <Link href={`/dining/${restaurant.id}?action=book`}>
                  <Calendar className="mr-2 h-4 w-4" />
                  Book a Table
                </Link>
              </Button>
            )}
            <Button
              asChild
              variant="outline"
              className={cn(
                'flex-1 border-g7-gold text-g7-charcoal hover:bg-g7-gold hover:text-g7-charcoal',
                !showBooking && 'w-full'
              )}
            >
              <Link href={`/dining/${restaurant.id}`}>
                View Menu
                <ChevronRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </Card>
    </motion.div>
  );
}
