import { Text } from '@ui-kitten/components';
import { makeRedirectUri } from 'expo-auth-session';
import * as QueryParams from 'expo-auth-session/build/QueryParams';
import * as Linking from 'expo-linking';
import { router } from 'expo-router';
import { useEffect, useState } from 'react';
import { Alert, AppState, SafeAreaView, StyleSheet } from 'react-native';

import CardInput from '../../components/CardInput/CardInput';
import CountryDropdown from '../../components/CountryDropdown/CountryDropdown';
import TextButton from '../../components/TextButton/TextButton';
import TextDivider from '../../components/TextDivider/TextDivider';
import { supabase } from '../../services/supabase';

// Tells Supabase Auth to continuously refresh the session automatically if
// the app is in the foreground. When this is added, you will continue to receive
// `onAuthStateChange` events with the `TOKEN_REFRESHED` or `SIGNED_OUT` event
// if the user's session is terminated. This should only be registered once.
AppState.addEventListener('change', (state) => {
  if (state === 'active') {
    supabase.auth.startAutoRefresh();
  } else {
    supabase.auth.stopAutoRefresh();
  }
});

const redirectTo = makeRedirectUri();

const createSessionFromUrl = async (url: string) => {
  const { params, errorCode } = QueryParams.getQueryParams(url);

  if (errorCode) throw new Error(errorCode);
  const { access_token, refresh_token } = params;

  if (!access_token) return;

  const { data, error } = await supabase.auth.setSession({
    access_token,
    refresh_token,
  });
  if (error) throw error;
  return data.session;
};

export default function SignUpScreen() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [username, setUsername] = useState('');
  const [countryId, setCountryId] = useState('');
  const [signUpEnabled, setSignUpEnabled] = useState(false);

  const styles = StyleSheet.create({
    container: {
      alignItems: 'center',
      marginTop: '25%',
    },
    verticallySpaced: {
      paddingTop: 4,
      paddingBottom: 4,
    },
    mt20: {
      marginTop: 20,
    },
    header: {
      marginBottom: 30,
    },
    divider: {
      width: '33%',
      marginBottom: 10,
    },
  });

  // TODO: Handle linking into app from email app.
  const url = Linking.useURL();
  if (url) createSessionFromUrl(url);

  const signInWithEmail = async () => {
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) Alert.alert(error.message);
    setLoading(false);
  };

  const redirectToLogin = () => {
    router.replace('/(auth)/login');
  };

  const validateEmail = (email: string) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
  };

  useEffect(() => {
    setSignUpEnabled(
      validateEmail(email) &&
        password.length > 0 &&
        username.length > 0 &&
        countryId.length > 0 &&
        password === confirmPassword,
    );
  }, [email, password, username, countryId, confirmPassword]);

  const signUpWithEmail = async () => {
    setLoading(true);
    const {
      data: { session },
      error,
    } = await supabase.auth.signUp({
      email,
      password,
      options: {
        // TODO: Handle deep linking
        emailRedirectTo: redirectTo,
        data: {
          username,
          country_id: countryId,
        },
      },
    });

    if (error) Alert.alert(error.message);
    if (!session)
      Alert.alert('Please check your inbox for email verification!');
    setLoading(false);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text category="h4" style={styles.header}>
        Create Account
      </Text>
      <CardInput
        label="Username"
        onChangeText={(text) => setUsername(text)}
        value={username}
        placeholder="Enter your username"
        autoCapitalize="none"
      />
      <CountryDropdown setSelectedCallback={setCountryId} />
      <CardInput
        label="Email"
        onChangeText={(text) => setEmail(text)}
        value={email}
        placeholder="Enter your email address"
        autoCapitalize="none"
      />
      <CardInput
        label="Password"
        onChangeText={(text) => setPassword(text)}
        value={password}
        placeholder="Enter your password"
        secureTextEntry
        autoCapitalize="none"
      />
      <CardInput
        label="Confirm Password"
        onChangeText={(text) => setConfirmPassword(text)}
        value={confirmPassword}
        placeholder="Re-type your password"
        secureTextEntry
        autoCapitalize="none"
      />
      <TextButton
        text="Sign up"
        onPress={signUpWithEmail}
        enabled={signUpEnabled}
      />
      <TextDivider text="or" style={styles.divider} />
      <TextButton text="Log in" onPress={redirectToLogin} />
    </SafeAreaView>
  );
}
