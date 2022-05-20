import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Alert} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import firebase from 'firebase/compat/app';
import auth from '@react-native-firebase/auth';
import {LoggingOut} from "../api/firebaseMethods";


export default function Dashboard({ navigation }) {

  const profile = navigation.state.params.user.additionalUserInfo.profile;
  const mobile = JSON.stringify(navigation.state.params.user.user.phoneNumber);
  const user_profile_data = JSON.parse(JSON.stringify(profile));
  const name = user_profile_data.name;
  const email = user_profile_data.email;
  console.log(navigation);

  const handlePress = () => {
    LoggingOut();
    console.log("hello")
    navigation.replace('SignIn');
  };

  return (
    <View>
      <Text>Dashboard</Text>
      <Text >Hi {name}</Text>
      <Text >Hi {mobile}</Text>
      <Text>Welcome {email} </Text>
        {/* <Text onPress={handlePress} >Log Out</Text> */}
    </View>
  )
}