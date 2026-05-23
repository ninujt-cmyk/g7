'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, Clock, Send, CheckCircle, AlertCircle, Building, Calendar, Utensils } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import Image from 'next/image';

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 }
};

const contactInfo = {
  address: 'Flagship Property / Tirupati, Merlapaka tollplaza, yerpedu, Srikalahasti, Andhra Pradesh 517619',
  phone: '+91 81860 15167',
  email: 'reservations@g7hotels.in',
  hours: {
    reception: '24 Hours',
    reservations: '9:00 AM - 9:00 PM IST',
    spa: '8:00 AM - 10:00 PM IST',
    restaurants: '7:00 AM - 11:00 PM IST'
  }
};

const departments = [
  { id: 'reservations', label: 'Reservations', email: 'reservations@g7hotels.in' },
  { id: 'events', label: 'Events & Weddings', email: 'events@g7hotels.in' },
  { id: 'spa', label: 'Spa & Wellness', email: 'spa@g7hotels.in' },
  { id: 'dining', label: 'Dining & Restaurants', email: 'dining@g7hotels.in' },
  { id: 'loyalty', label: 'Loyalty Program', email: 'loyalty@g7hotels.in' },
  { id: 'feedback', label: 'Feedback & Suggestions', email: 'feedback@g7hotels.in' },
  { id: 'careers', label: 'Careers', email: 'careers@g7hotels.in' },
  { id: 'media', label: 'Media & Press', email: 'media@g7hotels.in' }
];

