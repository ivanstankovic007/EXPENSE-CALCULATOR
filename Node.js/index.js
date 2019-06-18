const Product = require("./models/products");
const express = require("express");
var app = express();
const db = require("./connection");
const User = require("./models/users");
const myParser = require("body-parser");
var cors = require("cors");

app.use(myParser.urlencoded({ extended: true }));
app.use(myParser.json());
const session = require("express-session");
app.use(session({ secret: "test" }));
// api.use(cors());
var jwt = require("jsonwebtoken");
var jwtSecret = "secretkey";
var bcrypt = require("bcrypt");

let allowCrossDomain = function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With,Content-Type");
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PATCH, PUT, DELETE");
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

  // user.save(function (err) {
  //   if (err) {
  //     return next(err);
  //   }
  //   res.send("User saved");
  // });
});

// app.get("/", (req, res) => {
//   res.send("Hello");
// });

// app.post("/login", (req, res) => {
//   var email = req.body.emailLogin;
//   var pass = req.body.passLogin;

//   //database checks

//   req.session.user = email;

//   //return response to FE
// });

app.post("/addProduct", verifyToken, (req, res, next) => {
  var productname = req.body.productname;
  var productdescription = req.body.productdescription;
  var producttype = req.body.producttype;
  var purchasedate = req.body.purchasedate;
  var price = req.body.price;
  // var userEmail = req.session.email;

  let product = new Product({
    productname: productname,
    productdescription: productdescription,
    producttype: producttype,
    purchasedate: purchasedate,
    price: price,
    // userEmail: userEmail
  });

  jwt.verify(req.token, jwtSecret, (err, authData) => {
    if (err) {
      res.send(403)
    }
    else {
      product.save((err) => {
        if (err) {
          next(err)
        }
        res.send("Product Created")
      })
      authData
    }
  })

  // product.save(function (err) {
  //   if (err) {
  //     return next(err);
  //   }
  //   res.send("Product Added");
  // });

  //send response to FE
});

app.get("/addProduct", (req, res) => {
  res.send("New Product");
});

// app.get("/products", (req, res, next) => {
//   Product.find({}, function (err, products) {
//     if (err) {
//       return next(err);
//     }
//     res.send(products);
//   });
// });

app.get("/products", verifyToken, (req, res, next) => {
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

// app.put("/products/:id", (req, res, next) => {
//   Product.findByIdAndUpdate(req.params.id, req.body, function(err) {
//     if (err) {
//       return next(err);
//     }
//     res.send("Product updated.");
//   });
// });

// app.patch("/editproduct/:id", (req, res, next) => {
//   Product.findOneAndUpdate({ _id: req.params.id}, req.body, function(err) {
//     if (err) {
//       return next(err); 
//     }
//     res.send("Product updated.");
//   });
// });

app.patch("/editproduct/:id", verifyToken, (req, res, next) => {
  jwt.verify(req.token, jwtSecret, (err, authData) => {
      if(err){
          res.send(403)
      }
      else{
          Product.findByIdAndUpdate({ _id: req.params._id }, (err) => {
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

// app.delete("/products/:id", (req, res, next) => {
//   Product.deleteOne({ _id: req.params.id }, function (err) {
//     if (err) {
//       return next(err);
//     }
//     Product.find({}).then(data => res.send(data))
//   });
// });

app.delete('/products/:id', verifyToken, (req, res, next) => {
  jwt.verify(req.token, jwtSecret, (err, authData) => {
      if(err){
          res.send(403)
      }
      else{
          Product.deleteOne({ _id: req.params.id }, function (err) {
              if (err) {
                  return next(err)
              }
              Product.find({}).then(data => res.send(data))
          });
          authData
      }
  })
  
  
  
})