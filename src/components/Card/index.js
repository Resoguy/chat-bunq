import React from 'react';
import cc from 'classcat';
import s from './Card.module.scss';


const Card = ({
    children, 
    className, 
    border = false
}) => (
    <div className={cc([s.card, className, {
        [s.border]: border
    }])}>
        {children}
    </div>
)

export default Card;
