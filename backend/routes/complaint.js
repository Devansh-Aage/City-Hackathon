require("dotenv").config();
const express = require("express");
const Complaint = require("../models/Complaint");
const bcrypt = require("bcryptjs");
const { body, validationResult } = require("express-validator");
var jwt = require("jsonwebtoken");
const fetchuser = require("../middleware/fetchuser");
const router = express.Router();

router.post("/addcomplaints", fetchuser, async (req, res) => {
  try {
    const { title, desc, dept, imgPath } = req.body;
    //If there are errors , return bad requests and also errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    if (req.body.dept === "road") {
      const complaint = new Complaint({
        title,
        desc,
        imgPath,
        dept,
        user: req.user.id,
      });
      const savedComplaint = await complaint.save();
      res.json(savedComplaint);
    } else {
      const complaint = new Complaint({
        title,
        desc,
        dept,
        user: req.user.id,
      });
      const savedComplaint = await complaint.save();
      res.json(savedComplaint);
    }
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Unexpected error occurred ");
  }
});

router.put("/reviewcomplaint/:id", async (req, res) => {
  try {
    const { review } = req.body;

    const newComplaint = {};
    if (review) {
      newComplaint.review = review;
      newComplaint.status = "Reviewed";
    }

    //If there are errors , return bad requests and also errors
    let complaint = await Complaint.findById(req.params.id);
    if (!complaint) res.status(404).send("Not Found");

    complaint = await Complaint.findByIdAndUpdate(
      req.params.id,
      { $set: newComplaint },
      { new: true }
    );
    res.json({ complaint });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Unexpected error occurred ");
  }
});

module.exports = router;
