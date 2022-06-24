import React, { useState } from "react";
import { View, Switch, StyleSheet, Text, FlatList,TouchableOpacity } from "react-native";
import { useSelector, useDispatch } from 'react-redux';
import { LoggingOut } from "../api/firebaseMethods";
import { setDetails, setToken, setAttendence } from '../redux/actions/useractions';
import { Card, ListItem, Button, Header } from 'react-native-elements';
import Moment from 'moment';
import { Dropdown } from "react-native-element-dropdown";
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {
 faBullhorn,
} from "@fortawesome/free-solid-svg-icons";

const AnnouncementScreen = () => {
  const [isEnabled, setIsEnabled] = useState(false);
  const data = useSelector(state => state.userReducer);
  const [selectedId, setSelectedId] = useState(null);
  // const [filter, setFilter] = useState(null);

  // const filterData = [
  //   { label: 'Today', value: 'Today' },
  //   { label: 'Weekly', value: 'Weekly' },
  //   { label: 'Monthly', value: 'Monthly' },
  // ];
  // const { details, token } = useSelector(state => state.userReducer);
  const dispatch = useDispatch();
  Moment.locale('en');
  const annoucementData = data.annoucementList;
  
  const Item = ({ item, onPress, backgroundColor, textColor }) => (
      <View style={{flexDirection:'row', borderBottomWidth:1, borderBottomColor:'#E9E9E9'}}>
        <View style={{width:70, height:90, paddingHorizontal:10, paddingVertical:20}}>
          <View style={{height:50, width:50, backgroundColor:'#28AAF9', padding:10, borderRadius:12}}>
            <FontAwesomeIcon icon={faBullhorn} size={30} style={{ color: "#fff"}} />
          </View>
        </View>
        <View style={{paddingTop:20, paddingHorizontal:10}}>
          <View>
            <Text style={{fontFamily:'Proxima Nova', fontSize: 20, color: '#13171A', fontWeight: '600'}}>{item.title}</Text>
            <Text style={{fontFamily:'Proxima Nova', fontSize: 16, color: '#13171A'}}>{item.description}</Text>
            <Text style={{fontFamily:'Proxima Nova', fontSize: 12, color: '#13171A'}}> { Moment(item.created_at).format('d MMM y')}</Text>
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
            <Text style={{fontFamily:'Proxima Nova', fontSize:20,color:'#13171A', fontWeight:'600'}}>Announcement</Text>
          </View>
          {/* <View style={{borderRadius:15, width:130, backgroundColor:'#F4F5F7', marginLeft:50}}> */}
            {/* <Dropdown 
              style={{borderRadius:15,borderColor:'#DBDBDB', borderWidth:1}}
              data={filterData}
              labelField="label"
              valueField="value"
              onChange={item => {
                setFilter(item.value);
                // setIsFocus(false);
              }} /> */}
          {/* </View> */}
        </View>
        <View>
          <FlatList
            data={annoucementData}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
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

export default AnnouncementScreen;