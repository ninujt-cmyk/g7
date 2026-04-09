'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Compass, Star, Clock, Users, Filter, Calendar } from 'lucide-react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { PageHero } from '@/components/common/HeroSection';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';

/**
 * G7 Hotels Experiences Page
 */

export default function ExperiencesPage() {
  const [experiences, setExperiences] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  useEffect(() => {
    fetchExperiences();
  }, []);

  const fetchExperiences = async () => {
    setLoading(true);
    try {
      const mockExperiences = [
        {
          id: '1',
          name: 'Sunset Yacht Cruise',
          description: 'Sail into the sunset with champagne and gourmet canapés on our private yacht.',
          category: 'ADVENTURE',
          difficulty: 'EASY',
          duration: '3 hours',
          images: ['/images/hero/hero-1.jpg'],
          price: 29,000,
          currency: 'INR',
          maxGroupSize: 12,
          featured: true,
          available: true,
          rating: 4.9,
          reviewCount: 87,
        },
        {
          id: '2',
          name: 'Private Chef Experience',
          description: 'A bespoke dining experience prepared by our executive chef in a private setting.',
          category: 'CULINARY',
          difficulty: 'EASY',
          duration: '4 hours',
          images: ['/images/dining/fine-dining.jpg'],
          price: 41,500,
          currency: 'INR',
          maxGroupSize: 8,
          featured: true,
          available: true,
          rating: 5.0,
          reviewCount: 124,
        },
        {
          id: '3',
          name: 'Cultural Heritage Tour',
          description: 'Explore local history and culture with expert guides.',
          category: 'CULTURAL',
          difficulty: 'MODERATE',
          duration: 'Full day',
          images: ['/images/hero/hero-1.jpg'],
          price: 12,500,
          currency: 'INR',
          maxGroupSize: 20,
          featured: false,
          available: true,
          rating: 4.7,
          reviewCount: 65,
        },
        {
          id: '4',
          name: 'Wellness Retreat',
          description: 'A full day of mindfulness, yoga, and spa treatments.',
          category: 'WELLNESS',
          difficulty: 'EASY',
          duration: 'Full day',
          images: ['/images/spa/spa-treatment.jpg'],
          price: 33,200,
          currency: 'INR',
          maxGroupSize: 15,
          featured: true,
          available: true,
          rating: 4.8,
          reviewCount: 92,
        },
      ];
      setExperiences(mockExperiences);
    } catch (error) {
      console.error('Error fetching experiences:', error);
    } finally {
      setLoading(false);
    }
  };

  const categories = [
    { value: 'all', label: 'All Experiences' },
    { value: 'ADVENTURE', label: 'Adventure' },
    { value: 'CULTURAL', label: 'Cultural' },
    { value: 'WELLNESS', label: 'Wellness' },
    { value: 'CULINARY', label: 'Culinary' },
    { value: 'ROMANTIC', label: 'Romantic' },
  ];

  const filteredExperiences =
    selectedCategory === 'all'
      ? experiences
      : experiences.filter((e) => e.category === selectedCategory);

  return (
    <div className="min-h-screen flex flex-col bg-g7-ivory">
      <Header />

      <PageHero
        title="Curated Experiences"
        subtitle="Create Unforgettable Memories"
        backgroundImage="/images/hero/hero-1.jpg"
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Experiences' },
        ]}
      />

      <main className="flex-1 container mx-auto px-4 py-12">
        {/* Category Filter */}
        <div className="mb-8">
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat.value}
                onClick={() => setSelectedCategory(cat.value)}
                className={cn(
                  'px-4 py-2 rounded-sm font-medium transition-all',
                  selectedCategory === cat.value
                    ? 'bg-g7-gold text-g7-charcoal'
                    : 'bg-white text-g7-charcoal/70 hover:text-g7-charcoal border border-g7-gold/30'
                )}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Experiences Grid */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="bg-white rounded-lg h-96 animate-pulse" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredExperiences.map((experience) => (
              <motion.div
                key={experience.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <Card className="overflow-hidden border-0 shadow-lg hover:shadow-2xl transition-all duration-500">
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <img
                      src={experience.images[0]}
                      alt={experience.name}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                    <Badge className="absolute top-4 left-4 bg-g7-gold text-g7-charcoal capitalize">
                      {experience.category.toLowerCase()}
                    </Badge>
                    {experience.featured && (
                      <Badge className="absolute top-4 right-4 bg-white/90 text-g7-charcoal">
                        Featured
                      </Badge>
                    )}
                  </div>
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-3">
                      <h3 className="font-serif text-xl text-g7-charcoal">
                        {experience.name}
                      </h3>
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 fill-g7-gold text-g7-gold" />
                        <span className="text-sm text-g7-charcoal/60">
                          {experience.rating}
                        </span>
                      </div>
                    </div>
                    <p className="text-g7-charcoal/70 text-sm mb-4 line-clamp-2">
                      {experience.description}
                    </p>
                    <div className="flex items-center gap-4 text-sm text-g7-charcoal/60 mb-4">
                      <div className="flex items-center gap-1">
                        <Clock className="h-4 w-4 text-g7-gold" />
                        <span>{experience.duration}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Users className="h-4 w-4 text-g7-gold" />
                        <span>Max {experience.maxGroupSize}</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="text-2xl font-serif text-g7-charcoal">
                          ₹{experience.price.toLocaleString()}
                        </span>
                        <span className="text-g7-charcoal/60 text-sm"> /person</span>
                      </div>
                      <Button
                        size="sm"
                        className="bg-g7-charcoal text-g7-ivory hover:bg-g7-gold hover:text-g7-charcoal"
                      >
                        <Calendar className="h-4 w-4 mr-2" />
                        Book
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
