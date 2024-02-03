const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  imgURL: {
    type: String,
    default: "",
  },
  description: {
    type: String,
    required: true,
  },
  instructor: {
    type: Schema.Types.ObjectId,
    ref: "Users",
  },
  duration: {
    type: Number,
    required: true,
  },
  level: {
    type: String,
    enum: ["Beginner", "Intermediate", "Advanced"],
    required: true,
  },
  tags: [String],

  lessons: [{ type: Schema.Types.ObjectId, ref: "Lesson" }],

  quizzes: [{ type: Schema.Types.ObjectId, ref: "Quiz" }],

  categoryID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
});

const Course = mongoose.model("Course", courseSchema);

module.exports = Course;
