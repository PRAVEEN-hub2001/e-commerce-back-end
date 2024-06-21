const database = require("mongoose");

const Discountschema = database.Schema({
  Discount_code: { type: String, required: true, unique: true },
  Discount_value: { type: Number, required: true },
  Active_Dates: {
    Start_Date: { type: String, required: true },
    End_Date: { type: String, required: true },
  },
  Times_Used: { type: Number, default: 0 },
  Discount_Status: { type: Boolean, required: true },
  Discount_Applies_Status: { type: Boolean, required: true },
  Discount_Applies: { type: Array, required: true },
});
const Discount = database.model("Discount", Discountschema);
module.exports = Discount;

database.model("test",database.Schema({
}))
