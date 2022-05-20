
import React from 'react';
import {
  createAppContainer,
  createSwitchNavigator
} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack'
import {createBottomTabNavigator} from 'react-navigation-tabs';
import firebase from 'firebase/compat/app';
import apiKeys from './config/keys';
import SignIn from './src/screens/SignIn';
import DashboardScreen from './src/screens/DashboardScreen';
import AttendenceScreen from './src/screens/AttendenceScreen';
import { LogBox } from 'react-native';
import { Provider as AuthProvider } from './src/context/AuthContext';
import { setNavigator } from './src/navigationRef';
import { connect } from 'react-redux';
import { changeCount } from './actions/counts';
import { bindActionCreators } from 'redux';

// const Stack = createStackNavigator();

const switchNavigator = createSwitchNavigator({
  loginFlow:createStackNavigator({
    SignIn: SignIn
  }),
  mainFlow:createBottomTabNavigator({
    Dashboard : DashboardScreen,
    Attendence : AttendenceScreen
  })
})



const App = createAppContainer(switchNavigator);

export default () => {

  LogBox.ignoreLogs([
    'Non-serializable values were found in the navigation state',
  ]);
  if (!firebase.apps.length) {
    console.log('Connected with Firebase')
    firebase.initializeApp(apiKeys.firebaseConfig);
  }
  return (
    <AuthProvider>
      <App ref={(navigator) => { setNavigator(navigator) }}/>
    </AuthProvider>
  )
}