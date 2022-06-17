import React, {useState,useEffect} from 'react';
import { StyleSheet, View,Text,SafeAreaView,ScrollView,FlatList,Image } from 'react-native';
  import { Dropdown } from 'react-native-element-dropdown';
  import { useSelector, useDispatch } from 'react-redux';
import {setLeavelist,setLeaveDetailId,setLeaveDetails } from '../redux/actions/useractions';
// import DatePicker from 'react-native-date-picker';
import Applyleave from '../screens/LeaveApplyScreen';
import { Card, ListItem, Button, Icon,Header } from 'react-native-elements';


  const LeaveListComponent = ({props}) => {
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
          return (
      <Card>
   
        <View key={i}>
         
          <Text>Status :{u.leave_status}</Text>
          <Text>Type :{u.leave_type_name}</Text>
          <Text>From :{u.from_date} To {u.to_date}</Text>
          <Text key={u.leaves_id.toString()} onPress={(e) => ViewDetails(e,u.leaves_id)}>View Details</Text>
          
        </View>
     
 
</Card>
 );
})
}
        </View>
      
      );
      }
      return(
        
        <View>
          <ScrollView>
          {leavesData()}
        </ScrollView>
        </View>
        
      );
  }

  export default LeaveListComponent;
