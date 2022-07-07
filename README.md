# Stytch + Expo example app
![expoExampleApp](https://user-images.githubusercontent.com/100632220/169424762-67caa828-2b05-43f7-9055-067014676316.png)

## Overview
This example app includes A mobile application powered by React Native and Expo

This application demonstrates a mobile friendly signup and sign in flow powered by Stytch. In this example the following Stytch products are used:
1. [SMS passcodes](https://stytch.com/products/sms-passcodes)
2. [Session management](https://stytch.com/products/session-management)

## Running locally

**Create a Stytch account**

First you will need to sign up and create a new project in [Stytch](https://stytch.com/). Then run the following commands in the terminal of your choice.

**Install Expo**
```bash
npm install --global expo-cli
```

**Clone repository**
```bash
git clone https://github.com/stytchauth/stytch-expo-integration.git
cd stytch-expo-integration
```

Next we need to create a `.env` file to store our API keys. Modify and run the command below to create a `.env` file using the API keys found in your Stytch [project dashboard](https://stytch.com/dashboard/api-keys).
```bash
# in ./stytch-expo-integration/client
echo "STYTCH_PUBLIC_TOKEN=GET_FROM_STYTCH_DASHBOARD" > .env
```

**Start Expo**
```bash
cd client
npm install
expo start


You should now have Expo running on your machine. You can now use the Expo CLI tooling to open the mobile application in a simulator or as a web application.

## Documentation
Learn more about the Stytch products used in this example app:
- [SMS OTP API documentation](https://stytch.com/docs/api/sms-otp-overview)
- [React Native SDK with Expo](https://stytch.com/docs/sdks/react-native-sdk)
