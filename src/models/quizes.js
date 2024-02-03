const mongoose = require("mongoose");
let quizeSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  questions: [
    {
      questionText: { type: String, required: true },
      options: [{ type: String }],
      correctOption: { type: Number },
    },
  ],

  courseID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Course",
  },
});

let Quizes = mongoose.model("Quiz", quizeSchema);
module.exports = Quizes;
