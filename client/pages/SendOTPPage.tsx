import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useState } from "react";
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  StyleSheet,
  View,
} from "react-native";
import { RootStackParamList } from "../App";
import sharedStyles from "../src/styles/shared";
import { useStytch } from '@stytch/react-native-expo';

type NavProps = NativeStackScreenProps<RootStackParamList, "SendOTP">;
type Props = NavProps & {
  setMethodId: (methodId: string) => void;
}

function SendOTPPage({ navigation }: Props) {
  const stytch = useStytch();
  const [phoneInput, setPhoneInput] = useState("");
  const [errorMessage, setErrorMessage] = useState<string | undefined>();
  const [waitingForResp, setWaitingForResp] = useState(false);
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <KeyboardAvoidingView
        style={[sharedStyles.container, { padding: 20 }]}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <View>
          <Text style={sharedStyles.header}>Enter your mobile number</Text>
          <TextInput
            keyboardType="phone-pad"
            style={styles.input}
            dataDetectorTypes="phoneNumber"
            textContentType="telephoneNumber"
            value={phoneInput}
            onChangeText={(text) => setPhoneInput(text)}
            autoFocus
          ></TextInput>
          <Text style={[styles.helperText]}>
            This demo is currently limited to phone numbers with the +1
            international code (United States).
          </Text>
          {errorMessage && (
            <Text style={[styles.errorText]}>Error: {errorMessage}</Text>
          )}
        </View>
        <View style={[styles.row]}>
          <TouchableOpacity
            style={sharedStyles.buttonLight}
            onPress={() => navigation.navigate("Welcome")}
          >
            <Text style={sharedStyles.buttonTextLight}>Back</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={
              waitingForResp
                ? sharedStyles.buttonDisabled
                : sharedStyles.buttonDark
            }
            onPress={async () => {
              setWaitingForResp(true);
              try {
                const resp = await stytch.otps.sms.loginOrCreate(phoneInput);
                if (resp.status_code !== 200) {
                  setErrorMessage('Unable to send OTP');
                  setWaitingForResp(false);
                } else {
                  // Move to next page
                  setWaitingForResp(false);
                  navigation.navigate("VerifyOTP", {
                    phoneNumber: phoneInput,
                    methodId: resp.method_id,
                  });
                }
              } catch (e) {
                console.error(e);
              }
            }}
            disabled={waitingForResp}
          >
            <Text style={sharedStyles.buttonTextDark}>Next</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  input: {
    height: 50,
    borderWidth: 1,
    paddingVertical: 15,
    paddingHorizontal: 10,
    fontSize: 18,
    marginBottom: 10,
  },
  row: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  helperText: {
    color: "#8296A1",
  },
  errorText: {
    marginTop: 10,
    color: "#892426",
    fontWeight: "600",
    fontFamily: "System",
  },
});

export default SendOTPPage;
