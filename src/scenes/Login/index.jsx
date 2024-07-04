import React from 'react'
import './login.css'
import './login.js'
import { FaGoogle,FaFacebook,FaGithub   } from "react-icons/fa";
const Login = () => {
    return (
        <div class="wrapper">
            <form id="loginForm" action="https://statistical-data.vercel.app/Environmental_Data">
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
                        <a  href="#"><FaGoogle /></a>
                        <a style={{marginLeft: 20 + 'px'}}  href="#"><FaFacebook /></a>
                        <a style={{marginLeft: 20 + 'px'}}  href="#"><FaGithub  /></a>
                    </p>

                </div>
            </form>

        </div>
    )

}
export default Login