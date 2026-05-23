'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Menu,
  X,
  Search,
  User,
  Phone,
  Calendar,
  ChevronDown,
  Globe,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from '@/components/ui/navigation-menu';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';

/**
 * G7 Hotels Header Component
 * Luxury navigation with sticky behavior, mega menu, and mobile drawer
 * Inspired by Taj Hotels' elegant navigation system
 */

const navigationItems = [
  {
    label: 'Rooms & Suites',
    href: '/rooms',
    description: 'Luxury accommodations with stunning views',
    image: '/images/rooms/hero-room.jpg',
    children: [
      { label: 'All Rooms', href: '/rooms' },
      { label: 'Standard Rooms', href: '/rooms?type=standard' },
      { label: 'Deluxe Rooms', href: '/rooms?type=deluxe' },
      { label: 'Suites', href: '/rooms?type=suite' },
      { label: 'Presidential Suite', href: '/rooms?type=presidential' },
      { label: 'Royal Suite', href: '/rooms?type=royal' },
    ],
  },
  {
    label: 'Dining',
    href: '/dining',
    description: 'Exquisite culinary experiences',
    image: '/images/dining/restaurant-hero.jpg',
    children: [
      { label: 'All Restaurants', href: '/dining' },
      { label: 'Fine Dining', href: '/dining?type=fine-dining' },
      { label: 'Casual Dining', href: '/dining?type=casual' },
      { label: 'Bars & Lounges', href: '/dining?type=bar' },
      { label: 'Private Dining', href: '/dining?type=private' },
    ],
  },
  {
    label: 'Experiences',
    href: '/experiences',
    description: 'Curated experiences and activities',
    image: '/images/experiences/hero.jpg',
    children: [
      { label: 'All Experiences', href: '/experiences' },
      { label: 'Adventure', href: '/experiences?category=adventure' },
      { label: 'Cultural', href: '/experiences?category=cultural' },
      { label: 'Wellness', href: '/experiences?category=wellness' },
      { label: 'Culinary', href: '/experiences?category=culinary' },
    ],
  },
  {
    label: 'Spa & Wellness',
    href: '/spa',
    description: 'Rejuvenate your body and mind',
    children: [
      { label: 'Spa Menu', href: '/spa' },
      { label: 'Massages', href: '/spa?category=massage' },
      { label: 'Facials', href: '/spa?category=facial' },
      { label: 'Body Treatments', href: '/spa?category=body-treatment' },
      { label: 'Ayurveda', href: '/spa?category=ayurveda' },
    ],
  },
  {
    label: 'Events',
    href: '/events',
    description: 'Celebrations and corporate events',
    children: [
      { label: 'Weddings', href: '/events?type=wedding' },
      { label: 'Corporate Events', href: '/events?type=corporate' },
      { label: 'Social Gatherings', href: '/events?type=social' },
      { label: 'Conferences', href: '/events?type=conference' },
      { label: 'Venues', href: '/events/venues' },
    ],
  },
  {
    label: 'Offers',
    href: '/offers',
    description: 'Exclusive deals and packages',
    children: [
      { label: 'All Offers', href: '/offers' },
      { label: 'Room Packages', href: '/offers?type=room' },
      { label: 'Dining Offers', href: '/offers?type=dining' },
      { label: 'Spa Packages', href: '/offers?type=spa' },
      { label: 'Last Minute Deals', href: '/offers?type=last-minute' },
    ],
  },
];

