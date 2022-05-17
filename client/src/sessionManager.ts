import AsyncStorage from "@react-native-async-storage/async-storage";
import apiClient from "./apiClient";
import React from "react";
const _SESSION_KEY = "test";

export const getAuthContext = (
  setHasUserState: (hasState: boolean) => void
) => {
  return {
    sendOTP: async (sessionToken: string) => {
      try {
        return true;
      } catch (e) {
        console.error(e);
        return false;
      }
    },

    verifyOTP: async (
      otp: string,
      methodId: string
    ): Promise<true | { errorMessage: string }> => {
      try {
        const resp = await apiClient.verifyOTP(otp, methodId);
        const data = await resp.json();
        if (resp.status !== 200) {
          return { errorMessage: data?.error };
        }
        await AsyncStorage.setItem(_SESSION_KEY, data.session_token);
        setHasUserState(true);
        return true;
      } catch (e: any) {
        return { errorMessage: e?.message };
      }
    },
    authenticateStoredSession: async () => {
      try {
        const session = await AsyncStorage.getItem(_SESSION_KEY)
        const resp = await apiClient.
      }
    },
    logout: async () => {},
  };
};

export const AuthContext = React.createContext({});
