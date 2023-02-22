import { Alert, Image, Text, TouchableOpacity, View } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../App";
import { useStytch } from "@stytch/react-native-expo";
import styles from "../src/styles/shared";
import { useCallback, useEffect, useState } from "react";

type Props = NativeStackScreenProps<RootStackParamList, "Welcome">;

function Welcome({ navigation }: Props) {
  const stytch = useStytch();

  const oAuthRedirectUrl = "stytchexpo://Profile";

  const loginWithApple = () => {
    stytch.oauth.apple.start({
      login_redirect_url: oAuthRedirectUrl,
      signup_redirect_url: oAuthRedirectUrl,
    });
  };

  const loginWithFacebook = () => {
    stytch.oauth.facebook.start({
      login_redirect_url: oAuthRedirectUrl,
      signup_redirect_url: oAuthRedirectUrl,
    });
  };

  const loginWithGoogle = () => {
    stytch.oauth.google.start({
      login_redirect_url: oAuthRedirectUrl,
      signup_redirect_url: oAuthRedirectUrl,
    });
  };

  const [hasBiometricRegistration, setBiometricRegistration] = useState(false);

  const checkBiometricsRegistration = useCallback(() => {
    stytch.biometrics.isRegistrationAvailable().then((resp: boolean) => {
      setBiometricRegistration(resp);
    });
  }, [stytch]);

  useEffect(() => {
    checkBiometricsRegistration();
  }, [checkBiometricsRegistration]);

  const authenticateBiometrics = () => {
    stytch.biometrics
      .authenticate({
        prompt: "Authenticate biometrics",
        sessionDurationMinutes: 60,
      })
      .catch((err: Error) => {
        Alert.alert("Authenticate unsuccessful", err.message);
      });
  };

  return (
    <View style={styles.container}>
      <Image
        style={{ width: "100%", resizeMode: "contain" }}
        source={require("../assets/logo.png")}
      ></Image>
      <TouchableOpacity
        style={styles.buttonDark}
        onPress={() => navigation.navigate("SendOTP")}
      >
        <Text style={styles.buttonTextDark}>Login with OTP</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.buttonDark} onPress={loginWithApple}>
        <Text style={styles.buttonTextDark}>Login with Apple</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.buttonDark} onPress={loginWithFacebook}>
        <Text style={styles.buttonTextDark}>Login with Facebook</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.buttonDark} onPress={loginWithGoogle}>
        <Text style={styles.buttonTextDark}>Login with Google</Text>
      </TouchableOpacity>
      {hasBiometricRegistration && (
        <View style={{ padding: 10, marginBottom: 10 }}>
          <TouchableOpacity
            style={styles.buttonDark}
            onPress={authenticateBiometrics}
          >
            <Text style={styles.buttonTextDark}>Login with Biometrics</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

export default Welcome;
