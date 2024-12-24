const express = require("express");
const router = express.Router();
const CourseController = require("../controllers/courseController");

router.get("/cursos", CourseController.getCourses);
router.get("/curso/:id", CourseController.getCourseById);
router.post("/curso", CourseController.createCourse);
router.put("/curso/:id", CourseController.updateCourseById);
router.delete("/cursos/:id", CourseController.deleteCourseById);

module.exports = router;
