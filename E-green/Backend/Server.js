const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const User = require("./Models/user");
app.use(bodyParser.json());
const connectDB = require("./db/connectDB");
app.use(express.urlencoded({ extended: true }));

//find all users
app.get("/users", (req, res) => {
  User.find()
    .then((results) => {
      res.status(200).json(results);
    })
    .catch((error) => {
      console.log("There was an error while getting all users", error.message);
    });
});

//find a single user
app.get("/users/:id", (req, res) => {
  const USerId = req.params.id;
  User.findById(USerId)
    .then((result) => {
      res.status(201).json(result);
    })
    .catch((error) => {
      console.log(
        "there was an error while getting a single user",
        error.message
      );
    });
});

// create a new user
app.post("/user", (req, res) => {
  const newUser = new User({
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
  })
    .save()
    .then((result) => {
      res.status(201).send(result);
      console.log("new user was created in db");
    })
    .catch((error) => {
      res.status(501).send(error);
    });
});

app.listen(3000, () => {
  connectDB();
  console.log("Server is running on port 3000");
});
