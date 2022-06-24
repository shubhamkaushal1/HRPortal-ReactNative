import React, {useState,useEffect} from 'react';
import { SafeAreaView, StyleSheet, Text, View,TextInput,Image,TouchableOpacity } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import {Input, Button } from 'react-native-elements';
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
  faPaperclip
} from "@fortawesome/free-solid-svg-icons";
import DateTimePicker from '@react-native-community/datetimepicker';
import DocumentPicker from 'react-native-document-picker';
import Toast from 'react-native-toast-message';

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
      //  console.log(data.jwt);
    return ( 
     <View style={{marginTop:15}}>
      <View>
        <Text style={{fontSize:16, fontWeight:'600'}}>Type</Text>
      </View>
      <View>
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
      </View>
    </View>
    
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

    const selectFile = async () => {
      try {
      
        const res = await DocumentPicker.pick({
          
          type: [DocumentPicker.types.allFiles],
        });
        console.log('res : ' + JSON.stringify(res));
        setSingleFile(res);
      } catch (err) {
        console.log('errrrr');
        setSingleFile(null);
        if (DocumentPicker.isCancel(err)) {
          alert('Canceled');
        } else {
          alert('Unknown Error: ' + JSON.stringify(err));
          throw err;
        }
      }
    };

    const reasonInput = () => {
 
        return (
          <View style={{backgroundColor:'#F4F5F7', marginTop:15, paddingVertical:12,}}>
            <View style={{paddingHorizontal:12}}>
              <Text>Reason</Text>
              <TextInput numberOfLines={4} multiline={true} />
            </View>
            <View style={{paddingHorizontal:12}}>
            <TouchableOpacity
              style={styles.buttonStyle}
              activeOpacity={0.5}
              onPress={selectFile}>
            <FontAwesomeIcon icon={faPaperclip} size={16} style={{ color: "#657785", paddingVertical:18 }} />
            </TouchableOpacity>
            </View>
          </View>
        );

    };


    const datePickers = () => {
     
        return (
          <View styles={styles.MainContainer}>
          <View style={styles.sectionStyle}>
            <View style={{flexDirection:'column'}}>
            <View>
              <Text style={{fontSize:16, fontWeight:'600'}}>From</Text>
            </View>
            <View style={{flexDirection:'row', borderWidth:0.5, borderRadius:2, width:150, height:35, paddingHorizontal:10}}>
              <FontAwesomeIcon icon={faCalendarAlt} size={16} style={{ color: "#657785", paddingVertical:18 }} />
              <TextInput
                placeholder="To"
                underlineColorAndroid="transparent"
                style={{paddingVertical:1, color:'#657785', fontSize:14}}
                // editable={false}
                onFocus={showDatePickerTo}
                value={todate.toDateString()}/>
            </View>
            </View>
            <View style={{flexDirection:'column'}}>
            <View>
              <Text style={{fontSize:16, fontWeight:'600'}}>To</Text>
            </View>
            <View style={{flexDirection:'row', borderWidth:0.5, borderRadius:2, width:150, height:35, paddingHorizontal:10}}>
              <FontAwesomeIcon icon={faCalendarAlt} size={16} style={{ color: "#657785", paddingVertical:18 }} />
              <TextInput
                placeholder="From"
                underlineColorAndroid="transparent"
                style={{paddingVertical:1, color:'#657785', fontSize:14}}
                // editable={false}
                onFocus={showDatePickerFrom}
                value={fromdate.toDateString()}/>
            </View>

            </View>
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
        <View>
          {renderLabel()}
          {datePickers()}
          {leaveArr()}
          {reasonInput()}
        </View>
        <View style={{marginTop:15, marginLeft:250}}>
          <Button
            title={`Submit`}
            containerStyle={{ width: 80, height:35, borderRadius: 20 }}
            buttonStyle={{ backgroundColor: '#23B33A', width: 86, height:35, }}
            titleStyle={{ color: '#FFFFFF', fontFamily:'Proxima Nova,Semibold', fontSize: 14, fontWeight: 'bold'}}
            />
        </View>
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
      height: 30,
      width:150,
      backgroundColor:'#F4F5F7',
      color:'#657785',
      borderColor: '#DBDBDB',
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
      justifyContent:'space-between',
      alignItems: 'center',
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
  