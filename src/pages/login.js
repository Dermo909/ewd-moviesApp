import LoginForm from '../components/login';
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import React from "react";


const LoginPage = () => {
    console.log('logging in');

    return (
        <>
            <LoginForm />
        </>
    );
};

export default LoginPage;