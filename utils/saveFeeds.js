// Import the Feeds model
const Feed = require("../app/models/feedsModel");

/**
 * Save feeds to the database
 * @param {Array} feeds - Array of feed objects containing title, description, link, and pubDate
 * @param {string} categoryID - ID of the category associated with the feeds
 */
const saveFeeds = (feeds, categoryID) => {
  feeds.forEach(async ({ title, description, link, pubDate }) => {
    // Create a new Feed instance
    const feed = new Feed();
    // Set properties from the feed data
    feed.title = title[0];
    feed.description = description[0];
    feed.link = link[0];
    feed.pubDate = pubDate[0];
    feed.category = categoryID;
    // Save the feed to the database
    await feed.save();
  });
};

// Export the saveFeeds function
module.exports = saveFeeds;
