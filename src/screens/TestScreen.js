import React, { useEffect } from 'react';
import { ActivityIndicator, StyleSheet, View,Text } from 'react-native';
import firebase from 'firebase/compat/app';
import auth from '@react-native-firebase/auth';

export default function TestScreen({ navigation }) {
    // navigation.replace('TestScreen');
  // useEffect(
  //    () => {
  //     firebase.auth().onAuthStateChanged((user) => {
  //       if (user) {
  //         navigation.replace('Dashboard');
  //       } else {
  //         navigation.replace('Sign In');
  //       }
  //     });
  //   }
  // );

  return (
    <View >
     <Text>Here</Text>
    </View>
  );
}