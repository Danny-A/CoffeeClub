import posthog from 'posthog-js';

posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY!, {
  api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST || 'https://app.posthog.com',
  capture_pageview: 'history_change',
  capture_pageleave: true, // Enable pageleave capture
  capture_exceptions: true, // This enables capturing exceptions using Error Tracking
  disable_persistence: true, // Disable all persistence (cookies, localStorage, etc.)
  disable_session_recording: true,
  autocapture: false, // Disable autocapture as it can be privacy-invasive
  loaded: (posthog) => {
    const sessionId = crypto.randomUUID();
    posthog.identify(sessionId, {
      session_start: new Date().toISOString(),
      is_anonymous: true,
    });
  },
});
