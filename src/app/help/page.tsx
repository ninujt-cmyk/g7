'use client';

import React from 'react';
import Link from 'next/link';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { PageHero } from '@/components/common/HeroSection';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
  Calendar,
  CreditCard,
  User,
  Settings,
  Phone,
  Mail,
  MessageCircle,
  BookOpen,
  MapPin,
  Utensils,
  Flower,
} from 'lucide-react';

/**
 * G7 Hotels Help Center Page
 * Help and support resources
 */

const helpTopics = [
  {
    icon: <Calendar className="h-8 w-8" />,
    title: 'Bookings & Reservations',
    description: 'Make, modify, or cancel your booking',
    link: '/faq',
    items: ['How to book', 'Cancellation policy', 'Modify booking', 'Group bookings'],
  },
  {
    icon: <CreditCard className="h-8 w-8" />,
    title: 'Payment & Billing',
    description: 'Payment methods and billing inquiries',
    link: '/faq',
    items: ['Payment options', 'Deposit requirements', 'Invoices', 'Refunds'],
  },
  {
    icon: <User className="h-8 w-8" />,
    title: 'Account & Profile',
    description: 'Manage your account and preferences',
    link: '/login',
    items: ['Create account', 'Reset password', 'Update profile', 'Privacy settings'],
  },
  {
    icon: <Settings className="h-8 w-8" />,
    title: 'Loyalty Program',
    description: 'G7 Rewards points and benefits',
    link: '/loyalty',
    items: ['Earn points', 'Redeem rewards', 'Tier benefits', 'Member offers'],
  },
  {
    icon: <MapPin className="h-8 w-8" />,
    title: 'Hotel Information',
    description: 'Amenities, services, and facilities',
    link: '/rooms',
    items: ['Room types', 'Amenities', 'Check-in/check-out', 'Location'],
  },
  {
    icon: <Utensils className="h-8 w-8" />,
    title: 'Dining',
    description: 'Restaurants, room service, and dietary needs',
    link: '/dining',
    items: ['Restaurant hours', 'Room service', 'Special diets', 'Reservations'],
  },
  {
    icon: <Flower className="h-8 w-8" />,
    title: 'Spa & Wellness',
    description: 'Spa treatments and wellness programs',
    link: '/spa',
    items: ['Treatments', 'Bookings', 'Packages', 'Operating hours'],
  },
  {
    icon: <BookOpen className="h-8 w-8" />,
    title: 'Policies & Guidelines',
    description: 'Hotel policies and terms of service',
    link: '/terms',
    items: ['Terms of service', 'Privacy policy', 'Cookie policy', 'House rules'],
  },
];

