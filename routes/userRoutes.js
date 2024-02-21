const express = require("express");
const { checkSchema } = require("express-validator");
const { userLoginValidation, userRegisterValidation } = require("../app/helpers/userValidation");
const userCtrl = require("../app/controllers/userController");

const userRouter = express.Router();

//user login
userRouter.post("/login", checkSchema(userLoginValidation), userCtrl.login);

// user register
userRouter.post("/register", checkSchema(userRegisterValidation), userCtrl.register);

module.exports = userRouter;
