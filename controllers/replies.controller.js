const Reply = require("../models/Reply.js");

async function getAllTweetReplies(req, res) {
  try {
    const limit = parseInt(req.query.limit) || 10;
    const offset = parseInt(req.query.offset) || 0;
    const sortBy = req.query.sortBy || "created_at";
    const sortOrder = req.query.sortOrder || "DESC";

    // Find all replies with limit, offset, sortBy, and sortOrder by tweet id.
    const replies = await Reply.findAll({
      limit: limit,
      offset: offset,
      order: [[sortBy, sortOrder]],
      where: {
        tweetId: parseInt(req.params.tweetId),
      },
    });

    // Send all replies as response.
    res.json(replies);
  } catch (error) {
    // If there is any error, send error as response.
    res.status(500).json({ error: error });
  }
}

async function createTweetReply(req, res) {
  try {
    // Verify the owner of the reply.
    if (req.body.createdBy !== req.user.id) {
      throw "You are not authorized to create reply for other users";
    }

    // Create reply using data from request body.
    // Request body must contain all required fields defined in Reply model.
    const reply = await Reply.create({
      ...req.body,
      tweetId: parseInt(req.params.tweetId), // Set tweet id from request params.
    });

    // Send created reply as response.
    res.json(reply);
  } catch (error) {
    // If there is any error, send error as response.
    res.status(500).json({ error: error });
  }
}

async function updateTweetReply(req, res) {
  try {
    // First find reply by id.
    const existingReply = await Reply.findByPk(parseInt(req.params.id));
    if (!existingReply) throw "Reply not found";

    // Verify the owner of the reply.
    if (existingReply.createdBy !== req.user.id) {
      throw "You are not authorized to update reply for other users";
    }

    // Update reply using data from request body.
    // Request body must contain all required fields defined in Reply model.
    const reply = await Reply.update(
      {
        ...req.body,
        tweetId: parseInt(req.params.tweetId), // Set tweet id from request params.
      },
      {
        where: {
          id: parseInt(req.params.id),
        },
      }
    );

    // Send updated reply as response.
    res.json(reply);
  } catch (error) {
    // If there is any error, send error as response.
    res.status(500).json({ error: error });
  }
}

async function deleteTweetReply(req, res) {
  try {
    // First find reply by id.
    const existingReply = await Reply.findByPk(parseInt(req.params.id));
    if (!existingReply) throw "Reply not found";

    // Verify the owner of the reply.
    if (existingReply.createdBy !== req.user.id) {
      throw "You are not authorized to delete reply for other users";
    }

    // Delete reply by id.
    const reply = await Reply.destroy({
      where: {
        id: parseInt(req.params.id),
      },
    });

    // Send deleted reply as response.
    res.json(reply);
  } catch (error) {
    // If there is any error, send error as response.
    res.status(500).json({ error: error });
  }
}

module.exports = {
  getAllTweetReplies,
  createTweetReply,
  updateTweetReply,
  deleteTweetReply,
};
