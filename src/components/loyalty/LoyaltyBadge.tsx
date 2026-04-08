'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Crown, Sparkles, Gem, Shield } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import type { LoyaltyTier } from '@/types';

/**
 * G7 Hotels Loyalty Badge Component
 * Display loyalty tier status with elegant design
 */

interface LoyaltyBadgeProps {
  tier: LoyaltyTier;
  points?: number;
  showLabel?: boolean;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'badge' | 'card' | 'full';
}

const tierConfig: Record<
  LoyaltyTier,
  {
    name: string;
    icon: React.ReactNode;
    color: string;
    bgColor: string;
    borderColor: string;
    benefits: string[];
  }
> = {
  silver: {
    name: 'Silver',
    icon: <Shield className="h-4 w-4" />,
    color: '#C0C0C0',
    bgColor: 'bg-gray-100',
    borderColor: 'border-gray-300',
    benefits: [
      'Priority Check-in',
      'Comimentary Wi-Fi',
      'Room Upgrade (subject to availability)',
      '5% Bonus Points on Stays',
    ],
  },
  gold: {
    name: 'Gold',
    icon: <Crown className="h-4 w-4" />,
    color: '#FFD700',
    bgColor: 'bg-yellow-50',
    borderColor: 'border-yellow-400',
    benefits: [
      'All Silver Benefits',
      'Executive Lounge Access',
      'Late Check-out (2 PM)',
      '10% Bonus Points on Stays',
      'Complimentary Breakfast',
    ],
  },
  platinum: {
    name: 'Platinum',
    icon: <Gem className="h-4 w-4" />,
    color: '#E5E4E2',
    bgColor: 'bg-slate-50',
    borderColor: 'border-slate-300',
    benefits: [
      'All Gold Benefits',
      'Suite Upgrade Guarantee',
      'Personal Concierge',
      '15% Bonus Points on Stays',
      'Airport Transfer',
      'Spa Credit ($100 per stay)',
    ],
  },
  royal: {
    name: 'Royal',
    icon: <Sparkles className="h-4 w-4" />,
    color: '#C9A45C',
    bgColor: 'bg-amber-50',
    borderColor: 'border-amber-400',
    benefits: [
      'All Platinum Benefits',
      'Royal Suite Guarantee',
      '24/7 Personal Assistant',
      '25% Bonus Points on Stays',
      'Private Dining Experience',
      'Exclusive Events Access',
      'Complimentary Mini Bar',
      'Unlimited Spa Access',
    ],
  },
};

