const { model } = require("mongoose");
const Usermodel = require("../models/user");

////register/////////////
async function Register_new_user(user_data) {
  let newUser = await Usermodel.create(user_data);
  return newUser;
}

async function getAllClient() {
  let users = await Usermodel.find();
  return users;
}

async function Login(email) {
  let user = await Usermodel.findOne({ Email: email });
  return user;
}
async function get_By_Role(Role) {
  let user = await Usermodel.findOne({ role: Role });
  return user;
}

async function getUserByID(id) {
  let user = await Usermodel.findOne({ _id: id });
  return user;
}

async function update_user_data(id, userdata) {
  let userupdated = await Usermodel.updateOne({ _id: id }, userdata);
  return userupdated;
}
async function deleteuser(id) {
  let deleteuser = await Usermodel.deleteOne({ _id: id });
  return deleteuser;
}

module.exports = {
  Register_new_user,
  getAllClient,
  Login,
  getUserByID,
  update_user_data,
  deleteuser,
  get_By_Role,
};
