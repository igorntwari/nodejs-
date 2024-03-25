const User = require("../Models/user");

const All_User = (req, res) => {
  User.find()
    .then((results) => {
      res.status(200).json(results);
    })
    .catch((error) => {
      console.log("There was an error while getting all users", error.message);
    });
};

const Get_Single_User = (req, res) => {
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
};

const Create_Single_User = (req, res) => {
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
};


module.exports = {
  All_User,
  Create_Single_User,
  Get_Single_User,
};
