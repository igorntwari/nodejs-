const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const UserRoutes = require("./Routes/user.routes");
const ProductRoutes = require("./Routes/product.routes");

app.use(bodyParser.json());
const connectDB = require("./db/connectDB");
app.use(express.urlencoded({ extended: true }));

//users
app.use(UserRoutes);
//Products
app.use(ProductRoutes)

app.listen(3000, () => {
  connectDB();
  console.log("Server is running on port 3000");
});
app.use((req, res) => {
  res.status(404).render("404", { tittle: "Notfound" });
});
