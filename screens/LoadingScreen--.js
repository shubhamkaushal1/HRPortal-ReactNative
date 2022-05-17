import React, { useEffect } from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import firebase from 'firebase/compat/app';

export default function LoadingScreen({ navigation }) {
  useEffect(
     () => {
      firebase.auth().onAuthStateChanged((user) => {
        if (user) {
          navigation.replace('Dashboard');
        } else {
          navigation.replace('Home');
        }
      });
    }
  );

  return (
    <View >
      <ActivityIndicator size='large' />
    </View>
  );
}