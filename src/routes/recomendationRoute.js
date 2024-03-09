const recommendCoursesForUser = require("../controllers/RecomdationController");
const express = require("express");
const router = express.Router();

router.post("/api/recommend/:id", async (req, res) => {
  try {
    const recommendedCourses =
      await recommendCoursesForUser.recommendCoursesForUser(req.params.id);
    console.log(recommendedCourses);
    res.json({ recommendedCourses });
  } catch (error) {
    console.error("Error recommending courses:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
