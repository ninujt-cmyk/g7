'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  MapPin,
  Phone,
  Mail,
  Facebook,
  Instagram,
  Twitter,
  Youtube,
  Linkedin,
  ChevronUp,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { CookieSettingsButton } from '@/components/common/CookieConsent';
import { cn } from '@/lib/utils';

/**
 * G7 Hotels Footer Component
 * Comprehensive footer with navigation, contact info, newsletter, and legal links
 */

const footerSections = [
  {
    title: 'Quick Links',
    links: [
      { label: 'About Us', href: '/about' },
      { label: 'Our Story', href: '/about#story' },
      { label: 'Careers', href: '/careers' },
      { label: 'Press & Media', href: '/press' },
      { label: 'Blog', href: '/journal' },
    ],
  },
  {
    title: 'Experiences',
    links: [
      { label: 'Rooms & Suites', href: '/rooms' },
      { label: 'Dining', href: '/dining' },
      { label: 'Spa & Wellness', href: '/spa' },
      { label: 'Experiences', href: '/experiences' },
      { label: 'Events & Weddings', href: '/events' },
    ],
  },
  {
    title: 'Support',
    links: [
      { label: 'Contact Us', href: '/contact' },
      { label: 'FAQs', href: '/faq' },
      { label: 'Help Center', href: '/help' },
      { label: 'Accessibility', href: '/accessibility' },
      { label: 'Site Map', href: '/sitemap' },
    ],
  },
  {
    title: 'Legal',
    links: [
      { label: 'Privacy Policy', href: '/privacy' },
      { label: 'Terms of Service', href: '/terms' },
      { label: 'Cookie Policy', href: '/cookies' },
      { label: 'Guest Reviews Policy', href: '/reviews-policy' },
    ],
  },
];

