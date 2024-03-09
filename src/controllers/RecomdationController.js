const Course = require("../models/courses");
const User = require("../models/user");
const natural = require("natural");
async function recommendCoursesForUser(userId) {
  try {
    const user = await User.findById(userId).populate("enrolledCourses");

    const userPreferences = {
      categories: user.enrolledCourses.map((course) => course.categoryID),
      tags: user.enrolledCourses.reduce(
        (tags, course) => tags.concat(course.tags),
        []
      ),
      titles: user.enrolledCourses.map((course) => course.title),
    };

    const allCourses = await Course.find();

    const documents = allCourses.map((course) => ({
      id: course._id,
      text: `${course.title} ${course.description}`,
    }));

    const classifier = new natural.BayesClassifier();
    documents.forEach((doc) => {
      classifier.addDocument(doc.text, doc.id.toString());
    });
    classifier.train();

    const recommendations = {};
    userPreferences.categories.forEach((category) => {
      const relevantCourses = allCourses.filter(
        (course) => course.categoryID.toString() === category.toString()
      );
      relevantCourses.forEach((course) => {
        const score = classifier.getClassifications(
          `${course.title} ${course.description}`
        )[1].value;
        if (!recommendations[course._id.toString()]) {
          recommendations[course._id.toString()] = { course, score };
        } else {
          recommendations[course._id.toString()].score += score;
        }
      });
    });

    const sortedRecommendations = Object.values(recommendations).sort(
      (a, b) => b.score - a.score
    );

    return sortedRecommendations.map((rec) => rec.course);
  } catch (error) {
    console.error("Error recommending courses:", error);
    throw error;
  }
}

module.exports = { recommendCoursesForUser };
