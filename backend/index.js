const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
const PORT = 5000;

mongoose.connect("mongodb://localhost:27017/test");

const userSchema = new mongoose.Schema({
    email: String,
    password: String
});
const User = mongoose.model("User", userSchema);

// function userExists(email) {
//     let doesUserExist = true;
//     User.find({email: email})
//     .then((results) => {
//         if(results.length === 0) {
//             console.log("User does not exist");
//             doesUserExist = false;
//             return false;
//         } else {
//             console.log("User exists");
//             doesUserExist = true; 
//             return true;
//         }
//     })
//     .catch((err) => {
//         console.log(err);
//         return true;
//     }
//     );
//     console.log(doesUserExist);
//     return doesUserExist;
// }

async function userExists(email) {
    try {
        let results = await User.find({email: email});
        console.log(results);
        if (results.length === 0) {
            console.log("User does not exist");
            return false;
        } else {
            console.log("User exists");
            return true;
        }
    } catch (err) { 
        console.log(err);
        return false;
    }
}

app.use(cors());
app.use(express.json());

app.post("/register", async (req, res) => {
    const reqBody = req.body;

    const email = reqBody.email;
    const password = reqBody.password;
    const confirmPassword = reqBody.confirmPassword;
    const credentials = [email, password, confirmPassword];

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    let doesUserExists = await userExists(email);

    console.log(doesUserExists);

    if (credentials.includes("")) {
        res.send("Please fill in all fields");
    } else if (!emailRegex.test(email)) {
        res.send("Please enter a valid email");
    }
    else if (doesUserExists) {
        res.send("User already exists, try logging in");
    }
    else if (password.length < 8) {
        res.send("Password must be at least 8 characters");
    }
     else if (password !== confirmPassword) {
        res.send("Passwords do not match");
    } else {
        const newUser = new User({
            email: email,
            password: password
        });
        newUser.save();
        res.send("Success");
    }

}); 

app.post("/login", (req, res) => {
    let reqBody = req.body;

    const email = reqBody.email;
    const password = reqBody.password;
    const credentials = [email, password];

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;    
    let doesUserExists = userExists(email);
    
    if (credentials.includes("")) {
        res.send("Please fill in all fields");
    }else if (!emailRegex.test(email)) {
        res.send("Please enter a valid email");
    } else if (!userExists(email)) {
        res.send("User does not exist, try registering");
    } else {
        User.find({email: email})
        .then((results) => {
            if (results[0].password === password) {
                res.send("Success");
            } else {
                res.send("Incorrect password");
            }
        })
        .catch((err) => {
            console.log(err);
            res.send("Error");
        });
    }
});

app.get("/", (req, res) => {
    const data = {
        username: "test",
        age: 5
    };
    res.send(data);
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});