import { StatusBar } from "expo-status-bar";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import {
  createNativeStackNavigator,
  NativeStackScreenProps,
} from "@react-navigation/native-stack";
import styles from "./src/styles/shared";
import LoginPage from "./pages/SendOTPPage";
import VerifyOTPPage from "./pages/VerifyOTPPage";
import ProfilePage from "./pages/ProfilePage";
import { createContext, useEffect, useState } from "react";
import * as SessionManager from "./src/sessionManager";

export type RootStackParamList = {
  Welcome: undefined;
  SendOTP: undefined;
  VerifyOTP: {
    phoneNumber: string;
    methodId: string;
  };
  Profile: undefined;
};
type Props = NativeStackScreenProps<RootStackParamList, "Welcome">;
const Stack = createNativeStackNavigator<RootStackParamList>();

function App() {
  const [loading, setLoading] = useState(true);
  const [hasUser, setHasUser] = useState(false);
  const ctx = SessionManager.getAuthContext(setHasUser)



  console.log("APP");

  useEffect(() => {
    console.log("APP LEVEL USE EFFECT");
    ctx.authenticateStoredSession()
      .then((session) => {
        console.log("APP LEVEL", session);
        setLoading(false);
      })
      .catch((error) => setLoading(false));
  }, []);

  // if (loading) {
  //   return null;
  // }

  return (
    <SessionManager.AuthContext.Provider
      value={SessionManager.getAuthContext(setHasUser)}
    >
      <NavigationContainer>
        <Stack.Navigator>
          {hasUser ? (
            <Stack.Screen
              name="Profile"
              component={ProfilePage}
              options={{ headerShown: false }}
            />
          ) : (
            <>
              <Stack.Screen
                name="Welcome"
                component={Welcome}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="SendOTP"
                component={LoginPage}
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
    </SessionManager.AuthContext.Provider>
  );
}
function Welcome({ navigation }: Props) {
  return (
    <View style={styles.container}>
      <Image
        style={{ width: "100%", resizeMode: "contain" }}
        source={require("./assets/logo.png")}
      ></Image>
      <TouchableOpacity
        style={styles.buttonDark}
        onPress={() => navigation.navigate("SendOTP")}
      >
        <Text style={styles.buttonTextDark}>Login or sign up</Text>
      </TouchableOpacity>
    </View>
  );
}

export default App;
