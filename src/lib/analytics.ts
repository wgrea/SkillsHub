// src/lib/analytics.ts
import { supabase } from './supabaseClient';
import type { AnalyticsEvent, EventData } from '../types/analytics';

const MAX_RETRY_ATTEMPTS = 3;
const RETRY_DELAY = 30000; // 30 seconds

const getSessionId = (): string => {
  try {
    let sessionId = sessionStorage.getItem('analytics_session_id');
    if (!sessionId) {
      sessionId = crypto.randomUUID();
      sessionStorage.setItem('analytics_session_id', sessionId);
    }
    return sessionId;
  } catch {
    return 'no-session';
  }
};

const enrichEventData = (data: EventData): EventData => ({
  ...data,
  timestamp: new Date().toISOString(),
  environment: import.meta.env.MODE,  // Changed from process.env.NODE_ENV
  url: typeof window !== 'undefined' ? window.location.pathname : '',
  user_agent: typeof navigator !== 'undefined' ? navigator.userAgent : '',
  session_id: getSessionId(),
  version: import.meta.env['VITE_APP_VERSION']
});

export const track = async (event: string, data: EventData = {}): Promise<void> => {
  const enrichedData = enrichEventData(data);

  // Development logging
  if (process.env['NODE_ENV'] === 'development') {
    console.groupCollapsed(`%c[Analytics] ${event}`, 'color: #4CAF50;');
    console.log('Payload:', enrichedData);
    console.groupEnd();
  }

  // Try both Supabase and window.analytics if available
  await Promise.all([
    trackToSupabase(event, enrichedData),
    trackToThirdParty(event, enrichedData)
  ]);
};

// Supabase-specific tracking
const trackToSupabase = async (event: string, data: EventData, attempt = 1): Promise<void> => {
  try {
    const { error } = await supabase
      .from('analytics_events')
      .insert({
        event_type: event,
        event_data: data,
        source: 'client'
      });

    if (error) throw error;
  } catch (error) {
    if (attempt < MAX_RETRY_ATTEMPTS) {
      setTimeout(() => trackToSupabase(event, data, attempt + 1), RETRY_DELAY);
    } else {
      queueLocalFallback(event, data);
    }
  }
};

// Third-party analytics integration
const trackToThirdParty = (event: string, data: EventData): void => {
  try {
    window.analytics?.track(event, data);
  } catch (error) {
    console.error('Third-party analytics error:', error);
  }
};

// Local storage queue system
const queueLocalFallback = (event: string, data: EventData): void => {
  try {
    if (typeof window === 'undefined') return;

    const queueStr = localStorage.getItem('analytics_queue');
    const queue: AnalyticsEvent[] = queueStr ? JSON.parse(queueStr) : [];
    
    queue.push({
      event,
      data,
      timestamp: new Date().toISOString()
    });

    localStorage.setItem('analytics_queue', JSON.stringify(queue));

    if (!window._analyticsRetryScheduled) {
      window._analyticsRetryScheduled = true;
      setTimeout(retryFailedEvents, 5 * 60 * 1000);
    }
  } catch (e) {
    console.error('Local analytics fallback failed:', e);
  }
};

const retryFailedEvents = async (): Promise<void> => {
  try {
    if (typeof window === 'undefined') return;

    const queueStr = localStorage.getItem('analytics_queue');
    if (!queueStr) return;

    const queue: AnalyticsEvent[] = JSON.parse(queueStr);
    if (queue.length === 0) return;

    const { error } = await supabase
      .from('analytics_events')
      .insert(queue.map(event => ({
        event_type: event.event,
        event_data: event.data,
        source: 'client_retry'
      })));

    if (!error) {
      localStorage.removeItem('analytics_queue');
    } else {
      console.warn("Bulk retry failed:", error);
    }
  } catch (e) {
    console.error("Retry system error:", e);
  } finally {
    if (typeof window !== 'undefined') {
      window._analyticsRetryScheduled = false;
    }
  }
};

// Main export function
export const trackEvent = async (event: string, data: EventData = {}): Promise<void> => {
  const enrichedData = enrichEventData(data);

  if (process.env['NODE_ENV'] === 'development') {
    console.groupCollapsed(`%c[Analytics] ${event}`, 'color: #4CAF50;');
    console.log('Payload:', enrichedData);
    console.groupEnd();
  }

  await Promise.all([
    trackToSupabase(event, enrichedData),
    trackToThirdParty(event, enrichedData)
  ]);
};

// Initialize retry system on load
if (typeof window !== 'undefined') {
  const initialQueue = localStorage.getItem('analytics_queue');
  if (initialQueue && JSON.parse(initialQueue).length > 0) {
    setTimeout(retryFailedEvents, 5000);
  }
}

// Event factories
export const AnalyticsEvents = {
  project: {
    interaction: (data: {
      interaction_type: string;
      element_id: string;
      project_id: string;
      difficulty?: string;
      skill_tags?: string[];
    }) => ({
      event: 'project_interaction',
      data
    })
  }
};

// Initialize retry system
if (typeof window !== 'undefined') {
  const initialQueue = localStorage.getItem('analytics_queue');
  if (initialQueue && JSON.parse(initialQueue).length > 0) {
    setTimeout(retryFailedEvents, 5000);
  }
}

