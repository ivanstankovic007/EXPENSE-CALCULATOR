const Product = require("./models/products");
const express = require("express");
var app = express();
const db = require("./connection");
const User = require("./models/users");
const myParser = require("body-parser");
app.use(myParser.urlencoded({ extended: true }));
app.use(myParser.json());
const session = require("express-session");
app.use(session({ secret: "test" }));



let allowCrossDomain = function(req, res, next) {
  res.header('Access-Control-Allow-Origin', "*");
  res.header('Access-Control-Allow-Headers', "*");
  next();
}
app.use(allowCrossDomain);


app.listen(3000);

app.post("/register", (req, res, next) => {
  var firstname = req.body.firstname;
  var lastname = req.body.lastname;
  var email = req.body.email;
  var birthdate = req.body.birthdate;
  var telephone = req.body.telephone;
  var country = req.body.country;
  var password = req.body.password;

  let user = new User({
    firstname: firstname,
    lastname: lastname,
    email: email,
    birthdate: birthdate,
    telephone: telephone,
    country: country,
    password: password
  });

  console.log(user);

  user.save(function(err) {
    if (err) {
      return next(err);
    }
    res.send("User saved");
  });
});

app.get("/", (req, res) => {
  res.send("Hello");
});

// app.post("/login", (req, res) => {
//     var email = req.body.emailLogin;
//     var pass = req.body.passLogin;

//     //database checks

//     req.session.user = email;

//     //return response to FE
// })

app.post("/addProduct", (req, res, next) => {
  var productName = req.body.productName;
  var productDescription = req.body.productDescription;
  var productType = req.body.productType;
  var purchaseDate = req.body.purchaseDate;
  var price = req.body.price;
  var userEmail = req.session.email;

  let product = new Product({
    productName: productName,
    productDescription: productDescription,
    productType: productType,
    purchaseDate: purchaseDate,
    price: price,
    userEmail: userEmail
  });

  product.save(function(err) {
    if (err) {
      return next(err);
    }
    res.send("Product Added");
  });

  //send response to FE
});

app.get("/addProduct", (req, res) => {
  res.send("New Product");
});

app.get("/products", (req, res, next) => {
  Product.find({}, function(err, products) {
    if (err) {
      return next(err);
    }
    res.send(products);
  });
});

app.put("/products/:id", (req, res, next) => {
  Product.findByIdAndUpdate(req.params.id, req.body, function(err) {
    if (err) {
      return next(err);
    }
    res.send("Product updated.");
  });
});

app.delete("/products/:id", (req, res, next) => {
  Product.deleteOne(req.params._id, function(err) {
    if (err) {
      return next(err);
    }
    res.send("Product deleted.");
  });
});
