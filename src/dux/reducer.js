//initial state
const initialState = {
    school: {},
    admin: {},
    user: {},
    staff: [],
    protocol: {},
    emergency: {}
}

//define strings to variables
const SCHOOL_DATA = 'SCHOOL_DATA';
const ADMIN_DATA = 'ADMIN_DATA';
const USER_DATA = 'USER_DATA';
const STAFF_DATA = 'STAFF_DATA';
const PROTOCOL_DATA = 'PROTOCOL_DATA';
const EMERGENCY_DATA = 'EMERGENCY_DATA';

//action creators
export function updateSchool(schoolObj) {
    return {
        type: SCHOOL_DATA,
        payload: schoolObj
    }
}

export function updateAdmin(adminObj) {
    return {
        type: ADMIN_DATA,
        payload: adminObj
    }
}

export function updateUser(userObj) {
    return {
        type: USER_DATA,
        payload: userObj
    }
}

export function updateStaff(staffArr) {
    return {
        type: STAFF_DATA,
        payload: staffArr
    }
}

export function updateProtocol(protocolObj) {
    return {
        type: PROTOCOL_DATA,
        payload: protocolObj
    }
}

export function updateEmergency(emergencyObj) {
    return {
        type: EMERGENCY_DATA,
        payload: emergencyObj
    }
}

//reducer function
export default function reducer(state = initialState, action) {
    let { type, payload } = action
    switch (type) {

        case SCHOOL_DATA:
        // const {schoolID, schoolName, schoolCity, schoolState} = payload;
        // var tempSchoolData = {...state.school}
        // tempSchoolData.schoolID=schoolID;
        // tempSchoolData.schoolName = schoolName;
        // tempSchoolData.schoolCity = schoolCity;
        // tempSchoolData.schoolState = schoolState;
        return {...state, school: payload}
       
        case ADMIN_DATA:
            return { ...state, admin: payload }

        case USER_DATA:
            return { ...state, user: payload}

        case STAFF_DATA:
            return { ...state, alert: payload }

        case PROTOCOL_DATA:
            return { ...state, user: payload }

        case EMERGENCY_DATA:
            return { ...state, alert: payload }

        default: return state;
    }
}



