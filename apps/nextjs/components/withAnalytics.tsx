import React from 'react';
import { Analytics, AnalyticsProps } from 'dappling-analytics/react';

export function withAnalytics<P extends Omit<AnalyticsProps, 'mode'>>(
  Component: React.ComponentType,
  props?: P,
) {
  function WithAnalytics(props?: P) {
    return (
      <>
        <Analytics {...props} />
        <Component />
      </>
    );
  }

  return () => WithAnalytics(props);
}
