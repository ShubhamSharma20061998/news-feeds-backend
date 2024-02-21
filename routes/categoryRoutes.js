const express = require("express");
const { checkSchema } = require("express-validator");
const categoryValidation = require("../app/helpers/categorySchema");
const categoryCtrl = require("../app/controllers/categoryController");
const { authorization, authenticateUser } = require("../app/middlewares/authentication");

const categoryRouter = express.Router();

// create category
categoryRouter.post("/create", checkSchema(categoryValidation), categoryCtrl.create);

// list all categories
categoryRouter.get("/list", categoryCtrl.listAll);

// update category
categoryRouter.put("/edit/:id", checkSchema(categoryValidation), authenticateUser, authorization(["admin"]), categoryCtrl.update);

//delete category
categoryRouter.delete("/remove/:id", authenticateUser, authorization(["admin"]), categoryCtrl.remove);

module.exports = categoryRouter;
