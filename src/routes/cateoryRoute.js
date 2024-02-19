const Categorycontroller = require("../controllers/categoryController");
const express = require("express");
const { stat } = require("fs");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const jwt = require("jsonwebtoken");
const { send } = require("process");
const { verifyToken } = require("../shared/Auth");
const secret = "ElearningProject";
router.post("/addCategory", verifyToken, async (req, res) => {
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
        let categoryData = await Categorycontroller.addCategory(req.body);
        if (categoryData) {
          res.json({
            message: "category added successfully",
            status: 200,
            data: categoryData,
            success: true,
          });
        } else {
          res.json({
            message: "categoty added faild",
            status: 403,
            data: categoryData,
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
      try {
        let categoryData = await Categorycontroller.getAllcategory();
        if (categoryData) {
          res.json({
            message: "All category",
            status: 200,
            data: categoryData,
            success: true,
          });
        } else {
          res.json({
            message: "category not found",
            status: 403,
            data: categoryData,
            success: false,
          });
        }
      } catch (error) {
        console.log(error);
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
      try {
        let categoryData = await Categorycontroller.getAllcategoryByid(
          req.params.id
        );
        if (categoryData) {
          res.json({
            message: " category data",
            status: 200,
            data: categoryData,
            success: true,
          });
        } else {
          res.json({
            message: "category not found",
            status: 403,
            data: categoryData,
            success: false,
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
        let categoryData = await Categorycontroller.deletecategory(
          req.params.id
        );
        if (categoryData) {
          res.json({
            message: " category data",
            status: 200,
            data: categoryData,
            success: true,
          });
        } else {
          res.json({
            message: "category not found",
            status: 403,
            data: categoryData,
            success: false,
          });
        }
      } catch (error) {
        console.log(error);
      }
    }
  });
});

router.put("/:id", verifyToken, async (req, res) => {
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
        let categoryData = await Categorycontroller.updatecategory(
          req.params.id,
          req.body
        );
        if (categoryData) {
          res.json({
            message: " category data",
            status: 200,
            data: categoryData,
            success: true,
          });
        } else {
          res.json({
            message: "category not found",
            status: 403,
            data: categoryData,
            success: false,
          });
        }
      } catch (error) {
        console.log(error);
      }
    }
  });
});

module.exports = router;
