import { SET_USER_DETAILS, SET_USER_TOKEN } from '../actions/useractions';

const initialState = {
    details: {},
    token: '',
}

function userReducer(state = initialState, action) {
    switch (action.type) {
        case SET_USER_DETAILS:
            return { ...state, details: action.payload };
        case SET_USER_TOKEN:
            return { ...state, token: action.payload };
        default:
            return state;
    }
}

export default userReducer;

