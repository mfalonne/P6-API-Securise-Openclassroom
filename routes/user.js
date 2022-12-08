//on importe express
const express = require("express");

// creation de router
const router = express.Router();

// on importe le controllers pour associé nos fonction aus differentes routes
const userCtrl = require("../controllers/user");

/*const passwordCheck = require("../middleware/password");*/

/* route for login and signup : user.*/
router.post("/signup",userCtrl.signup);
router.post("/login", userCtrl.login);

// on exporte le routeur pour pouvoir l'importer dans app.js
module.exports = router;