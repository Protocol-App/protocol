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


//reducer function
export default function reducer (state=initialState, action) {

    switch (action.type) {

        case SCHOOL_DATA:
        return {...state, user: action.payload}

        case ADMIN_DATA:
        return {...state, alert: action.payload}

        case USER_DATA:
        return {...state, user: action.payload}

        case STAFF_DATA:
        return {...state, alert: action.payload}

        case PROTOCOL_DATA:
        return {...state, user: action.payload}

        case EMERGENCY_DATA:
        return {...state, alert: action.payload}

        default: return state;
    }
}

//action creators
export function updateSchool (schoolData) {
    return {
        type: SCHOOL_DATA,
        payload: schoolData
    }
}
    
    export function updateAdmin (adminData) {
        return {
            type: ADMIN_DATA,
            payload: adminData
        }
    }
    
    export function updateUser (userData) {
        return {
            type: USER_DATA,
            payload: userData
        }
    }
    
    export function updateStaff (staffData) {
        return {
            type: STAFF_DATA,
            payload: staffData
        }
    }
    
    export function updateProtocol (protocolData) {
        return {
            type: PROTOCOL_DATA,
            payload: protocolData
        }
    }
    
    export function updateEmergency (emergencyData) {
        return {
            type: EMERGENCY_DATA,
            payload: emergencyData
        }
    }