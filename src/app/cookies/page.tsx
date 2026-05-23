'use client';

import React, { useState } from 'react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { PageHero } from '@/components/common/HeroSection';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';

/**
 * G7 Hotels Cookie Policy Page
 * Information about cookies and tracking technologies
 */

export default function CookiesPage() {
  const [preferences, setPreferences] = useState({
    necessary: true,
    analytics: true,
    marketing: false,
    functional: true,
  });

  return (
    <div className="min-h-screen flex flex-col bg-g7-ivory">
      <Header />

      <PageHero
        title="Cookie Policy"
        subtitle="How We Use Cookies"
        backgroundImage="/images/hero/hero-1.jpg"
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Cookie Policy' },
        ]}
      />

      <main className="flex-1 container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <Card className="p-8 md:p-12 mb-8">
            <div className="prose prose-lg max-w-none">
              <section className="mb-8">
                <h2 className="font-serif text-2xl text-g7-charcoal mb-4">What Are Cookies?</h2>
                <p className="text-g7-charcoal/70 leading-relaxed">
                  Cookies are small text files that are placed on your device when you visit our website. They help us provide you with a better experience by remembering your preferences, understanding how you use our website, and making our website more relevant to your interests.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="font-serif text-2xl text-g7-charcoal mb-4">Types of Cookies We Use</h2>
                
                <div className="space-y-6">
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <h3 className="font-semibold text-g7-charcoal mb-2">Necessary Cookies</h3>
                    <p className="text-g7-charcoal/70 text-sm mb-2">
                      These cookies are essential for the website to function properly. They enable basic functions like page navigation, access to secure areas, and cookie consent.
                    </p>
                    <p className="text-xs text-g7-charcoal/50">
                      Duration: Session or persistent | Cannot be disabled
                    </p>
                  </div>

                  <div className="p-4 bg-gray-50 rounded-lg">
                    <h3 className="font-semibold text-g7-charcoal mb-2">Analytics Cookies</h3>
                    <p className="text-g7-charcoal/70 text-sm mb-2">
                      These cookies help us understand how visitors use our website by collecting information about pages visited, time spent, and errors encountered. This data helps us improve our website performance.
                    </p>
                    <p className="text-xs text-g7-charcoal/50">
                      Duration: Up to 2 years | Can be disabled
                    </p>
                  </div>

                  <div className="p-4 bg-gray-50 rounded-lg">
                    <h3 className="font-semibold text-g7-charcoal mb-2">Marketing Cookies</h3>
                    <p className="text-g7-charcoal/70 text-sm mb-2">
                      These cookies are used to track visitors across websites to display relevant advertisements and measure the effectiveness of marketing campaigns.
                    </p>
                    <p className="text-xs text-g7-charcoal/50">
                      Duration: Up to 1 year | Can be disabled
                    </p>
                  </div>

                  <div className="p-4 bg-gray-50 rounded-lg">
                    <h3 className="font-semibold text-g7-charcoal mb-2">Functional Cookies</h3>
                    <p className="text-g7-charcoal/70 text-sm mb-2">
                      These cookies enable enhanced functionality and personalization, such as remembering your language preferences and login status.
                    </p>
                    <p className="text-xs text-g7-charcoal/50">
                      Duration: Up to 1 year | Can be disabled
                    </p>
                  </div>
                </div>
              </section>

              <section className="mb-8">
                <h2 className="font-serif text-2xl text-g7-charcoal mb-4">Third-Party Cookies</h2>
                <p className="text-g7-charcoal/70 mb-4">We may allow third-party services to place cookies on your device for the following purposes:</p>
                <ul className="list-disc pl-6 text-g7-charcoal/70 space-y-2">
                  <li><strong>Google Analytics:</strong> Website analytics and user behavior tracking</li>
                  <li><strong>Google Ads:</strong> Displaying personalized advertisements</li>
                  <li><strong>Facebook Pixel:</strong> Social media advertising and remarketing</li>
                  <li><strong>Payment Processors:</strong> Secure payment processing</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="font-serif text-2xl text-g7-charcoal mb-4">Managing Your Cookie Preferences</h2>
                <p className="text-g7-charcoal/70 leading-relaxed mb-4">
                  You can manage your cookie preferences through our cookie consent banner or your browser settings. Note that disabling certain cookies may affect your experience on our website.
                </p>
                <p className="text-g7-charcoal/70 leading-relaxed mb-4">
                  To manage cookies through your browser:
                </p>
                <ul className="list-disc pl-6 text-g7-charcoal/70 space-y-2">
                  <li><strong>Chrome:</strong> Settings > Privacy and security > Cookies and other site data</li>
                  <li><strong>Firefox:</strong> Options > Privacy & Security > Cookies and Site Data</li>
                  <li><strong>Safari:</strong> Preferences > Privacy > Manage Website Data</li>
                  <li><strong>Edge:</strong> Settings > Cookies and site permissions</li>
                </ul>
              </section>

              <section>
                <h2 className="font-serif text-2xl text-g7-charcoal mb-4">Updates to This Policy</h2>
                <p className="text-g7-charcoal/70 leading-relaxed">
                  We may update this Cookie Policy from time to time to reflect changes in our practices or for other operational, legal, or regulatory reasons. We encourage you to review this policy periodically.
                </p>
              </section>
            </div>
          </Card>

          {/* Cookie Preferences Manager */}
          <Card className="p-8">
            <h2 className="font-serif text-2xl text-g7-charcoal mb-6">Your Cookie Preferences</h2>
            <p className="text-g7-charcoal/70 mb-6">
              Customize your cookie preferences below. Changes will take effect on your next visit.
            </p>

            <div className="space-y-4 mb-8">
              <div className="flex items-start justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <Checkbox
                      id="necessary"
                      checked={preferences.necessary}
                      disabled
                    />
                    <label htmlFor="necessary" className="font-semibold text-g7-charcoal">
                      Necessary Cookies
                    </label>
                  </div>
                  <p className="text-sm text-g7-charcoal/60 pl-7">
                    Required for the website to function properly. Cannot be disabled.
                  </p>
                </div>
                <span className="text-xs text-g7-charcoal/50">Always Active</span>
              </div>

              <div className="flex items-start justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <Checkbox
                      id="analytics"
                      checked={preferences.analytics}
                      onCheckedChange={(checked) =>
                        setPreferences({ ...preferences, analytics: checked as boolean })
                      }
                    />
                    <label htmlFor="analytics" className="font-semibold text-g7-charcoal">
                      Analytics Cookies
                    </label>
                  </div>
                  <p className="text-sm text-g7-charcoal/60 pl-7">
                    Help us understand how you use our website to improve your experience.
                  </p>
                </div>
              </div>

              <div className="flex items-start justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <Checkbox
                      id="marketing"
                      checked={preferences.marketing}
                      onCheckedChange={(checked) =>
                        setPreferences({ ...preferences, marketing: checked as boolean })
                      }
                    />
                    <label htmlFor="marketing" className="font-semibold text-g7-charcoal">
                      Marketing Cookies
                    </label>
                  </div>
                  <p className="text-sm text-g7-charcoal/60 pl-7">
                    Used to display personalized advertisements and measure marketing effectiveness.
                  </p>
                </div>
              </div>

              <div className="flex items-start justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <Checkbox
                      id="functional"
                      checked={preferences.functional}
                      onCheckedChange={(checked) =>
                        setPreferences({ ...preferences, functional: checked as boolean })
                      }
                    />
                    <label htmlFor="functional" className="font-semibold text-g7-charcoal">
                      Functional Cookies
                    </label>
                  </div>
                  <p className="text-sm text-g7-charcoal/60 pl-7">
                    Enable enhanced functionality and remember your preferences.
                  </p>
                </div>
              </div>
            </div>

            <div className="flex gap-4">
              <Button
                onClick={() => {
                  console.log('Saving preferences:', preferences);
                  alert('Your cookie preferences have been saved.');
                }}
                className="flex-1 bg-g7-charcoal text-g7-ivory hover:bg-g7-gold hover:text-g7-charcoal"
              >
                Save Preferences
              </Button>
              <Button
                variant="outline"
                onClick={() => setPreferences({
                  necessary: true,
                  analytics: true,
                  marketing: true,
                  functional: true,
                })}
                className="border-g7-charcoal text-g7-charcoal hover:bg-g7-charcoal hover:text-g7-ivory"
              >
                Accept All
              </Button>
            </div>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  );
}
