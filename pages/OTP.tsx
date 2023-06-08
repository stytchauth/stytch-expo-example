import * as React from "react";
import { styles } from "./styles";
import { useState } from "react";
import { useStytch, OTPsLoginOrCreateResponse } from "@stytch/react-native";
import { Text, TextInput, TouchableOpacity, View } from "react-native";

function OTP() {
  const stytch = useStytch();

  const [phoneNumber, setPhoneNumber] = useState("");
  const [otp, setOTP] = useState("");
  const [methodId, setMethodId] = useState<string | undefined>();
  const [errorMessage, setErrorMessage] = useState<string | undefined>();
  const [isLoading, setLoading] = useState(false);

  const login = async () => {
    setLoading(true);
    stytch.otps.sms
      .loginOrCreate(phoneNumber)
      .then((resp) => {
        setErrorMessage(undefined);
        setLoading(false);
        setMethodId(resp.method_id);
      })
      .catch((err) => {
        if (err instanceof Error) {
          setErrorMessage(err.message);
        } else {
          console.error(err);
        }
        setLoading(false);
      });
  };

  const authenticate = async () => {
    if (methodId) {
      setLoading(true);
      stytch.otps
        .authenticate(otp, methodId, {
          session_duration_minutes: 60,
        })
        .then(() => {
          setErrorMessage(undefined);
          setLoading(false);
        })
        .catch((err) => {
          if (err instanceof Error) {
            setErrorMessage(err.message);
          } else {
            console.error(err);
          }
          setLoading(false);
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
            caretHidden
            placeholder="123456"
            autoFocus
          />
          {errorMessage && (
            <Text style={styles.errorText}>Error: {errorMessage}</Text>
          )}
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
            autoFocus
          />
          <Text style={styles.helperText}>
            This demo is currently limited to phone numbers with the +1
            international code (United States).
          </Text>
          {errorMessage && (
            <Text style={styles.errorText}>Error: {errorMessage}</Text>
          )}
          <TouchableOpacity
            style={isLoading ? styles.buttonDisabled : styles.button}
            onPress={login}
          >
            <Text style={styles.buttonText}>Send SMS</Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  );
}

export default OTP;
