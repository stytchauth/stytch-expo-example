import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import sharedStyles from "../src/styles/shared";
import AuthContext from "../src/authContext";

function ProfilePage() {
  const { logout } = React.useContext(AuthContext);
  return (
    <View style={sharedStyles.container}>
      <View>
        <Text style={sharedStyles.header}>Profile</Text>
        <Text>
          Welcome to your profile page. You have completed a one time passcode
          login flow powered by Stytch. You can review the source code for this
          app on Github to learn how to implement this yourself!
        </Text>
      </View>
      <TouchableOpacity style={[sharedStyles.buttonDark]} onPress={logout}>
        <Text style={[sharedStyles.buttonTextDark]}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
}

export default ProfilePage;
