'use client';

import React from 'react';
import Link from 'next/link';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { PageHero } from '@/components/common/HeroSection';
import { Card, CardContent } from '@/components/ui/card';
import { ChevronRight } from 'lucide-react';

/**
 * G7 Hotels Sitemap Page
 * Site map and navigation structure
 */

interface SitemapSection {
  title: string;
  links: { label: string; href: string; description?: string }[];
}

const sitemapSections: SitemapSection[] = [
  {
    title: 'Accommodations',
    links: [
      { label: 'All Rooms', href: '/rooms', description: 'Browse our luxury rooms and suites' },
      { label: 'Standard Rooms', href: '/rooms?type=standard' },
      { label: 'Deluxe Rooms', href: '/rooms?type=deluxe' },
      { label: 'Suites', href: '/rooms?type=suite' },
      { label: 'Presidential Suite', href: '/rooms?type=presidential' },
      { label: 'Royal Suite', href: '/rooms?type=royal' },
    ],
  },
  {
    title: 'Dining',
    links: [
      { label: 'All Restaurants', href: '/dining', description: 'Our dining venues and cuisines' },
      { label: 'Fine Dining', href: '/dining?type=fine-dining' },
      { label: 'Casual Dining', href: '/dining?type=casual' },
      { label: 'Bars & Lounges', href: '/dining?type=bar' },
    ],
  },
  {
    title: 'Experiences',
    links: [
      { label: 'All Experiences', href: '/experiences', description: 'Curated activities and adventures' },
      { label: 'Adventure', href: '/experiences?category=adventure' },
      { label: 'Cultural', href: '/experiences?category=cultural' },
      { label: 'Wellness', href: '/experiences?category=wellness' },
      { label: 'Culinary', href: '/experiences?category=culinary' },
    ],
  },
  {
    title: 'Spa & Wellness',
    links: [
      { label: 'Spa Menu', href: '/spa', description: 'Treatments and therapies' },
      { label: 'Massages', href: '/spa?category=massage' },
      { label: 'Facials', href: '/spa?category=facial' },
      { label: 'Body Treatments', href: '/spa?category=body-treatment' },
    ],
  },
  {
    title: 'Events',
    links: [
      { label: 'Events Overview', href: '/events', description: 'Weddings, corporate events, and more' },
      { label: 'Weddings', href: '/events?type=wedding' },
      { label: 'Corporate Events', href: '/events?type=corporate' },
      { label: 'Social Gatherings', href: '/events?type=social' },
      { label: 'Venues', href: '/events/venues' },
    ],
  },
  {
    title: 'Offers',
    links: [
      { label: 'All Offers', href: '/offers', description: 'Special packages and deals' },
      { label: 'Room Packages', href: '/offers?type=room' },
      { label: 'Dining Offers', href: '/offers?type=dining' },
      { label: 'Spa Packages', href: '/offers?type=spa' },
    ],
  },
  {
    title: 'Guest Services',
    links: [
      { label: 'Book a Stay', href: '/booking', description: 'Make a reservation' },
      { label: 'My Bookings', href: '/bookings' },
      { label: 'Loyalty Program', href: '/loyalty' },
      { label: 'FAQ', href: '/faq' },
      { label: 'Help Center', href: '/help' },
      { label: 'Contact Us', href: '/contact' },
    ],
  },
  {
    title: 'Account',
    links: [
      { label: 'Sign In', href: '/login', description: 'Access your account' },
      { label: 'Create Account', href: '/register' },
      { label: 'Forgot Password', href: '/forgot-password' },
    ],
  },
  {
    title: 'About G7 Hotels',
    links: [
      { label: 'About Us', href: '/about', description: 'Our story and mission' },
      { label: 'Careers', href: '/careers' },
      { label: 'Press & Media', href: '/press' },
      { label: 'Gallery', href: '/gallery' },
      { label: 'Journal', href: '/journal' },
    ],
  },
  {
    title: 'Legal',
    links: [
      { label: 'Privacy Policy', href: '/privacy', description: 'How we handle your data' },
      { label: 'Terms of Service', href: '/terms' },
      { label: 'Cookie Policy', href: '/cookies' },
      { label: 'Reviews Policy', href: '/reviews-policy' },
      { label: 'Accessibility', href: '/accessibility' },
    ],
  },
];

export default function SitemapPage() {
  return (
    <div className="min-h-screen flex flex-col bg-g7-ivory">
      <Header />

      <PageHero
        title="Sitemap"
        subtitle="Navigate G7 Hotels"
        backgroundImage="/images/hero/hero-1.jpg"
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Sitemap' },
        ]}
      />

      <main className="flex-1 container mx-auto px-4 py-12">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="font-serif text-4xl text-g7-charcoal mb-4">
              Site Navigation
            </h2>
            <p className="text-g7-charcoal/70 max-w-2xl mx-auto">
              Find your way around G7 Hotels with our comprehensive sitemap. Browse all our pages and sections in one place.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {sitemapSections.map((section, index) => (
              <Card key={index} className="overflow-hidden">
                <CardContent className="p-6">
                  <h3 className="font-serif text-xl text-g7-charcoal mb-4 pb-2 border-b">
                    {section.title}
                  </h3>
                  <ul className="space-y-3">
                    {section.links.map((link, linkIndex) => (
                      <li key={linkIndex}>
                        <Link
                          href={link.href}
                          className="group flex items-start gap-2 text-g7-charcoal/70 hover:text-g7-gold transition-colors"
                        >
                          <ChevronRight className="h-4 w-4 flex-shrink-0 mt-1 group-hover:translate-x-1 transition-transform" />
                          <div>
                            <span className="block">{link.label}</span>
                            {link.description && (
                              <span className="text-xs text-g7-charcoal/50 block">
                                {link.description}
                              </span>
                            )}
                          </div>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Quick Links */}
          <Card className="mt-12 p-8 bg-g7-gold/5 border-g7-gold/20">
            <h3 className="font-serif text-2xl text-g7-charcoal text-center mb-6">
              Popular Destinations
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { label: 'Book a Room', href: '/booking' },
                { label: 'View Offers', href: '/offers' },
                { label: 'Spa Menu', href: '/spa' },
                { label: 'Dining', href: '/dining' },
                { label: 'Events', href: '/events' },
                { label: 'Loyalty', href: '/loyalty' },
                { label: 'FAQ', href: '/faq' },
                { label: 'Contact', href: '/contact' },
              ].map((link, index) => (
                <Link
                  key={index}
                  href={link.href}
                  className="text-center p-4 bg-white rounded-lg hover:shadow-md transition-shadow"
                >
                  <span className="text-g7-charcoal font-medium">{link.label}</span>
                </Link>
              ))}
            </div>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  );
}
