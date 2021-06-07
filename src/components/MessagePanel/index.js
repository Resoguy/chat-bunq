import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Formik, Form, Field} from 'formik';
import cc from 'classcat';
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
                <Form>
                    <Field
                        as={Input}
                        name="message"
                        placeholder="Enter your message..."
                        type="textarea"
                        block />

                    <Button type="submit">Send</Button>
                </Form>
            </Formik>
        </div>
    )
}

class MessagePanel extends Component {
    polling;

    componentDidMount() {
        this.pollNewMessages();
    }

    componentWillUnmount() {
        console.log('CLEAR POLLING');
        clearTimeout(this.polling);
    }

    pollNewMessages = () => {
        console.log('POLLING');

        this.polling = setTimeout(this.pollNewMessages, 5000)
    }

    sendMessage = (values, {resetForm}) => {
        console.log(values);
        resetForm();
    }

    render() {
        const {user, users, messages} = this.props;

        return (
            <div className={s.messagePanel}>
                {
                    messages.map(message => (
                        <MessageCard 
                            key={message.id} 
                            message={message}
                            isOwner={message.senderId === user.id}
                            sender={users.find(u => u.id === message.senderId)} />
                    ))
                }

                <MessageForm onSubmit={this.sendMessage} />
            </div>
        )
    }
}

const mapStateToProps = state => ({
    user: state.auth.user,
    users: state.auth.users,
    messages: state.chat.messages
});

const mapDispatchToProps = {

}

export default connect(mapStateToProps, mapDispatchToProps)(MessagePanel);
