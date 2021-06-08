import * as types from './types';


// AUTH
export const setUsers = (users) => ({type: types.SET_USERS, payload: users});
export const setUser = (user) => ({type: types.SET_USER, payload: user});

// CHAT
export const setConversations = (conversations) => ({type: types.SET_CONVERSATIONS, payload: conversations});
export const setActiveConversationId = (conversationId) => ({type: types.SET_ACTIVE_CONVERSATION_ID, payload: conversationId});
export const setMessages = (messages) => ({type: types.SET_MESSAGES, payload: messages});
export const setMessagesLoading = (isLoading) => ({type: types.SET_MESSAGES_LOADING, payload: isLoading});
export const setLatestMessages = (latestMessages) => ({type: types.SET_LATEST_MESSAGES, payload: latestMessages});
export const addConversation = (conversation) => ({type: types.ADD_CONVERSATION, payload: conversation});
