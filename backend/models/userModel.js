const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "please add a name , it is required!"],
    },
    email: {
      type: String,
      required: [true, "please add an email , it is required!"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "please add a password , it is required!"],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", userSchema);
