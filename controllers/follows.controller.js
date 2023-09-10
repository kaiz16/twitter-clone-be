const Follow = require("../models/Follow.js");

async function getAllUserFollowers(req, res) {
  try {
    const limit = parseInt(req.query.limit) || 10;
    const offset = parseInt(req.query.offset) || 0;
    const sortBy = req.query.sortBy || "created_at";
    const sortOrder = req.query.sortOrder || "DESC";

    // Find all followers with limit, offset, sortBy, and sortOrder by following id.
    const followers = await Follow.findAll({
      limit: limit,
      offset: offset,
      order: [[sortBy, sortOrder]],
      where: {
        followingId: parseInt(req.params.userId),
      },
    });

    // Find all followers count by following id.
    const count = await Follow.count({
      where: {
        followingId: parseInt(req.params.userId),
      },
    });

    // Send all followers as response.
    res.json({
      count: count,
      followers: followers,
    });
  } catch (error) {
    // If there is any error, send error as response.
    res.status(500).json({ error: error });
  }
}

async function getAllUserFollowings(req, res) {
  try {
    const limit = parseInt(req.query.limit) || 10;
    const offset = parseInt(req.query.offset) || 0;
    const sortBy = req.query.sortBy || "created_at";
    const sortOrder = req.query.sortOrder || "DESC";

    // Find all followings with limit, offset, sortBy, and sortOrder by follower id.
    const followings = await Follow.findAll({
      limit: limit,
      offset: offset,
      order: [[sortBy, sortOrder]],
      where: {
        followerId: parseInt(req.params.userId),
      },
    });

    // Find all follwings count by following id.
    const count = await Follow.count({
      where: {
        followerId: parseInt(req.params.userId),
      },
    });

    // Send all followings as response.
    res.json({
      count: count,
      followings: followings,
    });
  } catch (error) {
    // If there is any error, send error as response.
    res.status(500).json({ error: error });
  }
}

async function createUserFollow(req, res) {
  try {
    // Verify the owner of the follow.
    if (parseInt(req.params.userId) !== req.user.id) {
      throw "You are not authorized to create follow for other users";
    }

    // WHO WOULD FOLLOW THEMSELVES?!
    if (parseInt(req.params.userId) === parseInt(req.body.followingId)) {
      throw "You cannot follow yourself! What are you? A narcissist?";
    }

    // Create follow using data from request body.
    // Request body must contain all required fields defined in Follow model.
    const follow = await Follow.create({
      ...req.body,
      followerId: parseInt(req.params.userId),
    });

    // Send created follow as response.
    res.json(follow);
  } catch (error) {
    // If there is any error, send error as response.
    res.status(500).json({ error: error });
  }
}

async function deleteUserFollow(req, res) {
  try {
    // First find follow by id.
    const existingFollow = await Follow.findByPk(parseInt(req.params.id));
    if (!existingFollow) throw "Follow not found";

    // Verify the owner of the follow.
    // (User can only delete their follower or following)
    if (
      existingFollow.followerId !== req.user.id &&
      existingFollow.followingId !== req.user.id
    ) {
      throw "You are not authorized to delete this follow";
    }

    // Delete follow by id.
    const follow = await Follow.destroy({
      where: {
        id: parseInt(req.params.id),
      },
    });

    // Send deleted follow as response.
    res.json(follow);
  } catch (error) {
    // If there is any error, send error as response.
    res.status(500).json({ error: error });
  }
}

module.exports = {
  getAllUserFollowers,
  getAllUserFollowings,
  createUserFollow,
  deleteUserFollow,
};
