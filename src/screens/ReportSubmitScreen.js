import React, { useState } from 'react';
// Import core components
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput
} from 'react-native';
import { Card, Button, Input } from 'react-native-elements';
import { Dropdown } from 'react-native-element-dropdown';
import { useSelector, useDispatch } from 'react-redux';
import { setReportId } from '../redux/actions/useractions';
import DropdownComponent from '../component/ApplyLeaveForm';
import Dashboard from '../screens/DashboardScreen'
import { showMessage, hideMessage } from "react-native-flash-message";
// import DocumentPicker from 'react-native-document-picker';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import {
  faCloudArrowUp
} from "@fortawesome/free-solid-svg-icons";
import Toast from 'react-native-toast-message';

import { submitReportApi } from '../api/apis'
import AsyncStorage from '@react-native-async-storage/async-storage';
export default function SubmitReportScreen({ route, navigation }) {
  const { taskId, taskName } = route.params;
  // console.log(taskName);
  const dispatch = useDispatch();
  const datas = useSelector(state => state.userReducer);
  const apiUrl = datas.appUrl;
  const [status, setStatus] = useState(null);
  const [description, setDescription] = useState(null);
  const [workingMins, setWorkingMinuts] = useState(0);
  const [workingHours, setWorkingHours] = useState(0);
  const [isFocus, setIsFocus] = useState(false);
  const dataToSubmit = {
    task: taskId,
    description: description,
    working_hours: (workingHours+'.'+workingMins),
    status: status,
  }
  console.log(dataToSubmit);
  const [reportSubmit, setReportSubmit] = useState(null);
  const dropdonData = [
    { label: 'Done', value: 'Done' },
    { label: 'Pending', value: 'Pending' },
  ];

  // function to reset the states
  const resetStates = () => {
    console.log("helli");
    setStatus(null);
    setDescription(null);
    setWorkingMinuts(null);
    setWorkingHours(null);
  }

  const callSubmitApi = async () => {
    try {
      let oldjwtToken = await AsyncStorage.getItem('jwtToken');
      let result = await submitReportApi(oldjwtToken, dataToSubmit, setReportSubmit);
      if (result.success === false) {
        Toast.show({
          type: 'error',
          text2: result.message
        });
        resetStates();
      } else {
        Toast.show({
          type: 'success',
          text2: result.message
        });
        resetStates();
        navigation.navigate('Dashboard');
      }
    }
    catch (error) {
      alert(error)
    }
  }

  const submitReport = (e, id) => {

    callSubmitApi();
  }

  const selectFile = async () => {
    // try {

    //   const res = await DocumentPicker.pick({

    //     type: [DocumentPicker.types.allFiles],
    //   });
    //   console.log('res : ' + JSON.stringify(res));
    //   setSingleFile(res);
    // } catch (err) {
    //   console.log('errrrr');
    //   setSingleFile(null);
    //   if (DocumentPicker.isCancel(err)) {
    //     alert('Canceled');
    //   } else {
    //     alert('Unknown Error: ' + JSON.stringify(err));
    //     throw err;
    //   }
    // }
  };
  return (
    <View style={styles.container}>
      {/* <View style={styles.innerContainer}> */}
      <Card width={370} height={212} containerStyle={{ elevation: 0, backgroundColor: '#fff', width: 370, height: 600, marginTop: 30 }} >
        <Card.Title style={{ width: '100%', fontSize: 20, textAlign: "left", marginBottom: 20, marginTop: 10 }}>Report </Card.Title>
        <Card.Divider />
        {
          <View style={styles.innerContainer}>
            <View>
              <Text style={{ color: '#13171A', fontSize: 16, fontFamily: 'Proxima Nova', marginBottom: 10 }}>Task</Text>
              <TextInput
                placeholder={taskName}
                numberOfLines={2}
                multiline={true}
                style={{ borderColor: '#DBDBDB', borderWidth: 0.5, backgroundColor: '#F4F5F7' }}
                editable={false}
              />
            </View>
            <View style={{ marginTop: 20 }}>
              <Text style={{ color: '#13171A', fontSize: 16, fontFamily: 'Proxima Nova', marginBottom: 10 }}>Description</Text>
              <TextInput numberOfLines={8} multiline={true} value = {description} onChangeText={(val) => {setDescription(val)}} style={{ borderColor: '#DBDBDB', borderWidth: 0.5, backgroundColor: '#F4F5F7' }} />
            </View>
            {/* <View style={{marginTop:20, alignItems:'center', width:'100%', borderColor:'#DBDBDB', borderStyle: 'dashed', borderWidth:0.5}}>
                    <TouchableOpacity
                      style={styles.buttonStyle}
                      activeOpacity={0.5}
                      onPress={selectFile}>
                      <FontAwesomeIcon icon={faCloudArrowUp} size={16} style={{ color: "#657785", paddingVertical:18 }} />
                      <Text style={{marginLeft:10,marginTop:7}}>Browse attachment</Text>
                    </TouchableOpacity>
                  </View> */}
            <View style={{ marginTop: 20, flexDirection: 'row' }}>
              <View>
                <View>
                  <Text style={{ color: '#13171A', fontSize: 16, fontFamily: 'Proxima Nova', marginBottom: 10 }}>Add Working Hours</Text>
                </View>
                <View style={{ flexDirection: 'row' }}>
                  <TextInput
                    placeholder='Hour'
                    numberOfLines={1}
                    multiline={true}
                    style={{ borderColor: '#DBDBDB', borderWidth: 0.5, backgroundColor: '#F4F5F7', width: 50, height: 35 }}
                    onChangeText={hours => {
                      setWorkingHours(hours);
                      // setIsFocus(false);
                    }}
                  />
                  <TextInput
                    placeholder='Min'
                    numberOfLines={1}
                    multiline={true}
                    style={{ borderColor: '#DBDBDB', borderWidth: 0.5, backgroundColor: '#F4F5F7', width: 50, height: 35 }}
                    onChangeText={minuts => {
                      setWorkingMinuts(minuts);
                      // setIsFocus(false);
                    }}
                  />
                </View>
              </View>
              <View style={{ marginLeft: 50 }}>
                <View>
                  <Text style={{ color: '#13171A', fontSize: 16, fontFamily: 'Proxima Nova', marginBottom: 10 }}>Status</Text>
                </View>
                <View style={{ width: 130, backgroundColor: '#F4F5F7' }}>
                  <Dropdown
                    style={{ paddingHorizontal: 10 }}
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
            <View style={{ marginTop: 15, marginLeft: 250 }}>
              <Button
                title={`Submit`}
                containerStyle={{ width: 80, height: 35, borderRadius: 20 }}
                buttonStyle={{ backgroundColor: '#23B33A', width: 86, height: 35, }}
                titleStyle={{ color: '#FFFFFF', fontFamily: 'Proxima Nova,Semibold', fontSize: 14, fontWeight: 'bold' }}
                onPress={(e) => submitReport(e, datas.report_id)}
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
    height: 400,
    backgroundColor: '#F6F6F6',
    width: '100%',
    marginTop: 10,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30
  },
  innerContainer: {
    marginTop: 10,

  },
  buttonStyle: {
    flexDirection: 'row'
  }
});
