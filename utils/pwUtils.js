const bcrypt = require("bcrypt");
const SALT_ROUNDS = 12;

function genPass(password) {
    return new Promise((resolve, reject) => {
        bcrypt.hash(password, SALT_ROUNDS, (err, hash) => {
            if (err) {
                reject(err);
            } else {
                resolve(hash);
            }
        })
    })
}

async function validate(password, hash) {
    return new Promise((resolve, reject) => {
        bcrypt.compare(password, hash, (err, result) => {
            if (err) { reject (err)}
            resolve(result);
        })
    })
}

module.exports.genPass = genPass;
module.exports.validate = validate;