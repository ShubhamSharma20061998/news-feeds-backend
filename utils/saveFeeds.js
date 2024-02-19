const Feed = require("../app/models/feedsModel");

const saveFeeds = (feeds, categoryID) => {
  feeds.forEach(async ({ title, description, link, pubDate }) => {
    const feed = new Feed();
    feed.title = title[0];
    feed.description = description[0];
    feed.link = link[0];
    feed.pubDate = pubDate[0];
    feed.category = categoryID;
    await feed.save();
  });
};

module.exports = saveFeeds;
