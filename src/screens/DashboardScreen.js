import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet,ScrollView, Switch, Image} from 'react-native';
import { State, TouchableOpacity } from 'react-native-gesture-handler';
import firebase from 'firebase/compat/app';
import auth from '@react-native-firebase/auth';
import {LoggingOut} from "../api/firebaseMethods";
import { useSelector, useDispatch } from 'react-redux';
// import { setDetails, setToken, setAttendence,setLeavetype } from '../redux/actions/useractions';
import { setDetails, setToken, setJWT,setLeavetype,setLeavelist } from '../redux/actions/useractions';
import ToggleSwitch from 'rn-toggle-switch';
import { Card,Button } from 'react-native-elements';
import Santa from "../Img/santa.svg";
import Newyear from "../Img/newyear.svg";
import ScrollingButtonMenu from 'react-native-scroll-menu';

export default function Dashboard({ navigation }) {
  const data = useSelector(state => state.userReducer);
  const dispatch = useDispatch();
  console.log('dashboard',data.leavelist);
  const [Enable , setEnable]  = useState(false);
  const [leaveId, setLeaveId] = useState(null)
  const apiUrl = data.appUrl;
  const getLeaveLists = async() =>{ 

   
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

  const getData = async() =>{
   
    try{
      
        const response = await fetch(`${apiUrl}/api/leaves/leave-type/list`,{
          method: 'GET',
          headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${data.jwt}` },
          // body: JSON.stringify({})
        });

        // console.log(response);
        const result = await response.json();
        const leaves = result.data;
        
        dispatch(setLeavetype(leaves));
        }
        catch(err) {
          throw err;
          console.log(err);
        }
       
    };
useEffect(()=>{
  getData();
  getLeaveLists();


},[])
  const handleLeaveData = (leavedata) =>{
    setLeaveId(leavedata.id)
  }
  const toggle = (state)=>{
    setEnable(state);
  }
  const leaveTypeLabel =() =>{
    const leaveIds =[];
    const leaveName =[];
    var leaves = data.leavetypes;
    const ids = leaves.map((val) =>
    leaveIds.push(val.id),
    );
    const name = leaves.map((name) =>
    leaveName.push(name.leave_type_name),
    );
    var finalObj = [];
    for(var i = 0; i < leaveIds.length; i++){
      finalObj[i] = {
        id: leaveIds[i],
        name:leaveName[i] ,
        
      }
       }
       return (
        <ScrollingButtonMenu buttonStyle={{width: 80, height:35, borderRadius: 20, borderColor:"#D4EEFF", backgroundColor:"#D4EEFF", marginHorizontal: 5}}
        textStyle={{ color: '#024E7D', fontFamily:'Proxima Nova,Semibold', fontSize: 14, fontWeight: 'bold', textAlign:'center', justifyContent: 'center'}}
        activeColor = '#D4EEFF'
        activeBackgroundColor= '#024E7D'
           items={finalObj}
          onPress={handleLeaveData}
          selected={leaveId}
      />
       );
  }
  const leaveLists = () => {
        
    const users = data.leavelist;
    // console.log('users');
    return ( 
   
      <View style={{flexDirection: "row"}}>
        {
      users.map((u, i) => {
        return (
          <Card width={164} height={91} borderRadius={5} containerStyle={{elevation:0.5,backgroundColor:'#F8F8F8',marginLeft: 1}} >
          {
            <View style={{flexDirection: "column"}}>
              <Text style={{width:'100%', fontSize:14, textAlign:"left", color: '#657785', fontFamily:'Proxima Nova,Semibold', fontWeight:"normal"}}>Full Day Application</Text>
              <Text style={{fontSize:18, color: '#13171A', fontFamily:'Proxima Nova,Semibold', fontWeight: 'bold'}}>{u.formatedFromDate}</Text>
              <Text style={{color: '#CB823B', fontFamily:'Proxima Nova,Semibold', fontSize: 14, fontWeight: 'bold'}}>{u.leave_type_name}</Text>
            </View>
        
          }
        </Card>
);
})
}
      </View>
    
    );
  
  }
  console.log('this',Enable);
  
  if(Enable == true){
    
      const checkedIn = async() =>{
        try{
          const response = await fetch(`${apiUrl}/api/checkin-checkout/checkin`,{
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${data.jwt}` },
             body: JSON.stringify({})
          });
       
          const result = await response.json();
          // console.log('checkedin result',result);
          }
          catch(err) {
            throw err;
            console.log(err);
          }
         
      };

      checkedIn()
  } else {
      const checkedOut = async() =>{
      
        try{
          const response = await fetch(`${apiUrl}/api/checkin-checkout/checkout`,{
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${data.jwt}` },
             body: JSON.stringify({})
          });
       
          const result = await response.json();
          console.log('checkedin result',result);
          }
          catch(err) {
            throw err;
            console.log(err);
          }
         
      };

      checkedOut()
  }
  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }}>
      <View style={styles.container}>
        <ToggleSwitch
          text={{on: 'IN', off: 'OUT', activeTextColor: 'white', inactiveTextColor: '#B7B8BA'}}
          textStyle={{fontWeight: 'bold'}}
          color={{ indicator: 'white', active: '#23B33A', inactive:  '#ED1C17', activeBorder: '#23B33A', inactiveBorder: '#ED1C17'}}
          active={true}
          disabled={false}
          width={50}
          radius={15}
          onValueChange={toggle}
          value={Enable}
        />
      </View>
        <View style={styles.topContainer}>
          <Card width={380} height={212} borderRadius={4} containerStyle={{elevation:0}} >
            <Card.Title style={{width:'100%', fontSize:20,textAlign:"left"}}>My Leave </Card.Title>
            {
              <View>
              <View style={{flexDirection: "row", marginTop:-20, marginLeft:-20 }}>
              {leaveTypeLabel()}
              
                {/* <Button 
                  title="Casual"
                  buttonStyle={{ backgroundColor: '#FCEFE3' }}
                  containerStyle={{
                    width: 80,
                    height:35,
                    borderRadius: 20,
                    marginHorizontal: 5,
                  }}
                  titleStyle={{ color: '#CB823B', fontFamily:'Proxima Nova,Semibold', fontSize: 14, fontWeight: 'bold' }}
                />
                <Button 
                  title="Sick"
                  buttonStyle={{ backgroundColor: '#D4EEFF' }}
                  containerStyle={{
                    width: 80,
                    height:35,
                    borderRadius: 20,
                    marginHorizontal: 5,
                  }}
                  titleStyle={{ color: '#024E7D', fontFamily:'Proxima Nova,Semibold', fontSize: 14, fontWeight: 'bold' }}
                />
                <Button 
                  title="Short"
                  buttonStyle={{ backgroundColor: '#DFDAEB' }}
                  containerStyle={{
                    width: 80,
                    height:35,
                    borderRadius: 30,
                    marginHorizontal: 5,
                  }}
                  titleStyle={{ color: '#492596', fontFamily:'Proxima Nova,Semibold', fontSize: 14, fontWeight: 'bold' }}
                /> */}
              </View>
              {/* <View style={{flexDirection: "row"}}> */}
                {/* <Card width={164} height={91} borderRadius={5} containerStyle={{elevation:0.5,backgroundColor:'#F8F8F8',marginLeft: 1}} >
                  {
                    <View style={{flexDirection: "column"}}>
                      <Text style={{width:'100%', fontSize:14, textAlign:"left", color: '#657785', fontFamily:'Proxima Nova,Semibold', fontWeight:"normal"}}>Full Day Application</Text>
                      <Text style={{fontSize:18, color: '#13171A', fontFamily:'Proxima Nova,Semibold', fontWeight: 'bold'}}>Wed, 16 Dec</Text>
                      <Text style={{color: '#CB823B', fontFamily:'Proxima Nova,Semibold', fontSize: 14, fontWeight: 'bold'}}>Casual</Text>
                    </View>
                
                  }
                </Card>
                <Card width={164} height={91} borderRadius={5} containerStyle={{elevation:0.5,backgroundColor:'#F8F8F8',marginLeft: 1}} >
                  {
                    <View style={{flexDirection: "column"}}>
                      <Text style={{width:'100%', fontSize:14, textAlign:"left", color: '#657785', fontFamily:'Proxima Nova,Semibold', fontWeight:"normal"}}>Full Day Application</Text>
                      <Text style={{fontSize:18, color: '#13171A', fontFamily:'Proxima Nova,Semibold', fontWeight: 'bold'}}>Wed, 16 Dec</Text>
                      <Text style={{color: '#CB823B', fontFamily:'Proxima Nova,Semibold', fontSize: 14, fontWeight: 'bold'}}>Casual</Text>
                    </View>
                
                  }
                </Card> */}
                <ScrollView horizontal={true}>
                {leaveLists()}
                </ScrollView>
                
              {/* </View> */}
              </View>
              
            }
          </Card>
        </View>
        <View style={[styles.topContainer]}>
          <Card width={380} height={212} borderRadius={4} containerStyle={{elevation:0}} >
            <Card.Title style={{width:'100%', fontSize:20,textAlign:"left"}}>Today Task </Card.Title>
            {
              <View>
                <View style={{flexDirection: "row"}}>
                  <Card width={348} height={54} borderRadius={4} containerStyle={{elevation:0.5,backgroundColor:'#FFF',marginLeft: 1, borderColor:'#DBDBDB'}} >
                    {
                      <View style={{flexDirection: "row", justifyContent:'space-between'}}>
                          <Text style={{fontSize:16, fontFamily:'Proxima Nova, Regular'}}>Login Page Functionality</Text>
                          <Button 
                            title="Report"
                            buttonStyle={{ backgroundColor: '#1DA1F2' }}
                            containerStyle={{
                              width: 72,
                              height:36,
                              marginTop:-5,
                              borderRadius: 30,
                            }}
                            titleStyle={{ color: '#E1F3FF', fontFamily:'Proxima Nova,Semibold', fontSize: 14 }}
                          />
                      </View>
                    }
                  </Card>
                </View>
                <View style={{flexDirection: "row"}}>
                  <Card width={348} height={54} borderRadius={4} containerStyle={{elevation:0.5,backgroundColor:'#FFF',marginLeft: 1, borderColor:'#DBDBDB'}} >
                    {
                      <View style={{flexDirection: "row", justifyContent:'space-between'}}>
                          <Text style={{fontSize:16, fontFamily:'Proxima Nova, Regular'}}>Login Page Functionality</Text>
                          <Button 
                            title="Report"
                            buttonStyle={{ backgroundColor: '#1DA1F2' }}
                            containerStyle={{
                              width: 72,
                              height:36,
                              marginTop:-5,
                              borderRadius: 30,
                            }}
                            titleStyle={{ color: '#E1F3FF', fontFamily:'Proxima Nova,Semibold', fontSize: 14 }}
                          />
                      </View>
                    }
                  </Card>
                </View>
              </View>
              
            }
          </Card>
        </View>
        <View style={[styles.topContainer,{marginBottom:300}]}>
          <Card width={380} height={212} borderRadius={4} containerStyle={{elevation:0}} >
            <Card.Title style={{width:'100%', fontSize:20,textAlign:"left"}}>Upcoming Events</Card.Title>
            {
              <View style={{flexDirection:'row'}}>
                <View>
                  <Card width={163} height={100} borderRadius={9} containerStyle={{elevation:0.5,backgroundColor:'#FFFAEE',marginLeft: 1, borderColor:'#DBDBDB'}} >
                    {
                      <View style={{flexDirection:'column',marginTop:-10}}>
                        <View style={{flexDirection:'row', justifyContent:'space-between'}}>
                          <Text style={{fontSize:30, fontFamily:'Proxima Nova, Regular', fontWeight:'bold', color:'#705205'}}>25</Text>
                          <Santa height={50} width={50}/>
                        </View>
                        <View>
                          <Text style={{color:'#13171A', fontFamily:'Proxima Nova, Regular', fontSize:14}}>December 2022</Text>
                          <Text style={{color:'#705205', fontFamily:'Proxima Nova, Regular', fontSize:16}}>Christmas</Text>
                        </View> 
                      </View>
                    }
                  </Card>
                </View>
                <View>
                  <Card width={163} height={100} borderRadius={9} containerStyle={{elevation:0.5,backgroundColor:'#E8F5FE',marginLeft: 1, borderColor:'#DBDBDB'}} >
                    {
                      <View style={{flexDirection:'column',marginTop:-10}}>
                      <View style={{flexDirection:'row', justifyContent:'space-between'}}>
                        <Text style={{fontSize:30, fontFamily:'Proxima Nova, Regular', fontWeight:'bold', color:'#705205'}}>01</Text>
                        <Newyear height={50} width={50}/>
                      </View>
                      <View>
                        <Text style={{color:'#13171A', fontFamily:'Proxima Nova, Regular', fontSize:14}}>January 2023</Text>
                        <Text style={{color:'#705205', fontFamily:'Proxima Nova, Regular', fontSize:16}}>Happy New Year</Text>
                      </View> 
                    </View>
                    }
                  </Card>
                </View>
              </View>
              
            }
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
    borderTopLeftRadius:40,
    borderTopRightRadius:40
  },
  topContainer: {
    flex: 1,
    alignItems: 'center', 
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center'
  }
});