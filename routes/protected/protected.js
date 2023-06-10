const express = require("express");
const checkAuth = require("./middleware").checkAuth;

router = express.Router()

router.get("/", checkAuth, (req, res) => {
    res.render("secure", { username: res.locals.user.username });
})

router.get("/cody-cream", checkAuth, (req, res) => {
    res.render("cody-cream");
})

module.exports = router;