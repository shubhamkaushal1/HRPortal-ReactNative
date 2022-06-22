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
  Button
} from 'react-native';

import 'firebase/compat/auth';
import { useSelector, useDispatch } from 'react-redux';
import { setDetails, setToken, setJWT, setAppUrl,setLeavetype,setLeavelist,setTaskList,setAnnoucementList,setTaskReport } from '../redux/actions/useractions';


const SignIn: () => Node = ({navigation}) => {
  const { details, token, jwt } = useSelector(state => state.userReducer);
  // console.log('jwt3',jwt);
  const dispatch = useDispatch();

   GoogleSignin.configure({
     webClientId: '1040528052761-t3f42v2jiccs82j283v62grsvc1l7hg3.apps.googleusercontent.com',
   });
   
   const signInWithGoogleAsync = async () => {
     // Get the users ID token
   const { idToken } = await GoogleSignin.signIn(); 
 
   // Create a Google credential with the token 
   const googleCredential = auth.GoogleAuthProvider.credential(idToken);
 
   // Sign-in the user with the credential')
   const user_sign_in = auth().signInWithCredential(googleCredential);
  //  const datas = useSelector(state => state.userReducer);
  //  console.log('all data',datas);
   user_sign_in.then((user)=>{
    
    const data = {
      name: user.additionalUserInfo.profile.name,
      email: user.additionalUserInfo.profile.email,
      firebase_token: idToken
    }
    const apiUrl = 'http://hr.bootesnull.com:3000';
    let jwt;
    dispatch(setAppUrl(apiUrl));
    if (idToken){
      const SignUp = async() =>{
        console.log("sign");
        try{
          const response = await fetch(`${apiUrl}/api/sign-up`,{
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
          catch(err) {
            throw err;
            console.log(err);
          }
          if(jwt != null){

            const getLeaveLists = async() =>{
               try{
                 
                   const response = await fetch(`${apiUrl}/api/leaves/leaves/user-by-leave`,{
                     method: 'GET',
                     headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${jwt}` },
                     // body: JSON.stringify({})
                   });
           
                   // console.log(response);
                   const result = await response.json();
                   const leavesData = result.data;
                   dispatch(setLeavelist(leavesData));
                   }
                   catch(err) {
                     throw err;
                     console.log(err);
                   }
                  
               };
               getLeaveLists();
               const getData = async() =>{
         
                try{
            
                    const response = await fetch(`${apiUrl}/api/leaves/leave-type/list`,{ 
                      method: 'GET',
                      headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${jwt}` },
                      // body: JSON.stringify({})
                    });
            
                    // console.log(response);
                    const result = await response.json();
                    const leaves = result.data;
                    
                    dispatch(setLeavetype(leaves));
                    }
                    catch(err) {
                      throw err;
                      console.log(err);
                    }
                   
                };
                getData();
                const getTasks = async() =>{
               
                  try{
                    
                      const response = await fetch(`${apiUrl}/api/reports/task/user-task-list`,{
                        method: 'GET',
                        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${jwt}` },
                        // body: JSON.stringify({})
                      });
              
                      const taskResult = await response.json();
                      const tasks = taskResult.data;
                      dispatch(setTaskList(tasks));
                      }
                      catch(err) {
                        throw err;
                        console.log(err);
                      }
                     
                  };
                  
                  getTasks();
                  const getEvents = async() =>{
                    try{
                      
                        const response = await fetch(`${apiUrl}/api/leaves/leaves/user-by-leave`,{
                          method: 'GET',
                          headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${jwt}` },
                          // body: JSON.stringify({})
                        });
                
                        // console.log(response);
                        const result = await response.json();
                        const leavesData = result.data;
                        dispatch(setLeavelist(leavesData));
                        }
                        catch(err) {
                          throw err;
                          console.log(err);
                        }
                       
                    };
                    // getEvents();

                    const getAnnoucement = async() =>{
                      try{
                        
                          const response = await fetch(`${apiUrl}/api/events/announcements/list`,{
                            method: 'GET',
                            headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${jwt}` },
                            // body: JSON.stringify({})
                          });
                  
                          // console.log(response);
                          const result = await response.json();
                          const annoucementData = result.data;
                          dispatch(setAnnoucementList(annoucementData));
                          }
                          catch(err) {
                            throw err;
                            console.log(err);
                          }
                         
                      };
                      getAnnoucement();

                      const taskHistory = async() =>{
                        try{
                          
                            const response = await fetch(`${apiUrl}/api/reports/task/dially-user-list`,{
                              method: 'GET',
                              headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${jwt}` },
                              // body: JSON.stringify({})
                            });
                    
                            // console.log(response);
                            const result = await response.json();
                            const taskData = result.data;
                            dispatch(setTaskReport(taskData));
                            console.log('shubham',taskData);
                            }
                            catch(err) {
                              throw err;
                              console.log(err);
                            }
                           
                        };
                        taskHistory();

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


    }).catch((error)=>{
      console.log("sdgsdg",error)
    })

   }

   
   return (
    <View style={{height:800, flex:1,justifyContent:'center',alignItems:'center', backgroundColor: "#38A1F2", alignContent: 'center', justifyContent: 'center'}}>
      
      <View>
      <Mink width={400} height={100}/>
      </View>
      <View style={{marginTop: 150,justifyContent:'center',alignItems:'center'}}>
        <Text style={{fontSize:24, fontWeight:'bold', fontFamily:'Proxima Nova', color:'#fff'}}>SIGN UP</Text>
        <Text style={{fontSize:16, fontFamily:'Proxima Nova', color:'#fff'}}>Create an account to start using Mink</Text>
      </View>
      <View style={{marginTop: 10}}>
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