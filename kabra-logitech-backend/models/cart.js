var mongoose = require("mongoose");
var {ObjectId} = mongoose.Schema.Types;
var cartSchema = new mongoose.Schema(
  {

    productID:{
        type:ObjectId,
        ref:"Product",
        unique:true,
    },
    count:Number
  }
);


module.exports = mongoose.model("Cart", cartSchema);
