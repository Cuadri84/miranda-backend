"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.postLogin = exports.getLogin = void 0;
const auth_1 = require("../middleware/auth");
const getLogin = function (req, res) {
    res.send("Login");
};
exports.getLogin = getLogin;
const postLogin = function (req, res) {
    if ((0, auth_1.isUserAuthenticated)(req.body) === true) {
        const token = (0, auth_1.generateAccessToken)(req.body);
        res.json(token);
    }
    else {
        return res.send(401).json({ message: "User invalid" });
    }
};
exports.postLogin = postLogin;
