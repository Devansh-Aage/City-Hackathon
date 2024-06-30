const mongoose = require("mongoose");
const { Schema } = mongoose;

const ComplaintSchema = new Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },
  title: {
    type: String,
    required: true,
  },
  desc: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    required: false,
    default: "Sent",
  },
  imgPath: {
    type: String,
    required: false,
  },
  dept: {
    type: String,
    required: true,
  },
  review:{
    type:String,
    required: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});
const Complaint = mongoose.model("complaint", ComplaintSchema);

module.exports = Complaint;
