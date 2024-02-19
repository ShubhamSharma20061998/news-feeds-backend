const express = require("express");
const feedsCtrl = require("../app/controllers/feedsController");

const feedRouter = express.Router();

feedRouter.get("/list/:id", feedsCtrl.get);

module.exports = feedRouter;
