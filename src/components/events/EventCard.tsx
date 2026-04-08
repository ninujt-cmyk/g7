'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Calendar, MapPin, Users, Clock, ArrowRight } from 'lucide-react';
import { Event } from '@/types';
import { format } from 'date-fns';

interface EventCardProps {
  event: Event;
  variant?: 'grid' | 'list' | 'featured';
}

export default function EventCard({ event, variant = 'grid' }: EventCardProps) {
  const isGrid = variant === 'grid';
  const isFeatured = variant === 'featured';

  return (
    <div
      className={`group bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 ${
        isFeatured ? 'md:col-span-2 lg:col-span-3' : ''
      } ${isGrid ? 'h-full flex flex-col' : 'flex flex-col md:flex-row'}`}
    >
      {/* Image Section */}
      <div
        className={`relative overflow-hidden ${
          isGrid ? 'h-64' : isFeatured ? 'h-80' : 'h-48 md:h-auto md:w-1/3'
        }`}
      >
        {event.images && event.images[0] ? (
          <Image
            src={event.images[0]}
            alt={event.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full bg-g7-emerald/10 flex items-center justify-center">
            <MapPin className="w-12 h-12 text-g7-emerald/30" />
          </div>
        )}
        
        {/* Type Badge */}
        <div className="absolute top-4 left-4">
          <span className="px-3 py-1 bg-g7-gold text-white text-sm font-medium rounded-full">
            {event.type}
          </span>
        </div>

        {/* Date Badge */}
        {event.date && (
          <div className="absolute top-4 right-4">
            <div className="bg-white/90 backdrop-blur-sm rounded-lg p-2 text-center shadow-lg">
              <div className="text-g7-gold text-xs font-semibold uppercase">
                {format(new Date(event.date), 'MMM')}
              </div>
              <div className="text-2xl font-bold text-g7-charcoal">
                {format(new Date(event.date), 'dd')}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Content Section */}
      <div className={`p-6 flex flex-col ${isGrid ? 'flex-grow' : 'flex-grow'}`}>
        <h3
          className={`font-serif text-2xl md:text-3xl text-g7-charcoal mb-2 group-hover:text-g7-gold transition-colors ${
            isFeatured ? 'text-3xl md:text-4xl' : ''
          }`}
        >
          {event.title}
        </h3>

        <p className="text-g7-emerald/80 mb-4 text-sm uppercase tracking-wider font-medium">
          {event.category}
        </p>

        <p
          className={`text-gray-600 mb-4 line-clamp-${isFeatured ? '3' : '2'}`}
        >
          {event.description}
        </p>

        {/* Event Details */}
        <div className={`space-y-2 mb-6 ${isGrid ? 'flex-grow' : ''}`}>
          {event.date && (
            <div className="flex items-center text-sm text-gray-600">
              <Calendar className="w-4 h-4 mr-2 text-g7-gold" />
              <span>{format(new Date(event.date), 'MMMM dd, yyyy')}</span>
            </div>
          )}
          
          {event.venue && (
            <div className="flex items-center text-sm text-gray-600">
              <MapPin className="w-4 h-4 mr-2 text-g7-gold" />
              <span>{event.venue}</span>
            </div>
          )}
          
          {event.startTime && (
            <div className="flex items-center text-sm text-gray-600">
              <Clock className="w-4 h-4 mr-2 text-g7-gold" />
              <span>
                {event.startTime}
                {event.endTime && ` - ${event.endTime}`}
              </span>
            </div>
          )}
          
          {event.capacity && (
            <div className="flex items-center text-sm text-gray-600">
              <Users className="w-4 h-4 mr-2 text-g7-gold" />
              <span>Capacity: {event.capacity} guests</span>
            </div>
          )}
        </div>

        {/* Price */}
        {event.price && (
          <div className="mb-6">
            <span className="text-g7-gold text-lg font-semibold">
              {event.currency || 'USD'} {event.price.toLocaleString()}
            </span>
            {event.pricePer && (
              <span className="text-gray-600 text-sm ml-2">/ {event.pricePer}</span>
            )}
          </div>
        )}

        {/* CTA Button */}
        <div className="flex items-center justify-between mt-auto">
          <Link
            href={`/events/${event.id}`}
            className="inline-flex items-center text-g7-charcoal font-medium group-hover:text-g7-gold transition-colors"
          >
            View Details
            <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
          </Link>
          
          {event.available && (
            <span className="text-sm text-green-600 font-medium">Available</span>
          )}
        </div>
      </div>
    </div>
  );
}
