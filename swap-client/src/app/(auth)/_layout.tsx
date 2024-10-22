import { useTheme } from '@ui-kitten/components';
import { Redirect, Stack } from 'expo-router';

import { useAuth } from '../../providers/AuthProvider';

export default function AuthLayout() {
  const { session } = useAuth();
  const theme = useTheme();

  if (session) {
    return <Redirect href="/(app)/" />;
  }

  return (
    <Stack
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: theme['color-basic-500'] },
      }}
    />
  );
}
