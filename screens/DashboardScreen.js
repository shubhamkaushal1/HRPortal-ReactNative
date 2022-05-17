import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Alert} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import firebase from 'firebase/compat/app';
import auth from '@react-native-firebase/auth';
import {loggingOut} from '../api/firebaseMethods';

export default function Dashboard({ navigation ,route}) {

  // let currentUserUID = user.uid;r
  // console.log(user);
  const [firstName, setFirstName] = useState('');

  // useEffect(() => {
  //   async function getUserInfo(){
  //     let doc = await firebase
  //     .firestore()
  //     .collection('users')
  //     .doc(currentUserUID)
  //     .get();

  //     if (!doc.exists){
  //       Alert.alert('No user data found!')
  //     } else {
  //       let dataObj = doc.data();
  //       setFirstName(dataObj.firstName)
  //     }
  //   }
  //   getUserInfo();
  // })

  const handlePress = () => {
    loggingOut();
    navigation.replace('Home');
  };

  return (
    <View>
      <Text>Dashboard</Text>
      <Text >Hi </Text>
      <Text>Params : {JSON.stringify(route.params)}</Text>
      <TouchableOpacity onPress={handlePress}>
        <Text >Log Out</Text>
      </TouchableOpacity>
    </View>
  )
}