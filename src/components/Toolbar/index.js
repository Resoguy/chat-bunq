import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Link} from 'react-router-dom';
import {logout} from '../../store/thunks';
import {Button} from '../index';
import s from './Toolbar.module.scss';


const Toolbar = () => {
    const user = useSelector(state => state.auth.user);
    const dispatch = useDispatch();
    const logoutUser = () => dispatch(logout())

    return (
        <nav className={s.toolbar}>
            <Link 
                className={s.brandLogo} 
                to="/">
                Chat App
            </Link>

            {
                user &&
                <ul className={s.toolbarList}>
                    <li className={s.toolbarItem}>
                        Hi, {user.name}
                    </li>
                    <li className={s.toolbarItem}>
                        <Button 
                            color="accent"
                            onClick={logoutUser}>
                            Logout
                        </Button>
                    </li>
                </ul>
            }
        </nav>
    )
}

export default Toolbar;
