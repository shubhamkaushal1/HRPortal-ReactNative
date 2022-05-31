import { SET_USER_ATTENDENCE, SET_USER_DETAILS, SET_USER_TOKEN, SET_USER_JWT } from '../actions/useractions';

const initialState = {
    details: {},
    token: '',
    jwt: '',
    attendence:false
}

function userReducer(state = initialState, action) {
    switch (action.type) {
        case SET_USER_DETAILS:
            return { ...state, details: action.payload };
        case SET_USER_TOKEN:
            return { ...state, token: action.payload };
        case SET_USER_JWT:
            return { ...state, jwt: action.payload };
        case SET_USER_ATTENDENCE:
            return { ...state, attendence: action.payload };
        default:
            return state;
    }
}

export default userReducer;

