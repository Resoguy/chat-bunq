import * as types from './types';


export const setUsers = (users) => ({type: types.SET_USERS, payload: users});
export const setUser = (user) => ({type: types.SET_USER, payload: user});
