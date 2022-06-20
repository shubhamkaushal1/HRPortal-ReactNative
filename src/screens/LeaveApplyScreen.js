import React, { useState } from 'react';
// Import core components
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity
} from 'react-native';
import { useSelector, useDispatch, setAttendence } from 'react-redux';
 import DropdownComponent from '../component/ApplyLeaveForm';
// Import Document Picker
import DocumentPicker from 'react-native-document-picker';

const LeaveApplyScreen = () => {
  const datass = useSelector(state => state.userReducer);
  const apiUrl = datass.appUrl;
  const [singleFile, setSingleFile] = useState(null);
  const uploadImage = async () => {
    if (singleFile != null) {
      console.log('ddddd',singleFile);
      const fileToUpload = singleFile;
      const data = new FormData();
      data.append('leave_type_id','2');
      data.append('from_date','01/05/2022');
      data.append('to_date','08/05/2022');
      data.append('reasons','test');
      let obj = {};
      obj['leave_type_id'] = '2';
      obj['from_date'] = '01/05/2022';
      obj['to_date'] = '08/05/2022';
      obj['reasons'] = 'dsdsssssssss';
      console.log(obj);
      let res = await fetch(
        `${apiUrl}/api/leaves/leaves/store`,
        {
          method: 'post',
          body: obj,
          headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${datass.jwt}` },
        }
      );
      let responseJson = await res.json();
      console.log(responseJson);
      if (responseJson.status == 1) {
        alert('Upload Successful');
      }
    } else {
      alert('Please Select File first');
    }
  };
 
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
  return (
    <View  style={styles.container}>
      <View>
      <DropdownComponent />
      </View>
    </View>
  );
};
 
const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    width: 360,
    height:400,
    marginTop: 35,
    marginLeft: 16,
    
  },
  mainBody: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  buttonStyle: {
    backgroundColor: '#307ecc',
    borderWidth: 0,
    color: '#FFFFFF',
    borderColor: '#307ecc',
    height: 40,
    alignItems: 'center',
    borderRadius: 30,
    marginLeft: 35,
    marginRight: 35,
    marginTop: 15,
  },
  buttonTextStyle: {
    color: '#FFFFFF',
    paddingVertical: 10,
    fontSize: 16,
  },
  textStyle: {
    backgroundColor: '#fff',
    fontSize: 15,
    marginTop: 16,
    marginLeft: 35,
    marginRight: 35,
    textAlign: 'center',
  },
});
 
export default LeaveApplyScreen;