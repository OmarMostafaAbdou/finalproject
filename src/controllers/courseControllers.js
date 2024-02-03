let CourseModel = require("../models/courses");
const Lesson = require("../models/lessons");
const Quizes = require("../models/quizes");
async function CreateCourse(CourseData) {
  try {
    let courses = await CourseModel.create(CourseData);
    if (courses) {
      return courses;
    } else {
      console.log("Course Add Error");
    }
  } catch (err) {
    console.log(err);
  }
}

async function getCourseByid(id) {
  let course = await CourseModel.findOne({ _id: id });
  try {
    if (course) {
      return course;
    } else {
      console.log("course Not found");
    }
  } catch (err) {
    console.log(err);
  }
}

async function deleteCourse(id) {
  let course = await CourseModel.deleteOne({ _id: id });
  return course;
}

async function ubdateCourse(id, CourseData) {
  let course = await CourseModel.updateOne({ _id: id }, CourseData);

  try {
    if (course) {
      return course;
    } else {
      console.log("update error");
    }
  } catch (err) {
    console.log(err);
  }
}

async function getAllcourse() {
  let courses = await CourseModel.find();
  try {
    if (courses) {
      console.log(courses);
    } else {
      console.log("not found");
    }
  } catch (err) {
    console.log(err);
  }
}

module.exports = {
  CreateCourse,
  getAllcourse,
  getCourseByid,
  ubdateCourse,
  deleteCourse,
};
