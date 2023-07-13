import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import {
  OTPScreen,
  WelcomeScreen,
  ProfileScreen,
  EMLScreen,
  AuthenticateScreen,
} from "./pages";
import {
  StytchProvider,
  StytchClient,
  useStytchUser,
} from "@stytch/react-native";
import * as Linking from "expo-linking";
import Constants from "expo-constants";

export type RootStackParamList = {
  Welcome: undefined;
  EML: undefined;
  OTP: undefined;
  Profile: undefined;
  Authenticate: { stytch_token_type: string; token: string };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

function App() {
  const publicToken = Constants?.expoConfig?.extra?.stytchPublicToken;
  const stytch = new StytchClient(publicToken);

  return (
    <StytchProvider stytch={stytch}>
      <Nav />
    </StytchProvider>
  );
}

function Nav() {
  const linking = {
    prefixes: [Linking.createURL("")],
  };

  const user = useStytchUser();

  return (
    <NavigationContainer linking={linking}>
      <Stack.Navigator>
        {user.user == null ? (
          <>
            <Stack.Screen name="Welcome" component={WelcomeScreen} />
            <Stack.Screen name="Authenticate" component={AuthenticateScreen} />
            <Stack.Screen name="EML" component={EMLScreen} />
            <Stack.Screen name="OTP" component={OTPScreen} />
          </>
        ) : (
          <>
            <Stack.Screen name="Profile" component={ProfileScreen} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
