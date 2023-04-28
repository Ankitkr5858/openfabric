const express = require("express");
let router = express.Router();
const authMiddleware = require("../middleware/auth");
const Product = require("../models/product");
var bodyParser = require("body-parser");
var jsonParser = bodyParser.json();
router.get("/", async (req, res) => {
  var auth = authMiddleware(req.headers.authorization);
  if (auth == undefined) {
    res.status(400).json({
      status: false,
      message: "Unauthorized User",
    });
  }
  var items = await Product.find();
  res.json(items);
});
router.get("/:id", async (req, res) => {
  var auth = authMiddleware(req.headers.authorization);
  if (auth == undefined) {
    res.status(400).json({
      status: false,
      message: "Unauthorized User",
    });
  }
  try {
    if (req.params.id != undefined) {
      var items = await Product.findById(req.params.id);
    } else {
    }
  } catch (ex) {
    return res.status(400).json({ error: "Product not found" });
  }
  res.json(items);
});
router.post("/", jsonParser, async (req, res) => {
  var auth = authMiddleware(req.headers.authorization);
  if (auth == undefined) {
    res.status(400).json({
      status: false,
      message: "Unauthorized User",
    });
  }
  if (req.body.name == undefined) {
    res.status(400).json({
      status: false,
      message: "Name is required",
    });
  }
  if (req.body.noOfItems == undefined) {
    res.status(400).json({
      status: false,
      message: "Items are required",
    });
  }
  if (req.body.description == undefined) {
    res.status(400).json({
      status: false,
      message: "Description is required",
    });
  }
  const product = new Product({
    name: req.body.name,
    noOfItems: req.body.noOfItems,
    description: req.body.description,
  });
  var newProduct = await product.save();
  console.log(newProduct);
  res.json(newProduct);
});
router.put("/", jsonParser, async (req, res) => {
  var auth = authMiddleware(req.headers.authorization);
  if (auth == undefined) {
    res.status(400).json({
      status: false,
      message: "Unauthorized User",
    });
  }

  if (req.body.name == undefined) {
    res.status(400).json({
      status: false,
      message: "Name is required",
    });
  }
  if (req.body.noOfItems == undefined) {
    res.status(400).json({
      status: false,
      message: "Items are required",
    });
  }
  if (req.body.description == undefined) {
    res.status(400).json({
      status: false,
      message: "Description is required",
    });
  }
  const product = await Product.findByIdAndUpdate(
    { _id: req.body._id },
    {
      name: req.body.name,
      noOfItems: req.body.noOfItems,
      description: req.body.description,
    }
  );

  res.json(product);
});

router.delete("/:id", async (req, res) => {
  var auth = authMiddleware(req.headers.authorization);
  if (auth == undefined) {
    res.status(400).json({
      status: false,
      message: "Unauthorized User",
    });
  }
  const product = await Product.deleteOne({ _id: req.params.id });
  console.log(product);
  res.json(product);
});

module.exports = router;
