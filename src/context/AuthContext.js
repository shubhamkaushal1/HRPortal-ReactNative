// import createDataContext from "./createDataContext";
// import firebasedata from "../api/firebasedata";
import { AsyncStorage } from '@react-native-async-storage/async-storage';
// import { navigate } from '../navigationRef';

export const authReducer = (state, action) => {
    switch(action.type){
        case'add_error':
            return { ...state, errorMessage:action.payload };
        case 'signin':
            return { errorMessage: '', token:action.payload };
        default:
            return state;
    }
};