import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import {useSelector} from 'react-redux';


function GuardedRoute({ 
    children, 
    type = 'private', // private | public
    ...rest 
}) {
    const isAuthenticated = useSelector(state => state.auth.user);
    const isPrivate = type === 'private';
    const guardCondition = isPrivate ? isAuthenticated : !isAuthenticated;

    return (
        <Route
            {...rest}
            render={({ location }) =>
                guardCondition ? 
                    children :
                    <Redirect
                        to={{
                            pathname: isPrivate ? '/login' : '/',
                            state: { from: location }
                        }}
                    />
            }
        />
    );
}

export default GuardedRoute;