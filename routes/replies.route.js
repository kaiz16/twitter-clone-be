const express = require("express");
const router = express.Router();
const repliesController = require("../controllers/replies.controller.js");
const { verifyToken } = require("../middlewares/auth.middleware.js");

router.get(
  "/:tweetId/replies",
  verifyToken,
  repliesController.getAllTweetReplies
);
router.post(
  "/:tweetId/replies",
  verifyToken,
  repliesController.createTweetReply
);
router.put(
  "/:tweetId/replies/:id",
  verifyToken,
  repliesController.updateTweetReply
);
router.delete("/replies/:id", verifyToken, repliesController.deleteTweetReply);

module.exports = router;
