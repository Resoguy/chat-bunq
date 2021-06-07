import {setUsers, setUser, setConversations, setMessages, setMessagesLoading} from './actions';
import {fetchUsers, fetchUserConversations, fetchLimitedMessages} from '../api';


// AUTH
export const getUsers = () => async (dispatch) => {
    const users = await fetchUsers();

    dispatch(setUsers(users));
}

export const login = ({username}) => (dispatch, getState) => {
    const {auth} = getState();

    const user = auth.users.find(validUser => validUser.name === username);

    dispatch(setUser(user));
}

export const logout = () => (dispatch) => {
    dispatch(setConversations(null));
    dispatch(setMessages(null));
    dispatch(setUser(null));
}

// CHAT
export const getConversations = () => async (dispatch, getState) => {
    const {auth} = getState();
    const conversations = await fetchUserConversations(auth.user.id);
    
    dispatch(setConversations(conversations));
}

export const getConversationMessages = (conversationId) => async (dispatch) => {
    dispatch(setMessagesLoading(true));
    const messages = await fetchLimitedMessages(conversationId);

    dispatch(setMessages(messages));
    dispatch(setMessagesLoading(false));
}
