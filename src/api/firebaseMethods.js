import firebase from 'firebase/compat/app';
// import "firebase/firestore";
import {Alert} from "react-native";

export async function LoggingOut() {
  try {
    await firebase.auth().signOut();
  } catch (err) {
    Alert.alert('There is something wrong!', err.message);
  }
}