import { name as packageName, version } from '../package.json';
import type { AnalyticsProps } from './types';
import { isBrowser } from './utils';

/**
 * Injects the dAppling Analytics script into the page head and starts tracking page views. Read more in our [documentation](https://docs.dappling.network).
 * @param [props] - Analytics options.
 * @param [props.mode] - The mode to use for the analytics script. Defaults to `auto`.
 *  - `auto` - Automatically detect the environment.  Uses `production` if the environment cannot be determined.
 *  - `production` - Always use the production script. (Sends events to the server)
 *  - `development` - Always use the development script. (Logs events to the console)
 * @param [props.debug] - Whether to enable debug logging in development. Defaults to `true`.
 * @param [props.beforeSend] - A middleware function to modify events before they are sent. Should return the event object or `null` to cancel the event.
 */
export function inject(
  props: AnalyticsProps = {
    debug: true,
  },
): void {
  if (!isBrowser()) return;

  if (props.beforeSend) {
    window.va?.('beforeSend', props.beforeSend);
  }

  const script = document.createElement('script');
  // script.src = src;
  script.text = `'use strict';
  !(function () {
    let e = (e) => e,
        t = document.currentScript,
        n = (null == t ? void 0 : t.dataset.endpoint) || (null != t ? "https://www.dappling.network/api/db" : "https://www.dappling.network/api/db");
      
    async function i({ type: i, data: o, options: a }) {
      var r, l;
      let d = location.href,
        u = document.referrer,
        c = e({
          type: i,
          url: d,
        });
  
      if (!1 === c || null === c) return;
  
      c && (d = c.url);
      let s = u.includes(location.host),
        f = {
          o: d,
          sv: '0.1.2',
          sdkn:
            null != (r = null == t ? void 0 : t.getAttribute('data-sdkn'))
              ? r
              : void 0,
          sdkv:
            null != (l = null == t ? void 0 : t.getAttribute('data-sdkv'))
              ? l
              : void 0,
          ts: Date.now(),
          ...(null != a && a.withReferrer && !s ? { r: u } : {}),
          ...('event' === i &&
            o && {
              en: o.name,
              ed: o.data,
            }),
        };
  
      try {
        await fetch(\`\${n}/\${'pageview' === i ? 'view' : 'event'}\`, {
          method: 'POST',
          keepalive: true,
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(f),
        });
      } catch (h) {}
    }
  
    async function o(e = {}) {
      return i({
        type: 'pageview',
        options: {
          withReferrer: e.withReferrer,
        },
      });
    }
  
    async function a(e, t) {
      return i({
        type: 'event',
        data: {
          name: e,
          data: t,
        },
        options: {
          withReferrer: true,
        },
      });
    }
  
    function r(e) {
      return e.pathname === new URL(d).pathname;
    }
  
    function l(e) {
      let t = e
        ? typeof e === 'string'
          ? new URL(e, location.origin)
          : new URL(e.href)
        : null;
      !t || r(t) || (Boolean(t.hash) && r(t)) || o();
    }
  
    let d = location.href,
      u = () => {
        var t;
        window.va = function (t, n) {
          'beforeSend' === t ? (e = n) : 'event' === t && n && a(n.name, n.data);
        };
        null == (t = window.vaq) ||
          t.forEach(([e, t]) => {
            window.va(e, t);
          });
      };
  
    (() => {
      if (window.vai) return;
      window.vai = true;
      u();
      o({ withReferrer: true });
  
      let e = history.pushState.bind(history);
      history.pushState = function (...t) {
        e(...t);
        l(t[2]);
        d = location.href;
      };
  
      window.addEventListener('popstate', function () {
        l(location.href);
        d = location.href;
      });
    })();
  })();`;

  document.head.appendChild(script);

  script.defer = true;
  script.setAttribute('data-sdkn', packageName);
  script.setAttribute('data-sdkv', version);

  script.onerror = (): void => {
    const errorMessage =
      'Error - double check that your configs are correct and reach out to the dAppling dev team if you need help :)';

    // eslint-disable-next-line no-console
    console.log(`[dAppling Analytics] Failed to load script. ${errorMessage}`);
  };

  if (props.debug === false) {
    script.setAttribute('data-debug', 'false');
  }

  document.head.appendChild(script);
}

// eslint-disable-next-line import/no-default-export
export default {
  inject,
};
