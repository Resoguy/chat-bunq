import React from 'react';
import cc from 'classcat';
import s from './Button.module.scss';


const Button = ({
    children, 
    className = '',
    type, 
    onClick, 
    loading = false,
    disabled = false,
    color = 'primary' // primary | secondary | accent
}) => (
    <button 
        className={cc([s.button, s[color], className])}
        type={type} 
        disabled={disabled || loading}
        onClick={onClick}>
        {loading ? '...Loading' : children}
    </button>
)

export default Button;
