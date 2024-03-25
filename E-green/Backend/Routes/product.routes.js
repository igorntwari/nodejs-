const express = require("express");
const router = express.Router();
const productController = require("../Controller/ProductController");

router.get("/products", productController.All_Products);
router.get("/products/:id", productController.Get_Single_Product);
router.post("/products", productController.Create_New_Product);
module.exports = router