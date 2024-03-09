const CategoryController = require("../controllers/CategoryController");
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
    const timestamp = Date.now();
    callback(null, timestamp + "_" + file.originalname);
  },
});

const Uploadeimage = multer({ storage: storage });

router.post(
  "/addCategory",
  Uploadeimage.fields([
    { name: "CatImg", maxCount: 1 },
    { name: "icon", maxCount: 1 },
  ]),
  verifyToken,
  async (req, res) => {
    console.log(req.body);

    const { CatImg, icon } = req.files;
    console.log(req.body);

    const categoryData = {
      name: req.body.name,
      description: req.body.description,
      CatImg: CatImg[0].filename,
      icon: icon[0].filename,
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
          let CategoryData = await CategoryController.addCategory(categoryData);
          if (CategoryData) {
            res.json({
              message: "category added successfully",
              status: 200,
              data: CategoryData,
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
  }
);

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
        let categoryData = await CategoryController.getAllcategory();
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
        let categoryData = await CategoryController.getAllcategoryByid(
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
        let categoryData = await CategoryController.deletecategory(
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

router.put(
  "/:id",
  Uploadeimage.fields([
    { name: "CatImg", maxCount: 1 },
    { name: "icon", maxCount: 1 },
  ]),
  verifyToken,
  async (req, res) => {
    const { CatImg, icon } = req.files;
    console.log(req.body);

    const categoryData = {
      name: req.body.name,
      description: req.body.description,
      CatImg: CatImg[0].filename,
      icon: icon[0].filename,
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
          let CategoryData = await CategoryController.updatecategory(
            req.params.id,
            categoryData
          );
          if (CategoryData) {
            res.json({
              message: " category data",
              status: 200,
              data: CategoryData,
              success: true,
            });
          } else {
            res.json({
              message: "category not found",
              status: 403,
              data: CategoryData,
              success: false,
            });
          }
        } catch (error) {
          console.log(error);
        }
      }
    });
  }
);

module.exports = router;
