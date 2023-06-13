const express = require("express");
const ejs = require("ejs");
const cookieParser = require('cookie-parser')
const path = require("path");

const ERROR_CODES = require("./public/error_codes").ERROR_CODES;

const unprotected = require("./routes/unprotected/unprotected.js");
const protected = require("./routes/protected/protected.js");

require("dotenv").config();

const app = express()
const PORT = 5000;

app.use(express.json());
app.use(cookieParser())
app.use(express.urlencoded({ extended: true }));
app.use("/", express.static(path.join(__dirname, 'public')));

app.set("view engine", "ejs");

app.use(unprotected);
app.use("/secure", protected);

app.use((req, res) => {
    res.render("errorPage", { errorCode: "404 Not Found", msg: ERROR_CODES["404 Not Found"]})
});

app.listen(PORT, () => {
    console.log(`Server has started on Port ${PORT}`)
})