const users = require("./models/users");
const products = require("./models/products");
const express = require("express");
var app = express();
const myParser = require("body-parser");
app.use(myParser.urlencoded({ extended: true }));
const session = require("express-session");
app.use(session({ secret: "test" }));

var u1 = new users.create("admin", "admin", "admin@yahoo.com", "23.05.1986", "070000", "Macedonia", "123");

app.post("/register", (req, res) => {
    var firstname = req.body.firstname;
    var lastname = req.body.lastname;
    var email = req.body.email;
    var birthdate = req.body.birthdate;
    var telephone = req.body.telephone;
    var country = req.body.country;
    var pass = req.body.pass;

    var newUser = new users.create(firstname, lastname, email, birthdate, telephone, country, pass)
});

app.post("/login", (req, res) => {
    var email = req.body.emailLogin;
    var pass = req.body.passLogin;

    //database checks

    req.session.user = email;

    //return response to FE
})

app.post("/addProduct", (req, res) => {
    if (req.session.email) {
        var productName = req.body.productName;
        var productDescription = req.body.productDescription;
        var productType = req.body.productType;
        var purchaseDate = req.body.purchaseDate;
        var price = req.body.price;
        var userEmail = req.session.email;

        var p = new products.create(productName, productDescription, productType, purchaseDate, price, userEmail);

        //send response to FE
    }
    else{
        res.status(403).send("Access denied");
    }
})



