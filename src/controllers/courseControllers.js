let CourseModel = require("../models/courses");
const Lesson = require("../models/lessons");
const Quizes = require("../models/quizes");
const user = require("../models/user");

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

async function getCourseTitles() {
  let courseTitles = await CourseModel.find({}, "title");
  const Titles = courseTitles.map((course) => course.title);
  // console.log(Titles);

  return courseTitles;
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
      return courses;
    } else {
      console.log("not found");
    }
  } catch (err) {
    console.log(err);
  }
}
async function createComment(courseID, user_id, text) {
  const course = await CourseModel.findById(courseID);

  if (course) {
    course.comments.push({
      user: user_id,
      text: text,
    });

    await course.save();

    console.log(course.comments);
    return course.comments;
  } else {
    console.log("course not found");
  }
}
async function getAllcomentForCourse(courseID) {
  const course = await CourseModel.findById(courseID);

  if (course) {
    return course.comments;
  } else {
    console.log("no comments");
  }
}

module.exports = {
  CreateCourse,
  getAllcourse,
  getCourseByid,
  ubdateCourse,
  deleteCourse,
  createComment,
  getAllcomentForCourse,
  getCourseTitles,
};
