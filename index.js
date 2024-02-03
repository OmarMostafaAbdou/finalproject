const express = require("express");
const cors = require("cors");
const connect = require("./conection");
const userRoute = require("./src/routes/userRoute");

connect();

const app = express();
const port = process.env.PORT || 4000;

app.use(cors());
app.use(express.static("src/imgs"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/user", userRoute);

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
