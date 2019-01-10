//initial state
const initialState = {
  school: {},
  admin: {},
  user: {},
  status: '',
  protocol: {},
  emergency: {},
  schoolEmergency: {},
  activeEmergency: false
};

//define strings to variables
const SCHOOL_DATA = "SCHOOL_DATA";
const ADMIN_DATA = "ADMIN_DATA";
const USER_DATA = "USER_DATA";
const STATUS_DATA = "STATUS_DATA";
const PROTOCOL_DATA = "PROTOCOL_DATA";
const EMERGENCY_DATA = "EMERGENCY_DATA";
const SCHOOL_EMERGENCY_DATA = "SCHOOL_EMERGENCY_DATA";
const ACTIVE_EMERGENCY_DATA = "ACTIVE_EMERGENCY_DATA";

//action creators
export function updateSchool(schoolObj) {
  return {
    type: SCHOOL_DATA,
    payload: schoolObj
  };
}

export function updateAdmin(adminObj) {
  return {
    type: ADMIN_DATA,
    payload: adminObj
  };
}

export function updateUser(userObj) {
  return {
    type: USER_DATA,
    payload: userObj
  };
}

export function updateStatus(statusStr) {
  return {
    type: STATUS_DATA,
    payload: statusStr
  };
}

export function updateProtocol(protocolObj) {
  return {
    type: PROTOCOL_DATA,
    payload: protocolObj
  };
}

export function updateEmergency(emergencyObj) {
  return {
    type: EMERGENCY_DATA,
    payload: emergencyObj
  };
}
export function updateSchoolEmergency(schoolEmergencyObj) {
  return {
    type: SCHOOL_EMERGENCY_DATA,
    payload: schoolEmergencyObj
  };
}

export function updateActiveEmergency(activeEmergencyBool) {
  return {
    type: ACTIVE_EMERGENCY_DATA,
    payload: activeEmergencyBool
  };
}

//reducer function
export default function reducer(state = initialState, action) {
  let { type, payload } = action;
  switch (type) {
    case SCHOOL_DATA:
      return { ...state, school: payload };

    case ADMIN_DATA:
      return { ...state, admin: payload };

    case USER_DATA:
      return { ...state, user: payload };

      case STATUS_DATA: 
      return {...state, status: payload};

    case PROTOCOL_DATA:
      return { ...state, protocol: payload };

    case EMERGENCY_DATA:
      return { ...state, emergency: payload };

    case SCHOOL_EMERGENCY_DATA:
      return { ...state, schoolEmergency: payload };

    case ACTIVE_EMERGENCY_DATA:
      return { ...state, activeEmergency: payload };

    default:
      return state;
  }
}
