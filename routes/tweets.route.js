const express = require("express");
const router = express.Router();
const tweetsController = require("../controllers/tweets.controller.js");
const { verifyToken } = require("../middlewares/auth.middleware.js");

router.get("/", verifyToken, tweetsController.getAllTweets);
router.get("/:id", verifyToken, tweetsController.getTweetById);
router.post("/", verifyToken, tweetsController.createTweet);
router.put("/:id", verifyToken, tweetsController.updateTweet);
router.delete("/:id", verifyToken, tweetsController.deleteTweet);

module.exports = router;
