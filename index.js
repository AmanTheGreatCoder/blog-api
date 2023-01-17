const express = require("express");
const cors = require("cors");
const User = require("./models/UserModel");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const cookieSession = require("cookie-session");
const passport = require("passport");
const passportSetup = require("./passportSetup");
const authRoute = require("./routes/auth");
const app = express();
const secret = "aoisufwerludgukgadlrek";

const port = process.env.PORT || 8080;

app.use(
  cors({
    credentials: true,
    origin: "https://blog-app-ijxe.onrender.com",
  }),
  express.json(),
  cookieSession({
    name: "session",
    keys: ["auth"],
    maxAge: 3153600000,
  }),
  cookieParser(),
  passport.initialize(),
  passport.session()
);

app.use("/auth", authRoute);
const salt = bcrypt.genSaltSync(10);

mongoose.set("strictQuery", false);
mongoose.connect(
  "mongodb+srv://aman:qc4EJLHN0zdpcAZ8@cluster1.jn4q7ex.mongodb.net/?retryWrites=true&w=majority",
  (error) => {
    if (error) {
      console.log("Error In Connecting Database");
    } else {
      console.log("Database connected");
    }
  }
);

app.post("/register", async (req, res) => {
  const { username, password } = req.body;
  console.log("Username " + username);
  const userDoc = await User.create({
    username,
    password: bcrypt.hashSync(password, salt),
  });
  res.json(userDoc);
});

app.post("/login", async (req, res) => {
  const { username, password } = req.body;
  const userDoc = await User.findOne({ username });
  const auth = bcrypt.compareSync(password, userDoc.password);
  if (auth) {
    jwt.sign({ username, id: userDoc._id }, secret, {}, (err, token) => {
      if (err) throw err;
      res.cookie("token", token).json("Token Generated");
    });
  } else {
    res.status(403).json("wrong credentials");
  }
});

app.get("/", (req, res) => {
  res.json("hello");
});

app.listen(port, (err) => {
  if (err) {
    console.log("Error");
  } else {
    console.log("Server Started on " + port);
  }
});
