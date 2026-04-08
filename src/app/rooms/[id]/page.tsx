'use client';

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  ArrowLeft,
  Bed,
  Users,
  Maximize,
  Wifi,
  Coffee,
  TV,
  Snowflake,
  Bath,
  UtensilsCrossed,
  Check,
  Phone,
  Mail,
  Calendar,
  Share2,
  Heart,
  Play,
  X,
  ChevronLeft,
  ChevronRight,
  Star,
  MapPin,
} from 'lucide-react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { cn, format } from '@/lib/utils';

/**
 * G7 Hotels Room Detail Page
 * Detailed room information with booking and amenities
 */

const amenityIcons: Record<string, React.ReactNode> = {
  'Free Wi-Fi': <Wifi className="h-5 w-5" />,
  'Room Service': <UtensilsCrossed className="h-5 w-5" />,
  'Air Conditioning': <Snowflake className="h-5 w-5" />,
  'Smart TV': <TV className="h-5 w-5" />,
  'Coffee Maker': <Coffee className="h-5 w-5" />,
  'Bathtub': <Bath className="h-5 w-5" />,
  'Mini Bar': <Coffee className="h-5 w-5" />,
  'Safe': <div className="h-5 w-5" />,
  'Balcony': <div className="h-5 w-5" />,
  'Work Desk': <div className="h-5 w-5" />,
};

