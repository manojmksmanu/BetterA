// src/components/RememberMeSwitch.tsx
import React from 'react';
import {View, Text, Switch, StyleSheet} from 'react-native';
import {RememberMeSwitchProps} from '../interfaces/FormInterFaces'; // Import the interface

const RememberMeSwitch: React.FC<RememberMeSwitchProps> = ({
  value,
  onValueChange,
}) => {
  return (
    <View style={styles.switchContainer}>
      <Text>Remember Me</Text>
      <Switch value={value} onValueChange={onValueChange} />
    </View>
  );
};

const styles = StyleSheet.create({
  switchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
});

export default RememberMeSwitch;
