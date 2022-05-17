/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

 import React from 'react';
 import type { Node } from 'react';
 import { GoogleSignin } from '@react-native-google-signin/google-signin';
 import auth from '@react-native-firebase/auth';
 import {
   SafeAreaView,
   ScrollView,
   StatusBar,
   StyleSheet,
   Text,
   useColorScheme,
   View,
   Button
 } from 'react-native';
import 'firebase/compat/auth';

 const SignIn: () => Node = ({navigation}) => {
   GoogleSignin.configure({
     webClientId: '1040528052761-t3f42v2jiccs82j283v62grsvc1l7hg3.apps.googleusercontent.com',
   });
 
   const signInWithGoogleAsync = async () => {
     // Get the users ID token
   const { idToken } = await GoogleSignin.signIn();
 
   // Create a Google credential with the token
   const googleCredential = auth.GoogleAuthProvider.credential(idToken);
 
   // Sign-in the user with the credential
   const user_sign_in = auth().signInWithCredential(googleCredential);
 
   user_sign_in.then((user)=>{
    navigation.navigate('Dashboard', {user:user});
     console.log(user,idToken);
   }).catch((error)=>{
     console.log("error",error)
  })
   }
   
   return (
     <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
       <Button
         title="Sign In With 
         Google"  
         onPress={signInWithGoogleAsync}    
       />
     </View>
     
   );
 };
 
 
 export default SignIn;
 