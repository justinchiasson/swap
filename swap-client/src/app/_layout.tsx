import * as eva from '@eva-design/eva';
import {
  PublicSans_400Regular,
  PublicSans_600SemiBold,
  PublicSans_700Bold,
  useFonts,
} from '@expo-google-fonts/public-sans';
import { ApplicationProvider } from '@ui-kitten/components';
import { Slot } from 'expo-router';
import { useEffect } from 'react';

import AuthProvider from '../providers/AuthProvider';
import { default as mapping } from '../themes/mapping.json';
import { default as darkTheme } from '../themes/theme-dark.json';

export default function RootLayout() {
  const [fontsLoaded, fontError] = useFonts({
    PublicSans_400Regular,
    PublicSans_600SemiBold,
    PublicSans_700Bold,
  });

  useEffect(() => {
    if (fontsLoaded || fontError) {
      // TODO: Hide splash screen
    }
  }, [fontsLoaded, fontError]);

  if (!fontsLoaded && !fontError) {
    return null;
  }

  return (
    <ApplicationProvider {...eva} theme={darkTheme} customMapping={mapping}>
      <AuthProvider>
        <Slot />
      </AuthProvider>
    </ApplicationProvider>
  );
}
