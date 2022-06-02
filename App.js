
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
// import * as firebase from 'firebase';
import firebase from 'firebase/compat/app';
import apiKeys from './config/keys';
// import SignUp from './screens/SignUp';
import SignIn from './src/screens/SignIn';
import Dashboard from './src/screens/DashboardScreen';
import Attendence from './src/screens/AttendenceScreen';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
// import { LogBox } from 'react-native';
import { View, Text, StyleSheet, Alert,Switch,Button,LogBox} from 'react-native';
import { Provider } from 'react-redux';
import Store from './src/redux/store';
import SplashScreen from  "react-native-splash-screen";
import { createDrawerNavigator } from '@react-navigation/drawer';
// import { createDrawerNavigator} from '@react-navigation/'

function HomeScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Button
        onPress={() => navigation.navigate('Notifications')}
        title="Go to notifications"
      />
    </View>
  );
}

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

export default function App() {
  LogBox.ignoreLogs([
    'Non-serializable values were found in the navigation state',
    'Possible Unhandled Promise Rejection'
  ]);
  React.useEffect(() => {
    SplashScreen.hide();
  });
  if (!firebase.apps.length) {
    console.log('Connected with Firebase')
    firebase.initializeApp(apiKeys.firebaseConfig);
  }
  const Drawer = createDrawerNavigator();
  const test =1;
  return (
    <Provider store={Store}>
      {/* <NavigationContainer> */}
        {/* <Stack.Navigator>
        <Stack.Screen name={'Sign In'} component={SignIn} options={{ headerShown: false }}/>
        <Stack.Screen name={'Dashboard'} component={Dashboard} options={{ headerShown: false }} />
        <Stack.Screen name={'Attendence'} component={Attendence} options={{ headerShown: false }} />
        </Stack.Navigator> */}
        {/* <Drawer.Navigator useLegacyImplementation>
        <Drawer.Screen name={'SignIn'} component={SignIn} />
        <Drawer.Screen name={'Dashboard'} component={Dashboard} />
        <Drawer.Screen name={'Attendence'} component={Attendence} />
      </Drawer.Navigator>
      </NavigationContainer> */}
  
      <NavigationContainer>
        
      <Drawer.Navigator useLegacyImplementation>
        <Drawer.Screen name="SignIn" component={SignIn} options={{ headerShown: false,drawerLabel: () => null }}/>
        <Drawer.Screen name="Dashboard" component={Dashboard} />
        <Drawer.Screen name="Attendence" component={Attendence} />
      </Drawer.Navigator>
    </NavigationContainer>
    </Provider>
  );
}

const styles=StyleSheet.create({
  hide:{
    display:'none'
  }
})