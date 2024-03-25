const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
  productName: {
    type: String,
    require: true,
    unique: true,
  },
  manufactureName: {
    type: String,
    require: true,
  },
  productImage: {
    type: String,
    require: true,
  },
  productDescription: {
    type: String,
    require: true,
  },
  CreatedAt: {
    type: Date,
    default: Date.now,
  },
});
const Product = mongoose.model("Product", ProductSchema);
module.exports = Product;
