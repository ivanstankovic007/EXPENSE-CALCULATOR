const Product = require("./models/products");
const express = require("express");
var app = express();
const db = require("./connection");
const User = require("./models/users");
const myParser = require("body-parser");
var cors = require("cors");
var jwt = require("jsonwebtoken");
var jwtSecret = "secretkey";
var bcrypt = require("bcrypt");

app.use(myParser.urlencoded({ extended: true }));
app.use(myParser.json());
const session = require("express-session");
app.use(session({ secret: "test" }));
app.use(cors());


let allowCrossDomain = function (req, res, next) {
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PATCH, PUT, DELETE");
  res.setHeader("Access-Control-Allow-Origin", "*");
  next();
};
app.use(allowCrossDomain);

app.listen(3000);

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

app.post("/", (req, res) => {
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


app.post("/register", (req, res, next) => {
  var firstname = req.body.firstname;
  var lastname = req.body.lastname;
  var email = req.body.email;
  var birthdate = req.body.birthdate;
  var telephone = req.body.telephone;
  var country = req.body.country;
  var password = req.body.password;

  let newuser = new User({
    firstname: firstname,
    lastname: lastname,
    email: email,
    birthdate: birthdate,
    telephone: telephone,
    country: country,
    password: password
  });

  console.log(newuser);

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

app.post("/newproduct", (req, res, next) => {
  var productname = req.body.productname;
  var productdescription = req.body.productdescription;
  var producttype = req.body.producttype;
  var purchasedate = req.body.purchasedate;
  var price = req.body.price;
  var userEmail = req.session.email;

  let newproduct = new Product({
    productname: productname,
    productdescription: productdescription,
    producttype: producttype,
    purchasedate: purchasedate,
    price: price,
    userEmail: userEmail
  });

  newproduct.save(function (err) {
    if (err) {
      return next(err);
    }
    res.send("Product Added");
  });
});

app.get("/products", verifyToken, (req, res, next) => {
  jwt.verify(req.token, jwtSecret, (err, authData) => {
    if (err) {
      res.send(403)
    }
    else {
      Product.find({}, function (err, products) {
        if (err) {
          return next(err);
        }
        res.send(products);
      });
      authData
    }
  })

})

app.get("/expenses", verifyToken, (req, res, next) => {
  jwt.verify(req.token, jwtSecret, (err, authData) => {
    if (err) {
      res.send(403)
    }
    else {
      Product.find({}, function (err, products) {
        if (err) {
          return next(err);
        }
        res.send(products);
      });
      authData
    }
  })
})

app.patch("/editproduct/:id", verifyToken, (req, res, next) => {
  jwt.verify(req.token, jwtSecret, (err, authData) => {
    if (err) {
      res.send(403)
    }
    else {
      Product.findByIdAndUpdate({ _id: req.params.id }, req.body, function (err) {
        console.log(res)
        if (err) {
          return next(err)
        }
        res.send("Product Edited")
        console.log(res)
      })
      authData
    }
  })
})

app.delete("/products/:id", (req, res, next) => {
  Product.deleteOne({ _id: req.params.id }, function (err) {
    if (err) {
      return next(err);
    }
    Product.find({}).then(data => res.send(data))
  });
});