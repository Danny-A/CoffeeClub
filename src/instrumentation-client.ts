import posthog from 'posthog-js';

posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY!, {
  api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST || 'https://app.posthog.com',
  capture_pageview: 'history_change',
  capture_pageleave: true, // Enable pageleave capture
  capture_exceptions: true, // This enables capturing exceptions using Error Tracking
  persistence: 'localStorage',
  debug: process.env.NODE_ENV === 'development',
  disable_session_recording: true,
  loaded: (posthog) => {},
});
