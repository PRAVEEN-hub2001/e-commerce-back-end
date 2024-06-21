const database = require("mongoose");

const Orderschema = database.Schema({
  OrderId: { type: String, required: true, unique: true },
  OrderDate: { type: String, required: true },
  Products: { type: Array, required: true },
  Subtotal: { type: String, required: true },
  Discount: { type: String, required: true },
  Totalprice: { type: String, required: true },
  Address: {
    type: Object,
    required: true,
  },
  Paymentstatus: { type: String, required: true },
  Fulfillment: { type: Object, default: "Pending" },
  Discount_code: { type: String, default: null },
});
const Order = database.model("Order", Orderschema);
module.exports = Order;
