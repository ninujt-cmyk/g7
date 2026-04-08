'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { cn } from '@/lib/utils';
import type { Testimonial } from '@/types';

/**
 * G7 Hotels Testimonial Carousel Component
 * Elegant carousel for guest reviews with animations
 */

interface TestimonialCarouselProps {
  testimonials: Testimonial[];
  autoplay?: boolean;
  autoplayInterval?: number;
  showAvatars?: boolean;
  variant?: 'full' | 'compact';
}

const defaultTestimonials: Testimonial[] = [
  {
    id: '1',
    guestName: 'Sarah Mitchell',
    guestLocation: 'London, UK',
    roomType: 'Presidential Suite',
    rating: 5,
    title: 'An Unforgettable Experience',
    content: 'From the moment we arrived, every detail was perfect. The Presidential Suite exceeded all expectations with its breathtaking views and impeccable service. The staff anticipated our every need before we even asked. This is what true luxury feels like.',
    stayDate: new Date('2024-01-15'),
    verified: true,
    response: {
      content: 'Thank you, Sarah! We are delighted that your stay exceeded expectations. It was our pleasure to host you, and we look forward to welcoming you back soon.',
      author: 'General Manager',
      date: new Date('2024-01-16'),
    },
    featured: true,
  },
  {
    id: '2',
    guestName: 'James & Emily Chen',
    guestLocation: 'San Francisco, USA',
    rating: 5,
    title: 'Perfect Anniversary Celebration',
    content: 'We celebrated our 10th anniversary at G7 Hotels and it was magical. The romantic dinner at the rooftop restaurant, the spa treatments, and the attention to detail made it a weekend we will cherish forever.',
    stayDate: new Date('2024-02-20'),
    verified: true,
    featured: true,
  },
  {
    id: '3',
    guestName: 'Dr. Rajesh Patel',
    guestLocation: 'Mumbai, India',
    roomType: 'Royal Suite',
    rating: 5,
    title: 'World-Class Hospitality',
    content: 'Having stayed at luxury hotels around the world, I can confidently say G7 Hotels sets a new standard. The blend of traditional hospitality with modern amenities is remarkable. The concierge team deserves special praise.',
    stayDate: new Date('2024-03-10'),
    verified: true,
    featured: true,
  },
];

