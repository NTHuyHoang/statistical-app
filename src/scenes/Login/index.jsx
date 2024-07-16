import React, {useState} from 'react'
import './login.css'
import './login.js'
import {FaGoogle, FaFacebook, FaGithub} from "react-icons/fa";
import {GoogleLogin} from '@react-oauth/google';
import {jwtDecode} from "jwt-decode";
import {LoginSocialFacebook, LoginSocialGithub, LoginSocialGoogle} from "reactjs-social-login";
import {FacebookLoginButton, GithubLoginButton, GoogleLoginButton} from "react-social-login-buttons";

const Login = () => {

    // Xử lý đăng nhập Google
    const handleGoogleSuccess = (credentialResponse) => {
        alert('Google Login Success');
        const googleToken = credentialResponse.data.access_token;
        // Lưu token vào localStorage
        localStorage.setItem('googleToken', googleToken);

        setTimeout(() => {
            window.location.href = "/env-data-table";
        }, 1000);
    };

    const handleGoogleFailure = () => {
        console.log('Google Login Failed');
    };

    // Xử lý đăng nhập Facebook
    const handleFacebookResolve = (response) => {
        alert('Facebook Login Success');
        // Trích xuất thông tin từ response
        const facebookToken = response.data.accessToken;
        localStorage.setItem('facebookToken', facebookToken);

        setTimeout(() => {
            window.location.href = "/env-data-table";
        }, 1000);
    };

    const handleFacebookReject = (error) => {
        console.log('Facebook Login Failed:', error);
        alert('Facebook Login Failed');
    };

    // Xử lý đăng nhập Github
    const handleGithubResolve = (githubResponse) => {
        alert('Github Login Success');
        console.log('Github Login Success', githubResponse);
        // Trích xuất thông tin từ response
        const githubToken = githubResponse.data.accessToken;
        console.log('Github token', githubToken);
        localStorage.setItem('githubToken', githubToken);
        setTimeout(() => {
            window.location.href = "/env-data-table";
        }, 1000);
    };

    const handleGithubReject = (error) => {
        console.log('Github Login Failed:', error);
        alert('Github Login Failed');
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
                        <LoginSocialGoogle
                            client_id="936056609798-qhmojib77nh666mmhklgsajqsl5g0n8c.apps.googleusercontent.com"
                            onResolve={handleGoogleSuccess}
                            onReject={handleGoogleFailure}
                        >
                            <GoogleLoginButton
                                style={{
                                    border: 'none',
                                    cursor: 'pointer',
                                    display: 'flex',
                                    alignItems: 'center',
                                    width: '250px',
                                    height: '40px'
                                }}/>
                        </LoginSocialGoogle>
                    </p>
                    <p className="login-via">
                        <LoginSocialFacebook
                            appId="2708173769389025"
                            onResolve={handleFacebookResolve}
                            onReject={handleFacebookReject}
                        >
                            <FacebookLoginButton
                                style={{
                                    border: 'none',
                                    cursor: 'pointer',
                                    display: 'flex',
                                    alignItems: 'center',
                                    width: '250px',
                                    height: '40px'
                                }}/>
                        </LoginSocialFacebook>
                    </p>
                    <p className="login-via">
                        <LoginSocialGithub
                            client_id="Ov23lip9WIc0S35SgNr1"
                            client_secret="b94d3031df030b3d91f5a929c46d3622c1fbbf85"
                            redirect_uri="https://statistical-data.vercel.app/env-data-table"
                            onResolve={handleGithubResolve}
                            onReject={handleGithubReject}
                        >
                            <GithubLoginButton
                                style={{
                                    border: 'none',
                                    cursor: 'pointer',
                                    display: 'flex',
                                    alignItems: 'center',
                                    width: '250px',
                                    height: '40px'
                                }}/>
                        </LoginSocialGithub>
                    </p>
                </div>
            </form>
        </div>
    );
}

export default Login;