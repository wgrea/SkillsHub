// src/lib/analytics/client.ts

import { createContext, useContext, ReactNode } from 'react';
import { trackEvent } from '@/lib/analytics'; // Reference your analytics instance

type AnalyticsContextType = {
  track: (event: string, properties?: Record<string, unknown>) => void;
};

export const AnalyticsContext = createContext<AnalyticsContextType | undefined>(undefined);

export const AnalyticsProvider = ({ children }: { children: ReactNode }) => {
  const track = (event: string, properties?: Record<string, unknown>) => {
    trackEvent(event, properties);
  };

  return (
    <AnalyticsContext.Provider value={{ track }}>
      {children}
    </AnalyticsContext.Provider>
  );
};

export const useAnalytics = () => {
  const context = useContext(AnalyticsContext);
  if (!context) {
    console.warn('AnalyticsProvider missing, event not tracked.');
    return { track: () => {} }; // Prevent runtime errors
  }
  return context;
};
