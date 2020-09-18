const { validationResult } = require("express-validator");
const User = require("../models/user");

exports.signup =   function (req, res) {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(422).json({
            err:errors.array()[0].msg
        })
    }
  const user = new User(req.body);
  user.save((err,user) => {
      if(err){
          return res.status(400).json({
              err:"Not saved"
          })
      }
      res.json({
          name:user.name,
          lastname:user.lastname,
          email:user.email
      });
  })
};
exports.signout =   function (req, res) {
    res.json({
        message:"yep you are outtttttttt"
    });
};