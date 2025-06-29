import { supabase } from '@/hooks/supabase';
import { router } from 'expo-router';
import { useEffect } from 'react';

export default function AuthIndex() {
  useEffect(() => {
    const checkSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        router.replace('/(tabs)'); // Redirect to the home screen if session exists
      } else {
        const timer = setTimeout(() => {
          router.replace('/signin');
        }, 100); // Delay navigation by 100ms
        return () => clearTimeout(timer); // Cleanup the timer on unmount
      }
    };

    checkSession();
  }, []);

  return null;
} 