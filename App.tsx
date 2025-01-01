import React from 'react';
import type {PropsWithChildren} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';
import AuthScreen from './src/screens/AuthScreen';

function App(): React.JSX.Element {
  return <View style={styles.container}>
    {/* <Text>hello</Text> */}
    <AuthScreen/>
  </View>;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // padding: 20,
    // backgroundColor: 'grey',
  },
});

export default App;
