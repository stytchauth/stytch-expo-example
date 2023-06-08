# Stytch + Expo example app

## Overview

This example app includes a mobile application powered by React Native and Expo

This application demonstrates a mobile friendly signup and sign in flow powered by Stytch. In this example the following Stytch products are used:

1. [Email Magic Links](https://stytch.com/products/email-magic-links)
2. [SMS passcodes](https://stytch.com/products/sms-passcodes)
3. [OAuth](https://stytch.com/products/oauth)
4. [Biometrics](https://stytch.com/products/mobile-biometrics)
5. [Session management](https://stytch.com/products/session-management)

## Running locally

**Create a Stytch account**

Sign up and create a new project in [Stytch](https://stytch.com).

**Stytch Dashboard Configuration**

Open the [Stytch Dashboard Frontend SDK Configuration](https://stytch.com/dashboard/sdk-configuration).

1. Enable the SDK in your project.
2. Add `com.stytch.sdk.expo.example` as a Bundle ID.

**Clone repository**

```bash
git clone https://github.com/stytchauth/stytch-expo-example.git
cd stytch-expo-example
```

Copy the `.env.template` file and use the public token found in your Stytch [project dashboard](https://stytch.com/dashboard/api-keys).

**Install Dependencies**

```bash
npm install
```

**Create an Expo development build**

Learn more about how to create and install a [development build](https://docs.expo.dev/develop/development-builds/introduction) to your device.

**Start Expo**

```bash
npm run start
// press 'i' to open on iOS, or 'a' to open on Android
```

## Documentation

Learn more about the [React Native SDK](https://stytch.com/docs/sdks/react-native-sdk).
