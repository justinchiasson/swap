import { Text } from '@ui-kitten/components';
import { router } from 'expo-router';
import { useState } from 'react';
import { Alert, ScrollView, StyleSheet, View } from 'react-native';

import CardInput from '../../components/CardInput/CardInput';
import SwapLogoWithText from '../../components/SwapLogoWithText/SwapLogoWithText';
import TextButton from '../../components/TextButton/TextButton';
import TextDivider from '../../components/TextDivider/TextDivider';
import TextLink from '../../components/TextLink/TextLink';
import { supabase } from '../../services/supabase';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const styles = StyleSheet.create({
    container: {
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'column',
      marginTop: '12%',
    },
    loginButton: {
      marginTop: 5,
    },
    header: {
      marginBottom: 15,
    },
    divider: {
      width: '33%',
      marginBottom: 10,
    },
    linkContainer: {
      width: '71%',
      flexDirection: 'row',
      justifyContent: 'flex-end',
    },
    forgotPassword: {
      marginTop: -7,
      marginBottom: 4,
    },
  });

  const loginWithEmail = async () => {
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) Alert.alert(error.message);
    setLoading(false);
  };

  const redirectToSignUp = () => {
    router.replace('/(auth)/sign-up');
  };

  const redirectToForgotPassword = () => {
    router.replace('/(auth)/forgot-password');
  };

  return (
    <ScrollView
      contentContainerStyle={styles.container}
      contentInsetAdjustmentBehavior="automatic"
    >
      <SwapLogoWithText />
      <Text category="h4" style={styles.header}>
        Welcome Back
      </Text>
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
      <View style={styles.linkContainer}>
        <TextLink
          text="Forgot Password?"
          onPress={redirectToForgotPassword}
          style={styles.forgotPassword}
        />
      </View>
      <TextButton
        text="Log In"
        onPress={loginWithEmail}
        appearance="light"
        style={styles.loginButton}
      />
      <TextDivider text="or" style={styles.divider} />
      <TextButton text="Sign Up" onPress={redirectToSignUp} />
    </ScrollView>
  );
}
