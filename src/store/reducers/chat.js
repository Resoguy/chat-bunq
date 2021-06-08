import {
    SET_CONVERSATIONS,
    SET_ACTIVE_CONVERSATION_ID,
    SET_MESSAGES,
    SET_MESSAGES_LOADING,
    SET_LATEST_MESSAGES,
    ADD_CONVERSATION
} from '../types';


const INITIAL_STATE = {
    conversations: null,
    activeConversationId: null,
    messages: null,
    isMessagesLoading: false
}

const conversationReducer = (state = INITIAL_STATE, {type, payload}) => {
    switch (type) {
        case SET_CONVERSATIONS:
            return {...state, conversations: payload};

        case SET_ACTIVE_CONVERSATION_ID:
            return {...state, activeConversationId: payload};

        case SET_MESSAGES:
            return {...state, messages: payload};

        case SET_MESSAGES_LOADING:
            return {...state, isMessagesLoading: payload};

        case SET_LATEST_MESSAGES:
            return {...state, messages: [...state.messages, ...payload]};

        case ADD_CONVERSATION:
            return {...state, conversations: [payload, ...state.conversations]}
    
        default:
            return state;
    }
}

export default conversationReducer;
