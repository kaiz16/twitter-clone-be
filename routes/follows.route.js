const express = require("express");
const router = express.Router();
const followsController = require("../controllers/follows.controller.js");
const { verifyToken } = require("../middlewares/auth.middleware.js");

router.get(
  "/:userId/followers",
  verifyToken,
  followsController.getAllUserFollowers
);
router.get(
  "/:userId/followings",
  verifyToken,
  followsController.getAllUserFollowings
);
router.post("/:userId/follow", verifyToken, followsController.createUserFollow);
router.delete("/follow/:id", verifyToken, followsController.deleteUserFollow);

module.exports = router;
