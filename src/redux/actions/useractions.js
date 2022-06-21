import { AsyncStorage } from '@react-native-async-storage/async-storage';

export const SET_USER_DETAILS = 'SET_USER_DETAILS';
export const SET_USER_TOKEN = 'SET_USER_TOKEN';
export const SET_USER_JWT = 'SET_USER_JWT';
export const SET_USER_ATTENDENCE = 'SET_USER_ATTENDENCE';
export const SET_USER_LEAVE_TYPES = 'SET_USER_LEAVE_TYPES';
export const SET_APP_URL = 'SET_APP_URL';
export const SET_LEAVE_LIST = 'SET_LEAVE_LIST';
export const SET_LEAVE_DETAIL_ID = 'SET_LEAVE_DETAIL_ID';
export const SET_REPORT_ID = 'SET_REPORT_ID';
export const SET_REPORT_NAME = 'SET_REPORT_NAME';
export const SET_LEAVE_DETAILS = 'SET_LEAVE_DETAILS';
export const SET_TASK_LIST = 'SET_TASK_LIST';
export const SET_ANNOUCEMENT_DETAILS = 'SET_ANNOUCEMENT_DETAILS';
export const SET_TASK_REPORT = 'SET_TASK_REPORT';


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
export const setJWT = jwt => dispatch => {
    dispatch({
        type: SET_USER_JWT,
        payload: jwt,
    });
};
export const setAttendence = attendence => dispatch => {
    dispatch({
        type: SET_USER_ATTENDENCE,
        payload: attendence,
    });
};
export const setLeavetype = leavetypes => dispatch => {
    // console.log("gfghsdf",leavetypes);
    dispatch({
        type: SET_USER_LEAVE_TYPES,
        payload: leavetypes,
    });
};
export const setAppUrl = appUrl => dispatch => {
    dispatch({
        type: SET_APP_URL,
        payload: appUrl,
    });
};
export const setLeaveDetailId = leave_detail_id => dispatch => {
    dispatch({
        type: SET_LEAVE_DETAIL_ID,
        payload: leave_detail_id,
    });
};
export const setReportId = report_id => dispatch => {
    dispatch({
        type: SET_REPORT_ID,
        payload: report_id,
    });
};
export const setReportName = report_name => dispatch => {
    dispatch({
        type: SET_REPORT_NAME,
        payload: report_name,
    });
};
export const setLeaveDetails = leave_details => dispatch => {
    dispatch({
        type: SET_LEAVE_DETAILS,
        payload: leave_details,
    });
};
export const setAnnoucementList = annoucementList => dispatch => {
    dispatch({
        type: SET_ANNOUCEMENT_DETAILS,
        payload: annoucementList,
    });
};
export const setTaskReport = taskReport => dispatch => {
    dispatch({
        type: SET_TASK_REPORT,
        payload: taskReport,
    });
};
export const setLeavelist = leavelist => dispatch => {
    dispatch({
        type: SET_LEAVE_LIST,
        payload: leavelist,
    });
};
export const setTaskList = tasklist => dispatch => {
    dispatch({
        type: SET_TASK_LIST,
        payload: tasklist,
    });
};