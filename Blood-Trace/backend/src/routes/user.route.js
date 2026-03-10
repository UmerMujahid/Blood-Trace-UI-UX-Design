const { registerUser, loginUser } = require("../controllers/user.controller");
const Router = require("express");
const router = new Router();

router.route('/register').post(registerUser);

router.route('/login').post(loginUser);

module.exports = router;