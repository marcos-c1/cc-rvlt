const express = require('express');
const router = express.Router();
const CourseController = require('../controllers/userController');

router.get('/cursos', CourseController.getCourses);
router.post('/curso', CourseController.createCourse);
router.put('/cursos/:id', CourseController.updateCourse);
router.delete('/cursos/:id', CourseController.deleteCourse);

module.exports = router;