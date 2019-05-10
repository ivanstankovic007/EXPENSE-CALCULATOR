import React from "react";
import "./Register.css"


export class Register extends React.Component {
    render() {
        return (
            <section id='register_section'>
                <div className="center add_margin">
                    <div className="login">
                        <form className="login_form">
                            <label for="fname">First Name</label>
                            <input type="text" />
                            <label for="lname">Last Name</label>
                            <input type="text" />
                            <label for="email">E-mail</label>
                            <input type="email" />
                            <label for="birth">Date of Birth</label>
                            <input type="text" />
                            <label for="phone">Telephone</label>
                            <input type="number" />
                            <label for="country">Country</label>
                            <input type="text" />
                            <label for="Password">Password</label>
                            <input type="password" />

                            <button className="signin">register</button>


                        </form>
                        <p> Or if you don't have an account, <a className="paragraph_register" href="/signin.html">Sign in</a></p>
                    </div>
                </div>
            </section>
        )
    }
}