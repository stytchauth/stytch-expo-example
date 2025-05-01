import React, { useEffect, useState } from 'react';
import {
  Button,
  Text,
  useColorScheme,
  View,
} from 'react-native';
import {
  useStytchUser,
  useStytch,
  StytchUI,
  StytchUIConfig,
  RNUIProducts,
  OTPMethods,
  useStytchSession,
} from '@stytch/react-native';


export default function App(): React.JSX.Element {
  const {user, fromCache} = useStytchUser();
  if (fromCache) return <Text>Loading...</Text>;
  if (!user) return <LoggedOutView />;
  return <LoggedInView />;
}

function LoggedInView(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';
  const stytch = useStytch();
  const logout = () => stytch.session.revoke();
  const { user } = useStytchUser();
  const { session } = useStytchSession();
  const [canRegisterBiometrics, setCanRegisterBiometrics] = useState(false);
  const [canRemoveBiometrics, setCanRemoveBiometrics] = useState(false);
  const [canAddBiometricsToSession, setCanAddBiometricsToSession] = useState(false);
  const [biometricsRemovedFromDevice, setBiometricsRemovedFromDevice] = useState(false);
  const textColor = isDarkMode ? "#fff" : "#19303D"
  
  useEffect(() => {
    stytch.biometrics.isRegistrationAvailable().then((isAvailable) => {
      setCanRegisterBiometrics(!isAvailable)
      const hasAlreadyAuthedWithBiometrics = session?.authentication_factors.find(factor => factor.delivery_method === 'biometric') !== undefined
      setCanRemoveBiometrics(isAvailable && hasAlreadyAuthedWithBiometrics && session.authentication_factors.length >= 2)
      setCanAddBiometricsToSession(isAvailable && !hasAlreadyAuthedWithBiometrics)
    })
  }, [stytch.biometrics, session, biometricsRemovedFromDevice, setCanRegisterBiometrics, setCanRemoveBiometrics, setCanAddBiometricsToSession]);

  const registerBiometrics = () => stytch.biometrics.register({ prompt: 'Register biometrics', sessionDurationMinutes: 60 });
  const addBiometricsToSession = () => stytch.biometrics.authenticate({ prompt: 'Add Biometrics to session', sessionDurationMinutes: 60 });
  const removeBiometrics = () => stytch.biometrics.removeRegistration().then(() => setBiometricsRemovedFromDevice(true));

  return (
    <View style={{ paddingHorizontal: 16 }}>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8}}>
        <Text style={{ flex: 0.25, color: textColor }}>User Id:</Text>
        <Text style={{ flex: 1, color: textColor }} ellipsizeMode='tail' numberOfLines={1}>{user?.user_id ?? 'Unknown'}</Text>
      </View>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8}}>
        <Text style={{ flex: 0.25, color: textColor }}>Session:</Text>
        <Text style={{ flex: 1, color: textColor }} ellipsizeMode='tail' numberOfLines={1}>{session?.session_id ?? 'Unknown'}</Text>
      </View>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8}}>
        <Text style={{ flex: 0.25, color: textColor }}>Expires:</Text>
        <Text style={{ flex: 1, color: textColor }} ellipsizeMode='tail' numberOfLines={1}>{session?.expires_at ?? 'Unknown'}</Text>
      </View>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8}}>
        <Text style={{ flex: 0.25, color: textColor }}>Email:</Text>
        <Text style={{ flex: 1, color: textColor }} ellipsizeMode='tail' numberOfLines={1}>{user?.emails[0]?.email ?? 'Unknown'}</Text>
      </View>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8}}>
        <Text style={{ flex: 0.25, color: textColor }}>Phone:</Text>
        <Text style={{ flex: 1, color: textColor }} ellipsizeMode='tail' numberOfLines={1}>{user?.phone_numbers[0]?.phone_number ?? 'Unknown'}</Text>
      </View>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8}}>
        <Text style={{ flex: 0.25, color: textColor }}>Biometric:</Text>
        <Text style={{ flex: 1, color: textColor }} ellipsizeMode='tail' numberOfLines={1}>{user?.biometric_registrations[0]?.biometric_registration_id ?? 'Unknown'}</Text>
      </View>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8}}>
        <Text style={{ flex: 0.25, color: textColor }}>Factors:</Text>
        <View style={{ flexDirection: 'row' }}>
          {session?.authentication_factors.map((factor, index) => <Text key={`${factor.type}-${index}`} style={{color: textColor}}>{factor.type}, </Text>)}
        </View>
      </View>
      {canRegisterBiometrics && <View style={{ marginBottom: 8 }}><Button onPress={registerBiometrics} title="Register Biometrics" /></View> }
      {canAddBiometricsToSession && <View style={{ marginBottom: 8 }}><Button onPress={addBiometricsToSession} title="Add Biometrics to session" /></View> }
      {canRemoveBiometrics && <View style={{ marginBottom: 8 }}><Button onPress={removeBiometrics} title="Remove Biometrics Registration" /></View> }
      <Button onPress={logout} title='Logout' />
    </View>
  );
}

function LoggedOutView(): React.JSX.Element {
  const config: StytchUIConfig = {
    productConfig: {
      products: [RNUIProducts.emailMagicLinks, RNUIProducts.otp],
      emailMagicLinksOptions: {},
      oAuthOptions: {
        providers: [],
      },
      otpOptions: {
        methods: [OTPMethods.SMS, OTPMethods.WhatsApp],
        expirationMinutes: 10,
      },
      sessionOptions: {
        sessionDurationMinutes: 30,
      },
      passwordOptions: {},
    },
  };
  const stytch = useStytch();

  return <StytchUI client={stytch} config={config}></StytchUI>;
}
