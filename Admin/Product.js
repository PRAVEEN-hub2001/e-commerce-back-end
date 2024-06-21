const database = require("mongoose");
const Productschema = new database.Schema({
  SUK: { type: String, required: true, unique: true },
  Brand_Name: { type: String, required: true },
  Collection: { type: String },
  Category: { type: String },
  Product_name: { type: String, required: true },
  Current_Price: { type: Number, required: true },
  Offer_Price: { type: Number, default: 0 },
  Available_product: { type: Number, required: true },
  Description: { type: String, required: true },
  Composition_Washing: {
    type: String,
    default:
      "Jersey fabric: 100% cotton; woven fabric: 100% polyester, exclusive of embroideries. Wash by hand in water. Do not bleach. Iron at max. 110 °C using a damp cloth between the iron and the fabric. Do not dry clean. Do not tumble dry. Flat drying in the shade.",
  },
  Image: { type: String, required: true },
  BestSeller: { type: Boolean, required: true },
  Offers: { type: Boolean, default: false },
  Status: { type: Boolean, required: true },
});
const Product = new database.model("Product", Productschema);
module.exports = Product;
