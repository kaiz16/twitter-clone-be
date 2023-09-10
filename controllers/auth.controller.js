const jwt = require("jsonwebtoken");
const User = require("../models/User.js");
const { hashPassword, comparePassword } = require("../utils/bcrypt.util.js");

async function me(req, res) {
  try {
    // Get user from database
    const user = await User.findOne({
      where: { email: req.user.email },
    });

    res.status(200).json({ user });
  } catch (error) {
    // If there is any error, send error as response.
    res.status(500).json({ error: error });
  }
}

async function register(req, res) {
  try {
    // Check if the user with the same email already exist
    const userExist = await User.findOne({
      where: {
        email: req.body.email,
      },
      // Include password field. By default, password field is excluded in every query. See User model.
      attributes: { include: "password" },
    });

    if (userExist) throw "User already exist.";

    // Create user using data from request body.
    // Request body must contain all required fields defined in User model.
    const hashedPassword = hashPassword(req.body.password);
    await User.create({
      ...req.body,
      password: hashedPassword,
    });

    // Get user from database
    const user = await User.findOne({
      where: { email: req.body.email },
    });

    // Generate JWT
    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.SECRET_KEY,
      {
        expiresIn: "2h",
        algorithm: "HS256",
      }
    );

    res.status(200).json({ user, accessToken: token });
  } catch (error) {
    // If there is any error, send error as response.
    res.status(500).json({ error: error });
  }
}

async function login(req, res) {
  try {
    // Get user input
    const { email, password } = req.body;

    // Validate user input
    if (!email && !password) {
      // This will go to the catch block
      throw "Email and password are required";
    }

    // Validate if user exist in our database
    const user = await User.findOne({
      where: { email },
      // Include password field. By default, password field is excluded in every query. See User model.
      attributes: { include: "password" },
    });

    if (!user) throw "User does not exist. Please register.";

    // If user exist then validate password
    const passwordMatch = comparePassword(password, user.password);

    if (!passwordMatch) {
      // This will go to the catch block
      throw "Invalid login credentials";
    }

    // Generate JWT
    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.SECRET_KEY,
      {
        expiresIn: "2h",
        algorithm: "HS256",
      }
    );

    // Remove password field from user object
    user.password = undefined;

    res.status(200).json({ user, accessToken: token });
  } catch (error) {
    // If there is any error, send error as response.
    res.status(500).json({ error: error });
  }
}

module.exports = {
  me,
  register,
  login,
};
