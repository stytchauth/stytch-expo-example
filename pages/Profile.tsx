import * as React from "react";
import { styles } from "./styles";
import { View, Text, TouchableOpacity } from "react-native";
import { useStytch, useStytchUser } from "@stytch/react-native";

const Profile = () => {
  const stytch = useStytch();
  const { user } = useStytchUser();

  const registerBiometrics = () => {
    stytch.biometrics.register({
      prompt: "Register Your Biometric Factor",
      allowDeviceCredentials: true,
      allowFallbackToCleartext: true,
    });
  };

  const deleteBiometricsRegistration = () => {
    stytch.biometrics.removeRegistration();
  };

  return (
    <View style={styles.container}>
      <Text>{user?.name.first_name}</Text>
      <Text>
        Welcome to your profile page. You have completed a login flow powered by
        Stytch. You can review the source code for this app on Github to learn
        how to implement this yourself!
      </Text>
      <TouchableOpacity style={styles.button} onPress={registerBiometrics}>
        <Text style={styles.buttonText}>Add Biometrics Registration</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={deleteBiometricsRegistration}
      >
        <Text style={styles.buttonText}>Delete Biometrics Registration</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => stytch.session.revoke()}
      >
        <Text style={styles.buttonText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Profile;
