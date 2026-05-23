'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { PageHero } from '@/components/common/HeroSection';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Search, MapPin, Briefcase, Clock, Users, Heart, GraduationCap } from 'lucide-react';
import { cn } from '@/lib/utils';

/**
 * G7 Hotels Careers Page
 * Job opportunities and company culture
 */

interface Job {
  id: string;
  title: string;
  department: string;
  location: string;
  type: 'full-time' | 'part-time' | 'contract';
  experience: string;
  description: string;
  postedDate: string;
}

const mockJobs: Job[] = [
  {
    id: '1',
    title: 'Front Desk Manager',
    department: 'Guest Services',
    location: 'New York',
    type: 'full-time',
    experience: '5+ years',
    description: 'Lead our front desk team in delivering exceptional guest experiences. Manage operations, train staff, and ensure smooth check-in/check-out processes.',
    postedDate: '2024-01-15',
  },
  {
    id: '2',
    title: 'Executive Chef',
    department: 'Culinary',
    location: 'Mumbai',
    type: 'full-time',
    experience: '8+ years',
    description: 'Oversee all kitchen operations, menu development, and culinary team management. Create innovative dishes while maintaining quality standards.',
    postedDate: '2024-01-10',
  },
  {
    id: '3',
    title: 'Spa Therapist',
    department: 'Spa & Wellness',
    location: 'New York',
    type: 'full-time',
    experience: '2+ years',
    description: 'Provide exceptional spa treatments including massages, facials, and body therapies. Create relaxing experiences for our guests.',
    postedDate: '2024-01-08',
  },
  {
    id: '4',
    title: 'Marketing Specialist',
    department: 'Marketing',
    location: 'Remote',
    type: 'full-time',
    experience: '3+ years',
    description: 'Develop and execute marketing campaigns, manage social media, and analyze performance metrics to drive brand awareness and bookings.',
    postedDate: '2024-01-05',
  },
  {
    id: '5',
    title: 'Housekeeping Supervisor',
    department: 'Housekeeping',
    location: 'Delhi',
    type: 'full-time',
    experience: '4+ years',
    description: 'Supervise housekeeping staff, ensure cleanliness standards, manage inventory, and coordinate with other departments.',
    postedDate: '2024-01-03',
  },
  {
    id: '6',
    title: 'Event Coordinator',
    department: 'Events',
    location: 'Mumbai',
    type: 'full-time',
    experience: '3+ years',
    description: 'Plan and coordinate weddings, corporate events, and social gatherings. Work with clients to create memorable experiences.',
    postedDate: '2024-01-01',
  },
];

const benefits = [
  { icon: <Heart className="h-6 w-6" />, title: 'Health Insurance', description: 'Comprehensive medical, dental, and vision coverage' },
  { icon: <Users className="h-6 w-6" />, title: 'Growth Opportunities', description: 'Career development and training programs' },
  { icon: <Briefcase className="h-6 w-6" />, title: 'Competitive Salary', description: 'Industry-leading compensation packages' },
  { icon: <GraduationCap className="h-6 w-6" />, title: 'Education Support', description: 'Tuition reimbursement and learning allowances' },
  { icon: <Clock className="h-6 w-6" />, title: 'Work-Life Balance', description: 'Flexible scheduling and paid time off' },
  { icon: <MapPin className="h-6 w-6" />, title: 'Global Opportunities', description: 'Transfer options across our properties' },
];

