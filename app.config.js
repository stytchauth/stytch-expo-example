import "dotenv/config";

export default ({ config }) => {
  return {
    ...config,
    extra: {
      eas: {
        projectId: "9c5f8103-6b40-412c-b797-6a20c969b9d5",
      },
      stytchPublicToken: process.env.STYTCH_PUBLIC_TOKEN,
    },
  };
};
