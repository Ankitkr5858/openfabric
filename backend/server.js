require("dotenv").config();
const express = require("express");
const user = require("./routes/user");
const product = require("./routes/product");

const mongoose = require("mongoose");

mongoose.connect(process.env.Database_Connection);
const db = mongoose.connection;
db.on("error", (error) => console.error(error));
db.once("open", () => console.log("Database connected"));

const app = express();
var cors = require("cors");
app.use(cors());

app.use("/", product);
app.use("/user", user);
app.listen(3000, () => console.log("server started"));
