import React from "react";
import "./Login.css";
import { NavLink } from "react-router-dom";


export class Login extends React.Component {
    render() {
        return (
            <section id='login_section'>
                <div className="center">
                    <div className="login">
                        <form className="login_form">
                            <label for="email">E-mail</label>
                            <input id="email" type="email" className="input" />
                            <label for="password">Password</label>
                            <input id="password" type="password" />

                            <button className="signin">sign in</button>


                        </form>
                        <p> Or if you don't have an account, <NavLink className="paragraph_register" to="/Register">Register</NavLink></p>
                    </div>
                </div>
            </section>
        )
    }
}