export default function HelpPage() {
  return (
    <div className="min-h-screen flex flex-col bg-g7-ivory">
      <Header />

      <PageHero
        title="Help Center"
        subtitle="We're Here to Help"
        backgroundImage="/images/hero/hero-1.jpg"
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Help Center' },
        ]}
      />

      <main className="flex-1 container mx-auto px-4 py-12">
        {/* Search */}
        <div className="max-w-2xl mx-auto mb-12">
          <Card className="p-8 border-g7-gold/30">
            <h2 className="font-serif text-2xl text-g7-charcoal text-center mb-4">
              How Can We Help You?
            </h2>
            <p className="text-g7-charcoal/70 text-center mb-6">
              Search for answers to common questions or browse our help topics below.
            </p>
            <Link href="/faq">
              <Button className="w-full bg-g7-charcoal text-g7-ivory hover:bg-g7-gold hover:text-g7-charcoal py-6">
                Browse FAQs
              </Button>
            </Link>
          </Card>
        </div>

        {/* Help Topics */}
        <div className="max-w-6xl mx-auto mb-12">
          <h2 className="font-serif text-3xl text-g7-charcoal text-center mb-8">
            Browse Help Topics
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {helpTopics.map((topic, index) => (
              <Link key={index} href={topic.link}>
                <Card className="h-full p-6 hover:shadow-lg transition-all duration-300 border-g7-gold/20">
                  <div className="text-g7-gold mb-4">{topic.icon}</div>
                  <h3 className="font-semibold text-g7-charcoal mb-2">{topic.title}</h3>
                  <p className="text-sm text-g7-charcoal/70 mb-4">{topic.description}</p>
                  <ul className="space-y-1">
                    {topic.items.slice(0, 3).map((item, idx) => (
                      <li key={idx} className="text-xs text-g7-charcoal/60 flex items-center gap-1">
                        <span className="text-g7-gold">›</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </Card>
              </Link>
            ))}
          </div>
        </div>

        {/* Quick Links */}
        <div className="max-w-6xl mx-auto mb-12">
          <h2 className="font-serif text-3xl text-g7-charcoal text-center mb-8">
            Quick Links
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="p-6 bg-g7-gold/5 border-g7-gold/20">
              <h3 className="font-semibold text-g7-charcoal mb-3">My Booking</h3>
              <p className="text-sm text-g7-charcoal/70 mb-4">
                View, modify, or cancel your reservation
              </p>
              <Button
                asChild
                variant="outline"
                size="sm"
                className="w-full border-g7-charcoal text-g7-charcoal hover:bg-g7-charcoal hover:text-g7-ivory"
              >
                <Link href="/bookings">Manage Booking</Link>
              </Button>
            </Card>

            <Card className="p-6 bg-g7-gold/5 border-g7-gold/20">
              <h3 className="font-semibold text-g7-charcoal mb-3">Loyalty Program</h3>
              <p className="text-sm text-g7-charcoal/70 mb-4">
                Check your points and explore rewards
              </p>
              <Button
                asChild
                variant="outline"
                size="sm"
                className="w-full border-g7-charcoal text-g7-charcoal hover:bg-g7-charcoal hover:text-g7-ivory"
              >
                <Link href="/loyalty">View Rewards</Link>
              </Button>
            </Card>

            <Card className="p-6 bg-g7-gold/5 border-g7-gold/20">
              <h3 className="font-semibold text-g7-charcoal mb-3">New Booking</h3>
              <p className="text-sm text-g7-charcoal/70 mb-4">
                Start planning your next luxury getaway
              </p>
              <Button
                asChild
                variant="outline"
                size="sm"
                className="w-full border-g7-charcoal text-g7-charcoal hover:bg-g7-charcoal hover:text-g7-ivory"
              >
                <Link href="/booking">Book Now</Link>
              </Button>
            </Card>
          </div>
        </div>

        {/* Contact Support */}
        <Card className="max-w-4xl mx-auto p-8 bg-g7-charcoal text-g7-ivory border-0">
          <h2 className="font-serif text-3xl text-center mb-4">Contact Support</h2>
          <p className="text-g7-ivory/80 text-center mb-8">
            Can't find what you're looking for? Our support team is here to help.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-g7-gold/20 flex items-center justify-center">
                <Phone className="h-8 w-8 text-g7-gold" />
              </div>
              <h3 className="font-semibold mb-2">Call Us</h3>
              <p className="text-sm text-g7-ivory/70 mb-2">24/7 Guest Services</p>
              <a href="tel:+919491708080" className="text-g7-gold hover:underline">
                +91 94917 08080
              </a>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-g7-gold/20 flex items-center justify-center">
                <Mail className="h-8 w-8 text-g7-gold" />
              </div>
              <h3 className="font-semibold mb-2">Email Us</h3>
              <p className="text-sm text-g7-ivory/70 mb-2">Response within 24 hours</p>
              <a href="mailto:support@g7hotels.in" className="text-g7-gold hover:underline">
                support@g7hotels.in
              </a>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-g7-gold/20 flex items-center justify-center">
                <MessageCircle className="h-8 w-8 text-g7-gold" />
              </div>
              <h3 className="font-semibold mb-2">Live Chat</h3>
              <p className="text-sm text-g7-ivory/70 mb-2">Instant assistance</p>
              <button className="text-g7-gold hover:underline">Start Chat</button>
            </div>
          </div>
        </Card>
      </main>

      <Footer />
    </div>
  );
}
