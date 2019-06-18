import React from "react";
import "./Login.css";
import { NavLink } from "react-router-dom";
import Axios from "axios";
import { getJwt } from "./jwt";

export class Login extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: ""
    }

    this.HandleFieldsChange = this.HandleFieldsChange.bind(this);
    this.logIn = this.logIn.bind(this)

  }

  componentDidMount() {
    this.logIn();
  }

  logIn() {
    
    const jwt = getJwt();
    if (!jwt) {
      this.setState({
        user: null
      });
      return;
    }

    axios.get('"http://localhost:3000/"', { headers: { Authorization: getJwt() } }).then(res => {
      this.setState({
        user: res.data
      })
    });

    // var formData = new FormData();
    // formData.append('email', this.state.email);
    // formData.append('password', this.state.password);
  }
  //   Axios.post("http://localhost:3000/", {
  //     email: this.state.email,
  //     password: this.state.password
  //   },
  //   { headers: {"Authorization" : `Bearer ${jwt}` } }
  //  )
  // .then(res=> this.setState({user:res.data}))
  //  .then( res => {
  //     this.props.history.push('/products')
  //   })
  //     .catch(err => console.log(err))

  // }


HandleFieldsChange(e) {
  this.setState({
    [e.target.name]: e.target.value
  })
}

render() {
  return (
    <section id="login">
      <div className="center">
        <div>
          <form className="login_form">
            <label htmlFor="email">E-mail</label>
            <input onInput={this.HandleFieldsChange} value={this.state.email} id="email" type="email" className="input" />
            <label htmlFor="password">Password</label>
            <input onInput={this.HandleFieldsChange} value={this.state.password} id="password" type="password" />

            <button onClick={this.logIn} className="signin">sign in</button>
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
