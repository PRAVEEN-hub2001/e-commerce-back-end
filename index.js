const express = require("express");
const server = express();
const router = express.Router().route();
const cors = require("cors");
server.use(express.json());
server.use(cors());
const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });
const cookieParser = require("cookie-parser");
// const jwt = require("jsonwebtoken");
router.use(cookieParser());

const Login = require("./Users/login");
const Order = require("./Admin/Orders");
const Product = require("./Admin/Product");
const Discount = require("./Admin/Discount");
const database = require("mongoose");

database
  .connect(process.env.DB_URL.replace("<PASSWORD>", process.env.DB_PASSWORD))
  .then(() => {
    console.log("DATABASE CONNECTED");
  })
  .catch((err) => {
    console.log(err);
  });

router.route("/user").post(async (req, res) => {
  const data = await Login.findById(req.body.id);
  res.json(data);
});
router.route("/login").post(async (req, res) => {
  try {
    const data = await Login.findOne(req.body);
    const email = await Login.findOne({ EmailId: req.body.EmailId });
    if (data != null) {
      const token = data.getJwtToken();
      res.cookie("token", token);
      res.json({
        statusCode: 200,
        token: token,
        message: "Login Successfully !",
      });
    } else {
      if (email != null) {
        res.json({
          statusCode: 201,
          message: "Password incorrect !",
        });
      } else {
        res.json({
          statusCode: 404,
          message: "User Not Found !",
        });
      }
    }
  } catch (err) {
    res.json({
      statusCode: 404,
      message: "Fetching Error",
    });
  }
});
router.route("/login").patch(async (req, res) => {
  const data = await Login.updateOne(
    { EmailId: req.body.EmailId },
    { $set: { Orders: req.body.update } }
  );
  res.json({
    statusCode: 200,
    data,
  });
});
router.route("/cart").patch(async (req, res) => {
  const data = await Login.updateOne(
    { EmailId: req.body.EmailId },
    { $set: { Cart: req.body.update } }
  );
  res.json({
    statusCode: 200,
    data,
  });
});

router.route("/signup").post(async (req, res) => {
  try {
    const create = await Login.create(req.body);
    if (create != null) {
      const token = create.getJwtToken();
      res.json({
        statusCode: 200,
        token: token,
        Message: "Account Created Successfully !",
      });
    }
  } catch (err) {
    if (err.code === 11000) {
      res.json({
        statusCode: 201,
        Message: "Already have an Account !",
      });
    } else {
      res.json({
        statusCode: 201,
        Message: "Network error",
      });
    }
  }
});

router.route("/allorder").get(async (req, res) => {
  const data = await Order.find(req.body);
  res.json(data);
});

router.route("/orderdetails").post(async (req, res) => {
  try {
    const find = await Order.findOne(req.body);
    res.json(find);
  } catch (err) {
    res.json(err);
  }
});

router.route("/orderedit").post(async (req, res) => {
  try {
    const data = await Order.updateOne(
      {
        OrderId: req.body.OrderId,
      },
      { $set: req.body.update }
    );
    res.json(data);
  } catch (err) {
    res.json(err);
  }
});

router.route("/ordercreate").post(async (req, res) => {
  try {
    const ordercreate = await Order.create(req.body);
    res.json({
      statusCode: 200,
      statusMessage: "Order Placed !",
    });
  } catch (err) {
    res.json({
      statusCode: err.code,
      statusMessage: "Order Not Placed !",
    });
  }
});

router.route("/product").get(async (req, res) => {
  try {
    const data = await Product.find(req.body);
    res.json(data);
  } catch (err) {
    res.json(err);
  }
});

router.route("/productcreate").post(async (req, res) => {
  try {
    const data = await Product.create(req.body);
    res.json({ status: 200, message: "Created Successfully !" });
  } catch (err) {
    if (err.errors !== undefined) {
      res.json({ status: 201, message: "Please Fill All Fields !" });
    } else {
      res.json({ status: 404, message: "Creation Failed !" });
    }
  }
});
router.route("/productedit").post(async (req, res) => {
  try {
    const data = await Product.findOne(req.body);
    res.json(data);
  } catch (err) {
    res.json(err);
  }
});

router.route("/productupdate").post(async (req, res) => {
  try {
    const data = await Product.updateOne(
      {
        SUK: req.body.SUK,
      },
      { $set: req.body.update }
    );
    res.json(data);
  } catch (err) {
    res.json(err);
  }
});

router.route("/productdelete").post(async (req, res) => {
  try {
    const data = await Product.deleteOne(req.body);
    res.json(data);
  } catch (err) {
    res.json(err);
  }
});

router.route("/discountcreate").post(async (req, res) => {
  try {
    const data = await Discount.create(req.body);
    res.json({ status: 200, message: "Created Successfully !" });
  } catch (err) {
    if (err.errors !== undefined) {
      res.json({ status: 201, message: "Please Fill All Fields !" });
    } else {
      res.json({ status: 404, message: "Creation Failed !" });
    }
  }
});
router.route("/discountupdate").post(async (req, res) => {
  try {
    const data = await Discount.updateOne(
      {
        Discount_code: req.body.discount_code,
      },
      { $set: req.body.update }
    );
    res.json(data);
  } catch (err) {
    res.json(err);
  }
});
router.route("/discountget").post(async (req, res) => {
  try {
    const data = await Discount.findOne(req.body);
    res.json(data);
  } catch (err) {
    res.json(err);
  }
});
router.route("/discountdelete").post(async (req, res) => {
  try {
    const data = await Discount.deleteOne(req.body);
    res.json(data);
  } catch (err) {
    res.json(err);
  }
});
router.route("/discountget").get(async (req, res) => {
  try {
    const data = await Discount.find(req.body);
    res.json(data);
  } catch (err) {
    res.json(err);
  }
});
server.use(router);

server.listen(process.env.PORT || 8080, "127.0.0.1", () => {
  console.log("Server Is Running on 8080");
});