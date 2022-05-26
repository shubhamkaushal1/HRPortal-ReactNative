import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Alert} from 'react-native';
import { State, TouchableOpacity } from 'react-native-gesture-handler';
import firebase from 'firebase/compat/app';
import auth from '@react-native-firebase/auth';
import {LoggingOut} from "../api/firebaseMethods";
import { useSelector } from 'react-redux';
import { setDetails, setToken } from '../redux/actions';

export default function Dashboard({ navigation }) {
  const data = useSelector(state => state.userReducer);
  

  return (
    <View>
      <Text>Dashboard</Text>
      <Text >Name { data.details.name }</Text>
      <Text >Email { data.details.email }</Text>
      <Text >Token {data.token}</Text>
    </View>
  )
}