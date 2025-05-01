import { Stack } from "expo-router";
import { StytchClient, StytchProvider } from "@stytch/react-native";

const stytch = new StytchClient(process.env.EXPO_PUBLIC_STYTCH_PUBLIC_TOKEN ?? '', true);

export default function RootLayout() {
  return (
    <StytchProvider stytch={stytch}>
        <Stack />
    </StytchProvider>
  );
}
