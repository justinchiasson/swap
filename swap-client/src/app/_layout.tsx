import * as eva from '@eva-design/eva';
import {
  PlusJakartaSans_500Medium,
  PlusJakartaSans_700Bold,
  useFonts,
} from '@expo-google-fonts/plus-jakarta-sans';
import { ApplicationProvider } from '@ui-kitten/components';
import { Slot } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import { StyleSheet, View } from 'react-native';

import Spinner from '../components/Spinners/Spinner/Spinner';
import AuthProvider from '../providers/AuthProvider';
import { default as mapping } from '../themes/mapping.json';
import { default as lightTheme } from '../themes/theme-light.json';

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [fontsLoaded, fontError] = useFonts({
    PlusJakartaSans_500Medium,
    PlusJakartaSans_700Bold,
    BroadsheetLdo_Regular: require('../../assets/fonts/BroadsheetLdo-vmGL.ttf'),
    BroadsheetLdo_Bold: require('../../assets/fonts/BroadsheetLdoBold-w1W9.ttf'),
    BroadsheetLdo_Italic: require('../../assets/fonts/BroadsheetLdoItalic-mLyv.ttf'),
    BroadsheetLdo_BoldItalic: require('../../assets/fonts/BroadsheetLdoBoldItalic-7BKD.ttf'),
  });

  const styles = StyleSheet.create({
    loadingContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
  });

  useEffect(() => {
    if (fontsLoaded || fontError) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontError]);

  if (!fontsLoaded && !fontError) {
    return (
      <View style={styles.loadingContainer}>
        <Spinner />
      </View>
    );
  }

  return (
    <ApplicationProvider {...eva} theme={lightTheme} customMapping={mapping}>
      <AuthProvider>
        <Slot />
      </AuthProvider>
    </ApplicationProvider>
  );
}
