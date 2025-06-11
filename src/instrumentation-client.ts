import posthog from 'posthog-js';

posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY!, {
  api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST || 'https://app.posthog.com',
  capture_pageview: 'history_change',
  capture_pageleave: true, // Enable pageleave capture
  capture_exceptions: true, // This enables capturing exceptions using Error Tracking
  debug: process.env.NODE_ENV === 'development',
  persistence: 'localStorage', // Use localStorage instead of cookies
  disable_session_recording: true, // Disable session recording as it requires cookies
  autocapture: false, // Disable autocapture as it can be privacy-invasive
  loaded: (posthog) => {
    // Set a random distinct ID for each session
    if (!posthog.isFeatureEnabled('disable-cookieless')) {
      posthog.opt_out_capturing();
    }
  },
});
