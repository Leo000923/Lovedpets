const bcrypt = require("bcryptjs");

// 加密
const tools = {
    enbcrypt (password) {
        var salt = bcrypt.genSaltSync(10);
        var hash = bcrypt.hashSync(password, salt);
        return hash;
    }
};

module.exports = tools;