const secondaryNav = [
  { label: 'About', href: '/about' },
  { label: 'Gallery', href: '/gallery' },
  { label: 'Journal', href: '/journal' },
  { label: 'Contact', href: '/contact' },
  { label: 'Loyalty', href: '/loyalty' },
];

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/';
    return pathname.startsWith(href);
  };

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className={cn(
          'fixed top-0 left-0 right-0 z-50 transition-all duration-500',
          isScrolled
            ? 'bg-g7-charcoal/95 backdrop-blur-md shadow-lg'
            : 'bg-transparent'
        )}
      >
        {/* Top Bar */}
        <div
          className={cn(
            'transition-all duration-500',
            isScrolled ? 'hidden' : 'block bg-g7-charcoal/80 backdrop-blur-sm'
          )}
        >
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between py-2 text-sm text-g7-ivory/80">
              <div className="flex items-center gap-6">
                <a href="tel:+919491708080" className="flex items-center gap-2 hover:text-g7-gold transition-colors">
                  <Phone className="h-4 w-4" />
                  <span className="hidden sm:inline">+91 94917 08080</span>
                </a>
                <span className="hidden md:inline text-g7-gold">
                  ✓ Best Rate Guaranteed
                </span>
              </div>
              <div className="flex items-center gap-4">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <button className="flex items-center gap-2 hover:text-g7-gold transition-colors">
                      <Globe className="h-4 w-4" />
                      <span className="hidden sm:inline">EN</span>
                      <ChevronDown className="h-3 w-3" />
                    </button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="bg-g7-charcoal border-g7-gold/30">
                    <DropdownMenuItem className="text-g7-ivory hover:text-g7-gold hover:bg-g7-gold/10 cursor-pointer">
                      English
                    </DropdownMenuItem>
                    <DropdownMenuItem className="text-g7-ivory hover:text-g7-gold hover:bg-g7-gold/10 cursor-pointer">
                      Español
                    </DropdownMenuItem>
                    <DropdownMenuItem className="text-g7-ivory hover:text-g7-gold hover:bg-g7-gold/10 cursor-pointer">
                      Français
                    </DropdownMenuItem>
                    <DropdownMenuItem className="text-g7-ivory hover:text-g7-gold hover:bg-g7-gold/10 cursor-pointer">
                      Deutsch
                    </DropdownMenuItem>
                    <DropdownMenuItem className="text-g7-ivory hover:text-g7-gold hover:bg-g7-gold/10 cursor-pointer">
                      中文
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
                <Link href="/contact" className="hidden sm:block hover:text-g7-gold transition-colors">
                  Help
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Main Header */}
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between py-4">
            {/* Logo */}
            <Link href="/" className="group">
              <motion.div
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
                className="flex items-center gap-3"
              >
                <div className="relative w-12 h-12 flex items-center justify-center">
                  <div className="absolute inset-0 border-2 border-g7-gold rotate-45"></div>
                  <span className="font-serif text-2xl font-bold text-g7-gold relative z-10">
                    G7
                  </span>
                </div>
                <div className={cn(
                  'hidden sm:block transition-colors duration-300',
                  isScrolled ? 'text-g7-ivory' : 'text-g7-charcoal'
                )}>
                  <h1 className="font-serif text-2xl font-light tracking-wide leading-none">
                    G7 Hotels
                  </h1>
                  <p className="text-xs tracking-[0.3em] uppercase mt-1 opacity-70">
                    Luxury & Fine Dining
                  </p>
                </div>
              </motion.div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-1">
              {navigationItems.map((item) => (
                <NavigationMenu key={item.href}>
                  <NavigationMenuList>
                    <NavigationMenuItem>
                      {item.children ? (
                        <>
                          <NavigationMenuTrigger
                            className={cn(
                              'text-base font-medium transition-colors duration-300',
                              isActive(item.href)
                                ? 'text-g7-gold'
                                : isScrolled
                                ? 'text-g7-ivory hover:text-g7-gold'
                                : 'text-g7-charcoal hover:text-g7-gold'
                            )}
                          >
                            {item.label}
                          </NavigationMenuTrigger>
                          <NavigationMenuContent>
                            <div className="grid gap-4 p-6 w-[600px]">
                              <div className="grid grid-cols-2 gap-4">
                                {item.children.map((child) => (
                                  <Link
                                    key={child.href}
                                    href={child.href}
                                    className={cn(
                                      'group block p-3 rounded-lg transition-all duration-300',
                                      'hover:bg-g7-gold/10'
                                    )}
                                  >
                                    <div className="font-medium text-g7-charcoal group-hover:text-g7-gold transition-colors">
                                      {child.label}
                                    </div>
                                  </Link>
                                ))}
                              </div>
                              {item.image && (
                                <div className="relative h-40 overflow-hidden rounded-lg">
                                  <img
                                    src={item.image}
                                    alt={item.label}
                                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                  />
                                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                                  <p className="absolute bottom-3 left-3 text-white font-medium">
                                    {item.description}
                                  </p>
                                </div>
                              )}
                            </div>
                          </NavigationMenuContent>
                        </>
                      ) : (
                        <NavigationMenuLink asChild>
                          <Link
                            href={item.href}
                            className={cn(
                              'text-base font-medium transition-colors duration-300 px-4 py-2',
                              isActive(item.href)
                                ? 'text-g7-gold'
                                : isScrolled
                                ? 'text-g7-ivory hover:text-g7-gold'
                                : 'text-g7-charcoal hover:text-g7-gold'
                            )}
                          >
                            {item.label}
                          </Link>
                        </NavigationMenuLink>
                      )}
                    </NavigationMenuItem>
                  </NavigationMenuList>
                </NavigationMenu>
              ))}
            </nav>

            {/* Right Actions */}
            <div className="flex items-center gap-2 sm:gap-4">
              {/* Search */}
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsSearchOpen(true)}
                className={cn(
                  'transition-colors',
                  isScrolled ? 'text-g7-ivory hover:text-g7-gold' : 'text-g7-charcoal hover:text-g7-gold'
                )}
              >
                <Search className="h-5 w-5" />
              </Button>

              {/* User Menu */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className={cn(
                      'transition-colors',
                      isScrolled ? 'text-g7-ivory hover:text-g7-gold' : 'text-g7-charcoal hover:text-g7-gold'
                    )}
                  >
                    <User className="h-5 w-5" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuItem asChild>
                    <Link href="/login" className="cursor-pointer">Sign In</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/register" className="cursor-pointer">Create Account</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/bookings" className="cursor-pointer">My Bookings</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/loyalty" className="cursor-pointer">Loyalty Program</Link>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              {/* Book Now Button */}
              <Button
                asChild
                className="hidden md:flex bg-g7-gold text-g7-charcoal hover:bg-g7-gold-light px-6"
              >
                <Link href="/booking">
                  <Calendar className="mr-2 h-4 w-4" />
                  Book Now
                </Link>
              </Button>

              {/* Mobile Menu */}
              <Sheet>
                <SheetTrigger asChild className="lg:hidden">
                  <Button
                    variant="ghost"
                    size="icon"
                    className={cn(
                      'transition-colors',
                      isScrolled ? 'text-g7-ivory hover:text-g7-gold' : 'text-g7-charcoal hover:text-g7-gold'
                    )}
                  >
                    <Menu className="h-6 w-6" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="right" className="w-full sm:w-[400px] bg-g7-charcoal text-g7-ivory">
                  <MobileMenu />
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Search Modal */}
      <AnimatePresence>
        {isSearchOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] bg-g7-charcoal/95 backdrop-blur-md"
          >
            <div className="container mx-auto px-4 py-20">
              <div className="max-w-3xl mx-auto">
                <div className="flex items-center justify-between mb-8">
                  <h2 className="text-g7-ivory font-serif text-3xl">Search</h2>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setIsSearchOpen(false)}
                    className="text-g7-ivory hover:text-g7-gold"
                  >
                    <X className="h-6 w-6" />
                  </Button>
                </div>
                <Input
                  placeholder="Search rooms, dining, experiences..."
                  className="bg-transparent border-g7-gold/50 text-g7-ivory placeholder:text-g7-ivory/50 text-lg h-14"
                  autoFocus
                />
                <div className="mt-8">
                  <p className="text-g7-ivory/60 text-sm mb-4">Popular Searches</p>
                  <div className="flex flex-wrap gap-2">
                    {['Presidential Suite', 'Fine Dining', 'Spa Packages', 'Wedding Venues'].map((term) => (
                      <button
                        key={term}
                        onClick={() => setIsSearchOpen(false)}
                        className="px-4 py-2 border border-g7-gold/30 rounded-full text-g7-ivory/80 hover:bg-g7-gold/20 hover:text-g7-gold transition-colors"
                      >
                        {term}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

function MobileMenu() {
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({});

  const toggleSection = (section: string) => {
    setOpenSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  return (
    <div className="py-6">
      {/* Quick Book CTA */}
      <Link href="/booking">
        <Button className="w-full bg-g7-gold text-g7-charcoal hover:bg-g7-gold-light mb-8">
          <Calendar className="mr-2 h-4 w-4" />
          Book Your Stay
        </Button>
      </Link>

      {/* Main Navigation */}
      <nav className="space-y-2">
        {navigationItems.map((item) => (
          <div key={item.href}>
            {item.children ? (
              <div>
                <button
                  onClick={() => toggleSection(item.href)}
                  className="w-full flex items-center justify-between py-3 text-left text-lg font-medium text-g7-ivory hover:text-g7-gold transition-colors"
                >
                  {item.label}
                  <ChevronDown
                    className={cn(
                      'h-5 w-5 transition-transform duration-300',
                      openSections[item.href] ? 'rotate-180' : ''
                    )}
                  />
                </button>
                <AnimatePresence>
                  {openSections[item.href] && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden pl-4"
                    >
                      <div className="py-2 space-y-2 border-l border-g7-gold/30">
                        {item.children.map((child) => (
                          <Link
                            key={child.href}
                            href={child.href}
                            className="block py-2 text-g7-ivory/70 hover:text-g7-gold transition-colors"
                          >
                            {child.label}
                          </Link>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <Link
                href={item.href}
                className="block py-3 text-lg font-medium text-g7-ivory hover:text-g7-gold transition-colors"
              >
                {item.label}
              </Link>
            )}
          </div>
        ))}
      </nav>

      {/* Secondary Navigation */}
      <div className="mt-8 pt-8 border-t border-g7-gold/20">
        <div className="grid grid-cols-2 gap-4">
          {secondaryNav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="py-2 text-g7-ivory/70 hover:text-g7-gold transition-colors"
            >
              {item.label}
            </Link>
          ))}
        </div>
      </div>

      {/* Auth Links */}
      <div className="mt-8 pt-8 border-t border-g7-gold/20 space-y-3">
        <Link
          href="/login"
          className="block w-full py-3 text-center border border-g7-gold text-g7-gold hover:bg-g7-gold hover:text-g7-charcoal transition-all"
        >
          Sign In
        </Link>
        <Link
          href="/register"
          className="block w-full py-3 text-center text-g7-ivory hover:text-g7-gold transition-colors"
        >
          Create Account
        </Link>
      </div>
    </div>
  );
}
