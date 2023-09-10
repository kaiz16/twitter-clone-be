const Tweet = require("../models/Tweet.js");
const Follow = require("../models/Follow.js");

async function getFeeds(req, res) {
  try {
    const limit = parseInt(req.query.limit) || 10;
    const offset = parseInt(req.query.offset) || 0;
    const sortBy = req.query.sortBy || "created_at";
    const sortOrder = req.query.sortOrder || "DESC";

    // Get all following ids.
    const following = await Follow.findAll({
      where: {
        followerId: req.user.id,
      },
    });
    const followingIds = following.map((follow) => follow.followingId);

    // Find all tweets under user's follow list with limit, offset, sortBy, and sortOrder.
    const tweets = await Tweet.findAll({
      limit: limit,
      offset: offset,
      order: [[sortBy, sortOrder]],
      where: {
        createdBy: followingIds,
      },
    });

    // Send all tweets as response.
    res.json(tweets);
  } catch (error) {
    // If there is any error, send error as response.
    res.status(500).json({ error: error });
  }
}

module.exports = {
  getFeeds,
};
