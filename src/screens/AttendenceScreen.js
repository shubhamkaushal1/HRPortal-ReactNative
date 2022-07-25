import React, { useState,useEffect } from "react";
import Moment from 'moment';
import { useFocusEffect } from '@react-navigation/native';
import { View, Switch, StyleSheet, Text,TouchableOpacity,Button,ScrollView } from "react-native";
import { useSelector, useDispatch } from 'react-redux';
import { setDetails, setToken, setAttendence } from '../redux/actions/useractions';
import LeaveScreen from './LeavesScreen';
import Pending from "../../assets/Pending.svg";
import Approved from "../../assets/Approved.svg";
import Rejected from "../../assets/Rejected.svg";
import { Card, ListItem, Header } from 'react-native-elements';
import {attendenceListApi} from '../api/apis'
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-toast-message';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {
 faListCheck,
 faClock,
 faArrowUp
} from "@fortawesome/free-regular-svg-icons";
import {

  faArrowDown, faArrowDownLong, faArrowUp19, faArrowUpLong
  
 } from "@fortawesome/free-solid-svg-icons";
const Attend = (navigation) => {
  const [attendenceList, setAttendenceList] = useState([])
  const displayData = async ()=>{  
    try{  
      let jwtToken = await AsyncStorage.getItem('jwtToken');  
      attendenceListApi(jwtToken,setAttendenceList); 
    }  
    catch(error){  
      alert(error)  
    }  
  } 

  useEffect(() => {
     displayData();
  }, []);
   const dummyData = [{
    "date": "2022-05-19T18:30:00.000Z",
    "checkin": "15:55:01",
    "checkout": "19:55:01",
    "hours": "4:34:10",
    "attendence": "present"
  },
  {
    "date": "2022-05-20T18:30:00.000Z",
    "checkin": "10:55:01",
    "checkout": "20:55:01",
    "hours": "4:34:10",
    "attendence": "present"
  },
  {
    "date": "2022-06-05T18:30:00.000Z",
    "checkin": "15:55:01",
    "checkout": "16:37:12",
    "hours": "4:34:10",
    "attendence": "absent"
  }
]

  const atendenceData = () => {
      
    const attendence = attendenceList;
  return ( 
    <View style={styles.container}>
      <View styele={{backgroundColor: '#fff', marginTop: 10, width: 380, height: 637}}>
        <View style={{flexDirection: "row", justifyContent:'space-between', marginTop: 30, marginLeft: 18, width: 320}}>
          <Text style={{fontSize:20, fontFamily:'Proxima Nova', fontWeight:'700', color:'#13171A'}}>Attendence</Text>
          {/* <Button
            title={`Apply For Leave`}
            buttonStyle={{ backgroundColor: '#23B33A' }}
            titleStyle={{ color: '#FFFFFF', fontFamily:'Proxima Nova,Semibold', fontSize: 14, fontWeight: 'bold'}}
            containerStyle={{ width: 130, height:35, borderRadius: 20 }}
            onPress={() => navigation.navigate('LeaveApplyScreen')}
          /> */}
        </View>
      <View>
      {
        attendence.map((u, i) => {
          let bgColor;
          let ftColor ;
          let statusIcon ;
          let leaveStatus = u.attendence;
            switch (leaveStatus) {
              case 'Pending':
                bgColor = '#FFFCF9';
                ftColor = '#C57F3A';
                statusIcon = <Pending height={20} width={20} style={{marginLeft: -20 }} />;
              break;

              case 'Approved':
                bgColor = '#F5FFF6';
                ftColor = '#457E4E';
                statusIcon = <Approved height={20} width={20} style={{marginLeft: -20 }} />;
              break;

              case 'Rejected':
                bgColor = '#FFF7F6';
                ftColor = '#BB0B06';
                statusIcon = <Rejected height={20} width={20} style={{marginLeft: -20 }} />;
              break;

              default:
                bgColor = '#fff ';
                ftColor = '#666';
                statusIcon = <Rejected height={20} width={20} style={{marginLeft: -20 }} />;
              break;
            }
        return (
          <Card key={i} width={360}  height={120} borderRadius={10} containerStyle={{elevation:0, backgroundColor: bgColor}} >
            <View style={{padding:0}}>
             <View style={{flexDirection: "row"}} >
            <Text style={{fontFamily:'Proxima Nova', fontSize: 16, marginHorizontal:10, color: '#000', fontWeight: 'bold'}}> {Moment(u.date).format('dddd DD MMMM y')}</Text>
              </View>
            <View style={{flexDirection: "row"}} >
           
              <View style={{flexDirection: "column",marginTop:15}}>
                <Text style={{fontFamily:'Proxima Nova', fontSize: 16, color: '#C57F3A', marginHorizontal:15}}> <FontAwesomeIcon icon={faClock} size={12} style={{ color: "#C57F3A"}} /> Total hours</Text>
                <Text style={{fontFamily:'Proxima Nova', fontSize: 16, color: '#000', marginHorizontal:15}}>   {u.hours}</Text>
                {/* <Text style={{fontFamily:'Proxima Nova', fontSize: 16, marginHorizontal:10, color: '#000', fontWeight: 'bold'}}>Check Out</Text> */}

              </View>
              <View style={{flexDirection: "column", marginTop:15}}>
                {/* <Text style={{fontFamily:'Proxima Nova', fontSize: 16, color: '#000', fontWeight: 'bold'}}>Type</Text> */}
                <Text style={{fontFamily:'Proxima Nova', fontSize: 16, color: '#33C74A', marginHorizontal:15}}><FontAwesomeIcon icon={faArrowUpLong} size={12} style={{ color: "#33C74A"}} /> Check In</Text>
                <Text style={{fontFamily:'Proxima Nova', fontSize: 16, color: '#000', marginHorizontal:15}}>  {Moment(u.checkin).format('hh:mm:A')}</Text>
                {/* <Text style={{fontFamily:'Proxima Nova', fontSize: 16, color: '#000', marginHorizontal:15}}>{u.checkout}</Text> */}
              </View>

              <View style={{flexDirection: "column", marginTop:15}}>
                {/* <Text style={{fontFamily:'Proxima Nova', fontSize: 16, color: '#000', fontWeight: 'bold'}}>Type</Text> */}
                <Text style={{fontFamily:'Proxima Nova', fontSize: 16, color: '#FF7874', marginHorizontal:15}}><FontAwesomeIcon icon={faArrowDownLong} size={12} style={{ color: "#FF7874"}} /> Check Out</Text>
                {/* <Text style={{fontFamily:'Proxima Nova', fontSize: 16, color: '#000', marginHorizontal:15}}>{u.checkin}</Text> */}
                <Text style={{fontFamily:'Proxima Nova', fontSize: 16, color: '#000', marginHorizontal:15}}>  {Moment(u.checkout).format('hh:mm:A')}</Text>
              </View>
            </View>
            </View>
          </Card>
        );
        })
      }
        </View>    
      </View>
    </View>
  )}

  return(
    <View  height={600}>
      <ScrollView contentContainerStyle={{flexGrow: 1,  justifyContent: 'center', backgroundColor: '#F6F6F6', width: '100%', marginTop: 10, borderTopLeftRadius:40, borderTopRightRadius:40, paddingBottom: 50 }}>
      {atendenceData()}
      </ScrollView>
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