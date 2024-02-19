const coursecontroller = require("../controllers/courseControllers");
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

const Uploadeimage = multer({ storage: storage });

router.post(
  "/addCourse",
  Uploadeimage.single("imgURL"),
  verifyToken,
  async (req, res) => {
    let imageurl = new Date() + req.file.filename;
    console.log(imageurl);
    req.body.imgURL = imageurl;

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
          let courseData = await coursecontroller.CreateCourse(req.body);

          if (courseData) {
            res.json({
              message: "course added successfully",
              status: 200,
              data: courseData,
              success: true,
            });
          } else {
            res.json({
              message: "course added faild",
              status: 401,
              data: courseData,
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
          const coursedata = await coursecontroller.getAllcourse();
          console.log(coursedata);
          if (coursedata) {
            res.json({
              message: "All courses",
              status: 200,
              data: coursedata,
              success: true,
            });
          } else {
            res.json({
              message: " courses Not found",
              status: 403,
              data: coursedata,
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

router.get(
  "/title",

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
          const coursedata = await coursecontroller.getCourseTitles();
          console.log(coursedata);
          if (coursedata) {
            res.json({
              message: "All courses",
              status: 200,
              data: coursedata,
              success: true,
            });
          } else {
            res.json({
              message: " courses Not found",
              status: 403,
              data: coursedata,
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
        let course = await coursecontroller.getCourseByid(req.params.id);
        if (course) {
          res.json({
            message: "course data get successfully",
            status: 200,
            data: course,
            success: true,
          });
        } else {
          res.json({
            message: " course Not found",
            status: 403,
            data: course,
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
        let course = await coursecontroller.deleteCourse(req.params.id);
        res.json({
          message: "deleted course  successfully",
          status: 200,
          data: course,
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
  Uploadeimage.single("imgURL"),
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
          const course = await coursecontroller.ubdateCourse(
            req.params.id,
            req.body
          );
          if (course) {
            res.json({
              message: "course  update successfully",
              status: 200,
              data: course,
              success: true,
            });
          } else {
            res.json({
              message: "course  update faild",
              status: 400,
              data: course,
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

router.post("/addcomment/:id", verifyToken, async (req, res) => {
  jwt.verify(req.token, secret, async (err, data) => {
    if (err) {
      res.json({
        message: "Error:invalid credentials , on token found",
        status: 401,
        data: req.token,
        success: false,
      });
    } else {
      console.log(req.body.text);
      let comment = await coursecontroller.createComment(
        req.params.id,
        req.body.userID,
        req.body.text
      );

      res.json({
        message: " comment added successfully",
        status: 200,
        data: comment,
        success: true,
      });
    }
  });
});



router.get("/comments/:id", verifyToken, async (req, res) => {
  jwt.verify(req.token, secret, async (err, data) => {
    if (err) {
      res.json({
        message: "Error:invalid credentials , on token found",
        status: 401,
        data: req.token,
        success: false,
      });
    } else {
      console.log(req.body.text);
      let comment = await coursecontroller.getAllcomentForCourse(req.params.id);

      res.json({
        message: " comment added successfully",
        status: 200,
        data: comment,
        success: true,
      });
    }
  });
});

module.exports = router;
