// src/types/analytics.d.ts
export type EventData = Record<string, unknown> & {
  environment?: string;
  url?: string;
  user_agent?: string;
  session_id?: string;
  version?: string;
};

export interface AnalyticsEvent {
  event: string;
  data: EventData;
  timestamp: string;
}

declare global {
  interface Window {
    _analyticsRetryScheduled?: boolean;
    analytics?: {
      track: (event: string, data: EventData) => void;
    };
  }
}