const faqs = [
  {
    question: 'How do I make a reservation?',
    answer: 'You can make a reservation through our website using the booking widget, by calling our reservations team at +91 81860 15167, or by email at reservations@g7hotels.in. Our online booking system is available 24/7.'
  },
  {
    question: 'What is your cancellation policy?',
    answer: 'Our standard cancellation policy allows free cancellation up to 48 hours before check-in. For special packages and peak season bookings, different policies may apply. Please check your confirmation email for specific details.'
  },
  {
    question: 'Do you offer airport transfers?',
    answer: 'Yes, we offer complimentary airport transfers for guests staying in our suites and premium rooms. For other room categories, we provide airport transfer services at additional charges. Please contact us to arrange your transfer.'
  },
  {
    question: 'Are pets allowed in the hotel?',
    answer: 'We welcome well-behaved pets in select rooms. Please inform us at the time of booking if you plan to bring your pet. Additional charges and restrictions may apply.'
  },
  {
    question: 'What dining options are available?',
    answer: 'G7 Hotels features multiple dining venues including fine dining restaurants, casual cafés, bars, and 24-hour room service. Our restaurants serve a variety of cuisines from Indian and international to fusion and wellness-focused menus.'
  },
  {
    question: 'Is spa access included with my stay?',
    answer: 'Access to our spa facilities including the thermal pool, sauna, and steam room is complimentary for guests in our suite categories. Other guests can purchase day passes or book individual treatments.'
  }
];

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    department: '',
    message: '',
    consent: false
  });
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    // Basic validation
    if (!formData.name || !formData.email || !formData.message) {
      setError('Please fill in all required fields.');
      return;
    }

    if (!formData.consent) {
      setError('Please accept the privacy policy to continue.');
      return;
    }

    // Simulate form submission
    setSubmitted(true);
    
    // Reset form after 3 seconds
    setTimeout(() => {
      setSubmitted(false);
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        department: '',
        message: '',
        consent: false
      });
    }, 3000);
  };

  const handleQuickAction = (type: 'booking' | 'event' | 'dining') => {
    const typeMessages: Record<string, string> = {
      booking: 'I would like to make a reservation for...',
      event: 'I am interested in hosting an event/wedding...',
      dining: 'I would like to make a restaurant reservation...'
    };
    setFormData(prev => ({
      ...prev,
      subject: typeMessages[type],
      department: type === 'booking' ? 'reservations' : type === 'event' ? 'events' : 'dining',
      message: typeMessages[type]
    }));
  };

  return (
    <div className="min-h-screen bg-[#F8F6F2]">
      {/* Hero Section */}
      <section className="relative h-[50vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1920&h=1080&fit=crop"
            alt="G7 Hotels Contact"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/60" />
        </div>
        
        <div className="relative z-10 text-center text-white px-4 max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Mail className="w-16 h-16 mx-auto mb-4 text-[#C9A45C]" />
            <h1 className="text-5xl md:text-7xl font-serif mb-6">Contact Us</h1>
            <p className="text-xl md:text-2xl font-light opacity-90">
              We\'re Here to Help You Plan Your Perfect Stay
            </p>
          </motion.div>
        </div>
      </section>

      {/* Quick Actions */}
      <section className="py-8 px-4 bg-white border-b border-[#1A1A1A]/10">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-3 gap-4"
          >
            <Button
              variant="outline"
              size="lg"
              className="h-auto py-4 flex-col gap-2 hover:border-[#C9A45C]"
              onClick={() => handleQuickAction('booking')}
            >
              <Calendar className="w-6 h-6" />
              <span>Make a Reservation</span>
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="h-auto py-4 flex-col gap-2 hover:border-[#C9A45C]"
              onClick={() => handleQuickAction('event')}
            >
              <Building className="w-6 h-6" />
              <span>Book an Event</span>
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="h-auto py-4 flex-col gap-2 hover:border-[#C9A45C]"
              onClick={() => handleQuickAction('dining')}
            >
              <Utensils className="w-6 h-6" />
              <span>Reserve a Table</span>
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-4xl font-serif text-[#1A1A1A] mb-6">Send Us a Message</h2>
              <p className="text-[#1A1A1A]/70 mb-8">
                Fill out the form below and we\'ll get back to you within 24 hours.
              </p>

              {submitted ? (
                <Card className="bg-[#2C4A3E] text-[#F8F6F2]">
                  <CardContent className="p-8 text-center">
                    <CheckCircle className="w-16 h-16 text-[#C9A45C] mx-auto mb-4" />
                    <h3 className="text-2xl font-serif mb-2">Message Sent!</h3>
                    <p className="opacity-90">Thank you for contacting us. We\'ll be in touch shortly.</p>
                  </CardContent>
                </Card>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="name">Name *</Label>
                      <Input
                        id="name"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="Your full name"
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="email">Email *</Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="your@email.com"
                        className="mt-1"
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="+91 98765 43210"
                      className="mt-1"
                    />
                  </div>

                  <div>
                    <Label htmlFor="department">Department</Label>
                    <Select value={formData.department} onValueChange={(value) => setFormData({ ...formData, department: value })}>
                      <SelectTrigger id="department" className="mt-1">
                        <SelectValue placeholder="Select a department" />
                      </SelectTrigger>
                      <SelectContent>
                        {departments.map(dept => (
                          <SelectItem key={dept.id} value={dept.id}>{dept.label}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="subject">Subject</Label>
                    <Input
                      id="subject"
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      placeholder="How can we help you?"
                      className="mt-1"
                    />
                  </div>

                  <div>
                    <Label htmlFor="message">Message *</Label>
                    <Textarea
                      id="message"
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Tell us more about your inquiry..."
                      rows={6}
                      className="mt-1"
                    />
                  </div>

                  <div className="flex items-start gap-2">
                    <Checkbox
                      id="consent"
                      checked={formData.consent}
                      onCheckedChange={(checked) => setFormData({ ...formData, consent: checked as boolean })}
                    />
                    <Label htmlFor="consent" className="text-sm text-[#1A1A1A]/70 leading-relaxed">
                      I consent to G7 Hotels collecting and processing my personal data in accordance with the Privacy Policy. *
                    </Label>
                  </div>

                  {error && (
                    <div className="flex items-center gap-2 text-red-600 text-sm bg-red-50 p-3 rounded-lg">
                      <AlertCircle className="w-4 h-4 flex-shrink-0" />
                      {error}
                    </div>
                  )}

                  <Button type="submit" size="lg" className="w-full bg-[#1A1A1A] text-[#F8F6F2] hover:bg-[#2C4A3E]">
                    <Send className="w-4 h-4 mr-2" />
                    Send Message
                  </Button>
                </form>
              )}
            </motion.div>

            {/* Contact Information */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <Card>
                <CardHeader>
                  <CardTitle className="text-2xl font-serif flex items-center gap-2">
                    <MapPin className="w-5 h-5 text-[#C9A45C]" />
                    Location
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-[#1A1A1A]/80 leading-relaxed">{contactInfo.address}</p>
                  <div className="mt-4 h-48 w-full overflow-hidden rounded-lg shadow-inner border border-g7-gold/20">
                    <iframe
                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3877.014283852086!2d79.5714777!3d13.6582522!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a4f0fd629adbf7b%3A0x334c9c104443efcf!2sMerlapaka%20Toll%20Plaza!5e0!3m2!1sen!2sin!4v1716460000000!5m2!1sen!2sin"
                      width="100%"
                      height="100%"
                      style={{ border: 0 }}
                      allowFullScreen={true}
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      className="grayscale hover:grayscale-0 transition-all duration-500"
                    />
                  </div>
                  <Button variant="link" className="text-[#C9A45C] mt-4 px-0" asChild>
                    <a href="https://maps.app.goo.gl/ZwsPen2L5EuhwKBC8" target="_blank" rel="noopener noreferrer">
                      Get Directions →
                    </a>
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-2xl font-serif flex items-center gap-2">
                    <Phone className="w-5 h-5 text-[#C9A45C]" />
                    Contact Details
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <p className="text-sm text-[#1A1A1A]/60 mb-1">Phone</p>
                    <p className="text-[#1A1A1A] font-medium">{contactInfo.phone}</p>
                  </div>
                  <div>
                    <p className="text-sm text-[#1A1A1A]/60 mb-1">Email</p>
                    <p className="text-[#1A1A1A] font-medium">{contactInfo.email}</p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-2xl font-serif flex items-center gap-2">
                    <Clock className="w-5 h-5 text-[#C9A45C]" />
                    Operating Hours
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {Object.entries(contactInfo.hours).map(([key, value]) => (
                    <div key={key} className="flex justify-between">
                      <span className="text-[#1A1A1A]/80 capitalize">{key}</span>
                      <span className="text-[#1A1A1A] font-medium">{value}</span>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl md:text-5xl font-serif text-[#1A1A1A] mb-4">Frequently Asked Questions</h2>
            <p className="text-xl text-[#1A1A1A]/70">Find answers to common questions</p>
          </motion.div>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="hover:border-[#C9A45C] transition-colors">
                  <CardContent className="p-6">
                    <h3 className="text-lg font-serif text-[#1A1A1A] mb-2">{faq.question}</h3>
                    <p className="text-[#1A1A1A]/70 leading-relaxed">{faq.answer}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-[#C9A45C]">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-serif text-[#1A1A1A] mb-6">
              Prefer to Talk to Someone?
            </h2>
            <p className="text-xl text-[#1A1A1A]/80 mb-8">
              Our concierge team is available 24/7 to assist you with any questions or requests.
            </p>
            <Button
              size="lg"
              className="bg-[#1A1A1A] text-[#F8F6F2] hover:bg-[#2C4A3E] text-lg px-8"
            >
              <Phone className="w-5 h-5 mr-2" />
              Call Us Now
            </Button>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
