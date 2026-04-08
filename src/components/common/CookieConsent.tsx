'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Cookie, Settings, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';

/**
 * G7 Hotels Cookie Consent Banner
 * GDPR/CCPA compliant cookie consent management
 */

interface CookiePreferences {
  necessary: boolean;
  analytics: boolean;
  marketing: boolean;
  functional: boolean;
}

const defaultPreferences: CookiePreferences = {
  necessary: true,
  analytics: false,
  marketing: false,
  functional: false,
};

export function CookieConsent() {
  const [showBanner, setShowBanner] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [preferences, setPreferences] = useState<CookiePreferences>(defaultPreferences);
  const [hasConsented, setHasConsented] = useState(false);

  useEffect(() => {
    // Check if user has already consented
    const consent = localStorage.getItem('cookieConsent');
    if (!consent) {
      setShowBanner(true);
    } else {
      setHasConsented(true);
      setPreferences(JSON.parse(consent));
    }
  }, []);

  const handleAcceptAll = () => {
    const allPreferences: CookiePreferences = {
      necessary: true,
      analytics: true,
      marketing: true,
      functional: true,
    };
    setPreferences(allPreferences);
    savePreferences(allPreferences);
    setShowBanner(false);
  };

  const handleAcceptSelected = () => {
    savePreferences(preferences);
    setShowBanner(false);
  };

  const handleRejectAll = () => {
    const minimalPreferences: CookiePreferences = {
      necessary: true,
      analytics: false,
      marketing: false,
      functional: false,
    };
    setPreferences(minimalPreferences);
    savePreferences(minimalPreferences);
    setShowBanner(false);
  };

  const savePreferences = (prefs: CookiePreferences) => {
    localStorage.setItem('cookieConsent', JSON.stringify(prefs));
    setHasConsented(true);
    
    // Here you would typically initialize analytics/cookies based on preferences
    if (prefs.analytics) {
      // Initialize analytics
      console.log('Analytics enabled');
    }
    if (prefs.marketing) {
      // Initialize marketing cookies
      console.log('Marketing cookies enabled');
    }
  };

  const togglePreference = (key: keyof CookiePreferences) => {
    if (key === 'necessary') return; // Cannot disable necessary cookies
    setPreferences((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  if (!showBanner) {
    return null;
  }

  return (
    <AnimatePresence>
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 100, opacity: 0 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className="fixed bottom-0 left-0 right-0 z-50 bg-g7-charcoal text-g7-ivory shadow-2xl"
      >
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
            {/* Message */}
            <div className="flex items-start gap-4 lg:max-w-2xl">
              <div className="w-12 h-12 bg-g7-gold/20 rounded-full flex items-center justify-center flex-shrink-0">
                <Cookie className="h-6 w-6 text-g7-gold" />
              </div>
              <div>
                <h3 className="font-serif text-xl mb-2">We Value Your Privacy</h3>
                <p className="text-g7-ivory/80 text-sm leading-relaxed">
                  We use cookies and similar technologies to enhance your experience, analyze usage, and assist in our marketing efforts. 
                  By clicking "Accept All", you consent to our use of cookies. Learn more in our{' '}
                  <a
                    href="/privacy"
                    className="text-g7-gold hover:text-g7-gold-light underline"
                  >
                    Privacy Policy
                  </a>{' '}
                  and{' '}
                  <a
                    href="/cookies"
                    className="text-g7-gold hover:text-g7-gold-light underline"
                  >
                    Cookie Policy
                  </a>.
                </p>
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              {!showSettings ? (
                <>
                  <Button
                    variant="outline"
                    onClick={() => setShowSettings(true)}
                    className="border-g7-gold/50 text-g7-ivory hover:bg-g7-gold hover:text-g7-charcoal"
                  >
                    <Settings className="h-4 w-4 mr-2" />
                    Customize
                  </Button>
                  <Button
                    variant="outline"
                    onClick={handleRejectAll}
                    className="border-g7-gold/50 text-g7-ivory hover:bg-g7-gold hover:text-g7-charcoal"
                  >
                    Reject All
                  </Button>
                  <Button
                    onClick={handleAcceptAll}
                    className="bg-g7-gold text-g7-charcoal hover:bg-g7-gold-light"
                  >
                    Accept All
                  </Button>
                </>
              ) : (
                <>
                  <Button
                    variant="outline"
                    onClick={() => setShowSettings(false)}
                    className="border-g7-gold/50 text-g7-ivory hover:bg-g7-gold hover:text-g7-charcol"
                  >
                    Back
                  </Button>
                  <Button
                    onClick={handleAcceptSelected}
                    className="bg-g7-gold text-g7-charcoal hover:bg-g7-gold-light"
                  >
                    Save Preferences
                  </Button>
                </>
              )}
            </div>
          </div>

          {/* Settings Panel */}
          <AnimatePresence>
            {showSettings && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="overflow-hidden"
              >
                <div className="mt-6 pt-6 border-t border-g7-gold/20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {/* Necessary */}
                  <div className="flex items-start gap-3">
                    <Checkbox
                      id="necessary"
                      checked={preferences.necessary}
                      disabled
                      className="mt-1 border-g7-gold/50 data-[state=checked]:bg-g7-gold"
                    />
                    <div className="flex-1">
                      <label
                        htmlFor="necessary"
                        className="font-medium text-g7-gold cursor-pointer"
                      >
                        Strictly Necessary
                      </label>
                      <p className="text-xs text-g7-ivory/60 mt-1">
                        Required for the site to function properly
                      </p>
                    </div>
                  </div>

                  {/* Analytics */}
                  <div className="flex items-start gap-3">
                    <Checkbox
                      id="analytics"
                      checked={preferences.analytics}
                      onCheckedChange={() => togglePreference('analytics')}
                      className="mt-1 border-g7-gold/50 data-[state=checked]:bg-g7-gold"
                    />
                    <div className="flex-1">
                      <label
                        htmlFor="analytics"
                        className="font-medium text-g7-ivory cursor-pointer hover:text-g7-gold"
                      >
                        Analytics
                      </label>
                      <p className="text-xs text-g7-ivory/60 mt-1">
                        Help us understand how you use our site
                      </p>
                    </div>
                  </div>

                  {/* Marketing */}
                  <div className="flex items-start gap-3">
                    <Checkbox
                      id="marketing"
                      checked={preferences.marketing}
                      onCheckedChange={() => togglePreference('marketing')}
                      className="mt-1 border-g7-gold/50 data-[state=checked]:bg-g7-gold"
                    />
                    <div className="flex-1">
                      <label
                        htmlFor="marketing"
                        className="font-medium text-g7-ivory cursor-pointer hover:text-g7-gold"
                      >
                        Marketing
                      </label>
                      <p className="text-xs text-g7-ivory/60 mt-1">
                        Used for advertising and personalization
                      </p>
                    </div>
                  </div>

                  {/* Functional */}
                  <div className="flex items-start gap-3">
                    <Checkbox
                      id="functional"
                      checked={preferences.functional}
                      onCheckedChange={() => togglePreference('functional')}
                      className="mt-1 border-g7-gold/50 data-[state=checked]:bg-g7-gold"
                    />
                    <div className="flex-1">
                      <label
                        htmlFor="functional"
                        className="font-medium text-g7-ivory cursor-pointer hover:text-g7-gold"
                      >
                        Functional
                      </label>
                      <p className="text-xs text-g7-ivory/60 mt-1">
                        Enable enhanced features and functionality
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}

/**
 * Cookie Settings Button (for footer/settings page)
 */
export function CookieSettingsButton() {
  const [showSettings, setShowSettings] = useState(false);
  const [preferences, setPreferences] = useState<CookiePreferences>(defaultPreferences);

  useEffect(() => {
    const consent = localStorage.getItem('cookieConsent');
    if (consent) {
      setPreferences(JSON.parse(consent));
    }
  }, []);

  const handleSave = () => {
    localStorage.setItem('cookieConsent', JSON.stringify(preferences));
    setShowSettings(false);
    // Reload page to apply changes
    window.location.reload();
  };

  return (
    <>
      <Button
        variant="ghost"
        size="icon"
        onClick={() => setShowSettings(true)}
        className="text-g7-ivory/70 hover:text-g7-gold"
      >
        <Settings className="h-5 w-5" />
      </Button>

      {showSettings && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white rounded-lg p-6 max-w-md w-full"
          >
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-g7-gold/20 rounded-full flex items-center justify-center">
                  <Shield className="h-5 w-5 text-g7-gold" />
                </div>
                <h3 className="font-serif text-xl text-g7-charcoal">Cookie Preferences</h3>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setShowSettings(false)}
              >
                <X className="h-5 w-5" />
              </Button>
            </div>

            <div className="space-y-4 mb-6">
              {Object.entries({
                necessary: 'Strictly Necessary',
                analytics: 'Analytics',
                marketing: 'Marketing',
                functional: 'Functional',
              }).map(([key, label]) => (
                <div key={key} className="flex items-center justify-between">
                  <span className="text-g7-charcoal">{label}</span>
                  <Checkbox
                    checked={preferences[key as keyof CookiePreferences]}
                    disabled={key === 'necessary'}
                    onCheckedChange={() => {
                      if (key !== 'necessary') {
                        setPreferences((prev) => ({
                          ...prev,
                          [key]: !prev[key as keyof CookiePreferences],
                        }));
                      }
                    }}
                    className="border-g7-gold/50 data-[state=checked]:bg-g7-gold"
                  />
                </div>
              ))}
            </div>

            <div className="flex gap-3">
              <Button
                variant="outline"
                onClick={() => setShowSettings(false)}
                className="flex-1"
              >
                Cancel
              </Button>
              <Button onClick={handleSave} className="flex-1 bg-g7-gold text-g7-charcoal">
                Save Changes
              </Button>
            </div>
          </motion.div>
        </div>
      )}
    </>
  );
}
