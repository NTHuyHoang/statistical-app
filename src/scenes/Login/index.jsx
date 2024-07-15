import React, { useState } from 'react'
import './login.css'
import './login.js'
import { FaGoogle,FaFacebook,FaGithub   } from "react-icons/fa";
import {GoogleLogin} from '@react-oauth/google';
import {jwtDecode} from "jwt-decode";
const Login = () => {
    const handleSuccess = (credentialResponse) => {
        const decoded = jwtDecode(credentialResponse.credential);
        console.log(decoded);
        alert('Login success!');

        // Lưu token vào localStorage
        localStorage.setItem('authToken', credentialResponse.credential);

        setTimeout(() => {
            window.location.href = "/env-data-table";
        }, 1000);
    };

    const handleFailure = () => {
        console.log('Login Failed');
    };

    return (
        <div className="wrapper">
            <form>
                <h2>Login</h2>
                <div className="input-field">
                    <input type="text" placeholder='Username' required/>
                </div>
                <div className="input-field">
                    <input type="password" placeholder='Password' required/>
                </div>
                <div className="forget">
                    <label htmlFor="remember">
                        <input type="checkbox" id="remember"/>
                        <p>Remember me</p>
                    </label>
                    <a href="#">Forgot password?</a>
                </div>
                <button type="submit">Login</button>
                <div className="register">
                    <p>Don't have an account? <a href="./register">Register</a></p>
                </div>
                <div className="register">
                    Log in via
                    <p className="login-via">
                        <GoogleLogin
                            render={renderProps => (
                                <button onClick={renderProps.onClick} disabled={renderProps.disabled} style={{ border: 'none', background: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center'  }}>
                                    <FaGoogle color="#db4a39" />
                                </button>
                            )}
                            onSuccess={handleSuccess}
                            onError={handleFailure}
                        />
                    </p>
                </div>
            </form>
        </div>
    );
}

export default Login;