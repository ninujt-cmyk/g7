'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Cookie, Info } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

/**
 * G7 Hotels Cookie Consent Banner
 * GDPR/CCPA compliant cookie consent management
 */

export function CookieConsent() {
  const [showBanner, setShowBanner] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [preferences, setPreferences] = useState({
    necessary: true,
    functional: false,
    analytics: false,
    marketing: false,
  });

  useEffect(() => {
    // Check if user has already made a choice
    const consent = localStorage.getItem('cookie-consent');
    if (!consent) {
      // Show banner after a short delay
      const timer = setTimeout(() => {
        setShowBanner(true);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAcceptAll = () => {
    const allPreferences = {
      necessary: true,
      functional: true,
      analytics: true,
      marketing: true,
    };
    setPreferences(allPreferences);
    saveConsent(allPreferences);
    setShowBanner(false);
  };

  const handleAcceptSelected = () => {
    saveConsent(preferences);
    setShowBanner(false);
  };

  const handleRejectAll = () => {
    const minimalPreferences = {
      necessary: true,
      functional: false,
      analytics: false,
      marketing: false,
    };
    setPreferences(minimalPreferences);
    saveConsent(minimalPreferences);
    setShowBanner(false);
  };

  const saveConsent = (prefs: typeof preferences) => {
    localStorage.setItem('cookie-consent', JSON.stringify({
      preferences: prefs,
      timestamp: new Date().toISOString(),
      version: '1.0',
    }));
    
    // Here you would also trigger any analytics initialization based on preferences
    // For example: initializeAnalytics(prefs.analytics);
  };

  if (!showBanner) return null;

  return (
    <AnimatePresence>
      {showBanner && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="fixed bottom-0 left-0 right-0 z-50 bg-g7-charcoal border-t border-g7-gold/30 p-4 md:p-6"
        >
          <div className="container mx-auto max-w-6xl">
            <div className="flex flex-col lg:flex-row gap-6">
              {/* Content */}
              <div className="flex-1">
                <div className="flex items-start gap-4">
                  <div className="hidden sm:flex w-12 h-12 items-center justify-center bg-g7-gold/20 rounded-full flex-shrink-0">
                    <Cookie className="h-6 w-6 text-g7-gold" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-serif text-xl text-g7-ivory mb-2">
                      We Value Your Privacy
                    </h3>
                    <p className="text-g7-ivory/80 text-sm mb-4">
                      We use cookies and similar technologies to enhance your experience, analyze usage, and assist in our marketing efforts.
                      {showDetails && (
                        <span className="block mt-2">
                          <strong>Necessary Cookies:</strong> Required for the website to function properly.<br />
                          <strong>Functional Cookies:</strong> Remember your preferences and settings.<br />
                          <strong>Analytics Cookies:</strong> Help us understand how you use our website.<br />
                          <strong>Marketing Cookies:</strong> Used to deliver relevant advertisements.
                        </span>
                      )}
                    </p>
                    <button
                      onClick={() => setShowDetails(!showDetails)}
                      className="text-g7-gold text-sm hover:underline flex items-center gap-1"
                    >
                      <Info className="h-3 w-3" />
                      {showDetails ? 'Show less' : 'Learn more'}
                    </button>
                  </div>
                </div>
              </div>

              {/* Preferences */}
              <div className="lg:w-auto">
                <div className="flex flex-wrap gap-2 mb-4">
                  <button
                    onClick={() =>
                      setPreferences({ ...preferences, functional: !preferences.functional })
                    }
                    className={cn(
                      'px-3 py-1.5 text-xs rounded-full border transition-all',
                      preferences.functional
                        ? 'bg-g7-gold text-g7-charcoal border-g7-gold'
                        : 'border-g7-gold/50 text-g7-ivory/70 hover:border-g7-gold'
                    )}
                  >
                    Functional
                  </button>
                  <button
                    onClick={() =>
                      setPreferences({ ...preferences, analytics: !preferences.analytics })
                    }
                    className={cn(
                      'px-3 py-1.5 text-xs rounded-full border transition-all',
                      preferences.analytics
                        ? 'bg-g7-gold text-g7-charcoal border-g7-gold'
                        : 'border-g7-gold/50 text-g7-ivory/70 hover:border-g7-gold'
                    )}
                  >
                    Analytics
                  </button>
                  <button
                    onClick={() =>
                      setPreferences({ ...preferences, marketing: !preferences.marketing })
                    }
                    className={cn(
                      'px-3 py-1.5 text-xs rounded-full border transition-all',
                      preferences.marketing
                        ? 'bg-g7-gold text-g7-charcoal border-g7-gold'
                        : 'border-g7-gold/50 text-g7-ivory/70 hover:border-g7-gold'
                    )}
                  >
                    Marketing
                  </button>
                </div>

                <div className="flex flex-col sm:flex-row gap-3">
                  <Button
                    onClick={handleRejectAll}
                    variant="outline"
                    className="flex-1 border-g7-gold/50 text-g7-ivory hover:bg-white/10"
                    size="sm"
                  >
                    Reject All
                  </Button>
                  <Button
                    onClick={handleAcceptSelected}
                    variant="outline"
                    className="flex-1 border-g7-gold text-g7-gold hover:bg-g7-gold hover:text-g7-charcoal"
                    size="sm"
                  >
                    Accept Selected
                  </Button>
                  <Button
                    onClick={handleAcceptAll}
                    className="flex-1 bg-g7-gold text-g7-charcoal hover:bg-g7-gold-light"
                    size="sm"
                  >
                    Accept All
                  </Button>
                </div>
              </div>

              {/* Close Button */}
              <button
                onClick={() => setShowBanner(false)}
                className="absolute top-4 right-4 text-g7-ivory/60 hover:text-g7-ivory transition-colors"
                aria-label="Close cookie banner"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
