// exports.create = function (pName, pDescription, pType, purchaseDate, price, userEmail) {
//     this.productName = pName;
//     this.productDescription = pDescription;
//     this.productType = pType;
//     this.purchaseDate = purchaseDate;
//     this.price = price;
//     this.userID = userEmail;
// }

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

var productSchema = new Schema ({
    productName: {type: String, required: true},
    productDescription: {type: String},
    productType: {type: String},
    purchaseDate:{type: String, required: true},
    price:{type: String},
    userID:{type: String},
});

var Product = mongoose.model("Product", productSchema);

module.exports = Product;