/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App'; // Make sure App is imported correctly
import {name as appName} from './app.json'; // appName should match the name in app.json

AppRegistry.registerComponent(appName, () => App);

