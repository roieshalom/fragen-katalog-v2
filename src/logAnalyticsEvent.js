// src/logAnalyticsEvent.js
import { analytics } from "./firebase";
import { logEvent } from "firebase/analytics";

export default function logAnalyticsEvent(eventName, eventParams = {}) {
  if (analytics) {
    logEvent(analytics, eventName, eventParams);
    console.log(`📊 Logged: ${eventName}`, eventParams);
  } else {
    console.warn(`⚠️ Analytics not initialized – could not log ${eventName}`);
  }
}
