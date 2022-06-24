import React, {useState,useEffect} from 'react';
import { StyleSheet, View,Text,SafeAreaView,ScrollView,FlatList,Image } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import { useSelector, useDispatch } from 'react-redux';
import {setLeavelist,setLeaveDetailId,setLeaveDetails } from '../redux/actions/useractions';
import { Card, ListItem, Button, Header } from 'react-native-elements';
// import LeaveApplyScreen from '../screens/LeaveApplyScreen';
import Pending from "../../assets/Pending.svg";
import Approved from "../../assets/Approved.svg";
import Rejected from "../../assets/Rejected.svg";
import Toast from 'react-native-toast-message';
import { createStackNavigator } from '@react-navigation/stack';
export default function LeaveListComponent({ navigation }) {
    const dispatch = useDispatch();
    const data = useSelector(state => state.userReducer);
    const apiUrl = data.appUrl;
    const [leaveId, setLeaveId] = useState(null);
    const ViewDetails = (e,id) =>{
      // setLeaveDetailId(id)
      dispatch(setLeaveDetailId(id));
      const getDetails = async() =>{
      try{       
        const responseData = await fetch(`${apiUrl}/api/leaves/leaves/view?id=${id}`,{
          method: 'GET',
          headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${data.jwt}` },
          // body: JSON.stringify({})
        });
        const resultData = await responseData.json();

        dispatch(setLeaveDetails(resultData.data));
        
        }
        catch(err) {
          throw err;
          console.log(err);
        }
    }
    getDetails();
  }


      const leavesData = () => {
        
        const users = data.leavelist;
      return ( 
        <View style={styles.container}>
          <View styele={{backgroundColor: '#fff', marginTop: 10, width: 380, height: 637}}>
            <View style={{flexDirection: "row", justifyContent:'space-between', marginTop: 30, marginLeft: 18, width: 320}}>
              <Text style={{fontSize:20, fontFamily:'Proxima Nova', fontWeight:'700', color:'#13171A'}}>Leave Status</Text>
              <Button
                title={`Apply For Leave`}
                buttonStyle={{ backgroundColor: '#23B33A' }}
                titleStyle={{ color: '#FFFFFF', fontFamily:'Proxima Nova,Semibold', fontSize: 14, fontWeight: 'bold'}}
                containerStyle={{ width: 130, height:35, borderRadius: 20 }}
                onPress={() => navigation.navigate('LeaveApplyScreen')}
              />
            </View>
          <View>
          {
            users.map((u, i) => {
              let bgColor;
              let ftColor ;
              let statusIcon ;
              let leaveStatus = u.leave_status;
              console.log("unstoppable",u.leave_status);
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
                    bgColor = '#F4F4F4';
                    ftColor = '#666';
                    statusIcon = <Rejected height={20} width={20} style={{marginLeft: -20 }} />;
                  break;
                }
            return (
              <Card width={330} height={180} borderRadius={4} containerStyle={{elevation:0, backgroundColor: bgColor}} >
                <View key={i}>
                  <View style={{flexDirection: "row"}}>
                    <Text style={{fontFamily:'Proxima Nova', fontSize: 16, color: '#000', fontWeight: 'bold'}}>Status</Text>
                    <Button 
                    title={u.leave_status}
                    icon = {statusIcon}
                    buttonStyle={{ backgroundColor: bgColor, borderWidth:0.5, borderColor: ftColor }}
                    titleStyle={{ fontFamily:'Proxima Nova', fontSize: 12, color: ftColor}}
                    containerStyle={{ width: 100, height:40, marginHorizontal:20}}
                    />
                    
                    {/* <Text style={{fontFamily:'Proxima Nova', fontSize: 12, color: '#F3AD68', borderColor:'#F3AD68' }}>
                    {u.leave_status}</Text> */}
                  </View>
                  <View style={{flexDirection: "row", marginTop:15}}>
                    <Text style={{fontFamily:'Proxima Nova', fontSize: 16, color: '#000', fontWeight: 'bold'}}>Type</Text>
                    <Text style={{fontFamily:'Proxima Nova', fontSize: 16, color: '#000', marginHorizontal:30}}>{u.leave_type_name}</Text>
                  </View>
                  <View style={{flexDirection: "row", marginTop:15}}>
                    <View>

                    <Text style={{fontFamily:'Proxima Nova', fontSize: 16, color: '#000', fontWeight: 'bold'}}>From</Text>
                    </View>
                    <View style={{fontFamily:'Proxima Nova', fontSize: 12, color: '#000', marginHorizontal:20,flexDirection: "row"}}>
                      <Text style={styles.dateContainer} > {u.from_date}</Text>
                      <Text style={{marginTop: 2}}> To </Text>
                      <Text style={styles.dateContainer} > {u.to_date} </Text>
                    </View>
                  </View> 
                  <View style={{marginLeft:55, marginTop: 15}}>
                    <Text key={u.leaves_id.toString()} onPress={(e) => ViewDetails(e,u.leaves_id)} style={{fontSize:12}}>View Details</Text>
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

        <ScrollView contentContainerStyle={{flexGrow: 1, justifyContent: 'center', backgroundColor: '#F6F6F6', width: '100%', marginTop: 10, borderTopLeftRadius:40, borderTopRightRadius:40, paddingBottom: 50 }}>
        {leavesData()}
        </ScrollView>
      
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    width: 360,
    marginTop: 35,
    marginLeft: 16,
    paddingBottom: 30
  },
  dateContainer:{
    borderWidth:0.5, 
    borderRadius: 2,
    borderColor:'#DBDBDB', 
    padding: 4
  }
});