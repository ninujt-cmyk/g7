'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Spa, Clock, Award, Calendar, Filter, Grid, List } from 'lucide-react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { PageHero } from '@/components/common/HeroSection';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';

/**
 * G7 Hotels Spa & Wellness Page
 */

export default function SpaPage() {
  const [treatments, setTreatments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  useEffect(() => {
    fetchTreatments();
  }, []);

  const fetchTreatments = async () => {
    setLoading(true);
    try {
      const mockTreatments = [
        {
          id: '1',
          name: 'Signature Massage',
          description: 'A personalized massage tailored to your needs using premium essential oils.',
          category: 'MASSAGE',
          duration: 60,
          price: 150,
          currency: 'USD',
          images: ['/images/spa/spa-treatment.jpg'],
          benefits: ['Stress Relief', 'Muscle Relaxation', 'Improved Circulation'],
          featured: true,
          available: true,
        },
        {
          id: '2',
          name: 'Rejuvenating Facial',
          description: 'Deep cleansing and hydration treatment for radiant, glowing skin.',
          category: 'FACIAL',
          duration: 75,
          price: 180,
          currency: 'USD',
          images: ['/images/spa/spa-treatment.jpg'],
          benefits: ['Hydration', 'Anti-Aging', 'Skin Brightening'],
          featured: true,
          available: true,
        },
        {
          id: '3',
          name: 'Aromatherapy Body Wrap',
          description: 'Full body treatment with therapeutic essential oils and warm wraps.',
          category: 'BODY_TREATMENT',
          duration: 90,
          price: 200,
          currency: 'USD',
          images: ['/images/spa/spa-treatment.jpg'],
          benefits: ['Detoxification', 'Relaxation', 'Skin Nourishment'],
          featured: false,
          available: true,
        },
      ];
      setTreatments(mockTreatments);
    } catch (error) {
      console.error('Error fetching treatments:', error);
    } finally {
      setLoading(false);
    }
  };

  const categories = [
    { value: 'all', label: 'All Treatments' },
    { value: 'MASSAGE', label: 'Massages' },
    { value: 'FACIAL', label: 'Facials' },
    { value: 'BODY_TREATMENT', label: 'Body Treatments' },
    { value: 'AYURVEDA', label: 'Ayurveda' },
  ];

  const filteredTreatments =
    selectedCategory === 'all'
      ? treatments
      : treatments.filter((t) => t.category === selectedCategory);

  return (
    <div className="min-h-screen flex flex-col bg-g7-ivory">
      <Header />

      <PageHero
        title="Spa & Wellness"
        subtitle="Rejuvenate Your Body and Mind"
        backgroundImage="/images/spa/spa-treatment.jpg"
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Spa & Wellness' },
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

        {/* Treatments Grid */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="bg-white rounded-lg h-96 animate-pulse" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTreatments.map((treatment) => (
              <motion.div
                key={treatment.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <Card className="overflow-hidden border-0 shadow-lg hover:shadow-2xl transition-all duration-500">
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <img
                      src={treatment.images[0]}
                      alt={treatment.name}
                      className="w-full h-full object-cover"
                    />
                    {treatment.featured && (
                      <Badge className="absolute top-4 left-4 bg-g7-gold text-g7-charcoal">
                        Featured
                      </Badge>
                    )}
                  </div>
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-3">
                      <h3 className="font-serif text-xl text-g7-charcoal">
                        {treatment.name}
                      </h3>
                      <Badge variant="outline" className="border-g7-gold/30 text-g7-charcoal/70">
                        {treatment.category.replace('_', ' ').toLowerCase()}
                      </Badge>
                    </div>
                    <p className="text-g7-charcoal/70 text-sm mb-4 line-clamp-2">
                      {treatment.description}
                    </p>
                    <div className="flex items-center gap-4 text-sm text-g7-charcoal/60 mb-4">
                      <div className="flex items-center gap-1">
                        <Clock className="h-4 w-4 text-g7-gold" />
                        <span>{treatment.duration} min</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Award className="h-4 w-4 text-g7-gold" />
                        <span>${treatment.price}</span>
                      </div>
                    </div>
                    <Button className="w-full bg-g7-charcoal text-g7-ivory hover:bg-g7-gold hover:text-g7-charcoal">
                      <Calendar className="h-4 w-4 mr-2" />
                      Book Treatment
                    </Button>
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
