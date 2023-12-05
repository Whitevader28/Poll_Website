require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const { User, Poll } = require("./schema");

const secretKey = "";

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

mongoose.connect("mongodb://localhost:27017/test");

const emailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;

async function userExistsByEmail(email) {
  try {
    const results = await User.find({ email: email });
    if (results.length === 0) {
      return false;
    } else {
      return true;
    }
  } catch (err) {
    console.log(err);
    return false;
  }
}

async function userExistsById(id) {
  try {
    const results = await User.findById(id);
    if (results == null || results.length === 0) {
      return false;
    } else {
      return true;
    }
  } catch (err) {
    console.log(err);
    return false;
  }
}

async function getIdByEmail(email) {
  try {
    const results = await User.find({ email: email });
    if (results == null || results.length === 0) {
      return null;
    } else {
      return results[0]._id;
    }
  } catch (err) {
    console.log(err);
    return false;
  }
}

async function pollExistsById(id) {
  try {
    const results = await Poll.findById(id);
    if (results != null && results.length === 0) {
      return false;
    } else {
      return true;
    }
  } catch (err) {
    console.log(err);
    return false;
  }
}

async function pollExistsByQuestion(question, owner) {
  try {
    const results = await Poll.find({ question: question, owner: owner });
    if (results != null && results.length === 0) {
      return false;
    } else {
      return true;
    }
  } catch (err) {
    console.log(err);
    return false;
  }
}

async function userVoted(voter, pollId) {
  try {
    const results = await Poll.findById(pollId);
    const votes = results.options.map((option) => option.votes).flat(); // we flatten the array so we avoid to recursively check for the voter in each array of the array
    if (votes.includes(voter)) {
      return true;
    } else {
      return false;
    }
  } catch (err) {
    console.log(err);
    return false;
  }
}

function loggedUser(owner) {
  // check if user is logged in
  return true;
}

function authenticateToken(res, req, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (token == null)
    res.status(401).send("Please login to vote or delete or whatever you want");

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) return res.status(403).send("Invalid token");
    req.user = user;
    next();
  });
}

app.post("/register", async (req, res) => {
  try {
    const reqBody = req.body;
    const email = reqBody.email;
    const password = reqBody.password;
    const confirmPassword = reqBody.confirmPassword;
    const credentials = [email, password, confirmPassword];

    const doesUserExists = await userExistsByEmail(email);

    if (credentials.includes("")) {
      res.status(202).send("Please fill in all fields");
    } else if (!emailRegex.test(email)) {
      res.status(202).send("Please enter a valid email");
    } else if (doesUserExists) {
      res
        .status(400)
        .send(
          "Looks like you already have an account. We already know who you are so try logging in"
        );
    } else if (password.length < 8) {
      res
        .status(202)
        .send(
          "Password must be at least 8 characters. Cmon, don't be lazy, or the balck hoodie guy will get your votes"
        );
    } else if (password.length > 32) {
      res
        .status(202)
        .send(
          "Password must be less than 32 characters. This is not NSA, you know?"
        );
    } else if (password !== confirmPassword) {
      res.status(400).send("Passwords do not match. Check your caps lock key");
    } else {
      let hashedPassword;
      try {
        const salt = await bcrypt.genSalt();
        hashedPassword = await bcrypt.hash(password, salt);
      } catch (err) {
        console.log(err);
        res.status(400).send("Error hashing password");
      }
      const newUser = new User({
        email: email,
        password: hashedPassword,
      });
      newUser.save();
      res.status(200).send("Success! Whooraaay! Now go login so you can vote");
    }
  } catch (err) {
    console.log(err);
    res.status(500).send("Error");
  }
});

