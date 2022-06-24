import React, { useState,useEffect } from "react";
import { View, Switch, StyleSheet, Text ,Alert} from "react-native";
import { useSelector, useDispatch } from 'react-redux';
import { setDetails, setToken, setAttendence,setLeaveDetails } from '../redux/actions/useractions';
import { Card, ListItem, Button, Icon,Header } from 'react-native-elements';
import Pending from "../../assets/Pending.svg";
import Toast from 'react-native-toast-message';
const LeaveDetails = (navigation) => {
  
  const [revoke, setRevoke] = useState(true);
  const dispatch = useDispatch();
  const data = useSelector(state => state.userReducer);
  const apiUrl = data.appUrl;

 
  const showAlert = () =>{
    return Alert.alert(
      "Are your sure?",
      "Are you sure you want to revoke your leave request?",
      [
        {
          text: "Yes",
          onPress: () => {
            setRevoke(false);
            leveRevokeApi();
          },
        },
        // The "No" button
        // Does nothing but dismiss the dialog when tapped
        {
          text: "No",
        },
      ]
    );
  }
  const leveRevokeApi = async() =>{
  
  
    try{
      
      
        const responsedata = await fetch(`${apiUrl}/api/leaves/leaves/delete-leave?id=${data.leave_details.leaves_id}`,{
          method: 'DELETE',
          headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${data.jwt}` },
          // body: JSON.stringify({})
        });
        
        const xxx = await responsedata.json();
        Toast.show({
          type: 'success',
          text2: 'Leave revoked Successfuly'
        });
        // dispatch(setLeaveDetails(result.data));
        
        }
        catch(err) {
          throw err;
          console.log(err);
        }
       
    };
  const getData = async() =>{
   
    try{
      
        const response = await fetch(`${apiUrl}/api/leaves/leaves/view?id=${data.leave_detail_id}`,{
          method: 'GET',
          headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${data.jwt}` },
          // body: JSON.stringify({})
        });
        const result = await response.json();

        dispatch(setLeaveDetails(result.data));
        
        }
        catch(err) {
          throw err;
          console.log(err);
        }
       
    };

    useEffect(()=>{
      getData();
      console.log(data);
    },[])

  return (
    // return ( 
    //   <View style={styles.container}>
    //     <View styele={{backgroundColor: '#fff', marginTop: 10, width: 380, height: 637}}>
    //       <View style={{flexDirection: "row", justifyContent:'space-between', marginTop: 30, marginLeft: 18, width: 320}}>
    //         <Text style={{fontSize:20, fontFamily:'Proxima Nova', fontWeight:'700', color:'#13171A'}}>Leave Status</Text>
    //         <Button
    //           title={`Apply For Leave`}
    //           buttonStyle={{ backgroundColor: '#23B33A' }}
    //           titleStyle={{ color: '#FFFFFF', fontFamily:'Proxima Nova,Semibold', fontSize: 14, fontWeight: 'bold'}}
    //           containerStyle={{ width: 130, height:35, borderRadius: 20 }}
    //           onPress={() => navigation.navigate(Applyleave)}
    //         />
    //       </View>
    //     <View>
    //     {
    //       users.map((u, i) => {
    //         let bgColor;
    //         let ftColor ;
    //         let leaveStatus = u.leave_status;
    //         console.log("unstoppable",u.leave_status);
    //           switch (leaveStatus) {
    //             case 'Pending':
    //               bgColor = '#FFFCF9';
    //               ftColor = '#C57F3A';
    //             break;

    //             case 'Approved':
    //               bgColor = '#F5FFF6';
    //               ftColor = '#457E4E';
    //             break;

    //             case 'Rejected':
    //               bgColor = '#FFF7F6';
    //               ftColor = '#BB0B06';
    //             break;

    //             default:
    //               bgColor = '#F4F4F4';
    //               ftColor = '#666';
    //             break;
    //           }
    //       return (
    //         <Card width={330} height={167} borderRadius={4} containerStyle={{elevation:0, backgroundColor: bgColor}} >
    //           <View key={i}>
    //             <View style={{flexDirection: "row", justifyContent:'space-between'}}>
    //               <Text style={{fontFamily:'Proxima Nova', fontSize: 16, color: '#000', fontWeight: 'bold'}}>Status :</Text>
    //               <Button 
    //               title={u.leave_status}
    //               icon = {
    //                 <Pending height={20} width={20} style={{marginLeft: -20 }} />
    //               }
    //               buttonStyle={{ backgroundColor: '#FCEFE3', borderWidth:0.5, borderColor:'#F3AD68' }}
    //               titleStyle={{ fontFamily:'Proxima Nova', fontSize: 12, color: '#F3AD68'}}
    //               containerStyle={{ width: 100, height:35}}
    //               />
                  
    //               {/* <Text style={{fontFamily:'Proxima Nova', fontSize: 12, color: '#F3AD68', borderColor:'#F3AD68' }}>
    //               {u.leave_status}</Text> */}
    //             </View>
    //             <View style={{flexDirection: "row", justifyContent:'space-between'}}>
    //               <Text style={{fontFamily:'Proxima Nova', fontSize: 16, color: '#000', fontWeight: 'bold'}}>Type :</Text>
    //               <Text style={{fontFamily:'Proxima Nova', fontSize: 12, color: '#000'}}>{u.leave_type_name}</Text>
    //             </View>
    //             <View style={{flexDirection: "row", justifyContent:'space-between'}}>
    //               <Text style={{fontFamily:'Proxima Nova', fontSize: 16, color: '#000', fontWeight: 'bold'}}>From :</Text>
    //               <Text style={{fontFamily:'Proxima Nova', fontSize: 12, color: '#000'}}>{u.formatedFromDate} To {u.formatedToDate}</Text>
    //             </View> 
    //             <View>
    //               <Text key={u.leaves_id.toString()} onPress={(e) => ViewDetails(e,u.leaves_id)}>View Details</Text>
    //             </View>
    //           </View>
              
    //         </Card>
    //       );
    //       })
    //     }
    //       </View>    
    //     </View>
    //   </View>
    // )

    <View style={styles.container}>
      <View style={{flexDirection: "row", justifyContent:'space-between', marginTop: 16, marginLeft: 18, width: 320 }}>
        <Text style={{fontSize:20, fontFamily:'Proxima Nova', fontWeight:'700', color:'#13171A'}}>Details</Text>
        {data.leave_details.leave_status=='Revoked'||data.leave_details.leave_status=='Approved'?<Button title="Revoke" disabled={true}></Button>:<Button
          title={`Revoke`}
          buttonStyle={{ backgroundColor: '#BB0B06' }}
          titleStyle={{ color: '#FFFFFF', fontFamily:'Proxima Nova,Semibold', fontSize: 14,}}
          containerStyle={{ width: 100, height:35, borderRadius: 20 }}
          onPress={(e) => showAlert()}
          />     
        }
      </View>
     {/* <Button onPress={(e) => leaveRevoke(e,data.leave_details.leaves_id)}></Button> */}
     <View style={styles.detailContainer}>
      <Card borderRadius={4} containerStyle={{elevation:0, backgroundColor: '#FFFCF9', borderColor: '#F3AD68', height: 470}} >
        {           
          data.leave_details.leaves_id?
          <View>
            <View style={{flexDirection: "row", justifyContent:'space-between', width: 180}}>
              <Text style={{fontFamily:'Proxima Nova', fontSize: 16, color: '#000', fontWeight: 'bold'}}>Apply</Text>
              <Text style={{fontFamily:'Proxima Nova', fontSize: 16, color: '#000'}}>{data.leave_details.formatedApplyDate}</Text>
            </View>
            <View style={{flexDirection: "row", width: 230, marginTop: 15, justifyContent:'space-between'}}>
              <Text style={{fontFamily:'Proxima Nova', fontSize: 16, color: '#000', fontWeight: 'bold'}}>Status</Text>
              <Button 
                  icon = {
                    <Pending height={20} width={20} iconStyle={{marginRight:20}} />
                  }
                  containerStyle={{ width: 120, textAlign: "left", marginHorizontal:20 }}
                  title={data.leave_details.leave_status}
                  buttonStyle={{ backgroundColor: '#FCEFE3', borderWidth:0.5, borderColor:'#F3AD68', borderBottomWidth:0.5 }}
                  titleStyle={{ fontFamily:'Proxima Nova', paddingLeft:10, fontSize: 12, color: '#F3AD68', textTransform:'capitalize'}}
              />
              {/* <Text style={{fontFamily:'Proxima Nova', fontSize: 16, color: '#000', fontWeight: 'bold'}}>{data.leave_details.leave_status}</Text> */}
            </View>
            <View style={{flexDirection: "row", marginTop: 10, width: 180}}>
              <Text style={{fontFamily:'Proxima Nova', fontSize: 16, color: '#000', fontWeight: 'bold'}}>Type</Text>
              <Text style={{fontFamily:'Proxima Nova', fontSize: 16, color: '#CB823B', marginHorizontal:52}}>{data.leave_details.leave_type_name}</Text>
            </View>
            <View style={{flexDirection: "row", marginTop: 10, width: 180, marginTop:15}}>
              <Text style={{fontFamily:'Proxima Nova', fontSize: 16, color: '#000', fontWeight: 'bold'}}>From</Text>
              <View style={{fontFamily:'Proxima Nova', fontSize: 12, color: '#000', marginHorizontal:50,flexDirection: "row"}}>
                <Text style={styles.dateContainer} > {data.leave_details.formatedFromDate}</Text>
                <Text style={{marginTop: 2}}> To </Text>
                <Text style={styles.dateContainer} > {data.leave_details.formatedToDate} </Text>
              </View>
            </View>
            <View style={{flexDirection: "column", marginTop: 10, width: 290, height:263, backgroundColor:'#F6F6F6', paddingLeft:11}}>
              <View style={{paddingTop:12}}>
              <Text style={{fontFamily:'Proxima Nova', fontSize: 16, color: '#000', fontWeight: 'bold'}}>Reason</Text>
              <Text style={{fontFamily:'Proxima Nova', fontSize: 14, color: '#657785', textAlign: 'justify', paddingRight: 11}}>{data.leave_details.reasons}</Text>
              </View>
            </View>
          </View>: <Text>No Data Here</Text>
        }
      </Card>
     </View>  
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    width: 360,
    height:600,
    marginTop: 35,
    marginLeft: 16,
    
  },
  detailContainer: {
    backgroundColor: '#FFFCF9',
  },
  dateContainer:{
    borderWidth:0.5, 
    borderRadius: 2,
    borderColor:'#DBDBDB', 
    padding: 4
  }
});

export default LeaveDetails;