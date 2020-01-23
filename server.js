const express = require("express");
const mongoose = require("mongoose");
const config = require("config");
const path = require("path");
var cors = require("cors");

process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0"; //do this to bypass self signed certificate error when sending emails
const app = express();
app.use(cors());

const db = config.get("mongoURI");
app.use(express.json());

mongoose
  .connect(db, {
    useNewUrlParser: true,
    useCreateIndex: true
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch(err => console.log("Error in connecting to DB: " + err));

app.use("/api/users", require("./routes/api/users"));
app.use("/api/auth", require("./routes/api/auth"));

const port = process.env.PORT || 5000;
app.listen(port, () => console.log("Server running on port 3000"));
