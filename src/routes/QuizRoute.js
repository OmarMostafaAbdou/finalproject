const quizController = require("../controllers/QuizeController");
const express = require("express");
const { stat } = require("fs");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const jwt = require("jsonwebtoken");
const { send } = require("process");
const { verifyToken } = require("../shared/Auth");
const secret = "ElearningProject";

router.post("/addQuiz", verifyToken, async (req, res) => {
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
        let QuizData = await quizController.createQuize(req.body);
        if (QuizData) {
          res.json({
            message: "quiz added successfully",
            status: 200,
            data: QuizData,
            success: true,
          });
        } else {
          res.json({
            message: "quiz added faild",
            status: 403,
            data: QuizData,
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
        let QuizData = await quizController.getAllQuiz();
        if (QuizData) {
          res.json({
            message: "All quizes",
            status: 200,
            data: QuizData,
            success: true,
          });
        } else {
          res.json({
            message: "quiz not found",
            status: 403,
            data: QuizData,
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
        let QuizData = await quizController.getQuizById(req.params.id);
        if (QuizData) {
          res.json({
            message: " Quiz data",
            status: 200,
            data: QuizData,
            success: true,
          });
        } else {
          res.json({
            message: "quiz not found",
            status: 403,
            data: QuizData,
            success: false,
          });
        }
      } catch (error) {
        console.log(error);
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
      try {
        let QuizData = await quizController.DeleteQuiz(req.params.id);
        if (QuizData) {
          res.json({
            message: " Quiz data",
            status: 200,
            data: QuizData,
            success: true,
          });
        } else {
          res.json({
            message: "quiz not found",
            status: 403,
            data: QuizData,
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
  let quiz = {
    title: req.body.title,
    questions: [
      {
        questionText: req.body.questionText,
        options: req.body.options,
        correctOption: req.body.correctOption,
      },
    ],
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
        let QuizData = await quizController.UpdateQuiz(req.params.id, quiz);
        if (QuizData) {
          res.json({
            message: "Quiz Updated ",
            status: 200,
            data: QuizData,
            success: true,
          });
        } else {
          res.json({
            message: "quiz not Updated",
            status: 403,
            data: QuizData,
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
