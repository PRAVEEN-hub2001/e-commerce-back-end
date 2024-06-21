const database = require("mongoose");
const jwt = require("jsonwebtoken");

const Loginschema = database.Schema({
  Name: { type: String, required: true },
  EmailId: {
    type: String,
    required: true,
    unique: true,
  },
  Password: { type: String, required: true },
  Role: { type: Boolean, default: false },
  Cart:[],
  Orders: [],
});
Loginschema.methods.getJwtToken = function () {
  const token = jwt.sign({ userId: this._id }, process.env.JWT_SECRET);
  return token;
};
const Login = database.model("UserLogin", Loginschema);
module.exports = Login;
