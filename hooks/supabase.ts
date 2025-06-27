import AsyncStorage from '@react-native-async-storage/async-storage';
import { createClient } from '@supabase/supabase-js';
import 'react-native-url-polyfill/auto';

const supabaseUrl = 'https://sgpskatsctvrtvnowaml.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNncHNrYXRzY3R2cnR2bm93YW1sIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTEwNDk0MjgsImV4cCI6MjA2NjYyNTQyOH0.qXEsara1myNeJMNQNj7AdAplgV4qycOoq0mrqYrD2mg';

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: typeof window !== 'undefined' ? AsyncStorage : undefined,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
}); 