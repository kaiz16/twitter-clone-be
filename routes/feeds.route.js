const express = require("express");
const router = express.Router();
const feedsController = require("../controllers/feeds.controller.js");
const { verifyToken } = require("../middlewares/auth.middleware.js");

router.get("/", verifyToken, feedsController.getFeeds);

module.exports = router;
