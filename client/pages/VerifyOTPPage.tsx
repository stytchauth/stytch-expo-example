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
import apiClient from "../src/apiClient";
import * as SessionManager from "../src/sessionManager";

type Props = NativeStackScreenProps<RootStackParamList, "VerifyOTP">;

function VerifyOTPPage({ navigation, route }: Props) {
  const { methodId, phoneNumber } = route.params;
  const [otp, setOtp] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const { verifyOTP } = React.useContext(SessionManager.AuthContext);

  const onPressNext = async () => {
    const error = await verifyOTP(otp, methodId);

    if (typeof error === "object") {
      setErrorMessage(error.errorMessage);
    } else {
      
    }
  };
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <View>
          <Text style={styles.header}>
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
  container: {
    display: "flex",
    justifyContent: "space-between",
    flex: 1,
    padding: 20,
    color: "#fff",
    paddingTop: 60,
  },
  header: {
    fontSize: 22,
    fontWeight: "600",
    marginBottom: 8,
    fontFamily: "System",
  },
  row: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
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
