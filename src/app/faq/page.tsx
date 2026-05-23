'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { PageHero } from '@/components/common/HeroSection';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { ChevronDown, ChevronUp, Search, Phone, Mail, MessageCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

/**
 * G7 Hotels FAQ Page
 * Frequently asked questions and answers
 */

interface FAQ {
  id: string;
  category: string;
  question: string;
  answer: string;
}

const faqs: FAQ[] = [
  {
    id: '1',
    category: 'Bookings',
    question: 'How do I make a reservation?',
    answer: 'You can make a reservation directly through our website by visiting the Booking page, calling our 24/7 reservation line at +1 800 123 4567, or emailing reservations@g7hotels.com. Online bookings receive an instant confirmation via email.',
  },
  {
    id: '2',
    category: 'Bookings',
    question: 'What is your cancellation policy?',
    answer: 'Our standard cancellation policy allows free cancellation up to 48 hours before check-in. Cancellations made within 48 hours may incur a charge equal to one night\'s stay. Special rates and packages may have different cancellation terms, which will be clearly stated during booking.',
  },
  {
    id: '3',
    category: 'Bookings',
    question: 'Can I modify my booking after confirmation?',
    answer: 'Yes, you can modify your booking dates or room type subject to availability and rate differences. Modifications can be made through your account under "My Bookings" or by contacting our reservations team. Changes within 48 hours of check-in may incur modification fees.',
  },
  {
    id: '4',
    category: 'Check-in/Check-out',
    question: 'What are the check-in and check-out times?',
    answer: 'Standard check-in time is 3:00 PM and check-out time is 11:00 AM. Early check-in and late check-out can be requested based on availability. Gold and higher tier loyalty members receive complimentary late check-out until 2:00 PM.',
  },
  {
    id: '5',
    category: 'Check-in/Check-out',
    question: 'What documents do I need for check-in?',
    answer: 'You will need a valid government-issued photo ID (passport, driver\'s license, or national ID) and the credit card used for booking. International guests must present a valid passport with appropriate visa if required.',
  },
  {
    id: '6',
    category: 'Amenities',
    question: 'Is Wi-Fi available at the hotel?',
    answer: 'Yes, complimentary high-speed Wi-Fi is available throughout the hotel, including guest rooms, public areas, and meeting spaces. Premium bandwidth is available for business needs upon request.',
  },
  {
    id: '7',
    category: 'Amenities',
    question: 'Is parking available?',
    answer: 'Yes, we offer both self-parking and valet parking services. Valet parking is complimentary for all guests. Self-parking is available at a nominal fee. EV charging stations are also available on a first-come, first-served basis.',
  },
  {
    id: '8',
    category: 'Amenities',
    question: 'Do you have a fitness center and spa?',
    answer: 'Yes, our state-of-the-art fitness center is open 24/7 for all guests. Our luxury spa offers a range of treatments including massages, facials, and body therapies. Spa reservations are recommended and can be made online or through our concierge.',
  },
  {
    id: '9',
    category: 'Dining',
    question: 'What dining options are available?',
    answer: 'We offer multiple dining venues including fine dining restaurants, casual eateries, bars, and 24-hour room service. Our restaurants serve a variety of cuisines from traditional Indian to international fusion. Menus and operating hours are available on our Dining page.',
  },
  {
    id: '10',
    category: 'Dining',
    question: 'Can you accommodate dietary restrictions?',
    answer: 'Absolutely! Our culinary team can accommodate various dietary requirements including vegetarian, vegan, gluten-free, and allergen-free options. Please inform us of any dietary restrictions at the time of booking or upon check-in.',
  },
  {
    id: '11',
    category: 'Loyalty Program',
    question: 'How do I join G7 Rewards?',
    answer: 'Joining G7 Rewards is free and easy! Simply click "Join Now" on our website or download our mobile app. You can also enroll at check-in or through our guest services. Membership is immediate and you start earning points from your first stay.',
  },
  {
    id: '12',
    category: 'Loyalty Program',
    question: 'How do I earn and redeem points?',
    answer: 'Earn 5 points for every ₹100 spent on rooms, 2 points on dining, and 3 points on spa services. Points can be redeemed for free nights, room upgrades, spa credits, dining vouchers, and exclusive experiences. Points are valid for 24 months from the date earned.',
  },
  {
    id: '13',
    category: 'Payment',
    question: 'What payment methods do you accept?',
    answer: 'We accept all major credit cards (Visa, MasterCard, American Express, Discover), debit cards, and digital payments (Apple Pay, Google Pay, PayPal). Cash payments are accepted with a valid ID. For international payments, we accept most major currencies at current exchange rates.',
  },
  {
    id: '14',
    category: 'Payment',
    question: 'Is a deposit required for reservations?',
    answer: 'For flexible rate bookings, no deposit is required. For non-refundable rates, full payment is due at booking. For extended stays or group bookings, a deposit equal to one night\'s stay may be required. All deposit and payment terms are clearly stated during the booking process.',
  },
  {
    id: '15',
    category: 'Services',
    question: 'Do you offer airport transfers?',
    answer: 'Yes, we provide airport transfer services for all major nearby airports. Complimentary transfers are available for Platinum and Royal tier members. Other guests can arrange transfers for a fee. Please provide flight details at least 24 hours in advance.',
  },
  {
    id: '16',
    category: 'Services',
    question: 'Are pets allowed in the hotel?',
    answer: 'We welcome well-behaved pets in designated pet-friendly rooms. A pet fee and refundable deposit apply. Service animals are welcome at no additional charge. Please inform us at the time of booking if you plan to bring a pet.',
  },
];

