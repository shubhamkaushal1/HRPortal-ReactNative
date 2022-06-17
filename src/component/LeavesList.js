import React, {useState,useEffect} from 'react';
import { View, Text, StyleSheet,ScrollView, Switch, Image} from 'react-native';
import { Card, ListItem, Button, Header } from 'react-native-elements';
import { useSelector, useDispatch } from 'react-redux';
import {setLeavelist } from '../redux/actions/useractions';
import Applyleave from '../screens/LeaveApplyScreen';
import Pending from "../../assets/Pending.svg";

export default function LeaveListComponent({ navigation }) {
  const dispatch = useDispatch();
  const data = useSelector(state => state.userReducer);
  const apiUrl = data.appUrl;

  const getData = async() =>{
 
    try{
        const response = await fetch(`${apiUrl}/api/leaves/leaves/user-by-leave`,{
          method: 'GET',
          headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${data.jwt}` },
          // body: JSON.stringify({})
        });

        // console.log(response);
        const result = await response.json();
        const leavesData = result.data;
        dispatch(setLeavelist(leavesData));
        }
        catch(err) {
          throw err;
          console.log(err);
        }
       
        };
        useEffect(()=>{
          getData();
      
      },[])
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
                onPress={() => navigation.navigate(Applyleave)}
              />
            </View>
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