app.post("/login", async (req, res) => {
  try {
    const reqBody = req.body;
    const email = reqBody.email;
    const password = reqBody.password;
    const credentials = [email, password];

    const doesUserExists = await userExistsByEmail(email);

    if (credentials.includes("")) {
      res.status(400).send("Please fill in all fields");
    } else if (!emailRegex.test(email)) {
      res.status(400).send("Please enter a valid email");
    } else if (!doesUserExists) {
      res.status(400).send("User does not exist, try registering");
    } else {
      User.find({ email: email })
        .then(async (results) => {
          const passMatch = await bcrypt.compare(password, results[0].password);
          if (passMatch) {
            const user_id = results[0]._id.toString();
            const acessToken = jwt.sign(
              user_id,
              process.env.ACCESS_TOKEN_SECRET
            );
            res
              .status(200)
              // .send("Logged in successully. You are IN! Go vote")
              .json({ acessToken: acessToken, user_id: user_id });
          } else {
            res.status(400).send("Incorrect password");
          }
        })
        .catch((err) => {
          console.log(err);
          res.send("Error");
        });
    }
  } catch (err) {
    console.log(err);
    res.status().send("Error");
  }
});

app.get("/polls", async (req, res) => {
  try {
    const data = await Poll.find({});
    res.status(200).send(data);
  } catch (err) {
    console.log(err);
    res.status(500).send("Error");
  }
});

app.post("/polls", async (req, res) => {
  try {
    const reqBody = req.body;
    // TODO: identify owner by id, not email
    const owner = reqBody.owner;
    const question = reqBody.question;
    const options = reqBody.options;

    const id = await getIdByEmail(owner);
    console.log(id);

    if (!(await userExistsByEmail(owner)) || !loggedUser) {
      res
        .status(400)
        .send(
          "Who are you? Why do you have questions? Please login or register to ask questions"
        );
    } else if (question === "") {
      res
        .status(400)
        .send(
          "Please fill in the question. Try maybe something like 'What is the meaning of C#?'"
        );
    } else if (await pollExistsByQuestion(question, owner)) {
      res
        .status(400)
        .send("You already asked that question. Get some lecithin");
    } else if (options.includes("")) {
      res.status(400).send("This is rather dull. An option must not be empty");
    } else if (options.length < 3) {
      res.status(400).send("Make them think about it. 3 options minimum");
    } else if (options.length > 10) {
      res
        .status(400)
        .send("Whoa there! Put your options on a diet. 10 options max");
    } else {
      const optionsArray = [];
      for (let option of options) {
        optionsArray.push({ text: option, votes: [] });
      }
      const newPoll = new Poll({
        owner: owner,
        question: question,
        options: optionsArray,
      });
      newPoll.save();
      res.status(200).send("Poll created successfully. Now go vote");
    }
  } catch (err) {
    console.log(err);
    res.status(500).send("Error");
  }
});

app.delete("/polls/:id", authenticateToken, async (req, res) => {
  const reqBody = req.body;
  const owner = reqBody.owner;
  const pollId = req.params.id;

  const ownerId = await getIdByEmail(owner);

  if (!(await userExistsByEmail(owner)) || !loggedUser(owner)) {
    res
      .status(400)
      .send("Who are you? You cannot delete other people's opinions");
  } else if (!(await pollExistsById(pollId))) {
    res
      .status(400)
      .send("Poll does not exist. You want to delete the endless void?");
  } else {
    try {
      await Poll.findByIdAndDelete(pollId);
      res.status(200).send("Deleted Successfully");
    } catch (err) {
      console.log(err);
      res.status(500).send("Error");
    }
  }
});

app.patch("/polls/vote/:id", authenticateToken, async (req, res) => {
  try {
    const reqBody = req.body;
    const voter = reqBody.voter; // this is email
    const option = reqBody.option; // this is the number of the option, indexed from 0
    const pollId = req.params.id;

    if (!(await userExistsByEmail(voter)) || !loggedUser(voter)) {
      res.status(400).send("Who are you? You cannot vote without logging in");
    } else if (!(await pollExistsById(pollId))) {
      res.status(400).send("Poll does not exist. You want to vote the void?");
    } else if (await userVoted(voter, pollId)) {
      res
        .status(400)
        .send("You already voted. YOU ARE ALLOWED ONLY ONE OPINION");
    } else {
      const poll = await Poll.findById(pollId);

      if (option >= poll.options.length || option < 0) {
        res
          .status(400)
          .send(
            "Option does not exist. You want to vote the endless void? Try again"
          );
      } else {
        poll.options[option].votes.push(voter);
        res.status(200).send("Voted successfully. Congrats on your opinion!");
      }
    }
  } catch (err) {
    console.log(err);
    res.status(500).send("Error");
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
