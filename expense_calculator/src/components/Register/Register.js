import React from "react";
import "./Register.css";
import { NavLink } from "react-router-dom";

export class Register extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      firstname: "",
      lastname: "",
      email: "",
      birthdate: "",
      telephone: "",
      country: "",
      password: "",
    }

    this.HandleFieldsChange = this.HandleFieldsChange.bind(this);
    this.RegisterUser = this.RegisterUser.bind(this);
  }

  RegisterUser() {
    let data = {
      "firstname": this.state.firstname,
      "lastname": this.state.lastname,
      "email": this.state.email,
      "birthdate": this.state.birthdate,
      "telephone": this.state.telephone,
      "country": this.state.country,
      "password": this.state.password,
    }

    fetch("http://localhost:3000/register", {
      mode: "cors",
      method: "POST",
      body: JSON.stringify({data}),
      
    })
      .then((res) => console.log("REGISTER RESULT: ", res))
      .catch((err) => console.error(err));

  }

  HandleFieldsChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  render() {
    return (
      <section id="register">
        <div className="center add_margin">
          <div className="login">
            <div className="login_form">
              <label htmlFor="fname">First Name</label>
              <input name="firstname" value={this.state.firstname} onChange={this.HandleFieldsChange} type="text" />

              <label htmlFor="lname">Last Name</label>
              <input name="lastname" value={this.state.lastname} onChange={this.HandleFieldsChange} type="text" />

              <label htmlFor="email">E-mail</label>
              <input name="email" value={this.state.email} onChange={this.HandleFieldsChange} type="email" />

              <label htmlFor="birth">Date of Birth</label>
              <input name="birthdate" value={this.state.birthdate} onChange={this.HandleFieldsChange} type="text" />

              <label htmlFor="phone">Telephone</label>
              <input name="telephone" value={this.state.telephone} onChange={this.HandleFieldsChange} type="number" />

              <label htmlFor="country">Country</label>
              <input name="country" value={this.state.country} onChange={this.HandleFieldsChange} type="text" />

              <label htmlFor="Password">Password</label>
              <input name="password" value={this.state.password} onChange={this.HandleFieldsChange} type="password" />

              <button onClick={this.RegisterUser} className="signin">register</button>
            </div>
            <p>
              Or if you don't have an account,
              <NavLink className="paragraph_register" to="/">
                Sign in
              </NavLink>
            </p>
          </div>
        </div>
      </section>
    );
  }
}
