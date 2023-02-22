import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { ProfilePage, SendOTPPage, VerifyOTPPage, WelcomePage } from "./pages";
import Constants from "expo-constants";
import {
  StytchClient,
  StytchProvider,
  useStytchUser,
} from "@stytch/react-native-expo";

export type RootStackParamList = {
  Welcome: undefined;
  SendOTP: undefined;
  VerifyOTP: {
    phoneNumber: string;
    methodId: string;
  };
  Profile: undefined | { token: string };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const config = {
  initialRouteName: "Welcome",
  screens: {
    Welcome: "Welcome",
    SendOTP: "SendOTP",
    VerifyOTP: "VerifyOTP",
    Profile: "Profile",
  },
};

const linking = {
  prefixes: ["stytchexpo://"],
  config: config,
};

function App() {
  const user = useStytchUser();

  return (
    <NavigationContainer linking={linking}>
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
