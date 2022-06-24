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
 import { showMessage, hideMessage } from "react-native-flash-message";
 import DocumentPicker from 'react-native-document-picker';
 import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
 import {
  faCloudArrowUp
} from "@fortawesome/free-solid-svg-icons";

 export default function SubmitReportScreen({ navigation }) {
   
    const dispatch = useDispatch();
    const datas = useSelector(state => state.userReducer);
    const apiUrl=datas.appUrl;
    const [status, setStatus] = useState(null);
    const [description, setDescription] = useState(null);
    const [workingMins, setWorkingMinuts] = useState(null);
    const [workingHours, setWorkingHours] = useState(null);
    const [isFocus, setIsFocus] = useState(false);
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

        const selectFile = async () => {
          try {
          
            const res = await DocumentPicker.pick({
              
              type: [DocumentPicker.types.allFiles],
            });
            console.log('res : ' + JSON.stringify(res));
            setSingleFile(res);
          } catch (err) {
            console.log('errrrr');
            setSingleFile(null);
            if (DocumentPicker.isCancel(err)) {
              alert('Canceled');
            } else {
              alert('Unknown Error: ' + JSON.stringify(err));
              throw err;
            }
          }
        };
    return(
      <View style={styles.container}>
        {/* <View style={styles.innerContainer}> */}
          <Card width={370} height={212} containerStyle={{elevation:0, backgroundColor: '#fff', width: 370, height:600, marginTop: 30}} >
              <Card.Title style={{width:'100%', fontSize:20,textAlign:"left", marginBottom: 20, marginTop: 10}}>Report </Card.Title>
              <Card.Divider/>
              {
                <View style={styles.innerContainer}>
                  <View>
                    <Text style={{color:'#13171A', fontSize:16, fontFamily:'Proxima Nova', marginBottom:10}}>Task</Text>
                    <TextInput 
                    placeholder='This is the field where we want to show the task name'
                    numberOfLines={2}
                    multiline={true}
                    style={{borderColor:'#DBDBDB', borderWidth:0.5, backgroundColor:'#F4F5F7'}}
                    editable={false}
                    />
                  </View>
                  <View style={{marginTop:20}}>
                    <Text style={{color:'#13171A', fontSize:16, fontFamily:'Proxima Nova', marginBottom:10}}>Description</Text>
                    <TextInput numberOfLines={8} multiline={true}  onChangeText={description => {
                      setDescription(description);
                      // setIsFocus(false);
                      }} style={{borderColor:'#DBDBDB', borderWidth:0.5, backgroundColor:'#F4F5F7'}}/>
                  </View>
                  <View style={{marginTop:20, alignItems:'center', width:'100%', borderColor:'#DBDBDB', borderStyle: 'dashed', borderWidth:0.5}}>
                    <TouchableOpacity
                      style={styles.buttonStyle}
                      activeOpacity={0.5}
                      onPress={selectFile}>
                      <FontAwesomeIcon icon={faCloudArrowUp} size={16} style={{ color: "#657785", paddingVertical:18 }} />
                      <Text style={{marginLeft:10,marginTop:7}}>Browse attachment</Text>
                    </TouchableOpacity>
                  </View>
                  <View style={{marginTop:20, flexDirection:'row'}}>
                    <View>
                      <View>
                        <Text style={{color:'#13171A', fontSize:16, fontFamily:'Proxima Nova', marginBottom:10}}>Add Working Hours</Text>
                      </View>
                      <View style={{flexDirection:'row'}}>
                      <TextInput 
                      placeholder='Hour'
                      numberOfLines={1}
                      multiline={true}
                      style={{borderColor:'#DBDBDB', borderWidth:0.5, backgroundColor:'#F4F5F7', width:50, height:35}}
                      onChangeText={hours => {
                        setWorkingHours(hours);
                        // setIsFocus(false);
                      }}
                      />
                      <TextInput 
                      placeholder='Min'
                      numberOfLines={1}
                      multiline={true}
                      style={{borderColor:'#DBDBDB', borderWidth:0.5, backgroundColor:'#F4F5F7', width:50, height:35}}
                      onChangeText={minuts => {
                        setWorkingMinuts(minuts);
                        // setIsFocus(false);
                      }}
                      />
                      </View>
                    </View>
                    <View style={{marginLeft:50}}>
                      <View>
                        <Text style={{color:'#13171A', fontSize:16, fontFamily:'Proxima Nova', marginBottom:10}}>Status</Text>
                      </View>
                      <View style={{width:130, backgroundColor:'#F4F5F7'}}>
                      <Dropdown 
                        style={{paddingHorizontal:10}}
                        data={dropdonData}
                        labelField="label"
                        valueField="value"
                        onChange={item => {
                          setStatus(item.value);
                          // setIsFocus(false);
                        }}
                        />
                      </View>
                    </View>   
                  </View>
                  <View style={{marginTop:15, marginLeft:250}}>
                  <Button
                    title={`Submit`}
                    containerStyle={{ width: 80, height:35, borderRadius: 20 }}
                    buttonStyle={{ backgroundColor: '#23B33A', width: 86, height:35, }}
                    titleStyle={{ color: '#FFFFFF', fontFamily:'Proxima Nova,Semibold', fontSize: 14, fontWeight: 'bold'}}
                    onPress={(e) => submitReport(e,datas.report_id)}
                    />
                  </View>
                </View>
                
              }
            </Card>
        </View>
          
    );

 }
 const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center', 
    height:400,
    backgroundColor: '#F6F6F6',
    width: '100%',
    marginTop: 10,
    borderTopLeftRadius:30,
    borderTopRightRadius:30
  },
  innerContainer: {
    marginTop: 10,
    
  },
  buttonStyle:{
    flexDirection:'row'
  }
});
