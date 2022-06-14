import React, {useState,useEffect} from 'react';
import { Button, SafeAreaView, StyleSheet, Text, View,TextInput,Image } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import { useSelector, useDispatch } from 'react-redux';
import { setDetails, setToken, setJWT,setLeavetype } from '../redux/actions/useractions';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {
  faEye,
  faSearch,
  faBars,
  faSmile,
  faAddressBook,
  faCalendar,
  faCalendarAlt,
} from "@fortawesome/free-solid-svg-icons";
import DateTimePicker from '@react-native-community/datetimepicker';

  const DropdownComponent = () => {
    
    const dispatch = useDispatch();
    const [date, setDate] = useState(new Date())
    const [open, setOpen] = useState(false)
    const data = useSelector(state => state.userReducer);
    const [value, setValue] = useState(null);
    const [isFocus, setIsFocus] = useState(false);
    const apiUrl = data.appUrl;
    const [todatePicker, setToDatePicker] = useState(false);
  const [fromdatePicker, setFromDatePicker] = useState(false);
 
  const [todate, setToDate] = useState(new Date());
  const [fromdate, setFromDate] = useState(new Date());
  function showDatePickerTo() {
    setToDatePicker(true);
  };
  function showDatePickerFrom() {
    setFromDatePicker(true);
  };
  function onDateSelectedTo(event, value) {
    setToDate(value);
    setToDatePicker(false);
  }; 
   function onDateSelectedFrom(event, value) {
    setFromDate(value);
    setFromDatePicker(false);
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
 

  },[])

  const leaveArr = () => {
    const leaveId =[];
    const leaveName =[];
    var leaves = data.leavetypes;
    const ids = leaves.map((val) =>
    leaveId.push(val.id),
    );
    const name = leaves.map((name) =>
    leaveName.push(name.leave_type_name),
    );
    var finalObj = [];
    for(var i = 0; i < leaveId.length; i++){
      finalObj[i] = {
        label:leaveName[i] ,
        value: leaveId[i]
      }
       }
       console.log(data.jwt);
    return ( 
     
      <Dropdown
      style={[styles.dropdown, isFocus && { borderColor: 'blue' }]}
      placeholderStyle={styles.placeholderStyle}
      selectedTextStyle={styles.selectedTextStyle}
      inputSearchStyle={styles.inputSearchStyle}
      iconStyle={styles.iconStyle}
      data={finalObj}
      search={false}
      maxHeight={300}
      labelField="label"
      valueField="value"
      placeholder={!isFocus ? 'Select item' : '...'}
      searchPlaceholder="Search..."
      value={value}
      onFocus={() => setIsFocus(true)}
      onBlur={() => setIsFocus(false)}
      onChange={item => {
        setValue(item.value);
        setIsFocus(false);
      }}

    />
    
    );
  }
    const renderLabel = () => {
      if (value || isFocus) {
        return (
          <Text style={[styles.label, isFocus && { color: 'blue' }]}>
           Leave Type
          </Text>
        );
      }
      return null;
    };

    const datePickers = () => {
     
        return (
          <View styles={styles.MainContainer}>

          <View style={styles.sectionStyle}>
          <FontAwesomeIcon icon={faCalendarAlt} size={30} style={{ color: "blue" }} />
                
                <TextInput
                  style={{flex: 1}}
                  placeholder="To"
                  underlineColorAndroid="transparent"
                  // editable={false}
                  onFocus={showDatePickerTo}
                  value={todate.toDateString()}
                />
                <FontAwesomeIcon icon={faCalendarAlt} size={30} style={{ color: "blue" }} />
                
                <TextInput
                  style={{flex: 1}}
                  placeholder="From"
                  underlineColorAndroid="transparent"
                  // editable={false}
                  onFocus={showDatePickerFrom}
                  value={fromdate.toDateString()}
                />
              </View>
          
          
            {todatePicker && (
              <DateTimePicker
                value={todate}
                mode={'date'}
                display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                is24Hour={true}
                onChange={onDateSelectedTo}
                style={styles.datePicker}
              />
            )}
              {fromdatePicker && (
              <DateTimePicker
                value={fromdate}
                mode={'date'}
                display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                is24Hour={true}
                onChange={onDateSelectedFrom}
                style={styles.datePicker}
              />
            )}
          
          
          
          </View>
        );
      
    
    };
// console.log(item.value);
    return (
      
      <View style={styles.container}>
        
        {renderLabel()}
        {leaveArr()}
        {datePickers()}
      </View>
    );
  };

  export default DropdownComponent;

  const styles = StyleSheet.create({
    container: {
      backgroundColor: 'white',
      padding: 16,
    },
    dropdown: {
      height: 50,
      borderColor: 'gray',
      borderWidth: 0.5,
      borderRadius: 8,
      paddingHorizontal: 8,
    },
    icon: {
      marginRight: 5,
    },
    label: {
      position: 'absolute',
      backgroundColor: 'white',
      left: 22,
      top: 8,
      zIndex: 999,
      paddingHorizontal: 8,
      fontSize: 14,
    },
    placeholderStyle: {
      fontSize: 16,
    },
    selectedTextStyle: {
      fontSize: 16,
    },
    iconStyle: {
      width: 20,
      height: 20,
    },
    inputSearchStyle: {
      height: 40,
      fontSize: 16,
    },
    MainContainer: {
      flex: 1,
      padding: 6,
      alignItems: 'center',
      backgroundColor: 'white'
    },
    sectionStyle: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#fff',
      borderWidth: 0.5,
      borderColor: '#000',
      height: 40,
      borderRadius: 5,
      margin: 10,
    },
    imageStyle: {
      padding: 10,
      margin: 5,
      height: 25,
      width: 25,
      resizeMode: 'stretch',
      alignItems: 'center',
    },
    text: {
      fontSize: 25,
      color: 'red',
      padding: 3,
      marginBottom: 10,
      textAlign: 'center'
    },
  
    // Style for iOS ONLY...
    datePicker: {
      justifyContent: 'center',
      alignItems: 'flex-start',
      width: 320,
      height: 260,
      display: 'flex',
    },
  });
  