import React, {Component, createRef} from 'react';
import cc from 'classcat';
import {Formik, Form, Field} from 'formik';
import {connect} from 'react-redux';
import {sendMessage, getLatestMessages, getConversationMessages} from '../../store/thunks';
import { Card, Input, Button } from '..';
import s from './MessagePanel.module.scss';


const MessageCard = ({message, sender, isOwner}) => (
    <Card className={cc([s.messageCard, {
        [s.owner]: isOwner
    }])}>
        <h6 className={s.senderName}>
            {sender ? sender.name : 'Unknown'}
        </h6>
        <p>{message.message}</p>
        <p className={s.timestamp}>{message.timestamp}</p>
    </Card>
)

const MessageForm = ({onSubmit}) => {
    return (
        <div className={s.messageFormWrapper}>
            <Formik
                initialValues={{
                    message: ''
                }}
                onSubmit={onSubmit}>
                {
                    ({isSubmitting}) => (
                        <Form>
                            <Field
                                as={Input}
                                name="message"
                                placeholder="Enter your message..."
                                type="textarea"
                                block />
        
                            <Button type="submit" loading={isSubmitting}>
                                Send
                            </Button>
                        </Form>
                    )
                }
            </Formik>
        </div>
    )
}

class MessagePanel extends Component {
    polling;
    messagesEndRef = createRef();

    componentDidMount() {
        this.pollNewMessages();
        this.scrollToBottom();
    }

    componentWillUnmount() {
        this.clearPollMessages();
    }

    scrollToBottom = () => {
        this.messagesEndRef.current.scrollIntoView({behaviour: 'smooth'});
    }

    pollNewMessages = async () => {
        if (this.polling) this.clearPollMessages();

        await this.props.getLatestMessages();

        this.polling = setTimeout(this.pollNewMessages, 10000)
    }

    clearPollMessages = () => {
        clearTimeout(this.polling);
    }

    sendMessage = async ({message}, {resetForm, setSubmitting}) => {
        await this.props.sendMessage(message);
        await this.pollNewMessages();

        resetForm();
        setSubmitting(false);
        this.scrollToBottom();
    }

    render() {
        const {user, users, messages} = this.props;

        return (
            <div className={s.messagePanel}>
                <div className={s.messagesWrapper}>
                    {
                        messages.length >= 10 &&
                        <p className={s.premiumWarning}>You must have a <strong>Premium Account</strong> to see previous messages.</p>
                    }
                    {
                        messages.map(message => (
                            <MessageCard 
                                key={message.id} 
                                message={message}
                                isOwner={message.senderId === user.id}
                                sender={users.find(u => u.id === message.senderId)} />
                        ))
                    }
                    <div className={s.scrollerDiv} ref={this.messagesEndRef}></div>
                </div>

                <MessageForm onSubmit={this.sendMessage} />
            </div>
        )
    }
}

const mapStateToProps = state => ({
    user: state.auth.user,
    users: state.auth.users,
    messages: state.chat.messages,
    activeConversationId: state.chat.activeConversationId
});

const mapDispatchToProps = {
    sendMessage,
    getConversationMessages,
    getLatestMessages
}

export default connect(mapStateToProps, mapDispatchToProps)(MessagePanel);
