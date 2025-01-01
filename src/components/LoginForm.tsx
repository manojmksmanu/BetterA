import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import {Formik} from 'formik';
import * as Yup from 'yup';
import CustomTextInput from './CustomTextInput';

// Validation schema for login (only email and password)
const LoginSchema = Yup.object().shape({
  email: Yup.string()
    .email('Invalid email address')
    .required('Email is required'),
  password: Yup.string()
    .min(6, 'Password must be at least 6 characters')
    .required('Password is required'),
});

const LoginForm = () => {
  return (
    <ScrollView keyboardShouldPersistTaps="handled">
      <SafeAreaView style={styles.container}>
        <Text style={styles.header}>Login</Text>
        <Formik
          initialValues={{email: '', password: ''}}
          validationSchema={LoginSchema}
          onSubmit={values => {
            console.log('Form submitted with values:', values);
          }}>
          {({
            handleChange,
            handleBlur,
            handleSubmit,
            values,
            errors,
            touched,
            isValid,
            dirty,
          }) => {
            return (
              <View style={styles.formContainer}>
                {/* Email input */}
                <CustomTextInput
                  value={values.email}
                  onChangeText={handleChange('email')}
                  onBlur={handleBlur('email')}
                  placeholder="Email"
                  errorMessage={touched.email && errors.email}
                />

                {/* Password input */}
                <CustomTextInput
                  value={values.password}
                  onChangeText={handleChange('password')}
                  placeholder="Password"
                  secure={true}
                  onBlur={handleBlur('password')}
                  errorMessage={touched.password && errors.password}
                />

                {/* Submit button */}
                <TouchableOpacity
                  onPress={() => handleSubmit()}
                  disabled={!isValid || !dirty}
                  style={[
                    styles.button,
                    (!isValid || !dirty) && styles.disabledButton,
                  ]}>
                  <Text style={styles.buttonText}>Login</Text>
                </TouchableOpacity>
              </View>
            );
          }}
        </Formik>
      </SafeAreaView>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  header: {
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#24A0ED',
  },
  formContainer: {
    marginTop: 20,
  },
  button: {
    backgroundColor: '#24A0ED', // Set button background color
    paddingVertical: 10, // Padding for vertical size
    paddingHorizontal: 20, // Padding for horizontal size
    borderRadius: 10, // Rounded corners
    alignItems: 'center', // Center the text horizontally
    justifyContent: 'center', // Center the text vertically
    marginTop: 10, // Margin to give space from other elements
  },
  buttonText: {
    color: '#fff', // White text color
    fontSize: 20, // Set text size
    fontWeight: 'bold', // Make the text bold
  },
  disabledButton: {
    backgroundColor: '#D3D3D3', // Light gray when disabled
  },
});

export default LoginForm;
