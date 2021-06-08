import React, { Component } from 'react';
import {connect} from 'react-redux';
import {setActiveConversationId} from '../../store/actions';
import {getConversations, getConversationMessages} from '../../store/thunks';
import {
    ConversationForm,
    ConversationItem, 
    Loading, 
    MessagePanel, 
    Modal, 
    Button
} from '../../components';
import s from './Home.module.scss';


const WelcomeMessage = ({username}) => (
    <div className={s.welcomeWrapper}>
        <h1>Welcome, {username}!</h1>
    </div>
)

class Home extends Component {
    state = {
        isModalOpen: false
    }

    componentDidMount() {
        this.props.getConversations()
    }

    activateConversation = (conversationId) => {
        this.props.setActiveConversationId(conversationId);
        this.props.getConversationMessages(conversationId);
    }

    toggleConversationModal = (status) => {
        this.setState({isModalOpen: status || !this.state.isModalOpen});
    }

    render() {
        const {user, conversations, messages, isMessagesLoading, activeConversationId} = this.props;

        return (
            <section className={s.homeWrapper}>
                <Modal 
                    isOpen={this.state.isModalOpen}
                    onClose={() => this.toggleConversationModal(false)}>
                    <ConversationForm onSubmit={() => this.toggleConversationModal(false)} />
                </Modal>
                
                <aside className={s.sideMenu}>
                    <div className={s.newConversationWrapper}>
                        <Button onClick={() => this.toggleConversationModal(true)}>
                            New Conversation
                        </Button>
                    </div>
                    {
                        conversations ?
                        conversations.map(c => (
                            <ConversationItem 
                                key={c.conversation.id + c.name} // There are duplicate conversation ids 
                                conversation={c.conversation} 
                                active={activeConversationId === c.conversation.id}
                                users={c.users}
                                onClick={this.activateConversation} />
                        )) :
                        <Loading />
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
    getConversationMessages,
    setActiveConversationId
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
