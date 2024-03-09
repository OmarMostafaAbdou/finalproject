const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  CatImg: {
    type: String,
  },
  description: {
    type: String,
    required: true,
  },
  icon: {
    type: String,
  },
});

const Category = mongoose.model("Category", categorySchema);

module.exports = Category;
