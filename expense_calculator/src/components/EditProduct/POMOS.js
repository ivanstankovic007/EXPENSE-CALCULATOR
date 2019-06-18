
import React from "react";
import {NavLink} from "react-router-dom"
import Axios from "axios"

import "./Login.css"

export class Login extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            email : "",
            password : ""
        }

        this.HandleFieldsChange = this.HandleFieldsChange.bind(this);
        this.logIn = this.logIn.bind(this)

    }


    logIn() {
        let data = {
          "email": this.state.email,
          "password": this.state.password
        }
    
        var formData = new FormData();
        formData.append('email', this.state.email);
        formData.append('password', this.state.password);
    
        Axios.post("http://localhost:3000/", {
          email: this.state.email,
          password: this.state.password
        },
        { headers: {"Authorization" : "Bearer" + "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImxhemFyc3RlcDEyM0BnbWFpbC5jb20iLCJpYXQiOjE1NjA0MzQ0MTV9.gCFwq2q4waQHoRyk7jLZM9Pk7VT5XYxySBReBKXZpo0"} }
       ).then( res => {
          this.props.history.push('/products')
        })
          .catch(err => console.log(err))
    
      }
    

    HandleFieldsChange(e) {
        this.setState({
          [e.target.name]: e.target.value
        })
      }

    render() {
        return (
            <section id="login">
                <div className="center-div">
                    <div>
                        <form className="login-form">
                            <label className="login-label" htmlFor="email">E-mail</label>
                            <input onInput={this.HandleFieldsChange} type="email" name="email" className="login-input" />
                            <label className="login-label" htmlFor="password">Password</label>
                            <input onInput={this.HandleFieldsChange} type="password" name="password" className="login-input" />
                            <button onClick={this.logIn} className="btn">SIGN IN</button>
                        </form>
                        <p className="text">Or if you don't have an account,<NavLink className="link" to="/register"> Register</NavLink></p>
                    </div>
                </div>
            </section>
        )
    }
}












import React from "react";
import { NavLink } from "react-router-dom"

import "./Register.css"
import Axios from "axios";

export class Register extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      firstname: "",
      lastname: "",
      email: "",
      date: "",
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
      "date": this.state.date,
      "telephone": this.state.telephone,
      "country": this.state.country,
      "password": this.state.password,
    }

    var formData = new FormData();
    formData.append('firstname', this.state.firstname);
    formData.append('lastname', this.state.lastname);
    formData.append('email', this.state.email);
    formData.append('date', this.state.date);
    formData.append('telephone', this.state.telephone);
    formData.append('country', this.state.country);
    formData.append('password', this.state.password);

    Axios.post("http://localhost:3000/register", {
      firstname: this.state.firstname,
      lastname: this.state.lastname,
      email: this.state.email,
      date: this.state.date,
      telephone: this.state.telephone,
      country: this.state.country,
      password: this.state.password
    }).then( res => {
      this.props.history.push('/')
    })
      .catch(err => console.log(err))

  }

  HandleFieldsChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    })
  }


  render() {

    return (
      <section id="register">
        <div className="center-div">
          <div className="login-container-margintop">
            <div className="login-form">
              <label className="login-label" htmlFor="firstname">First Name</label>
              <input onInput={this.HandleFieldsChange} type="text" name="firstname" className="login-input" />
              <label className="login-label" htmlFor="lastname">Last Name</label>
              <input onInput={this.HandleFieldsChange} type="text" name="lastname" className="login-input" />
              <label className="login-label" htmlFor="email">Email</label>
              <input onInput={this.HandleFieldsChange} type="email" name="email" className="login-input" />
              <label className="login-label" htmlFor="date">Date of birth</label>
              <input onInput={this.HandleFieldsChange} type="date" name="date" className="login-input" />
              <label className="login-label" htmlFor="telephone">Telephone</label>
              <input onInput={this.HandleFieldsChange} type="number" name="telephone" className="login-input" />
              <label className="login-label" htmlFor="country">Country</label>
              <input onInput={this.HandleFieldsChange} type="text" name="country" className="login-input" />
              <label className="login-label" htmlFor="password">Password</label>
              <input onInput={this.HandleFieldsChange} type="password" name="password" className="login-input" />
              <button onClick={this.RegisterUser} className="btn">REGISTER</button>
            </div>
            <p className="text">Or if you have an account, <NavLink className="link" to="/"> Log In </NavLink></p>
          </div>




        </div>
      </section>
    )
  }
}


const Product = require("./models/product");
const express = require("express");
var api = express();
const db = require("./connection");
const User = require("./models/users");
const myParser = require("body-parser");
var cors = require("cors")
var jwt = require("jsonwebtoken");
var jwtSecret = "secretkey"
var bcrypt = require("bcrypt")


