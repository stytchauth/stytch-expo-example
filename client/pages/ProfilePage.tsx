import React, { useEffect, useState } from "react";
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

type Props = NativeStackScreenProps<RootStackParamList, "Profile">;

function ProfilePage(props: Props) {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Profile</Text>
      <Text>
        Welcome to your profile page. You have completed a one time passcode
        login flow powered by Stytch. You can review the source code for this
        app on Github to learn how to implement this yourself!
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
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

export default ProfilePage;
