import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { ProfilePage, SendOTPPage, VerifyOTPPage, WelcomePage } from "./pages";
import { useEffect, useState } from "react";
import AuthContext, { getAuthContext } from "./src/authContext";

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
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState("");
  const ctx = getAuthContext(setUser);

  useEffect(() => {
    ctx
      .authenticateStoredSession()
      .then(() => {
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return null;
  }

  return (
    <AuthContext.Provider value={ctx}>
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
    </AuthContext.Provider>
  );
}

export default App;
