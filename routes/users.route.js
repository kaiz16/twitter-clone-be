const express = require("express");
const router = express.Router();
const usersController = require("../controllers/users.controller.js");
const { verifyToken } = require("../middlewares/auth.middleware.js");

router.get("/", verifyToken, usersController.getAllUsers);
router.get("/:id", verifyToken, usersController.getUserById);
router.get("/:id/tweets", verifyToken, usersController.getUserTweets);
router.put("/:id", verifyToken, usersController.updateUser);
router.delete("/:id", verifyToken, usersController.deleteUser);

module.exports = router;
