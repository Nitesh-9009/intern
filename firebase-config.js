/* =====================================================================
   Firebase config — fill these 6 values to turn ON live sync.
   Where to get them:
     1. Go to https://console.firebase.google.com  → create a project (free).
     2. Build → Realtime Database → Create Database → Start in TEST mode.
     3. Project settings (gear icon) → General → "Your apps" → Web app (</>) →
        register app → copy the config values below.
     4. Paste them here, save, and redeploy. Until databaseURL is filled,
        the app quietly falls back to the manual "share-code" method.

   Note: this is low-sensitivity data (only progress numbers). For basic
   privacy, in Realtime Database → Rules you can keep test mode, or lock it
   to just the "progress" node.
   ===================================================================== */
window.FIREBASE_CONFIG = {
  apiKey: "AIzaSyAhzYW-RgWHERSJyOk7KJpUIeLer2eja44",
  authDomain: "prep-tracker-4b2eb.firebaseapp.com",
  databaseURL: "https://prep-tracker-4b2eb-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "prep-tracker-4b2eb",
  storageBucket: "prep-tracker-4b2eb.firebasestorage.app",
  messagingSenderId: "812121478287",
  appId: "1:812121478287:web:b1699c6215eea8e1eb8cfa",
  measurementId: "G-KPZFTH676Z"
};
