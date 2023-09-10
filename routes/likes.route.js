const express = require("express");
const router = express.Router();
const likesController = require("../controllers/likes.controller.js");
const { verifyToken } = require("../middlewares/auth.middleware.js");

router.get("/:tweetId/likes", verifyToken, likesController.getAllTweetLikes);
router.post("/:tweetId/likes", verifyToken, likesController.createTweetLike);
router.delete("/likes/:id", verifyToken, likesController.deleteTweetLike);

module.exports = router;
