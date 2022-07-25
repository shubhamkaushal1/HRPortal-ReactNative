import React, { useState,useEffect } from "react";
import { View, Switch, StyleSheet, Text,FlatList } from "react-native";
import { useSelector, useDispatch } from 'react-redux';
import { LoggingOut } from "../api/firebaseMethods";
import { setDetails, setToken, setAttendence } from '../redux/actions/useractions';
import { Card, ListItem, Button, Header } from 'react-native-elements';
import Moment from 'moment';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {
 faListCheck,
} from "@fortawesome/free-solid-svg-icons";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { taskHistoryApi } from '../api/apis';

const TaskHistoryScreen = () => {
  const [isEnabled, setIsEnabled] = useState(false);
  const data = useSelector(state => state.userReducer);
  const [selectedId, setSelectedId] = useState(null);
  const [taskHistory, setTaskHistory] = useState(null);
  // const { details, token } = useSelector(state => state.userReducer);
  
  const dispatch = useDispatch();
  const displayData = async () => {
    try {
      let jwtToken = await AsyncStorage.getItem('jwtToken');
      taskHistoryApi(jwtToken,setTaskHistory);
    }
    catch (error) {
      alert(error)
    }
  }
    useEffect(() => {
      displayData();

    }, [])
  Moment.locale('en');
  const taskData = taskHistory;

  const Item = ({ item, onPress, backgroundColor, textColor }) => (
    <View style={{flexDirection:'row', borderBottomWidth:1, borderBottomColor:'#E9E9E9'}}>
      <View style={{width:70, height:90, paddingHorizontal:10, paddingVertical:20}}>
        <View style={{height:50, width:50, backgroundColor:'#28AAF9', padding:10, borderRadius:12}}>
          <FontAwesomeIcon icon={faListCheck} size={30} style={{ color: "#fff"}} />
        </View>
      </View>
      <View style={{paddingTop:20, paddingHorizontal:10}}>
        <View>
          <Text style={{fontFamily:'Proxima Nova', fontSize: 20, color: '#13171A', fontWeight: '600'}}>{item.task_title}</Text>
          <Text style={{fontFamily:'Proxima Nova', fontSize: 14, color: '#657785'}}> Created { Moment(item.created_at).format('MMM d, y')}</Text>
          <Text style={{fontFamily:'Proxima Nova', fontSize: 16, color: '#13171A'}}> {item.descriptions}</Text>
          <Text style={{fontFamily:'Proxima Nova', fontSize: 14, color: '#657785'}}> Task Time { item.working_hours} Hours</Text>
        </View> 
      </View>
    </View>
  );

  const renderItem = ({ item }) => {
    const backgroundColor = item.id === selectedId ? "#6e3b6e" : "#fff";
    const color = item.id === selectedId ? 'white' : 'black';

    return (
      <Item
        item={item}
        backgroundColor={{ backgroundColor }}
        textColor={{ color }}
      />
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.internalContainer}>
        <View style={{flexDirection:'row', padding: 30, borderBottomWidth:1, borderBottomColor:'#E9E9E9'}}>
          <View>
            <Text style={{fontFamily:'Proxima Nova', fontSize:20,color:'#13171A', fontWeight:'600'}}>Task History</Text>
          </View>

        </View>
        <View>
          <FlatList
            data={taskData}
            renderItem={renderItem}
            keyExtractor={(item, index) => {
              return index.toString();
            }}
            extraData={selectedId}
          />
        </View>
        
      </View>
    
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center', 
    justifyContent: 'center',
    backgroundColor: '#F6F6F6',
    width: '100%',
    marginTop: 10,
    borderTopLeftRadius:40,
    borderTopRightRadius:40
  },
  internalContainer:{
    backgroundColor: '#fff',
    width: 360,
    height:620,
  }
});

export default TaskHistoryScreen;