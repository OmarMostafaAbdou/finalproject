const { model } = require("mongoose");
const Usermodel = require("../models/user");
const courseModel = require("../models/courses");

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
  console.log(userdata);
  let userupdated = await Usermodel.findOneAndUpdate({ _id: id }, userdata);
  return userupdated;
}
async function deleteuser(id) {
  let deleteuser = await Usermodel.deleteOne({ _id: id });
  return deleteuser;
}

async function addUserCourse(userID, courseId) {
  console.log(courseId);
  try {
    const user = await Usermodel.findById(userID);
    console.log(user);
    if (!user) {
      console.log("user Not found");
    } else {
      user.CourseID.push(courseId);
      await user.save();
      console.log("Course added to user successfully");
      return user.CourseID;
    }
  } catch (e) {
    console.error("Error adding course to user:", e);
  }
}
async function getUserCourse(userID) {
  try {
    let allCourses = [];
    let user = await Usermodel.findOne({ _id: userID }, "CourseID");
    if (user) {
      for (let courseID of user.CourseID) {
        let course = await courseModel.findOne({ _id: courseID }, "title");
        if (course) {
          allCourses.push(course.title);
        }
      }
      return allCourses;
    } else {
      console.log("User not found");
      return [];
    }
  } catch (e) {
    console.log(e);
  }
}

async function getAllUserByPage(page, limit) {
  const total = await Usermodel.countDocuments();
  console.log(total);
  let user = await Usermodel.find()
    .skip((page - 1) * limit)
    .limit(limit)
    .exec();
  return { total: total, user: user };
}

module.exports = {
  Register_new_user,
  getAllClient,
  Login,
  getUserByID,
  update_user_data,
  deleteuser,
  get_By_Role,
  addUserCourse,
  getAllUserByPage,
  getUserCourse,
};
