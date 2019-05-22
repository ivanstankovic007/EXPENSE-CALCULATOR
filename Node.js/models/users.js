// exports.create = function (fn, ln, email, birthdate, tel, country, pass) {
//     this.firstname = fn;
//     this.lastname = ln;
//     this.email = email;
//     this.birthdate = birthdate;
//     this.telephone = tel;
//     this.country = country;
//     this.pass = pass;
// }

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

var usersSchema = new Schema ({
    firstname: {type: String},
    lastname: {type: String},
    email: {type: String},
    birthdate: {type: String},
    telephone: {type: String},
    country: {type: String},
    password: {type: String}
});

var User = mongoose.model("User", usersSchema);

module.exports = User;