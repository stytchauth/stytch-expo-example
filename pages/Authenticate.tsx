import * as React from "react";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../App";
import { View, Text } from "react-native";

import { styles } from "./styles";
import { useStytch } from "@stytch/react-native";
import { useEffect } from "react";

type Props = NativeStackScreenProps<RootStackParamList, "Authenticate">;

export const Authenticate = ({ route }: Props) => {
  const stytch = useStytch();

  useEffect(() => {
    const tokenType = route.params.stytch_token_type;
    const token = route.params.token;

    if (tokenType === "magic_links") {
      stytch.magicLinks.authenticate(token, { session_duration_minutes: 60 });
    } else {
      // Facebook adds characters "#_=_" to the end of the redirect url.
      // If the token is not 44 characters long, slice the token to the correct length.
      stytch.oauth.authenticate(token.slice(0, 44), {
        session_duration_minutes: 60,
      });
    }
  }, []);

  return (
    <View style={styles.container}>
      <Text>Authenticating...</Text>
    </View>
  );
};

export default Authenticate;
