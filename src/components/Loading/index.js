import React from 'react';
import s from './Loading.module.scss';


const Loading = () => (
    <div className={s.loadingWrapper}>
        <div className={s.ring}>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
        </div>
    </div>
)

export default Loading;
