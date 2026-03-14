import { useEffect } from 'react';
import { Stack, useRouter, useSegments } from 'expo-router';
import { AuthProvider, useAuth } from '../src/auth/AuthContext';
import { View, ActivityIndicator } from 'react-native';
import { colors } from '@/theme';

function RootLayoutNav() {
  const { user, loading } = useAuth();
  const segments = useSegments();
  const router = useRouter();

  useEffect(() => {
    if (loading) return;

    const inAuthGroup = segments[0] === '(auth)';

    if (!user && !inAuthGroup) {
      // Redirect to the login page if not authenticated and not in auth group
      router.replace('/(auth)/login');
    } else if (user && inAuthGroup) {
      // Redirect away from login page if authenticated
      router.replace('/(tabs)/feed');
    }
  }, [user, loading, segments]);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: colors.background }}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="(auth)" options={{ headerShown: false }} />
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen 
        name="job/[id]" 
        options={{ 
          headerShown: true, 
          headerTitle: 'Job Detail',
          headerTintColor: colors.primary,
          headerStyle: { backgroundColor: colors.surface },
        }} 
      />
      <Stack.Screen 
        name="event/[id]" 
        options={{ 
          headerShown: true, 
          headerTitle: 'Event Details',
          headerTintColor: colors.primary,
          headerStyle: { backgroundColor: colors.surface },
        }} 
      />
      <Stack.Screen 
        name="post/[id]" 
        options={{ 
          headerShown: true, 
          headerTitle: 'Post',
          headerTintColor: colors.primary,
          headerStyle: { backgroundColor: colors.surface },
        }} 
      />
      <Stack.Screen 
        name="messages/[id]" 
        options={{ 
          headerShown: true, 
          headerTitle: 'Chat',
          headerTintColor: colors.primary,
          headerStyle: { backgroundColor: colors.surface },
        }} 
      />
    </Stack>
  );
}

export default function RootLayout() {
  return (
    <AuthProvider>
      <RootLayoutNav />
    </AuthProvider>
  );
}
