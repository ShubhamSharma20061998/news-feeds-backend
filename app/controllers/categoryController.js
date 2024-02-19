const { validationResult } = require("express-validator");
const _ = require("lodash");
const Category = require("../models/categoryModel");

const categoryCtrl = {};

categoryCtrl.create = async (req, res) => {
  // check if the request body has error
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  // sanitization of request body
  const body = _.pick(req.body, ["title", "url"]);
  try {
    // looking for exsisting category
    const category = await Category.findOne({ title: body.title });
    if (category) {
      return res
        .status(409)
        .json({ errors: [{ msg: "Category already present" }] });
    } else {
      const newEntry = new Category(body);
      const result = await newEntry.save();
      res.json(result);
    }
  } catch (error) {
    res.status(500).json(errors);
  }
};

// listing all categories
categoryCtrl.listAll = async (req, res) => {
  try {
    const result = await Category.find();
    res.json(result);
  } catch (error) {
    res.status(500).json(error);
  }
};

// update a category
categoryCtrl.update = async (req, res) => {
  const { id } = req.params;
  const body = _.pick(req.body, ["title", "url"]);
  try {
    const result = await Category.findOneAndUpdate({ _id: id }, body, {
      new: true,
    });
    res.json(result);
  } catch (error) {
    res.status(500).json(error);
  }
};

// delete a category
categoryCtrl.remove = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await Category.findOneAndDelete({ _id: id });
    if (result == null) {
      return res.status(404).json({ errors: [{ msg: "Record not found." }] });
    }
    res.json(result);
  } catch (error) {
    res.status(500).json(error);
  }
};

module.exports = categoryCtrl;
