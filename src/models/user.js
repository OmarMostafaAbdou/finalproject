const mongoose = require("mongoose");

userschema = mongoose.Schema({
  fullName: {
    type: String,
    required: true,
    minLength: 7,
  },
  Email: {
    type: String,
    required: true,
    unique: true,
    // validate: {
    //   validator: function (val) {
    //     let pattern = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    //     return pattern.test(val);
    //   },
    //   message: "Please fill a valid email address",
    // },
  },
  imgURL: {
    type: String,
  },
  Password: {
    type: String,
    required: true,

    // validate: {
    //   validator: function (val) {
    //     let pattern =
    //       /^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[^\w\d\s:])([^\s]){8,16}$/;
    //     return pattern.test(val);
    //   },
    //   message: "Please fill a valid email address",
    // },
  },

  phone: {
    type: String,
    required: true,
    minLength: 11,
  },

  nationalId: {
    type: String,
    unique: true,
  },
  age: {
    type: Number,
    min: 8,
    max: 70,
  },
  gender: {
    type: String,
    enum: {
      values: ["male", "female"],
      message: "You entered not valid value",
    },
  },

  role: {
    type: String,
    enum: {
      values: ["vendor", "Admin", "student", "instructor"],
      message: "You entered not valid value",
    },
  },
  CourseID: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
    },
  ],
});

const user = mongoose.model("Users", userschema);

module.exports = user;
