import createDataContext from "./createDataContext";
// import firebasedata from "../api/firebasedata";
import { AsyncStorage } from '@react-native-async-storage/async-storage';
// import { navigate } from '../navigationRef';

const authReducer = (state, action) => {
    switch(action.type){
        case'add_error':
            return { ...state, errorMessage:action.payload };
        case 'signin':
            return { errorMessage: '', token:action.payload };
        default:
            return state;
    }
};

const signIn = dispatch => async ({user}) => {
        try {
            const response = await firebasedata.post('./signin',{user});
            await AsyncStorage.setItem('token',response.data.token);
            dispatch({ type:'signin', payload: response.data.token });
            // await AsyncStorage.getItem('token');
            console.log(response.data);
            navigate('Dashboard');
        } catch (err) {
            dispatch({
                type: 'type_error',
                payload: 'Something went wrong during sign in'
            })
            console.log(err.message);
        }
    };


const signOut = (dispatch) => {
    return() => {
        //signout
    }
}

export const { Provider, Context } = createDataContext(
    authReducer,
    { signIn, signOut },
    { token:null, errorMessage: '' }
);