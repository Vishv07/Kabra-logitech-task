const { validationResult } = require("express-validator");
const Product = require("../models/product");

exports.newProduct =   function (req, res) {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(422).json({
            err:errors.array()[0].msg
        })
    }
  const product = new Product(req.body);
  product.save((err,product) => {
      if(err){
          return res.status(400).json({
              err:"Not saved"
          })
      }
      res.json({
          productName:product.pname,
          image:product.image,
          description:product.description,
          quantity:product.quantity,
          price:product.price
      });
  })
};
exports.getAllProducts =   function (req, res) {

    Product.find().exec((err,products) => {
        if(err || !products){
            return res.status(400).json({
                err:"no products found"
            })
        }
        res.json(products);
    })
};

