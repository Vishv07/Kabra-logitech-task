const { validationResult } = require("express-validator");
const Cart = require("../models/cart");
const { ObjectID } = require('mongodb');
exports.addTocart =   function (req, res) {
  const cart = new Cart({
    productID: new ObjectID(req.body.productID),
    count:req.body.count,
  });
  cart.save((err,cart) => {
      if(err){
          return res.status(200).json({
              err:"Not saved"
          })
      }
      res.json(cart);
  })
};

exports.getCart =   function (req, res) {

    Cart.find().populate("productID").exec((err,cart) => {
        if(err || !cart){
            return res.status(400).json({
                err:"no products found"
            })
        }
        res.json(cart);
    })
};
exports.updateCart =   function (req, res) {

    Cart.updateOne({'productID':ObjectID(req.body.productID)}
    ,{$set: {count : req.body.count}}, function(err, result){
        if(err){
            return res.json({
                msg:err
            })   
        }
          Cart.findOne({'productID':ObjectID(req.body.productID)}).then((data) =>{
            res.json(data)
        }).catch((err) =>{
            res.json(err);
        })
        
    console.log(result)
})};
