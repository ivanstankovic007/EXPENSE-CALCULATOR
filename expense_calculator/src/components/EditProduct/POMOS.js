Skip to content
 
Search or jump to…

Pull requests
Issues
Marketplace
Explore
 
@ivanstankovic007 
0
0 0 Laze997/NodeJS
 Code  Issues 0  Pull requests 0  Projects 0  Wiki  Security  Insights
NodeJS/index.js
@Laze997 Laze997 -auth fix
ebb5a3c 1 hour ago
236 lines (193 sloc)  6.12 KB
    
    
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
                authData
            })
            
        }
    })
})


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


    // api.delete('/products/:id', (req, res, next) => {
    //     // jwt.verify(req.token, jwtSecret, (err, authData) => {
    //     //     if(err){
    //     //         res.send(403)
    //     //     }
    //         // else{
    //             Product.findOneAndDelete({ _id: req.params.id }, function (err) {
    //                 if (err) {
    //                     return next(err)
    //                 }
    //                 Product.find({}).then(data => res.send(data));
    //                 // authData
    //             });
                
    //     //     }
    //     // })
        
        
        
    // })

    api.delete('/products/:id', (req, res, next) => {

        Product.findOneAndDelete({ _id: req.params.id }, function (err) {
            if (err) {
                return next(err)
            }
            Product.find({}).then(data => res.send(data));
        });

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

