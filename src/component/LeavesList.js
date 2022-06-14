import React, {useState,useEffect} from 'react';
import { StyleSheet, View,Text,SafeAreaView,ScrollView,FlatList,Image } from 'react-native';
  import { Dropdown } from 'react-native-element-dropdown';
  import { useSelector, useDispatch } from 'react-redux';
import {setLeavelist } from '../redux/actions/useractions';
// import DatePicker from 'react-native-date-picker';
import Applyleave from '../screens/LeaveApplyScreen';
import { Card, ListItem, Button, Icon,Header } from 'react-native-elements';


  const LeaveListComponent = ({props}) => {
    const dispatch = useDispatch();
    const data = useSelector(state => state.userReducer);
    const apiUrl = data.appUrl;
    const getData = async() =>{
   
      try{
        
          const response = await fetch(`${apiUrl}/api/leaves/leaves/user-by-leave`,{
            method: 'GET',
            headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${data.jwt}` },
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
      useEffect(()=>{
        getData();
     
      },[])
      const leavesData = () => {
        
        const users = data.leavelist;
        console.log('here',users);
      return ( 
     
        <View>
          {
        users.map((u, i) => {
          return (
      <Card>
   
        <View key={i}>
         
          <Text>Status :{u.leave_status}</Text>
          <Text>Type :{u.leave_type_name}</Text>
          <Text>From :{u.from_date} To {u.to_date}</Text>
        </View>
     
 
</Card>
 );
})
}
        </View>
      
      );
      }
      return(
        
        <View>
          <ScrollView>
          {leavesData()}
        </ScrollView>
        </View>
        
      );
  }

  export default LeaveListComponent;
