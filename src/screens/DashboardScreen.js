import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Switch} from 'react-native';
import { State, TouchableOpacity } from 'react-native-gesture-handler';
import firebase from 'firebase/compat/app';
import auth from '@react-native-firebase/auth';
import {LoggingOut} from "../api/firebaseMethods";
import { useSelector, useDispatch, setAttendence } from 'react-redux';
import { setDetails, setToken, setJWT } from '../redux/actions/useractions';
import { die } from 'immer/dist/internal';

export default function Dashboard({ navigation }) {
  const data = useSelector(state => state.userReducer);
  const [isEnabled, setIsEnabled] = useState(false);
  // const { details, token } = useSelector(state => state.userReducer);
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);
  // const { attendence } = useSelector(state => state.userReducer);
  // console.log(data);
  if(isEnabled == true){
    const apiUrl = 'https://58ed-203-145-168-10.ngrok.io/';
      const checkedIn = async() =>{
      
        try{
          const response = await fetch(`${apiUrl}/api/checkin-checkout/checkin`,{
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${data.jwt}` },
             body: JSON.stringify({})
          });
       
          const result = await response.json();
          // const jwt = result.data.token;
          // dispatch(setJWT(jwt));
          console.log('checkedin result',result);
          }
          catch(err) {
            throw err;
            console.log(err);
          }
         
      };

      checkedIn()
  } else {
    const apiUrl = 'https://58ed-203-145-168-10.ngrok.io/';
      const checkedOut = async() =>{
      
        try{
          const response = await fetch(`${apiUrl}/api/checkin-checkout/checkout`,{
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${data.jwt}` },
             body: JSON.stringify({})
          });
       
          const result = await response.json();
          // const jwt = result.data.token;
          // dispatch(setJWT(jwt));
          console.log('checkedin result',result);
          }
          catch(err) {
            throw err;
            console.log(err);
          }
         
      };

      checkedOut()
  }
  return (
    <View>
      <Text>Dashboard</Text>
      <Switch
        trackColor={{ false: "#767577", true: "#81b0ff" }}
        thumbColor={isEnabled ? "#f5dd4b" : "#f4f3f4"}
        ios_backgroundColor="#3e3e3e"
        onValueChange={toggleSwitch}
        value={isEnabled}
      />
      <Text >Name { data.details.name }</Text>
      <Text >Email { data.details.email }</Text>
      <Text >Token {data.token}</Text>
      <Text >Jwt {data.jwt}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  }
});