'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import {
  Crown,
  Sparkles,
  Gem,
  Shield,
  Star,
  Gift,
  Plane,
  Calendar,
  Check,
  ArrowRight,
} from 'lucide-react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { PageHero } from '@/components/common/HeroSection';
import { LoyaltyBadge, TierProgress } from '@/components/loyalty/LoyaltyBadge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

/**
 * G7 Hotels Loyalty Page
 * Complete rewards program information
 */

const tiers = [
  {
    name: 'Silver',
    icon: <Shield className="h-12 w-12" />,
    color: '#C0C0C0',
    pointsRequired: 0,
    benefits: [
      'Priority Check-in',
      'Complimentary Wi-Fi',
      'Room Upgrade (subject to availability)',
      '5% Bonus Points on Stays',
    ],
    perks: ['Welcome drink on arrival', 'Late check-out at 1 PM'],
  },
  {
    name: 'Gold',
    icon: <Crown className="h-12 w-12" />,
    color: '#FFD700',
    pointsRequired: 25000,
    benefits: [
      'All Silver Benefits',
      'Executive Lounge Access',
      'Late Check-out (2 PM)',
      '10% Bonus Points on Stays',
      'Complimentary Breakfast',
    ],
    perks: ['Welcome amenity', 'Spa credit (₹4,150 per stay)'],
  },
  {
    name: 'Platinum',
    icon: <Gem className="h-12 w-12" />,
    color: '#E5E4E2',
    pointsRequired: 75000,
    benefits: [
      'All Gold Benefits',
      'Suite Upgrade Guarantee',
      'Personal Concierge',
      '15% Bonus Points on Stays',
      'Airport Transfer',
      'Spa Credit (₹8,300 per stay)',
    ],
    perks: ['Private dining experience', 'Exclusive events access'],
  },
  {
    name: 'Royal',
    icon: <Sparkles className="h-12 w-12" />,
    color: '#C9A45C',
    pointsRequired: 150000,
    benefits: [
      'All Platinum Benefits',
      'Royal Suite Guarantee',
      '24/7 Personal Assistant',
      '25% Bonus Points on Stays',
      'Private Dining Experience',
      'Exclusive Events Access',
      'Complimentary Mini Bar',
      'Unlimited Spa Access',
    ],
    perks: ['Free night award annually', 'Private jet partnership'],
  },
];

const earningWays = [
  {
    icon: <Calendar className="h-8 w-8" />,
    title: 'Room Stays',
    description: 'Earn 5 points for every ₹100 spent on room rates',
    example: '₹10,000 stay = 500 points',
  },
  {
    icon: <Star className="h-8 w-8" />,
    title: 'Dining',
    description: 'Earn 2 points for every ₹100 spent at our restaurants',
    example: '₹5,000 dinner = 100 points',
  },
  {
    icon: <Gem className="h-8 w-8" />,
    title: 'Spa & Wellness',
    description: 'Earn 3 points for every ₹100 on spa treatments',
    example: '₹8,000 spa = 240 points',
  },
  {
    icon: <Gift className="h-8 w-8" />,
    title: 'Experiences',
    description: 'Earn 4 points for every ₹100 on curated experiences',
    example: '₹20,000 experience = 800 points',
  },
];

const redemptionOptions = [
  {
    title: 'Free Nights',
    description: 'Redeem points for complimentary stays at any G7 Hotels property',
    points: 'Starting from 25,000 points',
  },
  {
    title: 'Room Upgrades',
    description: 'Use points to upgrade your room to a higher category',
    points: '5,000 - 15,000 points per upgrade',
  },
  {
    title: 'Spa Credits',
    description: 'Treat yourself to luxurious spa treatments',
    points: '10,000 points = ₹8,300 credit',
  },
  {
    title: 'Dining Vouchers',
    description: 'Enjoy exquisite dining experiences on us',
    points: '5,000 points = ₹4,150 credit',
  },
  {
    title: 'Flight Upgrades',
    description: 'Partner with major airlines for premium cabin upgrades',
    points: 'Varies by airline and route',
  },
  {
    title: 'Exclusive Experiences',
    description: 'Access to unique experiences and events',
    points: 'Special redemption offers available',
  },
];

