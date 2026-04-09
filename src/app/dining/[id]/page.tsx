'use client';

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  ArrowLeft,
  Clock,
  MapPin,
  Phone,
  Mail,
  Star,
  Calendar,
  Users,
  UtensilsCrossed,
  ChefHat,
  Award,
  ChevronLeft,
  ChevronRight,
  Heart,
  Share2,
  X,
} from 'lucide-react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { cn } from '@/lib/utils';

/**
 * G7 Hotels Restaurant Detail Page
 * Detailed restaurant information with menu and table booking
 */

export default function RestaurantDetailPage() {
  const params = useParams();
  const router = useRouter();
  const restaurantId = params.id as string;

  const [restaurant, setRestaurant] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    fetchRestaurant();
  }, [restaurantId]);

  const fetchRestaurant = async () => {
    setLoading(true);
    try {
      // Mock data
      const mockRestaurant = {
        id: restaurantId,
        name: 'The Golden Fork',
        description: 'Experience award-winning fine dining at The Golden Fork, where innovative European fusion cuisine meets impeccable service. Our elegant restaurant features panoramic city views, intimate dining nooks, and a private dining room for special occasions.\n\nExecutive Chef Michel Laurent brings over 20 years of culinary excellence, having trained in Michelin-starred kitchens across Europe. Each dish is a masterpiece, crafted with locally-sourced ingredients and presented with artistic flair.',
        cuisine: ['Continental', 'French', 'Fusion'],
        images: ['/images/dining/fine-dining.jpg', '/images/dining/fine-dining.jpg'],
        priceRange: '$$$$',
        mealTypes: ['Dinner'],
        capacity: 80,
        openingHours: {
          monday: { open: '18:00', close: '23:00', closed: false },
          tuesday: { open: '18:00', close: '23:00', closed: false },
          wednesday: { open: '18:00', close: '23:00', closed: false },
          thursday: { open: '18:00', close: '23:00', closed: false },
          friday: { open: '18:00', close: '00:00', closed: false },
          saturday: { open: '18:00', close: '00:00', closed: false },
          sunday: { open: '18:00', close: '22:00', closed: false },
        },
        dressCode: 'Smart Casual',
        features: [
          'City Views',
          'Private Dining Room',
          'Outdoor Terrace',
          'Valet Parking',
          'Wine Cellar',
        ],
        dietaryOptions: ['Vegetarian', 'Vegan', 'Gluten-Free'],
        chef: {
          name: 'Michel Laurent',
          title: 'Executive Chef',
          bio: 'Chef Michel Laurent brings over 20 years of culinary excellence from Michelin-starred kitchens across Europe.',
          image: '/images/dining/chef.jpg',
        },
        menu: {
          id: '1',
          name: 'A La Carte Menu',
          description: 'Our signature dishes crafted with the finest ingredients',
          items: [
            {
              id: '1',
              name: 'Pan-Seared Foie Gras',
              description: 'With caramelized figs and balsamic reduction',
              price: 3,750,
              currency: 'INR',
              category: 'Starters',
              dietary: [],
              vegetarian: false,
              available: true,
            },
            {
              id: '2',
              name: 'Wagyu Beef Tenderloin',
              description: 'With truffle mash and red wine jus',
              price: 7,900,
              currency: 'INR',
              category: 'Main Course',
              dietary: [],
              vegetarian: false,
              available: true,
            },
          ],
        },
        tableBooking: {
          enabled: true,
          minGuests: 1,
          maxGuests: 20,
          depositRequired: true,
          depositAmount: 50,
        },
        rating: 4.8,
        reviewCount: 234,
        featured: true,
      };

      setRestaurant(mockRestaurant);
    } catch (error) {
      console.error('Error fetching restaurant:', error);
    } finally {
      setLoading(false);
    }
  };

  const today = new Date().toLocaleLowerCase();
  const todayHours = restaurant?.openingHours?.[today];

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col bg-g7-ivory">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-g7-gold mx-auto mb-4" />
            <p className="text-g7-charcoal/60">Loading restaurant details...</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (!restaurant) {
    return (
      <div className="min-h-screen flex flex-col bg-g7-ivory">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <UtensilsCrossed className="h-16 w-16 mx-auto text-g7-gold/30 mb-4" />
            <h2 className="font-serif text-2xl text-g7-charcoal mb-2">
              Restaurant Not Found
            </h2>
            <Button onClick={() => router.push('/dining')} variant="outline">
              Back to Dining
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-g7-ivory">
      <Header />

      {/* Breadcrumb */}
      <nav className="bg-white border-b border-g7-gold/20">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-2 text-sm">
            <Link href="/" className="text-g7-charcoal/60 hover:text-g7-gold">
              Home
            </Link>
            <span className="text-g7-gold">/</span>
            <Link href="/dining" className="text-g7-charcoal/60 hover:text-g7-gold">
              Dining
            </Link>
            <span className="text-g7-gold">/</span>
            <span className="text-g7-gold">{restaurant.name}</span>
          </div>
        </div>
      </nav>

      <main className="flex-1">
        {/* Image Gallery */}
        <section className="bg-white">
          <div className="container mx-auto px-4 py-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <div className="relative aspect-[16/10] overflow-hidden rounded-lg">
                <img
                  src={restaurant.images[currentImageIndex]}
                  alt={restaurant.name}
                  className="w-full h-full object-cover"
                />
                {restaurant.images.length > 1 && (
                  <>
                    <button
                      onClick={() =>
                        setCurrentImageIndex(
                          currentImageIndex === 0
                            ? restaurant.images.length - 1
                            : currentImageIndex - 1
                        )
                      }
                      className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/90 hover:bg-g7-gold hover:text-g7-charcoal rounded-full flex items-center justify-center"
                    >
                      <ChevronLeft className="h-5 w-5" />
                    </button>
                    <button
                      onClick={() =>
                        setCurrentImageIndex(
                          currentImageIndex === restaurant.images.length - 1
                            ? 0
                            : currentImageIndex + 1
                        )
                      }
                      className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/90 hover:bg-g7-gold hover:text-g7-charcoal rounded-full flex items-center justify-center"
                    >
                      <ChevronRight className="h-5 w-5" />
                    </button>
                  </>
                )}
                <div className="absolute top-4 left-4 flex gap-2">
                  <Badge className="bg-g7-gold text-g7-charcoal">
                    {restaurant.priceRange}
                  </Badge>
                  {todayHours && !todayHours.closed && (
                    <Badge variant="secondary" className="bg-black/70 text-white">
                      Open until {todayHours.close}
                    </Badge>
                  )}
                </div>
                <div className="absolute top-4 right-4 flex gap-2">
                  <button
                    onClick={() => setIsFavorite(!isFavorite)}
                    className="w-10 h-10 bg-white/90 hover:bg-white rounded-full flex items-center justify-center"
                  >
                    <Heart
                      className={cn(
                        'h-5 w-5',
                        isFavorite ? 'fill-red-500 text-red-500' : 'text-g7-charcoal'
                      )}
                    />
                  </button>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-2">
                {restaurant.images.map((image: string, index: number) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={cn(
                      'relative aspect-[4/3] overflow-hidden rounded-lg transition-all',
                      currentImageIndex === index
                        ? 'ring-2 ring-g7-gold ring-offset-2'
                        : 'hover:opacity-80'
                    )}
                  >
                    <img src={image} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Restaurant Details */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
              <div className="lg:col-span-2">
                <div className="mb-6">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="flex items-center gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={cn(
                            'h-5 w-5',
                            i < Math.floor(restaurant.rating)
                              ? 'fill-g7-gold text-g7-gold'
                              : 'fill-gray-200 text-gray-200'
                          )}
                        />
                      ))}
                    </div>
                    <span className="text-g7-charcoal/60">
                      {restaurant.rating} ({restaurant.reviewCount} reviews)
                    </span>
                  </div>
                  <h1 className="font-serif text-4xl md:text-5xl text-g7-charcoal mb-4">
                    {restaurant.name}
                  </h1>
                  <div className="flex flex-wrap items-center gap-6 text-g7-charcoal/70">
                    <div className="flex items-center gap-2">
                      <UtensilsCrossed className="h-5 w-5 text-g7-gold" />
                      <span>{restaurant.cuisine.join(' • ')}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="h-5 w-5 text-g7-gold" />
                      <span>City View</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Users className="h-5 w-5 text-g7-gold" />
                      <span>Capacity: {restaurant.capacity}</span>
                    </div>
                  </div>
                </div>

                <Separator className="my-8" />

                {/* Description */}
                <div className="mb-8">
                  <h2 className="font-serif text-2xl text-g7-charcoal mb-4">
                    About The Restaurant
                  </h2>
                  <p className="text-g7-charcoal/80 leading-relaxed whitespace-pre-line">
                    {restaurant.description}
                  </p>
                </div>

                {/* Chef Section */}
                {restaurant.chef && (
                  <div className="mb-8 p-6 bg-white rounded-lg">
                    <div className="flex items-start gap-4">
                      <div className="w-16 h-16 bg-g7-gold/10 rounded-full flex items-center justify-center flex-shrink-0">
                        <ChefHat className="h-8 w-8 text-g7-gold" />
                      </div>
                      <div>
                        <h3 className="font-serif text-xl text-g7-charcoal mb-1">
                          {restaurant.chef.name}
                        </h3>
                        <p className="text-g7-gold text-sm mb-2">{restaurant.chef.title}</p>
                        <p className="text-g7-charcoal/70 text-sm">{restaurant.chef.bio}</p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Tabs */}
                <Tabs defaultValue="menu" className="w-full">
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="menu">Menu</TabsTrigger>
                    <TabsTrigger value="info">Info</TabsTrigger>
                    <TabsTrigger value="hours">Hours</TabsTrigger>
                  </TabsList>
                  <TabsContent value="menu" className="mt-6">
                    <Card>
                      <CardContent className="p-6">
                        <h3 className="font-serif text-xl text-g7-charcoal mb-4">
                          {restaurant.menu?.name}
                        </h3>
                        <p className="text-g7-charcoal/70 mb-6">
                          {restaurant.menu?.description}
                        </p>
                        <div className="space-y-4">
                          {restaurant.menu?.items.map((item: any) => (
                            <div
                              key={item.id}
                              className="flex justify-between items-start py-3 border-b border-g7-gold/20 last:border-0"
                            >
                              <div className="flex-1">
                                <h4 className="font-medium text-g7-charcoal mb-1">
                                  {item.name}
                                </h4>
                                <p className="text-sm text-g7-charcoal/70">
                                  {item.description}
                                </p>
                              </div>
                              <span className="ml-4 font-medium text-g7-charcoal">
                                ₹{item.price.toLocaleString()}
                              </span>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>
                  <TabsContent value="info" className="mt-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <Card>
                        <CardContent className="p-6">
                          <h3 className="font-medium text-g7-charcoal mb-4">Features</h3>
                          <ul className="space-y-2">
                            {restaurant.features.map((feature: string, index: number) => (
                              <li key={index} className="flex items-center gap-2 text-g7-charcoal/70">
                                <Award className="h-4 w-4 text-g7-gold" />
                                {feature}
                              </li>
                            ))}
                          </ul>
                        </CardContent>
                      </Card>
                      <Card>
                        <CardContent className="p-6">
                          <h3 className="font-medium text-g7-charcoal mb-4">Dietary Options</h3>
                          <div className="flex flex-wrap gap-2">
                            {restaurant.dietaryOptions.map((option: string, index: number) => (
                              <Badge
                                key={index}
                                variant="outline"
                                className="border-g7-gold/30 text-g7-charcoal/70"
                              >
                                {option}
                              </Badge>
                            ))}
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  </TabsContent>
                  <TabsContent value="hours" className="mt-6">
                    <Card>
                      <CardContent className="p-6">
                        <h3 className="font-medium text-g7-charcoal mb-4">Opening Hours</h3>
                        <div className="space-y-2">
                          {Object.entries(restaurant.openingHours).map(
                            ([day, hours]: [string, any]) => (
                              <div
                                key={day}
                                className="flex justify-between items-center"
                              >
                                <span className="text-g7-charcoal capitalize">
                                  {day}
                                </span>
                                {hours.closed ? (
                                  <span className="text-red-600">Closed</span>
                                ) : (
                                  <span className="text-g7-charcoal/70">
                                    {hours.open} - {hours.close}
                                  </span>
                                )}
                              </div>
                            )
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>
                </Tabs>
              </div>

              {/* Booking Sidebar */}
              <div className="lg:col-span-1">
                <Card className="sticky top-24 p-6">
                  <h3 className="font-serif text-xl text-g7-charcoal mb-4">
                    Reserve a Table
                  </h3>
                  <Button
                    asChild
                    className="w-full bg-g7-gold text-g7-charcoal hover:bg-g7-gold-light mb-4 py-6"
                  >
                    <Link href={`/booking?restaurant=${restaurant.id}`}>
                      <Calendar className="mr-2 h-5 w-5" />
                      Book a Table
                    </Link>
                  </Button>
                  {restaurant.tableBooking?.depositRequired && (
                    <p className="text-sm text-g7-charcoal/60 mb-6">
                      ₹{restaurant.tableBooking.depositAmount?.toLocaleString()} deposit required
                    </p>
                  )}
                  <Separator className="my-6" />
                  <div>
                    <h4 className="font-medium text-g7-charcoal mb-3">Contact</h4>
                    <div className="space-y-3">
                      <a
                        href="tel:+18001234567"
                        className="flex items-center gap-3 text-g7-charcoal/70 hover:text-g7-gold"
                      >
                        <Phone className="h-5 w-5" />
                        <span>+1 800 123 4567</span>
                      </a>
                      <a
                        href="mailto:dining@g7hotels.com"
                        className="flex items-center gap-3 text-g7-charcoal/70 hover:text-g7-gold"
                      >
                        <Mail className="h-5 w-5" />
                        <span>dining@g7hotels.com</span>
                      </a>
                    </div>
                  </div>
                </Card>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
