import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Formik, Form, Field } from 'formik';
import * as yup from 'yup';
import { getUsers, login } from '../../store/thunks';
import { Input, Button, Card, Alert } from '../../components';
import s from './Login.module.scss';


const loginSchema = users => yup.object().shape({
    username: yup.string().required().oneOf(users),
    password: yup.string().required()
})


class Login extends Component {

    componentDidMount() {
        this.props.getUsers()
    }

    login = (values, { resetForm }) => {
        this.props.login(values);
    }

    render() {
        const { users } = this.props;

        return (
            <div className={s.loginWrapper}>
                <Card className={s.loginCard}>
                    <h1>Login</h1>
                    <p>You can login with a valid username, password is arbitrary.</p>

                    {
                        users &&
                        <>
                            <Alert title="Available Users">
                                <ul>
                                    {
                                        users.map(user => <li key={user.id}>{user.name}</li>)
                                    }
                                </ul>
                            </Alert>

                            <div>
                                <Formik
                                    initialValues={{
                                        username: '',
                                        password: ''
                                    }}
                                    validationSchema={loginSchema(users.map(user => user.name))}
                                    onSubmit={this.login}>
                                    {() => (
                                        <Form>
                                            <Field
                                                as={Input}
                                                label="Username"
                                                name="username"
                                                placeholder="Enter your username..."
                                                block />

                                            <Field
                                                as={Input}
                                                label="Password"
                                                name="password"
                                                type="password"
                                                placeholder="Password is arbitrary..."
                                                block />

                                            <Button type="submit">Login</Button>
                                        </Form>
                                    )}
                                </Formik>
                            </div>
                        </>
                    }
                </Card>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    users: state.auth.users
})

const mapDispatchToProps = {
    getUsers,
    login
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);
