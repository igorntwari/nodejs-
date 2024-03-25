const express = require("express");
const router = express.Router();
const userController = require("../Controller/UserController");

router.get("/users", userController.All_User);
router.get("/users/:id", userController.Get_Single_User);
router.post("/users", userController.Create_Single_User);

module.exports = router;
