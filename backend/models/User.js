const mongoose = require("mongoose");
const { Schema } = mongoose;

const UserSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  latitude: {
    type: String,
    required: false,
  },
  longitude: {
    type: String,
    required: false,
  },
  isAdmin:{
    type:Boolean,
    required: true,
  },
  dept:{
    type:String,
    required: false,
  }
});
const User = mongoose.model("user", UserSchema);

module.exports = User;
