import "dotenv/config";

export default ({ config }) => {
  return {
    ...config,
    extra: {
      stytchPublicToken: process.env.STYTCH_PUBLIC_TOKEN,
    },
  };
};
