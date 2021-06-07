import React from 'react';
import cc from 'classcat';
import s from './Alert.module.scss';


const Alert = ({
    message, 
    title,
    children,
    type = 'info' // info
}) => (
    <div className={cc([s.alert, s[type]])}>
        <header className={s.header}>
            {title}
        </header>
        
        <div className={s.content}>
            <p>{message}</p>
            {children}
        </div>
    </div>
)

export default Alert;
