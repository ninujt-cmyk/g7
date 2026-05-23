'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { PageHero } from '@/components/common/HeroSection';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar, Download, FileText, Mail, ExternalLink, Award, TrendingUp } from 'lucide-react';

/**
 * G7 Hotels Press & Media Page
 * Press releases, media resources, and company news
 */

const pressReleases = [
  {
    id: '1',
    title: 'G7 Hotels Announces Grand Opening in Dubai',
    date: '2024-01-20',
    category: 'Expansion',
    summary: 'G7 Hotels expands its luxury portfolio with the opening of a new 250-room property in the heart of Dubai, featuring world-class amenities and stunning views of the skyline.',
    image: '/images/hero/hero-1.jpg',
  },
  {
    id: '2',
    title: 'G7 Hotels Wins "Best Luxury Hotel Chain" Award',
    date: '2024-01-15',
    category: 'Awards',
    summary: 'Recognized for exceptional service and guest experiences, G7 Hotels receives the prestigious award at the International Hospitality Excellence Awards 2024.',
    image: '/images/hero/hero-1.jpg',
  },
  {
    id: '3',
    title: 'New Sustainability Initiative Launched Across All Properties',
    date: '2024-01-10',
    category: 'Sustainability',
    summary: 'G7 Hotels commits to reducing carbon footprint by 50% by 2030 through comprehensive sustainability initiatives including renewable energy and waste reduction programs.',
    image: '/images/hero/hero-1.jpg',
  },
  {
    id: '4',
    title: 'G7 Rewards Program Reaches 1 Million Members',
    date: '2024-01-05',
    category: 'Milestones',
    summary: 'The loyalty program celebrates a major milestone with over 1 million enrolled members, marking significant growth in guest engagement and satisfaction.',
    image: '/images/hero/hero-1.jpg',
  },
];

const mediaResources = [
  {
    title: 'Brand Assets',
    description: 'Download logos, brand guidelines, and imagery',
    icon: <Download className="h-8 w-8" />,
  },
  {
    title: 'Press Kit',
    description: 'Company overview, fact sheet, and executive bios',
    icon: <FileText className="h-8 w-8" />,
  },
  {
    title: 'Image Gallery',
    description: 'High-resolution photos of our properties',
    icon: <Award className="h-8 w-8" />,
  },
  {
    title: 'Executive Team',
    description: 'Leadership bios and headshots',
    icon: <TrendingUp className="h-8 w-8" />,
  },
];

