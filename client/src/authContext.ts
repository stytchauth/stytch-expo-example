import * as SecureStore from "expo-secure-store";
import * as ApiClient from "./apiClient";
import React, { Dispatch, SetStateAction } from "react";
const _SESSION_KEY = "stytch_session_key";

export const getAuthContext = (setUser: Dispatch<SetStateAction<string>>) => {
  return {
    verifyOTP: async (
      otp: string,
      methodId: string
    ): Promise<true | { errorMessage: string }> => {
      try {
        const resp = await ApiClient.verifyOTP(otp, methodId);
        const data = await resp.json();
        if (resp.status !== 200) {
          return { errorMessage: data?.error };
        }
        await SecureStore.setItemAsync(_SESSION_KEY, data.session_token);
        setUser(data.user);
        return true;
      } catch (e: any) {
        return { errorMessage: e?.message };
      }
    },
    authenticateStoredSession: async () => {
      try {
        const session = await SecureStore.getItemAsync(_SESSION_KEY);
        if (!session) {
          return false;
        }
        const resp = await ApiClient.authenticateSession(session);
        const data = await resp.json();
        if (resp.status !== 200) {
          return false;
        }
        setUser(data.user);
        return true;
      } catch (e: any) {
        console.error(e?.message);
        return false;
      }
    },
    logout: async () => {
      // Revoke session
      try {
        const session = await SecureStore.getItemAsync(_SESSION_KEY);
        if (session) {
          await ApiClient.logout(session);
        }
      } catch {}
      // Delete session token in device storage
      try {
        await SecureStore.deleteItemAsync(_SESSION_KEY);
      } catch {}
      // Clear the user state
      setUser("");
    },
  };
};

const AuthContext = React.createContext(getAuthContext(() => {}));
export default AuthContext;