const socialLinks = [
  { name: 'Facebook', icon: Facebook, href: 'https://facebook.com/g7hotels' },
  { name: 'Instagram', icon: Instagram, href: 'https://instagram.com/g7hotels' },
  { name: 'Twitter', icon: Twitter, href: 'https://twitter.com/g7hotels' },
  { name: 'YouTube', icon: Youtube, href: 'https://youtube.com/g7hotels' },
  { name: 'LinkedIn', icon: Linkedin, href: 'https://linkedin.com/company/g7hotels' },
];

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-g7-charcoal text-g7-ivory mt-auto">
      {/* Newsletter Section */}
      <div className="border-b border-g7-gold/20">
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-3xl mx-auto text-center">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="font-serif text-3xl md:text-4xl mb-4"
            >
              Stay Connected
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-g7-ivory/70 mb-8"
            >
              Subscribe to receive exclusive offers, updates, and inspiration for your next luxury getaway.
            </motion.p>
            <motion.form
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="flex flex-col sm:flex-row gap-3 max-w-xl mx-auto"
              onSubmit={(e) => e.preventDefault()}
            >
              <Input
                type="email"
                placeholder="Enter your email"
                className="bg-g7-charcoal-light border-g7-gold/50 text-g7-ivory placeholder:text-g7-ivory/50 flex-1"
                required
              />
              <Button
                type="submit"
                className="bg-g7-gold text-g7-charcoal hover:bg-g7-gold-light px-8"
              >
                Subscribe
              </Button>
            </motion.form>
            <p className="text-xs text-g7-ivory/50 mt-4">
              By subscribing, you agree to our{' '}
              <Link href="/privacy" className="text-g7-gold hover:underline">
                Privacy Policy
              </Link>
              {' '}and{' '}
              <Link href="/terms" className="text-g7-gold hover:underline">
                Terms of Service
              </Link>
            </p>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand Section */}
          <div className="lg:col-span-1">
            <Link href="/" className="inline-block mb-6">
              <div className="flex items-center gap-3">
                <div className="relative w-10 h-10 flex items-center justify-center">
                  <div className="absolute inset-0 border-2 border-g7-gold rotate-45"></div>
                  <span className="font-serif text-xl font-bold text-g7-gold relative z-10">
                    G7
                  </span>
                </div>
                <div>
                  <h3 className="font-serif text-xl font-light tracking-wide leading-none">
                    G7 Hotels
                  </h3>
                  <p className="text-xs tracking-[0.2em] uppercase mt-1 text-g7-ivory/70">
                    Luxury & Fine Dining
                  </p>
                </div>
              </div>
            </Link>
            <p className="text-g7-ivory/70 mb-6 leading-relaxed">
              Experience unparalleled luxury, exceptional service, and unforgettable moments at G7 Hotels. 
              Where every detail is crafted for your comfort and delight.
            </p>
            {/* Social Links */}
            <div className="flex gap-4">
              {socialLinks.map((social) => (
                <Link
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 flex items-center justify-center border border-g7-gold/30 rounded-full text-g7-ivory/70 hover:bg-g7-gold hover:text-g7-charcoal transition-all duration-300"
                  aria-label={social.name}
                >
                  <social.icon className="h-5 w-5" />
                </Link>
              ))}
            </div>
          </div>

          {/* Footer Links */}
          {footerSections.map((section) => (
            <div key={section.title}>
              <h4 className="font-serif text-lg mb-6 text-g7-gold">{section.title}</h4>
              <ul className="space-y-3">
                {section.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-g7-ivory/70 hover:text-g7-gold transition-colors duration-300 inline-block"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Contact Section */}
        <div className="border-t border-g7-gold/20 pt-12 mb-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 flex items-center justify-center bg-g7-gold/10 rounded-full flex-shrink-0">
                <MapPin className="h-5 w-5 text-g7-gold" />
              </div>
              <div>
                <h5 className="font-medium mb-2">Global Headquarters / Tirupati</h5>
                <p className="text-g7-ivory/70 text-sm leading-relaxed">
                  Merlapaka tollplaza, yerpedu<br />
                  Srikalahasti, Andhra Pradesh<br />
                  Pin Code: 517619
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 flex items-center justify-center bg-g7-gold/10 rounded-full flex-shrink-0">
                <Phone className="h-5 w-5 text-g7-gold" />
              </div>
              <div>
                <h5 className="font-medium mb-2">Contact Us</h5>
                <p className="text-g7-ivory/70 text-sm leading-relaxed">
                  <a href="tel:+919491708080" className="hover:text-g7-gold transition-colors">
                    +91 94917 08080
                  </a>
                  <br />
                  <span className="text-xs">24/7 Guest Services</span>
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 flex items-center justify-center bg-g7-gold/10 rounded-full flex-shrink-0">
                <Mail className="h-5 w-5 text-g7-gold" />
              </div>
              <div>
                <h5 className="font-medium mb-2">Email Us</h5>
                <p className="text-g7-ivory/70 text-sm leading-relaxed">
                  <a href="mailto:reservations@g7hotels.in" className="hover:text-g7-gold transition-colors">
                    reservations@g7hotels.in
                  </a>
                  <br />
                  <a href="mailto:concierge@g7hotels.in" className="hover:text-g7-gold transition-colors">
                    concierge@g7hotels.in
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Awards & Certifications */}
        <div className="border-t border-g7-gold/20 pt-8 mb-12">
          <div className="flex flex-wrap items-center justify-center gap-8 text-g7-ivory/50 text-sm">
            <span>★★★★★ Five Star Luxury</span>
            <span>•</span>
            <span>AAA Five Diamond</span>
            <span>•</span>
            <span>Forbes Travel Guide</span>
            <span>•</span>
            <span>World's Best Awards</span>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-g7-gold/20 pt-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-g7-ivory/50 text-sm text-center md:text-left">
              © {new Date().getFullYear()} G7 Hotels. All rights reserved.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4 text-g7-ivory/50 text-sm">
              <Link href="/privacy" className="hover:text-g7-gold transition-colors">
                Privacy
              </Link>
              <span>•</span>
              <Link href="/terms" className="hover:text-g7-gold transition-colors">
                Terms
              </Link>
              <span>•</span>
              <Link href="/cookies" className="hover:text-g7-gold transition-colors">
                Cookies
              </Link>
              <span>•</span>
              <Link href="/accessibility" className="hover:text-g7-gold transition-colors">
                Accessibility
              </Link>
              <span>•</span>
              <CookieSettingsButton />
            </div>
          </div>
        </div>
      </div>

      {/* Scroll to Top Button */}
      <Button
        onClick={scrollToTop}
        size="icon"
        className="fixed bottom-24 right-6 z-40 bg-g7-gold text-g7-charcoal hover:bg-g7-gold-light shadow-lg"
        aria-label="Scroll to top"
      >
        <ChevronUp className="h-5 w-5" />
      </Button>
    </footer>
  );
}
