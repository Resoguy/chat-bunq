import React from 'react';
import cc from 'classcat';
import s from './ConversationItem.module.scss';


const ConversationItem = ({conversation, users, onClick, active = false}) => (
    <a 
        className={cc([s.conversationLink, {
            [s.active]: active
        }])} 
        href="#" 
        onClick={() => onClick(conversation.id)}>
        <h3>{conversation.name}</h3>
    </a>
)

export default ConversationItem;
