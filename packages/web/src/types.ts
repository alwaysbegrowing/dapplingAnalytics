interface PageViewEvent {
  type: 'pageview';
  url: string;
}
interface CustomEvent {
  type: 'event';
  url: string;
}

export type BeforeSendEvent = PageViewEvent | CustomEvent;

export type AllowedPropertyValues = string | number | boolean | null;

export type BeforeSend = (event: BeforeSendEvent) => BeforeSendEvent | null;
export interface AnalyticsProps {
  beforeSend?: BeforeSend;
  debug?: boolean;
}
declare global {
  interface Window {
    // Base interface
    va?: (event: 'beforeSend' | 'event', properties?: unknown) => void;
    // Queue for actions, before the library is loaded
    vaq?: [string, unknown?][];
    vai?: boolean;
  }
}
