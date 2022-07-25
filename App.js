
import React from 'react';
// import {NavigationContainer} from '@react-navigation/native';
// import {createStackNavigator} from '@react-navigation/stack';
// import * as firebase from 'firebase';
import firebase from 'firebase/compat/app';
import apiKeys from './config/keys';
// import SignUp from './screens/SignUp';
import SignIn from './src/screens/SignIn';
import Dashboard from './src/screens/DashboardScreen';
import Attendence from './src/screens/AttendenceScreen';
import LeaveApplyScreen from './src/screens/LeaveApplyScreen';
import ReportSubmitScreen from './src/screens/ReportSubmitScreen';
import Leavelist from './src/screens/LeavesScreen';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import { View, Text, StyleSheet, Alert,Switch,Button,LogBox} from 'react-native';
import { Provider } from 'react-redux';
import Store from './src/redux/store';
import SplashScreen from  "react-native-splash-screen";
import { createDrawerNavigator } from '@react-navigation/drawer';
import LeaveDetails from './src/screens/LeaveDetailsScreen';
import AnnouncementScreen from './src/screens/AnnouncementScreen';
import TaskHistoryScreen from './src/screens/TaskHistoryScreen';
import EventsScreen from './src/screens/EventsScreen';
import Another from './src/component/Another';
import Toast from 'react-native-toast-message';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
// import ToastManager, { Toast } from './src/component/ToastManager';
const Drawer = createDrawerNavigator();
// const Stack = createStackNavigator();
const Stack = createNativeStackNavigator();

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
      <NavigationContainer>
   
        

        <Drawer.Navigator useLegacyImplementation screenOptions={{ drawerStyle: { backgroundColor: '#FFF', width: 240 } }}>
          <Drawer.Screen name="SignIn" component={SignIn} options={{ headerShown: false,    drawerItemStyle: {
       display: "none",
     }, drawerLabel: () => null }}/>
          <Drawer.Screen name="Dashboard" component={Dashboard} options={{ headerStyle: { backgroundColor: '#28AAF9', }, headerShown: true, headerTitle:()=>null, headerTintColor: '#fff', headerTitleStyle: { fontWeight: 'bold', } }}/>
          <Drawer.Screen name="Attendence" component={Attendence} options={{ headerShown: true,headerTitle:()=>null }}/>
          <Drawer.Screen name="LeaveApplyScreen" component={LeaveApplyScreen} options={{ headerShown: true, drawerItemStyle: {display: "none"},headerTitle:()=>null }}/>
          <Drawer.Screen name="Leaves" component={Leavelist} options={{ headerShown: true,headerTitle:()=>null }}/>
          <Drawer.Screen name="LeaveDetails" component={LeaveDetails} options={{ headerShown: true,    drawerItemStyle: {
       display: "none",
     },headerTitle:()=>null }}/>
          <Drawer.Screen name="Report Submit" component={ReportSubmitScreen} options={{ headerShown: true, drawerItemStyle: {display: "none"},headerTitle:()=>null }}/>
          <Drawer.Screen name="Announcement" component={AnnouncementScreen} options={{ headerShown: true,headerTitle:()=>null }}/>
          <Drawer.Screen name="Tasks History" component={TaskHistoryScreen} options={{ headerShown: true,headerTitle:()=>null }}/>
          <Drawer.Screen name="EventsScreen" component={EventsScreen} options={{ headerShown: true,headerTitle:()=>null }}/>
          
          
          
        </Drawer.Navigator>
    </NavigationContainer>
    <Toast />
    {/* <ToastManager />
    <Another /> */}
    </Provider>
  );
}


const styles=StyleSheet.create({
  hide:{
    display:'none'
  }
})