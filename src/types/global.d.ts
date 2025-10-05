// src/types/global.d.ts
import { SupabaseClient } from '@supabase/supabase-js';
import 'react';

declare global {
  interface Window {
    supabase: SupabaseClient;
    _analyticsRetryScheduled?: boolean;
    analytics?: {
      track: (event: string, data: Analytics.EventData) => void;
    };
    // Mobile-specific extensions
    visualViewport?: {
      width: number;
      height: number;
      scale: number;
    };
    // Touch event extensions
    TouchEvent: TouchEvent;
  }

  // CSS Custom Properties support
  interface CSSStyleDeclaration {
    '--viewport-height'?: string;
    '--touch-target-size'?: string;
  }

  namespace Analytics {
    type EventData = Record<string, unknown> & {
      environment?: string;
      url?: string;
      user_agent?: string;
      session_id?: string;
      version?: string;
      // Mobile-specific analytics
      device_type?: 'mobile' | 'tablet' | 'desktop';
      viewport_width?: number;
      viewport_height?: number;
      pixel_ratio?: number;
      touch_supported?: boolean;
    };

    interface Event {
      event: string;
      data: EventData;
      timestamp: string;
    }
  }

  // React extensions for CSS custom properties
  namespace React {
    interface CSSProperties {
      '--viewport-height'?: string;
      '--touch-target-size'?: string;
      // Add other custom properties as needed
    }
  }
}

export {}; // Prevents TypeScript from treating this file as a module