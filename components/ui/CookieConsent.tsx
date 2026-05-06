"use client";

import { useState, useEffect } from "react";
import { Button } from "./Button";

export function CookieConsent() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Check if the user has already consented
    const consent = localStorage.getItem("zentrix_cookie_consent");
    if (!consent) {
      setIsVisible(true);
    }
  }, []);

  const handleAcceptAll = () => {
    localStorage.setItem("zentrix_cookie_consent", "all");
    setIsVisible(false);
    // Here you would trigger your analytics init functions
  };

  const handleNecessaryOnly = () => {
    localStorage.setItem("zentrix_cookie_consent", "necessary");
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4 animate-in slide-in-from-bottom-5">
      <div className="container mx-auto max-w-4xl bg-elevated/90 backdrop-blur-xl border border-border-subtle p-6 rounded-2xl shadow-[0_-10px_40px_rgba(0,0,0,0.5)] flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        
        <div className="flex-1 space-y-2">
          <h3 className="font-display font-bold text-xl text-white flex items-center gap-2">
            <span className="text-2xl">🍪</span> Privacy & Cookies
          </h3>
          <p className="text-text-secondary text-sm leading-relaxed">
            We use strictly necessary cookies to make our site work. We and our partners would also like to set optional cookies (analytics and personalization) to enhance your experience. Read our{" "}
            <a href="/legal/cookie-policy" className="text-accent-secondary hover:underline">
              Cookie Policy
            </a>{" "}
            for more details.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto shrink-0">
          <Button variant="ghost" onClick={handleNecessaryOnly}>
            Necessary Only
          </Button>
          <Button variant="primary" onClick={handleAcceptAll}>
            Accept All
          </Button>
        </div>
        
      </div>
    </div>
  );
}
