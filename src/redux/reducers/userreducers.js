import { SET_USER_ATTENDENCE, SET_USER_DETAILS, SET_USER_TOKEN, SET_USER_JWT,SET_USER_LEAVE_TYPES,SET_APP_URL,SET_LEAVE_LIST } from '../actions/useractions';

const initialState = {
    details: {},
    leavetypes: [],
    leavelist: [],
    token: '',
    jwt: '',
    appUrl: '',
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
        case SET_APP_URL:
            return { ...state, appUrl: action.payload };
        case SET_USER_LEAVE_TYPES:
            return { ...state, leavetypes: [...action.payload]};
        case SET_LEAVE_LIST:
            return { ...state, leavelist: [...action.payload]};
        default:
            return state;
    }
}

export default userReducer;

