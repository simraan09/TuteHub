/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import TeacherRegister from './app/Components/Students/RegisterScreen';
import Login from './app/Components/LoginScreen';

AppRegistry.registerComponent(appName, () => Login);
