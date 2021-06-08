import React, { useState } from 'react';
import cc from 'classcat';
import s from './Tabs.module.scss';


const Tabs = ({
    items = [], 
    views, 
    name, 
    initialTab = null
}) => {
    const [selectedTab, setTab] = useState(initialTab);
    const Component = views[selectedTab];


    const changeTab = e => {
        if (!e.target.value) return;

        setTab(e.target.value);
    }

    return (
        <div>
            <div className={s.tabHeader}>
                <div className={s.tabBtns}>
                    {
                        items.map(item => (
                            <label 
                                key={item.value}
                                className={cc([s.tabBtn, {
                                    [s.active]: selectedTab === item.value
                                }])}>
                                {item.title}
                                <input 
                                    type="radio" 
                                    name={name} 
                                    value={item.value}
                                    onChange={changeTab} />
                            </label>
                        ))
                    }
                </div>
            </div>
            {
                Component &&
                <div>
                    <Component />
                </div>
            }
        </div>
    )
}

export default Tabs;
