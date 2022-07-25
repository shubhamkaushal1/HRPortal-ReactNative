import React, { useEffect, useState } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { View, ActivityIndicator, Text, StyleSheet, ScrollView, Switch, Image, Modal } from 'react-native';
import { State, TouchableOpacity } from 'react-native-gesture-handler';
import firebase from 'firebase/compat/app';
import auth from '@react-native-firebase/auth';
import { LoggingOut } from "../api/firebaseMethods";
import { useSelector, useDispatch } from 'react-redux';
import { leavesListApi, leavesTypeApi, taskListApi,eventsDashboardApi,checkoutApi,checkinApi } from '../api/apis'
// import { setDetails, setToken, setAttendence,setLeavetype } from '../redux/actions/useractions';
import { setDetails, setToken, setJWT, setLeavetype, setLeavelist, setTaskList, setReportId, setTaskReport, setReportName } from '../redux/actions/useractions';
import ToggleSwitch from 'rn-toggle-switch';
import { Card, Button } from 'react-native-elements';
import Santa from "../Img/santa.svg";
import Newyear from "../Img/newyear.svg";
import ScrollingButtonMenu from 'react-native-scroll-menu';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Moment from 'moment';

export default function Dashboard({ navigation }) {
  const data = useSelector(state => state.userReducer);

       
  const dispatch = useDispatch();

  const [Enable, setEnable] = useState(null);
  const [leaveId, setLeaveId] = useState(null)
  const [leaveList, setLeaveListData] = useState([])
  const [leaveType, setLeaveTypeData] = useState([])
  const [taskLists, setTaskListData] = useState([])
  const [eventList, setEventsList] = useState([])
  const [taskLoading, settaskLoading] = useState(true)
  // const apiUrl = data.appUrl;
  const ViewDetails = (e, id, taskname) => {
    navigation.navigate('Report Submit', {
      taskId: id,
      taskName: taskname
    });

  }
  const handleLeaveData = (leavedata) => {
    setLeaveId(leavedata.id)
  }
  const toggle = (state) => {
    setEnable(state);
  }

  const displayData = async () => {
    try {
      let jwtToken =  await AsyncStorage.getItem('jwtToken');
      leavesListApi(jwtToken, setLeaveListData);
      leavesTypeApi(jwtToken, setLeaveTypeData);
      taskListApi(jwtToken, setTaskListData, settaskLoading);
      eventsDashboardApi(jwtToken,setEventsList)
    }
    catch (error) {
      alert(error)
    }
  }

  useEffect(() => {
    displayData();
  }, []);

  const leaveTypeLabel = () => {
    const leaveIds = [];
    const leaveName = [];
    var leaves = leaveType;
    // var leaves = data.leavetypes;
    const ids = leaves.map((val) =>
      leaveIds.push(val.id),
    );
    const name = leaves.map((name) =>
      leaveName.push(name.leave_type_name),
    );
    var finalObj = [];
    for (var i = 0; i < leaveIds.length; i++) {
      finalObj[i] = {
        id: leaveIds[i],
        name: leaveName[i],

      }
    }
    return (
      <ScrollingButtonMenu buttonStyle={{ width: 80, height: 35, borderRadius: 20, borderColor: "#D4EEFF", backgroundColor: "#D4EEFF", marginHorizontal: 5 }}
        textStyle={{ color: '#024E7D', fontFamily: 'Proxima Nova,Semibold', fontSize: 14, fontWeight: 'bold', textAlign: 'center', justifyContent: 'center' }}
        activeColor='#D4EEFF'
        activeBackgroundColor='#024E7D'
        items={finalObj}
        onPress={handleLeaveData}
        selected={leaveId}
      />
    );
  }
  const leaveLists = () => {

    return (

      <View style={{ flexDirection: "row" }}>
        {
          leaveList.map((u, i) => {
            return (
              <Card key={i} width={164} height={91} borderRadius={5} containerStyle={{ elevation: 0.5, backgroundColor: '#F8F8F8', marginLeft: 1 }} >
                {
                  <View style={{ flexDirection: "column" }}>
                    <Text style={{ width: '100%', fontSize: 14, textAlign: "left", color: '#657785', fontFamily: 'Proxima Nova,Semibold', fontWeight: "normal" }}>Full Day Application</Text>
                    <Text style={{ fontSize: 18, color: '#13171A', fontFamily: 'Proxima Nova,Semibold', fontWeight: 'bold' }}>{u.from_date}</Text>
                    <Text style={{ color: '#CB823B', fontFamily: 'Proxima Nova,Semibold', fontSize: 14, fontWeight: 'bold' }}>{u.leave_type_name}</Text>
                  </View>

                }
              </Card>
            );
          })
        }
      </View>

    );

  }

  const taskList = () => {
    const tList = taskLists;
    return (

      <View>
        {
          tList.map((t, i) => {
            return (
              <View key={i} style={{ flexDirection: "row" }}>

                <Card width={348} height={54} borderRadius={4} containerStyle={{ elevation: 0.5, backgroundColor: '#FFF', marginLeft: 1, borderColor: '#DBDBDB' }} >
                  {
                    <View style={{ flexDirection: "row", justifyContent: 'space-between' }}>
                      <Text style={{ fontSize: 16, fontFamily: 'Proxima Nova, Regular' }}>{t.title}</Text>
                      <Button
                        title="Report"
                        buttonStyle={{ backgroundColor: '#1DA1F2' }}
                        containerStyle={{
                          width: 72,
                          height: 36,
                          marginTop: -5,
                          borderRadius: 30,

                        }}
                        onPress={(e) => ViewDetails(e, t.id, t.title)}
                        titleStyle={{ color: '#E1F3FF', fontFamily: 'Proxima Nova,Semibold', fontSize: 14 }}
                      />
                    </View>
                  }
                </Card>
              </View>
            );
          })
        }
      </View>

    );

  }

  if (Enable == true) {
    const checkinFun = async () => {
      let jwtToken =  await AsyncStorage.getItem('jwtToken');
      checkinApi(jwtToken,setEnable);
    }
    checkinFun();

  } if(Enable == false) {
    const checkoutFun = async () => {
      let jwtToken =  await AsyncStorage.getItem('jwtToken');
      checkoutApi(jwtToken,setEnable);
    }
    checkoutFun();
    
  }
  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }}>
      <View style={styles.container}>
        <ToggleSwitch
          text={{ on: 'IN', off: 'OUT', activeTextColor: 'white', inactiveTextColor: '#B7B8BA' }}
          textStyle={{ fontWeight: 'bold' }}
          color={{ indicator: 'white', active: '#23B33A', inactive: '#ED1C17', activeBorder: '#23B33A', inactiveBorder: '#ED1C17' }}
          active={false}
          disabled={false}
          width={50}
          radius={15}
          onValueChange={toggle}
          value={Enable}
        />
        {/* <ActivityIndicator animating = {true}/> */}
      </View>
      <View style={styles.topContainer}>
        <Card width={380} height={212} borderRadius={4} containerStyle={{ elevation: 0 }} >
          <Card.Title style={{ width: '100%', fontSize: 20, textAlign: "left" }}>My Leave </Card.Title>
          {
            <View>
              <View style={{ flexDirection: "row", marginTop: -20, marginLeft: -20 }}>
                {leaveTypeLabel()}
              </View>

              <ScrollView horizontal={true}>
                {leaveLists()}
              </ScrollView>
            </View>

          }
        </Card>
      </View>
      <View style={[styles.topContainer]}>
        <Card width={380} height={212} borderRadius={4} containerStyle={{ elevation: 0 }} >
          <Card.Title style={{ width: '100%', fontSize: 20, textAlign: "left" }}>Today's Task </Card.Title>
          {
            <View>
              {taskLoading === true ?<ActivityIndicator animating={taskLoading} size="large" />: taskList()}
              {/* {taskList()} */}
            </View>

          }
        </Card>
      </View>
      <View style={[styles.topContainer, { marginBottom: 300 }]}>
        <Card width={380} height={212} borderRadius={4} containerStyle={{ elevation: 0 }} >
          <Card.Title style={{ width: '100%', fontSize: 20, textAlign: "left" }}>Upcoming Events</Card.Title>
          <ScrollView horizontal={true}>
          {
            
            <View style={{ flexDirection: 'row' }}>
              {
                
                eventList.map((u, i) => {
                  return(
              <View key={i}>
                <Card key={i} width={163} height={100} borderRadius={9} containerStyle={{ elevation: 0.5, backgroundColor: '#FFFAEE', marginLeft: 1, borderColor: '#DBDBDB' }} >
                  {
                    <View style={{ flexDirection: 'column', marginTop: -10 }}>
                      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <Text style={{ fontSize: 30, fontFamily: 'Proxima Nova, Regular', fontWeight: 'bold', color: '#705205' }}>{Moment(u.holiday_from_date).format('DD')}</Text>
                        <Santa height={50} width={50} />
                      </View>
                      <View>
                        <Text style={{ color: '#13171A', fontFamily: 'Proxima Nova, Regular', fontSize: 14 }}>{Moment(u.holiday_from_date).format('MMMM YY')}</Text>
                        <Text style={{ color: '#705205', fontFamily: 'Proxima Nova, Regular', fontSize: 16 }}>{u.events_title}</Text>
                      </View>
                    </View>
                  }
                </Card>
              </View>
                  );
               })
          }
          

              {/* <View>
                <Card width={163} height={100} borderRadius={9} containerStyle={{ elevation: 0.5, backgroundColor: '#E8F5FE', marginLeft: 1, borderColor: '#DBDBDB' }} >
                  {
                    <View style={{ flexDirection: 'column', marginTop: -10 }}>
                      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <Text style={{ fontSize: 30, fontFamily: 'Proxima Nova, Regular', fontWeight: 'bold', color: '#705205' }}>01</Text>
                        <Newyear height={50} width={50} />
                      </View>
                      <View>
                        <Text style={{ color: '#13171A', fontFamily: 'Proxima Nova, Regular', fontSize: 14 }}>January 2023</Text>
                        <Text style={{ color: '#705205', fontFamily: 'Proxima Nova, Regular', fontSize: 16 }}>Happy New Year</Text>
                      </View>
                    </View>
                  }
                </Card>
              </View> */}
            </View>

          }
          </ScrollView>
        </Card>
      </View>

    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F6F6F6',
    width: '100%',
    marginTop: 10,
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40
  },
  topContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center'
  }
});