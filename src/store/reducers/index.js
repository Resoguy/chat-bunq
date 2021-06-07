import {combineReducers} from 'redux';
import authReducer from './auth';
import conversationReducer from './conversation';

const rootReducer = combineReducers({auth: authReducer, conversation: conversationReducer});

export default rootReducer;
