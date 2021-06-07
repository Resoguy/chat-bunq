import {
    SET_USERS,
    SET_USER
} from '../types';


const INITIAL_STATE = {
    user: null,
    users: null
}

const authReducer = (state = INITIAL_STATE, {type, payload}) => {
    switch (type) {
        case SET_USERS:
            return {...state, users: payload};

        case SET_USER:
            return {...state, user: payload};
    
        default:
            return state;
    }
}

export default authReducer;
