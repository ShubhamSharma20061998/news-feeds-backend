const { Schema, model } = require("mongoose");

const categorySchema = new Schema(
  {
    title: String,
    url: String,
  },
  { timestamps: true }
);

const Category = model("Category", categorySchema);

module.exports = Category;
