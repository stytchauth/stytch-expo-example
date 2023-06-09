import * as React from "react";
import { styles } from "./styles";
import { useState } from "react";
import { useStytch } from "@stytch/react-native";
import { Text, TextInput, TouchableOpacity, View } from "react-native";

function OTP() {
  const stytch = useStytch();

  const [phoneNumber, setPhoneNumber] = useState("");
  const [otp, setOTP] = useState("");
  const [methodId, setMethodId] = useState<string | undefined>();

  const login = async () => {
    stytch.otps.sms.loginOrCreate(phoneNumber).then((resp) => {
      setMethodId(resp.method_id);
    });
  };

  const authenticate = async () => {
    if (methodId) {
      stytch.otps.authenticate(otp, methodId, {
        session_duration_minutes: 60,
      });
    }
  };

  return (
    <View style={styles.container}>
      {methodId ? (
        <>
          <Text style={styles.header}>
            Enter the code sent to{"\n"}
            {phoneNumber}
          </Text>
          <TextInput
            keyboardType="phone-pad"
            style={styles.input}
            textContentType="oneTimeCode"
            onChangeText={setOTP}
            maxLength={6}
            placeholder="123456"
            value={otp}
            autoFocus
          />
          <TouchableOpacity style={styles.button} onPress={authenticate}>
            <Text style={styles.buttonText}>Verify Code</Text>
          </TouchableOpacity>
        </>
      ) : (
        <>
          <Text style={styles.header}>Enter your mobile number</Text>
          <TextInput
            keyboardType="phone-pad"
            style={styles.input}
            dataDetectorTypes="phoneNumber"
            textContentType="telephoneNumber"
            onChangeText={setPhoneNumber}
            placeholder="+1(000)000-0000"
            value={phoneNumber}
            autoFocus
          />
          <Text style={styles.helperText}>
            This demo is currently limited to phone numbers with the +1
            international code (United States).
          </Text>
          <TouchableOpacity style={styles.button} onPress={login}>
            <Text style={styles.buttonText}>Send SMS</Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  );
}

export default OTP;
