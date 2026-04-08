'use client';

import React from 'react';
import Link from 'next/link';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, Star, Award } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { CompactBookingWidget } from '@/components/booking/BookingWidget';
import { cn } from '@/lib/utils';

/**
 * G7 Hotels Hero Section Component
 * Full-bleed hero with parallax, video/image background, and booking widget
 * Inspired by Taj Hotels' immersive hero experience
 */

interface HeroSectionProps {
  title?: string;
  subtitle?: string;
  description?: string;
  backgroundImage?: string;
  showBookingWidget?: boolean;
  ctaText?: string;
  ctaHref?: string;
  variant?: 'home' | 'page';
  children?: React.ReactNode;
}

export function HeroSection({
  title = 'Experience Timeless Luxury',
  subtitle = 'Where Every Moment Becomes a Treasured Memory',
  description = 'Discover unparalleled hospitality, exquisite dining, and world-class amenities at G7 Hotels. Your journey to extraordinary begins here.',
  backgroundImage = '/images/hero/hero-1.jpg',
  showBookingWidget = true,
  ctaText = 'Explore Our Rooms',
  ctaHref = '/rooms',
  variant = 'home',
  children,
}: HeroSectionProps) {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, 200]);
  const y2 = useTransform(scrollY, [0, 500], [0, -100]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);

  return (
    <section className={cn(
      'relative min-h-screen flex items-center justify-center overflow-hidden',
      variant === 'page' && 'min-h-[60vh]'
    )}>
      {/* Background Image/Video */}
      <motion.div
        style={{ y: y1, opacity }}
        className="absolute inset-0 z-0"
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-black/60 z-10" />
        <img
          src={backgroundImage}
          alt="G7 Hotels Luxury Experience"
          className="w-full h-full object-cover"
          loading="eager"
        />
      </motion.div>

      {/* Content */}
      <motion.div
        style={{ y: y2, opacity }}
        className="relative z-20 container mx-auto px-4 text-center"
      >
        {/* Awards Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="flex items-center justify-center gap-4 mb-6"
        >
          <div className="flex items-center gap-1 bg-g7-gold/20 backdrop-blur-sm px-4 py-2 rounded-full border border-g7-gold/30">
            <Award className="h-4 w-4 text-g7-gold" />
            <span className="text-g7-ivory text-sm font-medium">
              Forbes Five-Star 2024
            </span>
          </div>
          <div className="flex items-center gap-1 bg-g7-gold/20 backdrop-blur-sm px-4 py-2 rounded-full border border-g7-gold/30">
            <Star className="h-4 w-4 text-g7-gold fill-g7-gold" />
            <span className="text-g7-ivory text-sm font-medium">
              AAA Five Diamond
            </span>
          </div>
        </motion.div>

        {/* Main Content */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="max-w-4xl mx-auto"
        >
          <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl text-g7-ivory font-light leading-tight mb-6">
            {title}
          </h1>
          <p className="text-xl md:text-2xl text-g7-gold font-light tracking-wide mb-4">
            {subtitle}
          </p>
          {description && (
            <p className="text-g7-ivory/80 text-lg md:text-xl leading-relaxed mb-8 max-w-2xl mx-auto">
              {description}
            </p>
          )}

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
            <Button
              asChild
              size="lg"
              className="bg-g7-gold text-g7-charcoal hover:bg-g7-gold-light px-8 py-6 text-lg group"
            >
              <Link href={ctaHref}>
                {ctaText}
                <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="border-g7-gold text-g7-gold hover:bg-g7-gold hover:text-g7-charcoal px-8 py-6 text-lg"
            >
              <Link href="/experiences">
                Discover Experiences
              </Link>
            </Button>
          </div>
        </motion.div>

        {/* Booking Widget */}
        {showBookingWidget && variant === 'home' && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="mt-12"
          >
            <CompactBookingWidget />
          </motion.div>
        )}

        {children}
      </motion.div>

      {/* Scroll Indicator */}
      {variant === 'home' && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20"
        >
          <div className="flex flex-col items-center gap-2 text-g7-ivory/60">
            <span className="text-xs tracking-widest uppercase">Scroll to explore</span>
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-6 h-10 border-2 border-g7-gold/50 rounded-full flex items-start justify-center p-2"
            >
              <div className="w-1.5 h-1.5 bg-g7-gold rounded-full" />
            </motion.div>
          </div>
        </motion.div>
      )}
    </section>
  );
}

/**
 * Page Hero Component
 * Smaller hero for inner pages
 */
interface PageHeroProps {
  title: string;
  subtitle?: string;
  backgroundImage?: string;
  breadcrumbs?: Array<{ label: string; href?: string }>;
}

export function PageHero({
  title,
  subtitle,
  backgroundImage = '/images/hero/page-hero.jpg',
  breadcrumbs,
}: PageHeroProps) {
  return (
    <section className="relative h-[60vh] min-h-[400px] flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/40 to-black/70 z-10" />
      <img
        src={backgroundImage}
        alt={title}
        className="absolute inset-0 w-full h-full object-cover"
      />

      <div className="relative z-20 container mx-auto px-4 text-center">
        {/* Breadcrumbs */}
        {breadcrumbs && (
          <nav className="flex items-center justify-center gap-2 mb-6 text-g7-ivory/70">
            {breadcrumbs.map((crumb, index) => (
              <React.Fragment key={crumb.label}>
                {index > 0 && <span className="text-g7-gold">/</span>}
                {crumb.href ? (
                  <a
                    href={crumb.href}
                    className="hover:text-g7-gold transition-colors"
                  >
                    {crumb.label}
                  </a>
                ) : (
                  <span className="text-g7-gold">{crumb.label}</span>
                )}
              </React.Fragment>
            ))}
          </nav>
        )}

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="font-serif text-4xl md:text-6xl lg:text-7xl text-g7-ivory font-light mb-4"
        >
          {title}
        </motion.h1>
        {subtitle && (
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-g7-ivory/80 max-w-2xl mx-auto"
          >
            {subtitle}
          </motion.p>
        )}
      </div>
    </section>
  );
}
