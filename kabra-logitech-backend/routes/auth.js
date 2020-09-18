var express = require('express');
const { check } = require('express-validator');
var router = express.Router();
const {signout, signup} = require("../controllers/auth.js")




router.post('/signup',[
    check("name","Plese enter a valid name").isLength({min:3})
],signup)
router.get('/signout',signout)


module.exports = router;