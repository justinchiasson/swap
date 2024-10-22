import { Redirect, Stack } from 'expo-router';

import { useAuth } from '../../providers/AuthProvider';

export default function AppLayout() {
  const { session, loading } = useAuth();

  if (!session) {
    return <Redirect href="/(auth)/login" />;
  } else {
    return <Stack />;
  }
}
