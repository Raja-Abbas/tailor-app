import { router } from 'expo-router';
import { useEffect } from 'react';

export default function AuthIndex() {
  useEffect(() => {
    const timer = setTimeout(() => {
      router.replace('/signin');
    }, 100); // Delay navigation by 100ms

    return () => clearTimeout(timer); // Cleanup the timer on unmount
  }, []);

  return null;
} 