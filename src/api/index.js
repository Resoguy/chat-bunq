import http from './http';

export const fetchUsers = () => http.get('/users');

export const fetchUser = (id) => http.get(`/user/${id}`);

export const fetchLatestMessages = (conversationId, lastMessageId) => 
    http.get(`/conversation/${conversationId}/new/${lastMessageId}`);

export const fetchLimitedMessages = (conversationId, limit, offset) => 
    http.get(`/conversation/${conversationId}/message/limited?limit=${limit}&&offset=${offset}`);

export const fetchUserLastSeen = (conversationId, userId) => 
    http.get(`/conversation/${conversationId}/lastseen/${userId}`);

export const fetchConversationDetails = (conversationId) => http.get(`/conversation/${conversationId}`);

export const fetchUserConversations = (userId) => http.get(`/conversation/user/${userId}`);

export const sendMessage = (conversationId, {senderId, message}) => 
    http.post(`/conversation/${conversationId}/message/send`, {senderId, message});

export const createPersonalConversation = ({users}) => http.post(`/conversation/personal`, {users});

export const createGroupConversation = ({users, name}) => http.post(`/conversation/group`, {users, name});

export const setSeenByUser = (conversationId, userId) => http.put(`/conversation/${conversationId}/seen/${userId}`);

