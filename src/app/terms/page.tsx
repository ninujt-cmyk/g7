'use client';

import React from 'react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { PageHero } from '@/components/common/HeroSection';
import { Card, CardContent } from '@/components/ui/card';

/**
 * G7 Hotels Terms of Service Page
 * Terms and conditions for using the website and services
 */

export default function TermsPage() {
  const lastUpdated = new Date().toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  return (
    <div className="min-h-screen flex flex-col bg-g7-ivory">
      <Header />

      <PageHero
        title="Terms of Service"
        subtitle="Terms and Conditions"
        backgroundImage="/images/hero/hero-1.jpg"
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Terms of Service' },
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
                <h2 className="font-serif text-2xl text-g7-charcoal mb-4">Acceptance of Terms</h2>
                <p className="text-g7-charcoal/70 leading-relaxed">
                  By accessing and using g7hotels.com (the "Website") and the services provided by G7 Hotels ("we," "our," or "us"), you agree to be bound by these Terms of Service ("Terms"). If you do not agree to these Terms, please do not use our Website or services.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="font-serif text-2xl text-g7-charcoal mb-4">Changes to Terms</h2>
                <p className="text-g7-charcoal/70 leading-relaxed">
                  We reserve the right to modify these Terms at any time. We will notify you of material changes by posting the revised Terms on the Website. Your continued use of the Website after such modifications constitutes your acceptance of the updated Terms.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="font-serif text-2xl text-g7-charcoal mb-4">Use of the Website</h2>
                <p className="text-g7-charcoal/70 mb-4">You agree to use the Website only for lawful purposes and in accordance with these Terms. You agree not to:</p>
                <ul className="list-disc pl-6 text-g7-charcoal/70 space-y-2">
                  <li>Use the Website for any illegal purpose or in violation of any laws</li>
                  <li>Impersonate any person or entity or misrepresent your affiliation</li>
                  <li>Interfere with or disrupt the Website or servers</li>
                  <li>Transmit viruses or other harmful code</li>
                  <li>Attempt to gain unauthorized access to the Website</li>
                  <li>Use the Website to collect or harvest user information</li>
                  <li>Reproduce, duplicate, copy, or exploit any portion of the Website</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="font-serif text-2xl text-g7-charcoal mb-4">Account Registration</h2>
                <p className="text-g7-charcoal/70 mb-4">To access certain features, you may be required to create an account. You agree to:</p>
                <ul className="list-disc pl-6 text-g7-charcoal/70 space-y-2">
                  <li>Provide accurate, current, and complete information</li>
                  <li>Maintain and update your account information</li>
                  <li>Keep your password confidential</li>
                  <li>Accept responsibility for all activities under your account</li>
                  <li>Notify us immediately of any unauthorized use</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="font-serif text-2xl text-g7-charcoal mb-4">Bookings and Reservations</h2>
                <h3 className="font-semibold text-g7-charcoal mb-2">Booking Process</h3>
                <p className="text-g7-charcoal/70 leading-relaxed mb-4">
                  All bookings are subject to availability and confirmation. Upon making a reservation, you will receive a confirmation email containing your booking details and confirmation number.
                </p>

                <h3 className="font-semibold text-g7-charcoal mb-2">Payment Terms</h3>
                <p className="text-g7-charcoal/70 leading-relaxed mb-4">
                  Room rates are quoted in Indian Rupees (INR) and include applicable taxes unless stated otherwise. Payment is required at the time of booking or upon check-in, depending on the rate type and hotel policy.
                </p>

                <h3 className="font-semibold text-g7-charcoal mb-2">Cancellation Policy</h3>
                <p className="text-g7-charcoal/70 leading-relaxed">
                  Cancellation policies vary by rate type and hotel. Generally, free cancellation is available up to 48 hours before check-in. Cancellations made after this period may incur charges. Specific cancellation terms will be provided at the time of booking.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="font-serif text-2xl text-g7-charcoal mb-4">Prices and Availability</h2>
                <p className="text-g7-charcoal/70 leading-relaxed">
                  All prices are subject to change without notice. We strive to provide accurate information, but we do not warrant that prices or availability are error-free. In the event of an error, we reserve the right to cancel or modify bookings.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="font-serif text-2xl text-g7-charcoal mb-4">Intellectual Property</h2>
                <p className="text-g7-charcoal/70 mb-4">The Website and its content, including but not limited to text, graphics, logos, images, and software, are owned by G7 Hotels and are protected by copyright, trademark, and other intellectual property laws.</p>
                <p className="text-g7-charcoal/70 leading-relaxed">
                  You may not use, reproduce, distribute, or create derivative works of any content without our prior written consent, except as permitted by law or as necessary for your personal use of the Website.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="font-serif text-2xl text-g7-charcoal mb-4">User Content</h2>
                <p className="text-g7-charcoal/70 mb-4">You may submit reviews, comments, or other content ("User Content"). By submitting User Content, you grant us a non-exclusive, royalty-free, perpetual, irrevocable, and fully sublicensable right to use, reproduce, modify, and display such content.</p>
                <p className="text-g7-charcoal/70 leading-relaxed">
                  You represent and warrant that you own or have the necessary rights to submit the User Content and that it does not violate any third-party rights or applicable laws.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="font-serif text-2xl text-g7-charcoal mb-4">Privacy Policy</h2>
                <p className="text-g7-charcoal/70 leading-relaxed">
                  Your use of the Website is also governed by our Privacy Policy, which explains how we collect, use, and protect your personal information. Please review our Privacy Policy carefully.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="font-serif text-2xl text-g7-charcoal mb-4">Limitation of Liability</h2>
                <p className="text-g7-charcoal/70 leading-relaxed">
                  To the fullest extent permitted by law, G7 Hotels shall not be liable for any indirect, incidental, special, consequential, or punitive damages, including but not limited to loss of profits, data, or goodwill, arising from or related to your use of the Website or our services.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="font-serif text-2xl text-g7-charcoal mb-4">Indemnification</h2>
                <p className="text-g7-charcoal/70 leading-relaxed">
                  You agree to indemnify and hold harmless G7 Hotels, its affiliates, officers, directors, employees, and agents from any claims, damages, or expenses arising from your use of the Website or violation of these Terms.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="font-serif text-2xl text-g7-charcoal mb-4">Governing Law</h2>
                <p className="text-g7-charcoal/70 leading-relaxed">
                  These Terms shall be governed by and construed in accordance with the laws of India. Any disputes arising under these Terms shall be subject to the exclusive jurisdiction of the courts in New Delhi, India.
                </p>
              </section>

              <section>
                <h2 className="font-serif text-2xl text-g7-charcoal mb-4">Contact Us</h2>
                <p className="text-g7-charcoal/70 mb-4">
                  If you have questions about these Terms, please contact us:
                </p>
                <div className="text-g7-charcoal/70 space-y-2">
                  <p><strong>Email:</strong> legal@g7hotels.com</p>
                  <p><strong>Phone:</strong> +1 800 123 4567</p>
                  <p><strong>Address:</strong> 123 Luxury Avenue, Downtown District, New York, NY 10001</p>
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
