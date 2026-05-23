'use client';

import React from 'react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { PageHero } from '@/components/common/HeroSection';
import { Card, CardContent } from '@/components/ui/card';

/**
 * G7 Hotels Privacy Policy Page
 * Privacy policy and data handling information
 */

export default function PrivacyPage() {
  const lastUpdated = new Date().toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  return (
    <div className="min-h-screen flex flex-col bg-g7-ivory">
      <Header />

      <PageHero
        title="Privacy Policy"
        subtitle="Your Privacy Matters to Us"
        backgroundImage="/images/hero/hero-1.jpg"
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Privacy Policy' },
        ]}
      />

      <main className="flex-1 container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <Card className="p-8 md:p-12">
            <p className="text-sm text-g7-charcoal/60 mb-8">
              Last Updated: {lastUpdated}
            </p>

            <div className="prose prose-lg max-w-none">
              <section className="mb-8">
                <h2 className="font-serif text-2xl text-g7-charcoal mb-4">Introduction</h2>
                <p className="text-g7-charcoal/70 leading-relaxed">
                  G7 Hotels ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website g7hotels.in and use our services.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="font-serif text-2xl text-g7-charcoal mb-4">Information We Collect</h2>
                <h3 className="font-semibold text-g7-charcoal mb-2">Personal Information</h3>
                <ul className="list-disc pl-6 text-g7-charcoal/70 space-y-2">
                  <li>Name and contact information (email, phone, address)</li>
                  <li>Payment information (processed securely through third-party payment processors)</li>
                  <li>Booking details and preferences</li>
                  <li>Loyalty program information</li>
                  <li>Communication preferences</li>
                </ul>

                <h3 className="font-semibold text-g7-charcoal mb-2 mt-4">Automatically Collected Information</h3>
                <ul className="list-disc pl-6 text-g7-charcoal/70 space-y-2">
                  <li>IP address and device information</li>
                  <li>Browser type and version</li>
                  <li>Operating system</li>
                  <li>Referring website</li>
                  <li>Pages visited and time spent</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="font-serif text-2xl text-g7-charcoal mb-4">How We Use Your Information</h2>
                <p className="text-g7-charcoal/70 mb-4">We use your information to:</p>
                <ul className="list-disc pl-6 text-g7-charcoal/70 space-y-2">
                  <li>Process and manage your bookings</li>
                  <li>Provide customer service and support</li>
                  <li>Send confirmations and updates about your reservations</li>
                  <li>Personalize your experience and offer tailored recommendations</li>
                  <li>Process payments and prevent fraud</li>
                  <li>Send marketing communications (with your consent)</li>
                  <li>Improve our website and services</li>
                  <li>Comply with legal obligations</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="font-serif text-2xl text-g7-charcoal mb-4">Information Sharing</h2>
                <p className="text-g7-charcoal/70 mb-4">We may share your information with:</p>
                <ul className="list-disc pl-6 text-g7-charcoal/70 space-y-2">
                  <li><strong>Service Providers:</strong> Third parties who assist us in operating our business (payment processors, booking systems, etc.)</li>
                  <li><strong>Hotel Partners:</strong> When you book at partner hotels, we share necessary booking details</li>
                  <li><strong>Legal Requirements:</strong> When required by law or to protect our rights</li>
                  <li><strong>Business Transfers:</strong> In connection with a merger, acquisition, or sale of assets</li>
                </ul>
                <p className="text-g7-charcoal/70 mt-4">
                  We do not sell your personal information to third parties for their marketing purposes.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="font-serif text-2xl text-g7-charcoal mb-4">Data Security</h2>
                <p className="text-g7-charcoal/70 leading-relaxed">
                  We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the internet is 100% secure, and we cannot guarantee absolute security.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="font-serif text-2xl text-g7-charcoal mb-4">Cookies</h2>
                <p className="text-g7-charcoal/70 leading-relaxed">
                  We use cookies and similar technologies to enhance your experience, analyze traffic, and personalize content. You can control cookie settings through your browser preferences. For more details, please refer to our Cookie Policy.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="font-serif text-2xl text-g7-charcoal mb-4">Your Rights</h2>
                <p className="text-g7-charcoal/70 mb-4">You have the right to:</p>
                <ul className="list-disc pl-6 text-g7-charcoal/70 space-y-2">
                  <li>Access your personal information</li>
                  <li>Correct inaccurate information</li>
                  <li>Request deletion of your information</li>
                  <li>Opt out of marketing communications</li>
                  <li>Object to processing of your information</li>
                  <li>Request data portability</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="font-serif text-2xl text-g7-charcoal mb-4">Children's Privacy</h2>
                <p className="text-g7-charcoal/70 leading-relaxed">
                  Our services are not intended for children under 13 years of age. We do not knowingly collect personal information from children. If we become aware that we have collected such information, we will take steps to delete it.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="font-serif text-2xl text-g7-charcoal mb-4">International Data Transfers</h2>
                <p className="text-g7-charcoal/70 leading-relaxed">
                  Your information may be transferred to and processed in countries other than your country of residence. We ensure appropriate safeguards are in place to protect your information in accordance with this Privacy Policy.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="font-serif text-2xl text-g7-charcoal mb-4">Changes to This Policy</h2>
                <p className="text-g7-charcoal/70 leading-relaxed">
                  We may update this Privacy Policy from time to time. We will notify you of any material changes by posting the new policy on our website and updating the "Last Updated" date.
                </p>
              </section>

              <section>
                <h2 className="font-serif text-2xl text-g7-charcoal mb-4">Contact Us</h2>
                <p className="text-g7-charcoal/70 mb-4">
                  If you have questions about this Privacy Policy or our data practices, please contact us:
                </p>
                <div className="text-g7-charcoal/70 space-y-2">
                  <p><strong>Email:</strong> privacy@g7hotels.in</p>
                  <p><strong>Phone:</strong> +91 94917 08080</p>
                  <p><strong>Address:</strong> Global Headquarters / Tirupati, Merlapaka tollplaza, yerpedu, Srikalahasti, Andhra Pradesh 517619</p>
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
