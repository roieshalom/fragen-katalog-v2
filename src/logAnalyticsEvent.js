// src/logAnalyticsEvent.js
import { getAnalyticsInstance } from "./firebase";
import { logEvent } from "firebase/analytics";

export default function logAnalyticsEvent(eventName, eventParams = {}) {
  getAnalyticsInstance().then((analytics) => {
    if (analytics) {
      logEvent(analytics, eventName, eventParams);
      console.log(`📊 Logged: ${eventName}`, eventParams);
    } else {
      console.warn(`⚠️ Analytics not initialized – could not log ${eventName}`);
    }
  });
}
