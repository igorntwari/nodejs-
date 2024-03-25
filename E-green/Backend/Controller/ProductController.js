const Product = require("../Models/Products");

const All_Products = (req, res) => {
  Product.find()
    .then((results) => {
      res.status(200).json(results);
    })
    .catch((error) => {
      console.log(error);
    });
};

const Get_Single_Product = (req, res) => {
  const ProductId = req.params.id;
  Product.findById(ProductId)
    .then((results) => {
      res.status(201).json(results);
    })
    .catch((error) => {
      console.log(error);
    });
};

const Create_New_Product = (req, res) => {
  const newProduct = new Product({
    productName: req.body.productName,
    manufactureName: req.body.manufactureName,
    productImage: req.body.productImage,
    productDescription: req.body.productDescription,
  })
    .save()
    .then((result) => {
      res.status(201).send(result);
      console.log("new products was created");
    })
    .catch((error) => {
      res.status(501).send(error);
    });
};
module.exports = {
  All_Products,
  Get_Single_Product,
  Create_New_Product,
};
