import React from 'react';
import {ErrorMessage} from 'formik';
import cc from 'classcat';
import s from './Input.module.scss';


const Input = ({
    onChange, 
    label, 
    block = false,
    type = 'text', 
    name,
    id,
    ...props
}) => (
    <div className={s.formGroup}>
        {label && <label htmlFor={id || name}>{label}</label>}
        {
            type === 'textarea' ?
            <textarea
                className={cc({[s.block]: block})}
                id={id || name}
                name={name}
                onChange={onChange}
                {...props}>
            </textarea> :
            <input 
                className={cc({[s.block]: block})}
                id={id || name}
                name={name}
                type={type}
                onChange={onChange}
                {...props} />
        }
        <ErrorMessage name={name}>
            {msg => <p className={s.errorMsg}>{msg}</p>}
        </ErrorMessage>
    </div>
)

export default Input;
