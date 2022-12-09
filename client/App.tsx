import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { ProfilePage, SendOTPPage, VerifyOTPPage, WelcomePage } from "./pages";
import Constants from "expo-constants";
import {
  StytchClient,
  StytchProvider,
  useStytchUser,
} from "@stytch/react-native-expo-testing";

export type RootStackParamList = {
  Welcome: undefined;
  SendOTP: undefined;
  VerifyOTP: {
    phoneNumber: string;
    methodId: string;
  };
  Profile: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

function App() {
  const user = useStytchUser();

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {user ? (
          <Stack.Screen
            name="Profile"
            component={ProfilePage}
            options={{ headerShown: false }}
          />
        ) : (
          <>
            <Stack.Screen
              name="Welcome"
              component={WelcomePage}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="SendOTP"
              component={SendOTPPage}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="VerifyOTP"
              component={VerifyOTPPage}
              options={{ headerShown: false }}
            />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

function AppWrapper() {
  const stytch = new StytchClient(
    Constants.manifest?.extra?.stytchPublicToken || ""
  );
  return (
    <StytchProvider stytch={stytch}>
      <App />
    </StytchProvider>
  );
}

export default AppWrapper;
