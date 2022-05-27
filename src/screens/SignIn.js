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
 import { TouchableOpacity } from 'react-native-gesture-handler';
 import {
   ImageBackground, 
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
import { useSelector, useDispatch } from 'react-redux';
import { setDetails, setToken } from '../redux/actions/useractions';

 const SignIn: () => Node = ({navigation}) => {
  const { details, token } = useSelector(state => state.userReducer);
  const dispatch = useDispatch();

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
    //  console.log(user.additionalUserInfo.profile);
     const userProfile = user.additionalUserInfo.profile;
     dispatch(setDetails(userProfile));
     dispatch(setToken(idToken));
    navigation.navigate('Dashboard');

   }).catch((error)=>{
     console.log("error",error)
  })
   }


   return (
    <ImageBackground
    style={{height:800,flex:1,justifyContent:'center',alignItems:'center'}}
    source={require('../../assets/background.jpg')}>
    <TouchableOpacity onPress={() => navigation.navigate('Sign In')}>
    <Button
         title="Sign In With 
         Google"  
         onPress={signInWithGoogleAsync}    
       />
    </TouchableOpacity>
    </ImageBackground>
     
   );
 };
 
 
 export default SignIn;
 