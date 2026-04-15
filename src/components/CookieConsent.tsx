import { useState, useEffect } from 'react';
import Link from 'next/link';
import LiquidGlass from './ui/liquid-glass';

const CookieConsent = () => {
  const [showConsent, setShowConsent] = useState(false);

  useEffect(() => {
    // Only check localStorage on the client side
    if (typeof window !== 'undefined') {
      const consent = localStorage.getItem('cookieConsent');
      if (!consent) {
        setShowConsent(true);
      }
    }
  }, []);

  const acceptCookies = () => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('cookieConsent', 'accepted');
      window.dispatchEvent(
        new CustomEvent('cookie-consent-updated', { detail: { accepted: true } })
      );
    }
    setShowConsent(false);
  };

  if (!showConsent) return null;

  return (
    <div className="fixed left-0 right-0 z-[60] p-3 pb-[calc(env(safe-area-inset-bottom)+12px)] bottom-[calc(env(safe-area-inset-bottom)+8px)] sm:bottom-4 sm:left-4 sm:right-auto sm:pb-3">
      <LiquidGlass 
        variant="modal" 
        intensity="medium" 
        rounded="2xl" 
        className="p-3 sm:p-4 shadow-2xl max-w-full sm:max-w-[320px]"
      >
        <p className="text-xs sm:text-sm text-gray-300 mb-3 sm:mb-4 text-left">
          This website uses cookies to enhance your experience.
        </p>
        <div className="flex flex-row justify-between items-center gap-3">
          <Link 
            href="/privacy-policy" 
            className="text-xs sm:text-sm text-blue-400 hover:text-blue-300 transition-colors"
          >
            Privacy Policy
          </Link>
          <LiquidGlass
            as="button"
            variant="button"
            rounded="lg"
            intensity="low"
            onClick={acceptCookies}
            className="px-3 py-1.5 sm:px-4 sm:py-2 text-blue-400 hover:text-blue-300 transition-all duration-200 text-xs sm:text-sm"
          >
            Accept
          </LiquidGlass>
        </div>
      </LiquidGlass>
    </div>
  );
};

export default CookieConsent;
