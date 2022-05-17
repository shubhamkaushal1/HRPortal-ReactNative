import {ImageBackground, StyleSheet, View, Text} from 'react-native';
import React from 'react';
import { TouchableOpacity } from 'react-native-gesture-handler';

export default function WelcomeScreen ({navigation}) {
  return (
     <ImageBackground
      style={{height:800}}
      source={require('../assets/background.jpg')}>
      <TouchableOpacity onPress={() => navigation.navigate('Sign In')}>
        <Text style={{color: 'white',fontWeight: 'bold', fontSize:32, textAlign: 'center', marginVertical: 300 }}>Sign In</Text>
      </TouchableOpacity>
     </ImageBackground>
  )
}