# Stytch + React Native example app

## Overview

This example app includes a mobile application powered by React Native. This app was created with `npx create-expo-app@latest`

This application demonstrates a mobile friendly signup and sign in flow powered by Stytch's pre-built UI. In this example the following Stytch products are used:

1. [Email Magic Links](https://stytch.com/products/email-magic-links)
2. [SMS passcodes](https://stytch.com/products/sms-passcodes)
3. [Biometrics](https://stytch.com/products/mobile-biometrics)
4. [Session management](https://stytch.com/products/session-management)

## Running locally

**Create a Stytch account**

Sign up and create a new project in [Stytch](https://stytch.com).

**Stytch Dashboard Configuration**

Open the [Stytch Dashboard Frontend SDK Configuration](https://stytch.com/dashboard/sdk-configuration).

1. Enable the SDK in your project.
2. Add `com.stytch.expo.example` as a Bundle ID.

Open the [Stytch Dashboard Redirect URLS](https://stytch.com/dashboard/redirect-urls).
1. Add `stytch-ui-[YOUR_PUBLIC_TOKEN]://deeplink` and select "Login" and "Signup" as URL Types.   

**Clone repository**

```bash
git clone https://github.com/stytchauth/stytch-expo-example.git
cd stytch-expo-example
```

Copy the `.env.template` file into `.env`. Set the `EXPO_PUBLIC_STYTCH_PUBLIC_TOKEN` found in your [Stytch Dashboard](https://stytch.com/dashboard/api-keys) in the local copy.

**Install Dependencies**

```bash
npm install
# on iOS
cd ios && pod install
```

**Start Application**

Note that your development environment must be configured to run react native applications before you can run this demo. For more information, see the [React Native docs](https://reactnative.dev/docs/environment-setup) for environment setup.

```bash
# open on iOS
npm run ios
# or on Android
npm run android
```

**Running the Application**
1. Email Magic Links: Make sure to log in to the associated email account on the device's browser. The redirect will only work on the same device.
2. Biometrics: Once you log in for the first time, you can add Biometrics as a login option. You will see a "Add Biometrics Registration" button, click it and you'll be taken back to the home page where you can press "Login with Biometrics" at which point the Fingerprint prompt will appear.

## Documentation

Learn more about the [React Native SDK](https://stytch.com/docs/sdks/react-native-sdk).
