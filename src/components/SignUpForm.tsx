import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  Button,
  Alert,
} from 'react-native';
import {Formik} from 'formik';
import * as Yup from 'yup';
import CustomTextInput from './CustomTextInput';

// Validation schema with password requirements
const SignUpSchema = Yup.object().shape({
  email: Yup.string()
    .email('Invalid email address')
    .required('Email is required'),
  password: Yup.string()
    .min(6, 'Password must be at least 6 characters')
    .matches(/[0-9]/, 'Password must contain a number')
    .matches(
      /[!@#$%^&*(),.?":{}|<>]/,
      'Password must contain a special character',
    )
    .required('Password is required'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password')], 'Passwords must match')
    .required('Confirm Password is required'),
});
interface SignUpFormProps {
  setIsSignUp: (value: boolean) => void;
}

const SignUpForm: React.FC<SignUpFormProps> = ({setIsSignUp}) => {
  const [passwordStrength, setPasswordStrength] = useState({
    hasNumber: false,
    hasSpecialChar: false,
    hasMinLength: false,
  });

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);

  console.log(setIsSignUp, 'allvalues');
  const handleSubmit = async (values: any) => {
    console.log(values, 'values');
    setIsLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      Alert.alert('Success', 'Account created successfully!');
      setIsSignUp(false);
      // onSuccess?.();
    } catch (error:any) {
      console.log(error.message);
      Alert.alert('Error', 'Failed to create account');
    } finally {
      setIsSignUp(false);
      setIsLoading(false);
    }
  };

  // Function to handle password strength
  const handlePasswordChange = (password: string) => {
    setPassword(password);
    const hasNumber = /\d/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
    const hasMinLength = password.length >= 6;

    setPasswordStrength({
      hasNumber,
      hasSpecialChar,
      hasMinLength,
    });
  };

  useEffect(() => {
    // Reset password strength indicators when confirm password is updated
    setPasswordStrength({
      hasNumber: false,
      hasSpecialChar: false,
      hasMinLength: false,
    });
  }, [confirmPassword]);

  return (
    <ScrollView keyboardShouldPersistTaps="handled">
      <SafeAreaView style={styles.container}>
        <Text style={styles.header}>Sign Up</Text>
        <Formik
          initialValues={{email: '', password: '', confirmPassword: ''}}
          validationSchema={SignUpSchema}
          onSubmit={values => {
            handleSubmit({
              email: values.email,
              password: values.password,
              confirmPassword: values.confirmPassword,
            });
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
            // Log errors and touched to verify
            console.log('Errors:', errors);
            console.log('Touched:', touched);

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
                  onChangeText={text => {
                    handleChange('password')(text);
                    handlePasswordChange(text);
                  }}
                  placeholder="Password"
                  secure={true}
                  onBlur={handleBlur('password')}
                  errorMessage={touched.password && errors.password}
                />

                {/* Confirm Password input */}
                <CustomTextInput
                  value={values.confirmPassword}
                  onChangeText={handleChange('confirmPassword')}
                  onBlur={handleBlur('confirmPassword')}
                  placeholder="Confirm Password"
                  secure={true}
                  errorMessage={
                    touched.confirmPassword && errors.confirmPassword
                  } // Pass error only if the field was touched and has an error
                />

                {/* Submit button */}
                <TouchableOpacity
                  onPress={() => handleSubmit()}
                  disabled={!isValid || !dirty}
                  style={[
                    styles.button,
                    (!isValid || !dirty) && styles.disabledButton,
                  ]}>
                  <Text style={styles.buttonText}>Submit</Text>
                </TouchableOpacity>
              </View>
            );
          }}
        </Formik>

        {/* Password Strength Indicators */}
        <View style={styles.passwordStrengthContainer}>
          <Text
            style={[
              styles.passwordStrengthText,
              passwordStrength.hasMinLength && styles.strong,
            ]}>
            1. Password must be at least 6 characters
          </Text>
          <Text
            style={[
              styles.passwordStrengthText,
              passwordStrength.hasNumber && styles.strong,
            ]}>
            2. Must contain a number
          </Text>
          <Text
            style={[
              styles.passwordStrengthText,
              passwordStrength.hasSpecialChar && styles.strong,
            ]}>
            3. Must contain a special character
          </Text>
        </View>
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
  errorText: {
    color: 'red',
    fontSize: 12,
    marginBottom: 10,
  },
  passwordStrengthContainer: {
    marginVertical: 10,
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
  passwordStrengthText: {
    fontSize: 14,
    color: '#555',
  },
  strong: {
    color: 'green',
  },
});

export default SignUpForm;
