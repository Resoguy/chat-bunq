import React, { Component } from 'react';
import {connect} from 'react-redux';
import {getConversations, getConversationMessages} from '../../store/thunks';
import {ConversationItem, Loading, MessagePanel} from '../../components';
import s from './Home.module.scss';


const WelcomeMessage = ({username}) => (
    <div className={s.welcomeWrapper}>
        <h1>Welcome, {username}!</h1>
    </div>
)

class Home extends Component {
    state = {
        activeConversation: null
    }

    componentDidMount() {
        this.props.getConversations()
    }

    activateConversation = (conversationId) => {
        this.setState({activeConversation: conversationId});
        this.props.getConversationMessages(conversationId);
    }

    render() {
        const {user, conversations, messages, isMessagesLoading} = this.props;
        const {activeConversation} = this.state;

        return (
            <section className={s.homeWrapper}>
                <aside className={s.sideMenu}>
                    {
                        conversations &&
                        conversations.map((c, index) => (
                            <ConversationItem 
                                key={c.conversation.id + index} // There are duplicate conversation ids 
                                conversation={c.conversation} 
                                active={activeConversation === c.conversation.id}
                                users={c.users}
                                onClick={this.activateConversation} />
                        ))
                    }
                </aside>

                <main className={s.mainContent}>
                    {
                        isMessagesLoading ?
                            <Loading /> :
                            !messages ?
                                <WelcomeMessage username={user.name} /> :
                                <MessagePanel />
                    }

                </main>
            </section>
        );
    }
}

const mapStateToProps = state => ({
    user: state.auth.user,
    conversations: state.chat.conversations,
    messages: state.chat.messages,
    isMessagesLoading: state.chat.isMessagesLoading
})

const mapDispatchToProps = {
    getConversations,
    getConversationMessages
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
