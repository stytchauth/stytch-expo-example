# Stytch + Expo example app
![stytch](https://user-images.githubusercontent.com/100632220/169160947-332d26eb-247e-436c-86bc-73e9cf0dbaa0.png)

## Overview
This example app includes two services:
1. A mobile application powered by React Native and Expo
2. An Express/Node server which wraps the Stytch API

This application demonstrates a mobile friendly signup and sign in flow powered by Stytch. In this example the following Stytch products are used:
1. [SMS passcodes](https://stytch.com/products/sms-passcodes)
2. [Session management](https://stytch.com/products/session-management)

### What is the purpose of the Express/Node server?
It is best practice for API secrets to not be stored client side. For that reason, the client application communicates with the Express/Node server, and the server interacts with the Stytch API. This architecture keeps the Stytch API secret key off the user's device.

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

**Start Expo**
```bash
cd client
npm install
expo start
```
**Setup Node server**

In a separate terminal run the following commands:
```bash
cd stytch-expo-integration/server 
npm install
```

Next we need to create a `.env` file to store our API keys. Modify and run the command below to create a `.env` file using the API keys found in your Stytch [project dashboard](https://stytch.com/dashboard/api-keys).
```bash
# in ./stytch-expo-integration/server
echo "STYTCH_PROJECT_ID=GET_FROM_STYTCH_DASHBOARD\nSTYTCH_SECRET=GET_FROM_STYTCH_DASHBOARD" > .env
```

Finally start the server
```bash
npm run dev
```


You should now have both Expo and the Node server running on your machine. You can now use the Expo CLI tooling to open the mobile application in a simulator or as a web application.

## Documentation
Learn more about the Stytch products used in this example app:
- [SMS OTP API documentation](https://stytch.com/docs/api/sms-otp-overview)
- [Stytch's Node.js client library](https://www.npmjs.com/package/stytch)
