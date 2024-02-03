const QuizeModel = require("../models/quizes");
const { ubdateCourse } = require("./courseControllers");

async function createQuize(QuizesData) {
  let quizes = await QuizeModel.create(QuizesData);

  try {
    if (quizes) {
      return quizes;
    } else {
      console.log("quizes not add");
    }
  } catch (error) {
    console.log(error);
  }
}

async function getAllQuiz() {
  let quizes = await QuizeModel.find();

  try {
    if (quizes) {
      return quizes;
    } else {
      console.log("quizes not found");
    }
  } catch (error) {
    console.log(error);
  }
}

async function getQuizById(id) {
  let quizes = await QuizeModel.find({ _id: id });

  try {
    if (quizes) {
      return quizes;
    } else {
      console.log("quizes not found");
    }
  } catch (error) {
    console.log(error);
  }
}

async function getAllCourseQuiz(course_ID) {
  let quizes = await QuizeModel.find({ courseID: course_ID });

  try {
    if (quizes) {
      return quizes;
    } else {
      console.log("quizes not found");
    }
  } catch (error) {
    console.log(error);
  }
}

async function UpdateQuiz(id, QuizesData) {
  let quizes = await QuizeModel.updateOne({ _id: id }, QuizesData);

  try {
    if (quizes) {
      return quizes;
    } else {
      console.log("quizes not found");
    }
  } catch (error) {
    console.log(error);
  }
}

async function DeleteQuiz(id) {
  let quizes = await QuizeModel.deleteOne({ _id: id });
  return quizes;
}

module.exports = {
  createQuize,
  getAllCourseQuiz,
  getAllQuiz,
  getQuizById,
  DeleteQuiz,
  UpdateQuiz,
};
