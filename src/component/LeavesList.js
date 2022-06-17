import React, {useState,useEffect} from 'react';
import { StyleSheet, View,Text,SafeAreaView,ScrollView,FlatList,Image } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import { useSelector, useDispatch } from 'react-redux';
import {setLeavelist,setLeaveDetailId,setLeaveDetails } from '../redux/actions/useractions';
import { Card, ListItem, Button, Header } from 'react-native-elements';
import Applyleave from '../screens/LeaveApplyScreen';
import Pending from "../../assets/Pending.svg";

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
     
        <View>
          {
            users.map((u, i) => {
              let bgColor;
              let ftColor ;
              let leaveStatus = u.leave_status;
              console.log("unstoppable",u.leave_status);
                switch (leaveStatus) {
                  case 'Pending':
                    bgColor = '#FFFCF9';
                    ftColor = '#C57F3A';
                  break;

                  case 'Approved':
                    bgColor = '#F5FFF6';
                    ftColor = '#457E4E';
                  break;

                  case 'Rejected':
                    bgColor = '#FFF7F6';
                    ftColor = '#BB0B06';
                  break;

                  default:
                    bgColor = '#F4F4F4';
                    ftColor = '#666';
                  break;
                }
            return (
              <Card width={330} height={167} borderRadius={4} containerStyle={{elevation:0, backgroundColor: bgColor}} >
                <View key={i}>
                  <View style={{flexDirection: "row", justifyContent:'space-between'}}>
                    <Text style={{fontFamily:'Proxima Nova', fontSize: 16, color: '#000', fontWeight: 'bold'}}>Status :</Text>
                    <Button 
                    title={u.leave_status}
                    icon = {
                      <Pending height={20} width={20} style={{marginLeft: -20 }} />
                    }
                    buttonStyle={{ backgroundColor: '#FCEFE3', borderWidth:0.5, borderColor:'#F3AD68' }}
                    titleStyle={{ fontFamily:'Proxima Nova', fontSize: 12, color: '#F3AD68'}}
                    containerStyle={{ width: 100, height:35}}
                    />
                    
                    {/* <Text style={{fontFamily:'Proxima Nova', fontSize: 12, color: '#F3AD68', borderColor:'#F3AD68' }}>
                    {u.leave_status}</Text> */}
                  </View>
                  <View style={{flexDirection: "row", justifyContent:'space-between'}}>
                    <Text style={{fontFamily:'Proxima Nova', fontSize: 16, color: '#000', fontWeight: 'bold'}}>Type :</Text>
                    <Text style={{fontFamily:'Proxima Nova', fontSize: 12, color: '#000'}}>{u.leave_type_name}</Text>
                  </View>
                  <View style={{flexDirection: "row", justifyContent:'space-between'}}>
                    <Text style={{fontFamily:'Proxima Nova', fontSize: 16, color: '#000', fontWeight: 'bold'}}>From :</Text>
                    <Text style={{fontFamily:'Proxima Nova', fontSize: 12, color: '#000'}}>{u.formatedFromDate} To {u.formatedToDate}</Text>
                  </View> 
                  <View>
                    <Text key={u.leaves_id.toString()} onPress={(e) => ViewDetails(e,u.leaves_id)}>View Details</Text>
                  </View>
                </View>
              </Card>
            );
            })
          }
        </View>
      )}
    return(
        <ScrollView contentContainerStyle={{flexGrow: 1, justifyContent: 'center', backgroundColor: '#F6F6F6', width: '100%', marginTop: 10, borderTopLeftRadius:40, borderTopRightRadius:40 }}>
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
    
  },
});