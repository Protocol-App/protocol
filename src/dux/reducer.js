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
export function updateSchool(schoolID, schoolName, schoolCity,schoolState) {
    return {
        type: SCHOOL_DATA,
        payload: {schoolID,schoolName, schoolCity,schoolState}
    }
}

export function updateAdmin(adminID, email, adminFirst, adminLast) {
    return {
        type: ADMIN_DATA,
        payload: {adminID, email,adminFirst,adminLast}
    }
}

export function updateUser(userData) {
    return {
        type: USER_DATA,
        payload: userData
    }
}

export function updateStaff(staffData) {
    return {
        type: STAFF_DATA,
        payload: staffData
    }
}

export function updateProtocol(protocolData) {
    return {
        type: PROTOCOL_DATA,
        payload: protocolData
    }
}

export function updateEmergency(emergencyData) {
    return {
        type: EMERGENCY_DATA,
        payload: emergencyData
    }
}
//reducer function
export default function reducer(state = initialState, action) {
    let { type, payload } = action
    switch (type) {

        case SCHOOL_DATA:
        const {schoolID, schoolName, schoolCity, schoolState}= payload;
        var tempSchoolData = {...state.school}
        tempSchoolData.schoolID=schoolID;
        tempSchoolData.schoolName = schoolName;
        tempSchoolData.schoolCity = schoolCity;
        tempSchoolData.schoolState = schoolState;
        return {...state, school: tempSchoolData}
       

        case ADMIN_DATA:
            const { adminID, email, adminFirst, adminLast } = payload;
            var tempAdminData = { ...state.admin }
            tempAdminData.adminID = adminID;
            tempAdminData.email = email;
            tempAdminData.adminFirst = adminFirst;
            tempAdminData.adminLast = adminLast;
            return { ...state, admin: tempAdminData }

        case USER_DATA:
            return { ...state, user: payload }

        case STAFF_DATA:
            return { ...state, alert: payload }

        case PROTOCOL_DATA:
            return { ...state, user: payload }

        case EMERGENCY_DATA:
            return { ...state, alert: payload }

        default: return state;
    }
}



