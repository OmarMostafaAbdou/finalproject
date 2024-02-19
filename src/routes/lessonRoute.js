const lessoncontroller = require("../controllers/lessionControllers");
const express = require("express");
const { stat } = require("fs");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const jwt = require("jsonwebtoken");
const { send } = require("process");
const { verifyToken } = require("../shared/Auth");
const secret = "ElearningProject";

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, path.join(__dirname, "..", "imgs"));
    console.log(path.join(__dirname, "..", "imgs"));
  },
  filename: (req, file, callback) => {
    callback(null, file.originalname);
  },
});

const Uploadevedio = multer({ storage: storage });
const Uploadedoc = multer({ storage: storage });

router.post(
  "/addlesson",
  Uploadevedio.fields([
    { name: "video", maxCount: 1 },
    { name: "document", maxCount: 1 },
  ]),
  verifyToken,
  async (req, res) => {
    console.log(req.files["video"][0].filename);

    let content = {
      video: new Date() + req.files["video"][0].filename,
      document: new Date() + req.files["document"][0].filename,
    };
    let lesson = {
      title: req.body.title,
      content: content,
      duration: req.body.duration,
    };
    //  let imageurl = new Date() + req.file.filename;
    //  console.log(imageurl);
    //req.body.imgURL = imageurl;

    jwt.verify(req.token, secret, async (err, data) => {
      if (err) {
        res.json({
          message: "Error:invalid credentials , on token found",
          status: 401,
          data: req.token,
          success: false,
        });
      } else {
        try {
          let lessonData = await lessoncontroller.CreateLession(lesson);

          if (lessonData) {
            res.json({
              message: "lesson added successfully",
              status: 200,
              data: lessonData,
              success: true,
            });
          } else {
            res.json({
              message: "lesson added faild",
              status: 401,
              data: lessonData,
              success: false,
            });
          }
        } catch (error) {
          console.log(err);
        }
      }
    });
  }
);

router.get(
  "/all",

  verifyToken,
  async (req, res) => {
    jwt.verify(req.token, secret, async (err, data) => {
      if (err) {
        res.json({
          message: "Error:invalid credentials , on token found",
          status: 401,
          data: req.token,
          success: false,
        });
      } else {
        try {
          const lessonData = await lessoncontroller.get_All_Lessions();
          console.log(lessonData);
          if (lessonData) {
            res.json({
              message: "All lessons",
              status: 200,
              data: lessonData,
              success: true,
            });
          } else {
            res.json({
              message: " lessons Not found",
              status: 403,
              data: lessonData,
              success: true,
            });
          }
        } catch (error) {
          console.log(error);
        }
      }
    });
  }
);

router.get("/:id", verifyToken, async (req, res) => {
  jwt.verify(req.token, secret, async (err, data) => {
    if (err) {
      res.json({
        message: "Error:invalid credentials , on token found",
        status: 401,
        data: req.token,
        success: false,
      });
    } else {
      try {
        let lessonData = await lessoncontroller.getlessonByid(req.params.id);
        if (lessonData) {
          res.json({
            message: "lessonData data get successfully",
            status: 200,
            data: lessonData,
            success: true,
          });
        } else {
          res.json({
            message: " lessonData Not found",
            status: 403,
            data: lessonData,
            success: true,
          });
        }
      } catch (error) {
        console.log(error);
      }
    }
  });
});

router.delete("/:id", verifyToken, async (req, res) => {
  jwt.verify(req.token, secret, async (err, data) => {
    if (err) {
      res.json({
        message: "Error:invalid credentials , on token found",
        status: 401,
        data: req.token,
        success: false,
      });
    } else {
      try {
        let lessonData = await lessoncontroller.Deletelesson(req.params.id);
        res.json({
          message: "deleted lesson  successfully",
          status: 200,
          data: lessonData,
          success: true,
        });
      } catch (error) {
        console.log(error);
      }
    }
  });
});
router.put(
  "/:id",
  Uploadevedio.fields([
    { name: "video", maxCount: 1 },
    { name: "document", maxCount: 1 },
  ]),
  verifyToken,
  async (req, res) => {
    let content = {
      video: new Date() + req.files["video"][0].filename,
      document: new Date() + req.files["document"][0].filename,
    };
    let lesson = {
      title: req.body.title,
      content: content,
      duration: req.body.duration,
    };
    jwt.verify(req.token, secret, async (err, data) => {
      if (err) {
        res.json({
          message: "Error:invalid credentials , on token found",
          status: 401,
          data: req.token,
          success: false,
        });
      } else {
        try {
          const lessonData = await lessoncontroller.updateLesson(
            req.params.id,
            lesson
          );
          if (lessonData) {
            res.json({
              message: "lesson  update successfully",
              status: 200,
              data: lessonData,
              success: true,
            });
          } else {
            res.json({
              message: "lesson  update faild",
              status: 400,
              data: lessonData,
              success: true,
            });
          }
        } catch (error) {
          res.status(500).send(error);
        }
      }
    });
  }
);

module.exports = router;
