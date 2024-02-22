const express = require("express");
const feedsCtrl = require("../app/controllers/feedsController");

const feedRouter = express.Router();

//get feeds
feedRouter.get("/list/:id", feedsCtrl.get);

module.exports = feedRouter;
