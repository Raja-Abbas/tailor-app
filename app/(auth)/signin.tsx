import { supabase } from '@/hooks/supabase';
import { router } from 'expo-router';
import { useState } from 'react';
import { Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import Onboarding from '../../components/Onboarding';

export default function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [showOnboarding, setShowOnboarding] = useState(true);

  const handleSignIn = async () => {
    setLoading(true);

    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
      alert(`Sign-in failed: ${error.message}`);
    } else {
      alert('Signed in successfully!');
      router.replace('/(tabs)'); // Redirect to the tabs screen
    }
    setLoading(false);
  };

  if (showOnboarding) {
    return <Onboarding onSkip={() => setShowOnboarding(false)} />;
  }

  return (
    <View style={styles.container}>
      <Image source={require('../../assets/images/logo.png')} style={styles.logo} />
      <Text style={styles.subtitle}>where style and comfort meet</Text>
      <Text style={styles.title}>Sign In</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        keyboardType="email-address"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <TouchableOpacity style={styles.button} onPress={handleSignIn} disabled={loading}>
        <Text style={styles.buttonText}>{loading ? 'Loading...' : 'Sign In'}</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.link} onPress={() => router.replace('/signup')}>
        <Text style={styles.linkText}>Don't have an account? Sign Up</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    width: 300,
    minWidth: 300,
    margin: 'auto',
  },
  logo: {
    width: 180,
    height: 100,
    resizeMode: 'contain',
    marginBottom: -4,
  },
  subtitle: {
    fontSize: 15,
    color: '#666',
    textAlign: 'center',
    marginBottom: 20,
    marginTop: -20,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    fontWeight: 'bold',
  },
  input: {
    width: '100%',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    borderRadius: 6,
  },
  button: {
    width: '100%',
    height: 40,
    backgroundColor: '#000080',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
    borderRadius: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
  link: {
    marginTop: 10,
  },
  linkText: {
    color: '#000080',
    fontSize: 16,
  },
}); 