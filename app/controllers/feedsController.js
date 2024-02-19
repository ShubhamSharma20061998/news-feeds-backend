const Feed = require("../models/feedsModel");
const feedsCron = require("../../utils/feedCron");
const Category = require("../models/categoryModel");
const { default: axios } = require("axios");
const { parseString } = require("xml2js");
const saveFeeds = require("../../utils/saveFeeds");

const feedsCtrl = {};

// Declare a variable to hold the reference to the cron job
let currentCronJob = null;

// get feeds
feedsCtrl.get = async (req, res) => {
  const { id } = req.params;
  try {
    const category = await Category.findOne({ _id: id });
    const url = category.url;
    const existingFeeds = await Feed.find({ category: category._id });

    // save feeds to DB
    if (existingFeeds.length === 0) {
      // fetch respective url data
      const result = await axios.get(url);
      // xml to json conversion
      let parsedResult = "";
      parseString(result.data, function (err, results) {
        if (err) {
          console.error(err);
          return;
        }
        parsedResult = results.rss.channel[0].item;
      });

      saveFeeds(parsedResult, category._id);
      return res.json(parsedResult);
    }

    // feeds cron to get continous data
    currentCronJob = feedsCron(
      currentCronJob,
      category.url,
      existingFeeds,
      category
    );

    const feeds = await Feed.find({ category: id }).populate("category");
    res.json(feeds);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

module.exports = feedsCtrl;