export default function PressPage() {
  return (
    <div className="min-h-screen flex flex-col bg-g7-ivory">
      <Header />

      <PageHero
        title="Press & Media"
        subtitle="News & Updates from G7 Hotels"
        backgroundImage="/images/hero/hero-1.jpg"
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Press & Media' },
        ]}
      />

      <main className="flex-1 container mx-auto px-4 py-12">
        {/* Media Contact */}
        <Card className="max-w-4xl mx-auto p-8 mb-12 bg-g7-charcoal text-g7-ivory border-0">
          <div className="text-center">
            <h2 className="font-serif text-3xl mb-4">Media Inquiries</h2>
            <p className="text-g7-ivory/80 mb-6">
              For press inquiries, interview requests, or media partnerships, please contact our communications team.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <a href="mailto:press@g7hotels.in" className="flex items-center gap-2 text-g7-gold hover:underline">
                <Mail className="h-5 w-5" />
                press@g7hotels.in
              </a>
              <span className="text-g7-ivory/60">|</span>
              <span className="text-g7-ivory/80">Response within 24 hours</span>
            </div>
          </div>
        </Card>

        {/* Latest Press Releases */}
        <div className="max-w-6xl mx-auto mb-16">
          <h3 className="font-serif text-3xl text-g7-charcoal text-center mb-8">Latest Press Releases</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {pressReleases.map((release, index) => (
              <motion.div
                key={release.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="overflow-hidden hover:shadow-lg transition-all duration-300">
                  <div className="relative aspect-[16/9] overflow-hidden">
                    <img
                      src={release.image}
                      alt={release.title}
                      className="w-full h-full object-cover"
                    />
                    <Badge className="absolute top-4 left-4 bg-g7-gold text-g7-charcoal">
                      {release.category}
                    </Badge>
                  </div>
                  <CardContent className="p-6">
                    <div className="flex items-center gap-2 text-sm text-g7-charcoal/60 mb-3">
                      <Calendar className="h-4 w-4" />
                      <span>
                        {new Date(release.date).toLocaleDateString('en-IN', {
                          day: 'numeric',
                          month: 'long',
                          year: 'numeric',
                        })}
                      </span>
                    </div>
                    <h4 className="font-serif text-xl text-g7-charcoal mb-3 line-clamp-2">
                      {release.title}
                    </h4>
                    <p className="text-g7-charcoal/70 text-sm mb-4 line-clamp-3">
                      {release.summary}
                    </p>
                    <Button
                      variant="outline"
                      size="sm"
                      className="border-g7-charcoal text-g7-charcoal hover:bg-g7-charcoal hover:text-g7-ivory w-full"
                    >
                      Read Full Release
                      <ExternalLink className="ml-2 h-4 w-4" />
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-8">
            <Button variant="outline" className="border-g7-charcoal text-g7-charcoal hover:bg-g7-charcoal hover:text-g7-ivory">
              View All Press Releases
            </Button>
          </div>
        </div>

        {/* Media Resources */}
        <div className="max-w-6xl mx-auto mb-16">
          <h3 className="font-serif text-3xl text-g7-charcoal text-center mb-8">Media Resources</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {mediaResources.map((resource, index) => (
              <Card key={index} className="p-6 text-center hover:shadow-lg transition-shadow border-g7-gold/20">
                <div className="text-g7-gold mb-4 flex justify-center">{resource.icon}</div>
                <h4 className="font-semibold text-g7-charcoal mb-2">{resource.title}</h4>
                <p className="text-sm text-g7-charcoal/70 mb-4">{resource.description}</p>
                <Button variant="outline" size="sm" className="w-full border-g7-charcoal text-g7-charcoal hover:bg-g7-charcoal hover:text-g7-ivory">
                  <Download className="mr-2 h-4 w-4" />
                  Download
                </Button>
              </Card>
            ))}
          </div>
        </div>

        {/* Company Facts */}
        <Card className="max-w-4xl mx-auto p-8">
          <h3 className="font-serif text-2xl text-g7-charcoal text-center mb-8">Company Facts</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h4 className="font-semibold text-g7-charcoal mb-4">About G7 Hotels</h4>
              <p className="text-g7-charcoal/70 text-sm leading-relaxed mb-4">
                Founded in 2005, G7 Hotels has grown to become a leading luxury hospitality brand with properties across India, the Middle East, and Southeast Asia. Known for exceptional service, elegant design, and unforgettable experiences, G7 Hotels caters to discerning travelers seeking the finest in luxury accommodation.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-g7-charcoal mb-4">Key Statistics</h4>
              <ul className="space-y-3 text-sm text-g7-charcoal/70">
                <li className="flex justify-between">
                  <span>Properties</span>
                  <span className="font-semibold text-g7-charcoal">15+</span>
                </li>
                <li className="flex justify-between">
                  <span>Rooms & Suites</span>
                  <span className="font-semibold text-g7-charcoal">3,500+</span>
                </li>
                <li className="flex justify-between">
                  <span>Employees</span>
                  <span className="font-semibold text-g7-charcoal">5,000+</span>
                </li>
                <li className="flex justify-between">
                  <span>Countries</span>
                  <span className="font-semibold text-g7-charcoal">8</span>
                </li>
                <li className="flex justify-between">
                  <span>Loyalty Members</span>
                  <span className="font-semibold text-g7-charcoal">1M+</span>
                </li>
                <li className="flex justify-between">
                  <span>Annual Revenue</span>
                  <span className="font-semibold text-g7-charcoal">₹500 Cr+</span>
                </li>
              </ul>
            </div>
          </div>
        </Card>
      </main>

      <Footer />
    </div>
  );
}
