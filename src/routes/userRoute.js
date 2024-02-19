const usercontroller = require("../controllers/userController");
const express = require("express");
const app = express();

const router = express.Router();
const jwt = require("jsonwebtoken");
const fs = require("fs");
const secret = "ElearningProject";
const bcrypt = require("bcrypt");
const { verifyToken } = require("../shared/Auth");
const { model } = require("mongoose");

//*********************** Register ************************

router.post("/register", async (req, res) => {
  try {
    const hashedpassword = await bcrypt.hash(req.body.Password, 10);
    req.body.Password = hashedpassword;

    let newUser = await usercontroller.Register_new_user(req.body);

    if (newUser) {
      res.json({
        message: "successfull regestration",
        status: 200,
        data: newUser,
        success: true,
      });
    } else {
      res.json({
        message: "regestration faild",
        status: 400,
        data: newUser,
        success: false,
      });
    }
  } catch (error) {
    console.log(error);
  }
});

// ************************ login ************************

router.post("/login", async (req, res) => {
  try {
    console.log(req.body);
    let user = await usercontroller.Login(req.body.Email);
    console.log(user);

    if (!user) {
      res.json({
        message: "Error:invalid credentials , no account found",
        status: 400,
        data: req.body,
        success: false,
      });
    } else {
      const isValidPassword = await bcrypt.compare(
        req.body.Password,
        user.Password
      );
      if (isValidPassword) {
        const token = jwt.sign({ user }, secret);
        console.log("Request Body:", req.body);
        console.log("User:", user);
        console.log("Token:", token);
        res.json({
          message: "successful login",
          status: 200,
          data: { user: user, token: token },
          success: true,
        });
      } else {
        res.json({
          message: "Error:invalid credentials , password incorrect",
          status: 401,
          data: req.body,
          success: false,
        });
      }
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Internal server error",
      status: 500,
      data: error,
      success: false,
    });
  }
});

router.put("/update/:id", verifyToken, async (req, res) => {
  const hashedpassword = await bcrypt.hash(req.body.Password, 10);
  req.body.Password = hashedpassword;
  jwt.verify(req.token, secret, async (err, data) => {
    if (err) {
      res.json({
        message: "Error:invalid credentials , on token found",
        status: 401,
        data: req.token,
        success: false,
      });
    } else {
      let userdata = await usercontroller.update_user_data(
        req.params.id,
        req.body
      );
      try {
        if (userdata) {
          res.json({
            message: "successfull Update",
            status: 200,
            data: userdata,
            success: true,
          });
        } else {
          res.json({
            message: "Error:invalid credentials , on update",
            status: 400,
            data: userdata,
            success: false,
          });
        }
      } catch (error) {
        console.log(error);
      }
    }
  });
});

router.get("/all", verifyToken, async (req, res) => {
  jwt.verify(req.token, secret, async (err, data) => {
    if (err) {
      res.json({
        message: "Error:invalid credentials , on token found",
        status: 401,
        data: req.token,
        success: false,
      });
    } else {
      let userdata = await usercontroller.getAllClient();

      try {
        if (userdata) {
          res.json({
            message: "successfull usergeten",
            status: 200,
            data: userdata,
            success: true,
          });
        } else {
          res.json({
            message: "faild user found",
            status: 401,
            data: userdata,
            success: false,
          });
        }
      } catch (error) {
        console.log(err);
      }
    }
  });
});

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
      let userdata = await usercontroller.getUserByID(req.params.id);
      try {
        if (userdata) {
          res.json({
            message: "successfull user found",
            status: 200,
            data: userdata,
            success: true,
          });
        } else {
          res.json({
            message: "faild user found",
            status: 401,
            data: userdata,
            success: false,
          });
        }
      } catch (error) {
        console.log(err);
      }
    }
  });
});

router.post("/joinCourse/:id", verifyToken, async (req, res) => {
  jwt.verify(req.token, secret, async (err, data) => {
    if (err) {
      res.json({
        message: "Error:invalid credentials , on token found",
        status: 401,
        data: req.token,
        success: false,
      });
    } else {
      let course = await usercontroller.addUserCourse(
        req.params.id,
        req.body.CourseID
      );
      try {
        if (course) {
          res.json({
            message: "user Course ADD successfully",
            status: 200,
            data: course,
            success: true,
          });
        } else {
          res.json({
            message: "user Course ADD failed",
            status: 400,
            data: course,
            success: false,
          });
        }
      } catch (error) {
        res.json({
          message: "Expected error",
          status: 500,
          data: error,
          success: false,
        });
      }
    }
  });
});

router.get("/userCourse/:id", verifyToken, async (req, res) => {
  jwt.verify(req.token, secret, async (err, data) => {
    if (err) {
      res.json({
        message: "Error:invalid credentials , on token found",
        status: 401,
        data: req.token,
        success: false,
      });
    } else {
      let course = await usercontroller.getUserCourse(req.params.id);
      try {
        if (course) {
          res.json({
            message: "user Courses",
            status: 200,
            data: course,
            success: true,
          });
        } else {
          res.json({
            message: "user Course ADD failed",
            status: 400,
            data: course,
            success: false,
          });
        }
      } catch (error) {
        res.json({
          message: "Expected error",
          status: 500,
          data: error,
          success: false,
        });
      }
    }
  });
});
router.get("/role/:Role", verifyToken, async (req, res) => {
  jwt.verify(req.token, secret, async (err, data) => {
    if (err) {
      res.json({
        message: "Error:invalid credentials , on token found",
        status: 401,
        data: req.token,
        success: false,
      });
    } else {
      let userdata = await usercontroller.get_By_Role(req.params.Role);
      try {
        if (userdata) {
          res.json({
            message: "successfull user found",
            status: 200,
            data: userdata,
            success: true,
          });
        } else {
          res.json({
            message: "faild user found",
            status: 401,
            data: userdata,
            success: false,
          });
        }
      } catch (error) {
        console.log(err);
      }
    }
  });
});

router.delete("/delete/:id", verifyToken, async (req, res) => {
  jwt.verify(req.token, secret, async (err, data) => {
    if (err) {
      res.json({
        message: "Error:invalid credentials , on token found",
        status: 401,
        data: req.token,
        success: false,
      });
    } else {
      let userdata = await usercontroller.deleteuser(req.params.id);
      try {
        if (userdata) {
          res.json({
            message: "deleted successfull ",
            status: 200,
            data: userdata,
            success: true,
          });
        } else {
          res.json({
            message: "faild user found",
            status: 401,
            data: userdata,
            success: false,
          });
        }
      } catch (error) {
        console.log(err);
      }
    }
  });
});
module.exports = router;