const categories = ['All', ...Array.from(new Set(faqs.map((faq) => faq.category)))];

export default function FAQPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [openFAQ, setOpenFAQ] = useState<string | null>(null);

  const filteredFAQs = faqs.filter((faq) => {
    const matchesSearch =
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || faq.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const toggleFAQ = (id: string) => {
    setOpenFAQ(openFAQ === id ? null : id);
  };

  return (
    <div className="min-h-screen flex flex-col bg-g7-ivory">
      <Header />

      <PageHero
        title="Frequently Asked Questions"
        subtitle="Find Answers to Common Questions"
        backgroundImage="/images/hero/hero-1.jpg"
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'FAQ' },
        ]}
      />

      <main className="flex-1 container mx-auto px-4 py-12">
        {/* Search and Filter */}
        <div className="max-w-4xl mx-auto mb-8">
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-g7-charcoal/40" />
              <Input
                placeholder="Search questions..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 border-g7-gold/50"
              />
            </div>
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={cn(
                  'px-4 py-2 rounded-full text-sm font-medium transition-all',
                  selectedCategory === category
                    ? 'bg-g7-charcoal text-g7-ivory'
                    : 'bg-white text-g7-charcoal/70 hover:bg-g7-gold/20'
                )}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* FAQ List */}
        <div className="max-w-4xl mx-auto mb-12">
          {filteredFAQs.length === 0 ? (
            <Card className="p-12 text-center">
              <Search className="h-16 w-16 mx-auto text-g7-gold/30 mb-4" />
              <h3 className="font-serif text-2xl text-g7-charcoal mb-2">No Results Found</h3>
              <p className="text-g7-charcoal/70">
                Try adjusting your search or filter to find what you're looking for.
              </p>
            </Card>
          ) : (
            <div className="space-y-4">
              {filteredFAQs.map((faq, index) => (
                <motion.div
                  key={faq.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <Card className="overflow-hidden border-g7-gold/20">
                    <button
                      onClick={() => toggleFAQ(faq.id)}
                      className="w-full p-6 text-left flex items-start justify-between hover:bg-gray-50 transition-colors"
                    >
                      <div className="flex-1 pr-4">
                        <span className="inline-block px-2 py-1 text-xs font-medium bg-g7-gold/20 text-g7-charcoal rounded mb-2">
                          {faq.category}
                        </span>
                        <h3 className="font-semibold text-g7-charcoal">{faq.question}</h3>
                      </div>
                      <div className="flex-shrink-0">
                        {openFAQ === faq.id ? (
                          <ChevronUp className="h-5 w-5 text-g7-gold" />
                        ) : (
                          <ChevronDown className="h-5 w-5 text-g7-charcoal/60" />
                        )}
                      </div>
                    </button>
                    <AnimatePresence>
                      {openFAQ === faq.id && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          className="overflow-hidden"
                        >
                          <div className="px-6 pb-6 pt-0">
                            <p className="text-g7-charcoal/70 leading-relaxed">{faq.answer}</p>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </Card>
                </motion.div>
              ))}
            </div>
          )}
        </div>

        {/* Contact Support */}
        <Card className="max-w-4xl mx-auto p-8 bg-g7-charcoal text-g7-ivory border-0">
          <h2 className="font-serif text-2xl text-center mb-6">Still Have Questions?</h2>
          <p className="text-g7-ivory/80 text-center mb-8">
            Our dedicated support team is available 24/7 to assist you with any inquiries.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center p-4 bg-g7-charcoal-light rounded-lg">
              <Phone className="h-8 w-8 mx-auto mb-3 text-g7-gold" />
              <h3 className="font-semibold mb-2">Call Us</h3>
              <p className="text-sm text-g7-ivory/70 mb-2">24/7 Guest Services</p>
              <a href="tel:+18001234567" className="text-g7-gold hover:underline">
                +1 800 123 4567
              </a>
            </div>
            <div className="text-center p-4 bg-g7-charcoal-light rounded-lg">
              <Mail className="h-8 w-8 mx-auto mb-3 text-g7-gold" />
              <h3 className="font-semibold mb-2">Email Us</h3>
              <p className="text-sm text-g7-ivory/70 mb-2">Response within 24 hours</p>
              <a href="mailto:support@g7hotels.com" className="text-g7-gold hover:underline">
                support@g7hotels.com
              </a>
            </div>
            <div className="text-center p-4 bg-g7-charcoal-light rounded-lg">
              <MessageCircle className="h-8 w-8 mx-auto mb-3 text-g7-gold" />
              <h3 className="font-semibold mb-2">Live Chat</h3>
              <p className="text-sm text-g7-ivory/70 mb-2">Instant assistance</p>
              <button className="text-g7-gold hover:underline">Start Chat</button>
            </div>
          </div>
        </Card>
      </main>

      <Footer />
    </div>
  );
}
