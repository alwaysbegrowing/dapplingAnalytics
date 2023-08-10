import { useEffect } from 'react';
import { inject } from './generic';
import type { AnalyticsProps } from './types';

/**
 * Injects the dAppling Analytics script into the page head and starts tracking page views. Read more in our [documentation](https://docs.dappling.network).
 * @param [props] - Analytics options.
 * @param [props.debug] - Whether to enable debug logging in development. Defaults to `true`.
 * @param [props.beforeSend] - A middleware function to modify events before they are sent. Should return the event object or `null` to cancel the event.
 * @example
 * ```js
 * import { Analytics } from 'dappling-analytics';
 *
 * export default function App() {
 *  return (
 *   <div>
 *    <Analytics />
 *    <h1>My App</h1>
 *  </div>
 * );
 * }
 * ```
 */
function Analytics({ beforeSend, debug = true }: AnalyticsProps): null {
  useEffect(() => {
    inject({ beforeSend, debug });
  }, [beforeSend, debug]);

  return null;
}
export { Analytics };
export type { AnalyticsProps };

// eslint-disable-next-line import/no-default-export
export default {
  Analytics,
};
