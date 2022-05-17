
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
// import * as firebase from 'firebase';
import firebase from 'firebase/compat/app';
import apiKeys from './config/keys';
import WelcomeScreen from './screens/WelcomeScreen';
// import SignUp from './screens/SignUp';
import SignIn from './screens/SignIn';
import LoadingScreen from './screens/LoadingScreen--';
import DashboardScreen from './screens/DashboardScreen';
import { LogBox } from 'react-native';


// import 'firebase/compat/auth';
// import 'firebase/compat/firestore';


const Stack = createStackNavigator();

export default function App() {
  LogBox.ignoreLogs([
    'Non-serializable values were found in the navigation state',
  ]);
  if (!firebase.apps.length) {
    console.log('Connected with Firebase')
    firebase.initializeApp(apiKeys.firebaseConfig);
  }

  return (
    <NavigationContainer>
      <Stack.Navigator>
      {/* <Stack.Screen name={'Loading'} component={LoadingScreen} options={{ headerShown: false }}/> */}
      <Stack.Screen name='Home' component={WelcomeScreen} options={{ headerShown: false }}/>
      {/* <Stack.Screen name='Sign Up' component={SignUp} options={{ headerShown: false }}/> */}
      <Stack.Screen name='Sign In' component={SignIn} options={{ headerShown: false }}/>
      <Stack.Screen name={'Dashboard'} component={DashboardScreen} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}