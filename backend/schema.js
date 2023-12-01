const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  email: String,
  password: String,
});
const User = mongoose.model("User", UserSchema);

const PollSchema = new mongoose.Schema({
  owner: String,
  question: String,
  options: [{ text: String, votes: Array }],
});
const Poll = mongoose.model("Poll", PollSchema);

module.exports = { User, Poll };
