import React from 'react';
import { StyleSheet, View,Text,SafeAreaView,ScrollView,FlatList,Image,Button } from 'react-native';
// import leaveArr from '../component/LeavesList';
// import DropdownComponent from '../component/ApplyLeaveForm';
import LeaveListComponent from '../component/LeavesList'
import { Card, ListItem, Icon,Header } from 'react-native-elements';
import AttendenceScreen from '../screens/AttendenceScreen' ;
import { useNavigation } from '@react-navigation/native';
import Applyleave from './LeaveApplyScreen';
// import Dashboard from './DashboardScreen';
import { createStackNavigator } from '@react-navigation/stack';
import Dashboard from './DashboardScreen';
export default function Leavelist({ navigation }) {
    const Stack = createStackNavigator();

  return (
      <View>
           <Button
          title={`Go to `}
          onPress={() => navigation.navigate(Applyleave)}
        />
    <LeaveListComponent />
    </View>
  );
};