export function TestimonialCarousel({
  testimonials = defaultTestimonials,
  autoplay = true,
  autoplayInterval = 6000,
  showAvatars = true,
  variant = 'full',
}: TestimonialCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  const nextTestimonial = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const goToTestimonial = (index: number) => {
    setDirection(index > currentIndex ? 1 : -1);
    setCurrentIndex(index);
  };

  // Auto-play
  React.useEffect(() => {
    if (!autoplay) return;
    const interval = setInterval(nextTestimonial, autoplayInterval);
    return () => clearInterval(interval);
  }, [autoplay, autoplayInterval]);

  const currentTestimonial = testimonials[currentIndex];

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 100 : -100,
      opacity: 0,
      scale: 0.95,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
      scale: 1,
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 100 : -100,
      opacity: 0,
      scale: 0.95,
    }),
  };

  return (
    <div className={cn(
      'relative',
      variant === 'full' ? 'py-16 px-4' : 'py-8 px-4'
    )}>
      <div className="container mx-auto max-w-5xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-g7-charcoal mb-4">
            Guest Experiences
          </h2>
          <p className="text-g7-charcoal/70 text-lg max-w-2xl mx-auto">
            Discover what our valued guests have to say about their unforgettable stays
          </p>
        </motion.div>

        {/* Carousel */}
        <div className="relative overflow-hidden">
          <AnimatePresence
            initial={false}
            custom={direction}
            mode="wait"
          >
            <motion.div
              key={currentIndex}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                x: { type: "spring", stiffness: 300, damping: 30 },
                opacity: { duration: 0.2 },
                scale: { duration: 0.2 },
              }}
              className={cn(
                'relative',
                variant === 'full' ? 'p-8 md:p-12' : 'p-6'
              )}
            >
              {/* Quote Icon */}
              <Quote className="absolute top-0 left-0 w-16 h-16 text-g7-gold/20 -translate-x-1/2 -translate-y-1/2" />

              {/* Testimonial Content */}
              <div className="text-center">
                {/* Rating */}
                <div className="flex justify-center gap-1 mb-6">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={cn(
                        'h-5 w-5',
                        i < currentTestimonial.rating
                          ? 'fill-g7-gold text-g7-gold'
                          : 'fill-gray-200 text-gray-200'
                      )}
                    />
                  ))}
                </div>

                {/* Title */}
                {currentTestimonial.title && (
                  <h3 className="font-serif text-xl md:text-2xl text-g7-charcoal mb-4">
                    {currentTestimonial.title}
                  </h3>
                )}

                {/* Content */}
                <p className="text-g7-charcoal/80 text-lg md:text-xl leading-relaxed mb-8 italic">
                  "{currentTestimonial.content}"
                </p>

                {/* Author */}
                <div className="flex flex-col items-center gap-3">
                  {showAvatars && (
                    <Avatar className="h-16 w-16 border-2 border-g7-gold">
                      <AvatarImage src="" />
                      <AvatarFallback className="bg-g7-gold text-g7-charcoal font-serif text-xl">
                        {currentTestimonial.guestName
                          .split(' ')
                          .map(n => n[0])
                          .join('')}
                      </AvatarFallback>
                    </Avatar>
                  )}
                  <div>
                    <p className="font-medium text-g7-charcoal text-lg">
                      {currentTestimonial.guestName}
                      {currentTestimonial.verified && (
                        <span className="ml-2 text-g7-gold text-sm">
                          ✓ Verified Guest
                        </span>
                      )}
                    </p>
                    <p className="text-g7-charcoal/60 text-sm">
                      {currentTestimonial.guestLocation}
                      {currentTestimonial.roomType && (
                        <span className="mx-2">•</span>
                      )}
                      {currentTestimonial.roomType}
                    </p>
                  </div>
                </div>

                {/* Hotel Response */}
                {currentTestimonial.response && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="mt-8 p-6 bg-g7-ivory rounded-lg max-w-2xl mx-auto"
                  >
                    <p className="text-g7-charcoal/70 text-sm mb-2">
                      <span className="font-medium">{currentTestimonial.response.author}</span>
                      {' '}responded on{' '}
                      {currentTestimonial.response.date.toLocaleDateString()}
                    </p>
                    <p className="text-g7-charcoal/80 italic">
                      "{currentTestimonial.response.content}"
                    </p>
                  </motion.div>
                )}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Navigation Buttons */}
        <div className="flex items-center justify-center gap-4 mt-8">
          <Button
            variant="outline"
            size="icon"
            onClick={prevTestimonial}
            className="border-g7-gold/50 text-g7-charcoal hover:bg-g7-gold hover:text-g7-charcoal"
            aria-label="Previous testimonial"
          >
            <ChevronLeft className="h-5 w-5" />
          </Button>

          {/* Dots */}
          <div className="flex gap-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => goToTestimonial(index)}
                className={cn(
                  'w-3 h-3 rounded-full transition-all duration-300',
                  index === currentIndex
                    ? 'bg-g7-gold w-8'
                    : 'bg-g7-gold/30 hover:bg-g7-gold/50'
                )}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>

          <Button
            variant="outline"
            size="icon"
            onClick={nextTestimonial}
            className="border-g7-gold/50 text-g7-charcoal hover:bg-g7-gold hover:text-g7-charcoal"
            aria-label="Next testimonial"
          >
            <ChevronRight className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </div>
  );
}

/**
 * Compact testimonial card for grid layout
 */
export function TestimonialCard({ testimonial }: { testimonial: Testimonial }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow"
    >
      <div className="flex gap-1 mb-4">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            className={cn(
              'h-4 w-4',
              i < testimonial.rating
                ? 'fill-g7-gold text-g7-gold'
                : 'fill-gray-200 text-gray-200'
            )}
          />
        ))}
      </div>
      <p className="text-g7-charcoal/80 mb-6 line-clamp-4 italic">
        "{testimonial.content}"
      </p>
      <div className="flex items-center gap-3">
        <Avatar className="h-10 w-10">
          <AvatarFallback className="bg-g7-gold text-g7-charcoal text-sm">
            {testimonial.guestName
              .split(' ')
              .map(n => n[0])
              .join('')}
          </AvatarFallback>
        </Avatar>
        <div>
          <p className="font-medium text-g7-charcoal text-sm">
            {testimonial.guestName}
          </p>
          <p className="text-g7-charcoal/60 text-xs">
            {testimonial.guestLocation}
          </p>
        </div>
      </div>
    </motion.div>
  );
}
