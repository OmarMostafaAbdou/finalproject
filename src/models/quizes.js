const mongoose = require("mongoose");
let quizeSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  lessons: [{ type: mongoose.Schema.Types.ObjectId, ref: "Lesson" }],

  
  questions: [
    {
      questionText: { type: String, required: true },
      options: [{ type: String }],
      correctOption: { type: String },
    },
  ],

});





let Quizes = mongoose.model("Quiz", quizeSchema);
module.exports = Quizes;
