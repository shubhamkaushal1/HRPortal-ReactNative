import {SET_EVENT_LIST,SET_TASK_REPORT,SET_REPORT_NAME,SET_ANNOUCEMENT_DETAILS,SET_REPORT_ID,SET_TASK_LIST,SET_USER_ATTENDENCE, SET_USER_DETAILS, SET_USER_TOKEN, SET_USER_JWT,SET_USER_LEAVE_TYPES,SET_APP_URL,SET_LEAVE_LIST,SET_LEAVE_DETAIL_ID,SET_LEAVE_DETAILS } from '../actions/useractions';

const initialState = {
    details: {},
    leavetypes: [],
    leavelist: [],
    tasklist: [],
    taskReport:[],
    annoucementList:[],
    eventList:[],
    leave_details: {},
    token: '',
    jwt: '',
    appUrl: '',
    leave_detail_id: '',
    report_id: '',
    report_name:'',
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
        case SET_LEAVE_DETAIL_ID:
            return { ...state, leave_detail_id: action.payload };
        case SET_REPORT_ID:
                return { ...state, report_id: action.payload };
        case SET_REPORT_NAME:
                    return { ...state, report_name: action.payload };
                
        case SET_USER_LEAVE_TYPES:
            return { ...state, leavetypes: [...action.payload]};
        case SET_LEAVE_LIST:
            return { ...state, leavelist: [...action.payload]};
        case SET_ANNOUCEMENT_DETAILS:
            return { ...state, annoucementList: [...action.payload]};
        case SET_EVENT_LIST:
                return { ...state, eventList: [...action.payload]};      
            
        case SET_TASK_REPORT:
                return { ...state, taskReport: [...action.payload]};
            
        case SET_TASK_LIST:
            return { ...state, tasklist: [...action.payload]};
        case SET_LEAVE_DETAILS:
            return { ...state, leave_details: action.payload };
                // return { ...state, leave_details: [...action.payload]};
        default:
            return state;
    }
}

export default userReducer;