export default function CareersPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [departmentFilter, setDepartmentFilter] = useState('all');
  const [locationFilter, setLocationFilter] = useState('all');

  const filteredJobs = mockJobs.filter((job) => {
    const matchesSearch =
      job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.department.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesDepartment = departmentFilter === 'all' || job.department === departmentFilter;
    const matchesLocation = locationFilter === 'all' || job.location === locationFilter;
    return matchesSearch && matchesDepartment && matchesLocation;
  });

  const departments = ['all', ...Array.from(new Set(mockJobs.map((job) => job.department)))];
  const locations = ['all', ...Array.from(new Set(mockJobs.map((job) => job.location)))];

  return (
    <div className="min-h-screen flex flex-col bg-g7-ivory">
      <Header />

      <PageHero
        title="Join Our Team"
        subtitle="Build Your Career in Luxury Hospitality"
        backgroundImage="/images/hero/hero-1.jpg"
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Careers' },
        ]}
      />

      <main className="flex-1 container mx-auto px-4 py-12">
        {/* Hero Section */}
        <div className="max-w-4xl mx-auto text-center mb-16">
          <h2 className="font-serif text-4xl text-g7-charcoal mb-4">
            Be Part of Something Extraordinary
          </h2>
          <p className="text-g7-charcoal/70 text-lg">
            At G7 Hotels, we believe our people are our greatest asset. Join a team passionate about creating unforgettable experiences and building meaningful careers in luxury hospitality.
          </p>
        </div>

        {/* Benefits */}
        <div className="max-w-6xl mx-auto mb-16">
          <h3 className="font-serif text-2xl text-g7-charcoal text-center mb-8">Why Work With Us?</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {benefits.map((benefit, index) => (
              <Card key={index} className="p-6 text-center hover:shadow-lg transition-shadow">
                <div className="text-g7-gold mb-4 flex justify-center">{benefit.icon}</div>
                <h4 className="font-semibold text-g7-charcoal mb-2">{benefit.title}</h4>
                <p className="text-sm text-g7-charcoal/70">{benefit.description}</p>
              </Card>
            ))}
          </div>
        </div>

        {/* Job Search */}
        <div className="max-w-6xl mx-auto mb-8">
          <h3 className="font-serif text-2xl text-g7-charcoal text-center mb-6">Open Positions</h3>
          <Card className="p-6 mb-8">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-g7-charcoal/40" />
                <Input
                  placeholder="Search jobs..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 border-g7-gold/50"
                />
              </div>
              <Select value={departmentFilter} onValueChange={setDepartmentFilter}>
                <SelectTrigger className="border-g7-gold/50">
                  <SelectValue placeholder="Department" />
                </SelectTrigger>
                <SelectContent>
                  {departments.map((dept) => (
                    <SelectItem key={dept} value={dept}>
                      {dept === 'all' ? 'All Departments' : dept}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={locationFilter} onValueChange={setLocationFilter}>
                <SelectTrigger className="border-g7-gold/50">
                  <SelectValue placeholder="Location" />
                </SelectTrigger>
                <SelectContent>
                  {locations.map((loc) => (
                    <SelectItem key={loc} value={loc}>
                      {loc === 'all' ? 'All Locations' : loc}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </Card>

          {/* Job Listings */}
          <div className="space-y-4">
            {filteredJobs.length === 0 ? (
              <Card className="p-12 text-center">
                <Briefcase className="h-16 w-16 mx-auto text-g7-gold/30 mb-4" />
                <h4 className="font-serif text-xl text-g7-charcoal mb-2">No Positions Found</h4>
                <p className="text-g7-charcoal/70">
                  Try adjusting your search or filters to find available positions.
                </p>
              </Card>
            ) : (
              filteredJobs.map((job, index) => (
                <motion.div
                  key={job.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <Card className="p-6 hover:shadow-lg transition-all duration-300">
                    <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex flex-wrap items-center gap-2 mb-2">
                          <h4 className="font-serif text-xl text-g7-charcoal">{job.title}</h4>
                          <Badge className="bg-g7-gold text-g7-charcoal">{job.type}</Badge>
                        </div>
                        <p className="text-g7-charcoal/70 text-sm mb-4 line-clamp-2">
                          {job.description}
                        </p>
                        <div className="flex flex-wrap gap-4 text-sm text-g7-charcoal/60">
                          <div className="flex items-center gap-1">
                            <Briefcase className="h-4 w-4 text-g7-gold" />
                            <span>{job.department}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <MapPin className="h-4 w-4 text-g7-gold" />
                            <span>{job.location}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock className="h-4 w-4 text-g7-gold" />
                            <span>{job.experience}</span>
                          </div>
                        </div>
                      </div>
                      <Button className="bg-g7-charcoal text-g7-ivory hover:bg-g7-gold hover:text-g7-charcoal whitespace-nowrap">
                        Apply Now
                      </Button>
                    </div>
                  </Card>
                </motion.div>
              ))
            )}
          </div>
        </div>

        {/* Culture Section */}
        <Card className="max-w-6xl mx-auto mt-16 p-8 bg-g7-charcoal text-g7-ivory border-0">
          <h3 className="font-serif text-3xl text-center mb-6">Our Culture</h3>
          <p className="text-g7-ivory/80 text-center max-w-3xl mx-auto mb-8">
            We foster an inclusive, supportive environment where every team member can thrive. Our culture is built on respect, excellence, and a shared passion for creating memorable experiences.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
            <div>
              <p className="text-4xl font-bold text-g7-gold mb-2">500+</p>
              <p className="text-g7-ivory/70">Team Members</p>
            </div>
            <div>
              <p className="text-4xl font-bold text-g7-gold mb-2">15+</p>
              <p className="text-g7-ivory/70">Properties Worldwide</p>
            </div>
            <div>
              <p className="text-4xl font-bold text-g7-gold mb-2">4.5/5</p>
              <p className="text-g7-ivory/70">Employee Satisfaction</p>
            </div>
          </div>
        </Card>
      </main>

      <Footer />
    </div>
  );
}
