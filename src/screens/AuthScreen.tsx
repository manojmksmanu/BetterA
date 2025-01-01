import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Alert,
  TouchableOpacity,
  Animated,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import SignUpForm from '../components/SignUpForm';
import LoginForm from '../components/LoginForm';

const AuthScreen = () => {
  const [rememberMe, setRememberMe] = useState(false);
  const [savedEmail, setSavedEmail] = useState('');
  const [isSignUp, setIsSignUp] = useState(false); // State to toggle between SignUp and Login forms
  const [animation] = useState(new Animated.Value(0)); // Animation value for transitioning

  useEffect(() => {
    const fetchSavedEmail = async () => {
      const email = await AsyncStorage.getItem('rememberedEmail');
      if (email) setSavedEmail(email);
    };
    fetchSavedEmail();
  }, []);

  const handleRememberMe = async (email: string) => {
    if (rememberMe) {
      await AsyncStorage.setItem('rememberedEmail', email);
    } else {
      await AsyncStorage.removeItem('rememberedEmail');
    }
  };

  const toggleForm = () => {
    Animated.timing(animation, {
      toValue: isSignUp ? 0 : 1, // Toggle animation direction
      duration: 300, // Duration of the transition
      useNativeDriver: true,
    }).start();

    setIsSignUp(!isSignUp); // Toggle form state
  };

  console.log(isSignUp, 'isq');

  return (
    <View style={styles.container}>
      {isSignUp ? (
        <Animated.View
          style={{
            ...styles.formContainer,
          }}>
          <SignUpForm setIsSignUp={setIsSignUp} />
        </Animated.View>
      ) : (
        <Animated.View
          style={{
            ...styles.formContainer,
          }}>
          <LoginForm />
        </Animated.View>
      )}

      <TouchableOpacity onPress={toggleForm} style={styles.switchFormButton}>
        <Text style={styles.switchFormText}>
          {isSignUp
            ? 'Already have an account? Log In'
            : "Don't have an account? Sign Up"}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center', // Vertically center the content
    alignItems: 'center', // Horizontally center the content
    position: 'relative', // Allow absolute positioning inside
  },
  formContainer: {
    // position: 'absolute', // Position forms absolutely within the container
    width: '90%', // Adjust width to prevent overflow
    paddingHorizontal: '5%', // Optional, adjust for padding
  },
  switchFormButton: {
    marginTop: 20,
  },
  switchFormText: {
    fontSize: 16,
    color: '#24A0ED',
    fontWeight: 'bold',
  },
});

export default AuthScreen;
