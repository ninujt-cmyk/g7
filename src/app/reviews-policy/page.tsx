'use client';

import React from 'react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { PageHero } from '@/components/common/HeroSection';
import { Card, CardContent } from '@/components/ui/card';
import { Star, Shield, AlertCircle } from 'lucide-react';

/**
 * G7 Hotels Guest Reviews Policy Page
 * Policy for guest reviews and ratings
 */

export default function ReviewsPolicyPage() {
  return (
    <div className="min-h-screen flex flex-col bg-g7-ivory">
      <Header />

      <PageHero
        title="Guest Reviews Policy"
        subtitle="Our Review Guidelines"
        backgroundImage="/images/hero/hero-1.jpg"
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Reviews Policy' },
        ]}
      />

      <main className="flex-1 container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <Card className="p-8 md:p-12">
            <div className="mb-8 p-6 bg-g7-gold/10 rounded-lg">
              <div className="flex items-start gap-4">
                <Shield className="h-8 w-8 text-g7-gold flex-shrink-0 mt-1" />
                <div>
                  <h2 className="font-serif text-xl text-g7-charcoal mb-2">
                    Trustworthy Reviews Matter
                  </h2>
                  <p className="text-g7-charcoal/70">
                    We are committed to maintaining the integrity of our review system. All reviews are moderated to ensure they are genuine, relevant, and helpful to future guests.
                  </p>
                </div>
              </div>
            </div>

            <div className="prose prose-lg max-w-none">
              <section className="mb-8">
                <h2 className="font-serif text-2xl text-g7-charcoal mb-4">Who Can Leave a Review?</h2>
                <p className="text-g7-charcoal/70 leading-relaxed mb-4">
                  To maintain authenticity, only guests who have completed a verified stay at G7 Hotels may submit a review. Reviews must be submitted within 6 months of the checkout date.
                </p>
                <p className="text-g7-charcoal/70 leading-relaxed">
                  We verify reviews by matching the booking confirmation with the guest's account. This ensures that all reviews come from genuine guests.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="font-serif text-2xl text-g7-charcoal mb-4">Review Guidelines</h2>
                <h3 className="font-semibold text-g7-charcoal mb-2">What We Encourage</h3>
                <ul className="list-disc pl-6 text-g7-charcoal/70 space-y-2 mb-4">
                  <li>Detailed, honest feedback about your experience</li>
                  <li>Specific comments about service, amenities, and facilities</li>
                  <li>Constructive criticism that helps us improve</li>
                  <li>Relevant information helpful to future guests</li>
                  <li>Respectful and professional language</li>
                </ul>

                <h3 className="font-semibold text-g7-charcoal mb-2">What We Don't Allow</h3>
                <ul className="list-disc pl-6 text-g7-charcoal/70 space-y-2">
                  <li>Offensive, profane, or discriminatory language</li>
                  <li>Personal attacks on staff or other guests</li>
                  <li>Promotional content or external links</li>
                  <li>False or misleading information</li>
                  <li>Reviews submitted on behalf of others</li>
                  <li>Reviews that violate privacy or disclose confidential information</li>
                  <li>Multiple reviews for the same stay</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="font-serif text-2xl text-g7-charcoal mb-4">Review Moderation Process</h2>
                <p className="text-g7-charcoal/70 leading-relaxed mb-4">
                  All reviews are subject to moderation before being published. Our moderation team reviews each submission for compliance with our guidelines.
                </p>
                <div className="space-y-4">
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <h4 className="font-semibold text-g7-charcoal mb-2">Step 1: Automated Screening</h4>
                    <p className="text-sm text-g7-charcoal/70">
                      Reviews are first screened for prohibited content, spam indicators, and policy violations.
                    </p>
                  </div>
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <h4 className="font-semibold text-g7-charcoal mb-2">Step 2: Human Review</h4>
                    <p className="text-sm text-g7-charcoal/70">
                      Our team reviews flagged reviews and a sample of all reviews for quality and authenticity.
                    </p>
                  </div>
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <h4 className="font-semibold text-g7-charcoal mb-2">Step 3: Publication or Rejection</h4>
                    <p className="text-sm text-g7-charcoal/70">
                      Approved reviews are published within 48-72 hours. Rejected reviews are notified to the submitter with explanation.
                    </p>
                  </div>
                </div>
              </section>

              <section className="mb-8">
                <h2 className="font-serif text-2xl text-g7-charcoal mb-4">Response to Reviews</h2>
                <p className="text-g7-charcoal/70 leading-relaxed mb-4">
                  G7 Hotels responds to reviews to address feedback, thank guests for their patronage, and demonstrate our commitment to guest satisfaction.
                </p>
                <div className="p-4 bg-g7-gold/10 rounded-lg">
                  <div className="flex items-start gap-3">
                    <Star className="h-5 w-5 text-g7-gold flex-shrink-0 mt-0.5" />
                    <p className="text-sm text-g7-charcoal/70">
                      We respond to all published reviews, both positive and negative, within 7 business days. Our responses are professional, constructive, and focused on improving guest experience.
                    </p>
                  </div>
                </div>
              </section>

              <section className="mb-8">
                <h2 className="font-serif text-2xl text-g7-charcoal mb-4">Review Removal Policy</h2>
                <p className="text-g7-charcoal/70 leading-relaxed mb-4">
                  We may remove reviews that violate our policies or are later found to be inauthentic. Reviews may be removed if:
                </p>
                <ul className="list-disc pl-6 text-g7-charcoal/70 space-y-2">
                  <li>The review violates our content guidelines</li>
                  <li>Authenticity concerns are raised and verified</li>
                  <li>The guest requests removal (within 30 days of posting)</li>
                  <li>Legal requirements necessitate removal</li>
                  <li>The review contains verified false information</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="font-serif text-2xl text-g7-charcoal mb-4">Dispute Resolution</h2>
                <p className="text-g7-charcoal/70 leading-relaxed mb-4">
                  If you believe a review violates our policies or contains false information, you may request a review:
                </p>
                <div className="space-y-2 text-g7-charcoal/70">
                  <p><strong>1.</strong> Submit your dispute through our contact form within 30 days of review publication</p>
                  <p><strong>2.</strong> Provide specific details and evidence supporting your claim</p>
                  <p><strong>3.</strong> Our team will investigate and respond within 14 business days</p>
                  <p><strong>4.</strong> Decisions are final unless new evidence is presented</p>
                </div>
              </section>

              <section className="mb-8">
                <h2 className="font-serif text-2xl text-g7-charcoal mb-4">Rating System</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    { label: 'Cleanliness', icon: <Star className="h-5 w-5" /> },
                    { label: 'Service & Staff', icon: <Star className="h-5 w-5" /> },
                    { label: 'Room Comfort', icon: <Star className="h-5 w-5" /> },
                    { label: 'Location', icon: <Star className="h-5 w-5" /> },
                    { label: 'Value for Money', icon: <Star className="h-5 w-5" /> },
                    { label: 'Amenities', icon: <Star className="h-5 w-5" /> },
                  ].map((item, index) => (
                    <div key={index} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                      <div className="text-g7-gold">{item.icon}</div>
                      <span className="text-g7-charcoal/70">{item.label}</span>
                    </div>
                  ))}
                </div>
                <p className="text-sm text-g7-charcoal/60 mt-4">
                  Overall ratings are calculated as the average of all category ratings.
                </p>
              </section>

              <section>
                <h2 className="font-serif text-2xl text-g7-charcoal mb-4">Contact Us</h2>
                <div className="p-6 bg-g7-charcoal/5 rounded-lg">
                  <p className="text-g7-charcoal/70 mb-4">
                    If you have questions about our review policy or need to report a concern, please contact our Guest Relations team:
                  </p>
                  <div className="space-y-2 text-g7-charcoal/70">
                    <p><strong>Email:</strong> reviews@g7hotels.com</p>
                    <p><strong>Phone:</strong> +1 800 123 4567</p>
                    <p><strong>Response Time:</strong> Within 48 business hours</p>
                  </div>
                </div>
              </section>
            </div>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  );
}
