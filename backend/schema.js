const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    email: String,
    password: String
});
const User = mongoose.model("User", UserSchema);

const PollSchema = new mongoose.Schema({
    author: String,
    question: String,
    options: Array,
    votes: Array
});
const Poll = mongoose.model("Poll", PollSchema);


module.exports = { User, Poll };