'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  Bed,
  Users,
  Maximize,
  Wifi,
  Coffee,
  Tv,
  Bath,
  Snowflake,
  UtensilsCrossed,
  Star,
  Heart,
  MapPin,
  ArrowRight,
  Play,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Card,
  CardContent,
  CardFooter,
} from '@/components/ui/card';
import { cn } from '@/lib/utils';
import type { Room } from '@/types';

/**
 * G7 Hotels Room Card Component
 * Elegant room listing card with hover effects, amenities, and booking CTA
 */

interface RoomCardProps {
  room: Room;
  variant?: 'grid' | 'list';
  showPrice?: boolean;
  onFavorite?: (roomId: string) => void;
  isFavorite?: boolean;
}

const amenityIcons: Record<string, React.ReactNode> = {
  'Free Wi-Fi': <Wifi className="h-4 w-4" />,
  'Room Service': <UtensilsCrossed className="h-4 w-4" />,
  'Air Conditioning': <Snowflake className="h-4 w-4" />,
  'Smart TV': <Tv className="h-4 w-4" />,
  'Coffee Maker': <Coffee className="h-4 w-4" />,
  'Bathtub': <Bath className="h-4 w-4" />,
};

export function RoomCard({
  room,
  variant = 'grid',
  showPrice = true,
  onFavorite,
  isFavorite = false,
}: RoomCardProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const displayedAmenities = room.amenities.slice(0, 4);
  const mainImage = room.images[currentImageIndex] || '/images/rooms/default-room.jpg';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
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
          variant === 'list' ? 'md:w-1/2' : 'aspect-[4/3]'
        )}>
          <Link href={`/rooms/${room.id}`}>
            <div className="relative w-full h-full img-zoom-container">
              <img
                src={mainImage}
                alt={room.name}
                className="w-full h-full object-cover transition-transform duration-700"
              />
            </div>
          </Link>

          {/* Badges */}
          <div className="absolute top-4 left-4 flex flex-col gap-2">
            {room.featured && (
              <Badge className="bg-g7-gold text-g7-charcoal hover:bg-g7-gold-light">
                Featured
              </Badge>
            )}
            <Badge variant="secondary" className="bg-black/70 text-white hover:bg-black/80">
              {room.type}
            </Badge>
          </div>

          {/* Favorite Button */}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onFavorite?.(room.id)}
            className="absolute top-4 right-4 bg-white/90 hover:bg-white text-g7-charcoal hover:text-red-500 transition-colors"
          >
            <Heart className={cn('h-5 w-5', isFavorite && 'fill-current text-red-500')} />
          </Button>

          {/* Virtual Tour Button */}
          {room.virtualTourUrl && (
            <Button
              variant="secondary"
              size="icon"
              className="absolute bottom-4 right-4 bg-black/70 text-white hover:bg-g7-gold hover:text-g7-charcoal"
            >
              <Play className="h-4 w-4 fill-current" />
            </Button>
          )}

          {/* View Indicator */}
          {room.images.length > 1 && (
            <div className="absolute bottom-4 left-4 flex gap-1">
              {room.images.map((_, index) => (
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
          {room.rating > 0 && (
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/70 text-white px-3 py-1 rounded-full flex items-center gap-1 text-sm">
              <Star className="h-4 w-4 fill-g7-gold text-g7-gold" />
              <span className="font-medium">{room.rating}</span>
              <span className="text-white/70">({room.reviewCount} reviews)</span>
            </div>
          )}
        </div>

        {/* Content Section */}
        <div className={cn(
          'flex flex-col p-6',
          variant === 'list' && 'md:w-1/2'
        )}>
          <CardContent className="flex-1 p-0">
            {/* Header */}
            <div className="mb-4">
              <div className="flex items-start justify-between gap-4 mb-2">
                <Link href={`/rooms/${room.id}`}>
                  <h3 className="font-serif text-2xl text-g7-charcoal group-hover:text-g7-gold transition-colors">
                    {room.name}
                  </h3>
                </Link>
                {showPrice && (
                  <div className="text-right flex-shrink-0">
                    <p className="text-g7-gold font-serif text-2xl">
                      ${room.basePrice}
                    </p>
                    <p className="text-g7-charcoal/60 text-sm">per night</p>
                  </div>
                )}
              </div>
              <div className="flex items-center gap-4 text-sm text-g7-charcoal/70 mb-3">
                <span className="flex items-center gap-1">
                  <MapPin className="h-4 w-4" />
                  {room.view} View
                </span>
                <span className="flex items-center gap-1">
                  <Maximize className="h-4 w-4" />
                  {room.size} sq ft
                </span>
              </div>
              <p className="text-g7-charcoal/80 leading-relaxed">
                {room.shortDescription}
              </p>
            </div>

            {/* Capacity */}
            <div className="flex flex-wrap gap-4 mb-4 pb-4 border-b border-g7-charcoal/10">
              <div className="flex items-center gap-2 text-sm text-g7-charcoal/70">
                <Users className="h-4 w-4 text-g7-gold" />
                <span>Up to {room.maxOccupancy} guests</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-g7-charcoal/70">
                <Bed className="h-4 w-4 text-g7-gold" />
                <span>
                  {room.beds.map(b => `${b.count} ${b.type}`).join(', ')}
                </span>
              </div>
            </div>

            {/* Amenities */}
            <div className="mb-4">
              <p className="text-sm font-medium text-g7-charcoal mb-3">Amenities</p>
              <div className="flex flex-wrap gap-3">
                {displayedAmenities.map((amenity) => (
                  <div
                    key={amenity}
                    className="flex items-center gap-2 text-sm text-g7-charcoal/70"
                  >
                    {amenityIcons[amenity] || <div className="h-4 w-4" />}
                    <span>{amenity}</span>
                  </div>
                ))}
                {room.amenities.length > 4 && (
                  <span className="text-sm text-g7-gold">
                    +{room.amenities.length - 4} more
                  </span>
                )}
              </div>
            </div>

            {/* Features */}
            <div className="flex flex-wrap gap-2 mb-4">
              {room.features.accessible && (
                <Badge variant="outline" className="border-g7-gold/30 text-g7-charcoal/70">
                  Accessible
                </Badge>
              )}
              {room.features.connectingRooms && (
                <Badge variant="outline" className="border-g7-gold/30 text-g7-charcoal/70">
                  Connecting Rooms
                </Badge>
              )}
              {room.features.petFriendly && (
                <Badge variant="outline" className="border-g7-gold/30 text-g7-charcoal/70">
                  Pet Friendly
                </Badge>
              )}
            </div>

            {/* Availability */}
            <div className="flex items-center justify-between">
              <span className={cn(
                'text-sm font-medium',
                room.availability.available > 0
                  ? 'text-green-600'
                  : 'text-red-600'
              )}>
                {room.availability.available > 0
                  ? `${room.availability.available} rooms available`
                  : 'Sold out for selected dates'
                }
              </span>
            </div>
          </CardContent>

          {/* Footer */}
          <CardFooter className="p-0 pt-6 flex flex-col sm:flex-row gap-3">
            <Button
              asChild
              variant="outline"
              className="flex-1 border-g7-gold text-g7-charcoal hover:bg-g7-gold hover:text-g7-charcoal"
            >
              <Link href={`/rooms/${room.id}`}>
                View Details
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button
              asChild
              className="flex-1 bg-g7-charcoal text-g7-ivory hover:bg-g7-gold hover:text-g7-charcoal"
              disabled={room.availability.available === 0}
            >
              <Link href={`/booking?room=${room.id}`}>
                Book Now
              </Link>
            </Button>
          </CardFooter>
        </div>
      </Card>
    </motion.div>
  );
}

/**
 * Featured Room Card - Smaller, more compact for homepage
 */
export function FeaturedRoomCard({ room }: { room: Room }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="group relative overflow-hidden rounded-lg aspect-[3/4] cursor-pointer"
    >
      <Link href={`/rooms/${room.id}`}>
        <div className="relative w-full h-full img-zoom-container">
          <img
            src={room.images[0] || '/images/rooms/default-room.jpg'}
            alt={room.name}
            className="w-full h-full object-cover transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
        </div>

        <div className="absolute bottom-0 left-0 right-0 p-6">
          <Badge className="bg-g7-gold text-g7-charcoal mb-3">
            {room.type}
          </Badge>
          <h3 className="font-serif text-2xl text-white mb-2 group-hover:text-g7-gold transition-colors">
            {room.name}
          </h3>
          <p className="text-white/80 text-sm mb-3 line-clamp-2">
            {room.shortDescription}
          </p>
          <div className="flex items-center justify-between">
            <div>
              <span className="text-g7-gold font-serif text-xl">
                ${room.basePrice}
              </span>
              <span className="text-white/60 text-sm"> /night</span>
            </div>
            <ArrowRight className="h-5 w-5 text-g7-gold transform group-hover:translate-x-2 transition-transform" />
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
