import {
    SET_CONVERSATIONS,
    SET_MESSAGES,
    SET_MESSAGES_LOADING
} from '../types';


const INITIAL_STATE = {
    conversations: null,
    messages: null,
    isMessagesLoading: false
}

const conversationReducer = (state = INITIAL_STATE, {type, payload}) => {
    switch (type) {
        case SET_CONVERSATIONS:
            return {...state, conversations: payload};

        case SET_MESSAGES:
            return {...state, messages: payload};

        case SET_MESSAGES_LOADING:
            return {...state, isMessagesLoading: payload};
    
        default:
            return state;
    }
}

export default conversationReducer;
