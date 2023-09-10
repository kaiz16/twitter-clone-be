const Tweet = require("../models/Tweet.js");
const User = require("../models/User.js");
const { hashPassword } = require("../utils/bcrypt.util.js");

async function getAllUsers(req, res) {
  try {
    const limit = parseInt(req.query.limit) || 10;
    const offset = parseInt(req.query.offset) || 0;
    const sortBy = req.query.sortBy || "created_at";
    const sortOrder = req.query.sortOrder || "DESC";

    // Find all users with limit, offset, sortBy, and sortOrder.
    const users = await User.findAll({
      limit: limit,
      offset: offset,
      order: [[sortBy, sortOrder]],
    });

    // Send all users as response.
    res.json(users);
  } catch (error) {
    // If there is any error, send error as response.
    res.status(500).json({ error: error });
  }
}

async function getUserById(req, res) {
  try {
    // Find user by id.
    const user = await User.findByPk(parseInt(req.params.id));

    // Send user as response.
    res.json(user);
  } catch (error) {
    // If there is any error, send error as response.
    res.status(500).json({ error: error });
  }
}

async function updateUser(req, res) {
  try {
    // First find user by id.
    const existingUser = await User.findByPk(parseInt(req.params.id));
    if (!existingUser) throw "User not found";

    // Verify the owner of the user.
    if (existingUser.id !== req.user.id) {
      throw "You can only update your own profile";
    }

    // Update user using data from request body.
    // Request body must contain all required fields defined in User model.
    const hashedPassword = hashPassword(req.body.password);
    const user = await User.update(
      {
        ...req.body,
        password: hashedPassword,
      },
      {
        where: {
          id: parseInt(req.params.id),
        },
      }
    );

    // Send updated user as response.
    res.json(user);
  } catch (error) {
    // If there is any error, send error as response.
    res.status(500).json({ error: error });
  }
}

async function deleteUser(req, res) {
  try {
    // First find user by id.
    const existingUser = await User.findByPk(parseInt(req.params.id));
    if (!existingUser) throw "User not found";

    // Verify the owner of the user.
    if (existingUser.id !== req.user.id) {
      throw "You can only delete your own profile";
    }

    // Delete user by id.
    // NOTE: Deleting a user will also delete all tweets, replies, likes and follows associated with the user.
    const user = await User.destroy({
      where: {
        id: parseInt(req.params.id),
      },
    });

    // Send deleted user as response.
    res.json(user);
  } catch (error) {
    // If there is any error, send error as response.
    res.status(500).json({ error: error });
  }
}

async function getUserTweets(req, res) {
  try {
    // Find all tweets created by the user.
    const tweets = await Tweet.findAll({
      where: {
        createdBy: parseInt(req.params.id),
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
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
  getUserTweets,
};
