# Folkpresso Developer & Admin Guide

This guide covers the latest enhancements and setup requirements for the Folkpresso ecosystem.

## 📱 Android APK & Google Login Setup
To enable Google Login within the Android APK, you must add your development environment's **SHA-1 Fingerprint** to the Firebase Console:

1. **Get SHA-1**:
   - Open terminal in your project root.
   - Run: `./gradlew signingReport` (if using Cordova/Capacitor) or use Keytool.
2. **Add to Firebase**:
   - Go to [Firebase Console](https://console.firebase.google.com/).
   - Project Settings > Your Apps > Android.
   - Click "Add Fingerprint" and paste your SHA-1.
3. **Download Config**:
   - Re-download `google-services.json` and replace the one in your Android project.

## 🛠️ Admin Dashboard Features

### 1. Point Hub Control
- **Mass Point Reset**: Found in the Points menu. Inserting a reset will clear points for **all users** the next time they open the application. This is synchronized via Supabase.
- **Expiry Days**: Set the duration after which points should be considered expired (UI feedback).

### 2. Banner Management
- Use the **Menu > Banners** section to manage the carousel on the Landing Page and User App.
- Images can be uploaded or linked directly.

### 3. Store Status
- **Auto Mode**: The store will open and close automatically based on the schedule you set.
- **Manual Mode**: Overrides the schedule to keep the store Open/Closed regardless of the time.

## 🚀 Landing Page Optimizations
- **Dual Android Action**: The "Android APK" button now triggers both the APK download and a PWA installation prompt for users who prefer the web app.
- **iOS Smart Modal**: Automatically detects iPhone users and provides step-by-step instructions for installing the PWA via Safari.
- **Premium Glassmorphism**: Cleaned up duplicated CSS and added floating animations to hero elements for a more premium first impression.

---
*Maintained by Antigravity AI*
