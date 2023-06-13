const express = require("express");
const jwt = require("jsonwebtoken");
const { checkDuplicate } = require("./middleware");
const User = require("../../config/db").User;
const genPass = require("../../utils/pwUtils").genPass;
const validate = require("../../utils/pwUtils").validate;

router = express.Router();

router.get("/", (req, res) => {
    res.render("root");
})

router.get("/login", (req, res) => {
    res.render("login")
})

router.get("/register", (req, res) => {
    res.render("register")
})

router.post("/register", checkDuplicate, (req, res) => {

    const username = req.body.username.trim();
    const password = req.body.password.trim();
    const ip = req.headers['cf-connecting-ip'] || req.socket.remoteAddress;

    if (username == "" || password == "") {
        return res.redirect("/login");
    }

    genPass(req.body.password).then((hash) => {
        const newUser = new User({
            username: username,
            password: hash,
            ip: ip
        })

        newUser.save();
    }).catch(err => {
        console.log(err);
    })
    res.redirect("/login");
})


router.post("/authenticate", (req, res) => {
    let hash = null;
    const username = req.body.username.trim();
    const password = req.body.password.trim();

    if (username == "" || password == "") {
        return res.redirect("/login");
    }

    const result = User.findOne({username: username});

    result.then((user) => {
        if (user == null) {
            console.log("User not found.")
            return res.redirect("/login");
        }

        hash = user.password;
        // console.log(user);
        validate(password, hash).then((validBool) => {
        if (validBool) {
            const jwtObj = { username: user.username, id: user.id, exp: Math.floor(new Date().getTime() / 1000) + 300 };
            console.log(jwtObj);
            const jwtToken = jwt.sign(jwtObj, process.env.ACCESS_TOKEN);
            res.cookie("token", jwtToken, { httpOnly: true, secure: true, samesite: true, path: "/" });
            // only false when in dev env, once prod can change back to true as it will be https and hence cookie can be accessed by server
            // but when developing since no https, setting secure as true will interfere with development
            // sameSite???
            res.redirect("/secure");
        } else {
            console.log("Wrong password.")
            res.redirect("/");
        }
    })
    }).catch(err => {
        console.log(err);
        res.redirect("/");
    })
})

router.get("/logout", (req, res) => {
    res.clearCookie("token", { path: "/" });
    res.render("logout");
})

module.exports = router;