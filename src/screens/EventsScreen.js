import React, { useState,useEffect } from "react";
import { View, Switch, StyleSheet, Text,Dimensions,SafeAreaView,Toast } from "react-native";
import { useSelector, useDispatch } from 'react-redux';
import { LoggingOut } from "../api/firebaseMethods";
import { setDetails, setToken, setAttendence } from '../redux/actions/useractions';
import { Card, ListItem, Button, Header } from 'react-native-elements';

import EventCalendar from 'react-native-events-calendar';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { eventsListApi } from '../api/apis';
let {width} = Dimensions.get('window');

const EventsScreen = () => {
  const data = useSelector(state => state.userReducer);
  const [events, setEvents] = useState([]);
  const [eventList, setEventsList] = useState([])
  const displayData = async () => {
    try {
      let jwtToken = await AsyncStorage.getItem('jwtToken');
      eventsListApi(jwtToken,setEvents);
    }
    catch (error) {
      alert(error)
    }
  }
    useEffect(() => {
      displayData();

    }, [])
      const eventClicked = (event) => {
        //On Click of event showing alert from here
        alert(JSON.stringify(event.summary));

      };
     
      return (
        <SafeAreaView style={styles.container}>
          <View style={styles.container}>
            {/* <Text>{ Moment().format('YYYY-MM-DD')}</Text> */}
            <EventCalendar
              eventTapped={eventClicked}
              // Function on event press
              events={events}
              // Passing the Array of event
              width={width}
              // Container width
              size={60}
              // number of date will render before and after initDate
              // (default is 30 will render 30 day before initDate
              // and 29 day after initDate)
              // initDate={ Moment().format('YYYY-MM-DD')}
              // Show initial date (default is today)
              scrollToFirst
              // Scroll to first event of the day (default true)
            />
          </View>
        </SafeAreaView>
      );
}


export default EventsScreen;
const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
    buttonStyle: { backgroundColor: "#000000" },
  });