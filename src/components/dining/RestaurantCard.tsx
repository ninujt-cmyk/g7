'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  UtensilsCrossed,
  Clock,
  MapPin,
  Star,
  ArrowRight,
  Users,
  Calendar,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';

/**
 * G7 Hotels Restaurant Card Component
 * Elegant restaurant listing card for dining section
 */

interface RestaurantCardProps {
  id: string;
  name: string;
  description: string;
  cuisine: string[];
  images: string[];
  priceRange: string;
  mealTypes: string[];
  openingHours?: {
    [key: string]: { open: string; close: string; closed?: boolean };
  };
  chef?: {
    name: string;
    title: string;
  };
  rating?: number;
  reviewCount?: number;
  featured?: boolean;
  tableBookingEnabled?: boolean;
}

const priceRangeLabels: Record<string, string> = {
  '$': '$ - Budget Friendly',
  '$$': '$$ - Moderate',
  '$$$': '$$$ - Fine Dining',
  '$$$$': '$$$$ - Luxury Dining',
};

export function RestaurantCard({
  id,
  name,
  description,
  cuisine,
  images,
  priceRange,
  mealTypes,
  openingHours,
  chef,
  rating,
  reviewCount,
  featured,
  tableBookingEnabled = true,
}: RestaurantCardProps) {
  const today = new Date().toLocaleLowerCase();
  const todayHours = openingHours?.[today];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="group"
    >
      <Card className="overflow-hidden border-0 shadow-lg hover:shadow-2xl transition-all duration-500 group-hover:-translate-y-1">
        {/* Image */}
        <Link href={`/dining/${id}`} className="block">
          <div className="relative aspect-[16/10] overflow-hidden">
            <img
              src={images[0] || '/images/dining/fine-dining.jpg'}
              alt={name}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
            
            {/* Badges */}
            <div className="absolute top-4 left-4 flex flex-col gap-2">
              {featured && (
                <Badge className="bg-g7-gold text-g7-charcoal">Featured</Badge>
              )}
              <Badge variant="secondary" className="bg-black/70 text-white">
                {priceRangeLabels[priceRange] || priceRange}
              </Badge>
            </div>

            {/* Rating */}
            {rating && (
              <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-full flex items-center gap-1">
                <Star className="h-4 w-4 fill-g7-gold text-g7-gold" />
                <span className="font-medium text-g7-charcoal">{rating}</span>
                {reviewCount && (
                  <span className="text-g7-charcoal/60 text-sm">
                    ({reviewCount})
                  </span>
                )}
              </div>
            )}

            {/* Open/Closed Status */}
            {todayHours && !todayHours.closed && (
              <div className="absolute bottom-4 right-4">
                <Badge
                  variant="secondary"
                  className={cn(
                    'bg-white/90 text-g7-charcoal',
                    'backdrop-blur-sm'
                  )}
                >
                  <Clock className="h-3 w-3 mr-1" />
                  Open until {todayHours.close}
                </Badge>
              </div>
            )}
          </div>
        </Link>

        {/* Content */}
        <CardContent className="p-6">
          <div className="flex items-start justify-between mb-3">
            <div className="flex-1">
              <Link href={`/dining/${id}`}>
                <h3 className="font-serif text-2xl text-g7-charcoal mb-2 group-hover:text-g7-gold transition-colors">
                  {name}
                </h3>
              </Link>
              <div className="flex flex-wrap items-center gap-3 text-sm text-g7-charcoal/70 mb-3">
                <div className="flex items-center gap-1">
                  <UtensilsCrossed className="h-4 w-4 text-g7-gold" />
                  <span>{cuisine.join(' • ')}</span>
                </div>
                {chef && (
                  <div className="flex items-center gap-1">
                    <span>• Chef {chef.name}</span>
                  </div>
                )}
              </div>
            </div>
          </div>

          <p className="text-g7-charcoal/80 mb-4 line-clamp-2">{description}</p>

          {/* Meal Types */}
          <div className="flex flex-wrap gap-2 mb-4">
            {mealTypes.slice(0, 3).map((meal) => (
              <Badge
                key={meal}
                variant="outline"
                className="border-g7-gold/30 text-g7-charcoal/70 text-xs"
              >
                {meal}
              </Badge>
            ))}
            {mealTypes.length > 3 && (
              <span className="text-xs text-g7-gold">
                +{mealTypes.length - 3} more
              </span>
            )}
          </div>

          {/* Actions */}
          <div className="flex items-center gap-3">
            <Button asChild className="flex-1 bg-g7-charcoal text-g7-ivory hover:bg-g7-gold hover:text-g7-charcoal">
              <Link href={`/dining/${id}`}>
                View Menu
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            {tableBookingEnabled && (
              <Button
                asChild
                variant="outline"
                className="border-g7-gold text-g7-charcoal hover:bg-g7-gold hover:text-g7-charcoal"
              >
                <Link href={`/booking?restaurant=${id}`}>
                  <Calendar className="h-4 w-4" />
                </Link>
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

/**
 * Featured Restaurant Card - Smaller, for homepage
 */
interface FeaturedRestaurantCardProps {
  id: string;
  name: string;
  cuisine: string[];
  image: string;
  priceRange: string;
}

export function FeaturedRestaurantCard({
  id,
  name,
  cuisine,
  image,
  priceRange,
}: FeaturedRestaurantCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      className="group relative overflow-hidden rounded-lg aspect-[3/4] cursor-pointer"
    >
      <Link href={`/dining/${id}`}>
        <div className="relative w-full h-full">
          <img
            src={image || '/images/dining/fine-dining.jpg'}
            alt={name}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
        </div>

        <div className="absolute bottom-0 left-0 right-0 p-6">
          <Badge className="bg-g7-gold text-g7-charcoal mb-3">
            {priceRange}
          </Badge>
          <h3 className="font-serif text-2xl text-white mb-2 group-hover:text-g7-gold transition-colors">
            {name}
          </h3>
          <p className="text-white/80 text-sm mb-3">{cuisine.join(' • ')}</p>
          <div className="flex items-center gap-2 text-g7-gold">
            <ArrowRight className="h-5 w-5 transform group-hover:translate-x-2 transition-transform" />
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
