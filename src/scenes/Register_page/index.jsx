import React from 'react'
import './register.css'
const Register = () => {
    return (
        <div class="wrapper">
            <form action="#">
                <h2>Register</h2>
                <div className="input-field">
                    <input type="text" placeholder='Username' required/>
                </div>
                <div className="input-field">
                    <input type="password" placeholder='Password' required/>
                </div>
                <div className="input-field">
                    <input type="password" placeholder='Confirm Password' required/>
                </div>
                <div className="forget">
                    <label for="remember">
                        <input type="checkbox" id="remember"/>
                        <p>I agree to all terms</p>
                    </label>
                </div>
                <button type="submit">Register</button>
                <div className="register">
                    <p>Already have an account? <a href="./login">Login</a></p>
                </div>
            </form>
        </div>
    )
}
export default Register