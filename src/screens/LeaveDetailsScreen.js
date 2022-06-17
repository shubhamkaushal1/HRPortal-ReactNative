import React, { useState,useEffect } from "react";
import { View, Switch, StyleSheet, Text ,Alert} from "react-native";
import { useSelector, useDispatch } from 'react-redux';
import { setDetails, setToken, setAttendence,setLeaveDetails } from '../redux/actions/useractions';
import { Card, ListItem, Button, Icon,Header } from 'react-native-elements';
const LeaveDetails = () => {
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
        console.log(xxx);
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
    <View>
     {/* <Button onPress={(e) => leaveRevoke(e,data.leave_details.leaves_id)}></Button> */}
     {data.leave_details.leave_status=='Revoked'||data.leave_details.leave_status=='Approved'?<Button title="Revoke" disabled={true}></Button>:<Button title="Revoke" onPress={(e) => showAlert()}></Button>
     }
     
     <Card>
   
   
    {           
        data.leave_details.leaves_id?
         <View>
             <Text>Apply :{data.leave_details.formatedApplyDate}</Text>
             <Text>Status :{data.leave_details.leave_status}</Text>
             <Text>Type :{data.leave_details.leave_type_name}</Text>
             <Text>From :{data.leave_details.formatedFromDate} To {data.leave_details.formatedToDate}</Text>
             <Text>Reason :{data.leave_details.reasons}</Text>
             <Text>Reason :{data.leave_details.leaves_id}</Text>
        </View>:
             
             <Text>No Data Here</Text>
        }
   


</Card>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  }
});

export default LeaveDetails;