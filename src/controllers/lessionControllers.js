const LessonModel = require("../models/lessons");

async function CreateLession(LessonData) {
  let Lesson = await LessonModel.create(LessonData);

  try {
    if (Lesson) {
      return Lesson;
    } else {
      console.log("lession not add");
    }
  } catch (error) {
    console.log(error);
  }
}

async function get_All_Lessions() {
  let Lesson = await LessonModel.find();

  try {
    if (Lesson) {
      return Lesson;
    } else {
      console.log("lession not found");
    }
  } catch (error) {
    console.log(error);
  }
}
async function getCourselesson(course_ID) {
  let Lesson = await LessonModel.find({ courseID: course_ID });

  try {
    if (Lesson) {
      return Lesson;
    } else {
      console.log("lession not found");
    }
  } catch (error) {
    console.log(error);
  }
}

async function getlessonByid(id) {
  let Lesson = await LessonModel.find({ _id: id });

  try {
    if (Lesson) {
      return Lesson;
    } else {
      console.log("lession not found");
    }
  } catch (error) {
    console.log(error);
  }
}

async function updateLesson(id, LessonData) {
  let Lesson = await LessonModel.updateOne({ _id: id }, LessonData);

  try {
    if (Lesson) {
      return Lesson;
    } else {
      console.log("lession not Updated");
    }
  } catch (error) {
    console.log(error);
  }
}

async function Deletelesson(id) {
  let Lesson = await LessonModel.deleteOne({ _id: id });
  return Lesson;
}

module.exports = {
  CreateLession,
  getCourselesson,
  getlessonByid,
  get_All_Lessions,
  updateLesson,
  Deletelesson,
};

