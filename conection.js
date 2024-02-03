const mongoose = require("mongoose");
const url = "mongodb://127.0.0.1:27017/Elearning";
const connect = async () => {
  await mongoose.connect(url);
  console.log("coonect database successfull");
};
module.exports = connect;
