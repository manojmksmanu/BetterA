import React, {useState} from 'react';
import {
  TextInput,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
} from 'react-native';

interface CustomTextInputProps {
  value: string;
  onChangeText: (text: string) => void;
  placeholder: string;
  secure?: boolean;
  onBlur: any;
  errorMessage?: any; // Changed to string instead of any for error messages
}

const CustomTextInput: React.FC<CustomTextInputProps> = ({
  value,
  onChangeText,
  placeholder,
  secure = false,
  onBlur,
  errorMessage,
}) => {
  const [isSecure, setIsSecure] = useState(secure);

  const togglePasswordVisibility = () => {
    setIsSecure(prevState => !prevState);
  };

  return (
    <View style={{ paddingBottom: 20}}>
      <View
        style={[
          styles.inputContainer,
          errorMessage ? styles.errorBorder : null, // Apply error border if there's an error
        ]}>
        <TextInput
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          secureTextEntry={isSecure}
          onBlur={onBlur}
          style={styles.input}
        />
        {secure && (
          <TouchableOpacity
            onPress={togglePasswordVisibility}
            style={styles.eyeIcon}>
            {isSecure ? (
              <Image
                style={{width: 20, height: 20}}
                source={require('../assets/eye.png')}
              />
            ) : (
              <Image
                style={{width: 20, height: 20}}
                source={require('../assets/openeye.png')}
              />
            )}
          </TouchableOpacity>
        )}
      </View>
      {errorMessage && (
        <Text style={styles.errorText}>{errorMessage}</Text> // Show error message if it exists
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    position: 'relative',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderColor: '#ddd',
    borderWidth: 2,
    borderRadius: 12,
    paddingLeft: 10,
  },
  input: {
    fontSize: 18,
    color: '#1A2421',
    width: '90%',
    paddingRight: 12, // Space for the eye icon
  },
  eyeIcon: {
    position: 'absolute',
    right: 10,
    top: '50%',
    transform: [{translateY: -10}],
  },
  errorBorder: {
    borderColor: '#EF0107', // Red border for error
  },
  errorText: {
    color: 'red', // Red text color for error messages
    fontSize: 12,
    marginTop: 5,
    position:'absolute',
    bottom:2,
    marginLeft:10

  },
});

export default CustomTextInput;
