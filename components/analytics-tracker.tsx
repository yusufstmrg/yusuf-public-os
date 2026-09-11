"use client";

import { useEffect } from "react";

function getId(key: string) {
  const storage = window.sessionStorage;
  const existing = storage.getItem(key);
  if (existing) return existing;
  const value = crypto.randomUUID();
  storage.setItem(key, value);
  return value;
}

function getDeviceType() {
  return window.innerWidth < 768 ? "mobile" : window.innerWidth < 1200 ? "tablet" : "desktop";
}

export function AnalyticsTracker() {
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const payload = {
      eventName: "page_view",
      path: window.location.pathname,
      referrer: document.referrer || null,
      utmSource: params.get("utm_source"),
      utmMedium: params.get("utm_medium"),
      utmCampaign: params.get("utm_campaign"),
      sessionId: getId("yusuf-analytics-session"),
      visitorId: getId("yusuf-analytics-visitor"),
      deviceType: getDeviceType(),
      browser: navigator.userAgent.slice(0, 240),
      os: navigator.platform.slice(0, 120),
    };

    void fetch("/api/analytics", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(payload),
      keepalive: true,
    }).catch(() => undefined);
  }, []);

  return null;
}
