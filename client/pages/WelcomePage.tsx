import { Image, Text, TouchableOpacity, View } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../App";
import styles from "../src/styles/shared";

type Props = NativeStackScreenProps<RootStackParamList, "Welcome">;

function Welcome({ navigation }: Props) {
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
    </View>
  );
}

export default Welcome;
