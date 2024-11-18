import React, { useState } from 'react';
import { Form, Input, Button, message } from 'antd';
import { MailOutlined, LockOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { useMsal } from '@azure/msal-react';
import { ReactComponent as Office365Icon } from '../Assets/office365-icon.svg';
import Footer from './Footer'; // Ensure Footer is correctly imported
import './Login.css';

const Login = () => {
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const { instance } = useMsal();

    const onFinish = (values) => {
        const storedUsers = JSON.parse(localStorage.getItem('users')) || [];
        const user = storedUsers.find(user => user.email === values.email);

        if (user && user.password === values.password) {
            message.success('Login successful');
            navigate('/home');
        } else {
            message.error('Sign-in failed');
        }
    };

    const handleOffice365Login = () => {
        setLoading(true);
        instance.loginPopup({ scopes: ["user.read"], prompt: "select_account" })
            .then(() => {
                message.success('Login with Office 365 successful');
                navigate('/home');
            })
            .catch(err => {
                console.error('Office 365 Login Error:', err);
                if (err.errorCode) message.error(`Error Code: ${err.errorCode}`);
                if (err.errorMessage) message.error(`Error Message: ${err.errorMessage}`);
            })
            .finally(() => setLoading(false));
    };

    return (
        <div className="login-page">
            <div className="login-container">
                <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-sm text-center">
                    <h1 className="text-2xl font-semibold mb-4">Welcome to myLOCKER</h1>
                    <p className="mb-6">Sign in to continue using the app</p>

                    <Form name="login" onFinish={onFinish} layout="vertical" className="login-form">
                        <Form.Item name="email" rules={[{ required: true, message: 'Please input your email!' }]}>
                            <Input prefix={<MailOutlined />} placeholder="Email" className="mb-4" />
                        </Form.Item>

                        <Form.Item name="password" rules={[{ required: true, message: 'Please input your password!' }]}>
                            <Input.Password prefix={<LockOutlined />} placeholder="Password" className="mb-4" />
                        </Form.Item>

                        <Form.Item>
                            <Button htmlType="submit" block loading={loading} className="custom-sign-in">
                                Sign In
                            </Button>
                        </Form.Item>

                        <Form.Item>
                            <Button type="default" block onClick={handleOffice365Login} loading={loading} className="custom-office365">
                                <Office365Icon className="inline-block w-5 h-5 mr-2 fill-white" />
                                Sign in with Office 365
                            </Button>
                        </Form.Item>
                    </Form>

                    <div className="mt-6 text-gray-600 text-sm">
                        <p>If you have login issues, please contact IT Helpdesk at</p>
                        <a href="mailto:support@mylocker.com.vn" className="text-orange-600 hover:underline">support@mylocker.com.vn</a>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default Login;
