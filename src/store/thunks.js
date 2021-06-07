import {setUsers, setUser} from './actions';
import {fetchUsers} from '../api';

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
    dispatch(setUser(null));
}