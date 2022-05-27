import { AsyncStorage } from '@react-native-async-storage/async-storage';

export const SET_USER_DETAILS = 'SET_USER_DETAILS';
export const SET_USER_TOKEN = 'SET_USER_TOKEN';

export const setDetails = details => dispatch => {
    dispatch({
        type: SET_USER_DETAILS,
        payload: details,
    });
};
export const setToken = token => dispatch => {
    dispatch({
        type: SET_USER_TOKEN,
        payload: token,
    });
};
