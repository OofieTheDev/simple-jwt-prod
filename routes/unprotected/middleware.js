const User = require("../../config/db").User;
const ERROR_CODES = require("../../public/error_codes").ERROR_CODES;

function checkDuplicate(req, res, next) {
    const username = req.body.username;

    const result = User.findOne({username: username});

    result.then((user) => {
        if (user == null) {
            return next();
        }

        if (user) {
            res.render("errorPage", {errorCode: "409 Conflict", msg: ERROR_CODES["409 Conflict"]});
        }
    })
}

module.exports.checkDuplicate = checkDuplicate;