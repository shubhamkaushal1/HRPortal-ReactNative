import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Switch} from 'react-native';
import { State, TouchableOpacity } from 'react-native-gesture-handler';
import firebase from 'firebase/compat/app';
import auth from '@react-native-firebase/auth';
import {LoggingOut} from "../api/firebaseMethods";
import { useSelector, useDispatch, setAttendence } from 'react-redux';
import { setDetails, setToken, setJWT } from '../redux/actions/useractions';
import ToggleSwitch from 'rn-toggle-switch';
import { Card,Button } from 'react-native-elements';
import DateTimePicker from '@react-native-community/datetimepicker';

export default function Dashboard({ navigation }) {
  const data = useSelector(state => state.userReducer);
  const [datePicker, setDatePicker] = useState(false);
  const [date, setDate] = useState(new Date());

  const [Enable , setEnable]  = useState(false);
  // const { details, token } = useSelector(state => state.userReducer);
  // Toggle function
  const toggle = (state)=>{
    setEnable(state);
  }
  function showDatePicker() {
    setDatePicker(true);
  };

  function onDateSelected(event, value) {
    setDate(value);
    setDatePicker(false);
  };
  // const { attendence } = useSelector(state => state.userReducer);
  console.log('this',Enable);
  if(Enable == true){
    const apiUrl = 'https://9a79-203-145-168-10.ngrok.io';
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
    const apiUrl = 'https://9a79-203-145-168-10.ngrok.io';
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
    <View style={styles.container}>
      <View style={styles.topContainer}>
        <ToggleSwitch
        text={{on: 'IN', off: 'OUT', activeTextColor: 'white', inactiveTextColor: '#B7B8BA'}}
        textStyle={{fontWeight: 'bold'}}
        color={{ indicator: 'white', active: '#23B33A', inactive:  '#ED1C17', activeBorder: '#23B33A', inactiveBorder: '#ED1C17'}}
        active={true}
        disabled={false}
        width={50}
        radius={15}
        onValueChange={toggle}
        value={Enable}
      />
       {datePicker && (
          <DateTimePicker
            value={date}
            mode={'date'}
            display={Platform.OS === 'ios' ? 'spinner' : 'default'}
            is24Hour={true}
            onChange={onDateSelected}
            style={styleSheet.datePicker}
          />
        )}

      </View>
        <View style={styles.middleContainer}>
        <Card width={380} height={212} borderRadius={4} >
          <Card.Title style={{width:'100%', fontSize:20}}>My Leave </Card.Title>
          {/* <Card.Divider/> */}
          {
            <View style={{flexDirection: "row"}}>
              <Button 
                title="Casual"
                buttonStyle={{ backgroundColor: '#FCEFE3' }}
                containerStyle={{
                  width: 80,
                  height:35,
                  borderRadius: 20,
                  marginHorizontal: 5,
                }}
                titleStyle={{ color: '#CB823B', fontFamily:'Proxima Nova,Semibold', fontSize: 14, fontWeight: 'bold' }}
              />
              <Button 
                title="Sick"
                buttonStyle={{ backgroundColor: '#D4EEFF' }}
                containerStyle={{
                  width: 80,
                  height:35,
                  borderRadius: 20,
                  marginHorizontal: 5,
                }}
                titleStyle={{ color: '#024E7D', fontFamily:'Proxima Nova,Semibold', fontSize: 14, fontWeight: 'bold' }}
              />
              <Button 
                title="Short"
                buttonStyle={{ backgroundColor: '#DFDAEB' }}
                containerStyle={{
                  width: 80,
                  height:35,
                  borderRadius: 30,
                  marginHorizontal: 5,
                }}
                titleStyle={{ color: '#492596', fontFamily:'Proxima Nova,Semibold', fontSize: 14, fontWeight: 'bold' }}
              />
            </View>
            
          }
        </Card>
        </View>
        {/* <ProgressViewIOS number={1} /> */}
        <View style={styles.bottomContainer}>
          <View style={styles.buttonContainer}>
            <Button
              title="LET'S START"
              onPress={() => this.onPress()}
              color="#fff"
            />
          </View>
        </View>
      {/* <View style={{}}>
        <Switch
        trackColor={{ false: "#767577", true: "#81b0ff" }}
        thumbColor={isEnabled ? "#f5dd4b" : "#f4f3f4"}
        ios_backgroundColor="#3e3e3e"
        onValueChange={toggleSwitch}
        value={isEnabled}
      />
      
      </View>
      <View style={{height:618, borderTopLeftRadius: 30}}>
      <Text >Name { data.details.name }</Text>
      <Text >Email { data.details.email }</Text>
      <Text >Token {data.token}</Text>
      <Text >Jwt {data.jwt}</Text>
      </View> */}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    backgroundColor: '#F6F6F6',
    alignItems: 'center',
    width: '100%',
    borderTopLeftRadius:40,
    borderTopRightRadius:40,
    marginTop: 20
  },
  topContainer: {
    // flex: 2,
    flexDirection: 'row',
    marginTop: 15,
    alignItems: 'center',
  },
  middleContainer: {
    flex: 2,
    width: 450,
    height: 250,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  bottomContainer: {
    justifyContent: 'flex-end',
    width: '90%',
    margin: 20,
    padding: 10,
  },
});