const jwt = require("jsonwebtoken");
const ERROR_CODES = require("../../public/error_codes").ERROR_CODES;

function checkAuth(req, res, next) {
    const tokenToVerify = req.cookies.token;
    if (tokenToVerify === undefined || tokenToVerify === null) {
        // console.log("no token");
        return res.render("errorPage", { errorCode: "401 Unauthorized", msg: ERROR_CODES["401 Unauthorized"]})
    }
    jwt.verify(tokenToVerify, process.env.ACCESS_TOKEN, (err, user) => {
        if (err == null) { // handles both null and undefined
            // console.log(user)
            res.locals.user = user;
            return next(); // ffs no return itll go check for the error even though there is none
        }
        if (err.name === "TokenExpiredError") {
            // console.log("Token expired!");
            res.clearCookie("token", { path: "/" });
            return res.render("errorPage", { errorCode: "403 Forbidden", msg: ERROR_CODES["403 Forbidden"]})
        }
        if (err.name === "JsonWebTokenError" || err.name === "NotBeforeError") {
            return res.render("errorPage", { errorCode: "401 Unauthorized", msg: ERROR_CODES["401 Unauthorized"]})
        }

    })
}

module.exports.checkAuth = checkAuth;