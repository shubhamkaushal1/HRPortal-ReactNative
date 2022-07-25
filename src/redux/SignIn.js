import React, { useState, useEffect } from 'react';
import type { Node } from 'react';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { GoogleSignin, GoogleSigninButton } from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth';
import Mink from "../../assets/Mink.svg";
import {
  ImageBackground,
  Image,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  Button,
  // AsyncStorage
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import 'firebase/compat/auth';
import { useSelector, useDispatch } from 'react-redux';
import { setDetails, setToken, setJWT, setAppUrl, setLeavetype, setLeavelist, setTaskList, setAnnoucementList, setTaskReport, setEventsList } from '../redux/actions/useractions';


const SignIn: () => Node = ({ navigation }) => {
  
  const dispatch = useDispatch();
  const apiUrl = 'https://8c8c-203-145-168-10.ngrok.io';
  const displayData = async () => {
    try {
      const checkJwt = async () => {
        var oldjwtToken = await AsyncStorage.getItem('jwtToken');
        
        if(oldjwtToken){
          console.log('oldjwtToken');
          try {
         
          
            
            const response = await fetch(`${apiUrl}/api/secret-route`, {
              method: 'GET',
              headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${oldjwtToken}` },
              // body: JSON.stringify({})
            });
  
            // console.log(response);
            const result = await response.json();
            console.log('Here',result);
            if (result.success == true) {
              navigation.navigate('Dashboard');
            }
          }
          catch (err) {
            throw err;
            console.log(err);
          }
        }


      };
      checkJwt();

    }
    catch (error) {
      alert(error)
    }
  }
  displayData();


  const { details, token, jwt } = useSelector(state => state.userReducer);
  // console.log('jwt3',jwt);


  GoogleSignin.configure({
    webClientId: '1040528052761-t3f42v2jiccs82j283v62grsvc1l7hg3.apps.googleusercontent.com',
  });

  const signInWithGoogleAsync = async () => {
    // Get the users ID token
    const { idToken } = await GoogleSignin.signIn();
    console.log('idToken');
    // Create a Google credential with the token 
    const googleCredential = auth.GoogleAuthProvider.credential(idToken);

    // Sign-in the user with the credential')
    const user_sign_in = auth().signInWithCredential(googleCredential);
    //  const datas = useSelector(state => state.userReducer);
    //  console.log('all data',datas);
    user_sign_in.then((user) => {
      
      const data = {
        name: user.additionalUserInfo.profile.name,
        email: user.additionalUserInfo.profile.email,
        firebase_token: idToken
      }
      const apiUrl = 'https://8c8c-203-145-168-10.ngrok.io';
      let jwt;
      dispatch(setAppUrl(apiUrl));
      if (idToken) {
        const SignUp = async () => {
          console.log("sign");
          try {
            console.log(apiUrl);
            const response = await fetch(`${apiUrl}/api/sign-up`, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify(data)
            });
            // console.log("resposse",response)
            const result = await response.json();
            // console.log("result",result)
            jwt = result.data.token;
            // console.log("jwt",jwt)

            dispatch(setJWT(jwt));
            // dispatch(setAppUrl(apiUrl));
          }
          catch (err) {
            throw err;
            console.log(err);
          }
          if (jwt != null) {
            console.log('dcccxxx');
            AsyncStorage.setItem('jwtToken', jwt);
            navigation.navigate('Dashboard');

          } else {
            console.error('Not Signed in');
          }

        };

        SignUp()
      }
      const userProfile = user.additionalUserInfo.profile;
      dispatch(setDetails(userProfile));
      dispatch(setToken(idToken));
      // console.log('jwt2',jwt);


    }).catch((error) => {
      console.log("sdgsdg", error)
    })

  }


  return (
    <View style={{ height: 800, flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: "#38A1F2", alignContent: 'center', justifyContent: 'center' }}>

      <View>
        <Mink width={400} height={100} />
      </View>
      <View style={{ marginTop: 150, justifyContent: 'center', alignItems: 'center' }}>
        <Text style={{ fontSize: 24, fontWeight: 'bold', fontFamily: 'Proxima Nova', color: '#fff' }}>SIGN UP</Text>
        <Text style={{ fontSize: 16, fontFamily: 'Proxima Nova', color: '#fff' }}>Create an account to start using Mink</Text>
      </View>
      <View style={{ marginTop: 10 }}>
        <GoogleSigninButton
          style={{ width: 280, height: 60 }}
          size={GoogleSigninButton.Size.Wide}
          color={GoogleSigninButton.Color.Light}
          onPress={signInWithGoogleAsync}
        />
      </View>
    </View>
  );
};


export default SignIn;