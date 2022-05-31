import React, { useState } from "react";
import { View, Switch, StyleSheet, Text } from "react-native";
import { useSelector, useDispatch } from 'react-redux';
import { setDetails, setToken, setAttendence } from '../redux/actions/useractions';

const App = () => {
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
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  }
});

export default App;