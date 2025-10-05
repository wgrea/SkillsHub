// src/lib/analytics-events.ts

// Base properties that all events share
interface BaseEventProperties {
  user_id?: string;
  session_id: string | null; // Allow null
  timestamp?: number;
  device_id?: string;
  platform?: 'web' | 'mobile';
  location?: string;
  ip_address?: string;
}

// Event-specific property groups
interface AuthSignupEvent {
  event_type: 'auth:signup';
  signup_method: 'email' | 'google' | 'github';
  is_first_session: boolean;
}

interface AuthLoginEvent {
  event_type: 'auth:login';
  login_method: 'email' | 'social';
  session_duration_previous?: number;
}

interface AuthSessionRecoveredEvent {
  event_type: 'auth:session_recovered';
  recovery_method: 'token' | 'refresh';
  downtime_minutes: number;
}

interface ProjectViewEvent {
  event_type: 'project:view';
  project_id: string;
  difficulty?: 'beginner' | 'intermediate' | 'advanced';
  technology?: string[];
}

interface ProjectInteractionEvent {
  event_type: 'project:interaction';
  interaction_type: 'click' | 'save' | 'share' | 'hover' | 'unsave'; // Add missing types
  element_id: string;
  project_id: string;
}

interface ErrorOccurredEvent {
  event_type: 'error:occurred';
  severity: 'warning' | 'error' | 'critical';
  error_code: string;
  error_message: string;
  stack_trace?: string;
}

// Union of all possible event types
export type AnalyticsEvent = BaseEventProperties & (
  | AuthSignupEvent
  | AuthLoginEvent
  | AuthSessionRecoveredEvent
  | ProjectViewEvent
  | ProjectInteractionEvent
  | ErrorOccurredEvent
);

// Type helper to extract event-specific properties
type EventProperties<T extends AnalyticsEvent['event_type']> = Omit<
  Extract<AnalyticsEvent, { event_type: T }>, 
  keyof BaseEventProperties | 'event_type'
>;

// Strongly-typed event builder
export const createEventBuilder = <T extends AnalyticsEvent['event_type']>(type: T) => {
  return (
    properties: EventProperties<T>,
    baseProperties: BaseEventProperties
  ): AnalyticsEvent => {
    const event = {
      ...baseProperties,
      event_type: type,
      timestamp: Date.now(),
      ...properties,
    };

    // Optional type guard for validation
    function isAnalyticsEvent(event: any): event is AnalyticsEvent {
      if (!event || typeof event !== 'object') return false;

      if (!event.event_type || !event.session_id) return false;

      // Additional validation for known event types
      switch (event.event_type) {
        case 'project:view':
          return !!event.project_id;
        case 'project:interaction':
          return !!event.project_id && !!event.element_id && !!event.interaction_type;
        case 'auth:signup':
          return !!event.signup_method && typeof event.is_first_session === 'boolean';
        case 'error:occurred':
          return !!event.severity && !!event.error_code && !!event.error_message;
        default:
          return true; // Allow other events to pass basic validation
      }
    }

    // Validate the event
    if (!isAnalyticsEvent(event)) {
      throw new Error('Constructed event does not match AnalyticsEvent type');
    }

    return event; // Return the constructed event
  };
};

// Pre-built event creators
export const AnalyticsEvents = {
  auth: {
    signup: createEventBuilder('auth:signup'),
    login: createEventBuilder('auth:login'),
    sessionRecovered: createEventBuilder('auth:session_recovered'),
  },
  project: {
    view: createEventBuilder('project:view'),
    interaction: createEventBuilder('project:interaction'),
  },
  error: {
    occurred: createEventBuilder('error:occurred'),
  },
};