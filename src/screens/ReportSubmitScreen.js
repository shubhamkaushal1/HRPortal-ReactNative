import React, { useState } from 'react';
// Import core components
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput
} from 'react-native';
import { Card,Button,Input} from 'react-native-elements';
import { Dropdown } from 'react-native-element-dropdown';
import { useSelector, useDispatch } from 'react-redux';
import { setReportId } from '../redux/actions/useractions';
 import DropdownComponent from '../component/ApplyLeaveForm';
 import Dashboard from '../screens/DashboardScreen'
//  import FlashMessage from "react-native-flash-message";
 import { showMessage, hideMessage } from "react-native-flash-message";
import data from 'react-native-ico-material-design/src/data';
 const SubmitReportScreen = (navigation) => {
   
    const dispatch = useDispatch();
    const datas = useSelector(state => state.userReducer);
    const apiUrl=datas.appUrl;
    const [status, setStatus] = useState(null);
    const [description, setDescription] = useState(null);
    const [workingMins, setWorkingMinuts] = useState(null);
    const [workingHours, setWorkingHours] = useState(null);
    const dataToSubmit = {
      task: datas.report_id,
      description: description,
      working_hours: workingHours,
      status: status,
    }
    const dropdonData = [
      { label: 'Done', value: 'Done' },
      { label: 'Pending', value: 'Pending' },
    ];
    
    const getData = async() =>{
         
        try{
           
            const response = await fetch(`${apiUrl}/api/reports/task/create-user-task`,{ 
              method: 'POST',
              headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${datas.jwt}` },
              body: JSON.stringify(dataToSubmit)
              // body:dataToSubmit
            });
    
            const result = await response.json();
            const leaves = result.data;
            console.log(result);
            // dispatch(setLeavetype(leaves));
            if(result)navigation.navigate('Dashboard');
            }
            catch(err) {
              throw err;
              console.log(err);
            }
           
        };
        
        const submitReport = (e,id) =>{
          
          console.log(datas.jwt);
          getData();
        }
    return(
        <View>
          <Text>{datas.report_name}</Text>
    <TextInput placeholder="Type something" numberOfLines={4} multiline={true}  onChangeText={description => {
      setDescription(description);
      // setIsFocus(false);
    }}/>
    
    <View>
    <TextInput placeholder="Working Hours"  multiline={true}  onChangeText={hours => {
      setWorkingHours(hours);
      // setIsFocus(false);
    }}/>
     <TextInput placeholder="Working Minuts" multiline={true}  onChangeText={minuts => {
      setWorkingMinuts(minuts);
      // setIsFocus(false);
    }}/>
    </View>
    
    <Dropdown 
    data={dropdonData}
    labelField="label"
    valueField="value"
    onChange={item => {
      setStatus(item.value);
      // setIsFocus(false);
    }}
    />
    <Text>{datas.report_id}</Text>
          <Button 
                            title="Submit"
                            buttonStyle={{ backgroundColor: '#1DA1F2' }}
                            containerStyle={{
                              width: 72,
                              height:36,
                              marginTop:-5,
                              borderRadius: 30,
                              
                            }}
                            
                            onPress={(e) => submitReport(e,datas.report_id)}
                            titleStyle={{ color: '#E1F3FF', fontFamily:'Proxima Nova,Semibold', fontSize: 14 }}
                          /></View>
    );

 }
 export default SubmitReportScreen;
