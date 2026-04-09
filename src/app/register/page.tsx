'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Mail, Lock, User, Phone, Eye, EyeOff, Check } from 'lucide-react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { PageHero } from '@/components/common/HeroSection';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { cn } from '@/lib/utils';

/**
 * G7 Hotels Register Page
 * New user registration with comprehensive form
 */

export default function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    agreeTerms: false,
    agreeMarketing: false,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle registration logic here
    console.log('Registration attempt:', formData);
  };

  const passwordStrength = () => {
    const password = formData.password;
    let strength = 0;
    if (password.length >= 8) strength++;
    if (/[a-z]/.test(password) && /[A-Z]/.test(password)) strength++;
    if (/\d/.test(password)) strength++;
    if (/[^a-zA-Z0-9]/.test(password)) strength++;
    return strength;
  };

  const strengthLabels = ['Weak', 'Fair', 'Good', 'Strong'];
  const strengthColors = ['bg-red-500', 'bg-yellow-500', 'bg-blue-500', 'bg-green-500'];

  return (
    <div className="min-h-screen flex flex-col bg-g7-ivory">
      <Header />

      {/* Page Hero */}
      <PageHero
        title="Create Account"
        subtitle="Join G7 Hotels Rewards"
        backgroundImage="/images/hero/hero-1.jpg"
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Create Account' },
        ]}
      />

      <main className="flex-1 container mx-auto px-4 py-12">
        <div className="max-w-2xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Card className="p-8 border-g7-gold/30">
              <div className="text-center mb-8">
                <h2 className="font-serif text-3xl text-g7-charcoal mb-2">Create Account</h2>
                <p className="text-g7-charcoal/70">
                  Join G7 Hotels Rewards and start earning points on every stay.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">First Name</Label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-g7-charcoal/40" />
                      <Input
                        id="firstName"
                        placeholder="John"
                        value={formData.firstName}
                        onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                        className="pl-10 border-g7-gold/50"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="lastName">Last Name</Label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-g7-charcoal/40" />
                      <Input
                        id="lastName"
                        placeholder="Doe"
                        value={formData.lastName}
                        onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                        className="pl-10 border-g7-gold/50"
                        required
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-g7-charcoal/40" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="your@email.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="pl-10 border-g7-gold/50"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-g7-charcoal/40" />
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="+91 98765 43210"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="pl-10 border-g7-gold/50"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-g7-charcoal/40" />
                    <Input
                      id="password"
                      type={showPassword ? 'text' : 'password'}
                      placeholder="Create a strong password"
                      value={formData.password}
                      onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                      className="pl-10 pr-10 border-g7-gold/50"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-g7-charcoal/40 hover:text-g7-charcoal"
                    >
                      {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                    </button>
                  </div>

                  {/* Password Strength Indicator */}
                  {formData.password && (
                    <div className="space-y-2">
                      <div className="flex gap-1">
                        {[0, 1, 2, 3].map((index) => (
                          <div
                            key={index}
                            className={cn(
                              'h-1 flex-1 rounded-full transition-all duration-300',
                              index < passwordStrength()
                                ? strengthColors[passwordStrength() - 1]
                                : 'bg-gray-200'
                            )}
                          />
                        ))}
                      </div>
                      <p className="text-xs text-g7-charcoal/60">
                        Password strength: <span className="font-semibold">{strengthLabels[passwordStrength() - 1] || 'Very Weak'}</span>
                      </p>
                    </div>
                  )}

                  {/* Password Requirements */}
                  <div className="space-y-1 mt-2">
                    <p className="text-xs text-g7-charcoal/60 mb-2">Password must contain:</p>
                    <div className="grid grid-cols-2 gap-1 text-xs">
                      <div className={cn("flex items-center gap-1", formData.password.length >= 8 ? "text-green-600" : "text-g7-charcoal/60")}>
                        <span>{formData.password.length >= 8 ? <Check className="h-3 w-3" /> : "○"}</span>
                        At least 8 characters
                      </div>
                      <div className={cn("flex items-center gap-1", /[a-z]/.test(formData.password) && /[A-Z]/.test(formData.password) ? "text-green-600" : "text-g7-charcoal/60")}>
                        <span>{/[a-z]/.test(formData.password) && /[A-Z]/.test(formData.password) ? <Check className="h-3 w-3" /> : "○"}</span>
                        Uppercase & lowercase
                      </div>
                      <div className={cn("flex items-center gap-1", /\d/.test(formData.password) ? "text-green-600" : "text-g7-charcoal/60")}>
                        <span>{/\d/.test(formData.password) ? <Check className="h-3 w-3" /> : "○"}</span>
                        At least 1 number
                      </div>
                      <div className={cn("flex items-center gap-1", /[^a-zA-Z0-9]/.test(formData.password) ? "text-green-600" : "text-g7-charcoal/60")}>
                        <span>{/[^a-zA-Z0-9]/.test(formData.password) ? <Check className="h-3 w-3" /> : "○"}</span>
                        1 special character
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Confirm Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-g7-charcoal/40" />
                    <Input
                      id="confirmPassword"
                      type={showConfirmPassword ? 'text' : 'password'}
                      placeholder="Confirm your password"
                      value={formData.confirmPassword}
                      onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                      className={cn(
                        "pl-10 pr-10 border-g7-gold/50",
                        formData.confirmPassword && formData.password !== formData.confirmPassword && "border-red-500"
                      )}
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-g7-charcoal/40 hover:text-g7-charcoal"
                    >
                      {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                    </button>
                  </div>
                  {formData.confirmPassword && formData.password !== formData.confirmPassword && (
                    <p className="text-xs text-red-500">Passwords do not match</p>
                  )}
                </div>

                <div className="space-y-4">
                  <div className="flex items-start space-x-2">
                    <Checkbox
                      id="agreeTerms"
                      checked={formData.agreeTerms}
                      onCheckedChange={(checked) =>
                        setFormData({ ...formData, agreeTerms: checked as boolean })
                      }
                      required
                    />
                    <Label htmlFor="agreeTerms" className="text-sm text-g7-charcoal/70 leading-normal">
                      I agree to the{' '}
                      <Link href="/terms" className="text-g7-gold hover:underline">
                        Terms of Service
                      </Link>
                      {' '}and{' '}
                      <Link href="/privacy" className="text-g7-gold hover:underline">
                        Privacy Policy
                      </Link>
                    </Label>
                  </div>

                  <div className="flex items-start space-x-2">
                    <Checkbox
                      id="agreeMarketing"
                      checked={formData.agreeMarketing}
                      onCheckedChange={(checked) =>
                        setFormData({ ...formData, agreeMarketing: checked as boolean })
                      }
                    />
                    <Label htmlFor="agreeMarketing" className="text-sm text-g7-charcoal/70 leading-normal">
                      I would like to receive exclusive offers, updates, and inspiration from G7 Hotels
                    </Label>
                  </div>
                </div>

                <Button
                  type="submit"
                  className="w-full bg-g7-charcoal text-g7-ivory hover:bg-g7-gold hover:text-g7-charcoal py-6"
                >
                  Create Account
                </Button>
              </form>

              <p className="mt-8 text-center text-sm text-g7-charcoal/70">
                Already have an account?{' '}
                <Link href="/login" className="text-g7-gold font-semibold hover:underline">
                  Sign in
                </Link>
              </p>
            </Card>

            {/* Benefits Card */}
            <Card className="mt-6 p-6 bg-g7-gold/5 border-g7-gold/20">
              <h3 className="font-semibold text-g7-charcoal mb-4">Why Join G7 Rewards?</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-g7-charcoal/70">
                <div className="flex items-start gap-2">
                  <span className="text-g7-gold mt-0.5">✓</span>
                  <span>Earn 5 points per ₹100 spent</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-g7-gold mt-0.5">✓</span>
                  <span>Complimentary room upgrades</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-g7-gold mt-0.5">✓</span>
                  <span>Priority check-in & late check-out</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-g7-gold mt-0.5">✓</span>
                  <span>Exclusive member rates</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-g7-gold mt-0.5">✓</span>
                  <span>Free Wi-Fi always</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-g7-gold mt-0.5">✓</span>
                  <span>Birthday & anniversary treats</span>
                </div>
              </div>
            </Card>
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
