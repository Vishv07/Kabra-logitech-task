var express = require('express');
const { check } = require('express-validator');
var router = express.Router();
const {newProduct,getAllProducts} = require("../controllers/productController.js")
const {addTocart, getCart , updateCart} = require("../controllers/cartController.js");
const { update } = require('../models/user.js');



router.post('/newProduct',[
    check("pname","Plese enter a valid name").isLength({min:3})
],newProduct);

router.get('/getProducts',getAllProducts);

//Cart Routes

router.post('/addTocart',addTocart);
router.get('/getCart',getCart);
router.put('/updateCart',updateCart)

module.exports = router;