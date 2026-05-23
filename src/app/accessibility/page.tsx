'use client';

import React from 'react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { PageHero } from '@/components/common/HeroSection';
import { Card, CardContent } from '@/components/ui/card';
import { Phone, Mail, Accessibility, Eye, Ear, Brain } from 'lucide-react';
import { Button } from '@/components/ui/button';

/**
 * G7 Hotels Accessibility Statement Page
 * Accessibility information and commitment
 */

export default function AccessibilityPage() {
  return (
    <div className="min-h-screen flex flex-col bg-g7-ivory">
      <Header />

      <PageHero
        title="Accessibility"
        subtitle="Our Commitment to Inclusion"
        backgroundImage="/images/hero/hero-1.jpg"
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Accessibility' },
        ]}
      />

      <main className="flex-1 container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Commitment Statement */}
          <Card className="p-8 md:p-12 mb-8 border-g7-gold/30">
            <div className="text-center mb-8">
              <Accessibility className="h-16 w-16 mx-auto text-g7-gold mb-4" />
              <h2 className="font-serif text-3xl text-g7-charcoal mb-4">
                Accessibility at G7 Hotels
              </h2>
              <p className="text-g7-charcoal/70 text-lg">
                We are committed to ensuring that our website, facilities, and services are accessible to all guests, including those with disabilities.
              </p>
            </div>

            <div className="prose prose-lg max-w-none">
              <section className="mb-8">
                <h3 className="font-serif text-2xl text-g7-charcoal mb-4">
                  Our Commitment
                </h3>
                <p className="text-g7-charcoal/70 leading-relaxed mb-4">
                  G7 Hotels strives to provide an inclusive and welcoming environment for all guests. We continuously work to improve accessibility across our digital platforms and physical locations in compliance with the Web Content Accessibility Guidelines (WCAG) 2.1 Level AA and applicable accessibility laws.
                </p>
                <p className="text-g7-charcoal/70 leading-relaxed">
                  We believe that everyone deserves to experience luxury hospitality without barriers. Our accessibility initiatives extend beyond compliance to create genuinely inclusive experiences for guests with diverse needs.
                </p>
              </section>
            </div>
          </Card>

          {/* Website Accessibility */}
          <Card className="p-8 mb-8">
            <h3 className="font-serif text-2xl text-g7-charcoal mb-6 flex items-center gap-3">
              <Eye className="h-6 w-6 text-g7-gold" />
              Website Accessibility
            </h3>
            <div className="space-y-4 text-g7-charcoal/70">
              <p className="leading-relaxed">
                We have designed g7hotels.in to be accessible to users with disabilities. Our website includes features such as:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Alternative text for images</li>
                <li>Keyboard navigation support</li>
                <li>Clear and consistent navigation</li>
                <li>High contrast color combinations</li>
                <li>Resizable text without loss of content</li>
                <li>Forms with proper labels and error messages</li>
                <li>Skip navigation links</li>
                <li>ARIA landmarks and roles</li>
              </ul>
              <p className="leading-relaxed">
                We regularly test our website with assistive technologies and welcome feedback on accessibility improvements.
              </p>
            </div>
          </Card>

          {/* Hotel Accessibility */}
          <Card className="p-8 mb-8">
            <h3 className="font-serif text-2xl text-g7-charcoal mb-6 flex items-center gap-3">
              <Accessibility className="h-6 w-6 text-g7-gold" />
              Hotel Facilities & Services
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h4 className="font-semibold text-g7-charcoal">Accessible Rooms</h4>
                <ul className="list-disc pl-6 text-sm text-g7-charcoal/70 space-y-1">
                  <li>Wide doorways and hallways</li>
                  <li>Roll-in showers with grab bars</li>
                  <li>Lowered bed heights</li>
                  <li>Accessible light switches and controls</li>
                  <li>Emergency call buttons</li>
                </ul>
              </div>
              <div className="space-y-4">
                <h4 className="font-semibold text-g7-charcoal">Public Areas</h4>
                <ul className="list-disc pl-6 text-sm text-g7-charcoal/70 space-y-1">
                  <li>Ramps and elevators</li>
                  <li>Accessible restrooms</li>
                  <li>Braille signage</li>
                  <li>Accessible parking spaces</li>
                  <li>Service animal welcome areas</li>
                </ul>
              </div>
              <div className="space-y-4">
                <h4 className="font-semibold text-g7-charcoal">Assistive Services</h4>
                <ul className="list-disc pl-6 text-sm text-g7-charcoal/70 space-y-1">
                  <li>Visual alert systems</li>
                  <li>Audio descriptions</li>
                  <li>Sign language interpretation</li>
                  <li>Large print materials</li>
                  <li>Assistive listening devices</li>
                </ul>
              </div>
              <div className="space-y-4">
                <h4 className="font-semibold text-g7-charcoal">Dining & Events</h4>
                <ul className="list-disc pl-6 text-sm text-g7-charcoal/70 space-y-1">
                  <li>Accessible restaurant seating</li>
                  <li>Menu assistance available</li>
                  <li>Dietary accommodation</li>
                  <li>Accessible event spaces</li>
                  <li>Flexible room configurations</li>
                </ul>
              </div>
            </div>
          </Card>

          {/* Accessibility Features */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card className="p-6 text-center">
              <Eye className="h-10 w-10 mx-auto mb-4 text-g7-gold" />
              <h4 className="font-semibold text-g7-charcoal mb-2">Visual Accessibility</h4>
              <p className="text-sm text-g7-charcoal/70">
                High contrast signage, large print materials, and audio descriptions for visually impaired guests.
              </p>
            </Card>
            <Card className="p-6 text-center">
              <Ear className="h-10 w-10 mx-auto mb-4 text-g7-gold" />
              <h4 className="font-semibold text-g7-charcoal mb-2">Hearing Accessibility</h4>
              <p className="text-sm text-g7-charcoal/70">
                Visual alert systems, assistive listening devices, and sign language services available.
              </p>
            </Card>
            <Card className="p-6 text-center">
              <Brain className="h-10 w-10 mx-auto mb-4 text-g7-gold" />
              <h4 className="font-semibold text-g7-charcoal mb-2">Cognitive Accessibility</h4>
              <p className="text-sm text-g7-charcoal/70">
                Clear signage, simple navigation, and patient staff trained to assist guests with cognitive disabilities.
              </p>
            </Card>
          </div>

          {/* Service Animals */}
          <Card className="p-8 mb-8 bg-g7-gold/5 border-g7-gold/20">
            <h3 className="font-serif text-2xl text-g7-charcoal mb-4">Service Animals</h3>
            <p className="text-g7-charcoal/70 leading-relaxed mb-4">
              G7 Hotels welcomes service animals accompanying guests with disabilities. Service animals are permitted in all areas of the hotel where guests are allowed, at no additional charge.
            </p>
            <p className="text-g7-charcoal/70 leading-relaxed">
              We do not require documentation for service animals but may ask two questions: (1) Is the dog a service animal required because of a disability? and (2) What work or task has the dog been trained to perform?
            </p>
          </Card>

          {/* Feedback & Contact */}
          <Card className="p-8 bg-g7-charcoal text-g7-ivory border-0">
            <h3 className="font-serif text-2xl text-center mb-4">Need Assistance?</h3>
            <p className="text-g7-ivory/80 text-center mb-8">
              If you encounter any accessibility barriers or have suggestions for improvement, please contact us. We value your feedback.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <Phone className="h-8 w-8 mx-auto mb-3 text-g7-gold" />
                <p className="font-semibold mb-1">Accessibility Hotline</p>
                <a href="tel:+919491708080" className="text-g7-gold hover:underline">
                  +91 94917 08080
                </a>
              </div>
              <div className="text-center">
                <Mail className="h-8 w-8 mx-auto mb-3 text-g7-gold" />
                <p className="font-semibold mb-1">Email</p>
                <a href="mailto:accessibility@g7hotels.in" className="text-g7-gold hover:underline">
                  accessibility@g7hotels.in
                </a>
              </div>
              <div className="text-center">
                <Button
                  asChild
                  variant="outline"
                  className="border-g7-gold text-g7-gold hover:bg-g7-gold hover:text-g7-charcoal"
                >
                  <a href="/contact">Contact Form</a>
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  );
}
