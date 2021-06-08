import {
    setUsers, 
    setUser, 
    setConversations, 
    setMessages, 
    setMessagesLoading,
    setLatestMessages,
    addConversation
} from './actions';
import {
    fetchUsers, 
    fetchUserConversations, 
    fetchLimitedMessages, 
    sendMessageToConversation, 
    fetchLatestMessages,
    createGroupConversation,
    fetchConversationDetails
} from '../api';


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
    
    dispatch(setConversations(conversations.slice().reverse()));
}

export const getConversationMessages = (conversationId) => async (dispatch) => {
    dispatch(setMessagesLoading(true));
    const messages = await fetchLimitedMessages(conversationId);

    dispatch(setMessages(messages.slice().reverse()));
    dispatch(setMessagesLoading(false));
}

export const sendMessage = (message) => async (dispatch, getState) => {
    const {auth, chat} = getState();
    const newMessage = {
        message,
        senderId: auth.user.id
    }
    
    await sendMessageToConversation(chat.activeConversationId, newMessage);  
}

export const getLatestMessages = () => async (dispatch, getState) => {
    try {
        const {chat} = getState();
        const lastMessage = chat.messages[chat.messages.length - 1];
        
        if (lastMessage) {
            const latestMessages = await fetchLatestMessages(chat.activeConversationId, lastMessage.id);

            dispatch(setLatestMessages(latestMessages));
        } else {
            const messages = await fetchLimitedMessages(chat.activeConversationId);

            dispatch(setMessages(messages.slice().reverse()));
        }
    } catch (err) {
        console.log(Object.entries(err));
    }
}

export const startGroupConversation = ({groupName, users}) => async (dispatch, getState) => {
    const {id} = await createGroupConversation({users: users.join(','), name: groupName});
    const conversation = await fetchConversationDetails(id);

    dispatch(addConversation(conversation))
}