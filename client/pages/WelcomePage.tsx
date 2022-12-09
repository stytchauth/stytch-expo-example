import { Image, Text, TouchableOpacity, View } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../App";
import { useStytch } from "@stytch/react-native-expo-testing";
import styles from "../src/styles/shared";
import { useState, useEffect } from "react";

type Props = NativeStackScreenProps<RootStackParamList, "Welcome">;

function Welcome({ navigation }: Props) {
  const stytch = useStytch();

  const [
    isBiometricsRegistrationAvailable,
    setBiometricsRegistrationAvailable,
  ] = useState(false);

  const checkBiometricsRegistration = async () => {
    await stytch.biometrics
      .registrationAvailable()
      .then((resp) => {
        setBiometricsRegistrationAvailable(resp);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    checkBiometricsRegistration();
  }, []);

  const authenticateBiometrics = () => {
    stytch.biometrics
      .authenticate({
        prompt: "Authenticate with Biometrics",
        sessionDurationMinutes: 60,
      })
      .then((resp: any) => {
        console.log(resp);
      })
      .catch((err: any) => {
        console.log(err);
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
        <Text style={styles.buttonTextDark}>Login or sign up</Text>
      </TouchableOpacity>
      {isBiometricsRegistrationAvailable && (
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
