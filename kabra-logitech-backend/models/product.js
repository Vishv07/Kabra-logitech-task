var mongoose = require("mongoose");

var productSchema = new mongoose.Schema(
  {
    pname: {
      type: String,
      required: true,
      maxlength: 32,
      trim: true
    },
    image: {
      type: String,
    },
    description: {
      type: String,
    },
    quantity: {
        type: Number,
    },
    price: {
        type: Number,
    },
  },
  { timestamps: true }
);


module.exports = mongoose.model("Product", productSchema);
