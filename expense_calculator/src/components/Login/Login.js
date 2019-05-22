import React from "react";
import "./Login.css";
import { NavLink } from "react-router-dom";

export class Login extends React.Component {

  componentDidMount() {
   
  }

  // FetchProducts() {
  //   fetch("http://localhost:3000/products")
  //     .then((res) => { return res.json() })
  //     .then((res) => console.log("RESULT FROM FETCH", res))
  //     .catch((err) => console.error(err));
  // }

  render() {
    return (
      <section id="login">
        <div className="center">
          <div>
            <form className="login_form">
              <label htmlFor="email">E-mail</label>
              <input id="email" type="email" className="input" />
              <label htmlFor="password">Password</label>
              <input id="password" type="password" />

              <button className="signin">sign in</button>
            </form>
            <p>
              Or if you don't have an account,
              <NavLink className="paragraph_register" to="/Register">
                Register
              </NavLink>
            </p>
          </div>
        </div>
      </section>
    );
  }
}