export function LoyaltyBadge({
  tier,
  points,
  showLabel = true,
  size = 'md',
  variant = 'badge',
}: LoyaltyBadgeProps) {
  const config = tierConfig[tier];

  if (variant === 'badge') {
    const sizeClasses = {
      sm: 'text-xs px-2 py-1',
      md: 'text-sm px-3 py-1.5',
      lg: 'text-base px-4 py-2',
    };

    return (
      <Badge
        variant="outline"
        className={cn(
          'flex items-center gap-2 font-medium',
          sizeClasses[size],
          config.bgColor,
          config.borderColor,
          'border-2'
        )}
        style={{ color: config.color, borderColor: config.color }}
      >
        <span style={{ color: config.color }}>{config.icon}</span>
        {showLabel && <span>{config.name}</span>}
      </Badge>
    );
  }

  if (variant === 'card') {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className={cn(
          'rounded-lg p-6 border-2',
          config.bgColor,
          'relative overflow-hidden'
        )}
        style={{ borderColor: config.color }}
      >
        {/* Background Pattern */}
        <div
          className="absolute inset-0 opacity-5"
          style={{ backgroundColor: config.color }}
        />

        <div className="relative z-10">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div
                className="w-12 h-12 rounded-full flex items-center justify-center"
                style={{ backgroundColor: `${config.color}20` }}
              >
                <span style={{ color: config.color }}>
                  {React.cloneElement(config.icon as React.ReactElement, {
                    className: 'h-6 w-6',
                  })}
                </span>
              </div>
              <div>
                <p className="text-sm text-gray-600">Loyalty Tier</p>
                <h3
                  className="text-2xl font-serif font-bold"
                  style={{ color: config.color }}
                >
                  {config.name}
                </h3>
              </div>
            </div>
          </div>

          {points !== undefined && (
            <div className="mb-4">
              <p className="text-sm text-gray-600 mb-1">Available Points</p>
              <p className="text-3xl font-bold text-gray-900">
                {points.toLocaleString()}
              </p>
            </div>
          )}

          <div className="space-y-2">
            <p className="text-sm font-medium text-gray-700">Your Benefits:</p>
            <ul className="space-y-1">
              {config.benefits.slice(0, 3).map((benefit, index) => (
                <li
                  key={index}
                  className="text-sm text-gray-600 flex items-center gap-2"
                >
                  <span
                    className="w-1.5 h-1.5 rounded-full"
                    style={{ backgroundColor: config.color }}
                  />
                  {benefit}
                </li>
              ))}
              {config.benefits.length > 3 && (
                <li className="text-sm font-medium" style={{ color: config.color }}>
                  +{config.benefits.length - 3} more benefits
                </li>
              )}
            </ul>
          </div>
        </div>
      </motion.div>
    );
  }

  // Full variant
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={cn(
        'rounded-xl p-8 border-2',
        config.bgColor,
        'relative overflow-hidden'
      )}
      style={{ borderColor: config.color }}
    >
      {/* Decorative Elements */}
      <div className="absolute top-0 right-0 w-32 h-32 opacity-10">
        {React.cloneElement(config.icon as React.ReactElement, {
          className: 'h-full w-full',
          style: { color: config.color },
        })}
      </div>

      <div className="relative z-10">
        {/* Header */}
        <div className="flex items-start justify-between mb-6">
          <div className="flex items-center gap-4">
            <div
              className="w-16 h-16 rounded-full flex items-center justify-center"
              style={{ backgroundColor: `${config.color}20` }}
            >
              <span style={{ color: config.color }}>
                {React.cloneElement(config.icon as React.ReactElement, {
                  className: 'h-8 w-8',
                })}
              </span>
            </div>
            <div>
              <p className="text-sm text-gray-600 mb-1">Loyalty Status</p>
              <h2
                className="text-4xl font-serif font-bold"
                style={{ color: config.color }}
              >
                {config.name} Member
              </h2>
            </div>
          </div>
        </div>

        {/* Points */}
        {points !== undefined && (
          <div className="mb-8 p-4 bg-white/50 rounded-lg">
            <div className="flex items-end justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Reward Points</p>
                <p className="text-4xl font-bold text-gray-900">
                  {points.toLocaleString()}
                </p>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-600 mb-1">Point Value</p>
                <p className="text-xl font-bold" style={{ color: config.color }}>
                  ${(points * 0.01).toLocaleString()}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Benefits */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Exclusive {config.name} Benefits
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {config.benefits.map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                className="flex items-center gap-3 p-3 bg-white/30 rounded-lg"
              >
                <span
                  className="w-2 h-2 rounded-full flex-shrink-0"
                  style={{ backgroundColor: config.color }}
                />
                <span className="text-gray-700">{benefit}</span>
              </motion.div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-8"
        >
          <button
            className="w-full py-3 px-6 rounded-lg font-medium text-white transition-all hover:opacity-90"
            style={{ backgroundColor: config.color }}
          >
            View All Benefits & Redeem Points
          </button>
        </motion.div>
      </div>
    </motion.div>
  );
}

/**
 * Tier Progress Component
 * Shows progress towards next tier
 */
interface TierProgressProps {
  currentTier: LoyaltyTier;
  points: number;
  pointsToNextTier: number;
  nextTier?: LoyaltyTier;
}

export function TierProgress({
  currentTier,
  points,
  pointsToNextTier,
  nextTier,
}: TierProgressProps) {
  const progress = (points / pointsToNextTier) * 100;
  const currentConfig = tierConfig[currentTier];
  const nextConfig = nextTier ? tierConfig[nextTier] : null;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <LoyaltyBadge tier={currentTier} showLabel={false} size="sm" />
          <span className="font-medium text-gray-900">{currentConfig.name}</span>
        </div>
        {nextConfig && (
          <div className="flex items-center gap-2">
            <span className="font-medium text-gray-900">{nextConfig.name}</span>
            <LoyaltyBadge tier={nextTier} showLabel={false} size="sm" />
          </div>
        )}
      </div>

      <div className="relative h-3 bg-gray-200 rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 1, ease: 'easeOut' }}
          className="absolute inset-y-0 left-0 rounded-full"
          style={{ backgroundColor: currentConfig.color }}
        />
      </div>

      <div className="flex items-center justify-between text-sm">
        <span className="text-gray-600">
          {points.toLocaleString()} points
        </span>
        {nextConfig && (
          <span className="text-gray-600">
            {pointsToNextTier.toLocaleString()} points to {nextConfig.name}
          </span>
        )}
      </div>
    </div>
  );
}
