let CategoryModel = require("../models/category");

async function addCategory(categoryData) {
  let category = await CategoryModel.create(categoryData);
  try {
    if (category) {
      return category;
    } else {
      console.log("category not Add");
    }
  } catch (error) {
    console.log(err);
  }
}

async function getAllcategory() {
  let category = await CategoryModel.find();
  try {
    if (category) {
      return category;
    } else {
      console.log("category not found");
    }
  } catch (error) {
    console.log(err);
  }
}

async function getAllcategoryByid(id) {
  let category = await CategoryModel.find({ _id: id });
  try {
    if (category) {
      return category;
    } else {
      console.log("category not found");
    }
  } catch (error) {
    console.log(err);
  }
}

async function updatecategory(id, categoryData) {
  let category = await CategoryModel.updateOne({ _id: id }, categoryData);
  try {
    if (category) {
      return category;
    } else {
      console.log("category not found");
    }
  } catch (error) {
    console.log(err);
  }
}

async function deletecategory(id) {
  let category = await CategoryModel.deleteOne({ _id: id });
  try {
    if (category) {
      return category;
    } else {
      console.log("category not found");
    }
  } catch (error) {
    console.log(err);
  }
}

module.exports = {
  addCategory,
  getAllcategory,
  getAllcategoryByid,
  updatecategory,
  deletecategory,
};
