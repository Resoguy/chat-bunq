import React from 'react';
import {Formik, Form, Field} from 'formik';
import {useSelector, useDispatch} from 'react-redux';
import {startGroupConversation} from '../../store/thunks';
import cc from 'classcat';
import {Alert, Button, Input, Tabs} from '..';
import s from './ConversationForm.module.scss';


const GroupForm = ({onSubmit}) => {
    const users = useSelector(state => state.auth.users);
    const dispatch = useDispatch();

    const createConversation = async (values, {setSubmitting, resetForm}) => {
        await dispatch(startGroupConversation(values));

        resetForm();
        setSubmitting(false);
        onSubmit();
    }

    return (
        <div>
            <Formik
                initialValues={{
                    groupName: '',
                    users: []
                }}
                onSubmit={createConversation}>
                {({values, isSubmitting}) => (
                    <Form>
                        <Field
                            as={Input}
                            name="groupName"
                            label="Group Name"
                            placeholder="Enter a group name..."
                            block />

                        <div className={s.usersWrapper}>
                            {
                                users.map(user => (
                                    <div className={s.userCheckbox} key={user.id}>
                                        <label 
                                            className={cc([s.checkboxLabel, {
                                                [s.checked]: values.users.includes(user.id)
                                            }])}
                                            htmlFor={user.id}>
                                            {user.name}
                                        </label>
                                        <Field 
                                            as="input" 
                                            type="checkbox" 
                                            name="users" 
                                            id={user.id}
                                            checked={values.users.includes(user.id)}
                                            value={user.id} />
                                    </div>
                                ))
                            }
                        </div>

                        <Button type="submit">Create Conversation</Button>
                    </Form>
                )}
            </Formik>
        </div>
    )
}

const PersonalForm = ({onSubmit}) => {

    return (
        <div>
            <Alert title="Premium Account">
                <h3>
                    Upgrade to <strong>Premium Account</strong> to send a personal message.
                </h3>
            </Alert>
        </div>
    )
}


const ConversationForm = ({onSubmit}) => {

    return (
        <div>
            <Tabs
                name="conversation"
                initialTab="group"
                items={[
                    {title: 'Group', value: 'group'},
                    {title: 'Personal', value: 'personal'}
                ]}
                views={{
                    group: () => <GroupForm onSubmit={onSubmit} />, 
                    personal: () => <PersonalForm onSubmit={onSubmit} />
                }} />
        </div>
    )
}

export default ConversationForm;
