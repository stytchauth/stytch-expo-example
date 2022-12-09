import { Text, TouchableOpacity, View } from "react-native";
import sharedStyles from "../src/styles/shared";
import { useStytch, useStytchUser } from "@stytch/react-native-expo-testing";
import React, { useState, useEffect } from "react";

function ProfilePage() {
  const stytch = useStytch();
  const user = useStytchUser();

  const [
    isBiometricsRegistrationAvailable,
    setBiometricsRegistrationAvailable,
  ] = useState(false);
  const [isKeystoreAvailable, setKeystoreAvailable] = useState(false);

  const [response, setResponse] = useState("");

  const checkKeystoreAvailable = async () => {
    await stytch.biometrics
      .keystoreAvailable()
      .then((resp) => {
        setKeystoreAvailable(resp);
      })
      .catch((err) => {
        console.log(err);
      });
  };

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

  const registerBiometrics = () => {
    setResponse("");
    stytch.biometrics
      .register({
        prompt: "Register Biometrics",
      })
      .then((resp) => {
        setResponse(JSON.stringify(resp));
      })
      .catch((err) => {
        setResponse(JSON.stringify(err));
      });
  };

  const authenticateBiometrics = () => {
    setResponse("");
    stytch.biometrics
      .authenticate({
        prompt: "Authenticate with Biometrics",
        sessionDurationMinutes: 60,
      })
      .then((resp) => {
        setResponse(JSON.stringify(resp));
      })
      .catch((err) => {
        setResponse(JSON.stringify(err));
      });
  };

  const deleteBiometricsDeviceRegistration = async () => {
    setResponse("");
    stytch.biometrics
      .removeRegistration()
      .then((resp) => {
        setResponse(JSON.stringify(resp));
      })
      .catch((err) => {
        setResponse(JSON.stringify(err));
      });
  };

  useEffect(() => {
    checkKeystoreAvailable();
  }, []);

  useEffect(() => {
    checkBiometricsRegistration();
  }, [registerBiometrics, deleteBiometricsDeviceRegistration]);

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
      </View>
      {isKeystoreAvailable && (
        <View>
          <TouchableOpacity
            style={sharedStyles.buttonDark}
            onPress={registerBiometrics}
          >
            <Text style={sharedStyles.buttonTextDark}>Register Biometrics</Text>
          </TouchableOpacity>
        </View>
      )}
      {isBiometricsRegistrationAvailable && (
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
              onPress={deleteBiometricsDeviceRegistration}
            >
              <Text style={sharedStyles.buttonTextDark}>
                Delete Biometrics Registration
              </Text>
            </TouchableOpacity>
          </View>
        </>
      )}
      <View>
        <Text>{response}</Text>
      </View>
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
