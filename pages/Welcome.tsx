import * as React from "react";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../App";
import { styles } from "./styles";
import { Image, TouchableOpacity, Text, View } from "react-native";
import { useStytch } from "@stytch/react-native";
import { useEffect, useState } from "react";
import * as Linking from "expo-linking";

type Props = NativeStackScreenProps<RootStackParamList, "Welcome">;

const Welcome = ({ navigation }: Props) => {
  const stytch = useStytch();
  const [hasBiometricFactor, setHasBiometricFactor] = useState(false);

  const redirect = Linking.createURL("Authenticate");

  useEffect(() => {
    stytch.biometrics.isRegistrationAvailable().then((res: boolean) => {
      setHasBiometricFactor(res);
    });
  }, []);

  const authenticateBiometrics = () => {
    stytch.biometrics.authenticate({
      sessionDurationMinutes: 60,
      prompt: "Login to Stytch",
      allowDeviceCredentials: true,
    });
  };

  const loginWithGoogle = () => {
    stytch.oauth.google.start({
      login_redirect_url: redirect,
      signup_redirect_url: redirect,
      onCompleteCallback: () => {
        navigation.navigate("Profile");
      },
    });
  };

  const loginWithApple = () => {
    stytch.oauth.apple.start({
      login_redirect_url: redirect,
      signup_redirect_url: redirect,
      onCompleteCallback: () => {
        navigation.navigate("Profile");
      },
    });
  };

  const loginWithFacebook = () => {
    stytch.oauth.facebook.start({
      login_redirect_url: redirect,
      signup_redirect_url: redirect,
    });
  };

  const loginWithGithub = () => {
    stytch.oauth.github.start({
      login_redirect_url: redirect,
      signup_redirect_url: redirect,
    });
  };

  return (
    <View style={styles.container}>
      <Image
        style={{ width: "100%", resizeMode: "contain" }}
        source={require("../assets/logo.png")}
      />
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("EML")}
      >
        <Text style={styles.buttonText}>Login with EML</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("OTP")}
      >
        <Text style={styles.buttonText}>Login with OTP</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={loginWithGoogle}>
        <Text style={styles.buttonText}>Login with Google</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={loginWithApple}>
        <Text style={styles.buttonText}>Login with Apple</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={loginWithFacebook}>
        <Text style={styles.buttonText}>Login with Facebook</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={loginWithGithub}>
        <Text style={styles.buttonText}>Login with Github</Text>
      </TouchableOpacity>
      {hasBiometricFactor && (
        <TouchableOpacity
          style={styles.button}
          onPress={authenticateBiometrics}
        >
          <Text style={styles.buttonText}>Login with Biometrics</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default Welcome;
