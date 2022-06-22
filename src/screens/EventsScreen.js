import React, { useState } from "react";
import { View, Switch, StyleSheet, Text,Dimensions,SafeAreaView } from "react-native";
import { useSelector, useDispatch } from 'react-redux';
import { LoggingOut } from "../api/firebaseMethods";
import { setDetails, setToken, setAttendence } from '../redux/actions/useractions';
import { Card, ListItem, Button, Header } from 'react-native-elements';
import Moment from 'moment';
import EventCalendar from 'react-native-events-calendar';
let {width} = Dimensions.get('window');
const EventsScreen = () => {
    const [events, setEvents] = useState([
        {
          start: '2020-01-01 00:00:00',
          end: '2020-01-01 02:00:00',
          title: 'New Year Party',
          summary: 'xyz Location',
        },
        {
          start: '2020-01-01 01:00:00',
          end: '2020-01-01 02:00:00',
          title: 'New Year Wishes',
          summary: 'Call to every one',
        },
        {
          start: '2020-01-02 00:30:00',
          end: '2020-01-02 01:30:00',
          title: 'Parag Birthday Party',
          summary: 'Call him',
        },
        {
          start: '2020-01-03 01:30:00',
          end: '2020-01-03 02:20:00',
          title: 'My Birthday Party',
          summary: 'Lets Enjoy',
        },
        {
          start: '2020-02-04 04:10:00',
          end: '2020-02-04 04:40:00',
          title: 'Engg Expo 2020',
          summary: 'Expoo Vanue not confirm',
        },
      ]);
     
      const eventClicked = (event) => {
        //On Click of event showing alert from here
        alert(JSON.stringify(event));
      };
     
      return (
        <SafeAreaView style={styles.container}>
          <View style={styles.container}>
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
              initDate={'2020-01-01'}
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
  });