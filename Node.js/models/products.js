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
    purchaseDate:{type: Date, required: true},
    price:{type: Number, required: true},
    userID:{type: String, required: true},
});

var Product = mongoose.model("Product", productSchema);

module.exports = Product;