api.use(myParser.urlencoded({ extended: true }));
api.use(myParser.json());
const session = require("express-session");


api.use(session({ secret: "test" }));
api.use(cors())
let allowCrossDomain = function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With,Content-Type");
    res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PATCH, PUT, DELETE");
    next();
};
api.use(allowCrossDomain);


api.listen(3000);

function verifyToken(req, res, next) {

    const bearerHeader = req.headers["authorization"]

    if (typeof bearerHeader !== "undefined") {
        const bearer = bearerHeader.split(" ");
        const bearerToken = bearer[1];
        req.token = bearerToken;
        next();
    }
    else {
        res.send(403)
    }
}


api.post("/", (req, res) => {
    var email = req.body.email;
    var password = req.body.password;

    User.findOne({ email }, (err, user) => {
        if (err) {
            res.send('Error from database').status(500);
        } else {
            if (user !== null) {
                if (bcrypt.compareSync(password, user.password)) {
                    const access_token = jwt.sign({ email: user.email }, jwtSecret);
                    res.send({ access_token, user })
                } else {
                    res.status(401).send("Password not correct")
                }
            } else {
                res.status(403).send('Credentials not correct');
            }
        }
    })
})



api.post("/register", (req, res, next) => {
    var firstname = req.body.firstname;
    var lastname = req.body.lastname;
    var email = req.body.email;
    var date = req.body.date;
    var telephone = req.body.telephone;
    var country = req.body.country;
    var password = req.body.password;

    let newuser = new User({
        firstname: firstname,
        lastname: lastname,
        email: email,
        date: date,
        telephone: telephone,
        country: country,
        password: password
    });

    User.findOne({ email }, (err, user) => {
        if (err) {
            res.send('Error creating user');
        } else {
            if (!user) {
                newuser.save(function (err) {
                    if (err) {
                        res.status(406).send(err)
                        return next(err);
                    }
                    const access_token = jwt.sign({ email: newuser.email }, jwtSecret);
                    res.send({ access_token })
                })
            } else {
                res.status(406).send('User already exist')
            }
        }
    })
});


api.post("/newproduct", verifyToken, (req, res, next) => {
    var productname = req.body.productname;
    var desc = req.body.desc;
    var type = req.body.type;
    var date = req.body.date;
    var price = req.body.price;
    // var userEmail = req.body.userEmail;

    let newproduct = new Product({
        productname: productname,
        desc: desc,
        type: type,
        date: date,
        price: price

    });

    jwt.verify(req.token, jwtSecret, (err, authData) => {
        if(err){
            res.send(403)
        }
        else{
            newproduct.save((err)=>{
                if(err){
                    next(err)
                }
                res.send("Product Created")
            })
            authData
        }
    })
})




    //     newproduct.save(function(err){
    //         if(err){
    //             return next(err);
    //         }
    //         res.send("New Product saved!");
    //     })
    // })

    api.get("/products", verifyToken, (req, res, next) => {
        jwt.verify(req.token, jwtSecret, (err, authData) => {
            if(err){
                res.send(403)
            }
            else{
                Product.find({}, function(err, products) {
                    if (err) {
                      return next(err);
                    }
                    res.send(products);
                  });
                  authData
            }
        })

    })

    // jwt.verify(req.token, "secretkey", (err, authData) => {
    //     if(err){
    //         res.send(403)
    //     }
    //     else{
    //         authData
    //     }
    // })

    api.get("/expenses", verifyToken, (req, res, next) => {
        jwt.verify(req.token, jwtSecret, (err, authData) => {
            if(err){
                res.send(403)
            }
            else{
                Product.find({}, function(err, products) {
                    if (err) {
                      return next(err);
                    }
                    res.send(products);
                  });
                  authData
            }
        })
    })


    api.delete('/products/:id', verifyToken, (req, res, next) => {
        jwt.verify(req.token, jwtSecret, (err, authData) => {
            if(err){
                res.send(403)
            }
            else{
                Product.findOneAndDelete({ _id: req.params.id }, function (err) {
                    if (err) {
                        return next(err)
                    }
                    Product.find({}).then(data => res.send(data))
                });
                authData
            }
        })
        
        
        
    })

    api.patch("/editproduct/:id", verifyToken, (req, res, next) => {
        jwt.verify(req.token, jwtSecret, (err, authData) => {
            if(err){
                res.send(403)
            }
            else{
                Product.findByIdAndUpdate({ _id: req.params._id }, (err) => {
                    if (err) {
                        return next(err)
                    }
                    res.send("Succesfully Edited")
                    console.log(res)
                })
                authData
            }
        })

        
        
    })