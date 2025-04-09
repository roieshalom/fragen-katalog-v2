// src/logAnalyticsEvent.js
import { getAnalyticsInstance } from "./firebase";
import { logEvent } from "firebase/analytics";

// Usage: wrap logging like this
export const logCustomEvent = (eventName, params = {}) => {
  getAnalyticsInstance().then((analytics) => {
    if (analytics) {
      logEvent(analytics, eventName, params);
    }
  });
};
import { logEvent } from "firebase/analytics";

export default function logAnalyticsEvent(eventName, eventParams = {}) {
  if (analytics) {
    logEvent(analytics, eventName, eventParams);
    console.log(`📊 Logged: ${eventName}`, eventParams);
  } else {
    console.warn(`⚠️ Analytics not initialized – could not log ${eventName}`);
  }
}
