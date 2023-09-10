const express = require("express");
const app = express();
const morgan = require("morgan");

// Load environment variables. See .env file for available variables.
// This should be done before loading variables from process.env
require("dotenv").config({
  path: `.env.${process.env.NODE_ENV}`,
});

/* 
Morgan configuration that logs the following:
- the request body
- the request params
- the request query
- the time of the request
- the user agent
*/
const morganConfig = morgan(function (tokens, req, res) {
  return [
    JSON.stringify(req.body),
    JSON.stringify(req.params),
    JSON.stringify(req.query),
    tokens.date(req, res, "iso"),
    req.headers["user-agent"],
  ].join(" ");
});

// Middlewares
app.use(express.json());
app.use(morganConfig);

const sequelize = require("./config/db.config.js");

const authRoutes = require("./routes/auth.route.js");
const usersRoutes = require("./routes/users.route.js");
const followsRoutes = require("./routes/follows.route.js");
const tweetsRoutes = require("./routes/tweets.route.js");
const likesRoutes = require("./routes/likes.route.js");
const repliesRoutes = require("./routes/replies.route.js");
const feedsRoutes = require("./routes/feeds.route.js");

// Define routes here
app.use("/auth", authRoutes);
app.use("/users", usersRoutes);
app.use("/users", followsRoutes);
app.use("/tweets", tweetsRoutes);
app.use("/tweets", likesRoutes);
app.use("/tweets", repliesRoutes);
app.use("/feeds", feedsRoutes);

// Health
app.get("/", (req, res) => {
  res.send("Ok: " + process.env.NODE_ENV);
});

// Start the server
const port = process.env.PORT || 8080;
app.listen(port, async () => {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
    console.log(`🚀 Server running on port ${port}`);
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
});
