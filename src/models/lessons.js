const mongoose = require("mongoose");
let lessionsSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  content: {
    video: {
      type: String,
    },
    document: {
      type: String,
    },
  },

  duration: {
    type: Number,
    required: true,
  },
});

let Lesson = mongoose.model("Lesson", lessionsSchema);
module.exports = Lesson;
