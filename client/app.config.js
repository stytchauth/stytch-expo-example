import 'dotenv/config';

export default {
  name: 'CoolApp',
  version: '1.0.0',
  extra: {
    stytchPublicToken: process.env.STYTCH_PUBLIC_TOKEN || '',
  },
  name: "stytch-expo-example",
  slug: "stytch-expo-example",
  orientation: "portrait",
  icon: "./assets/icon.png",
  splash: {
    image: "./assets/splash.png",
    resizeMode: "contain",
    backgroundColor: "#ffffff"
  },
  updates: {
    fallbackToCacheTimeout: 0
  },
  assetBundlePatterns: [
    "**/*"
  ],
  ios: {
    supportsTablet: true,
    bundleIdentifier: "stytch.rn.test"
  },
  android: {
    adaptiveIcon: {
      foregroundImage: "./assets/adaptive-icon.png",
      backgroundColor: "#FFFFFF"
    },
    package: "stytch.rn.test"
  },
  web: {
    favicon: "./assets/favicon.png"
  }
};