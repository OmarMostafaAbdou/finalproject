const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  imgURL: {
    type: String,
  },
  description: {
    type: String,
    required: true,
  },
  instructor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Users",
  },
  duration: {
    type: Number,
    required: true,
  },

  level: {
    type: String,
    enum: ["Beginner", "Intermediate", "Advanced", "AllLevels"],
    required: true,
  },
  tags: [String],

  lessons: [{ type: mongoose.Schema.Types.ObjectId, ref: "Lesson" }],

  quizzes: [{ type: mongoose.Schema.Types.ObjectId, ref: "Quiz" }],

  categoryID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
  },
  created_at: {
    type: Date,
    default: Date.now,
  },

  comments: [
    {
      user: { type: mongoose.Schema.Types.ObjectId, ref: "Users" },
      text: { type: String },
      createdAt: { type: Date, default: Date.now },
    },
  ],
  rate: {
    type: Number,
  },
  price: {
    type: Number,
  },
  discount: {
    type: Number,
  },

  enrolledStudents: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Users",
    },
  ],
});

const Course = mongoose.model("Course", courseSchema);

module.exports = Course;
