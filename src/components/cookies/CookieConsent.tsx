'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Cookie, Check, Info } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

/**
 * G7 Hotels Cookie Consent Banner
 * GDPR/CCPA compliant cookie consent management
 */

interface CookieConsentProps {
  position?: 'bottom' | 'top';
  variant?: 'default' | 'compact' | 'detailed';
}

type ConsentLevel = 'essential' | 'functional' | 'analytics' | 'marketing';

export function CookieConsent({
  position = 'bottom',
  variant = 'default',
}: CookieConsentProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [consents, setConsents] = useState<Record<ConsentLevel, boolean>>({
    essential: true,
    functional: false,
    analytics: false,
    marketing: false,
  });
  const [hasConsented, setHasConsented] = useState(false);

  useEffect(() => {
    // Check if user has already consented
    const savedConsent = localStorage.getItem('cookie-consent');
    if (savedConsent) {
      setHasConsented(true);
      setConsents(JSON.parse(savedConsent));
    } else {
      // Show banner after a short delay
      const timer = setTimeout(() => {
        setIsOpen(true);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAcceptAll = () => {
    const newConsents: Record<ConsentLevel, boolean> = {
      essential: true,
      functional: true,
      analytics: true,
      marketing: true,
    };
    setConsents(newConsents);
    saveConsent(newConsents);
    setIsOpen(false);
  };

  const handleAcceptSelected = () => {
    saveConsent(consents);
    setIsOpen(false);
  };

  const handleRejectAll = () => {
    const newConsents: Record<ConsentLevel, boolean> = {
      essential: true,
      functional: false,
      analytics: false,
      marketing: false,
    };
    setConsents(newConsents);
    saveConsent(newConsents);
    setIsOpen(false);
  };

  const saveConsent = (consentSettings: Record<ConsentLevel, boolean>) => {
    localStorage.setItem('cookie-consent', JSON.stringify(consentSettings));
    localStorage.setItem('cookie-consent-date', new Date().toISOString());
    setHasConsented(true);
    
    // Here you would typically trigger analytics/consent management
    // Example: window.dataLayer.push({ event: 'consent_update', ...consentSettings });
  };

  const toggleConsent = (level: ConsentLevel) => {
    if (level === 'essential') return; // Essential cookies cannot be disabled
    setConsents((prev) => ({
      ...prev,
      [level]: !prev[level],
    }));
  };

  const handleManagePreferences = () => {
    setShowDetails(!showDetails);
  };

  if (!isOpen || hasConsented) {
    return null;
  }

  const cookieTypes = [
    {
      id: 'essential' as ConsentLevel,
      name: 'Essential Cookies',
      description: 'Required for basic site functionality and security.',
      required: true,
    },
    {
      id: 'functional' as ConsentLevel,
      name: 'Functional Cookies',
      description: 'Enable enhanced features like booking widgets and live chat.',
      required: false,
    },
    {
      id: 'analytics' as ConsentLevel,
      name: 'Analytics Cookies',
      description: 'Help us improve our website by collecting anonymous usage data.',
      required: false,
    },
    {
      id: 'marketing' as ConsentLevel,
      name: 'Marketing Cookies',
      description: 'Used to deliver relevant advertisements and track marketing campaigns.',
      required: false,
    },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: position === 'bottom' ? 100 : -100 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: position === 'bottom' ? 100 : -100 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className={`fixed ${position === 'bottom' ? 'bottom-0' : 'top-0'} left-0 right-0 z-50 p-4 bg-g7-charcoal/95 backdrop-blur-md border-t ${position === 'top' ? 'border-b' : 'border-t'} border-g7-gold/20`}
        >
          <div className="container mx-auto max-w-6xl">
            {variant === 'compact' ? (
              /* Compact Variant */
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <Cookie className="h-6 w-6 text-g7-gold flex-shrink-0" />
                  <p className="text-g7-ivory text-sm">
                    We use cookies to enhance your experience. By continuing, you agree to our{' '}
                    <a href="/cookies" className="text-g7-gold hover:underline">
                      Cookie Policy
                    </a>
                    .
                  </p>
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleManagePreferences}
                    className="border-g7-gold/50 text-g7-ivory hover:bg-g7-gold/20"
                  >
                    Preferences
                  </Button>
                  <Button
                    size="sm"
                    onClick={handleAcceptAll}
                    className="bg-g7-gold text-g7-charcoal hover:bg-g7-gold-light"
                  >
                    Accept All
                  </Button>
                </div>
              </div>
            ) : (
              /* Default/Detailed Variant */
              <div className="bg-g7-charcoal rounded-lg p-6 md:p-8">
                <div className="flex items-start justify-between gap-4 mb-4">
                  <div className="flex items-start gap-3">
                    <div className="w-12 h-12 rounded-full bg-g7-gold/20 flex items-center justify-center flex-shrink-0">
                      <Cookie className="h-6 w-6 text-g7-gold" />
                    </div>
                    <div>
                      <h3 className="font-serif text-xl text-g7-ivory mb-2">
                        Cookie Preferences
                      </h3>
                      <p className="text-g7-ivory/70 text-sm max-w-2xl">
                        We use cookies to enhance your experience, analyze site usage, and assist in our marketing efforts. 
                        You can customize your cookie preferences below.
                      </p>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setIsOpen(false)}
                    className="text-g7-ivory/60 hover:text-g7-ivory hover:bg-g7-ivory/10"
                  >
                    <X className="h-5 w-5" />
                  </Button>
                </div>

                {showDetails && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="mb-6 space-y-4"
                  >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {cookieTypes.map((cookie) => (
                        <div
                          key={cookie.id}
                          className="p-4 bg-g7-charcoal-light rounded-lg border border-g7-gold/10"
                        >
                          <div className="flex items-start justify-between gap-3">
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-1">
                                <h4 className="font-medium text-g7-ivory">{cookie.name}</h4>
                                {cookie.required && (
                                  <Badge variant="outline" className="border-g7-gold/50 text-g7-gold text-xs">
                                    Required
                                  </Badge>
                                )}
                              </div>
                              <p className="text-g7-ivory/60 text-sm">{cookie.description}</p>
                            </div>
                            <button
                              onClick={() => toggleConsent(cookie.id)}
                              disabled={cookie.required}
                              className={cn(
                                'relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-g7-gold focus:ring-offset-2 focus:ring-offset-g7-charcoal',
                                consents[cookie.id]
                                  ? 'bg-g7-gold border-g7-gold'
                                  : 'bg-g7-charcoal border-g7-ivory/30',
                                cookie.required && 'opacity-50 cursor-not-allowed'
                              )}
                            >
                              <span
                                aria-hidden="true"
                                className={cn(
                                  'pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out',
                                  consents[cookie.id] ? 'translate-x-5' : 'translate-x-0'
                                )}
                              />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                    <p className="text-xs text-g7-ivory/50">
                      <Info className="inline h-3 w-3 mr-1" />
                      Essential cookies cannot be disabled as they are required for basic site functionality.
                    </p>
                  </motion.div>
                )}

                <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-g7-gold/20">
                  <div className="flex items-center gap-4 text-sm text-g7-ivory/60">
                    <a href="/privacy" className="hover:text-g7-gold transition-colors">
                      Privacy Policy
                    </a>
                    <span>•</span>
                    <a href="/cookies" className="hover:text-g7-gold transition-colors">
                      Cookie Policy
                    </a>
                  </div>
                  
                  <div className="flex flex-wrap gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={handleRejectAll}
                      className="border-g7-gold/50 text-g7-ivory hover:bg-g7-gold/20"
                    >
                      Reject All
                    </Button>
                    {!showDetails && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={handleManagePreferences}
                        className="border-g7-gold/50 text-g7-ivory hover:bg-g7-gold/20"
                      >
                        Customize
                      </Button>
                    )}
                    {showDetails && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={handleAcceptSelected}
                        className="border-g7-gold/50 text-g7-ivory hover:bg-g7-gold/20"
                      >
                        Save Preferences
                      </Button>
                    )}
                    <Button
                      size="sm"
                      onClick={handleAcceptAll}
                      className="bg-g7-gold text-g7-charcoal hover:bg-g7-gold-light"
                    >
                      Accept All
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/**
 * Cookie Consent Trigger Button
 * Shows in footer or settings for managing consent later
 */
export function CookieConsentTrigger() {
  const [isOpen, setIsOpen] = useState(false);

  const handleManageCookies = () => {
    // Clear saved consent to show banner again
    localStorage.removeItem('cookie-consent');
    // Reload page to trigger banner
    window.location.reload();
  };

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={handleManageCookies}
      className="text-g7-ivory/60 hover:text-g7-gold"
    >
      <Cookie className="h-4 w-4 mr-2" />
      Manage Cookies
    </Button>
  );
}
