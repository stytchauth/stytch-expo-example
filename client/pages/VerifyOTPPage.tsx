import React, { useState } from "react";
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../App";
import sharedStyles from "../src/styles/shared";
import { useStytch } from '@stytch/react-native-expo'

type Props = NativeStackScreenProps<RootStackParamList, "VerifyOTP">;

function VerifyOTPPage({ navigation, route }: Props) {
  const stytch = useStytch();
  const { methodId, phoneNumber } = route.params;
  const [otp, setOtp] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const onPressNext = async () => {
    const res = await stytch.otps.authenticate(otp, methodId, { session_duration_minutes: 60 });
    if (res.status_code !== 200) {
      setErrorMessage('Unable to authenticate, please try again.')
    }
    // Successful authentication here will cause user to be populated in App.tsx and trigger redirect.
  };
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <KeyboardAvoidingView
        style={sharedStyles.container}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <View>
          <Text style={sharedStyles.header}>
            Enter the code sent to{"\n"}
            {phoneNumber}
          </Text>
          <TextInput
            keyboardType="phone-pad"
            style={styles.input}
            textContentType="oneTimeCode"
            value={otp}
            onChangeText={(text) => setOtp(text)}
            maxLength={6}
            caretHidden
            autoFocus
          ></TextInput>
          {errorMessage.length > 0 && (
            <Text style={styles.errorText}>Error: {errorMessage}</Text>
          )}
        </View>
        <View style={[styles.row]}>
          <TouchableOpacity
            style={sharedStyles.buttonLight}
            onPress={() => navigation.navigate("SendOTP")}
          >
            <Text style={sharedStyles.buttonTextLight}>Back</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={
              otp.length !== 6
                ? [sharedStyles.buttonDisabled]
                : [sharedStyles.buttonDark]
            }
            onPress={onPressNext}
            disabled={otp.length !== 6}
          >
            <Text style={[sharedStyles.buttonTextDark]}>Next</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  row: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  input: {
    height: 80,
    borderWidth: 1,
    paddingVertical: 15,
    paddingHorizontal: 10,
    fontSize: 36,
    marginBottom: 10,
    width: "75%",
    alignSelf: "center",
    letterSpacing: 15,
    textAlign: "center",
    borderRadius: 3,
  },
  errorText: {
    marginTop: 10,
    color: "#892426",
    fontWeight: "600",
    fontFamily: "System",
  },
});

export default VerifyOTPPage;
