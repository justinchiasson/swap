import { Session } from '@supabase/supabase-js';
import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { supabase } from './src/lib/supabase';
import Account from './src/screens/Account';
import Auth from './src/screens/Auth';

export default function App() {
  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      console.log('getSession', session);
      setSession(session);
    });

    supabase.auth.onAuthStateChange((_event, session) => {
      console.log('onAuthStateChange', session);
      setSession(session);
    });
  }, []);

  return (
    <View>
      {session?.user ? (
        <Account key={session.user.id} session={session} />
      ) : (
        <Auth />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ddd',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