export default function LoyaltyPage() {
  const currentPoints = 25000;
  const pointsToNextTier = 75000;
  const nextTier = 'platinum';

  return (
    <div className="min-h-screen flex flex-col bg-g7-ivory">
      <Header />

      {/* Page Hero */}
      <PageHero
        title="G7 Rewards"
        subtitle="Elevate Your Stay Experience"
        backgroundImage="/images/hero/hero-1.jpg"
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Loyalty Program' },
        ]}
      />

      <main className="flex-1 container mx-auto px-4 py-12">
        {/* Join CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-g7-charcoal text-g7-ivory p-8 md:p-12 rounded-lg mb-12"
        >
          <div className="max-w-3xl mx-auto text-center">
            <Crown className="h-16 w-16 mx-auto mb-6 text-g7-gold" />
            <h2 className="font-serif text-4xl md:text-5xl mb-4">Join G7 Rewards Today</h2>
            <p className="text-g7-ivory/80 text-lg mb-8">
              Start earning points on every stay and unlock exclusive benefits, room upgrades, and unforgettable experiences. Membership is free and joining takes just a few minutes.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                asChild
                size="lg"
                className="bg-g7-gold text-g7-charcoal hover:bg-g7-gold-light px-8 py-6 text-lg"
              >
                <Link href="/register">Join Now - It's Free</Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="border-g7-gold text-g7-gold hover:bg-g7-gold hover:text-g7-charcoal px-8 py-6 text-lg"
              >
                <Link href="/login">Sign In to Your Account</Link>
              </Button>
            </div>
          </div>
        </motion.div>

        {/* Member Dashboard Preview */}
        <div className="max-w-6xl mx-auto mb-16">
          <h2 className="font-serif text-3xl text-g7-charcoal text-center mb-8">
            Your Membership Journey
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <LoyaltyBadge
              tier="gold"
              points={currentPoints}
              showLabel={true}
              size="lg"
              variant="full"
            />
            <Card className="p-6 bg-white border-g7-gold/30">
              <h3 className="font-serif text-2xl text-g7-charcoal mb-6">Progress to Platinum</h3>
              <TierProgress
                currentTier="gold"
                points={currentPoints}
                pointsToNextTier={pointsToNextTier}
                nextTier={nextTier as any}
              />
              <div className="mt-6 p-4 bg-g7-gold/10 rounded-lg">
                <p className="text-sm text-g7-charcoal/80">
                  <strong className="text-g7-charcoal">{pointsToNextTier - currentPoints.toLocaleString()} points</strong> more to unlock Platinum benefits
                </p>
              </div>
            </Card>
          </div>
        </div>

        {/* Tiers Section */}
        <div className="max-w-7xl mx-auto mb-16">
          <h2 className="font-serif text-3xl text-g7-charcoal text-center mb-4">
            Membership Tiers
          </h2>
          <p className="text-g7-charcoal/70 text-center max-w-2xl mx-auto mb-12">
            Elevate your experience with each tier. The more you stay, the more exclusive your benefits become.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {tiers.map((tier, index) => (
              <motion.div
                key={tier.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card
                  className={cn(
                    'overflow-hidden hover:shadow-2xl transition-all duration-500',
                    currentPoints >= tier.pointsRequired && 'border-2 border-g7-gold'
                  )}
                >
                  <div
                    className="p-6 text-center"
                    style={{ backgroundColor: `${tier.color}15` }}
                  >
                    <div
                      className="w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center"
                      style={{ backgroundColor: `${tier.color}30` }}
                    >
                      <div style={{ color: tier.color }}>{tier.icon}</div>
                    </div>
                    <h3 className="font-serif text-2xl mb-2" style={{ color: tier.color }}>
                      {tier.name}
                    </h3>
                    <p className="text-sm text-g7-charcoal/60">
                      {tier.pointsRequired === 0 ? 'Starting Tier' : `${tier.pointsRequired.toLocaleString()}+ points`}
                    </p>
                  </div>
                  <CardContent className="p-6">
                    <ul className="space-y-2 mb-4">
                      {tier.benefits.slice(0, 4).map((benefit, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-sm text-g7-charcoal/70">
                          <Check className="h-4 w-4 text-g7-gold flex-shrink-0 mt-0.5" />
                          <span>{benefit}</span>
                        </li>
                      ))}
                    </ul>
                    {tier.benefits.length > 4 && (
                      <p className="text-xs text-g7-gold mb-4">
                        +{tier.benefits.length - 4} more benefits
                      </p>
                    )}
                    <Button
                      variant="outline"
                      className={cn(
                        'w-full',
                        currentPoints >= tier.pointsRequired
                          ? 'border-g7-gold text-g7-charcoal'
                          : 'border-g7-charcoal/30 text-g7-charcoal/60'
                      )}
                    >
                      {currentPoints >= tier.pointsRequired ? 'Current Tier' : 'Learn More'}
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Earning Points Section */}
        <div className="max-w-6xl mx-auto mb-16">
          <h2 className="font-serif text-3xl text-g7-charcoal text-center mb-4">
            Earn Points Faster
          </h2>
          <p className="text-g7-charcoal/70 text-center max-w-2xl mx-auto mb-12">
            Multiple ways to earn points across all our services
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {earningWays.map((way, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="p-6 text-center hover:shadow-lg transition-all duration-300 h-full">
                  <div className="text-g7-gold mb-4 flex justify-center">{way.icon}</div>
                  <h3 className="font-semibold text-g7-charcoal mb-2">{way.title}</h3>
                  <p className="text-sm text-g7-charcoal/70 mb-4">{way.description}</p>
                  <p className="text-xs text-g7-gold font-medium">{way.example}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Redemption Options */}
        <div className="max-w-6xl mx-auto mb-16">
          <h2 className="font-serif text-3xl text-g7-charcoal text-center mb-4">
            Redeem Your Points
          </h2>
          <p className="text-g7-charcoal/70 text-center max-w-2xl mx-auto mb-12">
            Turn your points into unforgettable experiences and rewards
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {redemptionOptions.map((option, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="p-6 hover:shadow-lg transition-all duration-300 h-full border-g7-gold/20">
                  <Gem className="h-8 w-8 text-g7-gold mb-4" />
                  <h3 className="font-semibold text-g7-charcoal mb-2">{option.title}</h3>
                  <p className="text-sm text-g7-charcoal/70 mb-4">{option.description}</p>
                  <Badge className="bg-g7-gold/20 text-g7-charcoal border-g7-gold/50">
                    {option.points}
                  </Badge>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto text-center"
        >
          <Card className="p-8 md:p-12 bg-g7-charcoal text-g7-ivory border-0">
            <Plane className="h-12 w-12 mx-auto mb-6 text-g7-gold" />
            <h2 className="font-serif text-3xl mb-4">Ready to Start Earning?</h2>
            <p className="text-g7-ivory/80 mb-8">
              Join G7 Rewards today and start your journey towards exclusive benefits and unforgettable experiences.
            </p>
            <Button
              asChild
              size="lg"
              className="bg-g7-gold text-g7-charcoal hover:bg-g7-gold-light px-8 py-6"
            >
              <Link href="/register">Join G7 Rewards Now</Link>
            </Button>
          </Card>
        </motion.div>
      </main>

      <Footer />
    </div>
  );
}
