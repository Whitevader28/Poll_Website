const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const {User, Poll} = require("./schema");

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

mongoose.connect("mongodb://localhost:27017/test");

async function userExists(email) {
    try {
        let results = await User.find({email: email});
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

app.post("/register", async (req, res) => {

    const reqBody = req.body;
    const email = reqBody.email;
    const password = reqBody.password;
    const confirmPassword = reqBody.confirmPassword;
    const credentials = [email, password, confirmPassword];

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    let doesUserExists = await userExists(email);

    if (credentials.includes("")) {
        res.status(202).send("Please fill in all fields");
    } else if (!emailRegex.test(email)) {
        res.status(202).send("Please enter a valid email");
    }
    else if (doesUserExists) {
        res.status(400).send("Looks like you already have an account, try logging in");
    }
    else if (password.length < 8) {
        res.status(202).send("Password must be at least 8 characters. Cmon, don't be lazy, or the balck hoodie guy will get your votes");
    }
     else if (password !== confirmPassword) {
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
            password: hashedPassword
        });
        newUser.save();
        res.status(200).send("Success! Whooraaay! Now go and login so you can vote");
    }

}); 

app.post("/login", async (req, res) => {
    let reqBody = req.body;

    const email = reqBody.email;
    const password = reqBody.password;
    const credentials = [email, password];

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;    
    let doesUserExists = await userExists(email);
    
    if (credentials.includes("")) {
        res.status(204).send("Please fill in all fields");
    }else if (!emailRegex.test(email)) {
        res.status(400).send("Please enter a valid email");
    } else if (!doesUserExists) {
        res.status(400).send("User does not exist, try registering");
    } else {
        User.find({email: email})
        .then(async (results) => {
            const passMatch = await bcrypt.compare(password, results[0].password);
            if (passMatch) {
                res.status(200).send("Success");
            } else {
                res.status(400).send("Incorrect password");
            }
        })
        .catch((err) => {
            console.log(err);
            res.send("Error");
        });
    }
});

app.post("/vote", async (req, res) => {
    let reqBody = req.body;
    let pollId = reqBody.pollId;
    let option = reqBody.option;

    Poll.find({_id: pollId})
    .then((results) => {
        let votes = results[0].votes;
        let options = results[0].options;
        let optionIndex = options.indexOf(option);
        votes[optionIndex] += 1;
        Poll.updateOne({_id: pollId}, {votes: votes})
        .then(() => {
            res.status(200).send("Success");
        })
        .catch((err) => {
            console.log(err);
            res.status(400).send("Error");
        });
    })
    .catch((err) => {
        console.log(err);
        res.status(400).send("Error");
    });
});

app.post("/create-poll", async (req, res) => {
    let reqBody = req.body;
    let author = reqBody.author;
    let question = reqBody.question;
    let options = reqBody.options;

    if (question === "") {
        res.status(204).send("Please fill in the question. Try maybe something like 'What is the meaning of C#?'");
    }
    else if(options.includes("")){
        res.status(204).send("This is rather dull. An option must not be empty");
    } 
    else if (options.length < 2) {
        res.status(204).send("Make them think about it. 2 options minimum");
    }
    else if (options.length > 10) {
        res.status(204).send("Whoa there! Put your options on a diet. 10 options max");
    }
    else {
        const newPoll = new Poll({
            author: author,
            question: question,
            options: options,
            votes: 0
        });
        newPoll.save();
        res.status(200).send("Success");
    }
});

app.get("/polls", async (req, res) => {
    let data = await Poll.find({});
    res.status(200).send(data);
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});