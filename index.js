const path = require("path");

const express = require("express");
const cors = require("cors");
const connect = require("./conection");
const userRoute = require("./src/routes/userRoute");
const courseRoute = require("./src/routes/courseRoute");
const lessionRoute = require("./src/routes/lessonRoute");
const quizroute = require("./src/routes/QuizRoute");
const categoryRoute = require("./src/routes/cateoryRoute");
const recommendationRoute = require("./src/routes/recomendationRoute");
connect();

const app = express();
const port = process.env.PORT || 4000;

app.use(cors());
app.use(express.static("imgs"));
app.use("/imgs", express.static("./src/imgs"));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/user", userRoute);
app.use("/course", courseRoute);
app.use("/lesson", lessionRoute);
app.use("/quiz", quizroute);
app.use("/category", categoryRoute);
app.use("/recomendation", recommendationRoute);

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
