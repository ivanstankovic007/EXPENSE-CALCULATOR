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

var productsSchema = new Schema({
  productname: { type: String, required: true },
  productdescription: { type: String, required: true },
  producttype: { type: String, required: true },
  purchasedate: { type: Date, required: true },
  price: { type: Number, required: true },
  userID: [{ type: Schema.Types.ObjectId, ref: 'User' }]
  // userID: { type: String }
});

var Product = mongoose.model("Product", productsSchema);

module.exports = Product;
