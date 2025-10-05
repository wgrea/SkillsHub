// src/lib/analytics/client.ts
import * as SegmentAnalytics from '@segment/analytics-next';

export const analytics = SegmentAnalytics.AnalyticsBrowser.load({
  writeKey: process.env['NEXT_PUBLIC_SEGMENT_KEY'] || 'dev',
});

export type AnalyticsEvent = {
  event: string;
  properties?: Record<string, unknown>;
};