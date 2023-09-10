const jwt = require("jsonwebtoken");

function verifyToken(req, res, next) {
  // Get auth header value
  const token = req.headers["authorization"];

  try {
    // Check if token is undefined
    if (!token) {
      // This will go to the catch block
      throw "No token provided";
    }

    // Verify & decode token
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    // Set the user in the request object
    req.user = decoded;
    // If everything is good, then proceed to the next middleware (if any)
    return next();
  } catch (error) {
    // If there is any error, send error as response.
    res.status(500).json({ error: error });
  }
}

module.exports = {
  verifyToken,
};
