import Moment from 'moment';
const apiUrl = 'https://8c8c-203-145-168-10.ngrok.io';
export async function checkoutApi(jwtToken,setEnable) {
  const response = await fetch(`${apiUrl}/api/checkin-checkout/checkout`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${jwtToken}` },
    body: JSON.stringify({})
  });
  const result = await response.json();
  setEnable(null)
  console.log(result);
  // setReportSubmit(result);
  return result;
}

export async function checkinApi(jwtToken,setEnable) {
  const response = await fetch(`${apiUrl}/api/checkin-checkout/checkin`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${jwtToken}` },
    body: JSON.stringify({})
  });
  const result = await response.json();
  console.log(result);
  setEnable(null)
  // setReportSubmit(result);
  return result;
}

export async function leavesListApi(jwtToken,setLeaveListData) {
  
  const response = await fetch(`${apiUrl}/api/leaves/leaves/user-by-leave`,{
    method: 'GET',
    headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${jwtToken}` },
    // body: JSON.stringify({})
  });
  const result = await response.json();
  setLeaveListData(result.data);
}

export async function leavesTypeApi(jwtToken,setLeaveTypeData) {
  
  const response = await fetch(`${apiUrl}/api/leaves/leave-type/list`,{ 
    method: 'GET',
    headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${jwtToken}` },
    // body: JSON.stringify({})
  });
  const result = await response.json();
  setLeaveTypeData(result.data);
}

export async function leavesApplyTypeApi(jwtToken,setLeaveTypeData) {
  
  const response = await fetch(`${apiUrl}/api/leaves/leave-type/list`,{ 
    method: 'GET',
    headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${jwtToken}` },
    // body: JSON.stringify({})
  });
  const result = await response.json();
  var leaves = result.data;
  const leaveId =[];
  const leaveName =[];
  const ids = leaves.map((val) =>
  leaveId.push(val.id),
  );
  const name = leaves.map((name) =>
  leaveName.push(name.leave_type_name),
  );
  var finalObj = [];
  for(var i = 0; i < leaveId.length; i++){
    finalObj[i] = {
      label:leaveName[i] ,
      value: leaveId[i]
    }
     }

  setLeaveTypeData(finalObj);
}

export async function AnnoucementApi(jwtToken,setAnnoucementList) {
  
  const response = await fetch(`${apiUrl}/api/events/announcements/list`, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${jwtToken}` },
    // body: JSON.stringify({})
  });
  const result = await response.json();
  setAnnoucementList(result.data);
}

export async function taskHistoryApi(jwtToken,setTaskHistory) {
  
  const response = await fetch(`${apiUrl}/api/reports/task/dially-user-list`, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${jwtToken}` },
    // body: JSON.stringify({})
  });
  const result = await response.json();
  setTaskHistory(result.data);
}

export async function attendenceListApi(jwtToken,setAttendenceList) {
   const response = await fetch(`${apiUrl}/api/attendence/attendence-per-user?limit=5&filter=month`, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${jwtToken}` },
    // body: JSON.stringify({})
  });
  const result = await response.json();
  console.log(result);
  setAttendenceList(result.data);
}

export async function taskListApi(jwtToken,setTaskListData,settaskLoading) {
  
  const response = await fetch(`${apiUrl}/api/reports/task/user-task-list`,{
    method: 'GET',
    headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${jwtToken}` },
    // body: JSON.stringify({})
  });
  settaskLoading(false)
  const result = await response.json();
  setTaskListData(result.data);
}

export async function leaveDetailApi(jwtToken,leaveId,setLeavDetails) {
  const response = await fetch(`${apiUrl}/api/leaves/leaves/view?id=${leaveId}`,{
    method: 'GET',
    headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${jwtToken}` },
  });
  const result = await response.json();
  setLeavDetails(result.data);
}

export async function eventsListApi(jwtToken,setEvents) {
  
  Moment.locale('en');
  const response = await fetch(`${apiUrl}/api/events/events/list`, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${jwtToken}` },
  });
  const result = await response.json();
  var eventss = result.data;
  // setEventsList(result.data);
  var finalObj = [];
  for(var i = 0; i < eventss.length; i++){
    var startDate = Moment(eventss[i].holiday_from_date).format('y-MM-DD HH:MM:ss');
    var endDate = Moment(eventss[i].holiday_to_date).format('y-MM-DD HH:MM:ss');
    var name = eventss[i].events_title;
    var eventInfo = eventss[i].events_descriptions;
    finalObj[i] = {
      start:startDate,
      end: endDate,
      title:name,
      summary:eventInfo
    }
     }
     setEvents(finalObj)
}

export async function eventsDashboardApi(jwtToken,setEventsList) {
  Moment.locale('en');
  const response = await fetch(`${apiUrl}/api/events/events/list`, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${jwtToken}` },
  });
  const result = await response.json();
  setEventsList(result.data)
}

export async function revokeLeaveApi(jwtToken,leaveId,callBackRevoke) {
  const responsedata = await fetch(`${apiUrl}/api/leaves/leaves/delete-leave?id=${leaveId}`, {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${jwtToken}` },
    // body: JSON.stringify({})
  });

  const result = await responsedata.json();
  callBackRevoke(result);
  // return result;
}

export async function submitReportApi(jwtToken,dataToSubmit,setReportSubmit) {
  const response = await fetch(`${apiUrl}/api/reports/task/create-user-task`,{ 
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${jwtToken}` },
    body: JSON.stringify(dataToSubmit)
  });
  const result = await response.json();
  setReportSubmit(result);
  return result;
}

export async function ApplyLeaveApi(jwtToken,dataToSubmit,setReportSubmit) {
  const response = await fetch(`${apiUrl}/api/leaves/leaves/store`,{ 
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${jwtToken}` },
    body: JSON.stringify(dataToSubmit)
  });
  const result = await response.json();
  // setReportSubmit(result);
  return result;
}