import React, { useState } from "react";
import { View, Switch, StyleSheet, Text } from "react-native";
import { useSelector, useDispatch } from 'react-redux';
import { LoggingOut } from "../api/firebaseMethods";
import { setDetails, setToken, setAttendence } from '../redux/actions/useractions';
import { Card, ListItem, Button, Header } from 'react-native-elements';
import Moment from 'moment';

const AnnouncementScreen = () => {
  const [isEnabled, setIsEnabled] = useState(false);
  const data = useSelector(state => state.userReducer);
  // const { details, token } = useSelector(state => state.userReducer);
  const dispatch = useDispatch();
  Moment.locale('en');
  const annoucementData = data.annoucementList;

  return (
    <View>
    {
            annoucementData.map((u, i) => {

            return (
              <Card width={330} height={180} borderRadius={4} containerStyle={{elevation:0, backgroundColor: '#F5FFF6'}} >
                <View key={i}>
                  <View style={{flexDirection: "row"}}>
                    <Text style={{fontFamily:'Proxima Nova', fontSize: 16, color: '#000', fontWeight: 'bold'}}>{u.title}</Text>
                  </View>
                  <View style={{flexDirection: "row", marginTop:15}}>
                    <Text style={{fontFamily:'Proxima Nova', fontSize: 16, color: '#000', marginHorizontal:30}}>{u.description}</Text>
                  </View>
                  <View style={{flexDirection: "row", marginTop:15}}>
                    <View style={{fontFamily:'Proxima Nova', fontSize: 12, color: '#000', marginHorizontal:20,flexDirection: "row"}}>
                      <Text > { Moment(u.created_at).format('d MMM y')}</Text>
                    </View>
                  </View> 

                </View>
                
              </Card>
            );
            })
          }
    </View>
  );
}


export default AnnouncementScreen;