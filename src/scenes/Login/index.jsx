import React, { useState } from 'react'
import './login.css'
import './login.js'
import { FaGoogle,FaFacebook,FaGithub   } from "react-icons/fa";
import {GoogleLogin} from '@react-oauth/google';
import {jwtDecode} from "jwt-decode";
const Login = () => {
    return (
        <div class="wrapper">
            <form>
                <h2>Login</h2>
                <div className="input-field">
                    <input type="text" placeholder='Username' required/>
                </div>
                <div className="input-field">
                    <input type="password" placeholder='Password' required/>
                </div>
                <div className="forget">
                    <label for="remember">
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
                    <p class="login-via">
                        <GoogleLogin
                            render={renderProps => (
                                <button onClick={renderProps.onClick} disabled={renderProps.disabled} style={{ border: 'none', background: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center'  }}>
                                    <FaGoogle color="#db4a39" />
                                </button>
                            )}
                            onSuccess={credentialResponse => {
                                const decoded = jwtDecode(credentialResponse?.credential);
                                alert('Login success!'); // Hiển thị thông báo đăng nhập thành công
                                setTimeout(() => {
                                    window.location.href = "https://statistical-data.vercel.app/env-data-table"; // Điều hướng tới trang khác
                                }, 1000);
                            }}
                            onError={() => {
                                console.log('Login Failed');
                            }}
                        />
                    </p>
                </div>
            </form>

        </div>
    )

}
export default Login