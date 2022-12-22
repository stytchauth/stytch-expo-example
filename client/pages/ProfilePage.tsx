import { Alert, Text, TouchableOpacity, View } from "react-native";
import sharedStyles from "../src/styles/shared";
import { useStytch, useStytchUser } from "@stytch/react-native-expo";
import React, { useCallback, useEffect, useState } from "react";

function ProfilePage() {
  const stytch = useStytch();
  const user = useStytchUser();

  const [isKeystoreAvailable, setKeystoreAvailable] = useState(false);
  const [hasBiometricRegistration, setBiometricRegistration] = useState(false);
  const [sensorType, setSensorType] = useState("none");

  const checkKeystoreAvailable = useCallback(() => {
    stytch.biometrics.isKeystoreAvailable().then((resp) => {
      setKeystoreAvailable(resp);
    });
  }, [stytch]);

  const checkBiometricRegistration = useCallback(() => {
    stytch.biometrics.isRegistrationAvailable().then((resp) => {
      setBiometricRegistration(resp);
    });
  }, [stytch]);

  const checkSensor = useCallback(() => {
    stytch.biometrics
      .getSensor()
      .then((resp) => {
        const { biometryType } = resp;
        setSensorType(biometryType);
      })
      .catch((err) => console.log(err));
  }, [stytch]);

  useEffect(() => {
    checkSensor();
    checkKeystoreAvailable();
    checkBiometricRegistration();
  }, [checkSensor, checkKeystoreAvailable, checkBiometricRegistration]);

  const registerBiometrics = async () => {
    stytch.biometrics
      .register({
        prompt: "Register biometrics",
        allowDeviceCredentials: true,
        allowFallbackToCleartext: false,
        cancelButtonText: "Cancel",
      })
      .then((resp) => {
        Alert.alert("Register successful", JSON.stringify(resp));
        checkBiometricRegistration();
      })
      .catch((err) => {
        Alert.alert("Register unsuccessful", err.message);
      });
  };

  const authenticateBiometrics = () => {
    stytch.biometrics
      .authenticate({
        prompt: "Authenticate biometrics",
        sessionDurationMinutes: 60,
        allowDeviceCredentials: true,
        cancelButtonText: "Cancel",
      })
      .then((resp) => {
        Alert.alert("Authentication successful", JSON.stringify(resp));
      })
      .catch((err) => {
        Alert.alert("Authentication unsuccessful", err.message);
      });
  };

  const deleteBiometrics = () => {
    stytch.biometrics
      .removeRegistration()
      .then(() => {
        Alert.alert("Deletion successful");
        checkBiometricRegistration();
      })
      .catch((err) => {
        Alert.alert("Deletion unsuccessful", err.message);
      });
  };

  return (
    <View style={sharedStyles.container}>
      <View>
        <Text style={sharedStyles.header}>Profile</Text>
        <Text>
          Welcome to your profile page. You have completed a one time passcode
          login flow powered by Stytch. You can review the source code for this
          app on Github to learn how to implement this yourself!
        </Text>
        <Text>Your user ID is {!!user && user.user_id}</Text>
        <Text>Biometry type available: {sensorType}</Text>
      </View>
      {isKeystoreAvailable && !hasBiometricRegistration && (
        <View>
          <TouchableOpacity
            style={sharedStyles.buttonDark}
            onPress={registerBiometrics}
          >
            <Text style={sharedStyles.buttonTextDark}>Register Biometrics</Text>
          </TouchableOpacity>
        </View>
      )}
      {hasBiometricRegistration && (
        <>
          <View>
            <TouchableOpacity
              style={sharedStyles.buttonDark}
              onPress={authenticateBiometrics}
            >
              <Text style={sharedStyles.buttonTextDark}>
                Authenticate with Biometrics
              </Text>
            </TouchableOpacity>
          </View>
          <View>
            <TouchableOpacity
              style={sharedStyles.buttonDark}
              onPress={deleteBiometrics}
            >
              <Text style={sharedStyles.buttonTextDark}>
                Delete Biometrics Registration
              </Text>
            </TouchableOpacity>
          </View>
        </>
      )}
      <TouchableOpacity
        style={[sharedStyles.buttonDark]}
        onPress={stytch.session.revoke}
      >
        <Text style={[sharedStyles.buttonTextDark]}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
}

export default ProfilePage;
