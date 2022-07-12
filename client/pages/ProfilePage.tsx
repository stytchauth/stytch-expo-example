import { Text, TouchableOpacity, View } from "react-native";
import sharedStyles from "../src/styles/shared";
import { useStytch, useStytchUser } from "@stytch/react-native-expo";

function ProfilePage() {
  const stytch = useStytch();
  const user = useStytchUser();
  return (
    <View style={sharedStyles.container}>
      <View>
        <Text style={sharedStyles.header}>Profile</Text>
        <Text>
          Welcome to your profile page. You have completed a one time passcode
          login flow powered by Stytch. You can review the source code for this
          app on Github to learn how to implement this yourself!
        </Text>
        <Text>
          Your user ID is {!!user && user.user_id}
        </Text>
      </View>
      <TouchableOpacity style={[sharedStyles.buttonDark]} onPress={stytch.session.revoke}>
        <Text style={[sharedStyles.buttonTextDark]}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
}

export default ProfilePage;
