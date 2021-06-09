import http from './http';

export const fetchUsers = () => http.get('/users');

export const fetchUser = (id) => http.get(`/user/${id}`);

export const fetchLatestMessages = (conversationId, lastMessageId) => 
    http.get(`/conversation/${conversationId}/new/${lastMessageId}`);

export const fetchLimitedMessages = (conversationId, limit = 10, offset = 0) => 
    http.get(`/conversation/${conversationId}/message/limited?limit=${limit}&&offset=${offset}`);

export const fetchUserLastSeen = (conversationId, userId) => 
    http.get(`/conversation/${conversationId}/lastseen/${userId}`);

export const fetchConversationDetails = (conversationId) => http.get(`/conversation/${conversationId}`);

export const fetchUserConversations = (userId) => http.get(`/conversation/user/${userId}`);

export const sendMessageToConversation = (conversationId, {senderId, message}) => 
    http.post(`/conversation/${conversationId}/message/send`, {senderId, message});

export const createPersonalConversation = ({users}) => http.post(`/conversation/personal`, {users});

export const createGroupConversation = ({users, name}) => http.post(`/conversation/group`, {users, name});

export const postSeenByUser = (conversationId, userId) => http.put(`/conversation/${conversationId}/seen/${userId}`);

