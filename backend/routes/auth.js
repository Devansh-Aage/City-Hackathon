require("dotenv").config();
const express = require("express");
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const { body, validationResult } = require("express-validator");
var jwt = require("jsonwebtoken");
const fetchuser = require("../middleware/fetchuser");
const router = express.Router();

//Route 1
router.post(
  "/createuser",
  [
    //Validating User Details
    body("email", "Enter a valid e-mail").isEmail(),
    body("name", "Username: minimum 3 characters").isLength({ min: 3 }),
    body("password", "Password: minimum 6 characters").isLength({ min: 6 }),
  ],
  async (req, res) => {
    let success = false;
    //If there are errors , return bad requests and also errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success, errors: errors.array() });
    }
    //Check if the email already exists
    try {
      let user = await User.findOne({ email: req.body.email });
      if (user) {
        return res.status(400).json({ error: "This email is already in use" });
      }
      const salt = await bcrypt.genSalt(10);

      secPass = await bcrypt.hash(req.body.password, salt);
      //Create User
      user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: secPass,
        latitude: req.body.latitude,
        longitude: req.body.longitude,
        isAdmin: false,
      });
      const data = {
        user: {
          id: user.id,
        },
      };
      const authToken = jwt.sign(data, process.env.JWT_SECRET);
      success = true;
      // res.json(user)
      res.json({ success, authToken: authToken });
    } catch (error) {
      //Display Errors
      console.error(error.message);
      res.status(500).send("Unexpected error occurred ");
    }
  }
);

//Route 2
router.post(
  "/createadmin",
  [
    // Validate User Details
    body("email", "Enter a valid email").isEmail(),
    body("name", "Username must be at least 3 characters long").isLength({
      min: 3,
    }),
    body("password", "Password must be at least 6 characters long").isLength({
      min: 6,
    }),
  ],
  async (req, res) => {
    let success = false;

    // If there are validation errors, return bad request with errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success, errors: errors.array() });
    }

    const { name, email, password, dept } = req.body;

    try {
      // Check if the email already exists
      let user = await User.findOne({ email });
      if (user) {
        return res
          .status(400)
          .json({ success, error: "This email is already in use" });
      }

      // Hash the password
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      // Create admin user
      user = new User({
        name,
        email,
        password: hashedPassword,
        isAdmin: true,
        dept: dept || "", // Set department if provided, otherwise empty string
      });

      await user.save();

      const payload = {
        user: {
          id: user.id,
        },
      };

      // Generate JWT token
      const authToken = jwt.sign(payload, process.env.JWT_SECRET);

      success = true;
      res.json({ success, authToken });
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Unexpected error occurred");
    }
  }
);

//Route 2
//Authenticate a user
router.post(
  "/loginuser",
  [
    //Validating User Details
    body("email", "Enter a valid e-mail").isEmail(),
    body("password", "Password cannot be empty").exists(),
  ],
  async (req, res) => {
    let success = false;
    //If there are errors , return bad requests and also errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { email, password } = req.body;
    try {
      let user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({ success, error: "Wrong Credentials" });
      }

      const passCompare = await bcrypt.compare(password, user.password);
      if (!passCompare) {
        success = false;
        return res.status(400).json({ success, error: "Wrong Credentials" });
      }
      const data = {
        user: {
          id: user.id,
        },
      };
      const authtoken = jwt.sign(data, process.env.JWT_SECRET);
      success = true;
      res.json({ success, authtoken });
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Unexpected error occurred ");
    }
  }
);

//Route 3
//Get Loggedin User credentials
router.get("/getuser", fetchuser, async (req, res) => {
  try {
    userId = req.user.id;
    const user = await User.findById(userId).select("-password");
    res.send(user);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Unexpected error occurred ");
  }
});

module.exports = router;
