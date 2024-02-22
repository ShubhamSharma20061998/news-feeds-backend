const { default: axios } = require("axios");
const cron = require("node-cron");
const { parseString } = require("xml2js");
const saveFeeds = require("./saveFeeds");

const feedsCron = (cronJob, url, existingFeeds, category) => {
  // Stop the previous cron job if it exists
  // if (cronJob) {
  //   cronJob.stop();
  // }

  // Schedule the cron job to run every two minutes with respective url
  const newCronJob = cron.schedule("*/1 * * * *", async () => {
    try {
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

      // save feeds to DB
      // if (existingFeeds.length == 0) {
      //   saveFeeds(parsedResult, category._id);
      // } else {
      let recentFeed = existingFeeds.map(el => new Date(el.pubDate)).sort((a, b) => new Date(b) - new Date(a))[0] || new Date();

      // Filter only new feeds
      const newFeeds = parsedResult.filter(el => new Date(el.pubDate[0]) > recentFeed);
      saveFeeds(newFeeds, category._id);
      // }
    } catch (err) {
      console.error(err);
    }
  });
  console.log("Cron job scheduled for:", url);

  // Return the new cron job reference so it can be stopped later if needed
  // return newCronJob;
};

module.exports = feedsCron;