export default function RoomDetailPage() {
  const params = useParams();
  const router = useRouter();
  const roomId = params.id as string;

  const [room, setRoom] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isFavorite, setIsFavorite] = useState(false);
  const [showVirtualTour, setShowVirtualTour] = useState(false);

  useEffect(() => {
    fetchRoom();
  }, [roomId]);

  const fetchRoom = async () => {
    setLoading(true);
    try {
      // In a real app, this would fetch from the API
      // For now, we'll use mock data
      const mockRoom = {
        id: roomId,
        name: 'Presidential Suite',
        type: 'presidential',
        view: 'city',
        description: 'Experience unparalleled luxury in our Presidential Suite, featuring panoramic city views, a private terrace, and dedicated butler service. This expansive 2,500-square-foot suite offers the ultimate in comfort and elegance with a separate living area, dining room, and master bedroom with king-sized bed.\n\nThe suite is meticulously designed with premium furnishings, original artwork, and state-of-the-art amenities. Enjoy exclusive access to the Executive Lounge with complimentary breakfast, evening cocktails, and all-day refreshments.',
        shortDescription: 'The ultimate in luxury with panoramic city views, private terrace, and dedicated butler service.',
        images: [
          '/images/rooms/luxury-room.jpg',
          '/images/rooms/luxury-room.jpg',
          '/images/rooms/luxury-room.jpg',
        ],
        virtualTourUrl: '/virtual-tour',
        basePrice: 1500,
        currency: 'USD',
        size: 2500,
        maxOccupancy: 4,
        maxAdults: 4,
        maxChildren: 2,
        beds: [
          { type: 'king', count: 2 },
        ],
        amenities: [
          'Free Wi-Fi',
          'Room Service',
          'Air Conditioning',
          'Smart TV',
          'Coffee Maker',
          'Bathtub',
          'Mini Bar',
          'Safe',
          'Balcony',
          'Work Desk',
        ],
        features: {
          smoking: false,
          petFriendly: false,
          accessible: true,
          connectingRooms: true,
        },
        availability: {
          total: 2,
          available: 1,
        },
        rating: 5,
        reviewCount: 124,
        featured: true,
        sortOrder: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      setRoom(mockRoom);
    } catch (error) {
      console.error('Error fetching room:', error);
    } finally {
      setLoading(false);
    }
  };

  const handlePrevImage = () => {
    setCurrentImageIndex((prev) =>
      prev === 0 ? room.images.length - 1 : prev - 1
    );
  };

  const handleNextImage = () => {
    setCurrentImageIndex((prev) =>
      prev === room.images.length - 1 ? 0 : prev + 1
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col bg-g7-ivory">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-g7-gold mx-auto mb-4" />
            <p className="text-g7-charcoal/60">Loading room details...</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (!room) {
    return (
      <div className="min-h-screen flex flex-col bg-g7-ivory">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <Bed className="h-16 w-16 mx-auto text-g7-gold/30 mb-4" />
            <h2 className="font-serif text-2xl text-g7-charcoal mb-2">
              Room Not Found
            </h2>
            <Button onClick={() => router.push('/rooms')} variant="outline">
              Back to Rooms
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
            <Link href="/rooms" className="text-g7-charcoal/60 hover:text-g7-gold">
              Rooms
            </Link>
            <span className="text-g7-gold">/</span>
            <span className="text-g7-gold">{room.name}</span>
          </div>
        </div>
      </nav>

      <main className="flex-1">
        {/* Image Gallery */}
        <section className="bg-white">
          <div className="container mx-auto px-4 py-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {/* Main Image */}
              <div className="relative aspect-[4/3] lg:aspect-[16/10] overflow-hidden rounded-lg">
                <img
                  src={room.images[currentImageIndex]}
                  alt={room.name}
                  className="w-full h-full object-cover transition-transform duration-500"
                />
                
                {/* Image Navigation */}
                {room.images.length > 1 && (
                  <>
                    <button
                      onClick={handlePrevImage}
                      className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/90 hover:bg-g7-gold hover:text-g7-charcoal rounded-full flex items-center justify-center transition-colors"
                    >
                      <ChevronLeft className="h-5 w-5" />
                    </button>
                    <button
                      onClick={handleNextImage}
                      className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/90 hover:bg-g7-gold hover:text-g7-charcoal rounded-full flex items-center justify-center transition-colors"
                    >
                      <ChevronRight className="h-5 w-5" />
                    </button>
                  </>
                )}

                {/* Badges */}
                <div className="absolute top-4 left-4 flex gap-2">
                  <Badge className="bg-g7-gold text-g7-charcoal">
                    {room.type}
                  </Badge>
                  <Badge variant="secondary" className="bg-black/70 text-white">
                    {room.view} View
                  </Badge>
                </div>

                {/* Favorite Button */}
                <button
                  onClick={() => setIsFavorite(!isFavorite)}
                  className="absolute top-4 right-4 w-10 h-10 bg-white/90 hover:bg-white rounded-full flex items-center justify-center transition-colors"
                >
                  <Heart
                    className={cn(
                      'h-5 w-5',
                      isFavorite ? 'fill-red-500 text-red-500' : 'text-g7-charcoal'
                    )}
                  />
                </button>

                {/* Virtual Tour Button */}
                {room.virtualTourUrl && (
                  <button
                    onClick={() => setShowVirtualTour(true)}
                    className="absolute bottom-4 left-4 bg-g7-gold text-g7-charcoal px-4 py-2 rounded-full flex items-center gap-2 hover:bg-g7-gold-light transition-colors"
                  >
                    <Play className="h-4 w-4 fill-current" />
                    <span>Virtual Tour</span>
                  </button>
                )}
              </div>

              {/* Thumbnails */}
              <div className="grid grid-cols-3 gap-2">
                {room.images.map((image: string, index: number) => (
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
                    <img
                      src={image}
                      alt={`${room.name} ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Room Details */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
              {/* Main Content */}
              <div className="lg:col-span-2">
                {/* Header */}
                <div className="mb-8">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="flex items-center gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={cn(
                            'h-5 w-5',
                            i < room.rating
                              ? 'fill-g7-gold text-g7-gold'
                              : 'fill-gray-200 text-gray-200'
                          )}
                        />
                      ))}
                    </div>
                    <span className="text-g7-charcoal/60">
                      {room.rating} ({room.reviewCount} reviews)
                    </span>
                  </div>
                  
                  <h1 className="font-serif text-4xl md:text-5xl text-g7-charcoal mb-4">
                    {room.name}
                  </h1>
                  
                  <div className="flex flex-wrap items-center gap-6 text-g7-charcoal/70">
                    <div className="flex items-center gap-2">
                      <MapPin className="h-5 w-5 text-g7-gold" />
                      <span>{room.view} View</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Maximize className="h-5 w-5 text-g7-gold" />
                      <span>{room.size} sq ft</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Users className="h-5 w-5 text-g7-gold" />
                      <span>Up to {room.maxOccupancy} guests</span>
                    </div>
                  </div>
                </div>

                <Separator className="my-8" />

                {/* Description */}
                <div className="mb-8">
                  <h2 className="font-serif text-2xl text-g7-charcoal mb-4">
                    About This Room
                  </h2>
                  <p className="text-g7-charcoal/80 leading-relaxed whitespace-pre-line">
                    {room.description}
                  </p>
                </div>

                {/* Features */}
                <div className="mb-8">
                  <h2 className="font-serif text-2xl text-g7-charcoal mb-4">
                    Room Features
                  </h2>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="flex items-center gap-2">
                      <Check className="h-5 w-5 text-g7-gold" />
                      <span className="text-g7-charcoal/70">City View</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Check className="h-5 w-5 text-g7-gold" />
                      <span className="text-g7-charcoal/70">King Bed</span>
                    </div>
                    {room.features.accessible && (
                      <div className="flex items-center gap-2">
                        <Check className="h-5 w-5 text-g7-gold" />
                        <span className="text-g7-charcoal/70">Accessible</span>
                      </div>
                    )}
                    {room.features.connectingRooms && (
                      <div className="flex items-center gap-2">
                        <Check className="h-5 w-5 text-g7-gold" />
                        <span className="text-g7-charcoal/70">Connecting Rooms</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Amenities Tabs */}
                <Tabs defaultValue="amenities" className="w-full">
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="amenities">Amenities</TabsTrigger>
                    <TabsTrigger value="bedding">Bedding & Bath</TabsTrigger>
                  </TabsList>
                  <TabsContent value="amenities" className="mt-6">
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                      {room.amenities.map((amenity: string) => (
                        <div
                          key={amenity}
                          className="flex items-center gap-3 p-4 bg-white rounded-lg"
                        >
                          <div className="text-g7-gold">
                            {amenityIcons[amenity] || <div className="h-5 w-5" />}
                          </div>
                          <span className="text-g7-charcoal/80">{amenity}</span>
                        </div>
                      ))}
                    </div>
                  </TabsContent>
                  <TabsContent value="bedding" className="mt-6">
                    <Card>
                      <CardContent className="p-6">
                        <h3 className="font-medium text-g7-charcoal mb-4">Bed Configuration</h3>
                        <div className="space-y-2">
                          {room.beds.map((bed: any, index: number) => (
                            <div key={index} className="flex items-center gap-3">
                              <Bed className="h-5 w-5 text-g7-gold" />
                              <span className="text-g7-charcoal/70">
                                {bed.count}x {bed.type} bed{bed.count > 1 ? 's' : ''}
                              </span>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>
                </Tabs>
              </div>

              {/* Booking Sidebar */}
              <div className="lg:col-span-1">
                <Card className="sticky top-24 p-6">
                  <div className="mb-6">
                    <p className="text-4xl font-serif text-g7-charcoal">
                      ${room.basePrice}
                    </p>
                    <p className="text-g7-charcoal/60">per night</p>
                  </div>

                  <Button
                    asChild
                    className="w-full bg-g7-gold text-g7-charcoal hover:bg-g7-gold-light mb-4 py-6 text-lg"
                  >
                    <Link href={`/booking?room=${room.id}`}>
                      <Calendar className="mr-2 h-5 w-5" />
                      Book Now
                    </Link>
                  </Button>

                  <div className="space-y-3 mb-6">
                    <div className="flex items-center gap-2 text-sm text-g7-charcoal/70">
                      <Check className="h-4 w-4 text-g7-gold" />
                      <span>Best rate guaranteed</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-g7-charcoal/70">
                      <Check className="h-4 w-4 text-g7-gold" />
                      <span>Free cancellation up to 48 hours</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-g7-charcoal/70">
                      <Check className="h-4 w-4 text-g7-gold" />
                      <span>No booking fees</span>
                    </div>
                  </div>

                  <Separator className="my-6" />

                  <div>
                    <h3 className="font-medium text-g7-charcoal mb-3">
                  Need Help?
                    </h3>
                    <div className="space-y-3">
                      <a
                        href="tel:+18001234567"
                        className="flex items-center gap-3 text-g7-charcoal/70 hover:text-g7-gold transition-colors"
                      >
                        <Phone className="h-5 w-5" />
                        <div>
                          <p className="text-xs text-g7-charcoal/60">Call us</p>
                          <p className="font-medium">+1 800 123 4567</p>
                        </div>
                      </a>
                      <a
                        href="mailto:reservations@g7hotels.com"
                        className="flex items-center gap-3 text-g7-charcoal/70 hover:text-g7-gold transition-colors"
                      >
                        <Mail className="h-5 w-5" />
                        <div>
                          <p className="text-xs text-g7-charcoal/60">Email us</p>
                          <p className="font-medium text-sm">
                            reservations@g7hotels.com
                          </p>
                        </div>
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
