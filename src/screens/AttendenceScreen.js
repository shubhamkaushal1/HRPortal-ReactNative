import React, { useState } from "react";
import { View, Switch, StyleSheet, Text,TouchableOpacity,Button } from "react-native";
import { useSelector, useDispatch } from 'react-redux';
import { setDetails, setToken, setAttendence } from '../redux/actions/useractions';
import LeaveScreen from './LeavesScreen';
// import toast, { Toaster } from 'react-hot-toast';
import Toast from 'react-native-toast-message';
const Attend = (navigation) => {
  const showToast = () => {
    // alert();
    Toast.show({
      type: 'success',
      text1: 'Hello',
      text2: 'This is some something 👋'
    });
  }
  // const notify = () => toast('Here is your toast.');
  const [isEnabled, setIsEnabled] = useState(false);
  // const { details, token } = useSelector(state => state.userReducer);
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);
  // const { attendence } = useSelector(state => state.userReducer);
  const dispatch = useDispatch();
 
  dispatch(setAttendence(isEnabled));
  //  const data = useSelector(state => state.userReducer);
  console.log(isEnabled);
  return (
    <View style={styles.container}>
      <Switch
        trackColor={{ false: "#767577", true: "#81b0ff" }}
        thumbColor={isEnabled ? "#f5dd4b" : "#f4f3f4"}
        ios_backgroundColor="#3e3e3e"
        onValueChange={toggleSwitch}
        value={isEnabled}
      />
      {/* <Text>{data.attendence}</Text> */}
      <TouchableOpacity onPress={showToast} style={styles.buttonStyle} >
        <Text>
          SHOW SOME AWESOMENESS !
        </Text>
      </TouchableOpacity>
      <Button
      title="Go to Jane's profile"
      onPress={() =>
        navigation.navigate('LeaveScreen')
      }/>
      {/* <Toaster /> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonStyle: {
    marginTop: 10,
    backgroundColor: "white",
    borderColor: "green",
    borderWidth: 2,
    padding: 10
  }
});

export default Attend;